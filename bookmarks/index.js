fetch_better(
  "https://gist.githubusercontent.com/kcolford/5189fb174bd82e1c7381ff99dff68dcb/raw/bookmarks.md"
)
  .then(render_markdown)
  .then(reload_links);

function fetch_better(url) {
  return fetch(url, arguments[1]).then(res => {
    if (res.ok) return res.text();
    return Promise.reject(res.status);
  });
}

function reload_links() {
  return Promise.all(
    document.getElementsByTagName("a").map(a => {
      if (a.href == a.text) {
        return fetch_better(a.href.replace(/^http:/, "https:")).then(res => {
          var html = document.createElement("html");
          html.innerHTML = res;
          var titles = html.getElementsByTagName("title");
          a.text = titles[0].text;
          console.log("replaced", a.href, "with", a.text);
        });
      }
    })
  );
}

function render_markdown(mkdown) {
  return load(
    "https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.6/showdown.min.js"
  )
    .then(() => {
      return mkdown;
    })
    .then(res => {
      var html = new showdown.Converter().makeHtml(res);
      document.getElementById("content").innerHTML = html;

      // build a table of contents
      var toc = document
        .getElementById("content")
        .appendChild(document.createElement("ul"));
      var headers = document.getElementsByTagName("h2");
      for (var i = 0; i < headers.length; i++) {
        var a = toc
          .appendChild(document.createElement("li"))
          .appendChild(document.createElement("a"));
        a.href = "#" + headers[i].id;
        a.textContent = headers[i].textContent;
      }
    });
}
