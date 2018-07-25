import * as THREE from 'three';

import * as utils from './utils';

let scene: THREE.Scene;
let worldTiles: Tile[][];
let tileMeshes: THREE.Mesh[];

interface TileIndex {
    x: number;
    y: number;
    z: number;
}

interface Tile {
    index: TileIndex;
    position: THREE.Vector3;
    mesh: THREE.Mesh | null;
}

interface WorldInit {
    scene: THREE.Scene;
}

export function init(worldInit: WorldInit) {
    scene = worldInit.scene;

    tileMeshes = [];
    worldTiles = [];

    for (let x = 0; x < 100; x++) {
        worldTiles[x] = [];
        for (let y = 0; y < 100; y++) {
            worldTiles[x][y] = new Tile({ x, y, z: 0 });
        }
    }
}

export function loop(dt: number) {
    for (const tileArrays of worldTiles) {
        for (const tile of tileArrays) {
            tile.update(dt);
        }
    }
}

class Tile {
    public isSelected: boolean = false;
    public mesh: THREE.Mesh | null = null;

    constructor(index: TileIndex) {
        this.index = index; // global index (map)

        const scale = 1.2;
        this.position = new THREE.Vector3(
            this.index.x * scale, this.index.y * scale, 0,
        ); // rendered position
    }

    public update(dt: number) {
        // TODO: boundscheck around player on adding & removing to scene
        if (this.index.x > 10 && this.index.x < 20) {
            if (this.index.y > 10 && this.index.y < 20) {
                this.addToScene();
            }
        }

        if (!this.mesh) {
            return;
        }
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        // TODO: check for selection & set color
    }

    public addToScene() {
        if (this.mesh) {
            return;
        }
        const geometry = new THREE.BoxGeometry(1, 1, 0.45);
        // TODO: colors by 'terrainType'...
        const material = new THREE.MeshBasicMaterial({ color: 0x999966 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.mesh = mesh;
        tileMeshes.push(this.mesh);

        scene.add(this.mesh);
    }
    public removeFromScene() {
        if (!this.mesh) {
            return;
        }
        scene.remove(this.mesh);
        this.mesh = null;
    }
}
