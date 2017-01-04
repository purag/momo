"use strict";

let momo = o => {
  // easing functions
  let easing = {
    linear:         t => t,
    easeInQuad:     t => t*t,
    easeInCubic:    t => t*t*t,
    easeInQuint:    t => t*t*t*t,
    easeOutQuad:    t => 1 - easing.easeInQuad(1 - t),
    easeOutCubic:   t => 1 - easing.easeInCubic(1 - t),
    easeOutQuint:   t => 1 - easing.easeInQuint(1 - t),
    easeInOutQuad:  t => t < .5 ? easing.easeInQuad(t * 2) / 2 : 1 - easing.easeInQuad((1 - t) * 2) / 2,
    easeInOutCubic: t => t < .5 ? easing.easeInCubic(t * 2) / 2 : 1 - easing.easeInCubic((1 - t) * 2) / 2,
    easeInOutQuint: t => t < .5 ? easing.easeInQuint(t * 2) / 2 : 1 - easing.easeInQuint((1 - t) * 2) / 2,
    easeOutElastic: t => Math.pow(2, -10 * t) * Math.sin((t - 0.3 / 4) * (2 * Math.PI) / 0.3) + 1
  };

  // grab the animation properties
  let e             = document.querySelector(o.el),
      duration      = o.dur || 1000,
      ease          = o.ease ? easing[o.ease] : easing["linear"];

  // and remove them so we can iterate over just the CSS properties later
  delete o.el;
  delete o.dur;
  delete o.ease;

  // animation helpers
  let startStyle    = Object.assign({}, window.getComputedStyle(e)),
    elapsed         = 0,
    step            = 13,
    anim;

  // prep each property to be animated
  for (var prop in o) {
    o[prop] = {
      start:        parseFloat(startStyle[prop]),
      end:          parseFloat(o[prop]),
      units:        o[prop].match ? o[prop].match(/[a-z]+/)[0] : 0
    };
  }

  // actually do the animation now
  anim = setInterval(_ => {
    // how far along are we? (according to the easing function)
    let progress    = ease(Math.min(elapsed / duration, 1));

    // animate each of the CSS properties
    for (var prop in o) {
      let newVal    = o[prop].start + (progress * (o[prop].end - o[prop].start));
      e.style[prop] = newVal + o[prop].units;
    }

    // finish up when necessary
    if (elapsed >= duration) clearInterval(anim);
    elapsed += step;
  }, step);
};
