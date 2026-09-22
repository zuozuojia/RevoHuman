# RevoHuman project page

Static research website based on commit `911d070`, with an opening video and
an interactive Figure 1. No build step or package installation is required.

## Preview

Run from this repository:

```bash
python3 -m http.server 8766 --bind 127.0.0.1
```

Open http://127.0.0.1:8766. Use HTTP rather than double-clicking `index.html`:
browser security prevents loading the 3D modules/model through `file://`.
Video playback requires an internet connection.

## Files

- `index.html`: page content, page styles, and the opening video URL.
- `figs/`: original page images and the static Figure 1 fallback.
- `videos/`: original shot-list documentation, not hosted video files.
- `figure-model.js`: interactive viewer source, loaded directly by the browser.
- `figure-model.css`: styles scoped to the viewer.
- `models/revohuman-left.glb`: the single 3D model asset.
- `vendor/`: local Three.js and Lucide runtime dependencies with licenses.
- `AGENTS.md`: branch and submission rules.

There are no generated bundles, duplicate encoded models, or export/build tools.
`Latex-template/` is not a website dependency and is excluded from Git.

## Features

The opening video streams from https://8.163.108.245/videos/preview.mp4.
It is not stored in this repository. The media server needs a valid HTTPS
certificate and available bandwidth; the website does not re-encode the video.

Figure 1 supports rotation, zoom, front/back/side views, selecting and hiding
links, reset, auto-rotation, and fullscreen where supported. If WebGL or the
model cannot load, the original static figures remain visible.

## Publishing

Work on `feature/ljt`. Push only when explicitly authorized, and integrate by
pull request with a change/validation report. GitHub Pages can serve the
repository root directly from the configured publishing branch.

The rest of the page retains the content and styling of `911d070`. Planned
video slots remain placeholders until their media URLs are supplied.
