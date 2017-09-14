var Icon = require('./../views/icon');

var Ball = function( ){
	Icon.apply(this, arguments);

	var children = this.two.scene.children.slice();
	
	this.exs = this.two.makeGroup();
	this.exs.translation.set( this.parent.size.width / 2, this.parent.size.height / 2 );
	this.exs.opacity = 0;

	this.rotationGroup = this.two.makeGroup( this.questionMark );

	this.rotationGroup.translation.set( this.parent.size.width / 2, this.parent.size.height / 2 - 5 );
	this.questionMark.translation.set( -this.parent.size.width / 2, -this.parent.size.height / 2 + 5 );


	for(var child in children) { 
		var shape = children[child];
		if( shape.id.indexOf('ex') !== -1 ){
			shape.translation.set( -this.parent.size.width / 2, -this.parent.size.height / 2 );
			
			this.exs.add( this.two.makeGroup( shape ) );
		}
	}
	this.rotation = 0;
	this.scale = 1;
	this.count = 0;
	this.element.addEventListener( 'click', this.cycle.bind(this) );
}

Ball.prototype = Object.create(Icon.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.cycle = function( ){
	
	this.rotation = 0;
	this.scale = 0;
	TweenLite.to(this, 0.8, { ease: Power4.easeOut, scale: 1 });
	TweenLite.to(this, 2, { ease: Elastic.easeOut.config(0.9, 0.5), rotation: Math.PI * 4 });

	setTimeout( this.pulsate.bind(this) , 300 );
}

Ball.prototype.pulsate = function(){
	TweenMax.to( this.exs, 0.2, { ease: Power3.easeOut, opacity: 1, repeat:5, yoyo:true });
}

Ball.prototype.step = function( time ){
	
	// this.count += 1;
	// if(this.count > 15 ) this.count = 0;

	// for( var i = 0 ; i < this.exs.children.length ; i++ ){
		// if( this.count < 10 ) this.exs.children[i].opacity = 1;
		// else this.exs.children[i].opacity = 0;
		// if( this.count % 10 == 0 ) this.exs.children[i].rotation = Math.random() * Math.PI * 0.1 - Math.PI * 0.05
	// }

	this.rotationGroup.rotation = this.rotation;
	this.rotationGroup.scale = this.scale;
}

module.exports = Ball;