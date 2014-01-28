define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"InsertionSort",
		"complexity":"O(n&sup2;)",
	    "code":function() {
			var steps=[];

			function insertionsort(a) {

				for(var j=1;j<a.length;j++) {
					var key=a[j];
					var i=j-1;
			        //console.log(j,key);
			        //console.log(key+"<"+a[i].index+" && "+i+">0");
					while(i>=0 && key.value<a[i].value) {
						

						steps.push([]);
						addStep(steps,a[i+1],i+1,i);
						addStep(steps,a[i],i,i+1);
						/*
			            steps[steps.length-1].push({
			            	index:a[i+1].index,
			            	from:i+1,
			            	to:i
			            });
			            steps[steps.length-1].push({
			            	index:a[i].index,
			            	from:i,
			            	to:i+1
			            });
						*/
			            a=moveFromTo(i+1,i,a);
						//items.push(getOrder(a));
			            //console.log(i+1,i,a);
						i--;
					}
				}
			    
			}

			function moveFromTo(from,to,a) {
			    var value=a[from],
			        tmp=a.slice(0,from).concat(a.slice(from+1,a.length));
			    return tmp.slice(0,to).concat([value],tmp.slice(to,a.length))
			}

			return function(array) {
				insertionsort(array);
				return steps.filter(function(d){
					return d.length>0;
				});
			}
		}
	}
});