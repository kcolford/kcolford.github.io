var load = (function() {
  var cache = {};
  return function(url, sri) {
    if (!(url in cache))
      cache[url] = new Promise(function(win, fail) {
        var script = document.createElement("script");
        script.src = url;
        if (sri) {
          script.integrity = sri;
          script.crossorigin = "anonymous";
        }
        script.onload = win;
        document.getElementsByTagName("head")[0].appendChild(script);
      });
    return cache[url];
  };
})();
