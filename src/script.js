import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Raycaster } from "three";

var pNormal = new THREE.Vector3(0, 1, 0);
var planeIntersect = new THREE.Vector3();
var pIntersect = new THREE.Vector3();
var shift = new THREE.Vector3();
var isDragging = false;
var dragObject;
let dragObjectArray = [];
let modelTYPE;
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.5, 0.5, 0.5);

// Object GridHelper
const size = 30;
const divisions = 30;
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

//arrowHelper
let arrowHelper = addArrowHelper(new THREE.Vector3(0, 0, 0));
scene.add(arrowHelper);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 20;
camera.position.y = 20;
camera.position.x = 10;
scene.add(camera);

// LIGHTS

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
hemiLight.color.setHSL(0.6, 1, 0.6);
hemiLight.groundColor.setHSL(0.095, 1, 0.75);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.color.setHSL(0.1, 1, 0.95);
dirLight.position.set(-1, 1.75, 1);
dirLight.position.multiplyScalar(30);
scene.add(dirLight);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
const raycaster = new THREE.Raycaster(); // create once
const mouse = new THREE.Vector2();

let time = Date.now();
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

// ---------------------- events ---------------------- //
document.addEventListener("dragstart", function (event) {
  event.preventDefault();
});

document.addEventListener("pointermove", (event) => {
  mouse.x = (event.offsetX / sizes.width) * 2 - 1;
  mouse.y = -(event.offsetY / sizes.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  if (isDragging) {
    if (modelTYPE && event.target.className == "webgl") {
      addModel(modelTYPE);
    }
    raycaster.ray.intersectPlane(plane, planeIntersect);
    if (dragObject) {
      dragObject.position.addVectors(planeIntersect, shift);

      arrowHelper.position.set(
        dragObject.position.x,
        dragObject.position.y,
        dragObject.position.z
      );
    }
  }
});

document.addEventListener("pointerdown", (event) => {
  if (event.target.className == "draggable") {
    isDragging = true;
    modelTYPE = event.target.id;
  }

  const intersects = raycaster.intersectObjects(dragObjectArray);
  if (intersects.length > 0) {
    controls.enabled = false;
    pIntersect.copy(intersects[0].point);
    plane.setFromNormalAndCoplanarPoint(pNormal, pIntersect);
    shift.subVectors(intersects[0].object.position, intersects[0].point);
    isDragging = true;
    dragObject = intersects[0].object;
  }
});

document.addEventListener("pointerup", () => {
  isDragging = false;
  dragObject = null;
  modelTYPE = "";
  controls.enabled = true;
});

function addModel(figure) {
  // Object
  let geometry, color, material, mesh;
  switch (figure) {
    case "CUBE":
      geometry = new THREE.BoxGeometry(2, 2, 2);
      break;
    case "SPHERE":
      geometry = new THREE.SphereGeometry(1, 16, 16);
      break;
    case "TorusKnot":
      geometry = new THREE.TorusKnotGeometry(1, 0.4, 64, 32);
      break;
    case "Cone":
      geometry = new THREE.ConeGeometry(1, 2, 32);
      break;
    case "Cylinder":
      geometry = new THREE.CylinderGeometry(2, 2, 2, 32);
      break;
    case "Torus":
      geometry = new THREE.TorusGeometry(2, 0.4, 16, 100);
      break;
    default:
      break;
  }
  color = new THREE.Color(Math.random(), Math.random(), Math.random());
  material = new THREE.MeshLambertMaterial();
  material.color.set(color);
  mesh = new THREE.Mesh(geometry, material);
  geometry.computeBoundingBox();
  geometry.translate(0, geometry.boundingBox.max.y, 0, 0);

  dragObjectArray.push(mesh);
  scene.add(mesh);

  dragObject = mesh;
  isDragging = true;
  modelTYPE = "";
}

function addArrowHelper(originXYZ) {
  //arrowHelper
  const dirX = new THREE.Vector3(1, 0, 0);
  const dirY = new THREE.Vector3(0, 1, 0);
  const dirZ = new THREE.Vector3(0, 0, 1);

  //normalize the direction vector (convert to vector of length 1)
  //dirX.normalize();

  const origin = originXYZ;
  const length = 5;
  const hex = 0xffff00;

  let arrowHelperX = new THREE.ArrowHelper(dirX, origin, length, 0xffff00);
  let arrowHelperY = new THREE.ArrowHelper(dirY, origin, length, 0xff0000);
  let arrowHelperZ = new THREE.ArrowHelper(dirZ, origin, length, 0x00ff00);

  const arrowXYZ = new THREE.Group();
  arrowXYZ.add(arrowHelperX);
  arrowXYZ.add(arrowHelperY);
  arrowXYZ.add(arrowHelperZ);

  return arrowXYZ;
}
