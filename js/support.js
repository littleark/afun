/* SUPPORT FUNCTIONS */
define(
	function() {

		var swapItems = function(array, a, b){
		    array[a] = array.splice(b, 1, array[a])[0];
		    return array;
		}

		function addStep(steps,index,from,to) {
			//console.log(index,from,"->",to)
			if(from==to)
				return;

			steps[steps.length-1].push({
	        	index:index.value,
	        	id:index.id,
	        	from:from,
	        	to:to
	        });
		}
		
		function swap(steps,list, a, b) {
			if(steps){//} && list[a].value!=list[b].value) {
				steps.push([]);
				addStep(steps,list[a],a,b);
				addStep(steps,list[b],b,a);
			}

			swapItems(list,a,b);
			/*
			var tmp=list[a];
			list[a]=list[b];
			list[b]=tmp;
			*/

		}

		function cloneArray(A) {
			var B=[];
			for(var i=0;i<A.length;i++) {
				B.push(A[i]);
			}
			return B;
		}

		//var pos=items[current_step].map(function(e) { return e.id; }).indexOf(d.id);
		function arrayObjectIndexOf(A, searchTerm, property) {
		    for(var i = 0, len = A.length; i < len; i++) {
		        if (A[i][property] === searchTerm) return i;
		    }
		    return -1;
		}


		return {
			addStep:addStep,
			swap:swap,
			cloneArray:cloneArray,
			indexOf:arrayObjectIndexOf,
			colors:{
				"gold":"53,100%,50%",
				"blue":"199,86%,53%",
				//"blue2":"202,100%,41%",
				"red":"333,100%,50%",
				"orange":"24,87%,50%",
				"limegreen":"87,100%,50%",
				//"tan":"41,32%,62%",
				"crimson":"346,100%,42%"
			},
			items:[5,10,20,50,75,100]
		}
	}
);