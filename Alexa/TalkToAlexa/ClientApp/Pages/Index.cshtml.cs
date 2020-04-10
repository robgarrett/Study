using System.Security.Claims;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TalkToAlexaClient.Pages
{
    public class IndexModel : PageModel
    {
        public string AmazonId { get; private set; }
        public string AmazonName { get; private set; }
        public string AmazonEmail { get; private set; }
        public string AmazonPostCode { get; private set; }
        public void OnGet()
        {
            if (User.Identity.IsAuthenticated)
            {
                AmazonId = User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                AmazonName = User.FindFirst(c => c.Type == ClaimTypes.Name)?.Value;
                AmazonEmail = User.FindFirst(c => c.Type == ClaimTypes.Email)?.Value;
                AmazonPostCode = User.FindFirst(c => c.Type == ClaimTypes.PostalCode)?.Value;
            }

        }
    }
}
