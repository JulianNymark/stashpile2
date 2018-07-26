import * as THREE from 'three';
import 'three-examples/controls/OrbitControls';

import './main.scss';

import * as debugUI from './debugUI';
import * as input from './input';
import * as utils from './utils';
import * as world from './world';
import * as player from './player';

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
    player.init({ scene });

    debugUI.init({ scene, orbitControls: input.orbitControls });
}

function loop(dt: number) {
    world.loop(dt);
    input.loop(dt);
    player.loop(dt);

    renderer.render(scene, camera);
    debugUI.loop(dt);
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    utils.deltaLoop(loop);
});
