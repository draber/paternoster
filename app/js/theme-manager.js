define([
    'json!config/themes.json'
], function(themes){
    'use strict';

    var themeArr = (function() {
        var links = document.querySelectorAll('head link[data-theme]'),
            i = links.length,
            _themeArr = [];

        while(i--) {
            _themeArr.push(links[i].dataset.theme);
        }
        return _themeArr;
    }());

    return {

        /**
         * Add stylesheets to DOM
         */
        init: function init() {
            var link;
            var i = themes.length;
            while(i--) {
                if(themeArr.indexOf(themes[i].id) > -1) {
                    continue;
                }
                link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'css/themes/' + themes[i].id + '/theme.css';
                link.dataset.theme = themes[i].id;
                document.head.appendChild(link);
                themeArr.push(themes[i].id);
            }
            return this;
        },

        /**
         * Set a theme to a certain cage
         *
         * @param theme
         * @param cage
         */
        set: function set(theme, cage) {
            if(cage.classList.contains(theme)) {
                return;
            }
            var i = themeArr.length;
            while(i--) {
                cage.classList.remove(themeArr[i]);
            }
            cage.classList.add(theme);
            return this;
        },


        /**
         * Remove a theme to a cage
         *
         * @param theme
         * @param cage
         */
        remove: function set(theme, cage) {
            cage.classList.remove(theme);
            return this;
        },

        getAll: function getAll() {
            return themeArr;
        }
    };
});

