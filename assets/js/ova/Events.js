/** [Ova Assistant]
 * Date: 2019-02-16 16:30:45
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

class Events {

    constructor(_class="Class Events") {
        this.class = _class;
        this.events = [];
        this.listeners = {};
    }

    /**
     * @param _events
     * @returns {Events}
     */
    define (_events){
        if(Array.isArray(_events)){
            for(let i=0; i < _events.length; i++){
                if(this.events.includes(_events[i])) continue;
                this.events.push(_events[i]);
                this.listeners[_events[i]] = [];
            }
        } else if(_events instanceof String || typeof _events === 'string') {
            if(this.events.includes(_events)) return this;

            this.events.push(_events);
            this.listeners[_events] = [];
        } else
            console.log(`[${this.class}] trying to define event from unknown type`);

        return this;
    };

    /**
     * @param _target
     * @param _action
     * @returns {Events}
     */
    add_listener (_target, _action){
        const arr = Array.isArray(_target) ? _target:[_target];

        arr.forEach(_event => {
            if(this.events.includes(_event))
                this.listeners[_event].push(_action);
            else console.log(`[${this.class}] trying to listen undefined event: `+_event);
        });

        return this;
    };

    /**
     * @param _event
     * @param _action
     * @returns {Events}
     */
    remove_listener (_event, _action){
        if(this.events[_event]) {
            this.events.splice(this.events.indexOf(_event), 1);
            delete this.listeners[_event];
        }

        return this;
    };

    /**
     * @param _event
     * @param _param
     * @returns {Events}
     */
    trigger (_event, _param=undefined){
        if(this.listeners[_event]){
            for(let i=0; i < this.listeners[_event].length; i++)
                this.listeners[_event][i](_param);
        } else console.log(`[${this.class}]: try to trigger event: `+_event);

        return this;
    };

    /**
     * @param _target
     * @param _events
     * @param _middleware
     * @returns {Events}
     */
    pipe(_target, _events=null, _middleware={}) {
        let events = _events ?? this.events;
        _target.define(events);
        events.forEach(_event => this.add_listener(_event, _p => {
            if(_middleware.hasOwnProperty(_event))
                return _target.trigger(_event, _middleware[_event](_p));

            _target.trigger(_event, _p);
        }));

        return this;
    }

    /**
     * @param _ev_obj
     * @param _events
     * @param _target
     * @param _middleware
     * @returns {Events}
     */
    funnel(_ev_obj, _events, _target, _middleware={}) {
        if(this.events.includes(_target)){
            console.log(`[${this.class}]: try to funnel on undefined event: `+_event);

            return this;
        }

        _events.forEach(_event => {
            _ev_obj.add_listener(_event, _p => {
                if(_middleware.hasOwnProperty(_event))
                    return this.trigger(_target, _middleware[_event](_p));

                this.trigger(_target, _p);
            });
        });

        return this;
    }

    /**
     * @param _pairs
     * @param _ev_obj
     * @param _middleware
     * @returns {Events}
     */
    map(_pairs, _ev_obj, _middleware={}) {
        _pairs.forEach(_pair => {
            this.add_listener(_pair[0], _param => {
                _ev_obj.trigger(_pair[1], _middleware.hasOwnProperty(_pair[0]) ? _middleware[_pair[0]](_param):_param);
            });
        });

        return this;
    }
}