define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"CycleSort",
		"complexity":"O(n) - O(n&sup2;)",
	    "code":function() {
			var steps=[];
			var comparisons=[];
			var index=[];
			var cmp=0;

			function cyclesort(arrayToSort) {
		    var writes = 0;
		    for (var cycleStart = 0; cycleStart < arrayToSort.length; cycleStart++) {

		        var item = arrayToSort[cycleStart];
		        var pos = cycleStart;

		        

		        do {
		        	steps.push([]);
		            var to = 0;
		            index.push([cycleStart,pos]);
		            for (var i = 0; i < arrayToSort.length; i++) {

		                if (i != cycleStart && (arrayToSort[i].value<item.value)) {
		                    to++;
		                    index.push([cycleStart,to]);
		                }
		                
		            }
		            if (pos != to) {
		                while (pos != to && item.value==arrayToSort[to].value) {
		                    to++;
		                    index.push([cycleStart,to]);
		                }

		                var temp = arrayToSort[to];

		                
		               

		                //index.push([cycleStart,pos]);
			            comparisons.push({
		            		cmp:cmp,
		            		index:support.cloneArray(index)
		            	});
		            	//console.log("SWAAAAAAAAAAAAAAAAAAAAP");
		            	index=[];

		                swap(steps,arrayToSort,cycleStart,to,comparisons[comparisons.length-1]);
		                //console.log(comparisons)
						//addStep(steps,item,cycleStart,to,comparisons[comparisons.length-1])
						//addStep(steps,temp,to,cycleStart,comparisons[comparisons.length-1])

		                //arrayToSort[to] = item;
		                
		                item = temp;
		                
		                cmp++;

		                writes++;
		                pos = to;

		                

		            }
		            
		        } while (cycleStart != pos);

		    }
		    return arrayToSort;
		}

			return function(array) {
				steps=[];
				cyclesort(array);

				steps=steps.filter(function(d){
					return d.length>0;
				});

				console.log("SWAPS",steps.filter(function(d){
					return d.length>0;
				}))
				console.log("COMPARISONS",(comparisons))
				console.log("COMPLEXITY",comparisons[comparisons.length-1],steps[steps.length-1][0].cmp)

				return steps;
			}
		}
	}
});