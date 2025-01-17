/*!
 * ScrollTrigger 3.8.0
 * https://greensock.com
 *
 * @license Copyright 2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? t(exports)
      : "function" == typeof define && define.amd
      ? define(["exports"], t)
      : t(((e = e || self).window = e.window || {}));
  })(this, function (e) {
    "use strict";
    function t(e) {
      return e;
    }
    function r(e) {
      return G(e)[0] || (we(e) ? console.warn("Element not found:", e) : null);
    }
    function n(e) {
      return Math.round(1e5 * e) / 1e5 || 0;
    }
    function i() {
      return "undefined" != typeof window;
    }
    function o() {
      return W || (i() && (W = window.gsap) && W.registerPlugin && W);
    }
    function s(e) {
      return !!~X.indexOf(e);
    }
    function a(e, t) {
      return ~ge.indexOf(e) && ge[ge.indexOf(e) + 1][t];
    }
    function l(e, t) {
      var r = t.s,
        n = t.sc,
        i = ve.indexOf(e),
        o = n === We.sc ? 1 : 2;
      return (
        ~i || (i = ve.push(e) - 1),
        ve[i + o] ||
          (ve[i + o] =
            a(e, r) ||
            (s(e)
              ? n
              : function (t) {
                  return arguments.length ? (e[r] = t) : e[r];
                }))
      );
    }
    function c(e) {
      return (
        a(e, "getBoundingClientRect") ||
        (s(e)
          ? function () {
              return (ct.width = q.innerWidth), (ct.height = q.innerHeight), ct;
            }
          : function () {
              return He(e);
            })
      );
    }
    function u(e, t) {
      var r = t.s,
        n = t.d2,
        i = t.d,
        o = t.a;
      return (r = "scroll" + n) && (o = a(e, r))
        ? o() - c(e)()[i]
        : s(e)
        ? (U[r] || j[r]) - (q["inner" + n] || j["client" + n] || U["client" + n])
        : e[r] - e["offset" + n];
    }
    function f(e, t) {
      for (var r = 0; r < se.length; r += 3)
        (t && !~t.indexOf(se[r + 1])) || e(se[r], se[r + 1], se[r + 2]);
    }
    function d(e) {
      return "function" == typeof e;
    }
    function p(e) {
      return "number" == typeof e;
    }
    function h(e) {
      return "object" == typeof e;
    }
    function g(e) {
      return d(e) && e();
    }
    function v(e, t) {
      return function () {
        var r = g(e),
          n = g(t);
        return function () {
          g(r), g(n);
        };
      };
    }
    function m(e, t, r) {
      return e && e.progress(t ? 0 : 1) && r && e.pause();
    }
    function y(e, t) {
      var r = t(e);
      r && r.totalTime && (e.callbackAnimation = r);
    }
    function x(e) {
      return q.getComputedStyle(e);
    }
    function b(e, t) {
      for (var r in t) r in e || (e[r] = t[r]);
      return e;
    }
    function w(e, t) {
      var r = t.d2;
      return e["offset" + r] || e["client" + r] || 0;
    }
    function k(e) {
      var t,
        r = [],
        n = e.labels,
        i = e.duration();
      for (t in n) r.push(n[t] / i);
      return r;
    }
    function S(e) {
      var t = W.utils.snap(e),
        r =
          Array.isArray(e) &&
          e.slice(0).sort(function (e, t) {
            return e - t;
          });
      return r
        ? function (e, n) {
            var i;
            if (!n) return t(e);
            if (0 < n) {
              for (e -= 1e-4, i = 0; i < r.length; i++)
                if (r[i] >= e) return r[i];
              return r[i - 1];
            }
            for (i = r.length, e += 1e-4; i--; ) if (r[i] <= e) return r[i];
            return r[0];
          }
        : function (r, n) {
            var i = t(r);
            return !n || Math.abs(i - r) < 0.001 || i - r < 0 == n < 0
              ? i
              : t(n < 0 ? r - e : r + e);
          };
    }
    function C(e, t, r, n) {
      return r.split(",").forEach(function (r) {
        return e(t, r, n);
      });
    }
    function O(e, t, r) {
      return e.addEventListener(t, r, { passive: !0 });
    }
    function T(e, t, r) {
      return e.removeEventListener(t, r);
    }
    function E(e, t) {
      if (we(e)) {
        var r = e.indexOf("="),
          n = ~r ? (e.charAt(r - 1) + 1) * parseFloat(e.substr(r + 1)) : 0;
        ~r && (e.indexOf("%") > r && (n *= t / 100), (e = e.substr(0, r - 1))),
          (e =
            n +
            (e in je
              ? je[e] * t
              : ~e.indexOf("%")
              ? (parseFloat(e) * t) / 100
              : parseFloat(e) || 0));
      }
      return e;
    }
    function M(e, t, r, n, i, o, l, c) {
      var u = i.startColor,
        f = i.endColor,
        d = i.fontSize,
        p = i.indent,
        h = i.fontWeight,
        g = V.createElement("div"),
        v = s(r) || "fixed" === a(r, "pinType"),
        m = -1 !== e.indexOf("scroller"),
        y = v ? U : r,
        x = -1 !== e.indexOf("start"),
        b = x ? u : f,
        w =
          "border-color:" +
          b +
          ";font-size:" +
          d +
          ";color:" +
          b +
          ";font-weight:" +
          h +
          ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return (
        (w += "position:" + ((m || c) && v ? "fixed;" : "absolute;")),
        (!m && !c && v) ||
          (w += (n === We ? Te : Ee) + ":" + (o + parseFloat(p)) + "px;"),
        l &&
          (w +=
            "box-sizing:border-box;text-align:left;width:" +
            l.offsetWidth +
            "px;"),
        (g._isStart = x),
        g.setAttribute("class", "gsap-marker-" + e + (t ? " marker-" + t : "")),
        (g.style.cssText = w),
        (g.innerText = t || 0 === t ? e + "-" + t : e),
        y.children[0] ? y.insertBefore(g, y.children[0]) : y.appendChild(g),
        (g._offset = g["offset" + n.op.d2]),
        Ue(g, 0, n, x),
        g
      );
    }
    function P() {
      return 20 < me() - xe && it();
    }
    function _() {
      var e = me();
      xe !== e ? (it(), xe || Je("scrollStart"), (xe = e)) : ($ = $ || Z(it));
    }
    function A() {
      return !ee && !ce && !V.fullscreenElement && Y.restart(!0);
    }
    function R(e) {
      var t,
        r = W.ticker.frame,
        n = [],
        i = 0;
      if (de !== r || he) {
        for (et(); i < Ge.length; i += 4)
          (t = q.matchMedia(Ge[i]).matches) !== Ge[i + 3] &&
            ((Ge[i + 3] = t)
              ? n.push(i)
              : et(1, Ge[i]) || (d(Ge[i + 2]) && Ge[i + 2]()));
        for (Qe(), i = 0; i < n.length; i++)
          (t = n[i]), (fe = Ge[t]), (Ge[t + 2] = Ge[t + 1](e));
        (fe = 0), H && tt(0, 1), (de = r), Je("matchMedia");
      }
    }
    function B() {
      return T(ft, "scrollEnd", B) || tt(!0);
    }
    function I() {
      return ve.forEach(function (e) {
        return "function" == typeof e && (e.rec = 0);
      });
    }
    function z(e, t, r, n) {
      if (e.parentNode !== t) {
        for (var i, o = ot.length, s = t.style, a = e.style; o--; )
          s[(i = ot[o])] = r[i];
        (s.position = "absolute" === r.position ? "absolute" : "relative"),
          "inline" === r.display && (s.display = "inline-block"),
          (a[Ee] = a[Te] = "auto"),
          (s.overflow = "visible"),
          (s.boxSizing = "border-box"),
          (s[Me] = w(e, De) + Fe),
          (s[Pe] = w(e, We) + Fe),
          (s[Ie] = a[ze] = a.top = a[Oe] = "0"),
          lt(n),
          (a[Me] = a.maxWidth = r[Me]),
          (a[Pe] = a.maxHeight = r[Pe]),
          (a[Ie] = r[Ie]),
          e.parentNode.insertBefore(t, e),
          t.appendChild(e);
      }
    }
    function L(e) {
      for (var t = st.length, r = e.style, n = [], i = 0; i < t; i++)
        n.push(st[i], r[st[i]]);
      return (n.t = e), n;
    }
    function N(e, t, n, i, o, s, a, l, c, u, f, h, g) {
      d(e) && (e = e(l)),
        we(e) &&
          "max" === e.substr(0, 3) &&
          (e = h + ("=" === e.charAt(4) ? E("0" + e.substr(3), n) : 0));
      var v,
        m,
        y,
        b = g ? g.time() : 0;
      if ((g && g.seek(0), p(e))) a && Ue(a, n, i, !0);
      else {
        d(t) && (t = t(l));
        var w,
          k,
          S,
          C,
          O = e.split(" ");
        (y = r(t) || U),
          ((w = He(y) || {}) && (w.left || w.top)) ||
            "none" !== x(y).display ||
            ((C = y.style.display),
            (y.style.display = "block"),
            (w = He(y)),
            C ? (y.style.display = C) : y.style.removeProperty("display")),
          (k = E(O[0], w[i.d])),
          (S = E(O[1] || "0", n)),
          (e = w[i.p] - c[i.p] - u + k + o - S),
          a && Ue(a, S, i, n - S < 20 || (a._isStart && 20 < S)),
          (n -= n - S);
      }
      if (s) {
        var T = e + n,
          M = s._isStart;
        (v = "scroll" + i.d2),
          Ue(
            s,
            T,
            i,
            (M && 20 < T) ||
              (!M && (f ? Math.max(U[v], j[v]) : s.parentNode[v]) <= T + 1)
          ),
          f &&
            ((c = He(a)),
            f && (s.style[i.op.p] = c[i.op.p] - i.op.m - s._offset + Fe));
      }
      return (
        g &&
          y &&
          ((v = He(y)),
          g.seek(h),
          (m = He(y)),
          (g._caScrollDist = v[i.p] - m[i.p]),
          (e = (e / g._caScrollDist) * h)),
        g && g.seek(b),
        g ? e : Math.round(e)
      );
    }
    function F(e, t, r, n) {
      if (e.parentNode !== t) {
        var i,
          o,
          s = e.style;
        if (t === U) {
          for (i in ((e._stOrig = s.cssText), (o = x(e))))
            +i ||
              ut.test(i) ||
              !o[i] ||
              "string" != typeof s[i] ||
              "0" === i ||
              (s[i] = o[i]);
          (s.top = r), (s.left = n);
        } else s.cssText = e._stOrig;
        (W.core.getCache(e).uncache = 1), t.appendChild(e);
      }
    }
    function D(e, t) {
      function r(t, l, c, u, f) {
        var d = r.tween,
          p = l.onComplete;
        return (
          d && d.kill(),
          (i = Math.round(c)),
          (l[a] = t),
          ((l.modifiers = {})[a] = function (e) {
            return (
              (e = n(s())) !== i && e !== o && 2 < Math.abs(e - i)
                ? (d.kill(), (r.tween = 0))
                : (e = c + u * d.ratio + f * d.ratio * d.ratio),
              (o = i),
              (i = n(e))
            );
          }),
          (l.onComplete = function () {
            (r.tween = 0), p && p.call(d);
          }),
          (d = r.tween = W.to(e, l))
        );
      }
      var i,
        o,
        s = l(e, t),
        a = "_scroll" + t.p2;
      return (
        (e[a] = s),
        e.addEventListener(
          "wheel",
          function () {
            return r.tween && r.tween.kill() && (r.tween = 0);
          },
          { passive: !0 }
        ),
        r
      );
    }
    var W,
      H,
      q,
      V,
      j,
      U,
      X,
      Y,
      Z,
      $,
      G,
      J,
      K,
      Q,
      ee,
      te,
      re,
      ne,
      ie,
      oe,
      se,
      ae,
      le,
      ce,
      ue,
      fe,
      de,
      pe,
      he = 1,
      ge = [],
      ve = [],
      me = Date.now,
      ye = me(),
      xe = 0,
      be = 1,
      we = function (e) {
        return "string" == typeof e;
      },
      ke = Math.abs,
      Se = "scrollLeft",
      Ce = "scrollTop",
      Oe = "left",
      Te = "right",
      Ee = "bottom",
      Me = "width",
      Pe = "height",
      _e = "Right",
      Ae = "Left",
      Re = "Top",
      Be = "Bottom",
      Ie = "padding",
      ze = "margin",
      Le = "Width",
      Ne = "Height",
      Fe = "px",
      De = {
        s: Se,
        p: Oe,
        p2: Ae,
        os: Te,
        os2: _e,
        d: Me,
        d2: Le,
        a: "x",
        sc: function (e) {
          return arguments.length
            ? q.scrollTo(e, We.sc())
            : q.pageXOffset || V[Se] || j[Se] || U[Se] || 0;
        },
      },
      We = {
        s: Ce,
        p: "top",
        p2: Re,
        os: Ee,
        os2: Be,
        d: Pe,
        d2: Ne,
        a: "y",
        op: De,
        sc: function (e) {
          return arguments.length
            ? q.scrollTo(De.sc(), e)
            : q.pageYOffset || V[Ce] || j[Ce] || U[Ce] || 0;
        },
      },
      He = function (e, t) {
        var r =
            t &&
            "matrix(1, 0, 0, 1, 0, 0)" !== x(e)[re] &&
            W.to(e, {
              x: 0,
              y: 0,
              xPercent: 0,
              yPercent: 0,
              rotation: 0,
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
            }).progress(1),
          n = e.getBoundingClientRect();
        return r && r.progress(0).kill(), n;
      },
      qe = {
        startColor: "green",
        endColor: "red",
        indent: 0,
        fontSize: "16px",
        fontWeight: "normal",
      },
      Ve = { toggleActions: "play", anticipatePin: 0 },
      je = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
      Ue = function (e, t, r, n) {
        var i = { display: "block" },
          o = r[n ? "os2" : "p2"],
          s = r[n ? "p2" : "os2"];
        (e._isFlipped = n),
          (i[r.a + "Percent"] = n ? -100 : 0),
          (i[r.a] = n ? "1px" : 0),
          (i["border" + o + Le] = 1),
          (i["border" + s + Le] = 0),
          (i[r.p] = t + "px"),
          W.set(e, i);
      },
      Xe = [],
      Ye = {},
      Ze = {},
      $e = [],
      Ge = [],
      Je = function (e) {
        return (
          (Ze[e] &&
            Ze[e].map(function (e) {
              return e();
            })) ||
          $e
        );
      },
      Ke = [],
      Qe = function (e) {
        for (var t = 0; t < Ke.length; t += 5)
          (e && Ke[t + 4] !== e) ||
            ((Ke[t].style.cssText = Ke[t + 1]),
            Ke[t].getBBox && Ke[t].setAttribute("transform", Ke[t + 2] || ""),
            (Ke[t + 3].uncache = 1));
      },
      et = function (e, t) {
        var r;
        for (ne = 0; ne < Xe.length; ne++)
          (r = Xe[ne]), (t && r.media !== t) || (e ? r.kill(1) : r.revert());
        t && Qe(t), t || Je("revert");
      },
      tt = function (e, t) {
        if (!xe || e) {
          pe = !0;
          var r = Je("refreshInit");
          ae && ft.sort(),
            t || et(),
            Xe.forEach(function (e) {
              return e.refresh();
            }),
            r.forEach(function (e) {
              return e && e.render && e.render(-1);
            }),
            I(),
            Y.pause(),
            (pe = !1),
            Je("refresh");
        } else O(ft, "scrollEnd", B);
      },
      rt = 0,
      nt = 1,
      it = function () {
        if (!pe) {
          var e = Xe.length,
            t = me(),
            r = 50 <= t - ye,
            n = e && Xe[0].scroll();
          if (
            ((nt = n < rt ? -1 : 1),
            (rt = n),
            r &&
              (xe && !te && 200 < t - xe && ((xe = 0), Je("scrollEnd")),
              (K = ye),
              (ye = t)),
            nt < 0)
          ) {
            for (ne = e; 0 < ne--; ) Xe[ne] && Xe[ne].update(0, r);
            nt = 1;
          } else for (ne = 0; ne < e; ne++) Xe[ne] && Xe[ne].update(0, r);
          $ = 0;
        }
      },
      ot = [
        Oe,
        "top",
        Ee,
        Te,
        ze + Be,
        ze + _e,
        ze + Re,
        ze + Ae,
        "display",
        "flexShrink",
        "float",
        "zIndex",
        "grid-column-start",
        "grid-column-end",
        "grid-row-start",
        "grid-row-end",
        "grid-area",
        "justify-self",
        "align-self",
        "place-self",
      ],
      st = ot.concat([
        Me,
        Pe,
        "boxSizing",
        "max" + Le,
        "max" + Ne,
        "position",
        ze,
        Ie,
        Ie + Re,
        Ie + _e,
        Ie + Be,
        Ie + Ae,
      ]),
      at = /([A-Z])/g,
      lt = function (e) {
        if (e) {
          var t,
            r,
            n = e.t.style,
            i = e.length,
            o = 0;
          for ((e.t._gsap || W.core.getCache(e.t)).uncache = 1; o < i; o += 2)
            (r = e[o + 1]),
              (t = e[o]),
              r
                ? (n[t] = r)
                : n[t] && n.removeProperty(t.replace(at, "-$1").toLowerCase());
        }
      },
      ct = { left: 0, top: 0 },
      ut = /(?:webkit|moz|length|cssText|inset)/i;
    De.op = We;
    var ft =
      ((dt.prototype.init = function (e, n) {
        if (((this.progress = this.start = 0), this.vars && this.kill(1), be)) {
          var i,
            o,
            f,
            g,
            v,
            C,
            P,
            R,
            I,
            H,
            X,
            Y,
            Z,
            $,
            Q,
            re,
            ie,
            oe,
            se,
            ce,
            de,
            pe,
            ve,
            ye,
            Se,
            Ce,
            Oe,
            Te,
            Ee,
            Ne,
            je,
            Ue,
            Ze,
            $e,
            Ge,
            Je,
            Ke,
            Qe = (e = b(we(e) || p(e) || e.nodeType ? { trigger: e } : e, Ve))
              .onUpdate,
            et = e.toggleClass,
            tt = e.id,
            rt = e.onToggle,
            it = e.onRefresh,
            ot = e.scrub,
            st = e.trigger,
            at = e.pin,
            ut = e.pinSpacing,
            ft = e.invalidateOnRefresh,
            pt = e.anticipatePin,
            ht = e.onScrubComplete,
            gt = e.onSnapComplete,
            vt = e.once,
            mt = e.snap,
            yt = e.pinReparent,
            xt = e.pinSpacer,
            bt = e.containerAnimation,
            wt = e.fastScrollEnd,
            kt = e.preventOverlaps,
            St =
              e.horizontal || (e.containerAnimation && !1 !== e.horizontal)
                ? De
                : We,
            Ct = !ot && 0 !== ot,
            Ot = r(e.scroller || q),
            Tt = W.core.getCache(Ot),
            Et = s(Ot),
            Mt =
              "fixed" ===
              ("pinType" in e ? e.pinType : a(Ot, "pinType") || (Et && "fixed")),
            Pt = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack],
            _t = Ct && e.toggleActions.split(" "),
            At = "markers" in e ? e.markers : Ve.markers,
            Rt = Et ? 0 : parseFloat(x(Ot)["border" + St.p2 + Le]) || 0,
            Bt = this,
            It =
              e.onRefreshInit &&
              function () {
                return e.onRefreshInit(Bt);
              },
            zt = (function (e, t, r) {
              var n = r.d,
                i = r.d2,
                o = r.a;
              return (o = a(e, "getBoundingClientRect"))
                ? function () {
                    return o()[n];
                  }
                : function () {
                    return (t ? q["inner" + i] : e["client" + i]) || 0;
                  };
            })(Ot, Et, St),
            Lt = (function (e, t) {
              return !t || ~ge.indexOf(e)
                ? c(e)
                : function () {
                    return ct;
                  };
            })(Ot, Et),
            Nt = 0,
            Ft = l(Ot, St);
          if (
            ((Bt.media = fe),
            (pt *= 45),
            (Bt.scroller = Ot),
            (Bt.scroll = bt ? bt.time.bind(bt) : Ft),
            (g = Ft()),
            (Bt.vars = e),
            (n = n || e.animation),
            "refreshPriority" in e && (ae = 1),
            (Tt.tweenScroll = Tt.tweenScroll || {
              top: D(Ot, We),
              left: D(Ot, De),
            }),
            (Bt.tweenTo = i = Tt.tweenScroll[St.p]),
            n &&
              ((n.vars.lazy = !1),
              n._initted ||
                (!1 !== n.vars.immediateRender &&
                  !1 !== e.immediateRender &&
                  n.render(0, !0, !0)),
              (Bt.animation = n.pause()),
              (n.scrollTrigger = Bt),
              (je = p(ot) && ot) &&
                (Ne = W.to(n, {
                  ease: "power3",
                  duration: je,
                  onComplete: function () {
                    return ht && ht(Bt);
                  },
                })),
              (Te = 0),
              (tt = tt || n.vars.id)),
            Xe.push(Bt),
            mt &&
              ((h(mt) && !mt.push) || (mt = { snapTo: mt }),
              "scrollBehavior" in U.style &&
                W.set(Et ? [U, j] : Ot, { scrollBehavior: "auto" }),
              (f = d(mt.snapTo)
                ? mt.snapTo
                : "labels" === mt.snapTo
                ? (function (e) {
                    return function (t) {
                      return W.utils.snap(k(e), t);
                    };
                  })(n)
                : "labelsDirectional" === mt.snapTo
                ? (function (e) {
                    return function (t, r) {
                      return S(k(e))(t, r.direction);
                    };
                  })(n)
                : !1 !== mt.directional
                ? function (e, t) {
                    return S(mt.snapTo)(e, t.direction);
                  }
                : W.utils.snap(mt.snapTo)),
              (Ue = h((Ue = mt.duration || { min: 0.1, max: 2 }))
                ? J(Ue.min, Ue.max)
                : J(Ue, Ue)),
              (Ze = W.delayedCall(mt.delay || je / 2 || 0.1, function () {
                if (Math.abs(Bt.getVelocity()) < 10 && !te && Nt !== Ft()) {
                  var e = n && !Ct ? n.totalProgress() : Bt.progress,
                    t = ((e - Ee) / (me() - K)) * 1e3 || 0,
                    r = W.utils.clamp(
                      -Bt.progress,
                      1 - Bt.progress,
                      (ke(t / 2) * t) / 0.185
                    ),
                    o = Bt.progress + (!1 === mt.inertia ? 0 : r),
                    s = J(0, 1, f(o, Bt)),
                    a = Ft(),
                    l = Math.round(C + s * Z),
                    c = mt.onStart,
                    u = mt.onInterrupt,
                    d = mt.onComplete,
                    p = i.tween;
                  if (a <= P && C <= a && l !== a) {
                    if (p && !p._initted && p.data <= ke(l - a)) return;
                    !1 === mt.inertia && (r = s - Bt.progress),
                      i(
                        l,
                        {
                          duration: Ue(
                            ke(
                              (0.185 * Math.max(ke(o - e), ke(s - e))) /
                                t /
                                0.05 || 0
                            )
                          ),
                          ease: mt.ease || "power3",
                          data: ke(l - a),
                          onInterrupt: function () {
                            return Ze.restart(!0) && u && u(Bt);
                          },
                          onComplete: function () {
                            (Nt = Ft()),
                              (Te = Ee =
                                n && !Ct ? n.totalProgress() : Bt.progress),
                              gt && gt(Bt),
                              d && d(Bt);
                          },
                        },
                        a,
                        r * Z,
                        l - a - r * Z
                      ),
                      c && c(Bt, i.tween);
                  }
                } else Bt.isActive && Ze.restart(!0);
              }).pause())),
            tt && (Ye[tt] = Bt),
            (st = Bt.trigger = r(st || at)),
            (at = !0 === at ? st : r(at)),
            we(et) && (et = { targets: st, className: et }),
            at &&
              (!1 === ut ||
                ut === ze ||
                (ut = !(!ut && "flex" === x(at.parentNode).display) && Ie),
              (Bt.pin = at),
              !1 !== e.force3D && W.set(at, { force3D: !0 }),
              (o = W.core.getCache(at)).spacer
                ? ($ = o.pinState)
                : (xt &&
                    ((xt = r(xt)) &&
                      !xt.nodeType &&
                      (xt = xt.current || xt.nativeElement),
                    (o.spacerIsNative = !!xt),
                    xt && (o.spacerState = L(xt))),
                  (o.spacer = ie = xt || V.createElement("div")),
                  ie.classList.add("pin-spacer"),
                  tt && ie.classList.add("pin-spacer-" + tt),
                  (o.pinState = $ = L(at))),
              (Bt.spacer = ie = o.spacer),
              (Oe = x(at)),
              (ve = Oe[ut + St.os2]),
              (se = W.getProperty(at)),
              (ce = W.quickSetter(at, St.a, Fe)),
              z(at, ie, Oe),
              (re = L(at))),
            At &&
              ((Y = h(At) ? b(At, qe) : qe),
              (H = M("scroller-start", tt, Ot, St, Y, 0)),
              (X = M("scroller-end", tt, Ot, St, Y, 0, H)),
              (oe = H["offset" + St.op.d2]),
              (R = M("start", tt, Ot, St, Y, oe, 0, bt)),
              (I = M("end", tt, Ot, St, Y, oe, 0, bt)),
              bt && (Ke = W.quickSetter([R, I], St.a, Fe)),
              Mt ||
                (ge.length && !0 === a(Ot, "fixedMarkers")) ||
                ((function (e) {
                  var t = x(e).position;
                  e.style.position =
                    "absolute" === t || "fixed" === t ? t : "relative";
                })(Et ? U : Ot),
                W.set([H, X], { force3D: !0 }),
                (Se = W.quickSetter(H, St.a, Fe)),
                (Ce = W.quickSetter(X, St.a, Fe)))),
            bt)
          ) {
            var Dt = bt.vars.onUpdate,
              Wt = bt.vars.onUpdateParams;
            bt.eventCallback("onUpdate", function () {
              Bt.update(0, 0, 1), Dt && Dt.apply(Wt || []);
            });
          }
          (Bt.previous = function () {
            return Xe[Xe.indexOf(Bt) - 1];
          }),
            (Bt.next = function () {
              return Xe[Xe.indexOf(Bt) + 1];
            }),
            (Bt.revert = function (e) {
              var t = !1 !== e || !Bt.enabled,
                r = ee;
              t !== Bt.isReverted &&
                (t &&
                  (Bt.scroll.rec || (Bt.scroll.rec = Ft()),
                  (Ge = Math.max(Ft(), Bt.scroll.rec || 0)),
                  ($e = Bt.progress),
                  (Je = n && n.progress())),
                R &&
                  [R, I, H, X].forEach(function (e) {
                    return (e.style.display = t ? "none" : "block");
                  }),
                t && (ee = 1),
                Bt.update(t),
                (ee = r),
                at &&
                  (t
                    ? (function (e, t, r) {
                        lt(r);
                        var n = e._gsap;
                        if (n.spacerIsNative) lt(n.spacerState);
                        else if (e.parentNode === t) {
                          var i = t.parentNode;
                          i && (i.insertBefore(e, t), i.removeChild(t));
                        }
                      })(at, ie, $)
                    : (yt && Bt.isActive) || z(at, ie, x(at), ye)),
                (Bt.isReverted = t));
            }),
            (Bt.refresh = function (t, i) {
              if ((!ee && Bt.enabled) || i)
                if (at && t && xe) O(dt, "scrollEnd", B);
                else {
                  (ee = 1),
                    Ne && Ne.pause(),
                    ft && n && n.progress(0).invalidate(),
                    Bt.isReverted || Bt.revert();
                  for (
                    var o,
                      s,
                      a,
                      c,
                      f,
                      h,
                      m,
                      y,
                      b,
                      k,
                      S = zt(),
                      T = Lt(),
                      M = bt ? bt.duration() : u(Ot, St),
                      _ = 0,
                      A = 0,
                      F = e.end,
                      D = e.endTrigger || st,
                      q =
                        e.start ||
                        (0 !== e.start && st ? (at ? "0 0" : "0 100%") : 0),
                      V = e.pinnedContainer && r(e.pinnedContainer),
                      j = (st && Math.max(0, Xe.indexOf(Bt))) || 0,
                      Y = j;
                    Y--;
  
                  )
                    (h = Xe[Y]).end || h.refresh(0, 1) || (ee = 1),
                      !(m = h.pin) ||
                        (m !== st && m !== at) ||
                        h.isReverted ||
                        ((k = k || []).unshift(h), h.revert());
                  for (
                    d(q) && (q = q(Bt)),
                      C =
                        N(q, st, S, St, Ft(), R, H, Bt, T, Rt, Mt, M, bt) ||
                        (at ? -0.001 : 0),
                      d(F) && (F = F(Bt)),
                      we(F) &&
                        !F.indexOf("+=") &&
                        (~F.indexOf(" ")
                          ? (F = (we(q) ? q.split(" ")[0] : "") + F)
                          : ((_ = E(F.substr(2), S)),
                            (F = we(q) ? q : C + _),
                            (D = st))),
                      P =
                        Math.max(
                          C,
                          N(
                            F || (D ? "100% 0" : M),
                            D,
                            S,
                            St,
                            Ft() + _,
                            I,
                            X,
                            Bt,
                            T,
                            Rt,
                            Mt,
                            M,
                            bt
                          )
                        ) || -0.001,
                      Z = P - C || ((C -= 0.01) && 0.001),
                      _ = 0,
                      Y = j;
                    Y--;
  
                  )
                    (m = (h = Xe[Y]).pin) &&
                      h.start - h._pinPush < C &&
                      !bt &&
                      ((o = h.end - h.start),
                      (m !== st && m !== V) || p(q) || (_ += o),
                      m === at && (A += o));
                  if (
                    ((C += _),
                    (P += _),
                    (Bt._pinPush = A),
                    R &&
                      _ &&
                      (((o = {})[St.a] = "+=" + _),
                      V && (o[St.p] = "-=" + Ft()),
                      W.set([R, I], o)),
                    at)
                  )
                    (o = x(at)),
                      (c = St === We),
                      (a = Ft()),
                      (de = parseFloat(se(St.a)) + A),
                      !M &&
                        1 < P &&
                        ((Et ? U : Ot).style["overflow-" + St.a] = "scroll"),
                      z(at, ie, o),
                      (re = L(at)),
                      (s = He(at, !0)),
                      (y = Mt && l(Ot, c ? De : We)()),
                      ut &&
                        (((ye = [ut + St.os2, Z + A + Fe]).t = ie),
                        (Y = ut === Ie ? w(at, St) + Z + A : 0) &&
                          ye.push(St.d, Y + Fe),
                        lt(ye),
                        Mt && Ft(Ge)),
                      Mt &&
                        (((f = {
                          top: s.top + (c ? a - C : y) + Fe,
                          left: s.left + (c ? y : a - C) + Fe,
                          boxSizing: "border-box",
                          position: "fixed",
                        })[Me] = f.maxWidth =
                          Math.ceil(s.width) + Fe),
                        (f[Pe] = f.maxHeight = Math.ceil(s.height) + Fe),
                        (f[ze] =
                          f[ze + Re] =
                          f[ze + _e] =
                          f[ze + Be] =
                          f[ze + Ae] =
                            "0"),
                        (f[Ie] = o[Ie]),
                        (f[Ie + Re] = o[Ie + Re]),
                        (f[Ie + _e] = o[Ie + _e]),
                        (f[Ie + Be] = o[Ie + Be]),
                        (f[Ie + Ae] = o[Ie + Ae]),
                        (Q = (function (e, t, r) {
                          for (
                            var n, i = [], o = e.length, s = r ? 8 : 0;
                            s < o;
                            s += 2
                          )
                            (n = e[s]), i.push(n, n in t ? t[n] : e[s + 1]);
                          return (i.t = e.t), i;
                        })($, f, yt))),
                      n
                        ? ((b = n._initted),
                          le(1),
                          n.render(n.duration(), !0, !0),
                          (pe = se(St.a) - de + Z + A),
                          Z !== pe && Q.splice(Q.length - 2, 2),
                          n.render(0, !0, !0),
                          b || n.invalidate(),
                          le(0))
                        : (pe = Z);
                  else if (st && Ft() && !bt)
                    for (s = st.parentNode; s && s !== U; )
                      s._pinOffset && ((C -= s._pinOffset), (P -= s._pinOffset)),
                        (s = s.parentNode);
                  k &&
                    k.forEach(function (e) {
                      return e.revert(!1);
                    }),
                    (Bt.start = C),
                    (Bt.end = P),
                    (g = v = Ft()),
                    bt || (g < Ge && Ft(Ge), (Bt.scroll.rec = 0)),
                    Bt.revert(!1),
                    (ee = 0),
                    n &&
                      Ct &&
                      n._initted &&
                      n.progress() !== Je &&
                      n.progress(Je, !0).render(n.time(), !0, !0),
                    $e !== Bt.progress &&
                      (n && !Ct && n.totalProgress($e, !0),
                      (Bt.progress = $e),
                      Bt.update(0, 0, 1)),
                    at && ut && (ie._pinOffset = Math.round(Bt.progress * pe)),
                    it && it(Bt);
                }
            }),
            (Bt.getVelocity = function () {
              return ((Ft() - v) / (me() - K)) * 1e3 || 0;
            }),
            (Bt.endAnimation = function () {
              m(Bt.callbackAnimation),
                n &&
                  (Ne
                    ? Ne.progress(1)
                    : n.paused()
                    ? Ct || m(n, Bt.direction < 0, 1)
                    : m(n, n.reversed()));
            }),
            (Bt.getTrailing = function (e) {
              var t = Xe.indexOf(Bt),
                r = 0 < Bt.direction ? Xe.slice(0, t).reverse() : Xe.slice(t + 1);
              return we(e)
                ? r.filter(function (t) {
                    return t.vars.preventOverlaps === e;
                  })
                : r;
            }),
            (Bt.update = function (e, t, r) {
              if (!bt || r || e) {
                var o,
                  s,
                  a,
                  l,
                  c,
                  f,
                  h,
                  x = Bt.scroll(),
                  b = e ? 0 : (x - C) / Z,
                  w = b < 0 ? 0 : 1 < b ? 1 : b || 0,
                  k = Bt.progress;
                if (
                  (t &&
                    ((v = g),
                    (g = bt ? Ft() : x),
                    mt && ((Ee = Te), (Te = n && !Ct ? n.totalProgress() : w))),
                  pt &&
                    !w &&
                    at &&
                    !ee &&
                    !he &&
                    xe &&
                    C < x + ((x - v) / (me() - K)) * pt &&
                    (w = 1e-4),
                  w !== k && Bt.enabled)
                ) {
                  if (
                    ((l =
                      (c = (o = Bt.isActive = !!w && w < 1) != (!!k && k < 1)) ||
                      !!w != !!k),
                    (Bt.direction = k < w ? 1 : -1),
                    (Bt.progress = w),
                    l &&
                      !ee &&
                      ((s = w && !k ? 0 : 1 === w ? 1 : 1 === k ? 2 : 3),
                      Ct &&
                        ((a = (!c && "none" !== _t[s + 1] && _t[s + 1]) || _t[s]),
                        (h =
                          n && ("complete" === a || "reset" === a || a in n)))),
                    kt &&
                      c &&
                      (h || ot || !n) &&
                      (d(kt)
                        ? kt(Bt)
                        : Bt.getTrailing(kt).forEach(function (e) {
                            return e.endAnimation();
                          })),
                    Ct ||
                      (!Ne || ee || he
                        ? n && n.totalProgress(w, !!ee)
                        : ((Ne.vars.totalProgress = w),
                          Ne.invalidate().restart())),
                    at)
                  )
                    if ((e && ut && (ie.style[ut + St.os2] = ve), Mt)) {
                      if (l) {
                        if (
                          ((f = !e && k < w && x < P + 1 && x + 1 >= u(Ot, St)),
                          yt)
                        )
                          if (e || (!o && !f)) F(at, ie);
                          else {
                            var S = He(at, !0),
                              O = x - C;
                            F(
                              at,
                              U,
                              S.top + (St === We ? O : 0) + Fe,
                              S.left + (St === We ? 0 : O) + Fe
                            );
                          }
                        lt(o || f ? Q : re),
                          (pe !== Z && w < 1 && o) ||
                            ce(de + (1 !== w || f ? 0 : pe));
                      }
                    } else ce(de + pe * w);
                  !mt || i.tween || ee || he || Ze.restart(!0),
                    et &&
                      (c || (vt && w && (w < 1 || !ue))) &&
                      G(et.targets).forEach(function (e) {
                        return e.classList[o || vt ? "add" : "remove"](
                          et.className
                        );
                      }),
                    !Qe || Ct || e || Qe(Bt),
                    l && !ee
                      ? (Ct &&
                          (h &&
                            ("complete" === a
                              ? n.pause().totalProgress(1)
                              : "reset" === a
                              ? n.restart(!0).pause()
                              : "restart" === a
                              ? n.restart(!0)
                              : n[a]()),
                          Qe && Qe(Bt)),
                        (!c && ue) ||
                          (rt && c && y(Bt, rt),
                          Pt[s] && y(Bt, Pt[s]),
                          vt && (1 === w ? Bt.kill(!1, 1) : (Pt[s] = 0)),
                          c || (Pt[(s = 1 === w ? 1 : 3)] && y(Bt, Pt[s]))),
                        wt &&
                          !o &&
                          Math.abs(Bt.getVelocity()) > (p(wt) ? wt : 2500) &&
                          (m(Bt.callbackAnimation),
                          Ne ? Ne.progress(1) : m(n, !w, 1)))
                      : Ct && Qe && !ee && Qe(Bt);
                }
                if (Ce) {
                  var T = bt ? (x / bt.duration()) * (bt._caScrollDist || 0) : x;
                  Se(T + (H._isFlipped ? 1 : 0)), Ce(T);
                }
                Ke && Ke((-x / bt.duration()) * (bt._caScrollDist || 0));
              }
            }),
            (Bt.enable = function (e, t) {
              Bt.enabled ||
                ((Bt.enabled = !0),
                O(Ot, "resize", A),
                O(Ot, "scroll", _),
                It && O(dt, "refreshInit", It),
                !1 !== e && ((Bt.progress = $e = 0), (g = v = Nt = Ft())),
                !1 !== t && Bt.refresh());
            }),
            (Bt.getTween = function (e) {
              return e && i ? i.tween : Ne;
            }),
            (Bt.disable = function (e, t) {
              if (
                Bt.enabled &&
                (!1 !== e && Bt.revert(),
                (Bt.enabled = Bt.isActive = !1),
                t || (Ne && Ne.pause()),
                (Ge = 0),
                o && (o.uncache = 1),
                It && T(dt, "refreshInit", It),
                Ze && (Ze.pause(), i.tween && i.tween.kill() && (i.tween = 0)),
                !Et)
              ) {
                for (var r = Xe.length; r--; )
                  if (Xe[r].scroller === Ot && Xe[r] !== Bt) return;
                T(Ot, "resize", A), T(Ot, "scroll", _);
              }
            }),
            (Bt.kill = function (e, t) {
              Bt.disable(e, t), Ne && Ne.kill(), tt && delete Ye[tt];
              var r = Xe.indexOf(Bt);
              Xe.splice(r, 1),
                r === ne && 0 < nt && ne--,
                (r = 0),
                Xe.forEach(function (e) {
                  return e.scroller === Bt.scroller && (r = 1);
                }),
                r || (Bt.scroll.rec = 0),
                n && ((n.scrollTrigger = null), e && n.render(-1), t || n.kill()),
                R &&
                  [R, I, H, X].forEach(function (e) {
                    return e.parentNode && e.parentNode.removeChild(e);
                  }),
                at &&
                  (o && (o.uncache = 1),
                  (r = 0),
                  Xe.forEach(function (e) {
                    return e.pin === at && r++;
                  }),
                  r || (o.spacer = 0));
            }),
            Bt.enable(!1, !1),
            n && n.add && !Z
              ? W.delayedCall(0.01, function () {
                  return C || P || Bt.refresh();
                }) &&
                (Z = 0.01) &&
                (C = P = 0)
              : Bt.refresh();
        } else this.update = this.refresh = this.kill = t;
      }),
      (dt.register = function (e) {
        if (
          !H &&
          ((W = e || o()),
          i() &&
            window.document &&
            ((q = window), (V = document), (j = V.documentElement), (U = V.body)),
          W &&
            ((G = W.utils.toArray),
            (J = W.utils.clamp),
            (le = W.core.suppressOverwrites || t),
            W.core.globals("ScrollTrigger", dt),
            U))
        ) {
          (Z =
            q.requestAnimationFrame ||
            function (e) {
              return setTimeout(e, 16);
            }),
            O(q, "wheel", _),
            (X = [q, V, j, U]),
            O(V, "scroll", _);
          var r,
            n = U.style,
            s = n.borderTopStyle;
          (n.borderTopStyle = "solid"),
            (r = He(U)),
            (We.m = Math.round(r.top + We.sc()) || 0),
            (De.m = Math.round(r.left + De.sc()) || 0),
            s ? (n.borderTopStyle = s) : n.removeProperty("border-top-style"),
            (Q = setInterval(P, 200)),
            W.delayedCall(0.5, function () {
              return (he = 0);
            }),
            O(V, "touchcancel", t),
            O(U, "touchstart", t),
            C(O, V, "pointerdown,touchstart,mousedown", function () {
              return (te = 1);
            }),
            C(O, V, "pointerup,touchend,mouseup", function () {
              return (te = 0);
            }),
            (re = W.utils.checkPrefix("transform")),
            st.push(re),
            (H = me()),
            (Y = W.delayedCall(0.2, tt).pause()),
            (se = [
              V,
              "visibilitychange",
              function () {
                var e = q.innerWidth,
                  t = q.innerHeight;
                V.hidden ? ((ie = e), (oe = t)) : (ie === e && oe === t) || A();
              },
              V,
              "DOMContentLoaded",
              tt,
              q,
              "load",
              function () {
                return xe || tt();
              },
              q,
              "resize",
              A,
            ]),
            f(O);
        }
        return H;
      }),
      (dt.defaults = function (e) {
        for (var t in e) Ve[t] = e[t];
      }),
      (dt.kill = function () {
        (be = 0),
          Xe.slice(0).forEach(function (e) {
            return e.kill(1);
          });
      }),
      (dt.config = function (e) {
        "limitCallbacks" in e && (ue = !!e.limitCallbacks);
        var t = e.syncInterval;
        (t && clearInterval(Q)) || ((Q = t) && setInterval(P, t)),
          "autoRefreshEvents" in e &&
            (f(T) || f(O, e.autoRefreshEvents || "none"),
            (ce = -1 === (e.autoRefreshEvents + "").indexOf("resize")));
      }),
      (dt.scrollerProxy = function (e, t) {
        var n = r(e),
          i = ve.indexOf(n),
          o = s(n);
        ~i && ve.splice(i, o ? 6 : 2),
          o ? ge.unshift(q, t, U, t, j, t) : ge.unshift(n, t);
      }),
      (dt.matchMedia = function (e) {
        var t, r, n, i, o;
        for (r in e)
          (n = Ge.indexOf(r)),
            (i = e[r]),
            "all" === (fe = r)
              ? i()
              : (t = q.matchMedia(r)) &&
                (t.matches && (o = i()),
                ~n
                  ? ((Ge[n + 1] = v(Ge[n + 1], i)), (Ge[n + 2] = v(Ge[n + 2], o)))
                  : ((n = Ge.length),
                    Ge.push(r, i, o),
                    t.addListener
                      ? t.addListener(R)
                      : t.addEventListener("change", R)),
                (Ge[n + 3] = t.matches)),
            (fe = 0);
        return Ge;
      }),
      (dt.clearMatchMedia = function (e) {
        e || (Ge.length = 0), 0 <= (e = Ge.indexOf(e)) && Ge.splice(e, 4);
      }),
      (dt.isInViewport = function (e, t, n) {
        var i = (we(e) ? r(e) : e).getBoundingClientRect(),
          o = i[n ? Me : Pe] * t || 0;
        return n
          ? 0 < i.right - o && i.left + o < q.innerWidth
          : 0 < i.bottom - o && i.top + o < q.innerHeight;
      }),
      (dt.positionInViewport = function (e, t, n) {
        we(e) && (e = r(e));
        var i = e.getBoundingClientRect(),
          o = i[n ? Me : Pe],
          s =
            null == t
              ? o / 2
              : t in je
              ? je[t] * o
              : ~t.indexOf("%")
              ? (parseFloat(t) * o) / 100
              : parseFloat(t) || 0;
        return n ? (i.left + s) / q.innerWidth : (i.top + s) / q.innerHeight;
      }),
      dt);
    function dt(e, t) {
      H ||
        dt.register(W) ||
        console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
        this.init(e, t);
    }
    (ft.version = "3.8.0"),
      (ft.saveStyles = function (e) {
        return e
          ? G(e).forEach(function (e) {
              if (e && e.style) {
                var t = Ke.indexOf(e);
                0 <= t && Ke.splice(t, 5),
                  Ke.push(
                    e,
                    e.style.cssText,
                    e.getBBox && e.getAttribute("transform"),
                    W.core.getCache(e),
                    fe
                  );
              }
            })
          : Ke;
      }),
      (ft.revert = function (e, t) {
        return et(!e, t);
      }),
      (ft.create = function (e, t) {
        return new ft(e, t);
      }),
      (ft.refresh = function (e) {
        return e ? A() : (H || ft.register()) && tt(!0);
      }),
      (ft.update = it),
      (ft.clearScrollMemory = I),
      (ft.maxScroll = function (e, t) {
        return u(e, t ? De : We);
      }),
      (ft.getScrollFunc = function (e, t) {
        return l(r(e), t ? De : We);
      }),
      (ft.getById = function (e) {
        return Ye[e];
      }),
      (ft.getAll = function () {
        return Xe.slice(0);
      }),
      (ft.isScrolling = function () {
        return !!xe;
      }),
      (ft.snapDirectional = S),
      (ft.addEventListener = function (e, t) {
        var r = Ze[e] || (Ze[e] = []);
        ~r.indexOf(t) || r.push(t);
      }),
      (ft.removeEventListener = function (e, t) {
        var r = Ze[e],
          n = r && r.indexOf(t);
        0 <= n && r.splice(n, 1);
      }),
      (ft.batch = function (e, t) {
        function r(e, t) {
          var r = [],
            n = [],
            i = W.delayedCall(s, function () {
              t(r, n), (r = []), (n = []);
            }).pause();
          return function (e) {
            r.length || i.restart(!0),
              r.push(e.trigger),
              n.push(e),
              a <= r.length && i.progress(1);
          };
        }
        var n,
          i = [],
          o = {},
          s = t.interval || 0.016,
          a = t.batchMax || 1e9;
        for (n in t)
          o[n] =
            "on" === n.substr(0, 2) && d(t[n]) && "onRefreshInit" !== n
              ? r(0, t[n])
              : t[n];
        return (
          d(a) &&
            ((a = a()),
            O(ft, "refresh", function () {
              return (a = t.batchMax());
            })),
          G(e).forEach(function (e) {
            var t = {};
            for (n in o) t[n] = o[n];
            (t.trigger = e), i.push(ft.create(t));
          }),
          i
        );
      }),
      (ft.sort = function (e) {
        return Xe.sort(
          e ||
            function (e, t) {
              return (
                -1e6 * (e.vars.refreshPriority || 0) +
                e.start -
                (t.start + -1e6 * (t.vars.refreshPriority || 0))
              );
            }
        );
      }),
      o() && W.registerPlugin(ft),
      (e.ScrollTrigger = ft),
      (e.default = ft),
      "undefined" == typeof window || window !== e
        ? Object.defineProperty(e, "__esModule", { value: !0 })
        : delete e.default;
  });
  