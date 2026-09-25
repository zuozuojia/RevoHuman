import * as THREE from 'three';
import { OrbitControls } from './vendor/three/controls/OrbitControls.js';
import { GLTFLoader } from './vendor/three/loaders/GLTFLoader.js';

const root = document.querySelector('#figure-model');
const stage = document.querySelector('#model-stage');
const status = document.querySelector('#model-status');
const fallback = document.querySelector('#model-fallback');
const toolbar = root.querySelector('.model-toolbar');
const jointbar = root.querySelector('.model-joints');
const parts = document.querySelector('#model-part');
const views = document.querySelector('#model-view');
const hide = document.querySelector('#model-hide');
const spin = document.querySelector('#model-spin');
const jointSelect = document.querySelector('#model-joint');
const angleSlider = document.querySelector('#joint-angle');
const angleNumber = document.querySelector('#joint-angle-number');
const axesToggle = document.querySelector('#model-axes');
let renderer;

async function init() {
  renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0xffffff);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.001, 100);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.autoRotateSpeed = 1;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x727984, 1.6));
  for (const [position, intensity] of [[[2,3,-4],2], [[-3,1,2],1]]) {
    const light = new THREE.DirectionalLight(0xffffff, intensity);
    light.position.set(...position); scene.add(light);
  }
  const gltf = await new GLTFLoader().loadAsync('models/revohuman-right-articulated.glb');
  const model = gltf.scene;
  // The CAD hand grows along Blender Y; keep that direction upright in this viewer.
  model.rotation.x = Math.PI / 2;
  scene.add(model);
  model.updateMatrixWorld(true);
  const center = new THREE.Box3().setFromObject(model).getCenter(new THREE.Vector3());
  model.position.sub(center);
  model.updateMatrixWorld(true);
  const meshes = [], axisMeshes = [], links = new Map(), joints = new Map();
  const materials = mesh => Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  function metadata(object, key) {
    for (let node = object; node; node = node.parent) {
      if (node.userData[key] !== undefined) return node.userData[key];
    }
  }
  model.traverse(object => {
    if (object.userData.jointAxis && object.userData.jointName) {
      joints.set(object.userData.jointName, {
        node:object, axis:new THREE.Vector3(...object.userData.jointAxis).normalize(),
        rest:object.quaternion.clone(), angle:0
      });
    }
    if (!object.isMesh) return;
    object.material = Array.isArray(object.material) ? object.material.map(m => m.clone()) : object.material.clone();
    for (const material of materials(object)) material.userData.restEmission = material.emissive?.clone();
    if (metadata(object, 'axisMarker')) {
      axisMeshes.push(object);
      return;
    }
    const name = metadata(object, 'linkName') || object.name;
    object.userData.link = name;
    if (!links.has(name)) links.set(name, []);
    links.get(name).push(object);
    meshes.push(object);
  });
  const label = name => name.replace(/^right_/, '').replace(/_(joint|Link|link)$/, '').replaceAll('_', ' ');
  for (const name of [...links.keys()].sort()) parts.add(new Option(label(name), name));
  for (const name of [...joints.keys()].sort()) jointSelect.add(new Option(label(name), name));
  if (joints.size !== 21) throw new Error('Expected 21 URDF joints');
  jointbar.title = 'Kinematic preview only. The URDF defines continuous joints; mechanical limits and collisions are not enforced.';
  let selected = '';
  function select(name = '') {
    for (const mesh of links.get(selected) || []) for (const m of materials(mesh)) {
      if (m.emissive && m.userData.restEmission) m.emissive.copy(m.userData.restEmission);
    }
    selected = name;
    for (const mesh of links.get(name) || []) {
      mesh.visible = true;
      for (const m of materials(mesh)) m.emissive?.setHex(0x263e72);
    }
    parts.value = name;
    hide.disabled = !name;
    status.textContent = name || `${links.size} links / ${joints.size} joints`;
  }
  function updateAxes() {
    for (const mesh of axisMeshes) {
      mesh.visible = axesToggle.checked;
      const active = metadata(mesh, 'jointName') === jointSelect.value;
      for (const m of materials(mesh)) {
        m.color.setHex(active ? 0xde7825 : 0x087d8d);
        m.emissive?.setHex(active ? 0x552300 : 0x003138);
      }
    }
  }
  const directions = {default:[-0.12,-0.25,-1],front:[0,0,-1],back:[0,0,1],side:[1,0,0]};
  function fit(direction = new THREE.Vector3(...directions[views.value])) {
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);
    const target = box.getCenter(new THREE.Vector3());
    const radius = box.getBoundingSphere(new THREE.Sphere()).radius;
    direction.normalize();
    const right = new THREE.Vector3().crossVectors(camera.up, direction).normalize();
    const up = new THREE.Vector3().crossVectors(direction, right);
    const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    let distance = 0;
    for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) {
      const p = new THREE.Vector3(x,y,z).sub(target);
      distance = Math.max(distance, p.dot(direction) + Math.max(Math.abs(p.dot(right))/(tanV*camera.aspect), Math.abs(p.dot(up))/tanV));
    }
    distance *= 1.12;
    camera.position.copy(target).addScaledVector(direction,distance);
    controls.target.copy(target);
    controls.minDistance = radius * 1.15;
    controls.maxDistance = distance * 3;
    camera.near = radius / 100;
    camera.far = distance * 20;
    camera.updateProjectionMatrix(); controls.update();
  }
  function syncAngle() {
    const joint = joints.get(jointSelect.value);
    angleSlider.value = angleNumber.value = String(joint.angle);
    updateAxes();
  }
  function setAngle(value) {
    if (value === '' || !Number.isFinite(Number(value))) { syncAngle(); return; }
    const joint = joints.get(jointSelect.value);
    joint.angle = Math.max(-180,Math.min(180,Number(value)));
    joint.node.quaternion.copy(joint.rest).multiply(new THREE.Quaternion().setFromAxisAngle(joint.axis,THREE.MathUtils.degToRad(joint.angle)));
    syncAngle();
    fit(camera.position.clone().sub(controls.target));
    status.textContent = `${label(jointSelect.value)}: ${joint.angle}\u00b0`;
  }
  stage.hidden = toolbar.hidden = jointbar.hidden = false;
  stage.append(renderer.domElement);
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('aria-label','Articulated glove 3D model');
  controls.listenToKeyEvents(renderer.domElement);
  new ResizeObserver(() => {
    const {width,height} = stage.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width,height,false);camera.aspect=width/height;fit();
  }).observe(stage);
  fallback.hidden = true;
  select();syncAngle();
  views.addEventListener('change',()=>fit());
  parts.addEventListener('change',()=>select(parts.value));
  hide.addEventListener('click',()=>{for(const m of links.get(selected)||[])m.visible=false;select()});
  jointSelect.addEventListener('change',syncAngle);
  angleSlider.addEventListener('input',()=>setAngle(angleSlider.value));
  angleNumber.addEventListener('change',()=>setAngle(angleNumber.value));
  document.querySelector('#joint-reset').addEventListener('click',()=>setAngle(0));
  axesToggle.addEventListener('change',updateAxes);
  const setSpin = value => {controls.autoRotate=value;spin.setAttribute('aria-pressed',String(value))};
  spin.addEventListener('click',()=>setSpin(!controls.autoRotate));
  document.querySelector('#model-reset').addEventListener('click',()=>{
    meshes.forEach(m=>m.visible=true);
    for(const joint of joints.values()){joint.angle=0;joint.node.quaternion.copy(joint.rest)}
    axesToggle.checked=true;select();syncAngle();views.value='default';setSpin(false);fit();
  });
  const fullscreen = document.querySelector('#model-fullscreen');
  fullscreen.hidden = !root.requestFullscreen;
  fullscreen.addEventListener('click',async()=>{
    try {if(document.fullscreenElement)await document.exitFullscreen();else await root.requestFullscreen()}
    catch {status.textContent='Fullscreen unavailable.'}
  });
  const raycaster=new THREE.Raycaster();let down;
  renderer.domElement.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY]});
  renderer.domElement.addEventListener('pointerup',e=>{
    if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;
    const r=renderer.domElement.getBoundingClientRect();
    raycaster.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),camera);
    const hit=raycaster.intersectObjects([...meshes,...axisMeshes].filter(m=>m.visible),false)[0]?.object;
    if(hit&&metadata(hit,'axisMarker')){jointSelect.value=metadata(hit,'jointName');syncAngle()}
    else select(hit?.userData.link||'');
  });
  renderer.domElement.addEventListener('webglcontextlost',e=>{
    e.preventDefault();renderer.setAnimationLoop(null);stage.hidden=toolbar.hidden=jointbar.hidden=true;fallback.hidden=false;
    status.textContent='3D unavailable. Joint-axis render shown.';
  });
  let visible=true;
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting}).observe(stage);
  renderer.setAnimationLoop(()=>{if(!visible||document.hidden)return;controls.update();renderer.render(scene,camera)});
  window.lucide?.createIcons();
  root.dataset.ready='true';
}

init().catch(error=>{
  console.error('Model viewer:',error);
  renderer?.dispose();stage.hidden=toolbar.hidden=jointbar.hidden=true;fallback.hidden=false;
  status.textContent='3D unavailable. Joint-axis render shown.';
});
