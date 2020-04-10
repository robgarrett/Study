using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Alexa.NET.Request;
using Alexa.NET.Response;
using Alexa.NET.Request.Type;
using Alexa.NET;
using System;

namespace RollTheDice
{
    public static class RollTheDice
    {
        [FunctionName("RollTheDice")]
        public static async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req, ILogger log)
        {
            var json = await req.ReadAsStringAsync();
            var skillRequest = JsonConvert.DeserializeObject<SkillRequest>(json);
            var requestType = skillRequest.GetRequestType();
            SkillResponse response = null;
            if (requestType == typeof(LaunchRequest))
            {
                response = ResponseBuilder.Tell("Hello and welcome to the Roll the Dice. Ask me to roll the dice.");
                response.Response.ShouldEndSession = false;
            }
            else if (requestType == typeof(IntentRequest))
            {
                try
                {
                    var intentRequest = skillRequest.Request as IntentRequest;
                    if (intentRequest.Intent.Name == "RollTheDice")
                    {
                        var slot = intentRequest.Intent.Slots["DiceType"];
                        if (null == slot || !int.TryParse(slot.Value, out int numSides)) numSides = 6;
                        var rollResults = new Random().Next(Math.Max(1, numSides - 1)) + 1; // Account for random returning '0'
                        var output = $"I rolled a {numSides} sided die and got a {rollResults}.";
                        response = ResponseBuilder.Tell(output);
                    }
                }
                catch (Exception ex)
                {
                    response = ResponseBuilder.Tell(ex.ToString());
                }
            }
            else 
            {
                response = ResponseBuilder.Tell($"Unknown request type {requestType.GetType().ToString()}");
            }

            return new OkObjectResult(response);
        }
    }
}
