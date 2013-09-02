function AlgorithmView(options){

	var WIDTH=options.width,
		HEIGHT=options.height;

	var steps=[],
		grouping=options.grouping || 1,
		current_steps=0;

	/*
	options.steps.forEach(function(d){
		steps.push(d);
		steps.push({
			from:d.to,
			to:d.from,
			p:d.p2
		});
	});
	*/

	steps=options.steps;

	var	code=options.code,
		container=options.container;

	var svg=d3.select(container)
				.append("svg")
					.attr("width",WIDTH)
					.attr("height",HEIGHT)
					.append("g");
	
	var elements=svg.append("g");

	elements=elements.selectAll("circle")
				.data(steps.map(function(d){
					return d.p || d.p1;
				}))
	//myData.sort().filter(function(el,i,a){if(i==a.indexOf(el))return 1;return 0})
	var traces=svg.append("g");

	traces=traces.selectAll("path.trace")
				.data(steps)
				.enter()
					.append("path")
						.attr("class","trace")
						.attr("d",function(d,i){
							//console.log("adding",i,d);
							var	x1=xscale(d.from),
							   	x2=xscale(d.to),
							   	y=HEIGHT/2,
							   	c1x=x1+(x2-x1)/2,
							   	c1y=HEIGHT/2-(x2-x1)/2;
							console.log(i,d)
							return "M"+x1+","+y+"Q"+c1x+","+c1y+","+x2+","+y;
						})
						.style("stroke",function(d){
							return d.p.strokeStyle;
						})
						.style("stroke-opacity",0)

	this.show=function(n){
		var n=n||steps.length;

		traces.style("stroke-opacity",function(d,i){
			return (i<n*grouping)?1:0;
		})
	}

	this.getSteps=function() {
		return steps;
	}

	this.showSteps=function(index) {
		var n=traces.data().filter(function(d){
			return d.p.index==index;
		})

		/*
		traces
			.style("stroke-opacity",0)
			.classed("highlight",false);
		*/
		traces.filter(function(d){
			return d.p.index==index;
		}).classed("highlight",true)
		.style("stroke-opacity",function(d,i){
			return 0.1+i/n.length
		})
	
	}

	this.showAllSteps=function(){
		for(var i=0;i<steps.length/grouping;i++) {
			this.showSteps(i);
		}
	}

}