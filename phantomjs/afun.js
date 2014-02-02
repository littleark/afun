var page = require('webpage').create();

page.paperSize={ format: "A4", orientation: 'portrait', margin: '1cm' };
page.viewportSize = { width: 960, height: 800 };
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.0; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7';

page.open('http://localhost/afun/sorting.html', function(status) {
  	if (status !== 'success') {
		console.log('Unable to load the address!');
	} else {
		/*page.injectJs('delocal.js');
		page.evaluate(function() { document.body.style.backgroundColor = '#FFFFFF'; });
		window.setTimeout(function () {
			page.render(output);
			phantom.exit();
		}, 1000);*/
	}
  
});
page.onConsoleMessage = function(msg, lineNum, sourceId) {
    //console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
    console.log('CONSOLE: ' + msg);
    if(msg=="RENDER") {
    	
    	page.injectJs('delocal.js');
		page.evaluate(function() { document.body.style.backgroundColor = '#000'; });

    	window.setTimeout(function () {
			page.render('afun.pdf');
			phantom.exit();
		}, 2000);
    }
};