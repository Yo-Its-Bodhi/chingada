# Three-app owner staging preview

This Compose package runs the restaurant, arcade and Rezzo as separate production-built **staging previews** on a future Docker-enabled VPS. It does not deploy the live restaurant or booking service. No Hostinger connection, DNS change, container build or container startup was performed while preparing these files. The YAML was parsed and its configuration checked locally; **container-engine validation remains unverified** because this workspace has no Docker CLI.

## Checkouts and configuration

Use the reviewed staging source for each app, including its Dockerfile and preview scripts. For example:

```text
/srv/chingada-staging/
  main/                  # Restaurant repository; deploy/ lives here
  arcade/                # La Chingada arcade repository
  rezzo/                 # Rezzo repository, codex/rezzo-staging
```

From `main/`, copy the public configuration template and edit the copy:

```sh
cp deploy/config.env.example deploy/config.env.local
```

The copy is ignored by Git. Set three distinct HTTPS origins under domains you control. All three values must be exact origins without a trailing slash, path, query, credentials or wildcard. The template's `example.com` addresses are placeholders. Relative build contexts resolve from `main/deploy/`, regardless of the shell's current directory; absolute paths also work. Adjust the three context variables if your clones use another layout.

Compose's `--env-file` supplies interpolation values only. This package deliberately passes only the listed runtime variables into containers; it does not mount a local environment file, host source directory, production database, credentials or existing application state.

## Build and start

On the VPS, install Docker Engine with Compose v2, then run from `main/`:

```sh
docker compose --env-file deploy/config.env.local -f deploy/compose.staging.yml config --quiet
docker compose --env-file deploy/config.env.local -f deploy/compose.staging.yml build
docker compose --env-file deploy/config.env.local -f deploy/compose.staging.yml up -d
docker compose --env-file deploy/config.env.local -f deploy/compose.staging.yml ps
docker compose --env-file deploy/config.env.local -f deploy/compose.staging.yml logs --tail=100
```

The Dockerfiles run the application processes as the unprivileged `node` user. The main and arcade containers expose their filtered preview gateways, keeping Wrangler's worker and inspection ports inside the container. No application port binds to the VPS's public interfaces.

| Public HTTPS origin | Reverse-proxy destination on the VPS | Container port |
| --- | --- | --- |
| Restaurant preview | `http://127.0.0.1:7344` | `8787` |
| Arcade preview | `http://127.0.0.1:7343` | `8787` |
| Booking demo | `http://127.0.0.1:7341` | `3000` |

Configure the host's HTTPS reverse proxy for those three origins separately. It must preserve each request's path and query. This package does not provision DNS, certificates, authentication or a reverse proxy. A reverse proxy in another container cannot reach these loopback bindings through its own `127.0.0.1`; use a host-level proxy for this layout. Keep TLS certificate verification enabled. If access should be private, protect all three preview origins consistently and verify that the restaurant's booking iframe can load through that protection.

All `NEXT_PUBLIC_*` links are build-time settings. The restaurant points booking to the Rezzo demo and games to the arcade preview; both apps link back to the restaurant. The arcade is configured without a sign-in claim. Changing an origin requires rebuilding and recreating the affected containers with the same commands. `ARCADE_PREVIEW_PUBLIC_ORIGIN` also sets the arcade's runtime origin for shared game links and QR cards.

## Preview state

- **Restaurant:** its own `restaurant-preview-state` volume holds only local preview runtime state. It is separate from arcade state and every live service.
- **Arcade:** `arcade-preview-state` holds a dedicated local D1 database under `/data/arcade`. The startup script creates a local-only preview configuration with its own database identity and runs only unapplied migrations `0000`–`0007` using Wrangler's migration ledger. A migration failure stops startup. It never runs a remote migration or uses the hosted Sites database. Do not import hosted scores or mount a production D1 export here.
- **Rezzo:** both `REZZO_DEMO_MODE=true` and `REZZO_DEMO_PREVIEW=true` are explicitly set. The existing sample database is process memory, resets on restart and is not persisted. Every page shows the demo/sample-data notice. Outbound customer email/notifications are not sent. The sample staff view is available in this mode; use made-up names and contact details only. No PostgreSQL URL, staff/session secret, VAPID key, Twilio credential or live customer data is needed.

Volumes are scoped to the Compose project `chingada-staging`. The services do not share state or volumes, and the booking demo has no volume. Keep one replica of each app for this owner review. This package is not a production availability, authentication, backup or prize-competition setup.

## Verify before sharing

After startup and HTTPS routing are ready:

1. Check `ps` and logs for all three services. Main and arcade may need time to start their local Workers; arcade's health check allows a longer first-start window for migrations.
2. Open the restaurant on desktop and phone. Check `/menu`, `/agave`, booking and arcade links. Ensure the booking iframe displays the same prominent demo notice as the standalone booking page.
3. Check Rezzo's `/manage`, menu link, real photos, fonts and sample availability. If testing a booking, use fictional contacts only and confirm that no real reservation or external message is created.
4. Check arcade solo play and two separate browser sessions in a table room. Open a generated game link/QR card and confirm its origin matches the arcade preview. Future prizes remain proposals; this deployment activates no competition or automatic award.
5. Check previews carry no-index instructions and that Worker management routes such as `/cdn-cgi/local/` are inaccessible through the public gateways. Do not override the applications' preview headers or expose internal Worker ports.

These are deployment acceptance checks, not claimed results from running this Compose package. Local application builds and HTTP smoke checks are documented in the respective app handoffs; they do not substitute for Linux container verification.

## Stop and update

```sh
docker compose --env-file deploy/config.env.local -f deploy/compose.staging.yml down
```

This stops the preview and retains the two local state volumes. For an update, review/pull the intended source revisions, then repeat `build` and `up -d`. Do not use `down --volumes` during a routine update: it erases local arcade scores, rooms and other preview state. Retire public routes when the owner review ends.
