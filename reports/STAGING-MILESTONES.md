# Owner staging milestones

Updated 15 October 2026. This is the execution checklist for the restaurant, arcade and Rezzo owner demonstration. Production domains and live reservations are outside this staging release.

## 1. Recover and freeze scope

- [x] Locate all three Git repositories and preserve their existing work.
- [x] Recover the redesign, library research, arcade and reservation demo changes after interrupted credit-limited turns.
- [x] Keep unconfirmed prizes and brunch explicitly proposed/coming soon.
- [x] Keep ambiguous bottle expressions unconfirmed rather than inventing an identity.
- [x] Select a temporary HTTPS staging route while the Hostinger connector is unavailable.

## 2. Finish content and implementation

- [x] Restaurant identity, food photography, vivid page colours, interactive menu, taco picker, weekly offers, venue/patio and arcade section.
- [x] Dedicated Agave Library route and primary navigation link.
- [ ] Final merged library facts, transparent bottle exports, provenance and named missing-photo slots.
- [x] Matching Rezzo reservation, confirmation and management flow with isolated sample state.
- [ ] Complete all arcade preview gateway/origin/persistence work.
- [ ] Link all three staged builds to one another.

## 3. Audit and repair

- [ ] Restaurant TypeScript, production build, Worker HTML/schema/routes/assets and all-record library checks.
- [ ] Browser menu/search/filter/taco-picker, specials, modal keyboard/focus and library search/filter/pagination/details.
- [ ] Desktop and phone visual checks with saved screenshots.
- [ ] Arcade regression suite, built routes, real game interactions and private-room workflow.
- [ ] Rezzo tests/lint/typecheck/build and sample-only booking/management flow.
- [ ] Verify preview noindex and blocked development endpoints.

## 4. Save and publish

- [ ] Scan changes for credentials, runtime data and oversized files.
- [ ] Commit and push restaurant review branch.
- [ ] Commit and push arcade review branch.
- [ ] Commit and push Rezzo review branch.
- [ ] Start three production-built local staging services and HTTPS tunnels.
- [ ] Verify all three from public HTTPS URLs, including cross-links and booking embed.

## 5. Owner handoff

- [ ] Publish a short review guide, screenshots, GitHub links, verified preview links and known limits.
- [ ] Explain temporary preview lifetime and restart procedure; preserve container packages for later VPS staging.
- [ ] Mark goal complete only when the verified staging demonstration is ready.

## Recovered state

The restaurant was largely redesigned but still uncommitted. The arcade baseline was pushed at `0e618f7`, with further preview/security updates uncommitted. Rezzo's matching demo was implemented but uncommitted. Twenty-two restaurant Worker checks passed before interruption; Rezzo had previously passed 145 tests and the arcade 350, with final rebuilt integration checks still outstanding. Old temporary tunnel URLs and process IDs are stale and must be revalidated or replaced.
