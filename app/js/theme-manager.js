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
        },

        set: function set(theme, cageFrame) {
            if(cageFrame.classList.contains(theme)) {
                return;
            }
            var i = themeArr.length;
            while(i--) {
                cageFrame.classList.remove(themeArr[i]);
            }
            cageFrame.classList.add(theme);
        },

        getAll: function getAll() {
            return themeArr;
        }
    };
});

