import * as THREE from 'three';

import 'three-examples/loaders/GLTFLoader';
import { player } from './player';

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

let scene: THREE.Scene;
export let worldTiles: Tile[][];
let tileMeshes: THREE.Mesh[];
let loader: any; // missing GLTFLoader definitions...

export function init(worldInit: WorldInit) {
    scene = worldInit.scene;
    loader = new THREE.GLTFLoader();

    tileMeshes = [];
    worldTiles = [];

    for (let x = 0; x < 100; x++) {
        worldTiles[x] = [];
        for (let y = 0; y < 100; y++) {
            worldTiles[x][y] = new Tile({ x, y, z: 0 });
        }
    }

    //////////////////
    // Instantiate a loader

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    // THREE.DRACOLoader.setDecoderPath('/examples/js/libs/draco');
    // loader.setDRACOLoader(new THREE.DRACOLoader());
    loadModel('media/models/spruce_tree/scene.gltf', { x: 0, y: 0, z: 0 });
    loadModel('media/models/spruce_tree/scene.gltf', { x: 0, y: 1, z: 0 });
    //////////////////
}

function loadModel(path: string, index: TileIndex) {
    loader.load(
        path,
        (tree: any) => { // called when the resource is loaded

            const scaleTree = new THREE.Vector3(0.002, 0.002, 0.002);
            const rotateTree = new THREE.Vector3(Math.PI / 2, Math.PI * 2 * Math.random(), 0);
            const positionTree = indexToWorldPosition(index);
            const positionTreeOffset = new THREE.Vector3(0, 0, 0.25);
            positionTree.add(positionTreeOffset);
            // const positionOffsetTree = new THREE.Vector3(0, 0, 0.25);
            tree.scene.scale.fromArray(scaleTree.toArray());
            tree.scene.rotation.fromArray(rotateTree.toArray());
            tree.scene.position.fromArray(positionTree.toArray());
            scene.add(tree.scene);
            // gltf.animations; // Array<THREE.AnimationClip>
            // gltf.scenes; // Array<THREE.Scene>
            // gltf.cameras; // Array<THREE.Camera>
            // gltf.asset; // Object
        },
        (xhr) => { // called while loading is progressing
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => { // called when loading has errors
            console.log('An error happened');
        },
    );
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
        const absDistFromPlayerX = Math.abs(player.index.x - this.index.x);
        const absDistFromPlayerY = Math.abs(player.index.y - this.index.y);
        if (absDistFromPlayerX < 10) {
            if (absDistFromPlayerY < 10) {
                this.addToScene();
                // TODO: also meshes 'on tile' (items, trees...)
            } else {
                this.removeFromScene();
                // TODO: also meshes 'on tile' (items, trees...)
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
        index.z * scale,
    );
}
