import * as _ from 'lodash';
import * as THREE from 'three';

import * as utils from './utils';

const meshes: THREE.Mesh[] = [];

interface DebugInit {
    scene: THREE.Scene;
    orbitControls: THREE.OrbitControls;
}

function fpsCounter(dt: number) {
    const fpsID = 'fps-counter';
    const fpsElement: HTMLElement | null = document.getElementById(fpsID);
    if (fpsElement) {
        fpsElement.innerHTML = Math.round((1000 / dt)).toString();
    } else {
        console.log(`error finding element ${fpsID}, won't display fps`);
    }
}

export function init(debugInit: DebugInit) {
    const debugUI: HTMLElement | null = document.getElementById('debug-ui');
    if (debugUI) {
        debugUI.hidden = false;
    }

    const plane = new THREE.GridHelper(20, 40);
    plane.rotation.x = Math.PI / 2;
    debugInit.scene.add(plane);

    meshes.push(utils.addSphere(debugInit.scene, new THREE.Vector3(0, 0, 0)));

    sliderControl('slider0', debugInit.orbitControls.object, 'position.x', 20);
    sliderControl('slider1', debugInit.orbitControls.object, 'position.y', 20);
    sliderControl('slider2', debugInit.orbitControls.object, 'position.z', 20);

    sliderControl('slider3', debugInit.orbitControls.target, 'x', 20);
    sliderControl('slider4', debugInit.orbitControls.target, 'y', 20);
    sliderControl('slider5', debugInit.orbitControls.target, 'z', 20);
    sliderControl('slider3', meshes[0], 'position.x', 20);
    sliderControl('slider4', meshes[0], 'position.y', 20);
    sliderControl('slider5', meshes[0], 'position.z', 20);
}

export function loop(dt: number) {
    fpsCounter(dt);
}

/**
 * assumes that an ID for displaying the value is named sliderID + '-val' exists in the DOM
 *
 * @param sliderID the ID of the slider HTML element
 * @param target the object you want to adjust
 * @param valpath the path of the value relative to the target
 */
function sliderControl(sliderID: string, target: object, valpath: string, coefficient = 1) {
    const sliderElem: HTMLElement | null = document.getElementById(sliderID);
    const valueElem: HTMLElement | null = document.getElementById(sliderID + '-val');
    if (sliderElem) {
        sliderElem.addEventListener('input', (e) => {
            const slider = (e.target) ? e.target : e.srcElement;
            let newValue = 0;
            if (slider) {
                newValue = coefficient * slider.value;
            } else {
                console.log(`error with event target`);
            }
            if (valueElem) {
                valueElem.innerHTML = newValue.toFixed(2).toString();
            } else {
                console.log(`error finding element ${sliderID + '-val'}, won't display val`);
            }
            _.set(target, valpath, newValue);
        });
    } else {
        console.log(`error finding element ${sliderID}`);
    }
}
