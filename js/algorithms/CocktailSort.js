define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"Cocktailsort",
		"complexity":"O(n&sup2;)",
	    "code":function() {
			var steps=[];

			function cocktailsort(array)  {
			    var limit = array.length;
			    var st = -1;
			    var swapped = false;
			    do {
			        swapped = false;
			        st++;
			        limit--;
			                
			        for (var j = st; j < limit; j++) {
			            if(array[j].value > array[j+1].value) {
			            //if (((IComparable)arrayToSort[j]).CompareTo(arrayToSort[j + 1]) > 0) {
			            	swap(steps,array,j,j+1);
			            	swapped=true;
			            	/*
			                object temp = arrayToSort[j];
			                arrayToSort[j] = arrayToSort[j + 1];
			                arrayToSort[j + 1] = temp;
			                swapped = true;
			                RedrawItem(j);
			                RedrawItem(j + 1);
			                pnlSamples.Refresh();
			                if(chkCreateAnimation.Checked)
			                    SavePicture();
							*/
			            }
			        }
			        for (var j = limit - 1; j >= st; j--) {
			            if(array[j].value > array[j+1].value) {
			            //if (((IComparable)arrayToSort[j]).CompareTo(arrayToSort[j + 1]) > 0) {
			            	swap(steps,array,j,j+1);
			            	swapped=true;
			            	/*
			                object temp = arrayToSort[j];
			                arrayToSort[j] = arrayToSort[j + 1];
			                arrayToSort[j + 1] = temp;
			                swapped = true;
			                RedrawItem(j);
			                RedrawItem(j + 1);
			                        
			                pnlSamples.Refresh();
			                if (chkCreateAnimation.Checked)
			                    SavePicture();
							*/
			            }
			        }

			    } while (st < limit && swapped);

			    return array;
			}

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
				cocktailsort(array);
				return steps.filter(function(d){
					return d.length>0;
				});
			}

		}
	}
});