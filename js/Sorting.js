define(["AlgorithmView3"],function(AlgorithmView) {
	function Sorting(options) {

		var WIDTH=900,
			HEIGHT=400;

		var data=options.data || [],
			container=options.container || "#algorithms",
			algorithms_container=d3.select(container);

		var sorting=options.sorting || [];

		var algoviz=[];

		var steps={},
			step=0,
			stepper={};
		

		var functions={
			/*"quicksort":QuickSort(),
			"mergesort":MergeSort(),
			"smoothsort":SmoothSort(),
			"heapsort":HeapSort()*/
		}


		this.addAlgorithm=function(fn) {
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


				
				new_algorithms.each(function(d,i){

					steps[d]=functions[d](support.cloneArray(data));
					var items=[];
					items.push(support.cloneArray(data));

					algoviz.push(
						new AlgorithmView({
							container:"#"+d3.select(this).attr("id"),
							width:WIDTH,
							height:HEIGHT,
							steps:steps[d],
							step:step,
							items:items,
							step_callback:function(n) {
								step=n;
								stepper[d].text(steps[d].length - step);
								console.log("STEP",d,step,steps[d].length-n)
							},
							callback:function(){
								//d3.select("#stepper span")
								//	.text(qs_view.getStepsLength() - qs_view.getCurrentStep())
							}
						})
					)

				})

			});
		}

		/* PUBLIC FUNCTIONS */
		this.start=function(){
			algoviz.forEach(function(a){
				a.start();
			})
		}
		this.pause=function(){
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