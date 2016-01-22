/* Modernizr 2.5.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-touch-addtest-teststyles-prefixes
 */
;
window.Modernizr = function (a, b, c) {
  function v(a) {
    i.cssText = a
  }

  function w(a, b) {
    return v(l.join(a + ";") + (b || ""))
  }

  function x(a, b) {
    return typeof a === b
  }

  function y(a, b) {
    return !!~("" + a).indexOf(b)
  }

  function z(a, b, d) {
    for (var e in a) {
      var f = b[a[e]];
      if (f !== c)return d === !1 ? a[e] : x(f, "function") ? f.bind(d || b) : f
    }
    return !1
  }

  var d = "2.5.3", e = {}, f = b.documentElement, g = "modernizr", h = b.createElement(g), i = h.style, j, k = {}.toString, l = " -webkit- -moz- -o- -ms- ".split(" "), m = {}, n = {}, o = {}, p = [], q = p.slice, r, s = function (a, c, d, e) {
    var h, i, j, k = b.createElement("div"), l = b.body, m = l ? l : b.createElement("body");
    if (parseInt(d, 10))while (d--)j = b.createElement("div"), j.id = e ? e[d] : g + (d + 1), k.appendChild(j);
    return h = ["&#173;", "<style>", a, "</style>"].join(""), k.id = g, (l ? k : m).innerHTML += h, m.appendChild(k), l || (m.style.background = "", f.appendChild(m)), i = c(k, a), l ? k.parentNode.removeChild(k) : m.parentNode.removeChild(m), !!i
  }, t = {}.hasOwnProperty, u;
  !x(t, "undefined") && !x(t.call, "undefined") ? u = function (a, b) {
    return t.call(a, b)
  } : u = function (a, b) {
    return b in a && x(a.constructor.prototype[b], "undefined")
  }, Function.prototype.bind || (Function.prototype.bind = function (b) {
    var c = this;
    if (typeof c != "function")throw new TypeError;
    var d = q.call(arguments, 1), e = function () {
      if (this instanceof e) {
        var a = function () {
        };
        a.prototype = c.prototype;
        var f = new a, g = c.apply(f, d.concat(q.call(arguments)));
        return Object(g) === g ? g : f
      }
      return c.apply(b, d.concat(q.call(arguments)))
    };
    return e
  });
  var A = function (c, d) {
    var f = c.join(""), g = d.length;
    s(f, function (c, d) {
      var f = b.styleSheets[b.styleSheets.length - 1], h = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "", i = c.childNodes, j = {};
      while (g--)j[i[g].id] = i[g];
      e.touch = "ontouchstart"in a || a.DocumentTouch && b instanceof DocumentTouch || (j.touch && j.touch.offsetTop) === 9
    }, g, d)
  }([, ["@media (", l.join("touch-enabled),("), g, ")", "{#touch{top:9px;position:absolute}}"].join("")], [, "touch"]);
  m.touch = function () {
    return e.touch
  };
  for (var B in m)u(m, B) && (r = B.toLowerCase(), e[r] = m[B](), p.push((e[r] ? "" : "no-") + r));
  return e.addTest = function (a, b) {
    if (typeof a == "object")for (var d in a)u(a, d) && e.addTest(d, a[d]); else {
      a = a.toLowerCase();
      if (e[a] !== c)return e;
      b = typeof b == "function" ? b() : b, e[a] = b
    }
    return e
  }, v(""), h = j = null, e._version = d, e._prefixes = l, e.testStyles = s, e
}(this, this.document);