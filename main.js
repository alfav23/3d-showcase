import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const scene = new THREE.Scene();

// Field of view (FOV), aspect ratio, near and far (z-axis render window)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//set camera position to avoid overlapping with model
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer({ alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//create cotrols for user to manipulate scene
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set(0, 0, 0);
controls.update();

//load and add gltf file to scene
const gltfLoader = new GLTFLoader();
  const obj = 'public/3D_Models/E24_Bodylines.gltf';
  gltfLoader.load(
    obj,
    (gltf) => {
      const root = gltf.scene;
      scene.add(root);
    },
    undefined,
    (error) => {
      console.error('GLTF load error:', error);
    }
  );

// create and add ambient and directional lighting
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

const dirLightRed = new THREE.DirectionalLight(0xc90000, 1);
dirLightRed.position.set(0, 50, 50);
scene.add(dirLightRed);

const dirLightYellow = new THREE.DirectionalLight(0xfff400, 1);
dirLightYellow.position.set(0, 50, -50);
scene.add(dirLightYellow);

const dirLightBlue = new THREE.DirectionalLight(0x0004ff, 1);
dirLightBlue.position.set(0, 50, 0);
scene.add(dirLightBlue);

function animate() {
    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);
