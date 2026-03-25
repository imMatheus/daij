# distortion

11 functions

---

## `shape`

**Tags:** `distortion`, `superdough`

(Deprecated) Wave shaping distortion. WARNING: can suddenly get unpredictably loud.
Please use distort instead, which has a more predictable response curve
second option in optional array syntax (ex: ".9:.5") applies a postgain to the output

**Parameters:**

- `distortion` : `number | Pattern` — between 0 and 1

**Examples:**

```js
s("bd sd [~ bd] sd,hh*8").shape("<0 .2 .4 .6 .8>")
```

---

## `distort`

**Tags:** `distortion`, `superdough`, `supradough`
**Synonyms:** `dist`

Wave shaping distortion. CAUTION: it can get loud.
Second option in optional array syntax (ex: ".9:.5") applies a postgain to the output. Third option sets the waveshaping type.
Most useful values are usually between 0 and 10 (depending on source gain). If you are feeling adventurous, you can turn it up to 11 and beyond ;)

**Parameters:**

- `distortion` : `number | Pattern` — amount of distortion to apply
- `volume` : `number | Pattern` — linear postgain of the distortion
- `type` : `number | string | Pattern` — type of distortion to apply

**Examples:**

```js
s("bd sd [~ bd] sd,hh*8").distort("<0 2 3 10:.5>")
```

```js
note("d1!8").s("sine").penv(36).pdecay(.12).decay(.23).distort("8:.4")
```

```js
s("bd:4*4").bank("tr808").distort("3:0.5:diode")
```

---

## `distorttype`

**Tags:** `distortion`, `superdough`, `supradough`
**Synonyms:** `disttype`

Type of waveshaping distortion to apply.

**Parameters:**

- `type` : `number | string | Pattern` — type of distortion to apply

**Examples:**

```js
s("bd*4").bank("tr909").distort(2).distorttype("<0 1 2>")
```

```js
s("sine").note("F1*2").release(1)
  .penv(24).pdecay(0.05)
  .distort(rand.range(1, 8))
  .distorttype("<fold chebyshev scurve diode asym sinefold>")
```

---

## `soft`

**Tags:** `distortion`, `superdough`

Soft-clipping distortion

**Parameters:**

- `distortion` : `number | Pattern` — amount of distortion to apply
- `volume` : `number | Pattern` — linear postgain of the distortion

---

## `hard`

**Tags:** `distortion`, `superdough`

Hard-clipping distortion

**Parameters:**

- `distortion` : `number | Pattern` — amount of distortion to apply
- `volume` : `number | Pattern` — linear postgain of the distortion

---

## `cubic`

**Tags:** `distortion`, `superdough`

Cubic polynomial distortion

**Parameters:**

- `distortion` : `number | Pattern` — amount of distortion to apply
- `volume` : `number | Pattern` — linear postgain of the distortion

---

## `diode`

**Tags:** `distortion`, `superdough`

Diode-emulating distortion

**Parameters:**

- `distortion` : `number | Pattern` — amount of distortion to apply
- `volume` : `number | Pattern` — linear postgain of the distortion

---

## `asym`

**Tags:** `distortion`, `superdough`

Asymmetrical diode distortion

**Parameters:**

- `distortion` : `number | Pattern` — amount of distortion to apply
- `volume` : `number | Pattern` — linear postgain of the distortion

---

## `fold`

**Tags:** `distortion`, `superdough`

Wavefolding distortion

**Parameters:**

- `distortion` : `number | Pattern` — amount of distortion to apply
- `volume` : `number | Pattern` — linear postgain of the distortion

---

## `sinefold`

**Tags:** `distortion`, `superdough`

Wavefolding distortion composed with sinusoid

**Parameters:**

- `distortion` : `number | Pattern` — amount of distortion to apply
- `volume` : `number | Pattern` — linear postgain of the distortion

---

## `chebyshev`

**Tags:** `distortion`, `superdough`

Distortion via Chebyshev polynomials

**Parameters:**

- `distortion` : `number | Pattern` — amount of distortion to apply
- `volume` : `number | Pattern` — linear postgain of the distortion
