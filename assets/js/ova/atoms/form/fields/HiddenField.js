/** [Ova Assistant]
 * Date: 2022-04-17 19:01:33
 * Author: ova
 * Description: 
 */

/** @includes
 * ../../../HTML
 * ../FormField
 */

/** @libraries
 * 
 */

'use strict';

class HiddenField extends FormField {
    constructor(_input, _name) {
        super();
        this.input = HTML.parse_element(_input);
        this.name = _name;
        this.events.define("error");
        this.build();
    }

    build() {}

    get value() {
        return super._value;
    }

    set value(_value) {
        this.input.value = _value;
        super.value = _value;
    }

    error(_rule) {
        this.events.trigger("error", _rule);
    }

    reset() {
        this.value = "";
    }

    static builder(_name, _customizer = _input => {}) {
        let input = document.createElement("input");
        input.className = `${window.env.APP_CSS_CLASS} field hidden ${_name}`;
        input.type = "hidden";
        input.name = _name;

        _customizer(input);

        return input;
    }
}