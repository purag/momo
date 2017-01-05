// easing functions
module.exports = {
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
