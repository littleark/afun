define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"Heapsort",
		"complexity":"O(n log n)",
	    "code":function() {
			var steps=[];

			function heapsort(list) {
			    for (var i = Math.floor((list.length - 1) / 2); i >= 0; i--)
			        Adjust(list, i, list.length - 1);

			    for (var i = list.length - 1; i >= 1; i--) {

			    	steps.push([]);

			    	
			        var temp = list[0],
			        	temp1= list[i];

			        addStep(steps,temp1,i,0);
			    	addStep(steps,temp,0,i);

			        list[0] = list[i];
			        list[i] = temp;
			        
			        Adjust(list, 0, i - 1);
			                
			    }

			    return list;
			}

			function Adjust(list, i, m) {

				steps.push([]);

			    var temp = list[i],
			    	temp_i=list.indexOf(temp);
			    var j = i * 2 + 1;
			    while (j <= m) {
			        if (j < m) {
			        	if(list[j].value < list[j + 1].value) {
			        		j = j + 1;
			        	}
			        }
			        if(temp.value < list[j].value) {
			        	var tempj=list[j];
			        	addStep(steps,tempj,j,i);
			            list[i] = list[j];
			            i = j;
			            j = 2 * i + 1;
			        } else {
			            j = m + 1;
			        }
			    }
			    addStep(steps,temp,temp_i,i);
			    list[i] = temp;

			}

			return function(array) {
				steps=[];
				heapsort(array,0,array.length-1);
				return steps.filter(function(d){
					return d.length>0;
				});
			}
		}
	}
});