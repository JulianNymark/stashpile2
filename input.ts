import * as THREE from 'three';
import 'three-examples/controls/OrbitControls';

import { player } from './player';
import { MeshWithMetadata, TileIndex } from './world';

// from app
let camera: THREE.Camera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;

export let orbitControls: THREE.OrbitControls; // export to app is ok
let raycaster: THREE.Raycaster;
let mouse: THREE.Vector2;

export const mouseOverTileMetadata: { index: TileIndex, type: string | null } = {
    index: { x: 0, y: 0, z: 0 },
    type: null,
};

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
    orbitControls.position0.set(0, 4, 8); // set a new desired position
    orbitControls.target0.set(0, 0, 0); // set a new target
    orbitControls.enableKeys = false;
    // orbitControls.screenSpacePanning = true;
    orbitControls.reset();
}

export function loop(_dt: number) {
    // UNCOMMENT: const trackPlayerVec = new THREE.Vector3(0, 4, 8).add(player.position);
    // UNCOMMENT: orbitControls.object.position.fromArray(trackPlayerVec.toArray());
    // UNCOMMENT: orbitControls.target.fromArray(player.position.toArray());
    orbitControls.update();

    raycaster.setFromCamera(mouse, camera);
    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);
    for (const intersect of intersects) {
        const tileMesh = intersect.object as MeshWithMetadata;
        const tileMetadata = tileMesh.metadata;
        if (!tileMetadata || tileMetadata.type !== 'tile') {
            continue;
        }
        // DEBUG: console.log(JSON.stringify(tileMetadata, null, 2));
        mouseOverTileMetadata.index = tileMetadata.index;
        mouseOverTileMetadata.type = tileMetadata.type;
        break;
    }
}

function onMouseMove(event: any) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('mousemove', onMouseMove, false);

function keyDownHandler(event: KeyboardEvent) {
    event = event || window.event;

    switch (event.key) {
        case 'h':
            // left
            player.index.x += 1;
            break;
        case 'j':
            // down
            player.index.y += 1;
            break;
        case 'k':
            // up
            player.index.y -= 1;
            break;
        case 'l':
            // right
            player.index.x -= 1;
            break;
        case 'y':
            // left
            player.index.x += 1;
            player.index.y -= 1;
            break;
        case 'u':
            // down
            player.index.y -= 1;
            player.index.x -= 1;
            break;
        case 'b':
            // up
            player.index.x += 1;
            player.index.y += 1;
            break;
        case 'n':
            // right
            player.index.y += 1;
            player.index.x -= 1;
            break;
    }
}
window.addEventListener('keydown', keyDownHandler, false);
