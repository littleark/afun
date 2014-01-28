define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"CycleSort",
		"complexity":"O(n) - O(n&sup2;)",
	    "code":function() {
			var steps=[];

			function cyclesort(arrayToSort) {
		    var writes = 0;
		    for (var cycleStart = 0; cycleStart < arrayToSort.length; cycleStart++) {

		        var item = arrayToSort[cycleStart];
		        var pos = cycleStart;

		        do {
		        	steps.push([]);
		            var to = 0;
		            for (var i = 0; i < arrayToSort.length; i++) {

		                if (i != cycleStart && (arrayToSort[i].value<item.value)) {
		                    to++;
		                }
		            }
		            if (pos != to) {
		                while (pos != to && item.value==arrayToSort[to].value) {
		                    to++;
		                }

		                var temp = arrayToSort[to];

		                //addStep(item,arrayToSort.indexOf(item),to);
		                //addStep(temp,to,arrayToSort.indexOf(item));
		                addStep(steps,item,cycleStart,to)
		                addStep(steps,temp,to,cycleStart)


		                arrayToSort[to] = item;
		                
		                item = temp;
		                
		                writes++;
		                pos = to;

		                

		            }
		            
		        } while (cycleStart != pos);

		    }
		    return arrayToSort;
		}

			return function(array) {
				cyclesort(array);
				return steps.filter(function(d){
					return d.length>0;
				});
			}
		}
	}
});