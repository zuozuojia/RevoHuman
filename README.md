# RevoHuman project page

A static, editable research/project website inspired by the **editorial structure** of modern robotics launch pages (large hero, concise research narrative, system breakdown, media-first sections, evaluation and citation). It is intentionally not a pixel-for-pixel copy of any reference site.

## Fastest way to edit

1. Open `content.js` and change titles, paragraphs, metrics and card copy.
2. Open `styles.css` to change colors, spacing and typography.
3. Put your paper at `assets/revohuman-paper.pdf` to activate the PDF button.
4. If you later add videos/images, replace any `.data-viz` placeholder blocks in `index.html` with `<video>` / `<img>` elements, or extend `content.js` with media paths.

## Preview locally

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

### Option A — repository root
1. Create a GitHub repo, e.g. `revohuman`.
2. Upload these files to the repo root and push.
3. GitHub → **Settings** → **Pages**.
4. Source: **Deploy from a branch**.
5. Branch: `main`, folder: `/ (root)`.
6. Your page will appear at `https://YOUR_USERNAME.github.io/revohuman/`.

### Option B — username site
Name the repository `YOUR_USERNAME.github.io`. The same files will publish at `https://YOUR_USERNAME.github.io/`.

## Suggested real media to add

- `assets/hero.mp4`: 8–15 s silent loop of operator wearing RevoHuman while performing a dexterous task.
- `assets/glove-closeup.webp`: clean close-up of the exoskeleton glove.
- `assets/ego-view.mp4`: head-camera first-person demo.
- `assets/wrist-view.mp4`: wrist-camera close interaction.
- `assets/tactile.mp4`: tactile heatmap synchronized with touch.
- `assets/replay.mp4`: human → URDF/digital hand replay split-screen.
- `assets/retarget.mp4`: human demonstration → robot execution.

For a Figure/Genesis/Generalist-style launch page, **real video matters more than extra text**. Keep clips short, autoplaying, muted and looped.

## Notes on claims

The current page uses only hardware/system values already stated in the supplied RevoHuman draft. Experimental result cards are deliberately marked `PENDING` where the draft describes an evaluation protocol but does not yet contain numerical results.
