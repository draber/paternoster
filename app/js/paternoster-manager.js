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
        var directions = ['asc', 'desc'],
            sides = ['right','left','back','front','top','bottom'],
            dCnt = directions.length,
            sCnt;

        pnObj = {
            paterNoster: pnElem
        };

        while(dCnt--) {
            pnObj[directions[dCnt]] = {
                cage: pnObj.paterNoster.querySelector('li.' + directions[dCnt]),
                boards: {
                    frame: pnObj.paterNoster.querySelector('u')
                },
                shadows: {
                    frame: pnObj.paterNoster.querySelector('u > s')
                }
            };
            sCnt = sides.length;
            while(sCnt--) {
                pnObj[directions[dCnt]].boards[sides[sCnt]] = pnObj[directions[dCnt]].cage.querySelector('b.' + sides[sCnt]);
                pnObj[directions[dCnt]].shadows[sides[sCnt]] = pnObj[directions[dCnt]].boards[sides[sCnt]].querySelector('s');
            }
        }
        pnObj.cages = pnObj.paterNoster.querySelectorAll('li');
        pnObj.boards = pnObj.paterNoster.querySelectorAll('b');
        pnObj.shadows = pnObj.paterNoster.querySelectorAll('s');
    };
    
    var fixBackPosition = function() {
        var depth = parseInt(getComputedStyle(pnObj.asc.boards.top, null).getPropertyValue('height')),
            transform = 'rotateY(180deg) translateZ(' + depth + 'px)';
        pnObj.asc.boards.back.style[prefixedTransform] = transform;
        pnObj.desc.boards.back.style[prefixedTransform] = transform;
    };
    
    
    var init = function init(pnElem) {
        createObject(pnElem);
        fixBackPosition();
        window.addEventListener('resize', debounce(fixBackPosition, 150));
        return pnObj;
    };
    
    



    return {
        init: init
    };
});

