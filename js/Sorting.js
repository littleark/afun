define(["AlgorithmView3","distribution","support"],function(AlgorithmView,Distribution,support) {
	function Sorting(options) {

		var self=this;

		var WIDTH=900,
			HEIGHT=440;

		var SIZE_FACTOR=2;

		//var data=setData(options.data) || [],
		var	container=options.container || "#algorithms",
			algorithms_container=d3.select(container).classed("size"+SIZE_FACTOR,true);;

		

		var sorting=options.sorting || [];

		var algoviz={};

		var steps={},
			STEP=1;
		
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

		this.addAlgorithm=function(fn,data,color,callback) {
			
			require(["algorithms/"+fn,"support"], function(algorithm,support) {
				
				sorting.push({
					fn:fn,
					name:fn+"_"+sorting.length
				});
				if(!functions[fn]) {
					functions[fn]=algorithm["code"]();	
				}
				data= setData(data||data.options);
				var algorithms=algorithms_container
					.selectAll("div.algorithm:not(#add)")
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
							//.insert("div","div#add")
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
					.html(function(d){
						return algorithm.name || d.name;
					})
					//.append("span")
					//	.html(" "+(algorithm.complexity || ""))

				
				//console.log(fn,new_algorithms)

				console.log("running:",running)
				self.pause(running?-1:0);
				
				

				new_algorithms.each(function(d,i){

					console.log("using data",data.length)

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
							size_factor:SIZE_FACTOR,
							steps:steps[d.name],
							step:STEP,
							items:items,
							color:color,
							//step_callback:function(n) {},
							endOfAnimationCallback:function(){

							},
							callback:function(){
								setTimeout(function(){
									if(running<0) {
										self.start();
									};
									if(i==new_algorithms.length-1) {
										console.log("RENDER")	
									}
								},0);									
							}
						});

						new Distribution({
							name:d.name,
							steps:steps[d.name]
						});


					//)

					

				});


				

			});
		}

		/* PUBLIC FUNCTIONS */
		this.getStatus=function(){
			return running;
		}
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
			//console.log("pause","setting running to",running,"status is",status)
			d3.values(algoviz).forEach(function(a){
				a.pause();
			})
		}
		this.nextStep=function(){
			this.pause();
			d3.values(algoviz).forEach(function(a){
				a.stepNext();
			})
		}
		this.prevStep=function(){
			this.pause();
			d3.values(algoviz).forEach(function(a){
				a.stepPrev();
			})
		}
		this.goTo=function(p){
			STEP=p;
			d3.values(algoviz).forEach(function(a){
				console.log("setting position for",a.getName(),p)
				a.goToPerc(p);
			})
		}
		this.toggleItems=function() {
			d3.values(algoviz).forEach(function(a){
				a.toggleItems();
			})
		}
		/*
		this.setAllSliders=function(p) {
			d3.values(algoviz).forEach(function(a){
				a.setSlider(p);
			})	
		}
		*/
		this.getSteps=function(){
			var steps=0;
			d3.values(algoviz).forEach(function(a){
				console.log("!!!!!!!!!",a)
				steps=Math.max(a.getStepsLength(),steps);
			})
			return steps;
		}
		this.resize=function(s) {
			SIZE_FACTOR=s;
			algorithms_container
				.classed("size1",false)
				.classed("size2",false)
				.classed("size3",false)
				.classed("size"+SIZE_FACTOR,true);
			
			d3.values(algoviz).forEach(function(a){
				a.resize(SIZE_FACTOR);
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