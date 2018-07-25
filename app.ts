import * as THREE from 'three';
import 'three-examples/controls/OrbitControls';

import './main.scss';

import * as debugUI from './debugUI';
import * as input from './input';
import * as utils from './utils';
import * as world from './world';

let scene: THREE.Scene;
let camera: THREE.Camera;
let renderer: THREE.WebGLRenderer;

const meshesToAnimate: THREE.Mesh[] = [];
// const meshes: THREE.Mesh[] = [];

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 600);
    camera.up = new THREE.Vector3(0, 0, 1);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    world.init({ scene });
    input.init({ scene, camera, renderer });
    debugUI.init({ scene, orbitControls: input.orbitControls });
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

    input.loop(dt);
    world.loop(dt);

    renderer.render(scene, camera);
    debugUI.loop(dt);
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    utils.deltaLoop(loop);
});
