# IPE Dental Collaborator (live site) · version 5.0

| File | What it does |
|---|---|
| `public/index.html` | The EHR page students use. |
| `public/cases.mjs` | The three patient cases, rubrics, hints and example answers. Edit cases here. |
| `netlify/functions/maya.mjs` | The server file. It reads your API key from Netlify, adds Maya's instructions and the rubric, and calls Claude Haiku 5.5. |
| `netlify.toml` | Tells Netlify where things are. No build step is needed. |

Your API key never goes in these files. It lives only in Netlify's environment variables.

## Updating from an earlier version

Replace all four items in your GitHub repository with the ones in this folder (same names, same places), then commit once. Netlify redeploys on its own. Your API key and settings stay as they are.

## Settings (Netlify > Project configuration > Environment variables)

| Name | Needed? | Value |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Your key from platform.claude.com |
| `CLAUDE_MODEL` | No | Defaults to `claude-haiku-5-5` |
| `MAYA_EFFORT` | No | `low` (default), `medium` or `high`. Higher is slower and costs more |
| `MAX_REPLY_TOKENS` | No | Safety ceiling per reply. Defaults to `1500` |

After changing a setting, go to Deploys and click Trigger deploy.

## Useful links

- Add `?practice` to the site link to use the free offline engine (no Claude, no cost).
- Add `#lucy`, `#brian` or `#margaret` to open a case directly.

## Good to know

- Each GitHub commit triggers a new Netlify deploy. On the free plan each deploy uses 15 of your 300 monthly credits, so save several edits into one commit.
- If Claude can't be reached, the practice engine answers that message and the page tries Claude again on the next one.
- No student names or IDs are collected. Only the chat text for the current question goes to Claude. Highlights stay in the student's browser and only appear in the chat they copy.
- The answer keys are in `public/cases.mjs`, which a determined student could find in the browser.
