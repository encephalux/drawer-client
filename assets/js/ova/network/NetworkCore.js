/**
 * Created by Neant on 23/08/2019.
 *
 */

/** @includes
 * ../Events
 */

class NetworkCore{
    static ajax(_options) {
        return new Promise((_resolve, _reject) => {
            let xhr = new XMLHttpRequest();

            if(_options.hasOwnProperty('loading')) {
                xhr.onloadstart = _options.loading;
            }

            xhr.open(_options.method, _options.url);
            if(_options.hasOwnProperty('type')) {
                if(_options.type !== null && _options.type !== 'form-data') {
                    xhr.setRequestHeader('Content-Type', _options.type);
                }
            }

            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4) {
                    if(xhr.status === 200) {
                        _resolve(xhr.responseText);
                    } else _reject(xhr.status);
                }
            };

            xhr.send(_options.hasOwnProperty('data') ? _options.data:null);
        });
    }
}