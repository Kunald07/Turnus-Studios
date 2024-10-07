"use strict";
(() => {
  var e,
    t = Object.defineProperty,
    r = "fs-attributes",
    i = "modal",
    n = "support",
    a = class {
      static activateAlerts() {
        this.alertsActivated = !0;
      }
      static alert(e, t) {
        if ((this.alertsActivated && window.alert(e), "error" === t))
          throw new Error(e);
      }
    };
  ((e, r, i) => {
    r in e
      ? t(e, r, { enumerable: !0, configurable: !0, writable: !0, value: i })
      : (e[r] = i);
  })(a, "symbol" != typeof (e = "alertsActivated") ? e + "" : e, !1);
  var s = () => {};
  function l(e, t, r, i) {
    return e
      ? (e.addEventListener(t, r, i), () => e.removeEventListener(t, r, i))
      : s;
  }
  var o = (e, t) => !!e && t.includes(e),
    u = (e) => null != e,
    d = (e) => "string" == typeof e;
  function c(e, t, r) {
    var i;
    let n = window.fsAttributes[e];
    return (n.destroy = r || s), null == (i = n.resolve) || i.call(n, t), t;
  }
  var f = (e, t = "1", r = "iife") =>
      `https://cdn.jsdelivr.net/npm/@finsweet/attributes-${e}@${t}/${`${e}${
        "esm" === r ? ".esm" : ""
      }.js`}`,
    p = f("animation", "1", "esm"),
    m = async () => {
      let { fsAttributes: e } = window;
      e.animation || (e.animation = {});
      let { animation: t } = e;
      if (t.import) return t.import;
      try {
        return (t.import = import(p)), t.import;
      } catch (e) {
        return void a.alert(`${e}`, "error");
      }
    },
    w = `${r}-${n}`,
    b = (e) => (t) => `${e}${t ? `-${t}` : ""}`,
    v = (e) => {
      let t = (t, r, i) => {
        let n,
          a = e[t],
          { key: s, values: l } = a;
        if (!r) return `[${s}]`;
        let o = null == l ? void 0 : l[r];
        n = d(o) ? o : o(i && "instanceIndex" in i ? i.instanceIndex : void 0);
        let u = i && "caseInsensitive" in i && i.caseInsensitive ? "i" : "";
        if (null == i || !i.operator) return `[${s}="${n}"${u}]`;
        switch (i.operator) {
          case "prefixed":
            return `[${s}^="${n}"${u}]`;
          case "suffixed":
            return `[${s}$="${n}"${u}]`;
          case "contains":
            return `[${s}*="${n}"${u}]`;
        }
      };
      return [
        t,
        function (e, r) {
          let i = t("element", e, r),
            n = (null == r ? void 0 : r.scope) || document;
          return null != r && r.all
            ? [...n.querySelectorAll(i)]
            : n.querySelector(i);
        },
        (t, r) => {
          let i = e[r];
          return i ? t.getAttribute(i.key) : null;
        },
      ];
    },
    y = {
      preventLoad: { key: `${r}-preventload` },
      debugMode: { key: `${r}-debug` },
      src: { key: "src", values: { finsweet: "@finsweet/attributes" } },
      dev: { key: `${r}-dev` },
    },
    [A, g] = v(y),
    $ = () => {
      let e = k();
      if (window.fsAttributes && !Array.isArray(window.fsAttributes))
        return void x(window.fsAttributes, e);
      let t = h(e);
      x(t, e),
        I(t),
        (window.fsAttributes = t),
        (window.FsAttributes = window.fsAttributes),
        (async () => {
          var e;
          let { fsAttributes: t, location: r } = window,
            { host: i, searchParams: a } = new URL(r.href);
          !(!i.includes("webflow.io") || !a.has(w)) &&
            (null == (e = t.import) || e.call(t, n, "1"));
        })();
    },
    h = (e) => {
      let t = {
        cms: {},
        push(...e) {
          var t, r;
          for (let [i, n] of e)
            null == (r = null == (t = this[i]) ? void 0 : t.loading) ||
              r.then(n);
        },
        import: async (e, r) =>
          t[e] ||
          new Promise((i) => {
            let n = document.createElement("script");
            (n.src = f(e, r)),
              (n.async = !0),
              (n.onload = () => {
                let [r] = x(t, [e]);
                i(r);
              }),
              document.head.append(n);
          }),
        destroy() {
          var t, r;
          for (let i of e)
            null ==
              (r = null == (t = window.fsAttributes[i]) ? void 0 : t.destroy) ||
              r.call(t);
        },
      };
      return t;
    },
    k = () => {
      let e = A("src", "finsweet", { operator: "contains" }),
        t = A("dev");
      return [...document.querySelectorAll(`script${e}, script${t}`)].reduce(
        (e, t) => {
          var r;
          let i =
            t.getAttribute(y.dev.key) ||
            (null == (r = t.src.match(/[\w-. ]+(?=(\.js)$)/)) ? void 0 : r[0]);
          return i && !e.includes(i) && e.push(i), e;
        },
        []
      );
    },
    x = (e, t) =>
      t.map((t) => {
        let r = e[t];
        return (
          r ||
          ((e[t] = {}),
          (r = e[t]),
          (r.loading = new Promise((e) => {
            r.resolve = (t) => {
              e(t), delete r.resolve;
            };
          })),
          r)
        );
      }),
    I = (e) => {
      let t = Array.isArray(window.fsAttributes) ? window.fsAttributes : [];
      e.push(...t);
    },
    L = (e) => {
      if (!e.id || document.getElementById(e.id) !== e) {
        let t = ((e = 21) =>
          crypto
            .getRandomValues(new Uint8Array(e))
            .reduce(
              (e, t) =>
                e +
                ((t &= 63) < 36
                  ? t.toString(36)
                  : t < 62
                  ? (t - 26).toString(36).toUpperCase()
                  : t > 62
                  ? "-"
                  : "_"),
              ""
            ))();
        return (e.id = t), t;
      }
      return e.id;
    },
    P = (e, t) => {
      let r = e.getAttribute(t);
      return r
        ? ((e) => {
            let t = e.split("-"),
              r = parseInt(t[t.length - 1]);
            if (!isNaN(r)) return r;
          })(r)
        : void 0;
    },
    S = "role",
    E = "aria-roledescription",
    j = `fs-${i}`,
    q = {
      element: {
        key: `${j}-element`,
        values: { modal: b("modal"), open: b("open"), close: b("close") },
      },
      animation: { key: `${j}-animation` },
      easing: { key: `${j}-easing` },
      duration: { key: `${j}-duration` },
      display: { key: `${j}-display` },
    },
    [O, W, B] = v(q),
    C = `${j}-anchor`,
    R = [
      "block",
      "inline",
      "inline-block",
      "flex",
      "inline-flex",
      "grid",
      "inline-grid",
      "none",
      "contents",
    ],
    U = (e, { animations: t, easings: r }) => {
      let i = B(e, "animation"),
        n = o(i, ((e) => Object.keys(e))(t)) ? t[i] : t.fade,
        a = B(e, "duration"),
        s = B(e, "easing"),
        l = B(e, "display"),
        u = o(s, r) ? s : void 0;
      return {
        actions: n,
        duration: a ? parseFloat(a) / 1e3 : void 0,
        easing: u,
        display: o(l, R) ? l : void 0,
      };
    },
    D = (e, t) => {
      let r = ["animation", "duration", "easing", "display"]
        .map((e) => O(e))
        .join(",");
      return [...e.querySelectorAll(r)].map((e) => [e, U(e, t)]);
    },
    F = (e, t) => {
      let { parentElement: r } = e;
      if (!r) return;
      let i = P(e, q.element.key),
        n = W("open", { instanceIndex: i, all: !0 }),
        a = W("close", { instanceIndex: i, all: !0 });
      if (!n.length && !a.length) return;
      let s = U(e, t);
      return (
        ((e, t, r) => {
          let i = L(e),
            n = ((e) =>
              !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length))(
              e
            );
          e.setAttribute(S, "dialog"), e.setAttribute("aria-modal", "true");
          for (let e of [...t, ...r]) {
            if (e.hasAttribute("aria-hidden")) continue;
            L(e);
            let r = t.includes(e) ? "open" : "close";
            e.setAttribute("tabindex", "0"),
              e.setAttribute(S, "button"),
              e.setAttribute("aria-controls", i),
              e.setAttribute("aria-haspopup", "dialog"),
              e.setAttribute("aria-expanded", String(n)),
              e.hasAttribute(E) || e.setAttribute(E, `${r}-modal-trigger`);
          }
        })(e, n, a),
        ((e, t, r, i, n) => {
          let { parentElement: a } = e;
          if (!a) return;
          let { actions: s, duration: o, easing: u, display: d } = i,
            c = D(e, n),
            f = new Comment(C);
          a.insertBefore(f, e);
          let p,
            m = !1,
            w = t.map((t) =>
              l(t, "click", async (t) => {
                t.preventDefault(),
                  !m &&
                    !p &&
                    ((m = !0),
                    await Promise.all([
                      s.animateIn(e, {
                        duration: o,
                        easing: u,
                        display: d || "flex",
                        target: document.body,
                      }),
                      Promise.all(
                        c.map(
                          ([
                            e,
                            { actions: t, duration: r, easing: i, display: n },
                          ]) =>
                            t.animateIn(e, {
                              display: n,
                              duration: r || o,
                              easing: i || u,
                            })
                        )
                      ),
                    ]),
                    (m = !1),
                    (p = !0));
              })
            ),
            b = r.map((t) =>
              l(t, "click", async (t) => {
                t.preventDefault(),
                  !m &&
                    !1 !== p &&
                    ((m = !0),
                    await Promise.all([
                      s.animateOut(e, {
                        duration: o,
                        easing: u,
                        target: a,
                        insertAfter: f,
                      }),
                      Promise.all(
                        c.map(([e, { actions: t, duration: r, easing: i }]) =>
                          t.animateOut(e, { duration: r || o, easing: i || u })
                        )
                      ),
                    ]),
                    a.insertBefore(e, f),
                    (m = !1),
                    (p = !1));
              })
            );
          return () => {
            for (let e of w) e();
            for (let e of b) e();
          };
        })(e, n, a, s, t)
      );
    };
  (({ scriptAttributes: e, attributeKey: t, version: r, init: i }) => {
    var n;
    $(), (n = window.fsAttributes)[t] || (n[t] = {});
    let { preventsLoad: a, attributes: s } = ((e) => {
        let { currentScript: t } = document,
          r = {};
        if (!t) return { attributes: r, preventsLoad: !1 };
        let i = {
          preventsLoad: d(t.getAttribute(y.preventLoad.key)),
          attributes: r,
        };
        for (let r in e) {
          let n = t.getAttribute(e[r]);
          i.attributes[r] = n;
        }
        return i;
      })(e),
      l = window.fsAttributes[t];
    (l.version = r),
      (l.init = i),
      a ||
        (window.Webflow || (window.Webflow = []),
        window.Webflow.push(() => i(s)));
  })({
    init: async () => {
      await (async (...e) => {
        var t;
        let r = [];
        for (let i of e) {
          let e = await (null == (t = window.fsAttributes[i])
            ? void 0
            : t.loading);
          r.push(e);
        }
        return r;
      })("cmsattribute");
      let e = W("modal", { operator: "prefixed", all: !0 }),
        t = await m();
      if (!t) return c(i, e);
      let r = e.map((e) => F(e, t)).filter(u);
      return (
        (() => {
          var e, t;
          null == (t = (e = window.fsAttributes).import) ||
            t.call(e, "a11y", "1");
        })(),
        c(i, e, () => {
          for (let e of r) e();
        })
      );
    },
    version: "1.1.3",
    attributeKey: i,
  }),
    m();
})();
