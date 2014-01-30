define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"Gnomesort",
		"complexity":"O(n&sup2;)",
	    "code":function() {
			var steps=[];

			function gnomesort(array) {
			    var pos = 1;
			    while (pos < array.length) {
			    	if (array[pos].value>=array[pos - 1].value) {
			        //if (((IComparable)arrayToSort[pos]).CompareTo(arrayToSort[pos - 1]) >= 0) {
			            pos++;
			        } else {
			            /*
			            var temp = array[pos];
			            array[pos] = arrayToSort[pos - 1];
			            RedrawItem(pos);

			            arrayToSort[pos - 1] = temp;
			            RedrawItem(pos - 1);
			            RefreshPanel(pnlSamples);
			            if (savePicture)
			                SavePicture();
			            */

			            swap(steps,array,pos,pos-1);

			            if (pos > 1) {
			                pos--;
			            }
			        }
			    }
			    return array;
			}

			return function(array) {
				steps=[];
				gnomesort(array);
				return steps.filter(function(d){
					return d.length>0;
				});
			}

		}
	}
});