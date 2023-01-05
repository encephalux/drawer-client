/** [Ova Assistant]
 * Date: 2021-06-10 16:57:45
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

class InfinityMode {
    static get LOOPED () { return 0; }
    static get CIRCULAR () { return 1; }
    static get NONE () { return 2; }
}

class Sequencer {
    constructor(_options={}) {
        this.options = Object.assign(Sequencer.defaultOptions(), _options);
        this.cursor = 1;
        this.updateSequencesCount();
    }

    prev() {
        let curs = 0 + this.cursor;

        if(curs === 1){
            if(this.options.infinityMode === InfinityMode.NONE) {
                return [];
            } else if(this.options.infinityMode === InfinityMode.LOOPED) {
                curs = this.sequencesCount;
            } else if(this.options.infinityMode === InfinityMode.CIRCULAR) {
                curs = this.period();
            }
        } else if((1 < curs && curs <= this.sequencesCount) || this.options.infinityMode === InfinityMode.CIRCULAR) {
            curs--;
        } else return [];

        return this.sequence(curs);
    }

    next() {
        let curs = 0 + this.cursor;

        if(this.options.infinityMode === InfinityMode.CIRCULAR || (1 <= curs && curs < this.sequencesCount)) {
            curs++;
        } else if(curs === this.sequencesCount){
            if(this.options.infinityMode === InfinityMode.NONE) {
                return [];
            } else if(this.options.infinityMode === InfinityMode.LOOPED) {
                curs = 1;
            }
        } else return [];

        return this.sequence(curs);
    }

    current() {
        return this.sequence(this.cursor);
    }

    backward() {
        if(this.cursor === 1){
            if(this.options.infinityMode === InfinityMode.NONE) {
                return [];
            } else if(this.options.infinityMode === InfinityMode.LOOPED) {
                this.cursor = this.sequencesCount;
            } else if(this.options.infinityMode === InfinityMode.CIRCULAR) {
                this.cursor = this.period();
            }
        } else if((1 < this.cursor && this.cursor <= this.sequencesCount) || this.options.infinityMode === InfinityMode.CIRCULAR) {
            this.cursor--;
        } else return [];

        return this.sequence(this.cursor);
    }

    forward() {
        if(this.options.infinityMode === InfinityMode.CIRCULAR || (1 <= this.cursor && this.cursor < this.sequencesCount)) {
            this.cursor++;
        } else if(this.cursor === this.sequencesCount){
            if(this.options.infinityMode === InfinityMode.NONE) {
                 return [];
            } else if(this.options.infinityMode === InfinityMode.LOOPED) {
                this.cursor = 1;
            }
        } else return [];

        return this.sequence(this.cursor);
    }

    sequence(_cursor) {
        if(_cursor <= 0 || (this.options.infinityMode !== InfinityMode.CIRCULAR && _cursor > this.sequencesCount)) return [];

        let seq = [];

        //Determine which sequence have to generate
        let sequencePos = (this.options.infinityMode === InfinityMode.CIRCULAR) ? (_cursor > this.period() ? _cursor % this.period():_cursor):_cursor;

        //Determine which value we have to generate from
        //pos have to start from '0'
        let startingPos = this.options.startingOffset + ((sequencePos-1) * this.options.sequenceLength);

        //Now get sequence values from pos
        let pos = startingPos;
        for(let i=0; i < this.options.sequenceLength; i++) {
            if((startingPos + i) >= this.options.valuesCount) {
                pos = (startingPos+i)%this.options.valuesCount;
                pos -= i;

                if(this.options.infinityMode === InfinityMode.NONE || this.options.infinityMode ===  InfinityMode.LOOPED)
                    if((startingPos+i)%this.options.valuesCount >= (this.options.startingOffset))
                        break;
            }

            seq.push(this.value((!this.options.reverse ? (pos + i):(this.options.valuesCount - (pos + i +1)))));
        }

        return seq;
    }

    value(_pos) {
        return this.options.firstValue + (_pos * this.options.valuesStep);
    }

    period() {
        return this.options.valuesCount;
    }

    static defaultOptions () {
        return {
            sequenceLength: 1,
            firstValue: 0,
            valuesCount: 10,
            valuesStep: 1,
            startingOffset: 0,
            reverse: false,
            infinityMode: InfinityMode.NONE
        };
    }

    updateOptions(_options={}) {
        this.options = Object.assign(this.options, _options);
        this.updateSequencesCount();
    }

    updateSequencesCount() {
        this.sequencesCount = Math.ceil(this.options.valuesCount/this.options.sequenceLength);
    }
}
