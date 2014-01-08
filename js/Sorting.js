function Sorting(options) {

	var WIDTH=900,
		HEIGHT=400;

	var data=options.data || [],
		container=options.container || "#algorithms",
		algorithms_container=d3.select(container);

	var sorting=options.sorting || [];

	var algoviz=[];

	var steps={};

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
						items:items,
						grouping:1,
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
	this.race=function(){
		algoviz.forEach(function(a){
			a.animate();
		})
	}
	this.nextStep=function(){
		algoviz.forEach(function(a){
			a.stepNext();
		})
	}

	/* SORTING ALGORITHMS */
	
	
	//new Quicksort([3,2,1])

	//var merge=MergeSort()(cloneArray(data));
	//var smooth=SmoothSort()(cloneArray(data));

};

