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
  opacity:      0.8,
});
```

### A note on units
momo will automatically use whatever units you specify when calling the `momo()` function. For instance, in the example above, when animating the height of the `span` element, momo will automatically append `vh` as the unit.

momo doesn't work when you don't specify units where necessary (it doesn't default to pixels).

### What can I animate?
momo currently supports basic CSS properties that have a single numeric value (it handles units like `px`, `em`, etc).

momo also supports a few non-CSS properties that it's common to animate:

* `scrollTop`

### Promises
`momo()` returns a Promise, so you can execute code upon completion of an animation using `.then()`:

```
momo({
  // ...
}).then(() => {
  console.log("finished animating");
});
```

You can also chain animations by calling `momo()` again and rereturning the promise:

```
momo({
  // ...
}).then(() => {
  return momo({
    // ...
  });
}).then(() => {
  console.log("finished animating");
});
```

## Why "momo?"
momo helps you get **mo**re **mo**tion on your page.
