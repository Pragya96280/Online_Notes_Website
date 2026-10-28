# Notes Hub — Render-ready

A static Notes Hub website with subject notes, search, account creation/login demo, and personal notes.

## Deploy on Render

### Option A: Deploy from a GitHub repository
1. Extract this ZIP.
2. Create a GitHub repository and upload the **contents** of this folder (so `index.html` and `render.yaml` are at the repository root).
3. In Render, choose **New + → Blueprint** and connect the repository.
4. Render reads `render.yaml` and deploys the static site. Open the generated `onrender.com` URL when deployment completes.

### Option B: Create a Static Site manually
- **New + → Static Site** and connect your GitHub repository.
- Build command: leave blank (or use `echo Static site`).
- Publish directory: `.`

## Run locally
Open `index.html` in a browser, or serve this directory with a local static server.

## Important authentication limitation
This is a static demo. Accounts and personal notes are stored in each user's browser `localStorage`; they do not sync across devices and are not secure server-side accounts. Do not use real or reused passwords. A production authority/admin login requires a backend (Node.js/Express + database), server-side password hashing, sessions or secure tokens, and role-based authorization.

## Files
- `index.html` — page markup
- `css/style.css` — styling
- `js/app.js` — login demo, navigation, search, personal notes
- `js/data.js` — subject and topic content
- `js/extra.js` — supplementary topic content
- `render.yaml` — Render static-site Blueprint configuration
