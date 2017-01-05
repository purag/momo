"use strict";
let easing = require("./easing");

module.exports = o => {
  let nonCSS = [
    "scrollTop"
  ];

  // grab the animation properties
  let e             = document.querySelector(o.el),
      duration      = o.dur || 1000,
      ease          = o.ease ? easing[o.ease] : easing["linear"];

  // and remove them so we can iterate over just the CSS properties later
  delete o.el;
  delete o.dur;
  delete o.ease;

  // grab the computed styles before the animatino starts
  let startStyle    = window.getComputedStyle(e);

  // prep each property to be animated
  for (var prop in o) {
    o[prop] = {
      start:        parseFloat(nonCSS.indexOf(prop) >= 0 ? e[prop] : startStyle[prop]),
      end:          parseFloat(o[prop]),
      units:        o[prop].match ? o[prop].match(/[a-z]+/)[0] : 0
    };
  }

  return new Promise(resolve => {
    let startTime;

    // actually do the animation now
    let anim = curTime => {
      if (!startTime) startTime = curTime;
      let elapsed = curTime - startTime;

      // how far along are we? (according to the easing function)
      let progress = ease(Math.min(elapsed / duration, 1));

      // animate each of the CSS properties
      for (var prop in o) {
        let newVal = o[prop].start + (progress * (o[prop].end - o[prop].start));
        if (nonCSS.indexOf(prop) >= 0) {
          e[prop] = newVal + o[prop].units;
        } else {
          e.style[prop] = newVal + o[prop].units;
        }
      }

      // resolve the promise when we're done
      if (elapsed >= duration) return resolve();
      window.requestAnimationFrame(anim);
    };
    window.requestAnimationFrame(anim);
  });
};
