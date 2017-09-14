window.SimplexNoise = require('simplex-noise');
window.TweenMax = require('gsap');
window.Matter = require('matter-js');

var icons = require('./../icons/icons.svg');

var iconData = {
	ball : require('./icons/ball'),
	eight : require('./icons/eight'),
	wink : require('./icons/wink')
};

String.prototype.decodeEscapeSequence = function() {
	return this.replace(/_x([0-9A-Fa-f]{2}_)/g, function() { return String.fromCharCode(parseInt(arguments[1], 16)); });
};

var App = function() {

	window.onresize = this.onResize.bind( this );
	
	this.element = document.getElementById('main');

	var parser = new DOMParser();
	var svgDoc = parser.parseFromString( icons, "image/svg+xml");
	var svg = svgDoc.getElementsByTagName('svg')[0];
	
	this.size = { width : parseInt( svg.getAttribute('width') ), height : parseInt( svg.getAttribute('height') ) };
	
	var groups = svgDoc.getElementsByTagName('g');

	this.icons = [];

	for( var i = 0 ; i < groups.length ; i++ ){
		var idData = groups[i].getAttribute('id');
		var id = idData.split('.')[0].decodeEscapeSequence();
		var name = idData.split('.')[1].decodeEscapeSequence().toLowerCase();
		console.log(name)
		if( iconData[name] ) this.icons.push( new iconData[name]( this, id, groups[i] ) );
	}

	this.onResize();
	
	this.step();
}

App.prototype.onResize = function(e) {
	
}

App.prototype.step = function( time ) {
	window.requestAnimationFrame( this.step.bind( this ) );
	for( var i = 0 ; i < this.icons.length ; i++ )  this.icons[i].step( time ) || null;
};

var app = new App();