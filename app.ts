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

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 600);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    const scale = 1.5;

    for (let y = -5; y < 5; y++) {
        for (let x = -5; x < 5; x++) {
            const position = new THREE.Vector3(
                x * scale, y * scale, 0,
            );
            meshesToAnimate.push(utils.addCuboid(scene, position));
        }
    }

    debugUI.init(camera);
}

function animate() {
    requestAnimationFrame(animate);

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
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    animate();
});

