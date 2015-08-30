define([
], function(){
    'use strict';
    
    var pnObj;

    function debounce(fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }

    /**
     * Figure out the vendor prefix, if any
     */
    var prefixedTransform = (function () {
        var vendorPrefixes = ['webkit', 'ms'],
            i = vendorPrefixes.length,
            style = window.getComputedStyle(document.body, null);

        if (style.getPropertyValue('transform')) {
            return 'transform';
        }
        while (i--) {
            if (style[vendorPrefixes[i] + 'Transform'] !== undefined) {
                return vendorPrefixes[i] + 'Transform';
            }
        }
    }());

    /**
     * Creates object with all element of the lift
     * 
     * @param pnElem
     */
    var createObject = function createObject(pnElem) {
        var dir = ['asc', 'desc'],
            faces = ['right','left','back','front','top','bottom'],
            dCnt = dir.length,
            fCnt,
            uCnt,
            unit;

        pnObj = {
            paterNoster: pnElem
        };

        while(dCnt--) {
            // side
            pnObj[dir[dCnt]] = {
                side: pnObj.paterNoster.querySelector('li.' + dir[dCnt])
            };
            pnObj[dir[dCnt]].units = [].slice.call(pnObj[dir[dCnt]].side.querySelectorAll('u'));
            uCnt  = pnObj[dir[dCnt]].units.length;
            while(uCnt--){
                unit = pnObj[dir[dCnt]].units[uCnt];
                pnObj[dir[dCnt]].units[uCnt] = {
                    unit: unit,
                    boards: {},
                    shadows: {}
                };
                fCnt = faces.length;
                while(fCnt--) {
                    pnObj[dir[dCnt]].units[uCnt].boards[faces[fCnt]] = unit.querySelector('b.' + faces[fCnt]);
                    pnObj[dir[dCnt]].units[uCnt].shadows[faces[fCnt]] = pnObj[dir[dCnt]].units[uCnt].boards[faces[fCnt]].querySelector('s');
                }
                pnObj[dir[dCnt]].units[uCnt].boards.cage = unit;
                pnObj[dir[dCnt]].units[uCnt].shadows.cage = unit.querySelector('s');
            }
        }
        // some shortcuts
        pnObj.boards = {};
        pnObj.shadows = {};
        fCnt = faces.length;
        while(fCnt--) {
            pnObj.boards[faces[fCnt]] = [].slice.call(pnObj.paterNoster.querySelectorAll('b.' + faces[fCnt]));
            pnObj.shadows[faces[fCnt]] = [].slice.call(pnObj.paterNoster.querySelectorAll('b.' + faces[fCnt] + ' s'));
        }
        pnObj.all = {};
        pnObj.all.units   = [].slice.call(pnObj.paterNoster.querySelectorAll('u'));
        pnObj.all.boards  = [].slice.call(pnObj.paterNoster.querySelectorAll('b'));
        pnObj.all.shadows = [].slice.call(pnObj.paterNoster.querySelectorAll('s'));
    };


    /**
     * Re-position the back
     */
    var fixBackPosition = function() {
        var depth = parseInt(getComputedStyle(pnObj.boards.top[0], null).getPropertyValue('height')),
            transform = 'rotateY(180deg) translateZ(' + depth + 'px)',
            i = pnObj.boards.back.length;
        while(i--){
            pnObj.boards.back[i].style[prefixedTransform] = transform;
        }
    };


    return {

        /**
         * Initialize the manager
         *
         * @param pnElem
         * @returns {*}
         */
        init: function init(pnElem) {
            createObject(pnElem);
            fixBackPosition();
            window.addEventListener('resize', debounce(fixBackPosition, 150));
            return this;
        },


        /**
         * Retrieve an object with all elements of the pater noster
         * @returns {*}
         */
        getObj: function() {
            return pnObj;
        }
    };
});

