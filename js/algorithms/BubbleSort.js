define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"Bubble Sort",
		"complexity":"O(n&sup2;)",
	    "code":function() {
			var steps=[];
			var comparisons=[];
			var index=[];
 			var cmp=0;

			function bubblesort(array) {
			    var n = array.length - 1;
			   
			    for (var i = 0; i < n; i++) {
			        for (var j = n; j > i; j--) {
			        	
			        	index.push([j,j-1]);
			        	//console.log("j",j)
			        	if(array[j-1].value > array[j].value) {
			            	comparisons.push({
			            		cmp:cmp,
			            		index:support.cloneArray(index)
			            	});
			            	index=[];
			                swap(steps,array,j-1,j,comparisons[comparisons.length-1]);
			                //console.log("----------------");
			                cmp++;
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
				console.log("COMPARISONS",(comparisons))
				console.log("COMPLEXITY",comparisons[comparisons.length-1],steps[steps.length-1][0].cmp)
				return steps.filter(function(d){
					return d.length>0;
				});
			}

		}
	}
});