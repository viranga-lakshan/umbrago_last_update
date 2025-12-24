/*
 * Umbraco Newsletter API Controller
 * 
 * INSTRUCTIONS:
 * 1. Create this file in your Umbraco project at:
 *    /Controllers/NewsletterApiController.cs
 * 
 * 2. Install required NuGet packages if not already installed:
 *    - Umbraco.Cms.Web.Common
 *    - Umbraco.Cms.Core
 * 
 * 3. Build and restart your Umbraco application
 * 
 * 4. The API endpoint will be available at:
 *    POST https://localhost:44355/umbraco/api/newsletter/subscribe
 */

using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Web.Common.Controllers;
using System;

namespace YourProject.Controllers
{
    public class NewsletterApiController : UmbracoApiController
    {
        private readonly IContentService _contentService;
        private readonly ILogger<NewsletterApiController> _logger;

        public NewsletterApiController(
            IContentService contentService,
            ILogger<NewsletterApiController> logger)
        {
            _contentService = contentService;
            _logger = logger;
        }

        [HttpPost]
        [Route("subscribe")]
        public IActionResult Subscribe([FromBody] NewsletterSubmissionModel model)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(model.Name) || string.IsNullOrWhiteSpace(model.Email))
                {
                    return BadRequest(new { success = false, message = "Name and email are required" });
                }

                // Get the NewsletterSubmission Store parent node
                // Replace with your actual parent GUID
                var parentGuid = new Guid("52b06f3e-2f62-4ae0-a141-8054552a9d94");
                var parent = _contentService.GetById(parentGuid);

                if (parent == null)
                {
                    _logger.LogError("Newsletter submission parent node not found");
                    return StatusCode(500, new { success = false, message = "Configuration error" });
                }

                // Create new newsletter submission
                var submission = _contentService.Create(
                    $"Newsletter - {model.Email} - {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss}",
                    parent,
                    "newsletterSubmission"
                );

                // Set property values
                submission.SetValue("nameUser", $"<p>{model.Name}</p>");
                submission.SetValue("email", $"<p>{model.Email}</p>");

                // Save and publish
                var result = _contentService.SaveAndPublish(submission);

                if (result.Success)
                {
                    _logger.LogInformation("Newsletter submission created: {Email}", model.Email);
                    return Ok(new
                    {
                        success = true,
                        message = "Successfully subscribed to newsletter!",
                        id = submission.Id
                    });
                }
                else
                {
                    _logger.LogError("Failed to publish newsletter submission: {Email}", model.Email);
                    return StatusCode(500, new { success = false, message = "Failed to save submission" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating newsletter submission");
                return StatusCode(500, new { success = false, message = "An error occurred" });
            }
        }
    }

    public class NewsletterSubmissionModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Timestamp { get; set; }
    }
}
