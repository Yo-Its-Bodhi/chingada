// D1 is optional: .openai/hosting.json currently declares no database binding.
// Keep this augmentation separate from Wrangler's generated runtime types.
declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
  }
}
