import * as three from 'three';


document.addEventListener('DOMContentLoaded', function () {
    console.log('hi there2');

    var scene = new three.Scene();
    var camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new three.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    console.log('webpack?');
});
