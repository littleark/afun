define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
		"name":"Mergesort",
		"complexity":"O(n log n)",
	    "code":function() {
			var steps=[];


			function mergeSort(a, low, height) {

			    var l = low;
			    var h = height;

			    //console.log(l,">=",h)

			    if (l >= h) {
			    	
			        return a;
			    }

			    var mid = Math.floor((l + h) / 2);


			    //console.log(l,mid);
			    //console.log(mid+1,h);
			    
			    mergeSort(a, l, mid);
			    mergeSort(a, mid + 1, h);

			    var end_lo = mid;
			    var start_hi = mid + 1;
			    while ((l <= end_lo) && (start_hi <= h)) {
			    	steps.push([]);
			        if (a[l]<a[start_hi]) {
			            l++;
			        } else {
			            var temp = a[start_hi];
			            for (var k = start_hi - 1; k >= l; k--) {
			                addStep(steps,a[k],k,k+1)
			                a[k + 1] = a[k];
			                /*
			                RedrawItem(k + 1);
			                pnlSamples.Refresh();
			                if (chkCreateAnimation.Checked)
			                    SavePicture();
			                */
			                //items.push(cloneArray(a));

			            }
			            addStep(steps,temp,start_hi,l)
			            a[l] = temp;
			            //items.push(cloneArray(a));
			            /*
			            RedrawItem(l);
			            pnlSamples.Refresh();
			            if (chkCreateAnimation.Checked)
			                SavePicture();
			            */
			            l++;
			            end_lo++;
			            start_hi++;
			        }
			    }
			    //console.log(a)
			    return a;
			}

			return function(array) {
				mergeSort(array,0,array.length-1);
				return steps.filter(function(d){
					return d.length>0;
				});
			}
		}
	}
});