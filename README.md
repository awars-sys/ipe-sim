# IPE Dental Collaborator (live site) · version 7.0

Version 7.0 keeps the v5.0 EHR look (navy workstation, patient tabs, yellow question box, hints, highlighter) and runs Taylor Watterson's guided flow inside it: one group chat with Maya across introductions, Margaret, Lucy and Brian; four steps per case (Roles, Referrals, Tobacco plan one A at a time, Joint note); a debrief after each case; and a signed final report for Canvas. No marks, tries or model answers.

| File | What it does |
|---|---|
| `public/index.html` | The EHR page students use. Faculty settings are in the CONFIG block at the top of the script. |
| `public/cases.js` | What students can see: the three charts, question-box text, hints and the backup Maya script. |
| `netlify/functions/maya.mjs` | The server file. Holds Maya's instructions, reads your API key, and handles chat, debriefs and the report. |
| `netlify/data/faculty.mjs` | Maya's private dental findings and the faculty keys. Never published, so students can't read them. |
| `netlify.toml` | Tells Netlify where things are. No build step is needed. |

Your API key never goes in these files. It lives only in Netlify's environment variables.

## Settings (Netlify > Project configuration > Environment variables)

| Name | Needed? | Value |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Your key from platform.claude.com (keep it as a secret, Production) |
| `CLAUDE_MODEL` | No | `claude-haiku-5-5` (the default) |
| `CLASS_CODE` | No | e.g. `phar462`. Students type it once per browser session. Leave it out for no code |
| `REPORT_MODEL` | No | Model for debriefs and the report. Defaults to `CLAUDE_MODEL` |
| `MAYA_EFFORT` / `REPORT_EFFORT` | No | `low` (default), `medium` or `high` |
| `MAX_REPLY_TOKENS` | No | Safety ceiling per reply. Defaults to `1500` |

After changing a setting: Deploys > Trigger deploy > Deploy project.

## Cost

- Maya's instructions and the chart are cached for an hour, and the chat so far is cached between turns, so most of each request is read at a tenth of the price.
- Only the current case's messages are sent, never the whole session.
- Expected cost for 180 students (about 60 groups, 3 cases each): roughly $1 to $3 on Haiku 5.5. Your $15 spend limit is the hard cap.
- Check caching works: Netlify > Logs > Functions > maya. Each line shows `cache_read_input_tokens`; after the first message of a case it should be in the thousands.

## Backup Maya (no AI)

- If Claude doesn't answer, a scripted Maya answers that one message and the next message tries Claude again.
- If the key is missing or credit runs out, the page switches to backup Maya for the rest of that session and shows a setup note at the top.
- Add `?practice` to the link to run backup Maya only (free), e.g. for a walk-through before class.
- In backup mode, debriefs become a self-check list and the report is filled from the group's own messages for them to edit.

## Good to know

- Each GitHub commit triggers a Netlify deploy. Group your edits into one commit.
- The chat is saved in the browser. A new group on the same laptop clicks Start over on the Team introductions tab.
- No student IDs are collected. Group names and sign-off names are typed by students.

Version history: see `CHANGELOG.md`.
