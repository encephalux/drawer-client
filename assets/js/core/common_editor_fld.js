/** [Ova Assistant]
 * Date: 2022-06-18 09:29:26
 * Author: ova
 * Description: 
 */

/** @includes
 * ../atoms/form/fields/ShortText
 * ../ova/managers/form/rules/TextRule
 */

/** @libraries
 * 
 */

'use strict';

function common_editor_fld(_form, _form_mgr) {
    // { Code field }
    let code_fld = new ShortText("_code");
    code_fld.placeholder = "Code";
    _form.appendChild(code_fld.html());
    code_fld.add_rule(new TextRule({min: 1, max: 20}));
    _form_mgr.add_field("_code", code_fld);

    // { Name field }
    let name_fld = new ShortText("_name");
    name_fld.placeholder = "Nom";
    _form.appendChild(name_fld.html());
    name_fld.add_rule(new TextRule({min: 1, max: 160}));
    _form_mgr.add_field("_name", name_fld);
}