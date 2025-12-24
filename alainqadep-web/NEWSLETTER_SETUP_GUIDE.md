# Newsletter Submission Setup Guide

## Overview

This guide explains how to set up the newsletter submission feature that sends data from your Next.js frontend to Umbraco CMS backend.

## Architecture

```
Frontend (Next.js) → API Route → Umbraco Backend API → Database
```

## Setup Steps

### 1. Configure Umbraco Backend API

You need to add a custom API controller to your Umbraco project.

#### Option A: Using the provided C# file

1. **Copy the controller file**:
   - Take the file `UMBRACO_BACKEND_NewsletterApiController.cs`
   - Place it in your Umbraco project at: `/Controllers/NewsletterApiController.cs`

2. **Update the namespace**:

   ```csharp
   namespace YourProject.Controllers  // Change to your project namespace
   ```

3. **Verify the parent GUID**:
   - Check that `52b06f3e-2f62-4ae0-a141-8054552a9d94` matches your "NewsletterSubmission Store" node ID
   - You can find this in Umbraco backoffice → Content → NewsletterSubmission Store → Info tab

4. **Build your Umbraco project**:

   ```bash
   dotnet build
   ```

5. **Restart Umbraco**

#### Option B: Alternative - Use Umbraco Forms (if installed)

If you have Umbraco Forms installed, you can:

1. Create a form in Umbraco backoffice
2. Add Name and Email fields
3. Configure to save entries
4. Use the Forms API endpoint instead

### 2. Test the Backend API

Test the Umbraco API endpoint directly:

```bash
curl -X POST https://localhost:44355/umbraco/api/newsletter/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","timestamp":"2025-12-17T00:00:00Z"}'
```

Expected response:

```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter!",
  "id": 123
}
```

### 3. Frontend is Already Configured

The Next.js frontend is already set up:

- ✅ API route: `/src/app/api/umbraco/newsletter/route.js`
- ✅ Footer component: `/src/app/components/Footer.jsx`
- ✅ Form validation and error handling
- ✅ Loading states and success messages

### 4. Verify the Setup

1. **Start your Next.js dev server**:

   ```bash
   npm run dev
   ```

2. **Navigate to any page with the Footer**

3. **Fill out the newsletter form**:
   - Enter a name
   - Enter an email
   - Click Submit

4. **Check Umbraco backoffice**:
   - Go to Content → NewsletterSubmission Store
   - You should see a new submission entry

## Troubleshooting

### Error: 404 Not Found

**Cause**: Umbraco backend API endpoint not configured

**Solution**:

1. Verify the controller file is in `/Controllers/` folder
2. Check the namespace matches your project
3. Rebuild the Umbraco project
4. Restart the Umbraco application

### Error: 500 Internal Server Error

**Cause**: Parent node GUID mismatch or property alias mismatch

**Solution**:

1. Verify the parent GUID in the controller matches your NewsletterSubmission Store ID
2. Check property aliases match (`nameUser`, `email`)
3. Check Umbraco logs: `/umbraco/logs/`

### Form submits but nothing appears in Umbraco

**Cause**: Content not published or wrong parent

**Solution**:

1. Check if `SaveAndPublish` returned success in logs
2. Verify parent node exists and is published
3. Check user permissions for content creation

### CORS Errors

**Cause**: Cross-origin request blocked

**Solution**:
Add CORS configuration in Umbraco's `Startup.cs` or `Program.cs`:

```csharp
services.AddCors(options =>
{
    options.AddPolicy("AllowNextJs",
        builder => builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Then in Configure/app pipeline:
app.UseCors("AllowNextJs");
```

## Security Considerations

### Production Checklist

- [ ] Add rate limiting to prevent spam submissions
- [ ] Implement CAPTCHA (Google reCAPTCHA or similar)
- [ ] Add email validation on backend
- [ ] Sanitize input to prevent XSS attacks
- [ ] Set up proper CORS policies
- [ ] Enable HTTPS only
- [ ] Add logging and monitoring
- [ ] Consider adding double opt-in email verification

### Example: Add Rate Limiting

```csharp
// In Startup.cs or Program.cs
services.AddMemoryCache();
services.AddSingleton<IRateLimitingService, RateLimitingService>();
```

## Alternative: Simple Email Integration

If you prefer to send emails instead of storing in Umbraco:

```csharp
[HttpPost]
public async Task<IActionResult> Submit([FromBody] NewsletterSubmissionModel model)
{
    // Send email to your marketing team
    await _emailService.SendAsync(
        to: "marketing@yourdomain.com",
        subject: "New Newsletter Subscription",
        body: $"Name: {model.Name}\nEmail: {model.Email}"
    );

    return Ok(new { success = true });
}
```

## Next Steps

1. ✅ Set up the Umbraco backend controller
2. ✅ Test the API endpoint
3. ✅ Test the form submission from frontend
4. 📧 Optional: Set up email notifications
5. 🔒 Add security measures (CAPTCHA, rate limiting)
6. 📊 Set up analytics tracking
7. 🎨 Customize success/error messages

## Support

If you encounter issues:

1. Check Umbraco logs: `/umbraco/logs/`
2. Check browser console for frontend errors
3. Check Next.js terminal for API route errors
4. Verify all GUIDs and property aliases match your Umbraco setup
