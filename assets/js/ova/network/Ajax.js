/** [Ova Assistant]
 * Date: 2021-07-30 10:38:52
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

class Ajax {
    constructor(_options) {
        this.options = _options;
        this.xhr = new XMLHttpRequest();

        if(this.options.hasOwnProperty('loading')) {
            this.xhr.onloadstart = this.options.loading;
        }

        this.xhr.open(this.options.method, this.options.url);
        if(this.options.hasOwnProperty('type')) {
            if(this.options.type !== null && this.options.type !== 'form-data') {
                this.xhr.setRequestHeader('Content-Type', this.options.type);
            }
        }

        if(this.options.hasOwnProperty('with_credentials')) this.xhr.withCredentials = this.options.with_credentials;

        this.promise = new Promise((_resolve, _reject) => {
            this.xhr.onreadystatechange = () => {
                if(this.xhr.status === 0 && this.xhr.readyState > 2) {
                    return _reject({code: "ABORTED"});
                }

                if(this.xhr.readyState === 4) {
                    return (this.xhr.status === 200)  ?  _resolve(this.xhr.responseText):_reject({code: this.xhr.status});
                }
            };

            if(this.options.hasOwnProperty("send"))
                if(this.options.send) this.send();
        });
    }

    send(_data) {
        let data = null;

        if(_data) data = _data;
        else if(this.options.hasOwnProperty('data')) {
            if(this.options.type === "application/json") {
                data = JSON.stringify(this.options.data);
            } else data = this.options.data;
        }

        this.xhr.send(data);

        return this;
    }

    then(_callback) {
        this.promise = this.promise.then(_callback);
        return this;
    }

    catch(_callback) {
        this.promise = this.promise.catch(_callback);
        return this;
    }

    finally(_callback) {
        this.promise = this.promise.finally(_callback);
        return this;
    }

    abort() {
        this.xhr.abort();
        return this;
    }
}