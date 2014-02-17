require.config({
    urlArgs: "t=" + (new Date()).getTime(),
	paths: {
		d3: "http://d3js.org/d3.v3.min"
		//d3: "js/vendors/d3.v3.min"
	}
});
//require(["vendors/d3.v3.min","Sorting","support"], function(d3,Sorting,support) {

require(["d3","Sorting","support"], function(d3,Sorting,support) {
	////d3js.org/d3.v3.min.js
	//cdnjs.cloudflare.com/ajax/libs/d3/3.3.13/d3.min.js


	(function () {
	  function CustomEvent ( event, params ) {
	    params = params || { bubbles: false, cancelable: false, detail: undefined };
	    var evt = document.createEvent( 'CustomEvent' );
	    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
	    return evt;
	   };

	  CustomEvent.prototype = window.CustomEvent.prototype;

	  window.CustomEvent = CustomEvent;
	})();

	function shuffle(o){ //v1.0
		//console.log("shuffling")
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};



	var data100=shuffle(d3.range(100));

	var data={};

	var random=[];
	var reversed=[];
	var few_uniques=[];
	var nearly_sorted=[];
	support.items.forEach(function(d){
		random[d]=shuffle(d3.range(d));
		reversed[d]=d3.range(d).reverse();
		nearly_sorted[d]=d3.range(d);
		few_uniques[d]=[];
	});
	
	support.items.forEach(function(d){
		var n=Math.ceil(d*0.4);
		n=(n%2)?n+1:n;
		var elements=shuffle(d3.range(d)).slice(0,n);

		for(var i=1;i<elements.length;i+=1) {
			support.swapItems(nearly_sorted[d],nearly_sorted[d].indexOf(elements[i-1]),nearly_sorted[d].indexOf(elements[i]));
		}

		
	});

	support.items.forEach(function(d){

		var unique=d3.range(Math.ceil(d/5));

		for(var i=0;i<d;i++) {
			few_uniques[d].push(unique[Math.ceil(Math.random()*unique.length-1)])
		}

	})




	data={
		"rnd":random,
		"nrl":nearly_sorted,
		"rvr":reversed,
		"few":few_uniques
	}
	
	console.log(data)


	//data[3]=[1,2,3]
	//data[10]=[0,1,2]
	//data[10]=[5,4,3,2,1,5,4,3,2,1]
	//data[10]=[9,8,7,6, 5, 4, 3,  2, 1, 0]
	window.sorting=new Sorting({
		container:"#algorithms",
		//sorting:["quicksort","mergesort","smoothsort"],
		//sorting:[],
		//data:([0,2,3,4,5,6,19,7,8,9,10,12,16,13,14,15,17,18,20,21,11,22,23,24,25,26,27,28,29,1,30])
		//data:shuffle([0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9])
		//data:shuffle([0,1,2,3,3,4,5,1,1,1,1,1,1,1,2,2,2,2,3,3,3])
		//data:shuffle(d3.range(10))
		//data:[1,1,1,1,1,1,1,1]
		//data:data[10]
	});

	
	//sorting.addAlgorithm("MergeSort");

	//d3.select("#stepper span").text(sorting.getSteps());



	var algorithms=[
		{
			name:"Quick Sort",
			file:"QuickSort3",
			O:"O(n log n)",
			active:true
		},
		{
			name:"Quick Sort 3-way",
			file:"QuickSort4",
			O:"O(n log n)",
			active:false
		},
		{
			name:"Heap Sort",
			file:"HeapSort",
			O:"O(n log n)",
			active:false
		},
		{
			name:"Smooth Sort",
			file:"SmoothSort",
			O:"O(n log n)",
			active:false
		},
		{
			name:"Shell Sort",
			file:"ShellSort",
			O:"Ciura, 2001",
			active:false
		},
		{
			name:"Radix Sort",
			file:"RadixSort",
			O:"O(kN)",
			active:false
		},
		
		{
			name:"Merge Sort (in-place)",
			file:"MergeSort",
			O:"O(n&sup2;)",
			active:false
		},
		{
			name:"Cycle Sort",
			file:"CycleSort",
			O:"O(n&sup2;)",
			active:false
		},
		{
			name:"Selection Sort",
			file:"SelectionSort",
			O:"O(n&sup2;)",
			active:false
		},
		{
			name:"Insertion Sort",
			file:"InsertionSort",
			O:"O(n&sup2;)",
			active:false
		},
		{
			name:"Gnome Sort",
			file:"GnomeSort",
			O:"O(n&sup2;)",
			active:false
		},
		{
			name:"Comb Sort",
			file:"CombSort",
			O:"O(n&sup2;)",
			active:false
		},
		{
			name:"Bubble Sort",
			file:"BubbleSort",
			O:"O(n&sup2;)",
			active:false
		},
		{
			name:"Cocktail Sort",
			file:"CocktailSort",
			O:"O(n&sup2;)",
			active:false
		},
		{
			name:"OddEven Sort",
			file:"OddEvenSort",
			O:"O(n&sup2;)",
			active:false
		}
	];

	var options={
		algorithm:algorithms[0].file,
		color:"blue",
		items:10,
		initial_condition:"rnd"
	};

	
	
	


	sorting.detectScrollTop();
	d3.select("#algorithms").style("min-height",(window.innerHeight-25)+"px")
	d3.select(window).on("scroll",sorting.detectScrollTop);
	d3.select(window).on("resize",function(){
		d3.select("#algorithms").style("min-height",(window.innerHeight-25)+"px")
	});

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
		//d3.select("#formContainer").classed("collapsed",!d3.select("#formContainer").classed("collapsed"))
		d3.select("#formContainer").classed("collapsed",false);

		//return;
		
		var position=support.findPos(d3.select("#formContainer").node());

		
		d3.transition()
		    .delay(50)
		    .duration(1000)
		    .tween(
		        "scroll",
		        scrollTween(position[1]-10)
		    );
		
		
	});
	d3.select("#formContainer a.close").on("click",function(){
		d3.event.preventDefault();
		d3.select("#formContainer").classed("collapsed",!d3.select("#formContainer").classed("collapsed"))

		d3.transition()
		    .duration(1000)
		    .tween(
		        "scroll",
		        scrollTween(0)
		    );

	})	

	d3.select("ul#algs").selectAll("li")
		.data(algorithms)
		.enter()
		.append("li")
			.append("a")
				.attr("href","#")
				.html(function(d){
					return d.name+"<br/><i>"+d.O+"</i>";
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

					d3.selectAll("#formContainer ul#algs li a").classed("selected",false);
					d3.select(this).classed("selected",true)

					options.algorithm=d.file;
				})
				.append("span")

	d3.select("#formContainer ul#colors").selectAll("li")
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
					
					d3.selectAll("#formContainer ul#colors li a").classed("selected",false);
					d3.select(this).classed("selected",true)

					options.color=d.key;
				});

	d3.select("#formContainer ul#initial").selectAll("li")
			.data(d3.keys(data))
			.select("a")
			.on("click",function(d,i){
				d3.event.preventDefault();

				console.log(d);
				
				d3.selectAll("#formContainer ul#initial li a").classed("selected",false);
				d3.select(this).classed("selected",true)

				options.initial_condition=d;
			});

	d3.select("#formContainer ul#items").selectAll("li")
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

					d3.selectAll("#formContainer ul#items li a").classed("selected",false);
					d3.select(this).classed("selected",true);

					options.items=d;
				});

	d3.select("#formContainer .generate")
		.on("click",function(d,i){
			d3.event.preventDefault();

			sorting.addAlgorithm(
				options.algorithm,
				data[options.initial_condition][options.items],
				options.color,
				options.initial_condition
			)
		});

	d3.select("body").on("keyup",function(){
		//console.log(d3.event)
		if(d3.event.keyCode==39) {
			sorting.nextStep();
		}
		if(d3.event.keyCode==37) {
			sorting.prevStep();
		}
	})

	document.addEventListener('paused', function start(e) {
		var running=sorting.getStatus();
		d3.select("#controls #play").classed("play",running);
		sorting.pause();
	});
	d3.select("#controls #back")
		.on("click",function(d,i){
			d3.event.preventDefault();

			sorting.prevStep();
			var running=sorting.getStatus();
			d3.select("#controls #play").classed("play",running);
			
		});
	d3.select("#controls #forward")
		.on("click",function(d,i){
			d3.event.preventDefault();

			sorting.nextStep();
			var running=sorting.getStatus();
			
			d3.select("#controls #play").classed("play",running);
			
		});
	d3.select("#controls #play")
		.on("click",function(d,i){
			d3.event.preventDefault();
			var running=sorting.getStatus();
			
			d3.select(this).classed("play",!running);
			if(!running) {
				sorting.pause();
				sorting.start();
			} else {
				sorting.pause();
			}
			
		});

	d3.select("#controls #fastback")
		.on("click",function(d,i){
			d3.event.preventDefault();

			sorting.pause(null,function(){
				sorting.goTo(0);
			});
			var running=sorting.getStatus();
			d3.select("#controls #play").classed("play",running);

			
			
		});

	d3.select("#controls #fastforward")
		.on("click",function(d,i){
			d3.event.preventDefault();

			sorting.pause(null,function(){
				sorting.goTo(sorting.getSteps()-1);
			});
			var running=sorting.getStatus();
			d3.select("#controls #play").classed("play",running);
			
			
		});

	d3.selectAll("#layout a.size")
		.on("click",function(d,i){
			d3.event.preventDefault();

			d3.selectAll("#layout a.size").classed("selected",function(l,j){
				return i==j;
			});
			
			sorting.resize(i);
			
		});
	d3.select("#layout a.items")
		.on("click",function(d,i){
			d3.event.preventDefault();

			d3.select(this).classed("selected",!d3.select(this).classed("selected"));
			sorting.toggleItems();
			
		});

	algorithms.forEach(function(d){
		if(d.active)
			sorting.addAlgorithm(
				d.file,
				data[options.initial_condition][options.items],
				options.color,
				options.initial_condition
			);	
	})
});
