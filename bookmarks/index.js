fetch('https://gist.githubusercontent.com/kcolford/5189fb174bd82e1c7381ff99dff68dcb/raw/bookmarks.md')
    .then(res => {
	if (res.ok) 
	    return res.text();
	else
	    throw new Error(res);
    })
    .then(res => {
	var html = (new showdown.Converter({rawHeaderId: true})).makeHtml(res);
	document.getElementById('content').innerHTML = html;
    })
    .catch(console.log)

// A little routine to cleanup any exposed urls, it won't work unless
// the targets allow CORS access though.
    .then(() => {
	var elements = document.getElementsByTagName('a');
	for (var i = 0; i < elements.length; i++) {
	    let a = elements[i];
	    if (a.href == a.text) {
		fetch(a.href)
		    .then(res => {
			if (res.ok) 
			    return res.text();
			else
			    throw new Error(res);
		    })
		    .then(res => {
			var html = document.createElement('html');
			html.innerHTML = res;
			var titles = html.getElementsByTagName('title');
			a.text = titles[0].text;
			console.log('replaced', a.href, 'with', a.text);
		    })
		    .catch(console.log)
		;
	    }
	}
    })
    .catch(console.log)
;


	
