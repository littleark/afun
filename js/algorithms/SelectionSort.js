define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"SelectionSort",
		"complexity":"O(n&sup2;)",
	    "code":function() {
			var steps=[];

			function selectionsort(nums) {

				var i;
				var iMin;
				/* advance the position through the entire array */
				/*   (could do j < n-1 because single element is also min element) */
				for(var j=0;j<nums.length-1;j++) {

					

					/* find the min element in the unsorted a[j .. n-1] */
					/* assume the min is the first element */
					iMin=j;
					/* test against elements after j to find the smallest */
					for(var i=j+1;i<nums.length;i++) {
						/* if this element is less, then it is the new minimum */
						if(nums[i] < nums[iMin]) {
							/* found new minimum; remember its index */
							iMin=i;
						}
					}
					/* iMin is the index of the minimum element. Swap it with the current position */
					if(iMin != j) {
						steps.push([]);
						/*
						var tmp1={index:nums[j].index},
							tmp2={index:nums[iMin].index};
						*/
						var tmp=nums[iMin];

						addStep(steps,nums[j],j,iMin)
						addStep(steps,nums[iMin],iMin,j)
						/*
						steps[steps.length-1].push({
			            	index:tmp1.index,
			            	from:j,
			            	to:iMin
			            });
			            steps[steps.length-1].push({
			            	index:tmp2.index,
			            	from:iMin,
			            	to:j
			            });*/
						
						nums[iMin]=nums[j];
						nums[j]=tmp;
						

					}
				}
			}

			return function(array) {
				selectionsort(array);
				return steps.filter(function(d){
					return d.length>0;
				});
			}
		}
	}
});