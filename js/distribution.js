define(["./support"],function(support) {

	function Distribution(options) {

		var steps=options.steps,
			name=options.name;

		var distribution={};

		console.log("STEPS",options)

		steps.forEach(function(step){
			//if(!distribution[d])
			step.forEach(function(s){
				if(!distribution[s.index]) {
					distribution[s.index]=0;
				}
				distribution[s.index]++;
			})
		})

		console.log(name,"DISTRIBUTION",d3.values(distribution).toString())
		d3.entries(distribution).forEach(function(d){
			console.log(d.key,"swapped",d.value,"times")
		})

	}



	return Distribution;

});