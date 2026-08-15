/* The Ramnik Group — progressive enhancement only.
   The site is fully readable and navigable with this file absent. */

(function () {
  "use strict";

  /* Mobile navigation ---------------------------------------------------- */

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });

    // Reset state when the layout returns to the desktop breakpoint.
    var desktop = window.matchMedia("(min-width: 861px)");
    var onChange = function (event) {
      if (event.matches) setOpen(false);
    };
    if (desktop.addEventListener) desktop.addEventListener("change", onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  /* Header border once the page scrolls ---------------------------------- */

  var header = document.querySelector(".site-header");

  if (header) {
    var sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;height:1px;width:1px;";
    document.body.prepend(sentinel);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        header.classList.toggle("is-stuck", !entries[0].isIntersecting);
      }).observe(sentinel);
    }
  }

  /* Centre wide figures that scroll -------------------------------------- */

  /* The trade map is wider than a phone screen and lives in a scroll box. Left-
     aligned it opens on the Atlantic; the subject is Balaghat, in the middle. */
  document.querySelectorAll(".figure-scroll").forEach(function (box) {
    var centre = function () {
      var over = box.scrollWidth - box.clientWidth;
      if (over > 0) box.scrollLeft = over / 2;
    };
    centre();
    var img = box.querySelector("img");
    if (img && !img.complete) img.addEventListener("load", centre);
  });

  /* Reveal on scroll ------------------------------------------------------ */

  var revealables = document.querySelectorAll(".reveal");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!revealables.length) return;

  if (!("IntersectionObserver" in window) || reducedMotion.matches) {
    revealables.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
  );

  revealables.forEach(function (el) {
    observer.observe(el);
  });
})();
