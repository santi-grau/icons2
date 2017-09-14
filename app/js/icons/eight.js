var Icon = require('./../views/icon');

var Eight = function( ){
	Icon.apply(this, arguments);


	this.eightClone = this.eight.clone();
	this.eightScaleClone = this.two.makeGroup( this.eightClone );
	this.eightScaleClone._matrix.manual = true;
	this.eightGroupClone = this.two.makeGroup( this.eightScaleClone );
	this.eightScaleClone.translation.set( this.parent.size.width / 2, this.parent.size.height / 2 );
	this.eightClone.translation.set( -this.parent.size.width / 2, -this.parent.size.height / 2 );




	this.eightScale = this.two.makeGroup( this.eight );
	this.eightScale._matrix.manual = true;
	this.eightGroup = this.two.makeGroup( this.eightScale );
	this.eightScale.translation.set( this.parent.size.width / 2, this.parent.size.height / 2 );
	this.eight.translation.set( -this.parent.size.width / 2, -this.parent.size.height / 2 );

	// this.cloneGroup = this.two.makeGroup( this.eightClone );
	
	this.maskGroup = this.two.makeGroup( this.eightGroup, this.eightGroupClone );
	this.mask = this.ball.clone();

	this.maskGroup.mask = this.mask;

	this.rotation = 0;
	this.element.addEventListener( 'click', this.cycle.bind(this) );
}

Eight.prototype = Object.create(Icon.prototype);
Eight.prototype.constructor = Eight;

Eight.prototype.cycle = function( ){
	this.rotation = 0;
	TweenLite.to(this, 10, { ease: Power2.easeOut, rotation: 9.999 });
}

Eight.prototype.step = function( time ){
	var p1 = Math.sin( this.rotation * Math.PI * 2);
	var p2 = Math.cos( this.rotation * Math.PI * 2);

	var p3 = Math.sin( this.rotation * Math.PI * 2 - Math.PI );
	var p4 = Math.sin( this.rotation * Math.PI * 2 - Math.PI );

	if( p2 < 0 ) this.eightGroup.opacity = 0;
	else this.eightGroup.opacity = 1;

	if( p2 < 0 ) this.eightGroupClone.opacity = 1;
	else this.eightGroupClone.opacity = 0;

	this.eightScale._matrix.identity().translate(this.eightScale.translation.x, this.eightScale.translation.y).rotate(this.eightScale.rotation).scale(1 - Math.abs( p1 ) * 0.2, 1 - Math.abs( p1 ) );
	this.eightScaleClone._matrix.identity().translate(this.eightScaleClone.translation.x, this.eightScaleClone.translation.y).rotate(this.eightScaleClone.rotation).scale(1 - Math.abs( p3 ) * 0.2, 1 - Math.abs( p3 ) );

	this.eightGroup.translation.set( 0, p1 * (this.parent.size.height / 2 - 10)  );
	this.eightGroupClone.translation.set( 0, p3 * (this.parent.size.height / 2 - 10)  );
}

module.exports = Eight;