!(function (e) {
  if (e.__clearbit_tagsjs)
    e.console &&
      e.console.error &&
      e.console.error("Clearbit tags.js snippet included twice.");
  else {
    e.__clearbit_tagsjs = !0;
    var t = document.createElement("script");
    t.src =
      "https://x.clearbitjs.com/v2/pk_b697788b61c4967c8c8843230b063b1e/destinations.min.js";
    var r = document.getElementsByTagName("script")[0];
    (t.async = !0), r.parentNode.insertBefore(t, r);
    var c = (e.clearbit = e.clearbit || []);
    if (
      ((e.clearbit._writeKey = "pk_b697788b61c4967c8c8843230b063b1e"),
      (e.clearbit._apiHost = "x.clearbitjs.com"),
      !c.initialize)
    )
      if (c.invoked)
        e.console &&
          console.error &&
          console.error("Clearbit tracking snippet included twice.");
      else {
        (c.invoked = !0),
          (c.methods = [
            "trackSubmit",
            "trackClick",
            "trackLink",
            "trackForm",
            "pageview",
            "identify",
            "reset",
            "group",
            "track",
            "ready",
            "alias",
            "page",
            "once",
            "off",
            "on",
          ]),
          (c.factory = function (e) {
            return function () {
              var t = Array.prototype.slice.call(arguments);
              return t.unshift(e), c.push(t), c;
            };
          });
        for (var i = 0; i < c.methods.length; i++) {
          var a = c.methods[i];
          c[a] = c.factory(a);
        }
        var n = document.createElement("script");
        n.src =
          "https://x.clearbitjs.com/v2/pk_b697788b61c4967c8c8843230b063b1e/tracking.min.js";
        r = document.getElementsByTagName("script")[0];
        (n.async = !0), r.parentNode.insertBefore(n, r);
      }
    c.page();
  }
})(window);
