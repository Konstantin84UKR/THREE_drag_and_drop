import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Raycaster } from "three";

console.log(THREE);
console.log(OrbitControls);
console.log(Raycaster);

var pNormal = new THREE.Vector3(0, 1, 0); // plane's normal
var planeIntersect = new THREE.Vector3(); // point of intersection with the plane
var pIntersect = new THREE.Vector3(); // point of intersection with an object (plane's point)
var shift = new THREE.Vector3(); // distance between position of an object and points of intersection with the object
var isDragging = false;
var dragObject;
let dragObjectArray = [];
let modelToDrag;
let target;

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.5, 0.5, 0.5);

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
mesh.name = "CUBE";
dragObjectArray.push(mesh);
scene.add(mesh);

//dragObject = mesh;

const size = 30;
const divisions = 30;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

//helper.visible = false;
scene.add(plane);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 20;
camera.position.y = 20;
camera.position.x = 10;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

/// MAIN LOGIC

const raycaster = new THREE.Raycaster(); // create once
const clickMouse = new THREE.Vector2(); // create once
const moveMouse = new THREE.Vector2(); // create once
let draggable = new THREE.Object3D();

window.addEventListener("click", (event) => {});

const mouse = new THREE.Vector2();
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.offsetX / sizes.width) * 2 - 1;
  mouse.y = -(event.offsetY / sizes.height) * 2 + 1;
});

let time = Date.now();
// Clock
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

///---------------

// var elements = document.querySelectorAll(".draggable");
// for (var i = 0; i < elements.length; i++) {
//   elements[i].addEventListener = function () {

//   };
// }

document.addEventListener("drag", function (event) {
  console.log(event);
  // console.log("drag Нужно понять какая фигура");
  // //modelToDrag = this.querySelector(event.srcElement);
  // //console.log(modelToDrag);
  // if (event.target.className == "draggable") {
  //   // console.log("Показать Фигшуру");
  //   // let x = event.offsetX;
  //   // let y = event.offsetY;
  //   // draggable = addCube(x, y);
  //   // if (draggable !== undefined) {
  //   //   scene.add(draggable);
  //   console.log("event.target.className   " + event.target.className);
  //   console.log("event.target.id   " + event.target.id);
  //   modelToDrag = event.target.id;
  //   // }
  //   //ddCube();
  // }
  event.preventDefault();
});

document.addEventListener("dragstart", function (event) {
  // store a ref. on the dragged elem
  // dragged = event.target;
  // make it half transparent
  //target = event.target.style.opacity = 0.5;
  //addCube();
  // console.log("уБираю Картинку");
  event.preventDefault();
});

document.addEventListener("dragend", function (event) {
  // reset the transparency
  // target.style.opacity = 0.8;

  // addCube();
  //create drag object
  // if (event.target.className == "webgl") {
  //   // console.log("Показать Фигшуру");
  //   // let x = event.offsetX;
  //   // let y = event.offsetY;

  //   // draggable = addCube(x, y);
  //   // if (draggable !== undefined) {
  //   //   scene.add(draggable);
  //   // }
  //   addCube();
  // }
  event.preventDefault();
});

/* events fired on the drop targets */
document.addEventListener("dragover", function (event) {
  // prevent default to allow drop
  // target.style.opacity = 0.8;
  event.preventDefault();
});

// document.addEventListener("dragenter", function (event) {
//   // highlight potential drop target when the draggable element enters it
//   // if (event.target.className == "dropzone") {
//   //   event.target.style.background = "purple";
//   // }
//   //isDragging = true;
//   // //create drag object
//   if (event.target.className == "webgl") {
//     console.log("уБираю Картинку");
//     isDragging = true;
//     // let x = event.offsetX;
//     // let y = event.offsetY;
//     // draggable = addCube(x, y);
//     // if (draggable !== undefined) {
//     //   scene.add(draggable);
//     // }
//     // addModel(modelToDrag);
//   }
//   // event.preventDefault();
// });

// document.addEventListener(
//   "dragleave",
//   function (event) {
//     //create drag object
//     if (event.target.className == "webgl") {
//       let x = event.offsetX;
//       let y = event.offsetY;

//       draggable = addCube(x, y);
//       scene.add(draggable);
//     }
//   },
//   false
// );

// document.addEventListener("drop", function (event) {
//   // prevent default action (open as link for some elements)
//   // event.preventDefault();
//   // }
//   // //create drag object
//   // if (event.target.className == "webgl") {
//   //   console.log("уБираю Картинку");
//   //   // let x = event.offsetX;
//   //   // let y = event.offsetY;
//   //   // draggable = addCube(x, y);
//   //   // if (draggable !== undefined) {
//   //   //   scene.add(draggable);
//   //   // }
//   //   addCube();
//   // }
// });

// events
document.addEventListener("pointermove", (event) => {
  console.log("pointermove");

  mouse.x = (event.offsetX / sizes.width) * 2 - 1;
  mouse.y = -(event.offsetY / sizes.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  if (isDragging) {
    if (modelToDrag && event.target.className == "webgl") {
      addModel(modelToDrag);
    }

    raycaster.ray.intersectPlane(plane, planeIntersect);
    dragObject.position.addVectors(planeIntersect, shift);
  }
});

document.addEventListener("pointerdown", (event) => {
  console.log("pointerdown");

  if (event.target.className == "draggable") {
    console.log("Выбор фигуры");
    // let x = event.offsetX;
    // let y = event.offsetY;
    // draggable = addCube(x, y);
    // if (draggable !== undefined) {
    //   scene.add(draggable);
    // }
    isDragging = true;
    modelToDrag = event.target.id;
    console.log("event.target.id   " + event.target.id);
    //addModel(modelToDrag);
  }

  var intersects = raycaster.intersectObjects(dragObjectArray);
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
  console.log("pointerup");
  isDragging = false;
  dragObject = null;
  modelToDrag = "";
  controls.enabled = true;
});

function addModel(figure) {
  // Object
  let geometry, color, material, mesh;
  color = new THREE.Color(Math.random(), Math.random(), Math.random());
  switch (figure) {
    case "CUBE":
      geometry = new THREE.BoxGeometry(1, 1, 1);
      //  color = new THREE.Color(Math.random(), Math.random(), Math.random());
      material = new THREE.MeshBasicMaterial();
      material.color.set(color);
      mesh = new THREE.Mesh(geometry, material);

      break;
    case "SPHERE":
      geometry = new THREE.SphereGeometry(1, 8, 8);
      material = new THREE.MeshBasicMaterial();
      material.color.set(color);
      mesh = new THREE.Mesh(geometry, material);
      break;

    case "TorusKnot":
      geometry = new THREE.TorusKnotGeometry(1, 0.2, 37, 8);
      material = new THREE.MeshBasicMaterial();
      material.color.set(color);
      mesh = new THREE.Mesh(geometry, material);
      break;

    default:
      break;
  }

  dragObjectArray.push(mesh);
  scene.add(mesh);
  dragObject = mesh;
  isDragging = true;
  modelToDrag = "";
}
