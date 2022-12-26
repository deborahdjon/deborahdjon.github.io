import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui'

// Scene
const scene = new THREE.Scene();

// Camera
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.01;
const far = 1000
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(0, 30, 0);
camera.lookAt(0, 0, 0);
// todo: add option to pane through the scene

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#c')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);


//Light
let color = 0xFFFFFF;
let intensity = 0.4;

const ambientLight = new THREE.AmbientLight(color, intensity);
scene.add(ambientLight);

intensity = 0.8;
const pointLight = new THREE.PointLight(color, intensity)
scene.add(pointLight);
pointLight.position.set(30, 30, 10)

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)
// X = red. The Y = green. Z = blue.
const axesHelper = new THREE.AxesHelper( 15 );
scene.add( axesHelper );

const gui = new GUI()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'x', 0, 40)
cameraFolder.add(camera.position, 'y', 0, 40)
cameraFolder.add(camera.position, 'z', 0, 40)
cameraFolder.open()

const controls = new OrbitControls( camera, renderer.domElement );





//half circlle
color = 0x00FF00;
let radius = 1;
let widthSegments = 30; 
let heightSegments = 15;
let phiStart = 0;
let phiLength = Math.PI;
let thetaStart = 0;
let thetaLength = Math.PI;

let geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength );
let material = new THREE.MeshStandardMaterial({
  color: color,
  // wireframe: true
});

const r = 10

material.side = THREE.DoubleSide; // THREE.BackSide;
const halfSphere = new THREE.Mesh(geometry, material);
scene.add(halfSphere);
halfSphere.position.set(-2*r,0,0);


let x = halfSphere.position.x;
let z = halfSphere.position.z;
let topCirleHalf = false;
const offset = 0.01;
let angle = 0; 

function animate() {
  requestAnimationFrame(animate);
  // angle -= Math.PI*offset;
  // if (angle>Math.PI*2){
  //   angle = 0;
  // }

  // x = Math.sin(angle)*r
  // z = Math.cos(angle)*r
  // halfSphere.position.setX(x)
  // halfSphere.position.setZ(z)


  // halfSphere.rotation.y -= offset*(Math.PI);

  renderer.render(scene, camera);
  cameraFolder.update();
  controls.update();
}

animate();
