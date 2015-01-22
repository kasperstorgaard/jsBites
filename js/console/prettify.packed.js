﻿// Copyright (C) 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// RS modified to support any element being passed in (and compressed)

(function () {
	function s(b, d) { if (undefined === d) throw new Error("BAD"); if ("number" != typeof b) throw new Error("BAD"); this.end = b; this.style = d } function p(b, d) { if (undefined === d) throw new Error("BAD"); this.token = b; this.style = d } function v() { this.next = 0; this.ch = "\u0000" } function w(b) { return b >= "a" && b <= "z" || b >= "A" && b <= "Z" } function z(b) { return w(b) || b == "_" || b == "$" || b == "@" } function Q(b) { return z(b) || x(b) } function t(b) { return "\t \r\n".indexOf(b) >= 0 } function x(b) { return b >= "0" && b <= "9" } function I(b) {
		for (var d = 0,
		a = b.length - 1; d <= a && t(b.charAt(d)) ;)++d; for (; a > d && t(b.charAt(a)) ;)--a; return b.substring(d, a + 1)
	} function y(b, d) { return b.length >= d.length && d == b.substring(0, d.length) } function R(b, d) { return b.length >= d.length && d == b.substring(b.length - d.length, b.length) } function A(b, d, a) { if (d < a.length) return false; d = 0; for (var c = a.length; d < c; ++d) if (a.charAt(d) != b[d]) return false; return true } function S(b) { return b.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\xa0/, "&nbsp;") }
	function J(b) { return b.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\xa0/g, "&nbsp;") } function K(b) { return "XMP" == b.tagName } function T(b) { if (null == E) { var d = document.createElement("PRE"); d.appendChild(document.createTextNode('<!DOCTYPE foo PUBLIC "foo bar">\n<foo />')); E = !/</.test(d.innerHTML) } if (E) { d = b.innerHTML; if (K(b)) d = J(d); return d } d = []; for (b = b.firstChild; b; b = b.nextSibling) F(b, d); return d.join("") } function F(b, d) {
		switch (b.nodeType) {
			case 1: var a = b.tagName.toLowerCase();
				d.push("<", a); for (var c = 0; c < b.attributes.length; ++c) { var i = b.attributes[c]; if (i.specified) { d.push(" "); F(i, d) } } d.push(">"); for (c = b.firstChild; c; c = c.nextSibling) F(c, d); if (b.firstChild || !/^(?:br|link|img)$/.test(a)) d.push("</", a, ">"); break; case 2: d.push(b.name.toLowerCase(), '="', S(b.value), '"'); break; case 3: case 4: d.push(J(b.nodeValue)); break
		}
	} function U(b, d) {
		for (var a = 0, c = new v, i = [], h = 0; h < b.length; ++h) {
			var j = b[h]; if (j.style == null) i.push(j); else {
				for (var e = j.token, f = 0, g = [], k = 0, m = e.length; k < m; k = c.next) {
					c.decode(e,
					k); switch (c.ch) { case "\t": g.push(e.substring(f, k)); f = d - a % d; for (a += f; f >= 0; f -= 16) g.push("                ".substring(0, f)); f = c.next; break; case "\n": case "\r": a = 0; break; default: ++a }
				} g.push(e.substring(f)); i.push(new p(g.join(""), j.style))
			}
		} return i
	} function V(b) { b = b.match(/(?:[^<]+|<\/?[a-zA-Z][^>]*>|<)/g); var d = []; if (b) for (var a = null, c = 0, i = b.length; c < i; ++c) { var h = b[c]; if (h.length < 2 || h.charAt(0) !== "<") { if (a && a.style === n) { a.token += h; continue } a = n } else a = null; a = new p(h, a); d.push(a) } return d } function L(b,
	d) { for (var a = [], c = 0, i = 0, h = 0, j = new p("", null), e = 0, f = d.length; e < f; ++e) { var g = d[e], k = g.end; if (k !== 0) { for (var m = k - i, q = j.token.length - h; q <= m;) { if (q > 0) a.push(new p(j.token.substring(h, j.token.length), null == j.style ? null : g.style)); i += q; h = 0; if (c < b.length) j = b[c++]; m = k - i; q = j.token.length - h } if (m) { a.push(new p(j.token.substring(h, h + m), g.style)); i += m; h += m } } } return a } function W(b) {
		for (var d = [], a = 0, c = 0, i = -1, h = new Array(12), j = 0, e = null, f = new v, g = 0, k = b.length; g < k; ++g) {
			var m = b[g]; if (n == m.style) for (var q = m.token, l = 0,
			X = q.length; l < X;) {
				f.decode(q, l); var o = f.ch, M = f.next, u = null; switch (a) {
					case 0: if ("<" == o) a = 1; break; case 1: j = 0; if ("/" == o) a = 7; else if (null == e) if ("!" == o) a = 2; else if (w(o)) a = 8; else if ("?" == o) a = 9; else if ("%" == o) a = 11; else { if ("<" != o) a = 0 } else if ("<" != o) a = 0; break; case 2: a = "-" == o ? 4 : w(o) ? 3 : "<" == o ? 1 : 0; break; case 3: if (">" == o) { a = 0; u = Y } break; case 4: if ("-" == o) a = 5; break; case 5: if ("-" == o) a = 6; break; case 6: if (">" == o) { a = 0; u = B } else a = "-" == o ? 6 : 4; break; case 7: a = w(o) ? 8 : "<" == o ? 1 : 0; break; case 8: if (">" == o) { a = 0; u = r } break; case 9: if ("?" ==
					o) a = 10; break; case 10: if (">" == o) { a = 0; u = C } else if ("?" != o) a = 9; break; case 11: if ("%" == o) a = 12; break; case 12: if (">" == o) { a = 0; u = C } else if ("%" != o) a = 11; break
				} if (j < h.length) h[j++] = o.toLowerCase(); if (1 == a) i = c + l; l = M; if (u != null) { if (null != u) { if (e) { if (A(h, j, e)) e = null } else if (A(h, j, "script")) e = "/script"; else if (A(h, j, "style")) e = "/style"; else if (A(h, j, "xmp")) e = "/xmp"; if (e && j && "/" == h[0]) u = null } if (null != u) { d.push(new s(i, n)); d.push(new s(c + M, u)) } }
			} c += m.token.length
		} d.push(new s(c, n)); return d
	} function Z(b) {
		for (var d =
		[], a = 0, c = -1, i = 0, h = 0, j = b.length; h < j; ++h) {
			var e = b[h], f = e.token; if (n == e.style) {
				e = new v; for (var g = -1, k, m = 0, q = f.length; m < q; g = m, m = k) {
					e.decode(f, m); var l = e.ch; k = e.next; if (0 == a) if (l == '"' || l == "'" || l == "`") { d.push(new s(i + m, n)); a = 1; c = l } else if (l == "/") a = 3; else { if (l == "#") { d.push(new s(i + m, n)); a = 4 } } else if (1 == a) if (l == c) { a = 0; d.push(new s(i + k, N)) } else { if (l == "\\") a = 2 } else if (2 == a) a = 1; else if (3 == a) if (l == "/") { a = 4; d.push(new s(i + g, n)) } else if (l == "*") { a = 5; d.push(new s(i + g, n)) } else { a = 0; k = m } else if (4 == a) {
						if (l == "\r" || l ==
						"\n") { a = 0; d.push(new s(i + m, B)) }
					} else if (5 == a) { if (l == "*") a = 6 } else if (6 == a) if (l == "/") { a = 0; d.push(new s(i + k, B)) } else if (l != "*") a = 5
				}
			} i += f.length
		} switch (a) { case 1: case 2: a = N; break; case 4: case 5: case 6: a = B; break; default: a = n; break } d.push(new s(i, a)); return L(b, d)
	} function $(b, d) {
		for (var a = 0, c = 0, i = new v, h, j = 0; j <= b.length; j = h) {
			if (j == b.length) { f = -2; h = j + 1 } else {
				i.decode(b, j); h = i.next; var e = i.ch, f = c; switch (c) {
					case 0: if (z(e)) f = 1; else if (x(e)) f = 2; else t(e) || (f = 3); if (f && a < j) {
						e = b.substring(a, j); d.push(new p(e, n));
						a = j
					} break; case 1: Q(e) || (f = -1); break; case 2: x(e) || w(e) || e == "_" || (f = -1); break; case 3: if (z(e) || x(e) || t(e)) f = -1; break
				}
			} if (f != c) {
				if (f < 0) { if (j > a) { e = b.substring(a, j); a = new v; a.decode(e, 0); var g = a.ch; c = a.next == e.length; if (z(g)) if (O[e]) c = aa; else if (g === "@") c = P; else { var k = false; if (g >= "A" && g <= "Z") { for (g = a.next; g < e.length; g = a.next) { a.decode(e, g); g = a.ch; if (g >= "a" && g <= "z") { k = true; break } } if (!k && !c && e.substring(e.length - 2) == "_t") k = true } c = k ? ba : n } else c = x(g) ? P : t(g) ? n : ca; a = j; d.push(new p(e, c)) } c = 0; if (f == -1) { h = j; continue } } c =
				f
			}
		}
	} function da(b) { if (!(b && b.length)) return b; var d = W(b); return L(b, d) } function ea(b) {
		for (var d = [], a = 0, c = r, i = null, h = new v, j = 0; j < b.length; ++j) {
			var e = b[j]; if (r == e.style) {
				e = e.token; for (var f = 0, g = 0; g < e.length;) {
					h.decode(e, g); var k = h.ch, m = h.next, q = null, l = null; if (k == ">") { if (r != c) { q = g; l = r } } else switch (a) {
						case 0: if ("<" == k) a = 1; break; case 1: if (t(k)) a = 2; break; case 2: if (!t(k)) { l = G; q = g; a = 3 } break; case 3: if ("=" == k) { q = g; l = r; a = 5 } else if (t(k)) { q = g; l = r; a = 4 } break; case 4: if ("=" == k) a = 5; else if (!t(k)) { q = g; l = G; a = 3 } break;
						case 5: if ('"' == k || "'" == k) { q = g; l = D; a = 6; i = k } else if (!t(k)) { q = g; l = D; a = 7 } break; case 6: if (k == i) { q = m; l = r; a = 2 } break; case 7: if (t(k)) { q = g; l = r; a = 2 } break
					} if (q) { if (q > f) { d.push(new p(e.substring(f, q), c)); f = q } c = l } g = m
				} e.length > f && d.push(new p(e.substring(f, e.length), c))
			} else { if (e.style) { a = 0; c = r } d.push(e) }
		} return d
	} function fa(b) {
		for (var d = [], a = null, c = new v, i = null, h = 0, j = b.length; ; ++h) {
			var e; if (h < j) { e = b[h]; if (null == e.style) { b.push(e); continue } } else if (a) e = new p("", null); else break; var f = e.token; if (null == a) if (C == e.style) {
				if ("<" ==
				c.decode(f, 0)) { c.decode(f, c.next); if ("%" == c.ch || "?" == c.ch) { a = c.ch; d.push(new p(f.substring(0, c.next), r)); f = f.substring(c.next, f.length) } }
			} else if (r == e.style) if ("<" == c.decode(f, 0) && "/" != f.charAt(c.next)) { var g = f.substring(c.next).toLowerCase(); if (y(g, "script") || y(g, "style") || y(g, "xmp")) a = "/" } if (null != a) {
				g = null; if (C == e.style) { if (a == "%" || a == "?") { e = f.lastIndexOf(a); if (e >= 0 && ">" == c.decode(f, e + 1) && f.length == c.next) { g = new p(f.substring(e, f.length), r); f = f.substring(0, e) } } if (null == i) i = []; i.push(new p(f, n)) } else if (n ==
				e.style) { if (null == i) i = []; i.push(e) } else if (r == e.style) if ("<" == c.decode(e.token, 0) && e.token.length > c.next && "/" == c.decode(e.token, c.next)) g = e; else d.push(e); else if (h >= j) g = e; else i ? i.push(e) : d.push(e); if (g) { if (i) { a = H(i); d.push(new p("<span class=embsrc>", null)); i = 0; for (f = a.length; i < f; ++i) d.push(a[i]); d.push(new p("</span>", null)); i = null } g.token && d.push(g); a = null }
			} else d.push(e)
		} return d
	} function ga(b) {
		for (var d = null, a = null, c = 0; c < b.length; ++c) if (n == b[c].style) { d = c; break } for (c = b.length; --c >= 0;) if (n ==
		b[c].style) { a = c; break } if (null == d) return b; c = new v; var i = b[d].token, h = c.decode(i, 0); if ('"' != h && "'" != h) return b; var j = c.next, e = b[a].token, f = e.lastIndexOf("&"); if (f < 0) f = e.length - 1; var g = c.decode(e, f); if (g != h || c.next != e.length) { g = null; f = e.length } h = []; for (c = 0; c < d; ++c) h.push(b[c]); h.push(new p(i.substring(0, j), D)); if (a == d) h.push(new p(i.substring(j, f), n)); else { h.push(new p(i.substring(j, i.length), n)); for (c = d + 1; c < a; ++c) h.push(b[c]); g ? b.push(new p(e.substring(0, f), n)) : b.push(b[a]) } g && h.push(new p(e.substring(f,
		e.length), n)); for (c = a + 1; c < b.length; ++c) h.push(b[c]); return h
	} function ha(b) {
		for (var d = [], a = null, c = false, i = "", h = 0, j = b.length; h < j; ++h) {
			var e = b[h], f = d; if (r == e.style) if (c) { c = false; i = ""; if (a) { d.push(new p("<span class=embsrc>", null)); a = H(ga(a)); for (var g = 0, k = a.length; g < k; ++g) d.push(a[g]); d.push(new p("</span>", null)); a = null } } else if (i && e.token.indexOf("=") >= 0) { g = i.toLowerCase(); if (y(g, "on") || "style" == g) c = true } else i = ""; else if (G == e.style) i += e.token; else if (D == e.style) {
				if (c) {
					if (null == a) a = []; f = a; e = new p(e.token,
					n)
				}
			} else if (a) f = a; f.push(e)
		} return d
	} function H(b) { b = Z(b); for (var d = [], a = 0; a < b.length; ++a) { var c = b[a]; n === c.style ? $(c.token, d) : d.push(c) } return d } function ia(b) { b = da(b); b = ea(b); b = fa(b); return b = ha(b) } function ja(b) { b = U(V(b), ka); for (var d = false, a = 0; a < b.length; ++a) if (n == b[a].style) { if (y(I(b[a].token), "&lt;")) for (a = b.length; --a >= 0;) if (n == b[a].style) { d = R(I(b[a].token), "&gt;"); break } break } return d ? ia(b) : H(b) } function la(b) {
		try {
			for (var d = ja(b), a = [], c = null, i = 0; i < d.length; i++) {
				var h = d[i]; if (h.style != c) {
					c !=
					null && a.push("</span>"); h.style != null && a.push("<span class=", h.style, ">"); c = h.style
				} var j = h.token; if (null != h.style) j = j.replace(/(\r\n?|\n| ) /g, "$1&nbsp;").replace(/\r\n?|\n/g, "<br>"); a.push(j)
			} c != null && a.push("</span>"); return a.join("")
		} catch (e) { if ("console" in window) { console.log(e); console.trace() } return b }
	} function ma(b) {
		function d() {
			for (var j = (new Date).getTime() + 250; h < b.length && (new Date).getTime() < j; h++) {
				for (var e = b[h], f = false, g = e.parentNode; g != null; g = g.parentNode) if ((g.tagName == "pre" || g.tagName ==
				"code" || g.tagName == "xmp") && g.className && g.className.indexOf("prettyprint") >= 0 || 1) { f = true; break } if (!f) { f = T(e); f = f.replace(/(?:\r\n?|\n)$/, ""); f = la(f); if (K(e)) { g = document.createElement("PRE"); for (var k = 0; k < e.attributes.length; ++k) { var m = e.attributes[k]; m.specified && g.setAttribute(m.name, m.value) } g.innerHTML = f; e.parentNode.replaceChild(g, e) } else e.innerHTML = f }
			} h < b.length && setTimeout(d, 250)
		} var a = []; b = b || []; if (b.length == 0) {
			a = [document.getElementsByTagName("pre"), document.getElementsByTagName("code"),
			document.getElementsByTagName("xmp")]; for (var c = 0; c < a.length; ++c) for (var i = 0; i < a[c].length; ++i) b.push(a[c][i]); a = null
		} var h = 0; d()
	} var O = {}; (function () {
		for (var b = ["abstract bool break case catch char class const const_cast continue default delete deprecated dllexport dllimport do double dynamic_cast else enum explicit extern false float for friend goto if inline int long mutable naked namespace new noinline noreturn nothrow novtable operator private property protected public register reinterpret_cast return selectany short signed sizeof static static_cast struct switch template this thread throw true try typedef typeid typename union unsigned using declaration, directive uuid virtual void volatile while typeof",
		"as base by byte checked decimal delegate descending event finally fixed foreach from group implicit in interface internal into is lock null object out override orderby params readonly ref sbyte sealed stackalloc string select uint ulong unchecked unsafe ushort var", "package synchronized boolean implements import throws instanceof transient extends final strictfp native super", "debugger export function with NaN Infinity", "require sub unless until use elsif BEGIN END", "and assert def del elif except exec global lambda not or pass print raise yield False True None",
		"then end begin rescue ensure module when undef next redo retry alias defined", "done fi"], d = 0; d < b.length; d++) for (var a = b[d].split(" "), c = 0; c < a.length; c++) if (a[c]) O[a[c]] = true
	}).call(this); var N = "str", aa = "kwd", B = "com", ba = "typ", P = "lit", ca = "pun", n = "pln", r = "tag", Y = "dec", C = "src", G = "atn", D = "atv", ka = 2; s.prototype.toString = function () { return "[PR_TokenEnd " + this.end + (this.style ? ":" + this.style : "") + "]" }; p.prototype.toString = function () { return "[PR_Token " + this.token + (this.style ? ":" + this.style : "") + "]" }; var na = {
		lt: "<",
		gt: ">", quot: '"', apos: "'", amp: "&"
	}; v.prototype.decode = function (b, d) { var a = d + 1, c = b.charAt(d); if ("&" === c) { var i = b.indexOf(";", a); if (i >= 0 && i < a + 4) { a = b.substring(a, i); c = null; if (a.charAt(0) === "#") { var h = a.charAt(1); h = h === "x" || h === "X" ? parseInt(a.substring(2), 16) : parseInt(a.substring(1), 10); isNaN(h) || (c = String.fromCharCode(h)) } c || (c = na[a.toLowerCase()]); if (c) { c = c; a = i + 1 } else { a = d + 1; c = "\u0000" } } } this.next = a; return this.ch = c }; var E = null; window.prettyPrint = ma
})();