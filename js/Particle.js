function Particle(x,y,radius) {
	
	var MATH_PI2=Math.PI*2;

	this.pos = new Vector2(x,y); 
	this.vel = new Vector2(0,0); 
	this.ovel= this.vel.clone();
	
	this.radius = radius;

	this.drag = 1; 
	
	
	this.gravity = 0; 
	
	this.alpha = 1; 
	
	this.fade = 0;	

	this.rotation=0;

	this.spin=0;

	this.diff=new Vector2(0,0);

	this.reset = function (radius) {
		
		this.radius = radius; 
		
	};
	
	//this.reset(radius);
	
	this.update = function(canvas) {

		this.prev_pos=this.pos.clone();

		this.vel.multiplyEq(this.drag);
		
		// add gravity force to the y velocity 
		this.vel.y += this.gravity; 
			
		// and the velocity to the position
		this.pos.plusEq(this.vel);

		//this.pos.plusEq(this.diff);
		
		/*  	
		    	// shrink the particle
		    	this.radius *= this.shrink;
		    	// if maxradius is set and we're bigger, reradius!
		    	if((this.maxradius>0) && (this.radius>this.maxradius))
		    		this.radius = this.maxradius; 
		    	
		    	// and fade it out
		    	this.alpha -= this.fade;	
		    	if(this.alpha<0) this.alpha = 0; 
		  */	
		    	// rotate the particle by the spin amount. 
		    //this.rotation += this.spin; 
			
		
			if(this.pos.x+this.radius < 0) this.pos.x = canvas.width+this.radius; 
			else if (this.pos.x-this.radius > canvas.width) this.pos.x = -this.radius; 
				
			if(this.pos.y+this.radius < 0) this.pos.y = canvas.height+this.radius; 
			else if (this.pos.y-this.radius > canvas.height) this.pos.y = -this.radius; 
	 
	};
	this.draw = function(c) {
	
		// if we're fully transparent, no need to render!
		if(this.alpha ==0) return;
		
		// save the current canvas state
		c.save(); 
		
		// move to where the particle should be
		c.translate(this.pos.x, this.pos.y);
		
		// scale it dependent on the radius of the particle
		//var s = this.shimmer ? this.radius * Math.random() : this.radius; //this.shimmer ? this.radius * 0 : this.radius; 
		//c.scale(s,s);
		
		// and rotate (multiply by Math.PI/180 to 
		// convert from degrees to radians)
		c.rotate(this.rotation * Math.PI/180);
		
		// move the draw position to the center of the image
		//c.translate(this.radius*-0.5, this.radius*-0.5);
		
		// set the alpha to the particle's alpha
		c.globalAlpha = this.alpha; 
		
		// set the composition mode
		c.globalCompositeOperation = this.compositeOperation;
				
		// and draw it! 
		//c.drawImage(img,0,0);
		ctx.strokeStyle = this.strokeStyle || 'rgba(250,184,28,0.25)';
		ctx.fillStyle= this.fillStyle || "rgba(255,255,255,0.01)";//'#000000';
		ctx.lineWidth = 4; 
		ctx.beginPath(); 
		c.save(); 
		if(this.prev_pos) {
			
				ctx.globalAlpha=1;
				ctx.moveTo(this.pos.x-this.prev_pos.x,this.pos.y-this.prev_pos.y);
				ctx.lineTo(0,0);
			
		}
		ctx.closePath();
		ctx.stroke();
		c.restore();
		//if(this.vel.magnitude()==0) {
			ctx.beginPath();
			ctx.arc(0,0,this.radius, 0, MATH_PI2, true);
			ctx.closePath();
			ctx.fill();	
		//}
		
		
		// and restore the canvas state
		c.restore();
					
	};


}