import './main.scss';
import * as three from 'three';

document.addEventListener('DOMContentLoaded', function () {
    // var scene = new three.Scene();
    // var camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 600);

    var renderer = new three.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

});
