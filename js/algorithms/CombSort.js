define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"Combsort",
		"complexity":"O(n&sup2;)",
	    "code":function() {
			var steps=[];

			function combsort(array) {
			    var gap = array.length;
			    var swaps = 0;

			    do {
			        gap = Math.floor(gap / 1.3);
			        if (gap < 1) {
			            gap = 1;
			        }
			        var i = 0;
			        swaps = 0;

			        do {
			            if(array[i].value > array[i+gap].value) {
			            //if (((IComparable)arrayToSort[i]).CompareTo(arrayToSort[i + gap]) > 0) {
			                swap(steps,array,i,i+gap);
							/*
			                object temp = arrayToSort[i];
			                arrayToSort[i] = arrayToSort[i + gap];
			                arrayToSort[i + gap] = temp;
			                RedrawItem(i);
			                RedrawItem(i + gap);
			                pnlSamples.Refresh();
			                if (chkCreateAnimation.Checked)
			                    SavePicture();
			                */
			                swaps = 1;
			            }
			            i++;
			        } while (!(i + gap >= array.length));

			    } while (!(gap == 1 && swaps == 0));

			    return array;
			}


			return function(array) {
				combsort(array);
				return steps.filter(function(d){
					return d.length>0;
				});
			}

		}
	}
});