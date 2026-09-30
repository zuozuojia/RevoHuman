# RevoHuman project page

Static research website based on commit `911d070`, with an opening video.
No build step or package installation is required.

## Preview

Run from this repository:

```bash
python3 -m http.server 8766 --bind 127.0.0.1
```

Open http://127.0.0.1:8766.
Only the externally hosted opening video requires an internet connection.
The nine demonstration clips are served locally from `figs/`.

## Files

- `index.html`: page content, page styles, and the opening video URL.
- `figs/`: page images and nine demonstration MP4s.
- `videos/`: original shot-list documentation, not hosted video files.
- `vendor/`: local Lucide runtime dependency with license.
- `AGENTS.md`: branch and submission rules.

There are no generated bundles, duplicate encoded models, or export/build tools.
`Latex-template/` is not a website dependency and is excluded from Git.

## Features

The opening video streams from https://8.163.108.245/videos/preview.mp4.
It is not stored in this repository. The media server needs a valid HTTPS
certificate and available bandwidth; the website does not re-encode the video.

Figure 1 is a static diagram of the 21-DoF joint layout
(`figs/joint-layout-21dof.png`); the previous interactive 3D viewer, its GLB
model, and the Three.js runtime have been removed.

## Publishing

Work on `feature/ljt`. Push only when explicitly authorized, and integrate by
pull request with a change/validation report. GitHub Pages can serve the
repository root directly from the configured publishing branch.

Demonstration videos follow the Abstract: six data-collection sessions and
three signal/replay clips. Timeline alignment remains a placeholder. The
unavailable overview section has been removed. Figures are numbered
sequentially; Figure 3 uses the updated SVG diagrams.
