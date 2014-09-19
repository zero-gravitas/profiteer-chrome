/*
 * The request should look something like [route, params]. The route should be,
 * e.g., "character-window/get-items" and the params should be the parameters to
 * pass. This is intentionally low-level because the high-level interface should
 * be implemented in Profiteer itself.
 */
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    var xhr = new XMLHttpRequest();
    var route = request[0];
    var params = request[1];

    xhr.onreadystatechange = function() {
      if (this.readyState == 4) {
        // TODO: Handle errors better
        sendResponse({"status": "success",
                      "result": JSON.parse(this.responseText)});
      }
    };

    var url = "http://www.pathofexile.com/".concat(route) + "?"
    for (var key in params) {
      url += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) +
        "&";
    }

    xhr.open("GET", url, true);
    xhr.withCredentials = true;
    xhr.send();
    // Return true to indicate async.
    return true;
  });
