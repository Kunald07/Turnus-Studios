gsap.registerPlugin(ScrollTrigger),
  ScrollTrigger.defaults({ markers: !1 }),
  ScrollTrigger.matchMedia({
    "(min-width: 960px)": function () {
      $(".portfolio-grid").each(function (e) {
        let t = $(this),
          o = $(".collection-project-item");
        gsap
          .timeline({
            scrollTrigger: { trigger: t, start: "top 90%", end: "top 20%" },
          })
          .from(o, {
            y: "100%",
            duration: 1,
            ease: "power1.inOut",
            stagger: { each: 0.4 },
          });
      });
    },
  }),
  $(".projects-button").each(function (e) {
    let t = gsap.timeline({ paused: !0 });
    t
      .set($(this).find(".projects-button"), { display: "block" })
      .to($(this).find(".button-project-icon"), {
        x: "50%",
        ease: "power2.inOut",
        backgroundColor: "#033f2e",
        color: "#ffffff",
      })
      .to(
        $(this).find(".project-button-text"),
        { ease: "power2.inOut", backgroundColor: "#033f2e", color: "#ffffff" },
        0
      ),
      $(this).on("mouseenter", function () {
        t.timeScale(1), t.restart();
      }),
      $(this).on("mouseleave", function () {
        t.timeScale(3), t.reverse();
      });
  }),
  ScrollTrigger.matchMedia({
    "(min-width: 960px)": function () {
      $(".section-portfolio-services").each(function (e) {
        let t = $(this),
          o = $(".services-elements");
        gsap
          .timeline({
            scrollTrigger: {
              trigger: t,
              start: "center bottom",
              end: "top top",
              duration: 2,
              scrub: 1,
              ease: "SlowMo.easeInOut",
            },
          })
          .from(o, {
            y: "100%",
            ease: "back.out(2)",
            opacity: 0,
            stagger: { amount: 1 },
            ase: "SlowMo.easeInOut",
          });
      });
    },
  });
