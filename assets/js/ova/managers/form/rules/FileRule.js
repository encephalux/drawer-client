/** [Ova Assistant]
 * Date: 2021-06-16 10:17:43
 * Author: ova
 * Description: 
 */

/** @includes
 * ../FormRule
 */

/** @libraries
 * 
 */

'use strict';

class FileRule extends FormRule {
    constructor(_constraints=FileRule.dflt_opts(), _empty_msg="") {
        super();
        this.empty_msg = _empty_msg;
        this.constraints = Object.assign(FileRule.dflt_opts(), _constraints);
    }

    validate(_value) {
        if(_value === null || _value.length === 0) {
            this.message = this.empty_msg;
            return !1;
        }

        if(this.constraints.hasOwnProperty("multiple"))
            if(!this.constraints.multiple && _value.length > 1) {
                this.message = "Vous ne pouvez pas sélectionner plusieurs fichiers";
                return !1;
            }

        if(this.constraints.hasOwnProperty("max_size"))
            for(let file of _value)
                if(file.size > this.constraints.max_size) {
                    this.message = "Veuillez sélectionnez un fichier de taille inférieure à " + (this.constraints.max_size / (1024*1024)) +" Mo";
                    return !1;
                }

        if(this.constraints.hasOwnProperty("extensions"))
            for(let file of _value) {
                if(Object.values(this.constraints.extensions).length > 0 && !Object.keys(this.constraints.extensions).includes(file.type)){
                    this.message = "Le type de fichier n'est pas autorisé. les extensions valables sont: " + Object.values(this.constraints.extensions).join(", .");
                    return !1;
                }
            }

        return !0;
    }

    static dflt_opts() {
        return {
            max_size: 5*1024*1024,
            multiple: !1,
            extensions: {}
        };
    }
}