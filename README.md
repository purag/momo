# momo
A super lightweight animation library for JavaScript.

## Usage
```
momo({
  el:           "span",             // what to animate
  dur:          1000,               // default: 1000
  ease:         "easeInOutQuint",   // default: linear

  marginLeft:   "50px",             // units are necessary
  marginTop:    "15vh",
  width:        "100px",
  height:       "100px",
  borderWidth:  "12px",
  opacity:      0.8
});
```

### A note on units
momo will automatically use whatever units you specify when calling the `momo()` function. For instance, in the example above, when animating the height of the `span` element, momo will automatically append `vh` as the unit.

momo doesn't work when you don't specify units where necessary (it doesn't default to pixels).

## Why "momo?"
momo helps you get **mo**re **mo**tion on your page.
