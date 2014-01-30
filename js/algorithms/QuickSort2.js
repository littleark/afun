define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"Quicksort with Partition",
		"complexity":"O(n log n)",
	    "code":function() {
			var steps=[];

			

			function partition(array, begin, end, pivot) {
				//console.log(array.length,begin,end,pivot)
				var piv=array[pivot];
				swap(steps,array,pivot, end-1);
				var store=begin;
				var ix;
				for(ix=begin; ix<end-1; ++ix) {
					if(array[ix].value<=piv.value) {
						swap(steps,array,store, ix);
						++store;
					}
				}
				swap(steps,array,end-1, store);

				return store;
			}
			function quicksort(array, begin, end) {
				if(end-1>begin) {
					var pivot=begin+Math.floor(Math.random()*(end-begin));

					pivot=partition(array, begin, end, pivot);

					quicksort(array, begin, pivot);
					quicksort(array, pivot+1, end);
				}
			}

			return function(array) {
				steps=[];
				quicksort(array,0,array.length);
				return steps.filter(function(d){
					return d.length>0;
				});
			}

		}
	}
});