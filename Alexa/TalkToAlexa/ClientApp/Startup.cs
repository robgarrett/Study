using System.Net.Http;
using System.Net.Http.Headers;
using AspNet.Security.OAuth.Amazon;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq;

namespace TalkToAlexaClient
{
    // Register the app with Amazon.
    // https://developer.amazon.com/docs/alexa-voice-service/register-a-product.html
    // https://developer.amazon.com/docs/alexa-voice-service/activate-security-profile.html
    // With help from:
    // https://forums.developer.amazon.com/questions/40799/workaround-for-push-notifications.html
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = "Amazon";
            })
            .AddCookie()
            .AddAmazon("Amazon", options =>
            {
                // Make sure we pass the product ID and DSN so that AVS recognizes our web service as
                // an Alexa device.
                options.AuthorizationEndpoint = QueryHelpers.AddQueryString(
                    AmazonAuthenticationDefaults.AuthorizationEndpoint, "scope_data", 
                    "{\"alexa:all\": {\"productID\": \"" + Constants.ProductId + 
                    "\", \"productInstanceAttributes\": {\"deviceSerialNumber\": \"" + Constants.DSN +
                    "\"}}}");

                // Regular OAUTH stuff.
                options.ClientId = Configuration["Amazon:Clientid"];
                options.ClientSecret = Configuration["Amazon:ClientSecret"];
                options.Scope.Add("alexa:voice_service:pre_auth");
                options.Scope.Add("alexa:all");

                options.Events = new OAuthEvents
                {
                    OnCreatingTicket = async context =>
                    {
                        // Get profile info and map to user claims.
                        var request = new HttpRequestMessage(HttpMethod.Get, context.Options.UserInformationEndpoint);
                        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", context.AccessToken);
                        var response = await context.Backchannel.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, context.HttpContext.RequestAborted);
                        response.EnsureSuccessStatusCode();
                        var user = JObject.Parse(await response.Content.ReadAsStringAsync());
                        context.RunClaimActions(user);
                    }
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseMvc();
        }
    }
}
