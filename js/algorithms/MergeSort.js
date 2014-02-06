define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"Mergesort",
		"complexity":"O(n log n)",
	    "code":function() {
			var steps=[];
			var comparisons=[];
			var index=[];
			var cmp=0;
			var first=true;

			function mergeSort(a, low, high) {

			    var l = low;
			    var h = high;

			    //console.log(l,">=",h)

			    if(first) {
			    	index.push([l,low,high]);
			    	first=false;
			    }

			    if (l >= h) {
			    	
			        return a;
			    }

			    var mid = Math.floor((l + h) / 2);

			    
			    //console.log(l,mid);
			    //console.log(mid+1,h);
			    
			    //index.push([low,height]);

			    mergeSort(a, l, mid);
			    mergeSort(a, mid + 1, h);

			    var end_lo = mid;
			    var start_hi = mid + 1;

			    

			    while ((l <= end_lo) && (start_hi <= h)) {
			    	//index.push([l,start_hi]);
			    	
		        	//console.log("p",p,"l",l,"r",r);

		        	

			        if (a[l].value<a[start_hi].value) {
			            l++;
			        } else {
			            var temp = a[start_hi];
			            steps.push([]);
			            for (var k = start_hi - 1; k >= l; k--) {
			            	cmp++;

			            	index.push([k,low,high]); //here the index k decrease until it goes on l, then it takes element l+1 and move it to k
			            	comparisons.push({
			            		cmp:cmp,
			            		index:support.cloneArray(index)
			            	});

			            	//console.log("SWAAAAAAAAAAAAAAAAAAAAP");
			            	//index=[];

			            	steps.push([])
			                addStep(steps,a[k],k,k+1,comparisons[comparisons.length-1])
			                a[k + 1] = a[k];


			            }
			            steps.push([]);
			            index.push([start_hi,low,high]);
				    	comparisons.push({
		            		cmp:cmp,
		            		index:support.cloneArray(index)
		            	});
			            
		            	//console.log("SWAAAAAAAAAAAAAAAAAAAAP");
			            addStep(steps,temp,start_hi,l,comparisons[comparisons.length-1])
			            a[l] = temp;

			            l++;
			            end_lo++;
			            start_hi++;

			           
			        }
			        cmp++;
			        index.push([l,low,high]);
			    	comparisons.push({
	            		cmp:cmp,
	            		index:support.cloneArray(index)
	            	});
			        //index=[];
		        	
			    }
			    index=[];
			    //console.log(a)
			    return a;
			}

			return function(array) {
				steps=[];
				mergeSort(array,0,array.length-1);

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