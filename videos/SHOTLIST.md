# RevoHuman demo video shot list

Drop the files into `videos/` under these exact filenames. Lengths are estimates of the **finished clip** (lead-in and hold included), not shooting time. Every clip on the page plays `muted + loop`, so keep the opening and closing frames close to each other to loop cleanly.

## A. Overview — 1 clip

| File | Where | Est. length |
|---|---|---|
| `videos/overview.mp4` | `§Video`, right after the Abstract | ≈15 s |

**`videos/overview.mp4` — system overview**
- Content: silent tour that walks the line hardware → task → data: operator dons the glove, performs one dexterous task, a glimpse of joint and tactile signals.
- Framing: the only clip shown large (≈712 px wide), so a modest amount of environment is fine — the hand still owns the frame.
- Beats: 0–2 s lead-in (hand resting next to the object) → 2–12 s one complete grasp–manipulate–place cycle → 12–15 s hold on the final pose.
- Must show: the whole glove (side-mounted exoskeleton, metal finger linkages, dorsal acquisition hub) and one complete task.
- Keep out: cables, table clutter, other people's hands or faces, brand logos, backlight, lens smudges.
- Backs the page copy: `§Video` — "A short tour of the hardware, the data pipeline, and the evaluation."

**Section total ≈ 15 s**

## B. Data-collection sessions — 6 clips (camera footage)

ego = head-mounted camera on the operator · wrist = wrist-mounted camera on the glove.
The rail cards render only 300 px wide, so the hand and the contact region must fill the frame (aim for the hand at ≥60% of frame height), and one clip carries one action.

| File | Caption | View | Est. length |
|---|---|---|---|
| `videos/task-pinch.mp4` | Fine pinch grasping | ego | ≈5 s |
| `videos/task-inhand.mp4` | In-hand manipulation | ego | ≈8 s |
| `videos/task-tool.mp4` | Tool use | wrist | ≈6 s |
| `videos/task-twist.mp4` | Twisting & insertion | wrist | ≈7 s |
| `videos/task-deformable.mp4` | Deformable objects | ego | ≈6 s |
| `videos/task-bimanual.mp4` | Bimanual coordination | ego | ≈8 s |

**`task-pinch.mp4` — fine pinch grasping (≈5 s)**
- Content: thumb and index pinch a small object (nut, pill, M3 screw) — the point is the fingertip contact.
- Framing: ego view, 30–45° downward, object and the two fingers together filling the frame.
- Beats: 0–1.5 s hand enters, fingers open → 1.5–3.5 s pinch closed and lifted slightly → 3.5–5 s hold.
- Must be legible: the contact points at the fingertips; the object held steadily, not slipping.
- Keep out: a hand reduced to a small patch in frame; irrelevant table clutter.

**`task-inhand.mp4` — in-hand manipulation (≈8 s)**
- Content: the object is re-oriented inside the palm (e.g. pinch grip → palmar grasp, or rolled along the fingers).
- Framing: ego view, closer, so the changing relative positions of the fingers read.
- Beats: 0–2 s lead-in → 2–6.5 s progressive re-orientation → 6.5–8 s hold in the new pose. 8 s because in-hand motion needs time to be legible at all.
- Must be legible: the object's change of position relative to the palm, not merely a hand moving.
- Keep out: fingers fully occluding the object so no re-orientation can be seen.

**`task-tool.mp4` — tool use (≈6 s)**
- Content: grasp and use a tool (screwdriver, tweezers, cable-tie gun) — the grip and the tool–object contact are the subject.
- Framing: wrist view, hand and tool filling the frame.
- Beats: 0–1.5 s lead-in (tool already in hand) → 1.5–4.5 s one tool action → 4.5–6 s hold on contact.
- Must be legible: how the tool is gripped, and the contact point at its tip.
- Keep out: only environment or tabletop with no visible grip.

