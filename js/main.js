require(["vendors/d3.v3.min","Sorting"], function(ignore,Sorting) {
	////d3js.org/d3.v3.min.js
	//cdnjs.cloudflare.com/ajax/libs/d3/3.3.13/d3.min.js


	

	function shuffle(o){ //v1.0
		console.log("shuffling")
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

	window.sorting=new Sorting({
		container:"#algorithms",
		//sorting:["quicksort","mergesort","smoothsort"],
		sorting:[],
		//data:([0,2,3,4,5,6,19,7,8,9,10,12,16,13,14,15,17,18,20,21,11,22,23,24,25,26,27,28,29,1,30])
		//data:shuffle([0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9])
		//data:shuffle([0,1,2,3,3,4,5,1,1,1,1,1,1,1,2,2,2,2,3,3,3])
		data:shuffle(d3.range(20))
		//data:[0,1,2,3,4]
	});

	
	//sorting.addAlgorithm("MergeSort");

	//d3.select("#stepper span").text(sorting.getSteps());

	var algorithms=[
		//"QuickSort",
		//"QuickSort2",
		//"HeapSort",
		//"MergeSort",
		//"SmoothSort",
		//"RadixSort",
		//"ShellSort",
		//"CycleSort",
		//"SelectionSort",
		//"InsertionSort",
		//"GnomeSort",
		//"CombSort",
		//"BubbleSort",
		"CocktailSort"
	];

	algorithms.forEach(function(d){
		sorting.addAlgorithm(d);	
	})
	

	d3.select("#add ul").selectAll("li")
		.data(algorithms)
		.enter()
		.append("li")
			.append("a")
				.attr("href","#")
				.text(function(d){
					return d;
				})
				.on("click",function(d,i){
					d3.event.preventDefault();

					console.log(d);
					sorting.addAlgorithm(d)

				})	

	d3.selectAll("#stepper a")
		.on("click",function(d,i){
			d3.event.preventDefault();
			if(i===0)
				sorting.prevStep();
			if(i===1)
				sorting.nextStep();
			if(i===2)
				sorting.start();
			if(i===3)
				sorting.pause();
			if(i===4)
				d3.selectAll(".circle").style("display","block")
			if(i===5)
				d3.selectAll(".circle").style("display","none")

			//d3.select("#stepper span")
			//	.text(qs_view.getStepsLength() - qs_view.getCurrentStep())

		})
});