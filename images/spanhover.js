$(".about_section").each(function (e) {
  let t = $(this).find(".about_heading"),
    o = $(this).find(".about_span"),
    a = $(this).find(".about_item");
  o.each(function (e) {
    let s = a.eq(e).find(".about_image");
    $(".about_image").each(function (e) {
      let t = [-10, 0, 10],
        o = t[Math.floor(Math.random() * t.length)];
      if (e > 0) {
        let a = parseInt(
          $(".about_image")
            .eq(e - 1)
            .css("margin-top")
        );
        for (; o === a; ) o = t[Math.floor(Math.random() * t.length)];
      }
      if (
        ($(this).css("margin-top", o + "%"), e < $(".about_image").length - 1)
      ) {
        let a = parseInt(
          $(".about_image")
            .eq(e + 1)
            .css("margin-top")
        );
        for (; o === a; )
          (o = t[Math.floor(Math.random() * t.length)]),
            $(this).css("margin-top", o + "%");
      }
    });
    let i = o.not($(this));
    gsap.matchMedia().add("(min-width: 320px)", () => {
      let e = gsap.timeline({ paused: !0, defaults: { duration: 0.2 } });
      e.set($(this), { zIndex: 3 }),
        e.to(s, { opacity: 1, scale: 1, ease: "power4.out" }),
        e.fromTo(
          t,
          { color: "white" },
          { color: "rgba(255, 255, 255, 0.2)" },
          "<"
        ),
        e.fromTo(
          i,
          { color: "#cdea68" },
          { color: "rgba(255, 255, 255, 0.2)" },
          "<"
        ),
        $(this).on("mouseenter touchstart", function () {
          e.timeScale(1), e.play();
        }),
        $(this).on("mouseleave touchend", function () {
          e.timeScale(2), e.reverse();
        });
    });
  });
}),
  window.addEventListener("DOMContentLoaded", (e) => {
    function t(e, t) {
      const o = typeof e;
      return "string" != typeof t || "" === t.trim()
        ? e
        : ("true" === t && "boolean" === o) ||
            (("false" !== t || "boolean" !== o) &&
              (isNaN(t) && "string" === o
                ? t
                : isNaN(t) || "number" !== o
                ? e
                : +t));
    }
    $("[js-attribute-element='component']").each(function (e) {
      let o = $(this),
        a = o.find("[js-attribute-element='child']"),
        s = t(200, o.attr("js-attribute-number"));
      a.text(s);
    }),
      $("[js-toggleclass-element='component']").each(function (e) {
        let o = $(this),
          a = o.find("[js-toggleclass-element='trigger']"),
          s = o.find("[js-toggleclass-element='target']"),
          i = t("is-active", o.attr("js-toggleclass-activeclass")),
          r = t(!1, o.attr("js-toggleclass-activeload")),
          n = t(0, o.attr("js-toggleclass-activeindex")),
          l = t(!1, o.attr("js-toggleclass-hoverin")),
          c = t(!1, o.attr("js-toggleclass-hoverout"));
        function m() {
          a.removeClass(i), s.removeClass(i);
        }
        function u(e) {
          e.addClass(i), s.eq(e.index()).addClass(i);
        }
        a.on("click", function () {
          m(), u($(this));
        }),
          r && u(a.eq(n)),
          l &&
            a.on("mouseenter", function () {
              m(), u($(this));
            }),
          c &&
            a.on("mouseleave", function () {
              m();
            });
      });
  }),
  window.addEventListener("DOMContentLoaded", (e) => {
    function t(e, t) {
      const o = typeof e;
      return "string" != typeof t || "" === t.trim()
        ? e
        : ("true" === t && "boolean" === o) ||
            (("false" !== t || "boolean" !== o) &&
              (isNaN(t) && "string" === o
                ? t
                : isNaN(t) || "number" !== o
                ? e
                : +t));
    }
    $("[tr-marquee-element='component']").each(function (e) {
      let o = $(this),
        a = o.find("[tr-marquee-element='panel']"),
        s = o.find("[tr-marquee-element='triggerhover']"),
        i = o.find("[tr-marquee-element='triggerclick']"),
        r = t(100, o.attr("tr-marquee-speed")),
        n = t(!1, o.attr("tr-marquee-vertical")),
        l = t(!1, o.attr("tr-marquee-reverse")),
        c = t(!1, o.attr("tr-marquee-scrolldirection")),
        m = t(!1, o.attr("tr-marquee-scrollscrub")),
        u = -100,
        g = 1,
        d = !1;
      l && (u = 100);
      let f = gsap.timeline({
        repeat: -1,
        onReverseComplete: () => f.progress(1),
      });
      n
        ? ((r = a.first().height() / r),
          f.fromTo(
            a,
            { yPercent: 0 },
            { yPercent: u, ease: "none", duration: r }
          ))
        : ((r = a.first().width() / r),
          f.fromTo(
            a,
            { xPercent: 0 },
            { xPercent: u, ease: "none", duration: r }
          ));
      let h = { value: 1 };
      function p(e) {
        d = e;
        let t = { value: 1 },
          o = gsap.timeline({ onUpdate: () => f.timeScale(t.value) });
        e
          ? (o.fromTo(t, { value: g }, { value: 0, duration: 0.5 }),
            i.addClass("is-paused"))
          : (o.fromTo(t, { value: 0 }, { value: g, duration: 0.5 }),
            i.removeClass("is-paused"));
      }
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (e) => {
          if (
            !d &&
            (c &&
              g !== e.direction &&
              ((g = e.direction), f.timeScale(e.direction)),
            m)
          ) {
            let t = 0.006 * e.getVelocity();
            (t = gsap.utils.clamp(-60, 60, t)),
              gsap
                .timeline({ onUpdate: () => f.timeScale(h.value) })
                .fromTo(h, { value: t }, { value: g, duration: 0.5 });
          }
        },
      }),
        window.matchMedia("(pointer: fine)").matches &&
          (s.on("mouseenter", () => p(!0)), s.on("mouseleave", () => p(!1))),
        i.on("click", function () {
          $(this).hasClass("is-paused") ? p(!1) : p(!0);
        });
    });
  }),
  $(".home-scroll_section").each(function (e) {
    let t = $(this).find(".home-scroll_text-item"),
      o = $(this).find(".home-scroll_img-item");
    function a(e) {
      t.removeClass("is-active"),
        o.removeClass("is-active"),
        t.eq(e).addClass("is-active"),
        o.eq(e).addClass("is-active");
    }
    a(0),
      t.each(function (e) {
        ScrollTrigger.create({
          trigger: $(this),
          start: "top center",
          end: "bottom center",
          onToggle: (t) => {
            t && a(e);
          },
        });
      });
  }),
  $(".home-scroll_section").each(function (e) {
    let t = $(this).find(".home-scroll_text-item"),
      o = $(this).find(".home-scroll_img-item");
    function a(e) {
      t.removeClass("is-active"),
        o.removeClass("is-active"),
        t.eq(e).addClass("is-active"),
        o.eq(e).addClass("is-active");
    }
    a(0),
      t.each(function (e) {
        ScrollTrigger.create({
          trigger: $(this),
          start: "top center",
          end: "bottom center",
          onToggle: (t) => {
            t && a(e);
          },
        });
      });
  }),
  gsap.defaults({ ease: "power4.inOut" }),
  gsap.set(".subscription-works_item", { y: 300 }),
  ScrollTrigger.batch(".subscription-works_item", {
    start: "top 80%",
    onEnter: (e) =>
      gsap.to(e, {
        opacity: 1,
        y: 0,
        ease: "Power4.easeOut",
        stagger: { each: 0.15, grid: [1, 3] },
        overwrite: !0,
      }),
    onLeave: (e) =>
      gsap.set(e, {
        opacity: 1,
        ease: "Power4.easeOut",
        y: "0",
        overwrite: !0,
      }),
    onEnterBack: (e) =>
      gsap.to(e, {
        opacity: 1,
        y: 0,
        ease: "Power4.easeOut",
        stagger: 0,
        overwrite: !0,
      }),
    onLeaveBack: (e) =>
      gsap.set(e, {
        opacity: 1,
        y: "0%",
        ease: "Power4.easeOut",
        stagger: 0,
        overwrite: !0,
      }),
  }),
  ScrollTrigger.addEventListener("refreshInit", () =>
    gsap.set(".subscription-works_item", { y: 0 })
  ),
  $(".wg-selector-2.s2").on("click", function () {
    $(".wg-selector-2.s2").removeClass("is-active"),
      $(".wg-selector-2.s1").addClass("is-active");
  }),
  $(".wg-selector-2.s1").on("click", function () {
    $(".wg-selector-2.s1").removeClass("is-active"),
      $(".wg-selector-2.s2").addClass("is-active");
  });
