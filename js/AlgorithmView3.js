define(["./support"],function(support) {
	function AlgorithmView(options){

		var OWIDTH=options.width,
			OHEIGHT=options.height,
			WIDTH=options.width*options.size,
			HEIGHT=options.height*options.size;

		var name=options.name;

		var margins={
			left:20,
			right:20,
			top:0,
			bottom:0
		};

		var self=this;
		var DURATION=500;
		var animating=false;
		var status=0;

		var steps=options.steps || [],
			current_steps=0,
			current_step=options.step || 0;//steps.length-1;


		console.log("~~~~~~~~~~~~~~~~~",steps)

		var callback=options.callback || function(){};

		var items=options.items || [];

		function setStatuses() {
			steps.forEach(function(substeps){
				items.push(support.cloneArray(items[items.length-1]));
				substeps.forEach(function(d){
					items[items.length-1][d.to]=d;//.index;
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



		var div=d3.select(container)
					.classed("full",options.size>1)
					.append("div")
						.style("width",WIDTH+"px");
		var svg=div
				.append("svg")
					.attr("width",WIDTH)
					.attr("height",HEIGHT)
					//.append("g");
		var to=null;

		
		var slider_scale=d3.scale.linear().range([0,100]).domain([0,steps.length-1]);
		
		var slider_container=div
			.append("div")
				.attr("id","slider_"+options.name)
				.attr("class","dragdealer");

		slider_container
				.append("div")
					.attr("class","bg-dragdealer");

		slider_container
				.append("div")
					.attr("class","handle red-bar")
						.append("span")
						.attr("class","value")
							.text("drag me");

		var slider=new Dragdealer("slider_"+options.name,{
			steps:steps.length,
			snap:true,
			x:current_step,
			callback:function(x,y) {
				if(to){
					clearTimeout(to);
					to=null;
				}
				var dd=this;
				(function(s){
					to=setTimeout(function(){
						//console.log(steps.length-1,dragdealer.getStep()[0]-1);
						var step=dd.getStep()[0]-1;
						if(Math.abs(current_step-step)>0) {
							self.goTo(step);
							return;
						}
					},200);
				}());
			},
			animationCallback: function(x, y) {
		    	slider_container.select('.value').text(this.getStep()[0]-1);
		  	}
		});


		var circles_container=svg.append("g")
							.attr("id","circles")
							.attr("transform","translate("+margins.left+","+margins.top+")");
		var circles=null;
		var traces=null;
		/*=circles_container.selectAll("g.circle")
					.data(items[0],function(d,i){
						return d.id;
						//return d;
					});*/
		
					/*
					.enter()
					.append("g")
						.attr("id",function(d){
							return "p"+d.id;
						})
						.attr("class","circle")
						.attr("transform",function(d,i){
							
							var x=xscale(i),
								y=HEIGHT/2;

							//console.log(i,x,xscale.range(),xscale.domain())

							return "translate("+x+","+y+")";
						});
					*/
		

	    

		var RADIUS=Math.ceil((WIDTH-margins.left-margins.right)/(items[0].length+1)/2);

		var max_value=d3.max(items[0],function(d){
			return d.value;
		});
		var value_extents=d3.extent(items[0],function(d){
			return d.value;
		})

		var color = d3.scale.linear()
	    				//.domain([0, items[0].length-1])
	    				.domain(value_extents)
						//.range(["hsl(42,95%,54%)", "hsl(202,100%,41%)"])
						//199,86%,53% blue
						//202,100%,41% blue2
						//333,100%,50% red
						//24,87%,50% orange
						//87,100%,50% limegreen
						.range(["hsl(0,0%,100%)", "hsl(87,100%,50%)"])
						.interpolate(d3.interpolateLab);

		var radius=d3.scale.sqrt()
						//.domain([0, items[0].length-1])
						.domain([0, max_value])
						.range([1, 20])

		function updateCircles() {

			circles=circles_container.selectAll("g.circle")
						.data(items[0],function(d,i){
							return d.id;
							//return d;
						});

			circles.exit().remove();
			
			var new_circles=circles.enter()
				.append("g")
						.attr("id",function(d){
							return "p"+d.id;
						})
						.attr("class","circle")
						.attr("transform",function(d,i){
							
							var x=xscale(i),
								y=HEIGHT/2;

							return "translate("+0+","+y+")";
						});


			new_circles.append("circle")
						.attr("cx",0)
						.attr("cy",0)
						.attr("r",function(d){
							return radius(d.value);
						})
						.style("fill",function(d){
							//return "hsl("+Math.floor(255-255/(items[0].length-1)*(d))+", 100%, 50%)"
							return color(d.value);
						})

			new_circles.append("text")
						.attr("x",0)
						.attr("y",function(d){
							return 0+1+ radius(d.value)+10;
						})
						.attr("text-anchor","middle")
						.text(function(d){
							return d.value;
						})

			circles=circles_container.selectAll("g.circle");
			circles
				.attr("transform",function(d,i){
							
					var x=xscale(i),
						y=HEIGHT/2;

					return "translate("+x+","+y+")";
				})
				.style("fill",function(d){
					//return "hsl("+Math.floor(255-255/(items[0].length-1)*(d))+", 100%, 50%)"
					return color(d.value);
				})

		}
		
		var traces_container=svg.append("g")
						.attr("id","traces2")
						.attr("transform","translate("+margins.left+","+margins.top+")");

		
		function updateTraces() {
				traces=traces_container
								.selectAll("g.step")
								.data(steps);

				traces.exit().remove();

				var new_traces=traces.enter()
									.append("g")
										.attr("class","step")
										.attr("rel",function(d,i){
											return "step_"+i;
										});

				new_traces.selectAll("path")
						.data(function(d){
							return d;
						})
						.enter()
							.append("path")
							

				traces=traces_container.selectAll("g.step");

				traces
					.selectAll("path")
						.data(function(d){
							return d;
						})
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
						.attr("stroke-dashoffset",function(d){
							return d3.select(this).node().getTotalLength();
						})
						.attr("stroke-dasharray",function(d){
							var len=d3.select(this).node().getTotalLength();
							return len+" "+len;
						});
				/*
				traces
					.filter(function(d,i){
						return i<=current_step;
					})
					.selectAll("path")
						.attr("stroke-dashoffset",function(d){
							return 0;//d3.select(this).node().getTotalLength();
						})*/

		}

		updateCircles();
		updateTraces();

		this.updateData=function(__steps,__items) {

			steps=__steps;
			items=__items;

			setStatuses();
			console.log("ITEMS",items.length,"STEPS",steps.length);
			console.log(items)

			xscale.domain([0,items[0].length-1]);
			//color.domain([0, items[0].length-1]);
			max_value=d3.max(items[0],function(d){
				return d.value;
			});
			radius.domain([0, max_value]);
			value_extents=d3.extent(items[0],function(d){
				return d.value;
			})
			color.domain(value_extents);
			//color.domain([0, max_value]);

			slider.setSteps(steps.length);

			updateCircles();
			updateTraces();
			this.goTo(current_step)
			return;

		}

		this.resize=function(factor) {
			WIDTH=OWIDTH*factor;
			HEIGHT=OHEIGHT*factor;

			d3.select(container)
				.classed("full",factor>1)
				.select("div")
					.style("width",WIDTH+"px")

			slider.reflow();

			svg
				.attr("width",WIDTH)
				.attr("height",HEIGHT)

			xscale.range([0,WIDTH-margins.left-margins.right]);

			traces.selectAll("path")
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
					.attr("stroke-dashoffset",function(d){
						return d3.select(this).node().getTotalLength();
					})
					.attr("stroke-dasharray",function(d){
						var len=d3.select(this).node().getTotalLength();
						return len+" "+len;
					});

			circles.attr("transform",function(d,i){
					
					var x=xscale(i),
						y=HEIGHT/2;

					//console.log(i,x,xscale.range(),xscale.domain())

					return "translate("+x+","+y+")";
				});

		}


		this.show=function(n,animate){
			console.log("show",n,animate)
			if(animating) {
				console.log("already animating")
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

			

			
			//console.log("GOING TO",current_step)


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

			//console.log("BACK IS ",back,steps[current_step+back])

			circles
				.data(steps[current_step+back].map(function(d){
					//return d.index;
					return d;
				}),function(d){
					return d.id;
				})
				.classed("swap",true)
				.transition()
				.delay(250)
				//.ease("linear")
				.duration(DURATION)
					.attrTween("transform",function(d){
						return function(t){
							//console.log("---->",d);
							
							var path=this_traces
								.selectAll("path")
								.filter(function(p){
									//console.log(";;;;;;",p)
									//return p.index==d;
									return p.id==d.id;
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
						
						options.step_callback(current_step);

						slider.setStep(current_step+1);

						animating=false;

						if(i==steps[current_step+back].length-1 && animate) {
							//console.log("----")
							if(status) {
								self.stepNext(animate);	
							}
						}
					})

		}
		var slider_scale=d3.scale.linear().domain([0,100]).rangeRound([0,steps.length-1]);
		this.goToPerc=function(p,callback) {
			console.log(p,slider_scale(p));
			this.goTo(slider_scale(p),callback);
		}
		this.setSlider=function(p) {
			console.log("----->",p,slider_scale(p));
			//this.goTo(slider_scale(p),callback);
			slider.setStep(slider_scale(p));
		}
		this.goTo=function(n,callback) {
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
				console.log(n,">",steps.length-1)
				n=steps.length-1;
			}

			if(Math.abs(current_step-n)===1) {
				//this.show(n,callback);
				//return;
			}

			animating=true;
			current_step=n;

			options.step_callback(current_step);

			if(slider.getStep()[0]-1!=current_step) {
				slider.setStep(current_step+1);
			}

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
			//console.log("!!!!!!!!!!!",items[current_step])
			circles
				.data(items[current_step],function(d,i){
					return d.id;
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
					if(callback) {
						callback();
					}
				})
		}

		if(options.step>0) {
			this.goTo(options.step,options.callback);
		} else {
			if(options.callback) {
				options.callback();
			}
		}

		this.stepNext=function(animate) {
			if(animating) {
				console.log("already animating")
				return;
			}
			this.show(current_step+1,animate);
			
		}
		this.stepPrev=function() {
			if(animating) {
				console.log("already animating")
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
			if(!status) {
				status=1;
				this.stepNext(true)	
			} else {
				console.log(name,"not starting because",status)
			}
		}
		this.pause=function() {
			if(status)
				status=0;
		}
		this.getStatus=function() {
			return status;
		}

		this.getName=function() {
			return name;
		}

	}

	return AlgorithmView;

});