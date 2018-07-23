import './main.scss';
import * as three from 'three';

document.addEventListener('DOMContentLoaded', function () {
    var scene = new three.Scene();
    var camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 600);

    var renderer = new three.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var geometry = new three.BoxGeometry(1, 1, 1);
    var material = new three.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new three.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;

        renderer.render(scene, camera);
    }

    animate();
});
