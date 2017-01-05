"use strict";
let easing = require("./easing");

module.exports = o => {
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

  return new Promise(resolve => {
    // actually do the animation now
    anim = setInterval(_ => {
      // how far along are we? (according to the easing function)
      let progress    = ease(Math.min(elapsed / duration, 1));

      // animate each of the CSS properties
      for (var prop in o) {
        let newVal    = o[prop].start + (progress * (o[prop].end - o[prop].start));
        e.style[prop] = newVal + o[prop].units;
      }

      // finish up when necessary and resolve the promise
      if (elapsed >= duration) {
        clearInterval(anim);
        resolve();
      }
      elapsed += step;
    }, step);
  });
};
