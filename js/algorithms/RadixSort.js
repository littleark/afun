define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"RadixSort",
		"complexity":"O(kN)",
	    "code":function() {
			var steps=[];

			function radixsort(nums) {
				// Figure out the number of binary digits we're dealing with
				var k = Math.max.apply(null, nums.map(function(i) {
				    return Math.ceil(Math.log(i.value)/Math.log(2));
				}));

				for (var d = 0; d < k; ++d) {
				    for (var i = 0, p = 0, b = 1 << d, n = nums.length; i < n; ++i) {
				        var o = nums[i];
				        //console.log(o,"&",b)
				        if ((o.value & b) == 0) {
				            // this number is a 0 for this digit
				            // move it to the front of the list
				            steps.push([]);
				            addStep(steps,nums[i],i,p)

				            for(var __i=i-1;__i>=p;__i--) {
				            	addStep(steps,nums[__i],__i,__i+1);
				            }
				            

				            nums.splice(p++, 0, nums.splice(i, 1)[0]);
				            //console.log(p,i,nums)
				            
				           
							
				        }
				    }
				    //super_steps.push(cloneArray(nums));
				}
			}

			return function(array) {
				steps=[];
				radixsort(array);
				return steps.filter(function(d){
					return d.length>0;
				});
			}
		}
	}
});