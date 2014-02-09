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
			
			// Figure out the number of binary digits we're dealing with
			
			function radixsort(a) {
				for (var div = 1, radix = 16; div < 65536 * 65536; div *= radix) {
				  var piles = [];

				  for (var i = 0; i < a.length; ++i) {
				    var p = Math.floor(a[i].value / div) % radix;
				    (piles[p] || (piles[p] = [])).push(a[i]);
				    index.push([i,-1,-1]);
				  }

				  console.log(div,piles)
				  var tmpA=support.cloneArray(a);
				  for (var i = 0, ai = 0; i < piles.length; ++i) {
				    if (!piles[i]) continue;
				    

				    for (var pi = 0; pi < piles[i].length; ++pi) {

				    	var ii=support.indexOf(tmpA,piles[i][pi].id,"id");

				    	index.push([-1,ai,ii]);
				    	comparisons.push({
		            		cmp:cmp,
		            		index:support.cloneArray(index)
		            	});
				    	index=[];

				    	steps.push([]);
				    	
				    	//console.log("-------->",ii,tmpA)
				        addStep(steps,tmpA[ii],ii,ai,comparisons[comparisons.length-1])

				      	a[ai++] = piles[i][pi];
				    }

				    index.push([-1,-1,-1])
				  }
				}
				console.log(a)
			}

			function radixsort2(nums) {
				
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
				            console.log(p,i,nums)
				            
				           
							
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