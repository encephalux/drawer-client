/** [Ova Assistant]
 * Date: 2022-10-16 12:09:10
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/layouts/DataListLayout
 */

/** @libraries
 * 
 */

'use strict';

(function() {
    let super_empty = DataListLayout.prototype.empty;
    DataListLayout.prototype.empty = function() {
        super_empty.apply(this);
        this.container.innerHTML = `
            <div class="block empty">
                <div class="img">
                    <img src="/assets/media/empty_result.webp" alt=""/>
                </div>
                <p>${this.searching ? "Aucun résultat pour votre recherche":"Aucune donnée à afficher"}</p>
            </div>
        `;
    };
})();