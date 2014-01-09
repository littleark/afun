require(["//cdnjs.cloudflare.com/ajax/libs/d3/3.3.13/d3.min.js","Sorting"], function(ignore,Sorting) {
	//http://d3js.org/d3.v3.min.js


	

	function shuffle(o){ //v1.0
		console.log("shuffling")
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

	window.sorting=new Sorting({
		container:"#algorithms",
		//sorting:["quicksort","mergesort","smoothsort"],
		sorting:[],
		data:shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19])
	});

	sorting.addAlgorithm("QuickSort");
	//sorting.addAlgorithm("MergeSort");

	//d3.select("#stepper span").text(sorting.getSteps());

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

			//d3.select("#stepper span")
			//	.text(qs_view.getStepsLength() - qs_view.getCurrentStep())

		})
});