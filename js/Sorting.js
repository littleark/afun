define(["AlgorithmView3"],function(AlgorithmView) {
	function Sorting(options) {

		var self=this;

		var WIDTH=450,
			HEIGHT=220;

		var data=options.data || [],
			container=options.container || "#algorithms",
			algorithms_container=d3.select(container);

		var sorting=options.sorting || [];

		var algoviz=[];

		var steps={},
			step=0,
			stepper={};
		
		var running=0;

		var functions={
			/*"quicksort":QuickSort(),
			"mergesort":MergeSort(),
			"smoothsort":SmoothSort(),
			"heapsort":HeapSort()*/
		}


		this.addAlgorithm=function(fn,callback) {
			require(["algorithms/"+fn,"support"], function(algorithm,support) {
				
				sorting.push(fn);
				functions[fn]=algorithm["code"]();

				var algorithms=algorithms_container
					.selectAll("div.algorithm")
						.data(sorting,function(d,i){
							return d+"_"+i;
						});

				var new_algorithms=algorithms.enter()
							.append("div")
							//.insert("div","div.add")
							.attr("class","algorithm")
							.attr("id",function(d,i){
								return d+"_"+i;
							})
							.attr("rel",function(d){
								return d;
							});

				new_algorithms
					.append("h2")
					.text(function(d){
						return algorithm.name || d;
					})
					.append("span")
						.html(" "+(algorithm.complexity || ""))

				stepper[fn]=new_algorithms
								.append("h3")
								.text("0");

				console.log(fn,new_algorithms)

				console.log("figa, running:",running)
				self.pause(running?-1:0);
				
				new_algorithms.each(function(d,i){

					steps[d]=functions[d](support.cloneArray(data));
					var items=[];
					items.push(support.cloneArray(data));

					algoviz.push(
						new AlgorithmView({
							name:d,
							container:"#"+d3.select(this).attr("id"),
							width:WIDTH,
							height:HEIGHT,
							steps:steps[d],
							step:step,
							items:items,
							step_callback:function(n) {
								step=n;
								stepper[d].text(steps[d].length - step);
								//console.log("STEP",d,step,steps[d].length-n)
							},
							callback:function(){
								setTimeout(function(){
									if(running<0) {
										self.start();
									}
								},0)
							}
						})
					)

				})

			});
		}

		/* PUBLIC FUNCTIONS */
		this.start=function(){
			console.log("------------->",running)
			if(running>0)
				return;
			running=1;
			console.log("start","setting running to",running)
			algoviz.forEach(function(a,i){
				console.log("starting",i,a.getName())
				a.start();
			})
		}
		this.pause=function(status){
			running= status || 0;
			console.log("pause","setting running to",running,"status is",status)
			algoviz.forEach(function(a){
				a.pause();
			})
		}
		this.nextStep=function(){
			algoviz.forEach(function(a){
				a.stepNext();
			})
		}
		this.prevStep=function(){
			algoviz.forEach(function(a){
				a.stepPrev();
			})
		}
		this.goTo=function(n){
			algoviz.forEach(function(a){
				a.goTo(n);
			})
		}
		this.getSteps=function(){
			var steps=0;
			algoviz.forEach(function(a){
				console.log("!!!!!!!!!",a)
				steps=Math.max(a.getStepsLength(),steps);
			})
			return steps;
		}
	};

	return Sorting;

});