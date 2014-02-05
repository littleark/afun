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

postMessage("I\'m working before postMessage(\'ali\').");

var steps=[];
var iterations=[];

onmessage = function (oEvent) {
	steps=[];

	eval("var fn="+oEvent.data.fn.toString()+";");
	console.log(oEvent.data.data[0].value)
	fn(oEvent.data.data,oEvent.data.arg1,oEvent.data.arg2);

	//console.log(steps);

  	postMessage({steps:steps});// + oEvent.data.fn);
};