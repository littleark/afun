require(["Sorting","AlgorithmView2"], function(util) {
	


	

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
});