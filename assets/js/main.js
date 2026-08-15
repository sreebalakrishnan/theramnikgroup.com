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

  /* Enquiry form ---------------------------------------------------------- */

  /* Interim behaviour while the site has no backend: compose the enquiry in the
     sender's own mail app. The form's own action is a bare mailto, which works
     without this script but produces an ugly, machine-looking body; this builds
     a readable one and puts the grade and quantity in the subject line, which is
     what gets read first. */

  var enquiry = document.querySelector("form[data-mailto]");

  if (enquiry) {
    enquiry.addEventListener("submit", function (event) {
      event.preventDefault();

      var value = function (name) {
        var el = enquiry.elements[name];
        return el && el.value ? el.value.trim() : "";
      };

      var subject = value("subject") || "Enquiry";
      var quantity = value("quantity");
      if (quantity) subject += " — " + quantity;

      var lines = [
        ["Name", value("name")],
        ["Company", value("company")],
        ["Country", value("country")],
        ["Email", value("email")],
        ["Enquiry", value("subject")],
        ["Grade & quantity", quantity],
      ]
        .filter(function (pair) {
          return pair[1];
        })
        .map(function (pair) {
          return pair[0] + ": " + pair[1];
        });

      var message = value("message");
      if (message) lines.push("", message);

      var href =
        "mailto:" +
        enquiry.getAttribute("data-mailto") +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));

      // Tell the reader what just happened. A mail app opening in another window
      // is easy to miss, and silence is what made the old form untrustworthy.
      var note = document.getElementById("form-note");
      if (note) {
        note.textContent =
          "Your email app should now be open with this enquiry ready to send. " +
          "If nothing happened, write to " +
          enquiry.getAttribute("data-mailto") +
          " directly.";
      }

      window.location.href = href;
    });
  }

  /* Gallery lightbox ------------------------------------------------------ */

  /* Each thumbnail is a real link to the full-size photograph, so with this
     file absent clicking one still shows the picture — it just loads the image
     on its own instead of opening an overlay. */

  var shots = document.querySelectorAll(".shot > a");

  if (shots.length) {
    /* Built here rather than shipped as empty markup: an <img> with no src in
       the document is a broken image until the moment it is opened. */
    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.id = "lightbox";
    lightbox.hidden = true;
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Photograph");
    lightbox.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Close">×</button>' +
      '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous photograph">‹</button>' +
      '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next photograph">›</button>' +
      '<figure class="lightbox__figure"><img alt=""><figcaption></figcaption></figure>';

    var lbImg = lightbox.querySelector("img");
    var lbCaption = lightbox.querySelector("figcaption");
    var lbClose = lightbox.querySelector(".lightbox__close");
    var lbPrev = lightbox.querySelector(".lightbox__nav--prev");
    var lbNext = lightbox.querySelector(".lightbox__nav--next");
    var links = Array.prototype.slice.call(shots);
    var current = -1;
    var lastFocused = null;

    var show = function (index) {
      current = (index + links.length) % links.length;
      var link = links[current];
      var thumb = link.querySelector("img");
      var caption = link.parentNode.querySelector("figcaption");
      lbImg.src = link.getAttribute("href");
      lbImg.alt = thumb ? thumb.getAttribute("alt") || "" : "";
      lbCaption.textContent = caption ? caption.textContent.trim() : "";
    };

    var attached = false;

    var open = function (index) {
      // Kept out of the document until it is wanted, so the page never carries a
      // srcless <img> around with it.
      if (!attached) {
        document.body.appendChild(lightbox);
        attached = true;
      }
      lastFocused = document.activeElement;
      show(index);
      lightbox.hidden = false;
      document.body.classList.add("is-lightboxed");
      lbClose.focus();
    };

    var close = function () {
      lightbox.hidden = true;
      document.body.classList.remove("is-lightboxed");
      // Release the full-size image rather than leave it decoded in memory.
      lbImg.removeAttribute("src");
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    };

    links.forEach(function (link, index) {
      link.addEventListener("click", function (event) {
        // Leave modified clicks alone so "open in new tab" still works.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        open(index);
      });
    });

    lbClose.addEventListener("click", close);
    lbPrev.addEventListener("click", function () {
      show(current - 1);
    });
    lbNext.addEventListener("click", function () {
      show(current + 1);
    });

    // Backdrop only: clicks on the picture or the buttons must not dismiss it.
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) close();
    });

    document.addEventListener("keydown", function (event) {
      if (lightbox.hidden) return;
      if (event.key === "Escape") close();
      else if (event.key === "ArrowLeft") show(current - 1);
      else if (event.key === "ArrowRight") show(current + 1);
      else if (event.key === "Tab") {
        // Keep focus inside the dialog while it is open.
        var focusable = [lbClose, lbPrev, lbNext];
        var at = focusable.indexOf(document.activeElement);
        var next = event.shiftKey ? at - 1 : at + 1;
        if (at === -1 || next < 0 || next >= focusable.length) {
          event.preventDefault();
          focusable[event.shiftKey ? focusable.length - 1 : 0].focus();
        }
      }
    });
  }

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
