
'use strict';

requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'vendor/jquery-2.1.1-deprecated.min',
        text  : 'vendor/require-plugins/text',
        json  : 'vendor/require-plugins/json',
        themeManager: 'theme-manager',
        pnManager: 'paternoster-manager'
    }
});


require([
	'themeManager',
    'pnManager'
	], 
	function(themeManager, pnManager) {

        themeManager.init();
       // var paternoster = pnManager.init(document.querySelector('main.paternoster'));

        // // just for fun
        // var boxes = [document.querySelector('.c'), document.querySelector('.a')];
        // var themes = themeManager.getAll();
        // var current = 0;
        // window.setInterval(function() {
        //     current++;
        //     if(current > 1){
        //         current = 0;
        //     }
        //     var theme = themes[Math.floor(Math.random() * themes.length)];
        //     themeManager.set(theme, boxes[current]);

        // }, 3000);
});
