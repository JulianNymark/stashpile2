import * as THREE from 'three';

// from app
let camera: THREE.Camera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;

export let orbitControls: THREE.OrbitControls; // export to app is ok
let raycaster: THREE.Raycaster;
let mouse: THREE.Vector2;

interface InputInit {
    scene: THREE.Scene;
    camera: THREE.Camera;
    renderer: THREE.WebGLRenderer;
}

export function init(inputInit: InputInit) {
    camera = inputInit.camera;
    scene = inputInit.scene;
    renderer = inputInit.renderer;

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.mouseButtons = {
        ORBIT: THREE.MOUSE.RIGHT,
        PAN: THREE.MOUSE.LEFT,
        ZOOM: THREE.MOUSE.MIDDLE,
    };
    orbitControls.position0.set(4, 4, 8); // set a new desired position
    orbitControls.target0.set(0, 0, 0); // set a new target
    // controls.screenSpacePanning = true;
    orbitControls.reset();
}

export function loop() {
    orbitControls.update();

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
