<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of your portfolio site with PostHog analytics. Here's a summary of changes made:

- **`instrumentation-client.ts`** (new) — PostHog client-side initialization using the Next.js 15.3+ `instrumentation-client.ts` pattern. Initializes with your project token and host from environment variables, enables exception capture, and sets debug mode in development.
- **`src/app/page.tsx`** — Added `"use client"` directive and `posthog-js` import. Added `onClick` capture handlers to four interactive elements: email link, LinkedIn link, Download PDF button, and project external links.
- **`.env.local`** — Created with `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` set.

Note: The project uses `output: "export"` (static site), so the reverse proxy rewrite pattern was not applicable. PostHog events go directly to `https://us.i.posthog.com`.

## Events

| Event | Description | File |
|---|---|---|
| `resume_downloaded` | User clicks the "Download PDF" button to download the resume PDF | `src/app/page.tsx` |
| `linkedin_clicked` | User clicks the LinkedIn profile link in the header | `src/app/page.tsx` |
| `email_clicked` | User clicks the email address link in the header | `src/app/page.tsx` |
| `project_link_clicked` | User clicks an external project link in the Product Portfolio section (properties: `project`, `label`, `href`) | `src/app/page.tsx` |

## Next steps

We've built a dashboard and insights to track user behavior based on the events instrumented:

**Dashboard:** https://us.posthog.com/project/410291/dashboard/1545507

**Insights:**
- [Resume Downloads Over Time](https://us.posthog.com/project/410291/insights/KnU8blyJ) — Daily line chart of resume downloads (last 30 days)
- [Total Resume Downloads](https://us.posthog.com/project/410291/insights/vPJKXyJA) — All-time download count (bold number)
- [Link Clicks Breakdown](https://us.posthog.com/project/410291/insights/rcq4H6Zh) — Bar chart comparing email, LinkedIn, and project link clicks
- [Visitor to Resume Download Funnel](https://us.posthog.com/project/410291/insights/2LxDceFg) — Conversion funnel from pageview → resume download
- [All Engagement Events Over Time](https://us.posthog.com/project/410291/insights/UK5Hwv6M) — Area chart of all tracked actions combined

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
