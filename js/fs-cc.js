(() => {
    var e,
      t,
      n = Object.create,
      i = Object.defineProperty,
      r = Object.defineProperties,
      o = Object.getOwnPropertyDescriptor,
      s = Object.getOwnPropertyDescriptors,
      l = Object.getOwnPropertyNames,
      a = Object.getOwnPropertySymbols,
      c = Object.getPrototypeOf,
      d = Object.prototype.hasOwnProperty,
      h = Object.prototype.propertyIsEnumerable,
      u = (e, t, n) =>
        t in e
          ? i(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
          : (e[t] = n),
      f = (e, t) => {
        for (var n in t || (t = {})) d.call(t, n) && u(e, n, t[n]);
        if (a) for (var n of a(t)) h.call(t, n) && u(e, n, t[n]);
        return e;
      },
      m = (e, t) => r(e, s(t)),
      p = (e) =>
        ((e, t, n) => {
          if ((t && "object" == typeof t) || "function" == typeof t)
            for (let r of l(t))
              !d.call(e, r) &&
                "default" !== r &&
                i(e, r, {
                  get: () => t[r],
                  enumerable: !(n = o(t, r)) || n.enumerable,
                });
          return e;
        })(
          ((e) => i(e, "__esModule", { value: !0 }))(
            i(
              null != e ? n(c(e)) : {},
              "default",
              e && e.__esModule && "default" in e
                ? { get: () => e.default, enumerable: !0 }
                : { value: e, enumerable: !0 }
            )
          ),
          e
        ),
      y = (e, t, n) => (u(e, "symbol" != typeof t ? t + "" : t, n), n),
      g = (e, t, n) =>
        new Promise((i, r) => {
          var o = (e) => {
              try {
                l(n.next(e));
              } catch (e) {
                r(e);
              }
            },
            s = (e) => {
              try {
                l(n.throw(e));
              } catch (e) {
                r(e);
              }
            },
            l = (e) =>
              e.done ? i(e.value) : Promise.resolve(e.value).then(o, s);
          l((n = n.apply(e, t)).next());
        }),
      b =
        ((e = (e, t) => {
          "use strict";
          var n = new WeakMap(),
            i = new WeakMap(),
            r = new WeakMap(),
            o = Symbol("anyProducer"),
            s = Promise.resolve(),
            l = Symbol("listenerAdded"),
            a = Symbol("listenerRemoved"),
            c = !1;
          function d(e) {
            if ("string" != typeof e && "symbol" != typeof e)
              throw new TypeError("eventName must be a string or a symbol");
          }
          function h(e) {
            if ("function" != typeof e)
              throw new TypeError("listener must be a function");
          }
          function u(e, t) {
            let n = i.get(e);
            return n.has(t) || n.set(t, new Set()), n.get(t);
          }
          function f(e, t) {
            let n = "string" == typeof t || "symbol" == typeof t ? t : o,
              i = r.get(e);
            return i.has(n) || i.set(n, new Set()), i.get(n);
          }
          function m(e, t) {
            t = Array.isArray(t) ? t : [t];
            let n = !1,
              i = () => {},
              r = [],
              o = {
                enqueue(e) {
                  r.push(e), i();
                },
                finish() {
                  (n = !0), i();
                },
              };
            for (let n of t) f(e, n).add(o);
            return {
              next() {
                return g(this, null, function* () {
                  return r
                    ? 0 === r.length
                      ? n
                        ? ((r = void 0), this.next())
                        : (yield new Promise((e) => {
                            i = e;
                          }),
                          this.next())
                      : { done: !1, value: yield r.shift() }
                    : { done: !0 };
                });
              },
              return(n) {
                return g(this, arguments, function* (n) {
                  r = void 0;
                  for (let n of t) f(e, n).delete(o);
                  return (
                    i(),
                    arguments.length > 0
                      ? { done: !0, value: yield n }
                      : { done: !0 }
                  );
                });
              },
              [Symbol.asyncIterator]() {
                return this;
              },
            };
          }
          function p(e) {
            if (void 0 === e) return v;
            if (!Array.isArray(e))
              throw new TypeError("`methodNames` must be an array of strings");
            for (let t of e)
              if (!v.includes(t))
                throw "string" != typeof t
                  ? new TypeError("`methodNames` element must be a string")
                  : new Error(`${t} is not Emittery method`);
            return e;
          }
          var y = (e) => e === l || e === a,
            b = class {
              static mixin(e, t) {
                return (
                  (t = p(t)),
                  (n) => {
                    if ("function" != typeof n)
                      throw new TypeError("`target` must be function");
                    for (let e of t)
                      if (void 0 !== n.prototype[e])
                        throw new Error(
                          `The property \`${e}\` already exists on \`target\``
                        );
                    Object.defineProperty(n.prototype, e, {
                      enumerable: !1,
                      get: function () {
                        return (
                          Object.defineProperty(this, e, {
                            enumerable: !1,
                            value: new b(),
                          }),
                          this[e]
                        );
                      },
                    });
                    let i = (t) =>
                      function (...n) {
                        return this[e][t](...n);
                      };
                    for (let e of t)
                      Object.defineProperty(n.prototype, e, {
                        enumerable: !1,
                        value: i(e),
                      });
                    return n;
                  }
                );
              }
              static get isDebugEnabled() {
                if ("object" != typeof process) return c;
                let { env: e } = process || { env: {} };
                return "emittery" === e.DEBUG || "*" === e.DEBUG || c;
              }
              static set isDebugEnabled(e) {
                c = e;
              }
              constructor(e = {}) {
                n.set(this, new Set()),
                  i.set(this, new Map()),
                  r.set(this, new Map()),
                  (this.debug = e.debug || {}),
                  void 0 === this.debug.enabled && (this.debug.enabled = !1),
                  this.debug.logger ||
                    (this.debug.logger = (e, t, n, i) => {
                      try {
                        i = JSON.stringify(i);
                      } catch (e) {
                        i = `Object with the following keys failed to stringify: ${Object.keys(
                          i
                        ).join(",")}`;
                      }
                      "symbol" == typeof n && (n = n.toString());
                      let r = new Date(),
                        o = `${r.getHours()}:${r.getMinutes()}:${r.getSeconds()}.${r.getMilliseconds()}`;
                      console.log(
                        `[${o}][emittery:${e}][${t}] Event Name: ${n}\n\tdata: ${i}`
                      );
                    });
              }
              logIfDebugEnabled(e, t, n) {
                (b.isDebugEnabled || this.debug.enabled) &&
                  this.debug.logger(e, this.debug.name, t, n);
              }
              on(e, t) {
                h(t), (e = Array.isArray(e) ? e : [e]);
                for (let n of e)
                  d(n),
                    u(this, n).add(t),
                    this.logIfDebugEnabled("subscribe", n, void 0),
                    y(n) || this.emit(l, { eventName: n, listener: t });
                return this.off.bind(this, e, t);
              }
              off(e, t) {
                h(t), (e = Array.isArray(e) ? e : [e]);
                for (let n of e)
                  d(n),
                    u(this, n).delete(t),
                    this.logIfDebugEnabled("unsubscribe", n, void 0),
                    y(n) || this.emit(a, { eventName: n, listener: t });
              }
              once(e) {
                return new Promise((t) => {
                  let n = this.on(e, (e) => {
                    n(), t(e);
                  });
                });
              }
              events(e) {
                e = Array.isArray(e) ? e : [e];
                for (let t of e) d(t);
                return m(this, e);
              }
              emit(e, t) {
                return g(this, null, function* () {
                  d(e),
                    this.logIfDebugEnabled("emit", e, t),
                    (function (e, t, n) {
                      let i = r.get(e);
                      if (i.has(t)) for (let e of i.get(t)) e.enqueue(n);
                      if (i.has(o)) {
                        let e = Promise.all([t, n]);
                        for (let t of i.get(o)) t.enqueue(e);
                      }
                    })(this, e, t);
                  let i = u(this, e),
                    l = n.get(this),
                    a = [...i],
                    c = y(e) ? [] : [...l];
                  yield s,
                    yield Promise.all([
                      ...a.map((e) =>
                        g(this, null, function* () {
                          if (i.has(e)) return e(t);
                        })
                      ),
                      ...c.map((n) =>
                        g(this, null, function* () {
                          if (l.has(n)) return n(e, t);
                        })
                      ),
                    ]);
                });
              }
              emitSerial(e, t) {
                return g(this, null, function* () {
                  d(e), this.logIfDebugEnabled("emitSerial", e, t);
                  let i = u(this, e),
                    r = n.get(this),
                    o = [...i],
                    l = [...r];
                  yield s;
                  for (let e of o) i.has(e) && (yield e(t));
                  for (let n of l) r.has(n) && (yield n(e, t));
                });
              }
              onAny(e) {
                return (
                  h(e),
                  this.logIfDebugEnabled("subscribeAny", void 0, void 0),
                  n.get(this).add(e),
                  this.emit(l, { listener: e }),
                  this.offAny.bind(this, e)
                );
              }
              anyEvent() {
                return m(this);
              }
              offAny(e) {
                h(e),
                  this.logIfDebugEnabled("unsubscribeAny", void 0, void 0),
                  this.emit(a, { listener: e }),
                  n.get(this).delete(e);
              }
              clearListeners(e) {
                e = Array.isArray(e) ? e : [e];
                for (let t of e)
                  if (
                    (this.logIfDebugEnabled("clear", t, void 0),
                    "string" == typeof t || "symbol" == typeof t)
                  ) {
                    u(this, t).clear();
                    let e = f(this, t);
                    for (let t of e) t.finish();
                    e.clear();
                  } else {
                    n.get(this).clear();
                    for (let e of i.get(this).values()) e.clear();
                    for (let e of r.get(this).values()) {
                      for (let t of e) t.finish();
                      e.clear();
                    }
                  }
              }
              listenerCount(e) {
                e = Array.isArray(e) ? e : [e];
                let t = 0;
                for (let o of e)
                  if ("string" != typeof o) {
                    void 0 !== o && d(o), (t += n.get(this).size);
                    for (let e of i.get(this).values()) t += e.size;
                    for (let e of r.get(this).values()) t += e.size;
                  } else
                    t +=
                      n.get(this).size +
                      u(this, o).size +
                      f(this, o).size +
                      f(this).size;
                return t;
              }
              bindMethods(e, t) {
                if ("object" != typeof e || null === e)
                  throw new TypeError("`target` must be an object");
                t = p(t);
                for (let n of t) {
                  if (void 0 !== e[n])
                    throw new Error(
                      `The property \`${n}\` already exists on \`target\``
                    );
                  Object.defineProperty(e, n, {
                    enumerable: !1,
                    value: this[n].bind(this),
                  });
                }
              }
            },
            v = Object.getOwnPropertyNames(b.prototype).filter(
              (e) => "constructor" !== e
            );
          Object.defineProperty(b, "listenerAdded", {
            value: l,
            writable: !1,
            enumerable: !0,
            configurable: !1,
          }),
            Object.defineProperty(b, "listenerRemoved", {
              value: a,
              writable: !1,
              enumerable: !0,
              configurable: !1,
            }),
            (t.exports = b);
        }),
        () => (t || e((t = { exports: {} }).exports, t), t.exports)),
      v = ["personalization", "analytics", "marketing"],
      w = "uncategorized",
      E = ["essential", ...v, w],
      x = "fs-cc",
      A = ["informational", "opt-in", "opt-out"],
      $ = { allow: "allow", deny: "deny", submit: "submit" },
      S = {
        banner: `[${x}="banner"]`,
        preferences: `[${x}="preferences"]`,
        manager: `[${x}="manager"]`,
      },
      T = {
        allow: `[${x}="${$.allow}"]`,
        deny: `[${x}="${$.deny}"]`,
        submit: `[${x}="${$.submit}"]`,
        openPreferences: `[${x}="open-preferences"]`,
        close: `[${x}="close"]`,
      },
      k = { interactionTrigger: `[${x}="interaction"]` },
      C = {
        categories: [`${x}-category`, `${x}-categories`],
        disableScroll: `${x}-scroll`,
        displayProperty: `${x}-display`,
        cookieMaxAge: `${x}-expires`,
        mode: `${x}-mode`,
        debugMode: `${x}-debug`,
        endpoint: `${x}-endpoint`,
        componentsSource: `${x}-source`,
        src: `${x}-src`,
        placeholder: `${x}-placeholder`,
        domain: `${x}-domain`,
      },
      O = { main: x, consentsUpdated: `${x}-updated` },
      P = (e) => `[${x}-checkbox="${e}"]`,
      j = (e) => `${e}-activated`,
      M = `<style>${S.banner},${S.manager},${S.preferences},${k.interactionTrigger}{display:none}</style>`,
      L = Object.freeze({
        analytics: !1,
        essential: !0,
        marketing: !1,
        personalization: !1,
        uncategorized: !1,
      }),
      I = Object.freeze({
        analytics: !0,
        essential: !0,
        marketing: !0,
        personalization: !0,
        uncategorized: !0,
      }),
      D = (e, t = "flex") =>
        new Promise((n) => {
          (e.style.opacity = "0"),
            (e.style.display = t),
            (function t() {
              let i = parseFloat(e.style.opacity);
              if (i >= 1) return void n();
              let r = i + 0.1;
              (e.style.opacity = r.toString()), requestAnimationFrame(t);
            })();
        }),
      F = (e) =>
        new Promise((t) => {
          (e.style.opacity = "1"),
            (function n() {
              let i = parseFloat(e.style.opacity) - 0.1;
              (e.style.opacity = i.toString()),
                i <= 0
                  ? ((e.style.display = "none"), t())
                  : requestAnimationFrame(n);
            })();
        }),
      R = class {
        static activateAlerts() {
          this.alertsActivated = !0;
        }
        static alert(e, t) {
          if ((this.alertsActivated && window.alert(e), "error" === t))
            throw new Error(e);
        }
      };
    R.alertsActivated = !1;
    var U = (e, t) => (
        Array.isArray(t) || (t = [t]),
        t
          .map((t) => e.dispatchEvent(new Event(t, { bubbles: !0 })))
          .every((e) => e)
      ),
      z = (e, t) => !!e && t.includes(e);
    var H = (e) => Object.keys(e),
      N = (e) => {
        let { overflow: t } = getComputedStyle(e);
        return "auto" === t || "scroll" === t;
      },
      q = (e, t, n = document) => {
        let i = n.querySelector(e);
        if (i instanceof t) return i;
      },
      B = (e, t = !0) => (
        t !== e.checked && ((e.checked = t), U(e, ["click", "input", "change"])),
        "checkbox" === e.type ? e.checked : e.value
      ),
      W = class {
        constructor({
          element: e,
          interaction: t,
          displayProperty: n,
          noTransition: i,
          startsHidden: r,
        }) {
          if (
            ((this.isVisible = () => this.visible),
            (this.element =
              "string" == typeof e
                ? q(e, HTMLElement) ||
                  R.alert(`No element with the ${e} selector was found.`, "error")
                : e),
            (this.noTransition = i),
            (this.displayProperty = n || "block"),
            r
              ? ((this.element.style.display = "none"), (this.visible = !1))
              : (this.visible = ((e) =>
                  !!(
                    e.offsetWidth ||
                    e.offsetHeight ||
                    e.getClientRects().length
                  ))(this.element)),
            t)
          ) {
            let { element: e, duration: n } = t;
            this.interaction = new (class {
              constructor({ element: e, duration: t }) {
                var n, i;
                (this.active = !1),
                  (this.running = !1),
                  (this.isActive = () => this.active),
                  (this.isRunning = () => this.running),
                  (this.untilFinished = () => this.runningPromise),
                  (this.element =
                    "string" == typeof e
                      ? q(e, HTMLElement) ||
                        R.alert(
                          `No interaction with the ${e} selector was found.`,
                          "error"
                        )
                      : e),
                  (this.duration = {
                    first:
                      "number" == typeof t
                        ? t
                        : null != (n = null == t ? void 0 : t.first)
                        ? n
                        : 0,
                    second:
                      "number" == typeof t
                        ? t
                        : null != (i = null == t ? void 0 : t.second)
                        ? i
                        : 0,
                  });
              }
              trigger(e) {
                return g(this, null, function* () {
                  return !(
                    ("first" === e && this.active) ||
                    ("second" === e && !this.active) ||
                    (e || (e = this.active ? "second" : "first"),
                    U(this.element, "click"),
                    (this.running = !0),
                    (this.runningPromise = ((e) =>
                      new Promise((t) => setTimeout(t, e)))(this.duration[e])),
                    yield this.runningPromise,
                    (this.running = !1),
                    (this.active = "first" === e),
                    0)
                  );
                });
              }
            })({ element: e, duration: n });
          }
        }
        show() {
          return g(this, null, function* () {
            this.visible ||
              (this.interaction
                ? yield this.interaction.trigger("first")
                : this.noTransition
                ? (this.element.style.display = this.displayProperty)
                : yield D(this.element, this.displayProperty),
              (this.visible = !0));
          });
        }
        hide() {
          return g(this, null, function* () {
            !this.visible ||
              (this.interaction
                ? yield this.interaction.trigger("second")
                : this.noTransition
                ? (this.element.style.display = "none")
                : yield F(this.element),
              (this.visible = !1));
          });
        }
      };
    W.displayProperties = ["block", "flex", "grid", "inline-block", "inline"];
    var J = (e) =>
        g(void 0, null, function* () {
          let { Webflow: t } = window;
          if (
            t &&
            "destroy" in t &&
            "ready" in t &&
            "require" in t &&
            (!e || e.length)
          ) {
            if ((e || (t.destroy(), t.ready()), !e || e.includes("ix2"))) {
              let n = t.require("ix2");
              if (n) {
                let { store: t, actions: i } = n,
                  { eventState: r } = t.getState().ixSession;
                e || n.destroy(), n.init();
                for (let e of Object.entries(r))
                  t.dispatch(i.eventStateChanged(...e));
              }
            }
            if (!e || e.includes("commerce")) {
              let e = t.require("commerce"),
                n = document.documentElement.getAttribute("data-wf-site");
              e &&
                n &&
                (e.destroy(),
                e.init({ siteId: n, apiUrl: "https://render.webflow.com" }));
            }
            if (null == e ? void 0 : e.includes("lightbox")) {
              let e = t.require("lightbox");
              null == e || e.ready();
            }
            return new Promise((e) => t.push(() => e(void 0)));
          }
        }),
      K = { info: "green", warning: "yellow", error: "red" },
      G = class {
        static activate() {
          this.init(), (this.active = !0);
        }
        static init() {
          (this.element = document.createElement("div")),
            Object.assign(this.element.style, {
              position: "fixed",
              left: "auto",
              top: "auto",
              right: "16px",
              bottom: "0px",
              "z-index": "999999",
              "max-width": "320px",
              "font-size": "14px",
              "line-height": "1.25",
            }),
            document.body.appendChild(this.element);
        }
        static alert(e, t) {
          if (!this.active) return;
          let n = document.createElement("div");
          Object.assign(n.style, {
            position: "relative",
            padding: "16px",
            opacity: "0",
            "margin-bottom": "16px",
            "border-left": `4px solid ${K[t]}`,
            "background-color": "#fff",
            "box-shadow": "1px 1px 3px 0 rgba(0, 0, 0, 0.1)",
            "word-break": "break-all",
          });
          let i = document.createElement("div");
          (i.innerText = e),
            n.appendChild(i),
            n.insertAdjacentHTML(
              "beforeend",
              `<div ${x}="close" style="position: absolute; left: auto; top: 4px; right: 8px; bottom: auto; cursor: pointer">✖</div>`
            ),
            this.handleCard(n);
        }
        static handleCard(e) {
          let t = (n) => {
            n.target instanceof Element &&
              n.target.closest(T.close) &&
              (e.removeEventListener("click", t), e.remove());
          };
          e.addEventListener("click", t),
            this.element.insertAdjacentElement("afterbegin", e),
            D(e);
        }
      };
    y(G, "active", !1), y(G, "element");
    var _ = ({ element: e }) => {
        let t = document.createElement("script");
        return (
          (t.type = "text/javascript"),
          (t.innerText = e.innerText),
          (t.text = e.text),
          e.src && (t.src = e.src),
          t
        );
      },
      V = ({ element: e, src: t, placeholder: n }) => {
        let i = document.createElement("iframe");
        for (let { name: t, value: n } of e.attributes) i.setAttribute(t, n);
        return (
          (i.innerText = e.innerText),
          (i.src = t),
          n && i.addEventListener("load", () => F(n)),
          i
        );
      },
      Y = p(b());
    function Q(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var i in n) e[i] = n[i];
      }
      return e;
    }
    var X = (function e(t, n) {
        function i(e, i, r) {
          if ("undefined" != typeof document) {
            "number" == typeof (r = Q({}, n, r)).expires &&
              (r.expires = new Date(Date.now() + 864e5 * r.expires)),
              r.expires && (r.expires = r.expires.toUTCString()),
              (e = encodeURIComponent(e)
                .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
                .replace(/[()]/g, escape));
            var o = "";
            for (var s in r)
              !r[s] ||
                ((o += "; " + s), !0 !== r[s] && (o += "=" + r[s].split(";")[0]));
            return (document.cookie = e + "=" + t.write(i, e) + o);
          }
        }
        return Object.create(
          {
            set: i,
            get: function (e) {
              if ("undefined" != typeof document && (!arguments.length || e)) {
                for (
                  var n = document.cookie ? document.cookie.split("; ") : [],
                    i = {},
                    r = 0;
                  r < n.length;
                  r++
                ) {
                  var o = n[r].split("="),
                    s = o.slice(1).join("=");
                  try {
                    var l = decodeURIComponent(o[0]);
                    if (((i[l] = t.read(s, l)), e === l)) break;
                  } catch (e) {}
                }
                return e ? i[e] : i;
              }
            },
            remove: function (e, t) {
              i(e, "", Q({}, t, { expires: -1 }));
            },
            withAttributes: function (t) {
              return e(this.converter, Q({}, this.attributes, t));
            },
            withConverter: function (t) {
              return e(Q({}, this.converter, t), this.attributes);
            },
          },
          {
            attributes: { value: Object.freeze(n) },
            converter: { value: Object.freeze(t) },
          }
        );
      })(
        {
          read: function (e) {
            return (
              '"' === e[0] && (e = e.slice(1, -1)),
              e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
            );
          },
          write: function (e) {
            return encodeURIComponent(e).replace(
              /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
              decodeURIComponent
            );
          },
        },
        { path: "/" }
      ),
      Z = (e) => {
        if (!e) return;
        let { hostname: t } = window.location;
        return t.includes("webflow.io") ? t : e;
      },
      ee = () => {
        let e = X.get(O.main);
        if (!e) return;
        let t = JSON.parse(decodeURIComponent(e));
        return t.consents &&
          ((e) => Object.keys(e).every((e) => z(e, E)))(t.consents)
          ? t.consents
          : void 0;
      },
      te = class extends Y.default {
        constructor(e) {
          super(),
            (this.store = e),
            this.loadConsents(),
            this.storeElements(),
            "complete" !== document.readyState &&
              window.addEventListener("load", () => {
                this.storeElements(), this.applyConsents();
              }),
            this.applyConsents();
        }
        storeElements() {
          let { store: e } = this,
            t = document.querySelectorAll(
              `script[type="${x}"], iframe[${C.src}]`
            ),
            n = e.getStoredElements();
          [...t]
            .filter((e) => !n.find(({ element: t }) => e === t))
            .forEach((t) => {
              let n = (function (e, t, n, i = !0) {
                let r = n ? [n] : [];
                if (!e) return r;
                let o = e.split(",").reduce((e, t) => {
                  let n = t.trim();
                  return (!i || n) && e.push(n), e;
                }, []);
                if (t) {
                  let e = o.filter((e) => z(e, t));
                  return e.length ? e : r;
                }
                return o;
              })(
                t.getAttribute(C.categories[0]) ||
                  t.getAttribute(C.categories[1]),
                E,
                w
              );
              if (
                (t instanceof HTMLScriptElement &&
                  e.storeScript({ categories: n, element: t, active: !1 }),
                t instanceof HTMLIFrameElement)
              ) {
                let i = t.getAttribute(C.src);
                if (!i) return;
                t.src = "";
                let r = t.getAttribute(C.placeholder),
                  o = r ? q(r, HTMLElement) : void 0;
                e.storeIFrame({
                  categories: n,
                  element: t,
                  src: i,
                  placeholder: o,
                  active: !1,
                });
              }
              G.alert(
                `Stored the element: ${t.outerHTML} in the categories: ${n.join(
                  ", "
                )}`,
                "info"
              );
            });
        }
        loadConsents() {
          let e = ee();
          e &&
            (G.alert(
              `The following consents were loaded from the stored cookies: ${JSON.stringify(
                e
              )}`,
              "info"
            ),
            this.store.storeConsents(e),
            X.get(O.consentsUpdated) &&
              ((() => {
                let e = X.get();
                for (let t in e) {
                  if (t === O.main) continue;
                  let e = window.location.host.split(".");
                  for (; e.length > 1; )
                    X.remove(t),
                      X.remove(t, { domain: `.${e.join(".")}` }),
                      X.remove(t, { domain: `${e.join(".")}` }),
                      e.splice(0, 1);
                }
              })(),
              G.alert("Previously denied cookies have been deleted.", "info")));
        }
        applyConsents() {
          return g(this, null, function* () {
            let { store: e } = this;
            for (let t of e.getActivableElements())
              yield new Promise((e) => {
                let n,
                  { element: i } = t,
                  { src: r, parentElement: o } = i;
                if ("script" === t.type) n = _(t);
                else {
                  if ("iframe" !== t.type) return void e(void 0);
                  n = V(t);
                }
                let s = () => {
                  (t.element = n), (t.active = !0), e(void 0);
                };
                r && n.addEventListener("load", s),
                  null == o || o.insertBefore(n, i),
                  i.remove(),
                  r || s();
              });
            e.getConsentsEntries().forEach(([e, t]) => {
              t &&
                ((e) => {
                  (window.dataLayer = window.dataLayer || []),
                    window.dataLayer.find((t) => t.event === e) ||
                      (window.dataLayer.push({ event: e }),
                      G.alert(`The GTM event ${e} has been fired.`, "info"));
                })(j(e));
            });
          });
        }
        updateConsents(e, t) {
          let { store: n } = this,
            { cookieMaxAge: i, endpoint: r, domain: o } = n,
            s = n.storeConsents(e),
            l = ((e = 21) =>
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
          ((e, t, n = 120, i) => {
            let r = { id: e, consents: t },
              o = encodeURIComponent(JSON.stringify(r));
            (i = Z(i)), X.set(O.main, o, { expires: n, domain: i });
          })(l, n.getConsents(), i, o),
            r &&
              ((e) => {
                g(
                  void 0,
                  [e],
                  function* ({
                    id: e,
                    endpoint: t,
                    consents: n,
                    action: i,
                    bannerText: r,
                  }) {
                    if (t)
                      try {
                        let o = JSON.stringify({
                            id: e,
                            action: i,
                            consents: n,
                            bannerText: r,
                            url: window.location.href,
                            userAgent: navigator.userAgent,
                          }),
                          s = yield fetch(t, { body: o, method: "POST" });
                        if (!s.ok)
                          throw new Error(
                            `The API returned a ${s.status} status.`
                          );
                        G.alert(
                          "The new consents were successfully POSTed to the API endpoint.",
                          "info"
                        );
                      } catch (e) {
                        G.alert(
                          `There was an error while POSTing to the API: ${e}`,
                          "error"
                        );
                      }
                  }
                );
              })({
                action: t,
                endpoint: r,
                id: l,
                consents: n.getConsents(),
                bannerText: n.getBannerText() || "",
              }),
            s.length &&
              (((e = 120, t) => {
                (t = Z(t)),
                  X.set(O.consentsUpdated, "true", { expires: e, domain: t });
              })(i, o),
              this.applyConsents(),
              G.alert(
                `The following consents were updated: ${s.join(", ")}`,
                "info"
              )),
            this.emit("updateconsents");
        }
      };
    var ne = !1;
    "undefined" != typeof window &&
      ((ie = {
        get passive() {
          ne = !0;
        },
      }),
      window.addEventListener("testPassive", null, ie),
      window.removeEventListener("testPassive", null, ie));
    var ie,
      re =
        "undefined" != typeof window &&
        window.navigator &&
        window.navigator.platform &&
        (/iP(ad|hone|od)/.test(window.navigator.platform) ||
          ("MacIntel" === window.navigator.platform &&
            window.navigator.maxTouchPoints > 1)),
      oe = [],
      se = !1,
      le = -1,
      ae = void 0,
      ce = void 0,
      de = function (e) {
        return oe.some(function (t) {
          return !(!t.options.allowTouchMove || !t.options.allowTouchMove(e));
        });
      },
      he = function (e) {
        var t = e || window.event;
        return (
          !!(de(t.target) || t.touches.length > 1) ||
          (t.preventDefault && t.preventDefault(), !1)
        );
      },
      ue = function (e, t) {
        if (e) {
          if (
            !oe.some(function (t) {
              return t.targetElement === e;
            })
          ) {
            var n = { targetElement: e, options: t || {} };
            (oe = [].concat(
              (function (e) {
                if (Array.isArray(e)) {
                  for (var t = 0, n = Array(e.length); t < e.length; t++)
                    n[t] = e[t];
                  return n;
                }
                return Array.from(e);
              })(oe),
              [n]
            )),
              re
                ? ((e.ontouchstart = function (e) {
                    1 === e.targetTouches.length &&
                      (le = e.targetTouches[0].clientY);
                  }),
                  (e.ontouchmove = function (t) {
                    1 === t.targetTouches.length &&
                      (function (e, t) {
                        var n = e.targetTouches[0].clientY - le;
                        !de(e.target) &&
                          ((t && 0 === t.scrollTop && n > 0) ||
                          ((function (e) {
                            return (
                              !!e &&
                              e.scrollHeight - e.scrollTop <= e.clientHeight
                            );
                          })(t) &&
                            n < 0)
                            ? he(e)
                            : e.stopPropagation());
                      })(t, e);
                  }),
                  se ||
                    (document.addEventListener(
                      "touchmove",
                      he,
                      ne ? { passive: !1 } : void 0
                    ),
                    (se = !0)))
                : (function (e) {
                    if (void 0 === ce) {
                      var t = !!e && !0 === e.reserveScrollBarGap,
                        n =
                          window.innerWidth -
                          document.documentElement.clientWidth;
                      t &&
                        n > 0 &&
                        ((ce = document.body.style.paddingRight),
                        (document.body.style.paddingRight = n + "px"));
                    }
                    void 0 === ae &&
                      ((ae = document.body.style.overflow),
                      (document.body.style.overflow = "hidden"));
                  })(t);
          }
        } else
          console.error(
            "disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices."
          );
      },
      fe = function () {
        re
          ? (oe.forEach(function (e) {
              (e.targetElement.ontouchstart = null),
                (e.targetElement.ontouchmove = null);
            }),
            se &&
              (document.removeEventListener(
                "touchmove",
                he,
                ne ? { passive: !1 } : void 0
              ),
              (se = !1)),
            (le = -1))
          : (void 0 !== ce &&
              ((document.body.style.paddingRight = ce), (ce = void 0)),
            void 0 !== ae &&
              ((document.body.style.overflow = ae), (ae = void 0))),
          (oe = []);
      },
      me = p(b()),
      pe = class extends me.default {
        constructor(e, t) {
          super(),
            (this.element = e),
            (this.store = t),
            y(this, "checkboxes", new Map()),
            this.initElements(),
            this.listenEvents(),
            this.updateCheckboxes();
        }
        initElements() {
          let e = v.filter((e) => {
            let t = P(e),
              n = this.element.querySelector(`input${t}, ${t} input`);
            return (
              !n ||
              "checkbox" !== n.type ||
              (n.checked && B(n, !1), this.checkboxes.set(e, n), !1)
            );
          });
          e.length &&
            G.alert(
              `The Consents Form is missing the following checkboxes: ${e
                .map((e) => P(e))
                .join(", ")}.`,
              "warning"
            );
        }
        listenEvents() {
          this.element.addEventListener("submit", (e) => this.handleSubmit(e));
        }
        handleSubmit(e) {
          e.preventDefault(), e.stopPropagation();
          let t = {};
          this.checkboxes.forEach((e, n) => {
            var i;
            t[n] = null != (i = e.checked) && i;
          }),
            this.emit("submit", t);
        }
        updateCheckboxes() {
          let e = this.store.getConsents();
          this.checkboxes.forEach((t, n) => {
            !!e[n] !== t.checked && B(t, e[n]);
          });
        }
        submit() {
          U(this.element, "submit");
        }
      },
      ye = p(b()),
      ge = class extends ye.default {
        constructor(e, t) {
          super(),
            (this.selector = e),
            (this.store = t),
            y(this, "element"),
            y(this, "form"),
            y(this, "displayController"),
            y(this, "scrollableElement"),
            y(this, "disableScrollOnOpen", !1),
            y(this, "ready", !1),
            y(this, "isReady", () => this.ready),
            "complete" === document.readyState
              ? this.init()
              : window.addEventListener("load", () => this.init());
        }
        init() {
          let { banner: e, manager: t, preferences: n } = S;
          if (this.initElements())
            this.handleAccessibility(),
              this.listenEvents(),
              (this.ready = !0),
              this.emit("ready", this.element);
          else
            switch (this.selector) {
              case e:
                G.alert(
                  `No element with the ${e} attribute was found, it is required to have it!`,
                  "error"
                );
                break;
              case t:
                G.alert(
                  `No element with the ${t} attribute was found, did you want to use the Manager component?`,
                  "info"
                );
                break;
              case n:
                G.alert(
                  `No element with the ${n} attribute was found, did you want to use the Preferences component?`,
                  "info"
                );
            }
        }
        initElements() {
          this.element = q(this.selector, HTMLElement);
          let { element: e, store: t } = this;
          if (!e) return !1;
          let n = q("form", HTMLFormElement, e);
          n && (this.form = new pe(n, t));
          let i = e.getAttribute(C.displayProperty);
          (this.disableScrollOnOpen =
            "disable" === e.getAttribute(C.disableScroll)),
            this.disableScrollOnOpen &&
              (this.scrollableElement = ((e) => {
                if (N(e)) return e;
                let t = e.querySelectorAll("*");
                for (let e of t) if (N(e)) return e;
              })(e));
          let r = q(k.interactionTrigger, HTMLElement, e);
          return (
            (this.displayController = new W({
              element: e,
              interaction: r ? { element: r } : void 0,
              displayProperty: z(i, W.displayProperties) ? i : "flex",
              startsHidden: !0,
            })),
            !0
          );
        }
        handleAccessibility() {
          let { element: e } = this;
          !e ||
            H(T).forEach((t) => {
              let n = e.querySelector(T[t]);
              !n ||
                (n.setAttribute("role", "button"),
                n.setAttribute("tabindex", "0"));
            });
        }
        listenEvents() {
          let { element: e, form: t } = this;
          !e ||
            (e.addEventListener("click", (e) => this.handleMouseAndKeyboard(e)),
            e.addEventListener("keydown", (e) => this.handleMouseAndKeyboard(e)),
            null == t || t.on("submit", (e) => this.handleFormSubmit(e)));
        }
        handleMouseAndKeyboard(e) {
          var t;
          let { target: n } = e,
            { allow: i, deny: r, close: o, submit: s } = T;
          n instanceof Element &&
            (("key" in e && "Enter" !== e.key) ||
              (n.closest(i)
                ? (this.emit("allow"), this.close())
                : n.closest(r)
                ? (this.emit("deny"), this.close())
                : n.closest(o)
                ? this.close()
                : n.closest(s) && (null == (t = this.form) || t.submit())));
        }
        handleFormSubmit(e) {
          this.emit("formsubmit", e), this.close();
        }
        show(e = !0) {
          let {
            element: t,
            displayController: n,
            disableScrollOnOpen: i,
            scrollableElement: r,
          } = this;
          !t ||
            !n ||
            n.isVisible() === e ||
            (n[e ? "show" : "hide"](),
            i && (e ? ue(r || t, { reserveScrollBarGap: !0 }) : fe()),
            this.emit(e ? "open" : "close"));
        }
        open() {
          this.ready ? this.show() : this.once("ready").then(() => this.show());
        }
        close() {
          this.ready
            ? this.show(!1)
            : this.once("ready").then(() => this.show(!1));
        }
      };
    window.FsCC = new (class {
      constructor() {
        y(this, "consentController"),
          y(
            this,
            "store",
            new (class {
              constructor() {
                y(this, "mode"),
                  y(this, "cookieMaxAge"),
                  y(this, "debugMode"),
                  y(this, "endpoint"),
                  y(this, "componentsSource"),
                  y(this, "domain"),
                  y(this, "confirmed", !1),
                  y(this, "consents"),
                  y(this, "bannerText", "empty"),
                  y(this, "scripts", []),
                  y(this, "iFrames", []),
                  y(this, "userHasConfirmed", () => this.confirmed),
                  y(this, "getStoredElements", () => [
                    ...this.scripts,
                    ...this.iFrames,
                  ]),
                  y(this, "getActivableElements", () =>
                    this.getStoredElements().filter(
                      ({ active: e, categories: t }) =>
                        !e && t.every((e) => this.consents[e])
                    )
                  ),
                  y(this, "getConsents", () => this.consents),
                  y(this, "getConsentsEntries", () =>
                    ((e) => Object.entries(e))(this.consents)
                  ),
                  y(this, "getConsent", (e) => this.consents[e]),
                  y(this, "getBannerText", () => this.bannerText);
                let { currentScript: e } = document,
                  t = null == e ? void 0 : e.getAttribute(C.mode);
                switch (((this.mode = z(t, A) ? t : "opt-in"), this.mode)) {
                  case "informational":
                  case "opt-out":
                    this.consents = f({}, I);
                    break;
                  default:
                    this.consents = f({}, L);
                }
                this.cookieMaxAge = parseInt(
                  (null == e ? void 0 : e.getAttribute(C.cookieMaxAge)) || "180"
                );
                let n = null == e ? void 0 : e.getAttribute(C.debugMode);
                (this.debugMode = "" === n || "true" === n),
                  this.debugMode && G.activate(),
                  (this.endpoint =
                    null == e ? void 0 : e.getAttribute(C.endpoint)),
                  (this.componentsSource =
                    null == e ? void 0 : e.getAttribute(C.componentsSource)),
                  (this.domain = null == e ? void 0 : e.getAttribute(C.domain)),
                  G.alert(
                    `The cookie banner is set to ${
                      this.mode
                    } mode with a consent expiry time of ${
                      this.cookieMaxAge
                    } days.${
                      this.endpoint
                        ? `The consents will be POSTed to ${this.endpoint}`
                        : ""
                    }`,
                    "info"
                  );
              }
              storeScript(e) {
                this.scripts.push(m(f({}, e), { type: "script" }));
              }
              storeIFrame(e) {
                this.iFrames.push(m(f({}, e), { type: "iframe" }));
              }
              storeConsents(e) {
                let t = [];
                return (
                  H(e).forEach((n) => {
                    if ("essential" === n) return;
                    let i = e[n];
                    void 0 === i ||
                      i === this.consents[n] ||
                      ((this.consents[n] = i), t.push(n));
                  }),
                  (this.confirmed = !0),
                  t
                );
              }
              storeBannerText(e) {
                e && e.textContent && (this.bannerText = e.textContent);
              }
            })()
          ),
          y(this, "banner"),
          y(this, "preferences"),
          y(this, "manager"),
          (this.consentController = new te(this.store)),
          this.initComponents().then(() => this.init());
      }
      initComponents() {
        return g(this, null, function* () {
          let { store: e } = this,
            { componentsSource: t } = e,
            { banner: n, preferences: i, manager: r } = S;
          t &&
            (yield ((e) =>
              g(void 0, null, function* () {
                let { origin: t, pathname: n, href: i } = window.location,
                  { origin: r, pathname: o, href: s } = new URL(document.baseURI);
                try {
                  e.startsWith("/") &&
                    (e = ((e) => e.replace(/\/+$/, ""))(s === i ? t : r + o) + e);
                  let { origin: l, pathname: a } = new URL(e);
                  if (l + a === t + n) return;
                  let c = yield (yield fetch(e)).text(),
                    d = new DOMParser().parseFromString(c, "text/html");
                  Object.values(S).forEach((e) => {
                    let t = d.querySelector(e);
                    t && document.body.appendChild(t);
                  }),
                    J();
                } catch (e) {
                  G.alert(`${e}`, "error");
                }
              }))(t)),
            (this.banner = new ge(n, e)),
            (this.preferences = new ge(i, e)),
            (this.manager = new ge(r, e));
        });
      }
      init() {
        let { store: e, manager: t, banner: n } = this;
        document.head.insertAdjacentHTML("beforeend", M),
          !/bot|crawler|spider|crawling/i.test(navigator.userAgent) &&
            (e.userHasConfirmed() ? t.open() : n.open(), this.listenEvents());
      }
      listenEvents() {
        let { allow: e, deny: t, submit: n } = $,
          i = ["banner", "manager", "preferences"],
          { store: r, consentController: o, banner: s, manager: l } = this;
        document.addEventListener("click", (e) => this.handleMouseAndKeyboard(e)),
          document.addEventListener("keydown", (e) =>
            this.handleMouseAndKeyboard(e)
          ),
          s.isReady()
            ? r.storeBannerText(s.element)
            : s.on("ready", (e) => r.storeBannerText(e)),
          o.on("updateconsents", () => {
            i.forEach((e) => {
              var t;
              return null == (t = this[e].form) ? void 0 : t.updateCheckboxes();
            });
          }),
          i.forEach((i) => {
            this[i].on("allow", () => {
              G.alert(`Allow button was clicked in the ${i} component.`, "info"),
                o.updateConsents(I, e);
            }),
              this[i].on("deny", () => {
                G.alert(`Deny button was clicked in the ${i} component.`, "info"),
                  o.updateConsents(L, t);
              }),
              this[i].on("formsubmit", (e) => {
                G.alert(
                  `Consents Form was submitted in the ${i} component with the following consents: ${JSON.stringify(
                    e
                  )}`,
                  "info"
                ),
                  o.updateConsents(e, n);
              }),
              "manager" !== i &&
                this[i].on("close", () => {
                  G.alert(`The ${i} component was closed.`, "info"),
                    "informational" === r.mode &&
                      (G.alert(
                        `All cookies were accepted because the mode is set to ${r.mode}.`,
                        "warning"
                      ),
                      o.updateConsents(I, e)),
                    l.open();
                });
          });
      }
      handleMouseAndKeyboard(e) {
        let { target: t } = e,
          { banner: n, manager: i, preferences: r } = this;
        t instanceof Element &&
          (("key" in e && "Enter" !== e.key) ||
            (t.closest(T.openPreferences) &&
              (n.close(),
              i.close(),
              r.open(),
              G.alert("Open Preferences button was clicked.", "info"))));
      }
    })();
  })();
  /*! js-cookie v3.0.1 | MIT */
  