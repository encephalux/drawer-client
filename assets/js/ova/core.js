/** [Ova Assistant]
 * Date: 2021-06-10 16:58:08
 * Author: ova
 * Description:
 */

/** @includes
 * Events
 * Atoms
 * Molecules
 */

/** @libraries
 *
 */

"use strict";

window.env.events = new Events();

window.app = {
    managers: {},
    events: new Events(),
    instance: null
};

// { Converter from formData to object }

function get_array_from_form_data(formData) {
    let obj = {};

    for(let pair of formData.entries())
        obj[pair[0]] = pair[1];

    return obj;
}

// { Converter from object to formData }

function get_form_data_from_array(obj) {
    if(obj instanceof FormData) return obj;

    let formData = new FormData();

    for(let key in obj)
        if(obj.hasOwnProperty(key))
            formData.append(key, obj[key]);

    return formData;
}

// { Extend FormData native object }

FormData.prototype.to_object = function() {
    return get_array_from_form_data(this);
};

FormData.from_object = _object => {
    return get_form_data_from_array(_object);
};

// { Execution level events manager }

window.app.events = new Events();
window.app.events.define(["vertical_resize", "horizontal_resize"]);

// { Add directional resizing }

let currentHeight = window.innerHeight;
let currentWidth = window.innerWidth;

window.addEventListener("resize", _ev => {
    let oldHeight = currentHeight;
    currentHeight = window.innerHeight;
    if(oldHeight !==currentHeight) window.app.events.trigger("vertical_resize", _ev);

    let oldWidth = currentWidth;
    currentWidth = window.innerWidth;
    if(oldWidth !== currentWidth) window.app.events.trigger("horizontal_resize", _ev);
}, !1);