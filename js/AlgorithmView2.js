function AlgorithmView(options){

	var WIDTH=options.width,
		HEIGHT=options.height;

	var margins={
		left:50,
		right:50,
		top:0,
		bottom:0
	};

	var steps=options.steps || [],
		grouping=options.grouping || 1,
		current_steps=0,
		current_step=-1;//steps.length-1;

	var callback=options.callback || function(){};

	var items=options.items || [];

	console.log("ITEMS",items.length,"STEPS",steps.length);

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

	//myData.sort().filter(function(el,i,a){if(i==a.indexOf(el))return 1;return 0})
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
			.attr("stroke-dashoffset",0)
			.attr("stroke-dasharray",function(d){
				var len=d3.select(this).node().getTotalLength();
				return len+" "+len;
			});

	/*
	traces=traces.selectAll("path.trace")
				.data(steps)
				.enter()
					.append("path")
						.attr("class","trace")
						.attr("rel",function(d){
							return d.fromE+"-"+d.toE;
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
							return color(d.fromE)
							return d.p.strokeStyle;
						})
	
	traces
		.attr("stroke-dashoffset",0)
		.attr("stroke-dasharray",function(d){
			var len=d3.select(this).node().getTotalLength();
			return len+" "+len;
		});

	traces_opposite=traces_opposite.selectAll("path.trace")
				.data(steps)
				.enter()
					.append("path")
						.attr("class","trace")
						.attr("rel",function(d){
							return d.toE+"-"+d.fromE;
						})
						.attr("d",function(d,i){
							//console.log("adding",i,d);
							
							var	x1=xscale(d.to),
							   	x2=xscale(d.from),
							   	y=HEIGHT/2,
							   	c1x=x1+(x2-x1)/2,
							   	c1y=HEIGHT/2+(x1-x2)/2;
							//console.log(i,d)
							return "M"+x1+","+y+"Q"+c1x+","+c1y+","+x2+","+y;
							
						})
						.style("stroke",function(d){
							return color(d.toE)
							return d.p2.strokeStyle;
						})

	traces_opposite
		.attr("stroke-dashoffset",0)
		.attr("stroke-dasharray",function(d){
			var len=d3.select(this).node().getTotalLength();
			return len+" "+len;
		});
	*/
	var self=this;
	var DURATION=500;
	var animating=false;

	this.show=function(n,animate){
		if(animating) {
			return;
		}

		
		var n=(typeof n == "undefined")?steps.length-1:n;

		var back=0;
		if(current_step>n) {
			back=1;
		}

		
		if(n+back<0 || n>steps.length-1){
			return;
		}



		animating=true;

		

		current_step=n;
		
		callback();

		//console.log(steps[n].fromE,steps[n].toE,traces[0][current_step])

		traces
			.classed("visible",false).classed("visible",function(d,i){
				return i<=current_step+back;
			});

		var this_traces=traces
			.filter(function(d,i){
				return i==current_step+back;
			});

		this_traces
			.selectAll("path")
				.transition()
				//.ease("linear")
				.duration(DURATION)
				.attrTween("stroke-dashoffset",function(d,i){
					var len = this.getTotalLength();
					return function(t) {
						return back?(len-len*(1-t)):len*(1-t);
					}
				})
		/*
		traces_opposite.classed("visible",false).classed("visible",function(d,i){
			return i<=current_step;
		});

		traces_opposite
			.filter(function(d,i){
				return i==current_step;
			})
			.transition()
			//.ease("linear")
			.duration(DURATION)
			.attrTween("stroke-dashoffset",function(d,i){
				var len = this.getTotalLength();
				return function(t) {
					return len*(1-t);
				}
			})
		*/
		console.log("BACK IS ",back)
		circles
			.data(steps[current_step+back].map(function(d){
				return d.index;
			}),function(d){
				return d;
			})
			.transition()
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

						//console.log("getPointAt",d.index,steps[n].fromE+"-"+steps[n].toE,t,"*",len,"=",len*t,p)
						return "translate("+[(p.x),(back)?(HEIGHT/2 - (HEIGHT/2 - p.y)):p.y]+")"
						
					}
				})
				.each("end",function(d,i){
					console.log("END",d,i,"==",(steps[current_step+back].length-1))
					animating=false;
					if(i==steps[current_step+back].length-1 && animate) {
						console.log("----")
						self.stepNext(animate);
					}
				})

		/*
		circles
			.data(
				(	back
					?
					[steps[current_step+1].toE,steps[current_step+1].fromE]
					:
					[steps[current_step].fromE,steps[current_step].toE]
				)
				,function(d){
				return d;
			})
			.transition()
			//.ease("linear")
			.duration(DURATION)
				.attrTween("transform",function(d,i){
					return function(t){
						//console.log(d);
						
						var len = traces[0][current_step+back].getTotalLength();
						var p = traces[0][current_step+back].getPointAtLength(i?(len-len*t):(len*t));

						//console.log("getPointAt",d.index,steps[n].fromE+"-"+steps[n].toE,t,"*",len,"=",len*t,p)
						return "translate("+[(p.x),i?(HEIGHT/2 + (HEIGHT/2 - p.y)):p.y]+")"
					}
				})
				.each("end",function(d,i){
					console.log("END",d,i)
					animating=false;
					if(i && animate) {
						self.stepNext(animate);
					}
				})*/

	}			
	this.goTo=function(n) {
		if(typeof n == "undefined" || n<0 || n>steps.length-1){
			return;
		}
		current_step=n;

		traces.classed("visible",false).classed("visible",function(d,i){
			return i<=current_step;
		});
		traces_opposite.classed("visible",false).classed("visible",function(d,i){
			return i<=current_step;
		});

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
			});
	}
	this.show2=function(n){
		var n=(typeof n == "undefined")?steps.length-1:n;

		if(n<0 || n>steps.length-1){
			return;
		}
		var back=false;
		if(current_step>n) {
			back=true;
		}

		current_step=n;
		/*
		traces.classed("visible",false).classed("visible",function(d,i){

			return i==n || i-1==n;

			return (i-1)<=n;

			return (d.fromE==steps[n].fromE && d.toE==steps[n].toE)
		});
		*/
		//.style("stroke-opacity",1);//
		/*function(d,i){
			return (i<(n)*grouping)?1:0;
		});*/
	
		/*
		console.log("ITEMS",n,(steps[n].fromE+"-"+steps[n].toE),n,steps[n],steps[n].items.map(function(d){
			return d.index;
		}));
		*/

		//console.log(traces[0]);
		
		var __n=n;
		if(back) {
			__n+=grouping;
		}
		/*
		console.log("ITEMS",__n,(steps[__n].fromE+"-"+steps[__n].toE),__n,steps[__n],steps[__n].items.map(function(d){
			return d.index;
		}));

		circles
			.data(steps[__n].items,function(d,i){
				d.i=i;
				return d.index;
			})
			.filter(function(d,i){
				//console.log(d.index)
				//console.log((d.index==steps[n].fromE || d.index==steps[n].toE),(d.index+"=="+steps[n].fromE+" || "+d.index+"=="+steps[n].toE))
				return (d.index==steps[__n].fromE || d.index==steps[__n].toE);
			})
			.transition()
			.duration(1000)
			.attrTween("transform",function(d,i){
				return function(t){
					//console.log(d);
					
					var len = traces[0][__n+i].getTotalLength();
					var p = traces[0][__n+i].getPointAtLength(back?(len-len*t):(len*t));

					//console.log("getPointAt",d.index,steps[n].fromE+"-"+steps[n].toE,t,"*",len,"=",len*t,p)
					return "translate("+[(p.x),p.y]+")"
				}
			})*/
			

			
			
	}
	this.stepNext=function(animate) {
		if(animating) {
			return;
		}
		this.show(current_step+grouping,animate);
		
	}
	this.stepPrev=function() {
		if(animating) {
			return;
		}
		
		this.show(current_step-grouping);
		
	}

	this.getCurrentStep=function() {
		return current_step;
	}
	this.getStepsLength=function() {
		return steps.length-grouping;
	}
	this.getSteps=function() {
		return steps;
	}

	this.showSteps=function(index) {

		console.log(steps)

		var n=traces.data().filter(function(d){
			return d.p.index==index;
		})

		/*
		traces
			.style("stroke-opacity",0)
			.classed("highlight",false);
		*/
		traces.filter(function(d){
			return d.p.index==index;
		}).classed("highlight",true)
		.style("stroke-opacity",function(d,i){
			return 0.1+i/n.length
		})
	
	}

	this.showAllSteps=function(){
		for(var i=0;i<steps.length/grouping;i++) {
			this.showSteps(i);
		}
	}

	this.animate=function() {
		this.stepNext(true)
	}

}