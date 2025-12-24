using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Models;

namespace UmbracoLocal.Controllers;

[ApiController]
[Route("umbraco/api/newsletter")]
public class NewsletterApiController : ControllerBase
{
    private readonly IContentService _contentService;

    public NewsletterApiController(IContentService contentService)
    {
        _contentService = contentService;
    }

    [HttpPost("subscribe")]
    public IActionResult Subscribe([FromBody] NewsletterDto model)
    {
        if (string.IsNullOrWhiteSpace(model.Name) || string.IsNullOrWhiteSpace(model.Email))
            return BadRequest("Invalid data");

        // Parent node ID: Newsletter Submissions
        var parentId = new Guid("52b06f3e-2f62-4ae0-a141-8054552a9d94"); // 👈 REPLACE WITH YOUR PARENT NODE ID
        var parentContent = _contentService.GetById(parentId);
        
        if (parentContent == null)
            return NotFound("Parent node not found");

        IContent content = _contentService.Create(
            $"Newsletter - {model.Name}",
            parentContent.Id,
            "newsletterSubmission"
        );

        content.SetValue("nameUser", $"<p>{model.Name}</p>");
        content.SetValue("email", $"<p>{model.Email}</p>");

        var saveResult = _contentService.Save(content);
        if (saveResult.Success)
        {
            var publishResult = _contentService.Publish(content, Array.Empty<string>());
            if (publishResult.Success)
            {
                return Ok(new { success = true });
            }
            return StatusCode(500, new { success = false, error = "Failed to publish" });
        }
        
        return StatusCode(500, new { success = false, error = "Failed to save" });
    }
}

public class NewsletterDto
{
    public required string Name { get; set; }
    public required string Email { get; set; }
}
