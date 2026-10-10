# Spotify controller repair — PR #41

This change is unmerged and has not been deployed. Verification used a local production build, not a Vercel preview. Production remains at `9cb618d4ef6e099014787450d4fc489450031f2f`.

## Diagnosis

1. **The SDK replaces its target element.** Production passed `#portfolio-spotify-controller` directly to `createController`. After initialization the ID no longer existed, and the resulting 320 × 80 iframe was a static child of `body`. Its measured top was 2661.67px on Music. Neither the ID/class rules nor their descendant selectors could match it. This is a lost containment boundary, not a second custom player.
2. **Offscreen lazy loading prevented initialization.** With a permanent wrapper added locally, the actual SDK iframe had `loading="lazy"`, an empty body, and no ready/playback events. Setting that owned iframe to `loading="eager"` made it initialize and deliver real playback events while remaining offscreen. This directly reproduces the hide-player/lose-playback regression.
3. **The CSS remained contradictory.** The previous patches alternated between zero/one-pixel sizes, visibility/opacity changes, clipping, offscreen positioning and renderable dimensions. A legacy `clip:rect(0 0 0 0)` rule survived later attempts to undo clipping. All controller-specific legacy rules are removed and replaced with one host rule and one iframe sizing rule.
4. **Playback was optimistic.** `executePending` previously set `isPaused=false` before Spotify acknowledged the request. That could display “NOW PLAYING” even when the iframe never loaded or the browser refused playback. Initialization also lacked teardown and an in-flight creation guard.

Reference: [Spotify IFrame API](https://developer.spotify.com/documentation/embeds/references/iframe-api) documents replacement of the target element, ready/playback events, controller destruction, and browser autoplay limits.

## Changes

- Keep the React-owned outer host permanently mounted in the existing root provider. Spotify replaces a disposable child inside it.
- Preserve normal 320 × 80 dimensions, permissions, visibility and opacity. Position only the permanent host outside the viewport. No display:none, visibility:hidden, clipping, scaling, zero sizes, MutationObserver or repeated style writes.
- Set eager loading and accessibility attributes once on the SDK-created iframe.
- Share one SDK-loader promise; guard initialization, wait for ready, and destroy the owned controller on unmount. Route navigation still uses the same provider.
- Remove optimistic playback and timeout retries. State comes from Spotify playback events; buffering is reflected in the existing status label. Playlist browsing no longer resets actual playback progress.
- Keep next/previous in the requested playlist even when the same track appears in several playlists.
- Preserve desktop symbols and styles. Mobile alone uses U+25B6/U+FE0E for text play and U+2161 for pause, with a text font. No control placement, dimensions, artwork styling or tracklist layout changes.

## Historical review

| PR | Merged production commit | What it changed / why insufficient |
| --- | --- | --- |
| #37 | `6e1f8b3` | More offscreen/hidden rules and word-based controls; still styled a node replaced by Spotify. |
| #38 | `4f083a6` | Removed MutationObserver; broad iframe hiding affected rendering and did not resolve mounting/lazy initialization. |
| #39 | `7f9e2b4` | Restored renderable dimensions but narrowed selectors back to the removed host; native iframe escaped again. |
| #40 | `9cb618d` | Added more descendant selectors and restored symbols; the host was still replaced. |
| #41 original | unmerged | Added text presentation plus another containment override; did not repair the mounting boundary. This revision replaces that approach. |

Vercel history confirmed READY production deployments for #37–#40, most recently `dpl_AkycaJWcFpDdaxUpnF82VYBpBaKT` for #40. No deployment is required to review this revision.

## Local checks

- `pnpm build`: default Next.js 16.4.0 production build (Turbopack), TypeScript and all 46 pages passed. An earlier webpack build also passed.
- `pnpm typecheck`: passed.
- `pnpm lint:music`: passed for all four playback source files. The repository had no existing lint command; the scoped Biome check is included rather than changing unrelated application code.
- `pnpm test:music`: six component regression tests using real React/StrictMode and a mocked Spotify SDK in JSDOM. Covers child replacement, eager loading, singleton initialization, cleanup/late callbacks, real-event state, delayed readiness, navigation persistence, pending requests, controls, and shared-track playlist identity. These are lifecycle/state tests, not audio tests.

## Browser verification

| Check | Observed result |
| --- | --- |
| Desktop widths 1280 and 1440 | One normal-sized iframe at x=-10000, right=-9680; no horizontal overflow. |
| Mobile widths 375, 390 and 430 | Same containment; one compact global control; no extra native player. |
| Music / About / Books / home footers | Visually inspected clean footers. Each DOM contained one iframe under the permanent host, never a sibling under body. |
| Desktop controls | Computed font, size, dimensions, padding, borders, line height and visible symbols exactly matched production for both controls. |
| Mobile symbols | Both controls displayed monochrome play/pause. Play contains text variation selector FE0E; desktop symbol is unchanged. |
| Tracklist | 120px high with overflow-y:auto; approximately three rows preserved. |
| Play / pause | Spotify events advanced Self Aware from 0:02 to 0:11. A fresh mobile test advanced to 0:09, then both controls changed to Play and the timer stayed at 0:09 after global pause. |
| Next / previous | Global next loaded 505; the Music-page previous loaded Self Aware. Both views reflected Spotify's track events. |
| Playlist / track selection | Selecting drift displayed its 17 tracks. Selecting Amber loaded its track URI and Spotify advanced to 0:23/0:29 with both controls showing Pause. |
| Navigation during playback | Music → About retained 505, the same track iframe URL, a single controller and active global pause state. Subsequent Books/home navigation retained one host. |
| Rebuild interruption | One local Books navigation failed because a build replaced chunks while the prior server was running. Server restarted on the completed build; Books and subsequent navigation rechecked successfully. Not treated as a Spotify fix. |

## Remaining validation before production approval

**Audible speaker/headphone output was not verified.** The browser automation exposes DOM, screenshots and playback events, but no trustworthy audio-output recording. Event progression is evidence that Spotify reports playback, not proof of audible output.

Mobile checks used responsive browser viewports, **not physical iPhone Safari or Android Chrome**. Spotify controls browser-dependent playback permissions and preview/full-track availability; user interaction and account/browser conditions still apply. The implementation does not bypass those restrictions or pretend a denied play succeeded.

Before approving the single production deployment, listen on supported desktop and physical mobile browsers: first play after a fresh load, pause/resume, next/previous, playlist and track selection, navigation, and footer inspection. No production merge or deployment is authorized by this PR.
