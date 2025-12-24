# Copilot / AI agent instructions — umbraco-local

Purpose: give an AI coding agent the essential, actionable knowledge to be productive in this repository.

Quick start
- Build & run (development):

```bash
dotnet build
ASPNETCORE_ENVIRONMENT=Development dotnet run --project umbraco-local.csproj
```

- Target framework: `net10.0` (see `umbraco-local.csproj`). Umbraco CMS v17 is used.

High-level architecture (why/how)
- This is an Umbraco CMS site using the official builder pattern in `Program.cs`:
  - `CreateUmbracoBuilder()` then `.AddBackOffice()`, `.AddWebsite()`, `.AddDeliveryApi()`, `.AddComposers()`.
  - The app boots with `await app.BootUmbracoAsync()` and registers middleware/endpoints via `app.UseUmbraco()`.
- Because Umbraco is framework-driven, most feature surface changes are done via:
  - Composers/Components (added by `.AddComposers()`)
  - Razor views (see `Views/` and partials under `Views/Partials/`) and Published Models.

Key files & locations (examples)
- Startup: [Program.cs](../Program.cs#L1) — shows Umbraco builder pipeline.
- Project config: [umbraco-local.csproj](../umbraco-local.csproj#L1) — `net10.0`, packages, Razor & compression settings.
- App configuration: [appsettings.json](../appsettings.json#L1) and environment-specific overrides.
- Razor/TagHelpers: [Views/_ViewImports.cshtml](../Views/_ViewImports.cshtml#L1).
- Views and partials: `Views/Partials/*` (e.g. `Views/Partials/blockgrid/*`) — follow the project's partial naming conventions.
- Static assets: `wwwroot/` (media under `wwwroot/media`).
- Umbraco runtime data/logs: `umbraco/Logs` and `umbraco/Data/TEMP`.

Project-specific conventions and important notes
- Compression is explicitly disabled in the project file (`<CompressionEnabled>false</CompressionEnabled>`). Do not re-enable without confirming front-end precompression expectations.
- Razor compilation is turned off and razor files are copied to publish directory (`CopyRazorGenerateFilesToPublishDirectory` true). Treat Razor files as first-class deploy-time assets.
- The repository opts into app-local ICU via `Microsoft.ICU.ICU4C.Runtime` for consistent globalization across platforms — be careful when changing globalization behavior.
- Delivery API is enabled (`Umbraco:CMS:DeliveryApi:Enabled: true` in `appsettings.json`), so content endpoints are expected.

Common workflows and useful commands
- Run locally (dev):

```bash
dotnet build
ASPNETCORE_ENVIRONMENT=Development dotnet run --project umbraco-local.csproj
```

- Run with VS/IDE debugger: open the project in Visual Studio (or `code` + C# extension) and launch the default profile (see `Properties/launchSettings.json`).
- To inspect published output or static web assets, check `bin/Debug/net10.0` after a build.

Patterns an agent should follow when changing code
- UI changes: modify Razor files in `Views/` and the partials in `Views/Partials/`. Keep TagHelpers and `_ViewImports.cshtml` usings intact.
- Feature wiring: add or update Composers to register services/middleware rather than patching the bootstrap sequence in `Program.cs` (the repo uses `AddComposers()` for extension points).
- Configuration: prefer adding keys to `appsettings.json` with schema maintained in `appsettings-schema.json` when relevant.

Integration points & external dependencies
- NuGet: `Umbraco.Cms` and `Umbraco.Cms.DevelopmentMode.Backoffice` (see `umbraco-local.csproj`).
- Localization / globalization handled via ICU package; test changes on target platforms (Windows/macOS/Linux) when touching culture/globalization.
- Backoffice assets rely on static web assets — see `bin/Debug/net10.0/staticwebassets` when troubleshooting front-end/backoffice issues.

What not to change without confirmation
- Do not re-enable automatic compression or razor compile flags without verifying the front-end build pipeline expectations.
- Avoid changing the `Id` under `Umbraco:CMS:Global:Id` in `appsettings.json` — it's site-specific.

If you need more context
- Inspect `Program.cs` first, then check `umbraco-local.csproj`. Use `umbraco/Logs` to debug runtime issues.

After making changes
- Build locally and run with `ASPNETCORE_ENVIRONMENT=Development` and verify the backoffice and website endpoints.

Feedback
- If anything here is unclear or you want agent behavior adjusted (e.g., stricter PR rules, test expectations), tell me and I will iterate.
