import * as THREE from 'three';

export function addCuboid(scene: THREE.Scene, position: THREE.Vector3): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(1, 1, 0.45);
    const material = new THREE.MeshBasicMaterial({ color: 0x999966 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    mesh.position.set(position.x, position.y, position.z);
    return mesh;
}

export function addSphere(scene: THREE.Scene, position: THREE.Vector3): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(0.2);
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    mesh.position.set(position.x, position.y, position.z);
    return mesh;
}

let lastFrameTime = 0;
let currFrameTime = 0;
export function deltaLoop(loop: any) {
    function _loop(DOMHighResTimeStamp: number) {
        lastFrameTime = currFrameTime;
        currFrameTime = DOMHighResTimeStamp;
        const deltaTime = currFrameTime - lastFrameTime;
        loop(deltaTime);
        requestAnimationFrame(_loop);
    }
    _loop(0);
}
