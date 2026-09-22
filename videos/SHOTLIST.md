# RevoHuman demo video shot list

11 slots are already wired into `index.html` (`§Video` + `§Demonstration videos`). **0 files present** — each slot renders a "coming soon" placeholder and auto-upgrades to a real player the moment its file exists at the exact path below. Nothing else on the page has to change.

## Export spec — applies to all 11 clips

| Constraint | Value | Why |
|---|---|---|
| Container / codec | MP4, H.264 High, `yuv420p`, `+faststart` | The page declares a single `<source type="video/mp4">` with no WebM fallback; a non-H.264 MP4 fails to load and the slot silently stays a placeholder. |
| Aspect ratio | **16:9 exactly** | `.video-slot{aspect-ratio:16/9}` + `object-fit:cover` — any other ratio is centre-cropped, so edges are lost. |
| Resolution / fps | 1920×1080, 30 fps | Rail cards render **300 px wide (169 px tall)**; the overview renders ≈712 px wide. 1080p is already oversampled. |
| Audio | none (`-an`) | Player is `muted loop playsInline controls` — audio is never heard. |
| Duration | overview 10–20 s, rail clips 4–8 s | Clips loop; short enough to read at a glance. |
| File size | ≤ 8–10 MB each | The repo already ships 8.7 MB of figures and Pages serves straight from the repo. |
| Filenames | exact, lowercase, no spaces | `data-src` paths are literal. |

Legibility is the binding constraint: a rail clip is 300 px wide on a 1080p-class display, so shoot tight on the hand and contact region — one action per clip, no wide establishing shots with a tiny hand.

## A. Overview — 1 clip, full text column

| File | Section | Content | Duration |
|---|---|---|---|
| `videos/overview.mp4` | `§Video`, directly after the Abstract | Silent tour: operator dons the glove → performs one dexterous task → a glimpse of joint + tactile signals. This is the only clip shown large, so it carries the system story. | 10–20 s |

## B. Data-collection sessions — rail 1, 6 clips (camera footage)

| File | Caption | Camera | Must be visible |
|---|---|---|---|
| `videos/task-pinch.mp4` | Fine pinch grasping | ego | Thumb–index pinch on a small object; fingertip contact clearly readable at 300 px. |
| `videos/task-inhand.mp4` | In-hand manipulation | ego | Object reoriented within the palm across the clip — the case ego view is supposed to cover. |
| `videos/task-tool.mp4` | Tool use | wrist | Tool grasped and used; wrist view must show grip and contact, not the room. |
| `videos/task-twist.mp4` | Twisting & insertion | wrist | Axial rotation → insertion (peg-in-hole, cap twist); rotation must read in 4–8 s. |
| `videos/task-deformable.mp4` | Deformable objects | ego | Cloth / dough / soft object deforming under the hand. |
| `videos/task-bimanual.mp4` | Bimanual coordination | ego | Both hands cooperating on one object. |

Ego = head-mounted camera on the operator. Wrist = wrist-mounted camera on the glove. Action cams default to 4:3 on many models — set 16:9 in-camera where possible; cropping 4:3 down to 16:9 throws away a third of the sensor.

## C. Signals & replay — rail 2, 4 clips (pipeline renders, not camera footage)

| File | Caption | Tag | Content |
|---|---|---|---|
| `videos/viz-kinematics.mp4` | Kinematic reconstruction | 21 DoF | Screen capture: hand skeleton / URDF driven by the 21 encoder degrees of freedom. |
| `videos/viz-tactile.mp4` | Tactile response | full palm | Tactile map overlaid during contact — must be legible as full-palm coverage. |
| `videos/viz-sync.mp4` | Timeline alignment | < 1 ms | The alignment plot itself. This clip is the visual backing for the `< 1 ms` tag — do not ship a placeholder graphic here. |
| `videos/viz-replay.mp4` | Simulation replay | fidelity check | Side-by-side reference vs simulated replay for the fidelity claim. |

These come out of the acquisition/visualisation pipeline (screen recording or Blender render), not a camera. Two gotchas: renders must still be `yuv420p` (10-bit or 4:4:4 output shows as a black frame in Chrome), and H.264 needs even pixel dimensions — pad odd-sized captures by 1 px.

## Before exporting

- [ ] Glove cabling and the dorsal hub dressed out of frame; no glare off the linkages.
- [ ] 2 s of steady lead-in, one continuous action, clean hold at the end (the clip loops).
- [ ] Lighting and white balance consistent across the 6 session clips — they sit side by side in one rail.
- [ ] No portrait footage, and no rotation metadata left to the player: bake rotation in, then verify with the `ffprobe` line below.
- [ ] Session clips match what the paper claims; a clip that contradicts a caption costs more than a missing clip.

## Encode — ready to run

`ffmpeg` is installed at `/opt/homebrew/bin/ffmpeg`. This mirrors the page's own crop behaviour (`scale` up to cover, then centre-crop to 16:9):

```bash
mkdir -p videos && for f in raw/*.mov; do
  ffmpeg -i "$f" \
    -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 21 -preset slow \
    -movflags +faststart -an "videos/$(basename "${f%.*}").mp4"
done
```

## Verify each file before committing

```bash
ffprobe -v error -select_streams v:0 \
  -show_entries stream=codec_name,width,height,pix_fmt,avg_frame_rate -show_entries format=duration,size \
  -of default=nw=1 videos/task-pinch.mp4
```

Expect `codec_name=h264`, `width=1920`, `height=1080`, `pix_fmt=yuv420p`. Then load the page: the matching slot swaps its placeholder for the player on `loadedmetadata`. If a slot still says "coming soon", the file is mistyped or not H.264 — the browser reports nothing.
