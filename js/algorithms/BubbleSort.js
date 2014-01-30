define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"Bubblesort",
		"complexity":"O(n&sup2;)",
	    "code":function() {
			var steps=[];

			function bubblesort(array) {
			    var n = array.length - 1;
			    for (var i = 0; i < n; i++) {
			        for (var j = n; j > i; j--) {
			        	if(array[j-1].value > array[j].value) {
			            //if (((IComparable)arrayToSort[j - 1]).CompareTo(arrayToSort[j]) > 0) {
			                swap(steps,array,j-1,j);
			                /*
			                object temp = arrayToSort[j - 1];
			                arrayToSort[j - 1] = arrayToSort[j];
			                arrayToSort[j] = temp;
			                RedrawItem(j);
			                RedrawItem(j - 1);
			                pnlSamples.Refresh();
			                if (chkCreateAnimation.Checked)
			                    SavePicture();
			                */
			            }
			        }
			    }
			    return array;
			}

			


			return function(array) {
				steps=[];
				bubblesort(array);
				return steps.filter(function(d){
					return d.length>0;
				});
			}

		}
	}
});