**`task-twist.mp4` — twisting & insertion (≈7 s)**
- Content: axial rotation → insertion (peg-in-hole, cap twist).
- Framing: wrist view, shot from the side of the rotation axis — head-on down the axis hides the rotation.
- Beats: 0–1.5 s lead-in (object aligned) → 1.5–5.5 s rotate and push in → 5.5–7 s hold inserted.
- Must be legible: the rotation itself plus the final seated insertion.
- Keep out: an axis-aligned camera (rotation becomes invisible); push-only footage with no twist.

**`task-deformable.mp4` — deformable objects (≈6 s)**
- Content: cloth, dough or a soft object deforming under the hand.
- Framing: ego view, hand and the deforming silhouette both visible.
- Beats: 0–1.5 s lead-in (before contact) → 1.5–4.5 s force applied, deformation continuously visible → 4.5–6 s hold.
- Must be legible: deformation evolving over time, not a single instant of squash.
- Keep out: motion so fast the deformation cannot be read within 6 s.

**`task-bimanual.mp4` — bimanual coordination (≈8 s)**
- Content: both hands on one object (one holds, one manipulates — unscrewing a cap, mating a connector).
- Framing: ego view that holds both hands; pull back slightly so neither is cropped.
- Beats: 0–2 s lead-in (both hands placed) → 2–6.5 s coordinated action → 6.5–8 s hold.
- Must be legible: the division of labour between the hands, not one hand doing everything.
- Keep out: one hand leaving the frame.

**Section total ≈ 40 s**

## C. Signals & replay — 4 clips (pipeline renders)

These come out of the acquisition / visualisation pipeline as screen recordings or renders, not camera footage. No desktop icons, mouse cursors, notification popups or window chrome in frame.

| File | Caption | Tag | Est. length |
|---|---|---|---|
| `videos/viz-kinematics.mp4` | Kinematic reconstruction | 21 DoF | ≈8 s |
| `videos/viz-tactile.mp4` | Tactile response | full palm | ≈6 s |
| `videos/viz-sync.mp4` | Timeline alignment | < 1 ms | ≈5 s |
| `videos/viz-replay.mp4` | Simulation replay | fidelity check | ≈10 s |

**`viz-kinematics.mp4` — kinematic reconstruction (≈8 s)**
- Content: hand skeleton / URDF driven in real time by the 21 encoder degrees of freedom.
- Frame and notes: render the digital hand against the human one (side by side or ghosted overlay) so the mapping is visible; side-swing and flexion joints should be distinguishable; opening and closing poses match.
- Beats: 0–2 s digital hand at rest → 2–6.5 s one full tracking cycle → 6.5–8 s back near the opening pose.
- Keep out: jitter, mesh interpenetration, or visible desync against the human hand.

**`viz-tactile.mp4` — tactile response (≈6 s)**
- Content: full-palm tactile map (heatmap) changing with contact.
- Frame and notes: keep a pressure scale or colour legend so intensity is readable; contact area must visibly track the grasp; full-palm coverage must be apparent rather than a few active channels.
- Beats: 0–1.5 s no contact (baseline) → 1.5–4.5 s contact and change → 4.5–6 s hold.
- Keep out: a missing legend (intensity becomes unreadable); a single trace that hides the full-palm layout.

**`viz-sync.mp4` — timeline alignment (≈5 s)**
- Content: the multi-channel alignment itself — joint angles, tactile and the three RGB streams on one timeline.
- Frame and notes: axes and units readable, the alignment point visible. This clip is the visual backing for the `< 1 ms` tag on the page — do not ship a decorative graphic here.
- Beats: just stay legible for 5 s; no fast scrolling.
- Keep out: no units, no axes, purely decorative curves.

**`viz-replay.mp4` — simulation replay (≈10 s)**
- Content: reference vs simulated replay side by side, backing the fidelity claim.
- Frame and notes: split left/right or top/bottom, same timeline and same viewpoint; 10 s because the comparison needs time to read.
- Beats: 0–2 s lead-in → 2–8 s both sides playing the motion in sync → 8–10 s hold.
- Keep out: mismatched timing or viewpoints between the two sides, which makes comparison impossible.

**Section total ≈ 29 s**
