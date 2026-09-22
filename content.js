/*
  EDIT THIS FILE FIRST.
  Most copy, metrics and cards on the page are populated from this object.
  You can safely change text/numbers without touching index.html.
*/
window.SITE_CONTENT = {
  brand: "RevoHuman",
  eyebrow: "Research preview · 2026",
  title: "RevoHuman",
  subtitle: "High-fidelity human demonstrations for contact-grounded dexterous manipulation.",
  heroDeck: "A wearable multimodal capture system that records how humans see, move and make contact — aligning four RGB streams, 21-DoF kinematics per hand, wrist pose and normal-contact signals for subsequent retargeting and robot adaptation.",
  statement: 'Robots need more than video.<br><span>They need grounded interaction.</span>',
  overviewP1: "Contact-rich manipulation depends on continuous hand configuration, wrist motion and physical contact. A single egocentric camera cannot reliably recover all three.",
  overviewP2: "RevoHuman combines human task capability with direct multimodal measurement and a portable data pipeline, targeting the three-way trade-off between task capability, data fidelity and scalable collection.",
  paperTitle: "RevoHuman: Accurate and Scalable Data Collection System for Contact-Grounded Dexterous Manipulation",
  paperDescription: "The manuscript describes the wearable system, direct motion and contact sensing, human-centered reconstruction, explicit timestamp semantics and a layered evaluation protocol. Complete benchmark results are not yet reported. Related work includes DexCap, DexUMI, OpenTouch, OSMO and ART-Glove; full references are included in the PDF.",

  heroSpecs: [
    { value: "21 × 2", label: "hand DoF", note: "direct joint sensing" },
    { value: "200 Hz", label: "hand sensing", note: "encoders + touch" },
    { value: "4", label: "RGB streams", note: "stereo ego + dual wrist" },
    { value: "< 1 ms", label: "sync error", note: "tactile / encoder timestamps" }
  ],

  principles: [
    { n: "01", title: "Human task capability", body: "Let people perform the task directly, preserving natural bimanual coordination, dexterity and contact-rich behavior." },
    { n: "02", title: "Physical data fidelity", body: "Measure joint angles, wrist pose and normal contact directly instead of inferring every physical state from RGB." },
    { n: "03", title: "Scalable collection", body: "Portable wearable hardware avoids occupying a robot body for every demonstration. Each device serves one operator at a time and can be refitted and recalibrated for different people and scenes." }
  ],

  hardwareCards: [
    { cls: "wide", tag: "KINEMATICS", title: "Side-mounted 21-DoF exoskeleton", body: "Side-mounted magnetic encoders preserve primary palm contact areas. Joint zeros, axes and link dimensions define a calibrated forward-kinematics chain; elastic fabric supports fit while a compliant interface accommodates hand motion.", stat: "180 × 145 × 35 mm", statLabel: "single-hand envelope" },
    { cls: "", tag: "TOUCH", title: "Full-palm tactile layer", body: "0.5 mm piezoresistive sensors cover finger segments and palm regions. A compliant TPU interface balances adaptability and deformation. Per-cell zero-load and force calibration maps responses to normal load, not shear force or slip ground truth.", stat: "200 Hz", statLabel: "sampling rate" },
    { cls: "", tag: "VISION", title: "Ego + wrist views", body: "Head stereo gives broad scene context while two palm-facing wrist cameras recover local interaction detail under self-occlusion.", stat: "190° / 124°", statLabel: "head / wrist FOV" },
    { cls: "", tag: "POSE", title: "Shared spatial tracking", body: "Trackers rigidly mounted to the head and both hands provide 6-DoF pose in a common world frame for human-centered reconstruction.", stat: "3 trackers", statLabel: "head + left + right" },
    { cls: "", tag: "MOBILE", title: "Portable capture", body: "The acquisition unit operates at 5 V and supports Ethernet or Wi-Fi output. The manuscript specifies four-hour battery operation for fixed-station and mobile data collection.", stat: "4 h", statLabel: "battery runtime specified in manuscript" },
    { cls: "wide", tag: "TIME", title: "Explicit timestamp semantics", body: "Lightweight PTP maps the four tactile and encoder sampling streams to the host clock. Their reported synchronization error is below 1 ms. Camera and tracker arrival timestamps include transport, buffering and driver delay and are excluded from this accuracy claim.", stat: "< 1 ms", statLabel: "reported sync error: tactile + encoder sampling timestamps only" }
  ],

  dataPanels: [
    { index: "01", tag: "EGOCENTRIC RGB", title: "See the task in human context.", body: "Stereo head cameras capture objects, scene context and the full activity. RGB is directly recorded; depth and point clouds inferred from images are not treated as sensor ground truth.", metric: "1080p · 190° FOV", visual: "vision" },
    { index: "02", tag: "HAND KINEMATICS", title: "Measure motion as motion.", body: "Magnetic encoders provide the joint variables needed to reconstruct finger-segment poses through calibrated forward kinematics.", metric: "21 DoF / hand · 200 Hz", visual: "kinematic" },
    { index: "03", tag: "TACTILE", title: "Know when contact actually happens.", body: "Distributed thin-film sensors capture normal-contact response across the fingers and palm, complementing vision where geometry alone is ambiguous.", metric: "0.5 mm · 200 Hz", visual: "touch" },
    { index: "04", tag: "WRIST RGB + 6D POSE", title: "Stay close to the interaction.", body: "Palm-facing wrist cameras record near-field interaction. Rigid tracker-to-wrist and camera extrinsics express finger poses and tactile locations in a head-centered frame and associate them with the images.", metric: "1080p@30 · 124°", visual: "wrist" }
  ],

  pipeline: [
    { n: "01", title: "Wear", body: "Fit gloves, ego unit and trackers." },
    { n: "02", title: "Calibrate", body: "Calibrate joint zeros, link geometry, tactile response, camera intrinsics and camera–tracker extrinsics." },
    { n: "03", title: "Capture", body: "Record synchronized visual, kinematic, pose and contact streams." },
    { n: "04", title: "Align", body: "Interpolate joints and poses; retain tactile events with nearest-neighbor or hold sampling; associate nearest video frames." },
    { n: "05", title: "Quality check", body: "Flag dropped frames, saturation, tracker loss and timing residuals." },
    { n: "06", title: "Export", body: "Retain raw streams, calibration, original and mapped timestamps, interpolation spans, metadata and quality masks." }
  ],

  evaluations: [
    { tag: "SENSOR", title: "Component accuracy", metric: "PENDING", body: "Encoder accuracy & magnetic robustness · tracker localization · tactile accuracy, hysteresis, drift and repeatability." },
    { tag: "SYSTEM", title: "Trajectory fidelity", metric: "PENDING", body: "Independent pose references test fingertip and palm reconstruction across motions, operators and repeated fitting. Kinematic replay and simulated interaction replay are evaluated separately." },
    { tag: "TASK", title: "Capability range", metric: "200 planned", body: "Proposed randomized comparison of bare-hand ego capture, RevoHuman and robot teleoperation, with common goals, initial conditions, success criteria and familiarization." },
    { tag: "SCALE", title: "Collection efficiency", metric: "PENDING", body: "Qualified trajectories per operator-hour, effective contact time, failure rate and total time including setup, retries and QC." }
  ],

  stackRows: [
    { source: "Robot teleoperation", scale: "Lower", physics: "Robot states + controls", embodiment: "High on target robot", role: "Post-training / deployment calibration" },
    { source: "Simulation", scale: "High", physics: "Direct simulated state", embodiment: "Domain gap to real", role: "Pretraining / coverage / aligned post-training" },
    { source: "RevoHuman", scale: "Wearable / reusable", physics: "Direct human motion + touch", embodiment: "Requires retargeting", role: "Human physical grounding / transfer" },
    { source: "Pure egocentric video", scale: "High", physics: "RGB direct; states estimated", embodiment: "No robot action semantics", role: "Visual / behavior pretraining" }
  ],

  citation: `@misc{revohuman_draft,\n  title = {RevoHuman: Accurate and Scalable Data Collection System for Contact-Grounded Dexterous Manipulation},\n  note  = {Unpublished manuscript; author and publication details not supplied}\n}`
};
