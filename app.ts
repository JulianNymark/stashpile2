import * as THREE from 'three';
import 'three-examples/controls/OrbitControls';

import * as debugUI from './debugUI';
import './main.scss';
import * as utils from './utils';

let controls: THREE.OrbitControls;
let scene: THREE.Scene;
let camera: THREE.Camera;
let renderer: THREE.WebGLRenderer;
const meshesToAnimate: THREE.Mesh[] = [];
export const meshes: THREE.Mesh[] = [];

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 600);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.mouseButtons = {
        ORBIT: THREE.MOUSE.RIGHT,
        PAN: THREE.MOUSE.LEFT,
        ZOOM: THREE.MOUSE.MIDDLE,
    };
    controls.screenSpacePanning = false;

    const scale = 1.5;

    for (let y = -10; y < 10; y++) {
        for (let x = -10; x < 10; x++) {
            const position = new THREE.Vector3(
                x * scale, y * scale, 0,
            );
            meshesToAnimate.push(utils.addCuboid(scene, position));
        }
    }

    meshes.push(utils.addSphere(scene, new THREE.Vector3(0, 0, 0)));

    debugUI.init(controls);
}

function loop(dt: number) {
    for (const mesh of meshesToAnimate) {
        // mesh.rotation.x += 0.06;
        // mesh.rotation.y += 0.1;
        // if (Math.random() >= 0.5) {
        //     mesh.position.z += 0.01;
        // } else {
        //     mesh.position.z -= 0.01;
        // }

        // const gravity = new three.Vector3(0, 0, 0.1);
        // mesh.position.add(gravity);
    }

    controls.update();

    renderer.render(scene, camera);

    debugUI.loop(dt);
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    utils.deltaLoop(loop);
});
