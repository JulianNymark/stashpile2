import * as THREE from 'three';

import 'three-examples/loaders/GLTFLoader';
import { player } from './player';

export interface TileIndex {
    x: number;
    y: number;
    z: number;
}

export interface MeshWithMetadata extends THREE.Mesh {
    metadata?: any;
}

interface Tile {
    index: TileIndex;
    position: THREE.Vector3;
    mesh: MeshWithMetadata | null;
}

interface TileInfo {
    soilNutrition: number;
    type: string;
}

interface WorldInit {
    scene: THREE.Scene;
}

interface GLTFObject {
    scene: THREE.Scene;
    scenes: THREE.Scene[];
    animations: THREE.AnimationClip[];
    cameras: THREE.Camera[];
    asset: object;
}

interface PosRotScale {
    position: THREE.Vector3;
    rotation: THREE.Vector3;
    scale: THREE.Vector3;
}

let scene: THREE.Scene;
export let worldTiles: Tile[][];
// let tileMeshes: THREE.Mesh[];
let loader: any; // missing GLTFLoader definitions...

export function init(worldInit: WorldInit) {
    scene = worldInit.scene;
    loader = new THREE.GLTFLoader();

    // tileMeshes = [];
    worldTiles = [];

    for (let x = 0; x < 100; x++) {
        worldTiles[x] = [];
        for (let y = 0; y < 100; y++) {
            worldTiles[x][y] = new Tile({ x, y, z: 0 });
        }
    }
}

function loadModel(path: string, posRotScale?: PosRotScale) {
    return new Promise<GLTFObject>(((resolve, reject) => {
        loader.load(
            path,
            (gltf: GLTFObject) => { // called when the resource is loaded
                if (posRotScale) {
                    gltf.scene.position.fromArray(posRotScale.position.toArray());
                    gltf.scene.rotation.fromArray(posRotScale.rotation.toArray());
                    gltf.scene.scale.fromArray(posRotScale.scale.toArray());
                }

                resolve(gltf);
            },
            (_xhr: any) => { // called while loading is progressing
                // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error: Error) => { // called when loading has errors
                console.log('An error happened');
                reject(error);
            },
        );
    }));
}

export function loop(dt: number) {
    for (const tileArrays of worldTiles) {
        for (const tile of tileArrays) {
            tile.update(dt);
        }
    }
}

class Tile {
    public isSelected: boolean;
    public mesh: MeshWithMetadata | null;
    public info: TileInfo;
    public tree: GLTFObject | null;
    private thetreeisset = false;

    constructor(index: TileIndex) {
        this.index = index; // global index (map)
        this.position = indexToWorldPosition(this.index);

        this.info = {
            soilNutrition: Math.random(),
            type: Math.random() > 0.5 ? 'soil' : 'gravel',
        };
        this.isSelected = false;
        this.mesh = null;
        this.tree = null;
    }

    public update(_dt: number) {
        const absDistFromPlayerX = Math.abs(player.index.x - this.index.x);
        const absDistFromPlayerY = Math.abs(player.index.y - this.index.y);
        if (absDistFromPlayerX < 10) {
            if (absDistFromPlayerY < 10) {
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
    }

    public addToScene() {
        if (!this.tree) {
            this.addTreeToScene();
        }

        if (!this.mesh) {
            this.addTileMeshToScene();
        }
    }

    public removeFromScene() {
        this.thetreeisset = false;
        if (this.tree !== null) {
            scene.remove(this.tree.scene);
        }

        if (!this.mesh) {
            return;
        }
        scene.remove(this.mesh);
        this.mesh = null;
    }

    private async addTreeToScene() {
        if (this.thetreeisset) {
            return;
        }
        this.thetreeisset = true;

        if (this.tree !== null) {
            return;
        }
        if (this.info.type === 'soil') {
            const positionGltf = indexToWorldPosition(this.index);
            const positionGltfOffset = new THREE.Vector3(0, 0, 0.25);
            positionGltf.add(positionGltfOffset);

            const posRotScale: PosRotScale = {
                position: positionGltf,
                rotation: new THREE.Vector3(Math.PI / 2, Math.PI * 2 * Math.random(), 0),
                scale: new THREE.Vector3(0.002, 0.002, 0.002),
            };

            const treeTypes = ['spruce', 'birch', 'cypress', 'elm', 'laurel'];
            const randTree = treeTypes[Math.floor(Math.random() * treeTypes.length)];
            const gltfPath = `media/models/${randTree}_tree/scene.gltf`;

            this.tree = await loadModel(gltfPath, posRotScale);
            scene.add(this.tree.scene);
            return;
        }
    }

    private addTileMeshToScene() {
        if (this.mesh) {
            return;
        }
        const geometry = new THREE.BoxGeometry(1, 1, 0.45);
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
        // tileMeshes.push(this.mesh);

        scene.add(this.mesh);
    }
}

export function indexToWorldPosition(index: TileIndex): THREE.Vector3 {
    const scale = 1.2;
    return new THREE.Vector3(
        index.x * scale,
        index.y * scale,
        index.z * scale,
    );
}
