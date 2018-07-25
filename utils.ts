import * as THREE from 'three';

export function addCuboid(scene: THREE.Scene, position: THREE.Vector3): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(1, 1, 0.45);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.set(position.x, position.y, position.z);
    return cube;
}
