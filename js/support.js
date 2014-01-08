/* SUPPORT FUNCTIONS */
define(
	function() {

		function addStep(steps,index,from,to) {
			//console.log(index,from,"->",to)
			if(from==to)
				return;
			steps[steps.length-1].push({
	        	index:index,
	        	from:from,
	        	to:to
	        });
		}
		
		function swap(steps,list, a, b) {
			steps.push([]);
			addStep(steps,list[a],a,b);
			addStep(steps,list[b],b,a);

			var tmp=list[a];
			list[a]=list[b];
			list[b]=tmp;


		}

		function cloneArray(A) {
			var B=[];
			for(var i=0;i<A.length;i++) {
				B.push(A[i]);
			}
			return B;
		}

		return {
			addStep:addStep,
			swap:swap,
			cloneArray:cloneArray
		}
	}
);