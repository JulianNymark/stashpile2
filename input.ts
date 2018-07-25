import * as THREE from 'three';

let camera: THREE.Camera;
let scene: THREE.Scene;

let raycaster: THREE.Raycaster;
let mouse: THREE.Vector2;

interface InputInit {
    scene: THREE.Scene;
    camera: THREE.Camera;
}

export function init(inputInit: InputInit) {
    camera = inputInit.camera;
    scene = inputInit.scene;
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
}

export function mouseOver() {
    raycaster.setFromCamera(mouse, camera);
    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);
    for (const intersect of intersects) {
        intersect.object.material.color.set(0xff0000);
    }
}

function onMouseMove(event: any) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener('mousemove', onMouseMove, false);
