import * as _ from 'lodash';
import * as THREE from 'three';

function fpsCounter() {
    // TODO:
}

export function init(camera: THREE.Camera) {
    fpsCounter();

    const debugUI: HTMLElement = document.getElementById('debug-ui');
    debugUI.hidden = false;

    sliderControl('slider0', camera, 'rotation.x', Math.PI);
    sliderControl('slider1', camera, 'position.z', 20);
    sliderControl('slider2', camera, 'position.y', 20);
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
                valueElem.innerHTML = newValue.toString();
            } else {
                console.log(`error finding element ${sliderID + '-val'}, won't display val`);
            }
            _.set(target, valpath, newValue);
        });
    } else {
        console.log(`error finding element ${sliderID}`);
    }
}
