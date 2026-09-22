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
  heroDeck: "A wearable multimodal capture system that records how humans see, move and make contact — synchronizing egocentric RGB, 21-DoF hand kinematics, wrist pose and tactile signals into robot-learning-ready trajectories.",
  statement: 'Robots need more than video.<br><span>They need grounded interaction.</span>',
  overviewP1: "Contact-rich manipulation depends on continuous hand configuration, wrist motion and physical contact. A single egocentric camera cannot reliably recover all three.",
  overviewP2: "RevoHuman combines human task capability with direct multimodal measurement and a portable data pipeline, targeting the three-way trade-off between task capability, data fidelity and scalable collection.",
  paperTitle: "RevoHuman: High-Fidelity Human Demonstration Capture for Contact-Grounded Dexterous Manipulation",
  paperDescription: "Technical paper draft covering the wearable system, kinematics, tactile sensing, visual capture, calibration, synchronization and evaluation protocol.",

  heroSpecs: [
    { value: "21 × 2", label: "hand DoF", note: "direct joint sensing" },
    { value: "200 Hz", label: "hand sensing", note: "encoders + touch" },
    { value: "4", label: "RGB streams", note: "stereo ego + dual wrist" },
    { value: "< 1 ms", label: "sync error", note: "tactile / encoder timestamps" }
  ],

  principles: [
    { n: "01", title: "Human task capability", body: "Let people perform the task directly, preserving natural bimanual coordination, dexterity and contact-rich behavior." },
    { n: "02", title: "Physical data fidelity", body: "Measure joint angles, wrist pose and normal contact directly instead of inferring every physical state from RGB." },
    { n: "03", title: "Scalable collection", body: "Portable wearable hardware avoids occupying a robot body or a dedicated teleoperation station for every demonstration." }
  ],

  hardwareCards: [
    { cls: "wide", tag: "KINEMATICS", title: "Side-mounted 21-DoF exoskeleton", body: "A mechanically interpretable kinematic chain places compact magnetic encoders along the side of each finger, keeping primary palm and fingertip contact regions open.", stat: "180 × 145 × 35 mm", statLabel: "single-hand envelope" },
    { cls: "", tag: "TOUCH", title: "Full-palm tactile layer", body: "0.5 mm thin-film piezoresistive sensing across finger segments and palm regions captures normal-contact response at high rate.", stat: "200 Hz", statLabel: "sampling rate" },
    { cls: "", tag: "VISION", title: "Ego + wrist views", body: "Head stereo gives broad scene context while two palm-facing wrist cameras recover local interaction detail under self-occlusion.", stat: "190° / 124°", statLabel: "head / wrist FOV" },
    { cls: "", tag: "POSE", title: "Shared spatial tracking", body: "Trackers rigidly mounted to the head and both hands provide 6-DoF pose in a common world frame for human-centered reconstruction.", stat: "3 trackers", statLabel: "head + left + right" },
    { cls: "", tag: "MOBILE", title: "Portable capture", body: "Low-voltage operation, battery runtime and wired/wireless output support fixed stations as well as mobile human data collection.", stat: "4 h", statLabel: "battery runtime" },
    { cls: "wide", tag: "TIME", title: "Explicit timestamp semantics", body: "Sensor-side sampling timestamps are mapped onto a common host clock, while streams without device-side sample time are labeled by arrival time. The output preserves this distinction instead of hiding it.", stat: "< 1 ms", statLabel: "measured sync error for hand tactile + encoder sampling timestamps" }
  ],

  dataPanels: [
    { index: "01", tag: "EGOCENTRIC RGB", title: "See the task in human context.", body: "Stereo head cameras capture objects, scene context and the full activity from the operator’s point of view.", metric: "1080p · 190° FOV", visual: "vision" },
    { index: "02", tag: "HAND KINEMATICS", title: "Measure motion as motion.", body: "Magnetic encoders provide the joint variables needed to reconstruct finger-segment poses through calibrated forward kinematics.", metric: "21 DoF / hand · 200 Hz", visual: "kinematic" },
    { index: "03", tag: "TACTILE", title: "Know when contact actually happens.", body: "Distributed thin-film sensors capture normal-contact response across the fingers and palm, complementing vision where geometry alone is ambiguous.", metric: "0.5 mm · 200 Hz", visual: "touch" },
    { index: "04", tag: "WRIST RGB + 6D POSE", title: "Stay close to the interaction.", body: "Palm-facing wrist cameras and tracked wrist pose provide local visual context and a geometric bridge into a human-centered 3D coordinate tree.", metric: "1080p@30 · 124°", visual: "wrist" }
  ],

  pipeline: [
    { n: "01", title: "Wear", body: "Fit gloves, ego unit and trackers." },
    { n: "02", title: "Calibrate", body: "Zero joints, geometry, tactile cells and camera–tracker extrinsics." },
    { n: "03", title: "Capture", body: "Record synchronized visual, kinematic, pose and contact streams." },
    { n: "04", title: "Align", body: "Map timestamps, transform coordinates and associate modalities." },
    { n: "05", title: "Quality check", body: "Flag dropped frames, saturation, tracker loss and timing residuals." },
    { n: "06", title: "Export", body: "Package raw + aligned trajectories for downstream learning." }
  ],

  evaluations: [
    { tag: "SENSOR", title: "Component accuracy", metric: "PENDING", body: "Encoder accuracy & magnetic robustness · tracker localization · tactile accuracy, hysteresis, drift and repeatability." },
    { tag: "SYSTEM", title: "Trajectory fidelity", metric: "PENDING", body: "Rigid-body coupling · fingertip / palm reconstruction · multimodal spatial and temporal alignment · replay accuracy." },
    { tag: "TASK", title: "Capability range", metric: "200 tasks", body: "Randomized cross-comparison across bare-hand ego capture, RevoHuman and representative robot teleoperation." },
    { tag: "SCALE", title: "Collection efficiency", metric: "PENDING", body: "Qualified trajectories per operator-hour, effective contact time, failure rate and total time including setup, retries and QC." }
  ],

  stackRows: [
    { source: "Robot teleoperation", scale: "Lower", physics: "Robot states + controls", embodiment: "High on target robot", role: "Post-training / deployment calibration" },
    { source: "Simulation", scale: "High", physics: "Direct simulated state", embodiment: "Domain gap to real", role: "Pretraining / coverage / aligned post-training" },
    { source: "RevoHuman", scale: "Medium → scalable", physics: "Direct human motion + touch", embodiment: "Requires retargeting", role: "Human physical grounding / transfer" },
    { source: "Pure egocentric video", scale: "High", physics: "RGB direct; states estimated", embodiment: "No robot action semantics", role: "Visual / behavior pretraining" }
  ],

  citation: `@article{revohuman2026,\n  title   = {RevoHuman: High-Fidelity Human Demonstration Capture for Contact-Grounded Dexterous Manipulation},\n  author  = {RevoHuman Team},\n  year    = {2026}\n}`
};
