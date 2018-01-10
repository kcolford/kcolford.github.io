fetch('https://gist.githubusercontent.com/kcolford/5189fb174bd82e1c7381ff99dff68dcb/raw/bookmarks.md')
    .then(res => {
	return res.text();
    })
    .then(res => {
	document.getElementById('content').innerHTML = (new Remarkable()).render(res);
    })
    .catch(console.log)

	
