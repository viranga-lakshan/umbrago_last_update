using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.Common;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Extensions;

namespace UmbracoLocal.Controllers;

[ApiController]
[Route("umbraco/api/content")]
public class ContentApiController : ControllerBase
{
    private readonly UmbracoHelper _umbracoHelper;

    public ContentApiController(UmbracoHelper umbracoHelper)
    {
        _umbracoHelper = umbracoHelper;
    }

    // Get content by ID with language support
    [HttpGet("{id}")]
    public IActionResult GetContent(Guid id, [FromQuery] string culture = "en-US")
    {
        var content = _umbracoHelper.Content(id);
        if (content == null)
            return NotFound(new { message = "Content not found" });

        var cultureName = culture == "ar" ? "ar" : "en-US";
        
        return Ok(new
        {
            id = content.Key,
            name = content.Name,
            contentType = content.ContentType.Alias,
            url = content.Url(cultureName),
            culture = cultureName,
            properties = GetPageContent(content, cultureName)
        });
    }

    // Get all content of a specific type
    [HttpGet("type/{contentType}")]
    public IActionResult GetByType(string contentType, [FromQuery] string culture = "en-US")
    {
        var allContent = _umbracoHelper.ContentAtRoot()
            .SelectMany(x => x.DescendantsOrSelf())
            .Where(x => x.ContentType.Alias.Equals(contentType, StringComparison.OrdinalIgnoreCase))
            .ToList();

        if (!allContent.Any())
            return NotFound(new { message = $"No content found for type: {contentType}" });

        var cultureName = culture == "ar" ? "ar" : "en-US";
        var results = allContent.Select(c => new
        {
            id = c.Key,
            name = c.Name,
            contentType = c.ContentType.Alias,
            url = c.Url(cultureName),
            culture = cultureName,
            properties = GetPageContent(c, cultureName)
        });

        return Ok(results);
    }

    // Get home page in specified language
    [HttpGet("home")]
    public IActionResult GetHomePage([FromQuery] string culture = "en-US")
    {
        var homePage = _umbracoHelper.ContentAtRoot()
            .FirstOrDefault(x => x.ContentType.Alias == "homePage");

        if (homePage == null)
            return NotFound(new { message = "Home page not found" });

        var cultureName = culture == "ar" ? "ar" : "en-US";
        
        return Ok(new
        {
            id = homePage.Key,
            name = homePage.Name,
            contentType = homePage.ContentType.Alias,
            url = homePage.Url(cultureName),
            culture = cultureName,
            properties = GetPageContent(homePage, cultureName)
        });
    }

    // Get all root content (all pages at root level)
    [HttpGet("all")]
    public IActionResult GetAllContent([FromQuery] string culture = "en-US")
    {
        var rootContent = _umbracoHelper.ContentAtRoot();
        if (!rootContent.Any())
            return NotFound(new { message = "No content found" });

        var cultureName = culture == "ar" ? "ar" : "en-US";
        var results = rootContent.Select(c => new
        {
            id = c.Key,
            name = c.Name,
            contentType = c.ContentType.Alias,
            url = c.Url(cultureName),
            culture = cultureName,
            properties = GetPageContent(c, cultureName),
            children = c.Children().Select(child => new
            {
                id = child.Key,
                name = child.Name,
                contentType = child.ContentType.Alias,
                url = child.Url(cultureName)
            })
        });

        return Ok(results);
    }

    // Get all pages with their structure
    [HttpGet("sitemap")]
    public IActionResult GetSitemap([FromQuery] string culture = "en-US")
    {
        var rootContent = _umbracoHelper.ContentAtRoot();
        if (!rootContent.Any())
            return NotFound(new { message = "No content found" });

        var cultureName = culture == "ar" ? "ar" : "en-US";
        
        return Ok(new
        {
            culture = cultureName,
            pages = rootContent.Select(c => BuildSitemapNode(c, cultureName))
        });
    }

    private object BuildSitemapNode(IPublishedContent content, string culture)
    {
        return new
        {
            id = content.Key,
            name = content.Name,
            contentType = content.ContentType.Alias,
            url = content.Url(culture),
            children = content.Children().Select(child => BuildSitemapNode(child, culture))
        };
    }

    private Dictionary<string, object?> GetPageContent(IPublishedContent content, string culture)
    {
        var result = new Dictionary<string, object?>();
        
        foreach (var property in content.Properties)
        {
            try
            {
                var value = property.GetValue(culture);
                if (value != null)
                {
                    result[property.Alias] = value;
                }
            }
            catch
            {
                // If culture-specific value not available, try default
                var value = property.GetValue();
                if (value != null)
                {
                    result[property.Alias] = value;
                }
            }
        }
        
        return result;
    }
}
