import * as THREE from 'three';
import { OrbitControls } from './vendor/three/controls/OrbitControls.js';
import { GLTFLoader } from './vendor/three/loaders/GLTFLoader.js';

const root = document.querySelector('#figure-model');
const stage = document.querySelector('#model-stage');
const status = document.querySelector('#model-status');
const fallback = document.querySelector('#model-fallback');
const toolbar = root.querySelector('.model-toolbar');
const parts = document.querySelector('#model-part');
const views = document.querySelector('#model-view');
const hide = document.querySelector('#model-hide');
const spin = document.querySelector('#model-spin');
let renderer;

async function init() {
  renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0xffffff);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.001, 100);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.autoRotateSpeed = 1;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x727984, 1.2));
  for (const [position, intensity] of [[[2,3,4],1.8],[[-3,1,-2],1]]) {
    const light = new THREE.DirectionalLight(0xffffff, intensity);
    light.position.set(...position); scene.add(light);
  }
  const gltf = await new GLTFLoader().loadAsync('models/revohuman-left.glb');
  const model = gltf.scene;
  scene.add(model);
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);
  const radius = box.getBoundingSphere(new THREE.Sphere()).radius;
  const meshes = [];
  model.traverse(object => {
    if (!object.isMesh) return;
    object.material = object.material.clone();
    object.userData.link = object.parent.name;
    meshes.push(object);
    parts.add(new Option(object.userData.link, object.uuid));
  });
  let selected;
  function select(mesh) {
    if (selected) selected.material.emissive.setHex(0x000000);
    selected = mesh;
    if (mesh) { mesh.visible = true; mesh.material.emissive.setHex(0x263e72); }
    parts.value = mesh?.uuid || '';
    hide.disabled = !mesh;
    status.textContent = mesh ? mesh.userData.link : `${meshes.length} links`;
  }
  function fit(view = views.value) {
    const directions = {default:[0.65,0.2,1],front:[1,0,0],back:[-1,0,0],side:[0,0,1]};
    const direction = new THREE.Vector3(...directions[view]).normalize();
    const right = new THREE.Vector3().crossVectors(camera.up, direction).normalize();
    const up = new THREE.Vector3().crossVectors(direction, right);
    const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    let distance = 0;
    // Fit all eight bounding-box corners in the selected camera orientation.
    for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) {
      const p = new THREE.Vector3(x, y, z).sub(center);
      distance = Math.max(distance, p.dot(direction) + Math.max(Math.abs(p.dot(right)) / (tanV * camera.aspect), Math.abs(p.dot(up)) / tanV));
    }
    distance *= 1.12;
    camera.position.copy(direction.multiplyScalar(distance));
    controls.target.set(0,0,0);
    controls.minDistance = radius * 1.15;
    controls.maxDistance = distance * 3;
    camera.near = radius / 100;
    camera.far = distance * 20;
    camera.updateProjectionMatrix(); controls.update();
  }
  stage.hidden = false;
  toolbar.hidden = false;
  stage.append(renderer.domElement);
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('aria-label','Glove 3D model');
  controls.listenToKeyEvents(renderer.domElement);
  const resize = new ResizeObserver(() => {
    const {width,height} = stage.getBoundingClientRect();
    renderer.setSize(width,height,false);camera.aspect = width/height;fit();
  });
  resize.observe(stage);
  fallback.hidden = true;
  select(null);
  views.addEventListener('change',()=>fit());
  parts.addEventListener('change',()=>select(meshes.find(m=>m.uuid===parts.value)));
  hide.addEventListener('click',()=>{if(selected){selected.visible=false;select(null)}});
  const setSpin = value => {controls.autoRotate=value;spin.setAttribute('aria-pressed',String(value))};
  spin.addEventListener('click',()=>setSpin(!controls.autoRotate));
  document.querySelector('#model-reset').addEventListener('click',()=>{
    meshes.forEach(m=>m.visible=true);select(null);views.value='default';setSpin(false);fit();
  });
  const fullscreen = document.querySelector('#model-fullscreen');
  fullscreen.hidden = !root.requestFullscreen;
  fullscreen.addEventListener('click',async()=>{
    try {if(document.fullscreenElement)await document.exitFullscreen();else await root.requestFullscreen()}
    catch {status.textContent='Fullscreen unavailable.'}
  });
  const raycaster = new THREE.Raycaster();
  let down;
  renderer.domElement.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY]});
  renderer.domElement.addEventListener('pointerup',e=>{
    if(!down || Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;
    const r=renderer.domElement.getBoundingClientRect();
    raycaster.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),camera);
    select(raycaster.intersectObjects(meshes.filter(m=>m.visible),false)[0]?.object);
  });
  renderer.domElement.addEventListener('webglcontextlost',e=>{
    e.preventDefault();renderer.setAnimationLoop(null);stage.hidden=true;toolbar.hidden=true;fallback.hidden=false;
    status.textContent='3D unavailable. Original figures shown.';
  });
  let visible = true;
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting}).observe(stage);
  renderer.setAnimationLoop(()=>{
    if(!visible || document.hidden)return;
    controls.update();renderer.render(scene,camera);
  });
  window.lucide?.createIcons();
  root.dataset.ready='true';
}

init().catch(error=>{
  console.error('Model viewer:',error);
  renderer?.dispose();stage.hidden=true;toolbar.hidden=true;fallback.hidden=false;
  status.textContent='3D unavailable. Original figures shown.';
});
