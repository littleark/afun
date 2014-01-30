define(["AlgorithmView3"],function(AlgorithmView) {
	function Sorting(options) {

		var self=this;

		var WIDTH=450,
			HEIGHT=220;

		var size=1;

		var data=setData(options.data) || [],
			container=options.container || "#algorithms",
			algorithms_container=d3.select(container);

		console.log("DATAAAAAAAAA",data)

		var sorting=options.sorting || [];

		var algoviz={};

		var steps={},
			step=0;
		
		var running=0;

		var functions={
			/*"quicksort":QuickSort(),
			"mergesort":MergeSort(),
			"smoothsort":SmoothSort(),
			"heapsort":HeapSort()*/
		}

		function setData(data) {
			
			return data.map(function(d,i){
				return {
					value:d,
					id:d+"_"+i
				}
			})

		}

		this.removeAlgorithm=function(name) {

			sorting=sorting.filter(function(d){
				return d.name!=name;
			})
			algorithms_container
				.selectAll("div.algorithm")
					.filter(function(d){
						return d.name==name;
					})
					.remove();
			delete(algoviz[name]);

			console.log(sorting,algoviz)
		}

		this.addAlgorithm=function(fn,callback) {
			require(["algorithms/"+fn,"support"], function(algorithm,support) {
				
				sorting.push({
					fn:fn,
					name:fn+"_"+sorting.length
				});
				if(!functions[fn]) {
					functions[fn]=algorithm["code"]();	
				}

				var algorithms=algorithms_container
					.selectAll("div.algorithm")
						.data(sorting);
						/*.data(sorting,function(d,i){
							return d+"_"+i;
						});*/
						/*
						.data(sorting.map(function(d,i){
							return {
								fn:d,
								name:d+"_"+i
							}
						}))
						*/

				var new_algorithms=algorithms.enter()
							.append("div")
							//.insert("div","div.add")
							.attr("class","algorithm")
							.attr("id",function(d,i){
								return d.name;
								//return d+"_"+i;
							})
							.attr("rel",function(d){
								return d.name;
							});
				/*
				new_algorithms.each(function(d){
					sorting.push(d.name);
				})
				*/

				new_algorithms
					.append("h2")
					.text(function(d){
						return algorithm.name || d.name;
					})
					.append("span")
						.html(" "+(algorithm.complexity || ""))

				



				new_algorithms
					.append("h3")
					.text("0");

				//console.log(fn,new_algorithms)

				console.log("running:",running)
				self.pause(running?-1:0);
				
				

				new_algorithms.each(function(d,i){

					steps[d.name]=functions[d.fn](support.cloneArray(data));
					var items=[];
					items.push(support.cloneArray(data));

					var self=this;
					algoviz[d.name]=

					//algoviz.push(
						new AlgorithmView({
							name:d.name,
							container:"#"+d3.select(this).attr("id"),
							width:WIDTH,
							height:HEIGHT,
							size:size,
							steps:steps[d.name],
							step:step,
							items:items,
							step_callback:function(n) {
								step=n;
								//stepper[d].text(steps[d].length - step);
								//stepper[d].text(step);
								d3.select(self).select("h3").text(step)
								//console.log("STEP",d,step,steps[d].length-n)

							},
							callback:function(){
								setTimeout(function(){
									if(running<0) {
										self.start();
									}
								},0)

								d3.select("#range_"+d.name)
									
							}
						});


					//)

					

				});


				

			});
		}

		/* PUBLIC FUNCTIONS */
		this.start=function(){
			console.log("------------->",running)
			if(running>0)
				return;
			running=1;
			console.log("start","setting running to",running)
			d3.values(algoviz).forEach(function(a,i){
				console.log("starting",i,a.getName())
				a.start();
			})
		}
		this.pause=function(status){
			running= status || 0;
			console.log("pause","setting running to",running,"status is",status)
			d3.values(algoviz).forEach(function(a){
				a.pause();
			})
		}
		this.nextStep=function(){
			d3.values(algoviz).forEach(function(a){
				a.stepNext();
			})
		}
		this.prevStep=function(){
			d3.values(algoviz).forEach(function(a){
				a.stepPrev();
			})
		}
		this.goTo=function(p){
			d3.values(algoviz).forEach(function(a){
				a.goToPerc(p);
			})
		}
		this.setAllSliders=function(p) {
			d3.values(algoviz).forEach(function(a){
				a.setSlider(p);
			})	
		}
		this.getSteps=function(){
			var steps=0;
			d3.values(algoviz).forEach(function(a){
				console.log("!!!!!!!!!",a)
				steps=Math.max(a.getStepsLength(),steps);
			})
			return steps;
		}
		this.resize=function(s) {
			size=s;
			d3.values(algoviz).forEach(function(a){
				a.resize(size);
			})	
		}
		function shuffle(o){ //v1.0
			console.log("shuffling")
			for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		};
		this.setColor=function(color,name) {
			d3.entries(algoviz)
				.filter(function(d){
					console.log("!!!!!!!",d)
					return !name || d.key==name;
				})
				.forEach(function(d){
					console.log("color for",d.key)
					d.value.setColor(color);	
				})
				

		}
		this.updateData=function(data,name) {
			
			var data=data || [2,1];//shuffle(d3.range(50));
			data=setData(data);

			require(["support"],function(support){
				algorithms_container
					.selectAll("div.algorithm")
						.filter(function(d){
							return !name || name==d.name;
						})
						.each(function(d,i){
							//console.log(d,support.cloneArray(data));
							steps[d.name]=[];
							steps[d.name]=functions[d.fn](support.cloneArray(data));
							
							//console.log(d,items,steps[d])
							
							

						})

				algorithms_container
					.selectAll("div.algorithm")
						.filter(function(d){
							return !name || name==d.name;
						})
						.each(function(d,i){
							var items=[];
							items.push(support.cloneArray(data));
							algoviz[d.name].updateData(steps[d.name],items);
						})
			})
			
		}
	};

	return Sorting;

});