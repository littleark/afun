define(["../support"], function(support) {
	swap=support.swap;
	addStep=support.addStep;
	return {
	    "code":function() {
			var steps=[];

			function heapsort(list) {
			    for (var i = Math.floor((list.length - 1) / 2); i >= 0; i--)
			        Adjust(list, i, list.length - 1);

			    for (var i = list.length - 1; i >= 1; i--) {

			    	steps.push([]);

			    	
			        var temp = list[0],
			        	temp1= list[i];

			        addStep(steps,temp1,i,0);
			    	addStep(steps,temp,0,i);

			        list[0] = list[i];
			        list[i] = temp;
			        
			        //console.log(list,"main")
			        /*RedrawItem(0);
			        RedrawItem(i);
			        pnlSamples.Refresh();
			        if (chkCreateAnimation.Checked)
			            SavePicture();
			        */
			        Adjust(list, 0, i - 1);
			                
			    }

			    return list;
			}

			function Adjust(list, i, m) {

				steps.push([]);

			    var temp = list[i],
			    	temp_i=list.indexOf(temp);
			    var j = i * 2 + 1;
			    while (j <= m) {
			        if (j < m) {
			        	if(list[j] < list[j + 1]) {
			        		j = j + 1;
			        	}
			        }
			        if(temp < list[j]) {
			        	var tempj=list[j];
			        	addStep(steps,tempj,j,i);
			            list[i] = list[j];
			            /*
			            RedrawItem(i);
			            pnlSamples.Refresh();
			            if (chkCreateAnimation.Checked)
			                SavePicture();
			            */
			            i = j;
			            j = 2 * i + 1;
			        } else {
			            j = m + 1;
			        }
			    }
			    addStep(steps,temp,temp_i,i);
			    list[i] = temp;
			    //console.log(list,"Adjust");
			    /*
			    RedrawItem(i);
			    pnlSamples.Refresh();
			    if (chkCreateAnimation.Checked)
			        SavePicture();
			    */
			}

			return function(array) {
				heapsort(array,0,array.length-1);
				return steps.filter(function(d){
					return d.length>0;
				});
			}
		}
	}
});