define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"Quicksort",
		"complexity":"O(n log n)",
	    "code":function() {
			var steps=[];
			var iterations=[];
			//http://en.wikibooks.org/wiki/Algorithm_Implementation/Sorting/Quicksort
			//without in-line partition ==> function name: quick
			function quicksort(array, start, end){
				steps.push([]);
			    if(start < end){
			        var l=start+1, r=end, p = array[start];
			        iterations.push(0);
			        while(l<r) {
			        	iterations[iterations.length-1]++;

			            if(array[l].value <= p.value)
			                l++;
			            else if(array[r].value >= p.value)
			                r--;
			            else {
			            	swap(steps,array,l,r);
			            }
			        }
			        if(array[l].value < p.value){
			            swap(steps,array,l,start);
			            l--;
			        }
			        else{
			            l--;
			            swap(steps,array,l,start);
			        }
			        quicksort(array, start, l);
			        quicksort(array, r, end);
			    }
			}

			return function(array) {
				steps=[];
				quicksort(array,0,array.length-1);
				console.log("SWAPS",steps.filter(function(d){
					return d.length>0;
				}))
				console.log("ITERATIONS",iterations)
				return steps.filter(function(d){
					return d.length>0;
				});
			}

		}
	}
});