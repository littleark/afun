define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"OddEvensort",
		"complexity":"O(n&sup2;)",
	    "code":function() {
			var steps=[];

			function oddevensort(array) {
			    var sorted = false;
			    while (!sorted) {
			        sorted = true;
			        for (var i = 1; i < array.length - 1; i += 2) {
			            if(array[i].value>array[i+1].value) {
			            //if (((IComparable)arrayToSort[i]).CompareTo(arrayToSort[i + 1]) > 0) {
			                /*
			                object temp = arrayToSort[i];
			                arrayToSort[i] = arrayToSort[i + 1];
			                RedrawItem(i);
			                arrayToSort[i + 1] = temp;
			                RedrawItem(i+1);
			                pnlSamples.Refresh();
			                if (chkCreateAnimation.Checked)
			                    SavePicture();
			                */
			                swap(steps,array,i,i+1);
			                sorted = false;
			            }
			        }

			        for (var i = 0; i < array.length - 1; i += 2) {
			            if(array[i].value>array[i+1].value) {
			            //if (((IComparable)arrayToSort[i]).CompareTo(arrayToSort[i + 1]) > 0) {
			            	/*
			                object temp = arrayToSort[i];
			                arrayToSort[i] = arrayToSort[i + 1];
			                arrayToSort[i + 1] = temp;
			                RedrawItem(i);
			                RedrawItem(i+1);
			                pnlSamples.Refresh();
			                if (chkCreateAnimation.Checked)
			                    SavePicture();
			                */
			                swap(steps,array,i,i+1);
			                sorted = false;
			            }
			        }
			    }
			    return array;
			}

			return function(array) {
				steps=[];
				oddevensort(array);
				return steps.filter(function(d){
					return d.length>0;
				});
			}

		}
	}
});