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
		{
			name:"QuickSort",
			file:"QuickSort",
			active:true
		},
		{
			name:"QuickSort w/ Partition",
			file:"QuickSort2",
			active:false
		},
		{
			name:"HeapSort",
			file:"HeapSort",
			active:false
		},
		{
			name:"MergeSort",
			file:"MergeSort",
			active:false
		},
		{
			name:"SmoothSort",
			file:"SmoothSort",
			active:false
		},
		{
			name:"RadixSort",
			file:"RadixSort",
			active:false
		},
		{
			name:"ShellSort",
			file:"ShellSort",
			active:false
		},
		{
			name:"CycleSort",
			file:"CycleSort",
			active:false
		},
		{
			name:"SelectionSort",
			file:"SelectionSort",
			active:false
		},
		{
			name:"InsertionSort",
			file:"InsertionSort",
			active:false
		},
		{
			name:"GnomeSort",
			file:"GnomeSort",
			active:false
		},
		{
			name:"CombSort",
			file:"CombSort",
			active:false
		},
		{
			name:"BubbleSort",
			file:"BubbleSort",
			active:false
		},
		{
			name:"CocktailSort",
			file:"CocktailSort",
			active:false
		},
		{
			name:"OddEvenSort",
			file:"OddEvenSort",
			active:false
		}
	];

	algorithms.forEach(function(d){
		if(d.active)
			sorting.addAlgorithm(d.file);	
	})
	


	d3.select("#add a.plus").on("click",function(){
		d3.event.preventDefault();
		d3.select("#add ul").classed("visible",!d3.select("#add ul").classed("visible"))
	})	

	d3.select("#add ul").selectAll("li")
		.data(algorithms)
		.enter()
		.append("li")
			.append("a")
				.attr("href","#")
				.text(function(d){
					return d.name;
				})
				.on("click",function(d,i){
					d3.event.preventDefault();

					console.log(d);
					sorting.addAlgorithm(d.file)

				})	

	d3.selectAll("#controls a")
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

		});
	var to=null;
	d3.select("#mainrange")
		.on("change",function(d){
			if(to){
				clearTimeout(to);
				to=null;
			}
			(function(s){
				to=setTimeout(function(){
					console.log(s,d);
					sorting.goTo(s);
				},200);
			}(+this.value));
		})
});