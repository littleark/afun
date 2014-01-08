define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"Quicksort",
		"complexity":"O(n log n)",
	    "code":function() {
			var steps=[];

			//http://en.wikibooks.org/wiki/Algorithm_Implementation/Sorting/Quicksort
			//without in-line partition ==> function name: quick
			function quicksort(array, start, end){

			    if(start < end){
			        var l=start+1, r=end, p = array[start];
			        while(l<r){
			            if(array[l] <= p)
			                l++;
			            else if(array[r] >= p)
			                r--;
			            else
			                swap(steps,array,l,r);
			        }
			        if(array[l] < p){
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
				quicksort(array,0,array.length-1);
				return steps.filter(function(d){
					return d.length>0;
				});
			}

		}
	}
});