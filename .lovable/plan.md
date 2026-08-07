# Plan: Share SkillMatch AI on GitHub + Live Demo

## Goal
Make the project visible to developers and non-technical viewers using GitHub for the code and a public URL for the live demo.

## Step 1 — Push the code to GitHub
1. In the Lovable editor, click the **Plus (+)** menu in the chat input (bottom left).
2. Choose **GitHub → Connect project**.
3. Authorize the Lovable GitHub App when GitHub asks.
4. Pick your GitHub account or organization.
5. Click **Create Repository**.
6. Lovable will push all project files to the new repo.

## Step 2 — Make the repo public and add a README
1. Open the repo on GitHub.
2. Go to **Settings → General → Danger Zone → Change visibility** and set it to **Public**.
3. In Lovable, open the Code Editor and create/edit `README.md`.
4. Add a short project description, tech stack, screenshots, and both links (repo + live demo).

## Step 3 — Get the live demo link
1. In Lovable, click **Publish** (top-right on desktop, bottom-right `...` on mobile).
2. If this is the first publish, choose **Public** visibility so anyone with the link can view it.
3. Wait about one minute for deployment.
4. Copy the published URL.

## Step 4 — Share it
- **For developers:** share the GitHub repo link.
- **For everyone else:** share the published Lovable URL.
- Add both links to the README so they stay together.

## Notes
- This app uses TanStack Start, which needs server-side rendering. GitHub Pages only hosts static files, so it cannot run this app. Use Lovable Publish for the live demo.
- Database data is not exported to GitHub. If needed later, use **Cloud → Advanced settings → Export data**.
