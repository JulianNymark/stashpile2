import './main.scss';
import * as three from 'three';

var scene: three.Scene;
var camera: three.Camera;
var renderer: three.WebGLRenderer;
var cube: three.Mesh;

function init() {
    scene = new three.Scene();
    camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 600);

    renderer = new three.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var geometry = new three.BoxGeometry(0.5, 0.5, 2);
    var material = new three.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new three.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.06;
    cube.rotation.y += 0.1;

    renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', function () {
    init();
    animate();
});
