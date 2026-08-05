# Cindr website

The complete static product, support, privacy, terms, deletion, and security website for the Cindr iPhone app. It uses plain HTML, CSS, and JavaScript with no framework, package install, cookie banner, analytics, or external runtime dependency.

Live site: <https://cindr-website.onrender.com>

## Pages

- `/` — product site with an accessible interactive swipe demo
- `/privacy/` — product-accurate privacy policy and Google API Limited Use disclosure
- `/terms/` — terms of use
- `/support/` — help and contact information
- `/data-deletion/` — in-app deletion and Google/Microsoft revocation instructions
- `/security/` — security architecture and vulnerability reporting

## Required launch configuration

Edit only [`assets/js/site-config.js`](assets/js/site-config.js) to set the real support, privacy, and security addresses. Add the App Store URL later; the interface automatically changes the disabled “Coming soon” buttons into links.

The legal documents accurately reflect the current app architecture, but a qualified lawyer should finalize the legal operator name, jurisdiction, contact details, subscription terms, and region-specific requirements before public release.

## Preview locally

From the repository directory:

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`. Absolute site paths require an HTTP server; opening the HTML file directly is not supported.

Run the same verification used by Render:

```sh
node scripts/verify-site.mjs
```

## Deploy on Render

The included [`render.yaml`](render.yaml) is a Render Blueprint.

1. In Render, choose **New → Blueprint**.
2. Connect this GitHub repository.
3. Approve the detected `cindr-website` static service.
4. Deploy. No environment variables or package installation are needed.
5. Add the permanent custom domain in Render after DNS is ready.

Alternatively create a **Static Site** manually with:

- Build command: `node scripts/verify-site.mjs`
- Publish directory: `.`

## Domain launch checklist

After choosing the permanent domain:

1. Set all three real email addresses in `assets/js/site-config.js`.
2. Add the custom domain in Render and update DNS.
3. Replace the current Render canonical URLs and `sitemap.xml` entries with the final custom domain.
4. Add the final App Store URL when it exists.
5. Finalize the legal operator details with counsel.
6. Use the domain and `/privacy/` URL in Google Cloud OAuth consent configuration.

## Privacy posture

This site makes no network request to analytics, advertising, font, or tracking services. It stores no cookies or browser data. Links to Google, Microsoft, and Apple leave the site only after a visitor chooses them.
