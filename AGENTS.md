<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio Engineering Rules

## Design
This is a personal technical portfolio, not a SaaS landing page.

Prioritize:
- typography
- whitespace
- hierarchy
- readability
- content
- performance
- accessibility

Avoid:
- unnecessary gradients
- excessive glassmorphism
- excessive shadows
- particle backgrounds
- unnecessary 3D
- excessive animations
- giant UI elements
- generic AI-generated portfolio patterns

## Content
Never invent:
- achievements
- companies
- awards
- users
- revenue
- projects
- statistics
- testimonials
- credentials

Use real content from the repository. If content is missing, use a TODO/content placeholder.

## Architecture
Do not rewrite the framework without a technical reason.

Prefer incremental changes.
Preserve working functionality unless there is a clear reason to replace it.

## Performance
Prefer:
- static rendering
- optimized images
- minimal JavaScript
- lazy loading
- semantic HTML
- accessible navigation

## Motion
Animations must be subtle.
Support `prefers-reduced-motion`.

## Deployment
Never delete the existing production deployment before the replacement has been verified.
Never hardcode deployment-specific URLs.
Use environment/configuration variables.

## Cloudflare
Do not enable paid Cloudflare services without explicit approval.
Evaluate whether a feature is actually necessary before implementing it.

## Quality
Before considering a task complete:
- run lint
- run type checking
- run tests if available
- build production
- check mobile
- check desktop
- check accessibility
- check console errors
- check broken links
