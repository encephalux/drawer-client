/** [Ova Assistant]
 * Date: 2021-05-16 09:59:02
 * Author: ova
 * Description: 
 */

/** @includes
 * 
 */

/** @libraries
 * 
 */

"use strict";

class RegexCollection {

    static get patterns() {

        return {
            email: /^[a-z][a-z0-9._-]{2,254}@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i,
            alphabetic: /^[a-z]+$/i,
            numeric: /^[0-9]+$/,
            decimal: /^[0-9]+\.[0-9]+$/,
            name: /^[a-zàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿß' -]*$/i,
            name_with_number: /^[a-z0-9àáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿß' -]*$/i,
            filename: /^[a-z0-9 $._-]+$/i,
            identifier: /^[a-z][a-z0-9_.-]{2,32}$/,
            password: /^[a-zA-Z0-9@_$#&()%-]{6,32}$/,
            date: {
                fr: /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/,
                en: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
            },
            hour: /^[0-9]{1,2}:[0-9]{1,2}$/,
            telephone: /^\+?[0-9]{6,15}$/
        };
    }
}