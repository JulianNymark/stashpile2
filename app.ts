import * as three from 'three';

import './main.scss';

let scene: three.Scene;
let camera: three.Camera;
let renderer: three.WebGLRenderer;
const meshesToAnimate: three.Mesh[] = [];

function addCuboid(scene: three.Scene, position: three.Vector3) {
    const geometry = new three.BoxGeometry(0.5, 0.5, 2);
    const material = new three.MeshPhongMaterial({ color: 0x00ff00 });
    const cube = new three.Mesh(geometry, material);
    scene.add(cube);
    meshesToAnimate.push(cube);
    cube.position.set(position.x, position.y, position.z);
}

function init() {
    scene = new three.Scene();
    camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 600);

    renderer = new three.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const randscale = 5;

    for (let i = 0; i < 100; i++) {
        const position = new three.Vector3(
            Math.random() * randscale - randscale / 2,
            Math.random() * randscale - randscale / 2,
            Math.random() * (randscale * 100) - 100,
        );
        addCuboid(
            scene,
            position,
        );
    }

    // const light = new three.PointLight(undefined, 1, 15, 5);
    // light.position.set(0, 0, -0.5);
    // scene.add(light);

    const light2 = new three.PointLight(0xff11ff, 20, 20, 10);
    light2.position.set(0, 0, -0.2);
    scene.add(light2);

    // addCuboid(scene, [0, 0, 0]);
    // addCuboid(scene, [0, 1, 0]);
    // addCuboid(scene, [0, -1, 0]);

    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);

    for (const mesh of meshesToAnimate) {
        mesh.rotation.x += 0.06;
        mesh.rotation.y += 0.1;
        const gravity = new three.Vector3(0, 0, 0.1);
        mesh.position.add(gravity);
    }

    renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    animate();
});
