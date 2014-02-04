define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"Bubble Sort",
		"complexity":"O(n&sup2;)",
	    "code":function() {
			var steps=[];
			var iterations=[];

			function bubblesort(array) {
			    var n = array.length - 1;
			    var it=0;
			    for (var i = 0; i < n; i++) {
			    	it++;
			        for (var j = n; j > i; j--) {
			        	it++;
			        	if(array[j-1].value > array[j].value) {
			            	iterations.push(it);
			            	it=0;
			                swap(steps,array,j-1,j);
			            }
			        }
			    }
			    return array;
			}

			


			return function(array) {
				steps=[];
				bubblesort(array);
				console.log("SWAPS",steps.filter(function(d){
					return d.length>0;
				}))
				console.log("ITERATIONS",iterations)
				console.log("complexity",d3.sum(iterations))
				return steps.filter(function(d){
					return d.length>0;
				});
			}

		}
	}
});