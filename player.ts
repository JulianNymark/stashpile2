import * as THREE from 'three';

import { TileIndex, indexToWorldPosition } from './world';

interface Player {
    mesh: THREE.Mesh;
    position: THREE.Vector3;
    index: TileIndex;
}

interface PlayerInit {
    scene: THREE.Scene;
}

export const player: Player = {
    index: null,
    mesh: null,
    position: null,
};

export function init(playerInit: PlayerInit) {
    const geometry = new THREE.BoxGeometry(0.6, 0.6, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x22aa33 });
    const mesh = new THREE.Mesh(geometry, material);
    playerInit.scene.add(mesh);

    player.mesh = mesh;
    player.index = { x: 0, y: 0, z: 0 };
    player.position = new THREE.Vector3(0, 0, 0.8);

    // DEBUG:
    window.player = player;
}

export function loop(dt: number) {
    const tilePos = indexToWorldPosition(player.index);
    const withOffset = tilePos.add(new THREE.Vector3(0, 0, 0.8));
    player.position.fromArray(withOffset.toArray());
    player.mesh.position.set(player.position.x, player.position.y, player.position.z);
}
