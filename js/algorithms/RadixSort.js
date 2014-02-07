define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"RadixSort",
		"complexity":"O(kN)",
	    "code":function() {
			var steps=[];
			var comparisons=[];
			var index=[];
			var cmp=0;

			function radixsort(nums) {
				// Figure out the number of binary digits we're dealing with
				var k = Math.max.apply(null, nums.map(function(i) {
				    return Math.ceil(Math.log(i.value)/Math.log(2));
				}));

				
				steps.push([]);
				for (var d = 0; d < k; ++d) {
				    for (var i = 0, p = 0, b = 1 << d, n = nums.length; i < n; ++i) {
				        var o = nums[i];
				        //console.log(o,"&",b)

				        index.push([i,p,-1,-1]);

				        if ((o.value & b) == 0) {
				            // this number is a 0 for this digit
				            // move it to the front of the list

				            comparisons.push({
			            		cmp:cmp,
			            		index:support.cloneArray(index)
			            	});
			            	index=[];

				            steps.push([]);
				            addStep(steps,nums[i],i,p,comparisons[comparisons.length-1])

				            for(var __i=i-1;__i>=p;__i--) {
				            	index.push([i,p,__i,__i+1]);

				            	comparisons.push({
				            		cmp:cmp,
				            		index:support.cloneArray(index)
				            	});
				            	index=[];

				            	steps.push([]);
				            	addStep(steps,nums[__i],__i,__i+1,comparisons[comparisons.length-1]);
				            }
				            

				            nums.splice(p++, 0, nums.splice(i, 1)[0]);
				            //console.log(p,i,nums)
				            
				           
							
				        }
				        cmp++;
				    }
				    
				}
			}

			return function(array) {
				steps=[];
				radixsort(array);

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