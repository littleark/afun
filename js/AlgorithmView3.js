define(["./support"],function(support) {
	
	

	function AlgorithmView(options){

		var OWIDTH=options.width,
			OHEIGHT=options.height,
			WIDTH=Math.floor(options.width/options.size_factor),
			HEIGHT=Math.floor(options.height/options.size_factor);

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
			current_step=Math.round((steps.length)*options.step);

		console.log("STEPS",name,steps)

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
					.attr("class","algorithm")
					.append("div")
						.style("width",WIDTH+"px");
		var svg=div
				.append("svg")
					.attr("width",WIDTH)
					.attr("height",HEIGHT)
					//.append("g");

		var loading=div
				.append("div")
				.attr("class","loading");

		var to=null;

		var slider_scale=d3.scale.linear().domain([0,100]).rangeRound([0,steps.length-1]);
		var slider_container=div
			.append("div")
				.attr("id","slider_"+options.name)
				.attr("class","dragdealer");

		slider_container
				.append("div")
					.attr("class","bg-dragdealer");

		slider_container
				.append("div")
					.attr("class","handle bar")
						.append("span")
						.attr("class","value")
							.text("drag me");

		var slider=new Dragdealer("slider_"+options.name,{
			steps:steps.length,
			snap:true,
			x:(steps.length/current_step),
			callback:function(x,y) {
				if(to){
					clearTimeout(to);
					to=null;
				}
				var dd=this;
				(function(s){
					to=setTimeout(function(){
						//console.log(steps.length-1,dragdealer.getStep()[0]-1);
						var step=Math.round(dd.getStep()[0]-1);
						//console.log("!!!!!",name,current_step,step)
						var delta=Math.abs(current_step-step);
						if(delta>0) {
							self[delta===1?"show":"goTo"](step)
							//self.goTo(step);
							return;
						}
					},200);
				}());
			},
			animationCallback: function(x, y) {
		    	slider_container.select('.value').text(Math.round(this.getStep()[0]-1));
		  	}
		});


		var circles_container=svg.append("g")
							.attr("id","circles")
							.attr("transform","translate("+margins.left+","+margins.top+")");
		var circles=null;
		var traces=null;

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
						.range(["hsl(0,0%,100%)", "hsl("+(support.colors[options.color])+")"])
						.interpolate(d3.interpolateLab);

		var radius=d3.scale.sqrt()
						.domain([0, max_value])
						.range([1, Math.ceil(20/options.size_factor)])

		function updateCircles() {

			circles=circles_container.selectAll("g.circle")
						.data(items[0],function(d,i){
							return d.id;
						});

			circles.exit().remove();
			
			var new_circles=circles.enter()
				.append("g")
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
					return color(d.value);
				})

		}
		
		var tmp_svg=document.createElement("svg");

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
										/*
										.attr("rel",function(d,i){
											return "step_"+i;
										});
										*/

				new_traces.selectAll("path")
						.data(function(d){
							return d;
						})
						.enter()
							.append("path")
							

				traces=traces_container.selectAll("g.step");
				
				var total=traces.data().length,
					count=0,
					delta=100;
				
				d3.timer(function(_elapsed){
					//console.log("timer",_elapsed,count,total)
				//setTimeout(function(){
					traces
						.filter(function(d,i){
							return i>=count && i<=count+delta;
						})
						.selectAll("path")

							//.data(function(d){
							//	return d;
							//})
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
					count+=delta;
					if(count>=total) {
						var evt = new CustomEvent("ready"+name);
						document.dispatchEvent(evt);
					}
					return count>=total;
				})
				
						
				/*
				console.log(tmp_svg.innerHTML);

				traces_container=svg.append("g")
						.attr("id","traces2")
						.attr("transform","translate("+margins.left+","+margins.top+")");
				traces_container.node().innerHTML=tmp_svg.innerHTML;

				traces=traces_container.selectAll("g.step");
				trace.selectAll("path")
						.attr("stroke-dashoffset",function(d){
							return d3.select(this).node().getTotalLength();
						})
						.attr("stroke-dasharray",function(d){
							var len=d3.select(this).node().getTotalLength();
							return len+" "+len;
						});
				
				delete tmp_svg;
				*/
		}

		function removeLoading() {
			loading.remove();
		}
		

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
		this.setColor=function(c) {
			

			var c=c||"blue";
			color.range(["hsl(0,0%,100%)", "hsl("+(support.colors[c])+")"]);

			traces
				.selectAll("path")
					.style("stroke",function(d){
						return color(d.index);
					});

			circles.selectAll("circle")
				.style("fill",function(d){
					console.log(d,color(d.value))
					return color(d.value);
				});

		}
		this.resize=function(factor) {
			WIDTH=Math.floor(OWIDTH/factor);
			HEIGHT=Math.floor(OHEIGHT/factor);

			d3.select(container)
				.classed("size1",factor===1)
				.classed("size2",factor===2)
				.classed("size3",factor===3)
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
			traces
				.filter(function(d,i){
					return i<=current_step;
				})
				.selectAll("path")
					.attr("stroke-dashoffset",function(d){
						return 0;
					})
			
			radius.range([1, Math.ceil(20/factor)]);
			console.log("items",items)
			circles
				.attr("transform",function(d,i){
					
					var pos=support.indexOf(items[current_step],d.id,"id"),
						x=xscale(pos),
						y=HEIGHT/2;

					//console.log(i,x,xscale.range(),xscale.domain())

					return "translate("+x+","+y+")";
				})
				.selectAll("circle")
					.attr("r",function(d){
						return radius(d.value);
					})

		}

		

		var indicator=circles_container
							.selectAll("g.indicator")
							.data(steps[1][0].cmp.index[0],function(d,i){
								return i;
							})
							.enter()
							.append("g")
							.attr("class","indicator")
		indicator
			.attr("transform",function(d,i){
						
				var x=xscale(d),
					y=HEIGHT/2;

				return "translate("+x+","+y+")";
			})
			.append("path")
				.attr("d","M0,0L5,-10L-5,-10,Z")
				.attr("transform",function(d,i){
					if(i>0) {
						return "rotate(180)translate(0,-5)";
					} else {
						return "rotate(0)translate(0,-5)";
					}
				})
				.style("fill",function(d,i){
					var colors=["#ffffff","#ff0000","#339933"];
					return colors[i];
				})
				.style({
					stroke:"none"
				})

		this.show=function(n,animate) {
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

			//console.log("CURRENT STEP",current_step,steps[current_step])

			var indexes=steps[current_step][0].cmp.index;

			var transitions=[];

			//console.log(indexes);

			function slideIndicator(index){
				//console.log("going to",index,indexes[index].toString())
				indicator
					.data(indexes[index],function(d,i){
						return i;
					})
					.transition()
					.duration(DURATION/2)
					.attr("transform",function(d,i){
						//console.log("index",index,"element",i,"go to",d)
						var x=xscale(d),
							y=HEIGHT/2;
						return "translate("+x+","+y+")";
					})
					.each("end",function(d,i){
						if(i==indexes[index].length-1) {
							index++;
							if(index<indexes.length) {
								slideIndicator(index);
							} else {
								self.swap(n,true);
							}	
						}
					});
			}
			slideIndicator(0);

			/*
			indexes.forEach(function(index,i){
				
				transitions[i]=((i===0)?indicator:transitions[i-1])
								.transition()
								.duration(1000)
								.attr("transform",function(d){
									var x=xscale(index),
										y=HEIGHT/2-5;
									return "translate("+x+","+y+")";
								})
								.each("end",function(d){
									if(i==indexes.length-1) {
										//self.swap(n,animate);
									}
								})
				
			})
			*/


		}

		this.swap=function(n,animate){
			//console.log("show",n,animate)
			/*
			if(animating) {
				console.log("already animating")
				return;
			}
			*/
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

			//console.log(name,"N",n)

			

			
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
						
						//options.step_callback(current_step);
						
						//slider.setStep(current_step+1);
						self.setSlider(current_step+1);

						animating=false;

						if(i==steps[current_step+back].length-1 && animate) {
							//console.log("----")
							if(status) {
								self.stepNext(animate);	
							}
						} else {

						}
					})

		}




		
		this.goToPerc=function(p,callback) {
			console.log(p,Math.round((steps.length-1)*p));
			//this.goTo(slider_scale(p),callback);
			this.goTo(Math.round((steps.length-1)*p),callback)
		}
		this.setSlider=function(p) {
			//console.log("----->",name,p);
			//this.goTo(slider_scale(p),callback);
			slider.setStep(p,0);
			//slider.setValue(Math.round((steps.length-1)*p),0,true);
		}
		this.toggleItems=function() {
			d3.select(container).classed("hidden",!d3.select(container).classed("hidden"));
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

			//animating=true;
			current_step=n;

			//options.step_callback(current_step);

			//if(slider.getStep()[0]-1!=current_step) {
				//slider.setStep(current_step+1);
				self.setSlider(current_step+1);
			//}

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
					if(i==items[current_step].length-1) {
						//animating=false;
						if(callback) {
							callback();
						}
					}
				})
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
				if(current_step==steps.length-1) {
					this.goTo(0,function(){
						self.pause();
						self.start();
					})
				} else {
					this.stepNext(true);
				}
				
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

		;(function init(){
			updateCircles();
			updateTraces();

			document.addEventListener('ready'+name, function start(e) {
				removeLoading();
				if(current_step>0) {
					self.goTo(current_step,options.callback);
				} else {
					if(options.callback) {
						options.callback();
					}
				}
				document.removeEventListener("ready"+name,start)
			}, false);
			
		}());

	}

	return AlgorithmView;

});