var Icon = require('./../views/icon');

var Ball = function( ){
	Icon.apply(this, arguments);

	this.mouthGroup = this.two.makeGroup();
	this.mouthGroup.translation.set( this.parent.size.width / 2, this.parent.size.height / 2 );
	this.mouthGroup.add( this.mouth );
	this.mouth.translation.set( -this.parent.size.width / 2, -this.parent.size.height / 2 );

	this.eyePos = 0;
	this.eyeWink = 0;
	
	this.winkeye.opacity = 0;

	this.element.addEventListener( 'click', this.cycle.bind(this) );
}

Ball.prototype = Object.create(Icon.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.cycle = function( ){
	TweenLite.to( this.winkeye, 0.1, { ease: Power2.easeOut, opacity: 1 });
	TweenLite.to( this.lefteye, 0.1, { ease: Power2.easeOut, opacity: 0 });
	TweenLite.to( this, 0.1, { ease: Power2.easeOut, eyePos: 8, eyeWink : 2 });

	TweenLite.to( this.mouthGroup, 0.2, { ease: Power2.easeOut, rotation: Math.PI / 10 });

	setTimeout( this.cycleBack.bind(this), 400 );
}

Ball.prototype.cycleBack = function( ){
	TweenLite.to( this.winkeye, 0.1, { ease: Power2.easeOut, opacity: 0 });
	TweenLite.to( this.lefteye, 0.1, { ease: Power2.easeOut, opacity: 1 });
	TweenLite.to( this.mouthGroup, 0.2, { ease: Power2.easeOut, rotation: 0 });
	TweenLite.to( this, 0.1, { ease: Power2.easeOut, eyePos: 0, eyeWink : 0 });
}

Ball.prototype.step = function( time ){

	this.lefteye.translation.set(0,this.eyePos);
	this.winkeye.translation.set(-2,this.eyeWink);
	
}

module.exports = Ball;