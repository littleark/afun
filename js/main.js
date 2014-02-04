require(["vendors/d3.v3.min","Sorting","support"], function(ignore,Sorting,support) {
	////d3js.org/d3.v3.min.js
	//cdnjs.cloudflare.com/ajax/libs/d3/3.3.13/d3.min.js


	

	function shuffle(o){ //v1.0
		console.log("shuffling")
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

	var data={};
	(support.items).forEach(function(d){
		data[d]=shuffle(d3.range(d));
	});

	window.sorting=new Sorting({
		container:"#algorithms",
		//sorting:["quicksort","mergesort","smoothsort"],
		sorting:[],
		//data:([0,2,3,4,5,6,19,7,8,9,10,12,16,13,14,15,17,18,20,21,11,22,23,24,25,26,27,28,29,1,30])
		//data:shuffle([0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9])
		//data:shuffle([0,1,2,3,3,4,5,1,1,1,1,1,1,1,2,2,2,2,3,3,3])
		//data:shuffle(d3.range(10))
		//data:[0,1,2,3,4]
		data:data[20]
	});

	
	//sorting.addAlgorithm("MergeSort");

	//d3.select("#stepper span").text(sorting.getSteps());



	var algorithms=[
		{
			name:"Quick Sort",
			file:"QuickSort",
			active:true
		},
		{
			name:"Quick Sort w/Partition",
			file:"QuickSort2",
			active:false
		},
		{
			name:"Heap Sort",
			file:"HeapSort",
			active:true
		},
		{
			name:"Merge Sort",
			file:"MergeSort",
			active:false
		},
		{
			name:"Smooth Sort",
			file:"SmoothSort",
			active:false
		},
		{
			name:"Radix Sort",
			file:"RadixSort",
			active:false
		},
		{
			name:"Shell Sort",
			file:"ShellSort",
			active:false
		},
		{
			name:"Cycle Sort",
			file:"CycleSort",
			active:false
		},
		{
			name:"Selection Sort",
			file:"SelectionSort",
			active:true
		},
		{
			name:"Insertion Sort",
			file:"InsertionSort",
			active:false
		},
		{
			name:"Gnome Sort",
			file:"GnomeSort",
			active:false
		},
		{
			name:"Comb Sort",
			file:"CombSort",
			active:false
		},
		{
			name:"Bubble Sort",
			file:"BubbleSort",
			active:false
		},
		{
			name:"Cocktail Sort",
			file:"CocktailSort",
			active:false
		},
		{
			name:"OddEven Sort",
			file:"OddEvenSort",
			active:false
		}
	];

	var options={
		algorithm:algorithms[0].file,
		color:"blue",
		items:10
	};

	algorithms.forEach(function(d){
		if(d.active)
			sorting.addAlgorithm(
				d.file,
				data[options.items],
				options.color
				
			);	
	})
	

	function scrollTween(offset) {
	  return function() {
	    var i = 
	        d3.interpolateNumber(
	            window.pageYOffset || document.documentElement.scrollTop,
	            offset
	        );
	    return function(t) { 
	        scrollTo(0, i(t)); 
	    };
	  };
	}
	

	d3.select("#add a.plus").on("click",function(){
		d3.event.preventDefault();
		d3.select("#add").classed("collapsed",!d3.select("#add").classed("collapsed"))

		//return;
		
		var position=support.findPos(d3.select("#add").node());

		
		d3.transition()
		    .delay(50)
		    .duration(1000)
		    .tween(
		        "scroll",
		        scrollTween(position[1]-10)
		    );
		
		
	});
	d3.select("#add a.close").on("click",function(){
		d3.event.preventDefault();
		d3.select("#add").classed("collapsed",!d3.select("#add").classed("collapsed"))
	})	

	d3.select("ul#algs").selectAll("li")
		.data(algorithms)
		.enter()
		.append("li")
			.append("a")
				.attr("href","#")
				.text(function(d){
					return d.name;
				})
				.attr("class",function(d){
					return d.file;
				})
				.classed("selected",function(d,i){
					return d.file=="QuickSort";
				})
				.on("click",function(d,i){
					d3.event.preventDefault();

					console.log(d);

					d3.selectAll("#add ul#algs li a").classed("selected",false);
					d3.select(this).classed("selected",true)

					options.algorithm=d.file;
				})
				.append("span")

	d3.select("#add ul#colors").selectAll("li")
		.data(d3.entries(support.colors))
		.enter()
		.append("li")
			.append("a")
				.attr("href","#")
				.attr("title",function(d){
					return d.key;
				})
				.classed("selected",function(d,i){
					return d.key=="blue";
				})
				.style("background-color",function(d){
					return d3.rgb("hsl("+d.value+")").toString();
				})
				.on("click",function(d,i){
					d3.event.preventDefault();

					console.log(d);
					
					d3.selectAll("#add ul#colors li a").classed("selected",false);
					d3.select(this).classed("selected",true)

					options.color=d.key;
				});

	d3.select("#add ul#items").selectAll("li")
		.data(support.items)
		.enter()
		.append("li")
			.append("a")
				.attr("href","#")
				.attr("title",function(d){
					return d+" items";
				})
				.classed("selected",function(d,i){
					return d==10;
				})
				.text(function(d){
					return d;
				})
				.on("click",function(d,i){
					d3.event.preventDefault();

					console.log(d,this,this.parentNode);

					d3.selectAll("#add ul#items li a").classed("selected",false);
					d3.select(this).classed("selected",true);

					options.items=d;
				});

	d3.select("#add .generate")
		.on("click",function(d,i){
			d3.event.preventDefault();

			sorting.addAlgorithm(
				options.algorithm,
				data[options.items],
				options.color
				
			)
		});

	d3.select("body").on("keyup",function(){
		console.log(d3.event)
		if(d3.event.keyCode==39) {
			sorting.nextStep();
		}
		if(d3.event.keyCode==37) {
			sorting.prevStep();
		}
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
			if(i===6)
				sorting.resize(1.5);
			if(i===7)
				sorting.resize(2);
			if(i===8)
				sorting.resize(3);

			//d3.select("#stepper span")
			//	.text(qs_view.getStepsLength() - qs_view.getCurrentStep())

		});
	var to=null;
	var slider=new Dragdealer("mainslider",{
			snap:true,
			steps:5,
			x:1,
			callback:function(x,y) {
				if(to){
					clearTimeout(to);
					to=null;
				}
				var dd=this;
				(function(s){
					to=setTimeout(function(){
						console.log()
						//sorting.goTo(Math.round(dd.getStep()[0]-1));
						sorting.goTo(dd.getValue()[0]);
					},200);
				}());
			},
			animationCallback: function(x, y) {
		    	d3.select("#mainslider").select('.value').text((x*100)+"%");;
		  	}
		});
});