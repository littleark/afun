define(["./support"],function(support) {
	function AlgorithmView(options){

		var WIDTH=options.width,
			HEIGHT=options.height;

		var margins={
			left:50,
			right:50,
			top:0,
			bottom:0
		};

		var self=this;
		var DURATION=500;
		var animating=false;
		var pause=false;

		var steps=options.steps || [],
			current_steps=0,
			current_step=0;//steps.length-1;

		var callback=options.callback || function(){};

		var items=options.items || [];

		function setStatuses() {
			steps.forEach(function(substeps){
				items.push(support.cloneArray(items[items.length-1]));
				substeps.forEach(function(d){
					items[items.length-1][d.to]=d.index;
				})
			})
			steps=([[]]).concat(steps);
		}
		setStatuses();
		console.log("ITEMS",items.length,"STEPS",steps.length);
		console.log(items)

		var xscale=d3.scale.linear().domain([0,items[0].length-1]).range([0,WIDTH-margins.left-margins.right]);
		
		var	code=options.code,
			container=options.container;

		var svg=d3.select(container)
					.append("svg")
						.attr("width",WIDTH)
						.attr("height",HEIGHT)
						.append("g");
		
		var circles=svg.append("g")
							.attr("id","circles")
							.attr("transform","translate("+margins.left+","+margins.top+")");

		circles=circles.selectAll("g.circle")
					.data(items[0],function(d){
						return d;
					})
					.enter()
					.append("g")
						.attr("id",function(d){
							return "p"+d;
						})
						.attr("class","circle")
						.attr("transform",function(d,i){
							
							var x=xscale(i),
								y=HEIGHT/2;

							//console.log(i,x,xscale.range(),xscale.domain())

							return "translate("+x+","+y+")";
						});

	    var color = d3.scale.linear()
	    				.domain([0, items[0].length-1])
						.range(["hsl(42,95%,54%)", "hsl(202,100%,41%)"])
						.interpolate(d3.interpolateLab);

		var radius=d3.scale.sqrt()
						.domain([0, items[0].length-1])
						.range([1, 20])


		circles.append("circle")
					.attr("cx",0)
					.attr("cy",0)
					.attr("r",function(d){
						return radius(d);
					})
					.style("fill",function(d){
						//return "hsl("+Math.floor(255-255/(items[0].length-1)*(d))+", 100%, 50%)"
						return color(d);
					})

		circles.append("text")
					.attr("x",0)
					.attr("y",function(d){
						return 0+1+ radius(d)+10;
					})
					.attr("text-anchor","middle")
					.text(function(d){
						return d;
					})

		
		var traces=svg.append("g")
						.attr("id","traces2")
						.attr("transform","translate("+margins.left+","+margins.top+")");

		var traces_opposite=svg.append("g")
						.attr("id","traces_opposite")
						.attr("transform","translate("+margins.left+","+margins.top+")");
		traces=traces.selectAll("g.step")
					.data(steps)
					.enter()
						.append("g")
						.attr("class","step")
						.attr("rel",function(d,i){
							return "step_"+i;
						});
		
		traces.selectAll("path")
				.data(function(d){
					return d;
				})
				.enter()
					.append("path")
					.attr("d",function(d,i){
						//console.log("adding",i,d);
					
						var	x1=xscale(d.from),
						   	x2=xscale(d.to),
						   	y=HEIGHT/2,
						   	c1x=x1+(x2-x1)/2,
						   	c1y=HEIGHT/2-(x2-x1)/2;
						//console.log(i,d)
						return "M"+x1+","+y+"Q"+c1x+","+c1y+","+x2+","+y;
						
					})
					.style("stroke",function(d){
						return color(d.index);
					})

		traces
			.selectAll("path")
				.attr("stroke-dashoffset",function(d){
					return d3.select(this).node().getTotalLength();
				})
				.attr("stroke-dasharray",function(d){
					var len=d3.select(this).node().getTotalLength();
					return len+" "+len;
				});




		this.show=function(n,animate){
			if(animating) {
				return;
			}

			
			var n=(typeof n == "undefined")?steps.length-1:n;

			var back=0;
			if(current_step>n) {
				back=1;
			}

			
			if(n+back<=0 || n>steps.length-1){
				return;
			}



			animating=true;

			

			current_step=n;

			options.step_callback(current_step);

			
			console.log("GOING TO",current_step)

			//callback();


			var this_traces=traces
				.filter(function(d,i){
					return i==current_step+back;
				});

			this_traces
				.selectAll("path")
					.transition()
					.delay(250)
					//.ease("linear")
					.duration(DURATION)
					.attrTween("stroke-dashoffset",function(d,i){
						var len = this.getTotalLength();
						return function(t) {
							return back?(len-len*(1-t)):len*(1-t);
						}
					})

			console.log("BACK IS ",back,steps[current_step+back])

			circles
				.data(steps[current_step+back].map(function(d){
					return d.index;
				}),function(d){
					return d;
				})
				.classed("swap",true)
				.transition()
				.delay(250)
				//.ease("linear")
				.duration(DURATION)
					.attrTween("transform",function(d){
						return function(t){
							//console.log(d);
							
							var path=this_traces
								.selectAll("path")
								.filter(function(p){
									//console.log(p)
									return p.index==d;
								})
								.node();

							//console.log("path",path)


							
							var len = path.getTotalLength();
							var p = path.getPointAtLength((back)?(len-len*t):(len*t));

							return "translate("+[(p.x),(back)?(HEIGHT/2 - (HEIGHT/2 - p.y)):p.y]+")"
							
						}
					})
					.each("end",function(d,i){
						d3.select(this).classed("swap",false)
						//console.log("END",d,i,"==",(steps[current_step+back].length-1))
						animating=false;
						if(i==steps[current_step+back].length-1 && animate) {
							console.log("----")
							if(!pause) {
								self.stepNext(animate);	
							}
						}
					})

		}			
		this.goTo=function(n) {
			if(animating) {
				return;
			}

			if(typeof n == "undefined") {
				n=steps.length-1;
			}

			if((current_step==0 && n<0)||(current_step==steps.length-1 && n>steps.length-1)) {
				return;
			}

			if(n<0){
				n=0;
			}
			if(n>steps.length-1){
				n=steps.length-1;
			}

			animating=true;
			current_step=n;

			options.step_callback(current_step);

			traces
				.selectAll("path")
					.attr("stroke-dashoffset",function(d){
						return d3.select(this).node().getTotalLength();
					})

			traces
				.filter(function(d,i){
					return i<=current_step;
				})
				.selectAll("path")
					.attr("stroke-dashoffset",function(d){
						return 0;//d3.select(this).node().getTotalLength();
					})
			
			circles
				.data(items[current_step],function(d,i){
					return d;
				})
				.transition()
				.duration(DURATION)
				.attr("transform",function(d,i){
					var x=xscale(i),
						y=HEIGHT/2;

					return "translate("+x+","+y+")";
				})
				.each("end",function(d,i){
					animating=false;
				})
		}

		if(options.step>0) {
			this.goTo(options.step);
		}
		
		this.stepNext=function(animate) {
			if(animating) {
				return;
			}
			this.show(current_step+1,animate);
			
		}
		this.stepPrev=function() {
			if(animating) {
				return;
			}
			this.show(current_step-1);
		}

		this.getCurrentStep=function() {
			return current_step;
		}
		this.getStepsLength=function() {
			return steps.length-1;
		}
		this.getSteps=function() {
			return steps;
		}

		this.start=function() {
			pause=false;
			this.stepNext(true)
		}
		this.pause=function() {
			pause=true;
		}

	}

	return AlgorithmView;

});