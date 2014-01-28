define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"ShellSort",
		"complexity":"",
	    "code":function() {
			var steps=[];

			function shellsort(nums) {

			    var tempoSS = new Date();
			    var n = nums.length;
			    //console.log("n = ",n);

			    // HERE:
			    var h = Math.floor(n / 2);

			    

			    //console.log("h = ",h);
			    var c, j;

			    //gaps => Math.floor(n/(2**k)) --> original gaps by Shell 1959
			    //h=n/2, then gaps are h/2,h/4,h/8,h/16
			    //n=100 => 50,25,12,6,3,1,0

			    var gaps=[701, 301, 132, 57, 23, 10, 4, 1];

			    while (gaps.length) {
			        for (var i = h; i < n; i++) {

			        	steps.push([]);

			            c = nums[i];
			            j = i;
			            while (j >= h && nums[j - h].value > c.value) {
			            	addStep(steps,nums[j - h],j-h,j)
			            	/*
			            	steps[steps.length-1].push({
				            	index:nums[j - h].index,
				            	from:j - h,
				            	to:j
				            });
				            */

			                nums[j] = nums[j - h];
			                j = j - h;
			    			
			            }
			            nums[j] = c;
			            addStep(steps,c,i,j);
			    		/*
			    		steps[steps.length-1].push({
			            	index:c.index,
			            	from:i,
			            	to:j
			            });
			    		*/
			            
			        }

			        // AND HERE:
			        //h = Math.floor(h / 2);
			        h=gaps.pop();
			    //console.log("h = ",h);
			    }
			}

			return function(array) {
				shellsort(array);
				return steps.filter(function(d){
					return d.length>0;
				});
			}
		}
	}
});