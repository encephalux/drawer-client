/** [Ova Assistant]
 * Date: 2022-06-18 12:03:12
 * Author: ova
 * Description: 
 */

/** @includes
 * 
 */

/** @libraries
 * 
 */

'use strict';

function common_cells(_this) {
    if(_this.mngmt_mode === DataList.mngmt_modes.full) {
        _this.cell("_code");
    }

    // { Name }
    _this.name = _this.cell("_name");
}