
'use strict';

requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'vendor/jquery-2.1.1-deprecated.min',
        text  : 'vendor/require-plugins/text',
        json  : 'vendor/require-plugins/json'
    }
});


require([
	'jquery', 
	'json!config/themes.json'

	], 
	function($, themes) {

    console.log( themes) 
})
