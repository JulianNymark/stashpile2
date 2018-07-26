import * as THREE from 'three';

let scene: THREE.Scene;
export let worldTiles: Tile[][];
let tileMeshes: THREE.Mesh[];

export interface TileIndex {
    x: number;
    y: number;
    z: number;
}

interface Tile {
    index: TileIndex;
    position: THREE.Vector3;
    mesh: THREE.Mesh | null;
}

interface TileInfo {
    soilNutrition: number;
    type: string;
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
    public info: TileInfo;

    constructor(index: TileIndex) {
        this.index = index; // global index (map)
        this.position = indexToWorldPosition(this.index);

        this.info = {
            soilNutrition: Math.random(),
            type: Math.random() > 0.5 ? 'soil' : 'gravel',
        };
    }

    public update(dt: number) {
        // TODO: boundscheck around player on adding & removing to scene
        if (this.index.x >= 0 && this.index.x < 10) {
            if (this.index.y >= 0 && this.index.y < 20) {
                this.addToScene();
            } else {
                this.removeFromScene();
            }
        } else {
            this.removeFromScene();
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
        let color: number;
        switch (this.info.type) {
            case 'soil':
                color = 0x999966;
                break;
            case 'gravel':
                color = 0x888888;
                break;
            default:
                color = 0x111111;
                break;
        }
        const material = new THREE.MeshBasicMaterial({ color });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.mesh = mesh;
        this.mesh.metadata = {
            index: this.index, type: 'tile',
        };
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

export function indexToWorldPosition(index: TileIndex): THREE.Vector3 {
    const scale = 1.2;
    return new THREE.Vector3(
        index.x * scale,
        index.y * scale,
        index.z * scale
    );
}
