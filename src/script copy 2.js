import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Raycaster } from "three";

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
// let plane = new THREE.Plane();
// let pNormal = new THREE.Vector3(0, 1, 0); // plane's normal
// let planeIntersect = new THREE.Vector3(); // point of intersection with the plane
// let pIntersect = new THREE.Vector3(); // point of intersection with an object (plane's point)
// let shift = new THREE.Vector3(); // distance between position of an object and points of intersection with the object
// let isDragging = false;
// let dragObject;
//let draggable = new THREE.Object3D();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.5, 0.5, 0.5);

// Object TEST
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const size = 30;
const divisions = 30;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

// const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

// //helper.visible = false;
// scene.add(plane);

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

window.addEventListener("click", (event) => {});

const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
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
document.addEventListener(
  "drag",
  function (event) {
    console.log("drag");
  },
  false
);

document.addEventListener(
  "dragstart",
  function (event) {
    // store a ref. on the dragged elem
    // dragged = event.target;
    // make it half transparent
    event.target.style.opacity = 0.5;
  },
  false
);

document.addEventListener(
  "dragend",
  function (event) {
    // reset the transparency
    event.target.style.opacity = "";
  },
  false
);

/* events fired on the drop targets */
document.addEventListener(
  "dragover",
  function (event) {
    // prevent default to allow drop
    event.preventDefault();
  },
  false
);

document.addEventListener(
  "dragenter",
  function (event) {
    // highlight potential drop target when the draggable element enters it
    // if (event.target.className == "dropzone") {
    //   event.target.style.background = "purple";
    // }

    //create drag object
    if (event.target.className == "webgl") {
      let x = event.offsetX;
      let y = event.offsetY;

      draggable = addCube(x, y);
      if (draggable !== undefined) {
        scene.add(draggable);
      }
    }
  },
  false
);

document.addEventListener(
  "dragleave",
  function (event) {
    //create drag object
    if (event.target.className == "webgl") {
      let x = event.offsetX;
      let y = event.offsetY;

      draggable = addCube(x, y);
      scene.add(draggable);
    }
  },
  false
);

document.addEventListener(
  "drop",
  function (event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    draggable = undefined;
  },
  false
);

function intersectPoint(x, y) {
  let drobMouse = new THREE.Vector2();
  drobMouse.x = (x / sizes.width) * 2 - 1;
  drobMouse.y = -((y / sizes.height) * 2 - 1);
  raycaster.setFromCamera(drobMouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);
  let intersecPoint;
  let intersec = false;
  if (intersects.length > 0) {
    intersecPoint = intersects[0].point;
    intersec = true;
  }

  return {
    intersec,
    intersecPoint,
  };
}

function addCube(x, y) {
  //   // update the picking ray with the camera and mouse position
  //   let drobMouse = new THREE.Vector2();
  //   drobMouse.x = (x / sizes.width) * 2 - 1;
  //   drobMouse.y = -((y / sizes.height) * 2 - 1);
  //   raycaster.setFromCamera(drobMouse, camera);
  //   // calculate objects intersecting the picking ray
  //   const intersects = raycaster.intersectObjects(scene.children);
  //   if (intersects.length > 0) {
  //     intersects[0].object.material.color.set(0x00ff00);
  //     console.log("intersects point = " + intersects[0].point);
  //     if (draggable === undefined) {
  //       // Object
  //       const geometry = new THREE.BoxGeometry(1, 1, 1);
  //       const colorCube = new THREE.Color(
  //         Math.random(),
  //         Math.random(),
  //         Math.random()
  //       );
  //       const material = new THREE.MeshBasicMaterial({ color: colorCube });
  //       material.color.set(colorCube);
  //       const mesh = new THREE.Mesh(geometry, material);
  //       draggable = mesh;
  //     }
  //     draggable.position.x = intersects[0].point.x;
  //     draggable.position.z = intersects[0].point.z;
  //     //scene.add(mesh);
  //     return draggable;
  //   }
  //   return undefined;
}
