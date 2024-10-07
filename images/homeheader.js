gsap.registerPlugin(ScrollTrigger),
  ScrollTrigger.defaults({ markers: !1 }),
  ScrollTrigger.matchMedia({
    "(min-width: 960px)": function () {
      $(".hero").each(function (r) {
        let i = $(this),
          e = $(".hero-img");
        gsap
          .timeline({
            scrollTrigger: {
              trigger: i,
              start: "top top",
              end: "bottom+=1vh",
              transformOrigin: "top",
              ease: "sine.out",
              duration: 1,
              scrub: !0,
              pin: !0,
              pinSpacing: !1,
              invalidateOnRefresh: !0,
              scrub: 0.1,
            },
          })
          .to(e, { height: 0, padding: "10" });
      });
    },
  });
