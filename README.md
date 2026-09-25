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
Only the externally hosted opening video requires an internet connection.
The nine demonstration clips are served locally from `figs/`.

## Files

- `index.html`: page content, page styles, and the opening video URL.
- `figs/`: page images, the static Figure 1 fallback, and nine demonstration MP4s.
- `videos/`: original shot-list documentation, not hosted video files.
- `figure-model.js`: interactive viewer source, loaded directly by the browser.
- `figure-model.css`: styles scoped to the viewer.
- `models/revohuman-right-articulated.glb`: current Blender right-hand assembly, with 23 link frames, 21 joint frames, and renderable rotation-axis markers.
- `figs/glove-joint-axes.png`: transparent Blender render, also used as the viewer fallback.
- `vendor/`: local Three.js and Lucide runtime dependencies with licenses.
- `AGENTS.md`: branch and submission rules.

There are no generated bundles, duplicate encoded models, or export/build tools.
`Latex-template/` is not a website dependency and is excluded from Git.

## Features

The opening video streams from https://8.163.108.245/videos/preview.mp4.
It is not stored in this repository. The media server needs a valid HTTPS
certificate and available bandwidth; the website does not re-encode the video.

Figure 1 supports rotation, zoom, front/back/side views, selecting and hiding
links, reset, auto-rotation, and fullscreen where supported. Select a joint and
adjust its angle with the slider or numeric input; downstream links follow the
URDF hierarchy. Axes can be toggled and clicked to select a joint. If WebGL or
the model cannot load, the Blender joint-axis render remains visible.

Joint axes and zero-pose transforms come from the right-hand chain in
`Revo_Human_DV1_URDF_Bimanual.urdf`. The CAD alignment maps URDF coordinates to
Blender as `(-y, z - 0.116083, -x + 0.0005)` in meters. All 21 origins match
the corresponding CAD ring centers within numerical precision. The 136 CAD
parts were assigned to the 23 URDF links by matching their mesh surfaces; the
largest sampled point-to-surface distance was below 0.03 mm. This is a file
alignment check, not a measurement of physical hardware accuracy.

All 21 URDF joints are continuous: the +/-180 degree controls are a visualization
range, not physical joint limits. The viewer does not perform collision checking,
mechanical coupling, or robot control. Axis arrows point along the URDF positive
axis; positive joint angles follow the right-hand rule. The GLB embeds axis,
link, and source-checksum metadata; no extra runtime files are required.

## Publishing

Work on `feature/ljt`. Push only when explicitly authorized, and integrate by
pull request with a change/validation report. GitHub Pages can serve the
repository root directly from the configured publishing branch.

Demonstration videos follow the Abstract: six data-collection sessions and
three signal/replay clips. Timeline alignment remains a placeholder. The
unavailable overview section has been removed. Figure 2 has been removed;
Figure 4 uses the updated SVG diagrams.
