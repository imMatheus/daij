# generators

34 functions

---

## `noise`

**Tags:** `generators`, `superdough`, `supradough`

Adds pink noise to the mix

**Parameters:**

- `wet` : `number | Pattern` — wet amount

**Examples:**

```js
sound("<white pink brown>/2")
```

---

## `gap`

**Tags:** `generators`

Does absolutely nothing, but with a given metrical 'steps'

**Parameters:**

- `steps` : `number`

**Examples:**

```js
gap(3) // "~@3"
```

---

## `silence`

**Tags:** `generators`

Does absolutely nothing..

**Examples:**

```js
silence // "~"
```

---

## `pure`

**Tags:** `generators`

A discrete value that repeats once per cycle.

**Examples:**

```js
pure('e4') // "e4"
```

---

## `K`

**Tags:** `generators`, `superdough`

Produces a Kabelsalat modular sound engine.
This can be used as either an effect (by including audioin() at the beginning
of your kabel expression) or as a sound source (via any expression which doesn't
start with audioin()).
Some helpers you have available to you:

Strudel mini notation works fine in K(..) via "" or ``
More complex Strudel expressions (like "0 1 2".fast(4) or irand(24)) can be
written by wrapping them in S(..) inside your Kabel code
We expose Strudel's note frequency under sFreq and Strudel's gate
information under sGate
You can use more complex multi-line expressions (like let x = a; let y = b; x.lpf(y);)
by wrapping them inside a function in K (see example).

**Parameters:**

- `expr` : `KabelsalatExpression | function` — Kabelsalat graph definition

**Examples:**

```js
note("A c e".fast(4)).transpose("<0 2 4 6 8>")
  .scale("F:minor").transpose("12")
  .s("saw")
  .K(
    // audioin().mul(sGate.adsr(0.001, 0.3, 0, 0.2)) // as effect
    saw(saw(sFreq / "2!3 16").mul(8).add(sFreq).lag("0!3 0.1")).mul(0.3) // as source
    .mul(sGate.adsr(0, 0.15, 0.5, "0.1!3 1"))
    .lpf(sGate.adsr(0, 0.2, 0.3, 0.2).mul(1).add(0))
    .add(x => x.delay(S("0.3 0.2".fast(2))).mul(0.7))
    .add(x => x.delay("0.03 [0.08 0.01] 0.01 0.013").mul(0.77)).mul(0.7)
    .add(x => x.delay(.13).mul(0.7))
    .out()
  )
```

```js
n("<0 1 <2 3 2 4>>*16")
  .scale("G#2:minor").sometimes(x => x.transpose("12 | 24"))
  .K(() => {
    const att = S(rand.range(0, 0.05))
    const dec = S(rand.range(0.05, 0.2))
    let f = n(sFreq);
    const mod = sine(f).mul("0.1 | 0.2 | 0.3")
      .add("[[1.5 1] | 1 | 2 | 4 | [6 4@3]]*2")
    saw(f.mul(mod))
    .mul(sGate.ad(att, dec))
    .add(x => x.delay(0.4).mul(0.3))
    .out()
  }).fxr(1).room(0.3)
```

---

## `saw`

**Tags:** `generators`

A sawtooth signal between 0 and 1.

**Examples:**

```js
note("<c3 [eb3,g3] g2 [g3,bb3]>*8")
.clip(saw.slow(2))
```

```js
n(saw.range(0,8).segment(8))
.scale('C major')
```

---

## `saw2`

**Tags:** `generators`

A sawtooth signal between -1 and 1 (like saw, but bipolar).

---

## `isaw`

**Tags:** `generators`

A sawtooth signal between 1 and 0 (like saw, but flipped).

**Examples:**

```js
note("<c3 [eb3,g3] g2 [g3,bb3]>*8")
.clip(isaw.slow(2))
```

```js
n(isaw.range(0,8).segment(8))
.scale('C major')
```

---

## `isaw2`

**Tags:** `generators`

A sawtooth signal between 1 and -1 (like saw2, but flipped).

---

## `sine2`

**Tags:** `generators`

A sine signal between -1 and 1 (like sine, but bipolar).

---

## `sine`

**Tags:** `generators`

A sine signal between 0 and 1.

**Examples:**

```js
n(sine.segment(16).range(0,15))
.scale("C:minor")
```

---

## `cosine`

**Tags:** `generators`

A cosine signal between 0 and 1.

**Examples:**

```js
n(stack(sine,cosine).segment(16).range(0,15))
.scale("C:minor")
```

---

## `cosine2`

**Tags:** `generators`

A cosine signal between -1 and 1 (like cosine, but bipolar).

---

## `square`

**Tags:** `generators`

A square signal between 0 and 1.

**Examples:**

```js
n(square.segment(4).range(0,7)).scale("C:minor")
```

---

## `square2`

**Tags:** `generators`

A square signal between -1 and 1 (like square, but bipolar).

---

## `tri`

**Tags:** `generators`

A triangle signal between 0 and 1.

**Examples:**

```js
n(tri.segment(8).range(0,7)).scale("C:minor")
```

---

## `tri2`

**Tags:** `generators`

A triangle signal between -1 and 1 (like tri, but bipolar).

---

## `itri`

**Tags:** `generators`

An inverted triangle signal between 1 and 0 (like tri, but flipped).

**Examples:**

```js
n(itri.segment(8).range(0,7)).scale("C:minor")
```

---

## `itri2`

**Tags:** `generators`

An inverted triangle signal between -1 and 1 (like itri, but bipolar).

---

## `time`

**Tags:** `generators`

A signal representing the cycle time.

---

## `useRNG`

**Tags:** `generators`, `math`

Sets which random number generator to use. Historically Strudel would
use useRNG('legacy'), which remains the default. To use a new more statistically
precise RNG, try useRNG('precise').

**Parameters:**

- `mod` : `string` — Mode. One of 'legacy', 'precise'

**Examples:**

```js
useRNG('legacy')
// Repeats every 300 cycles
$: n(irand(50)).seg(16).scale("C:minor").ribbon(88, 32)
$: n(irand(50)).seg(16).scale("C:minor").ribbon(388, 32)
```

---

## `run`

**Tags:** `generators`

A discrete pattern of numbers from 0 to n-1

**Examples:**

```js
n(run(4)).scale("C4:pentatonic")
// n("0 1 2 3").scale("C4:pentatonic")
```

---

## `binary`

**Tags:** `generators`

Creates a binary pattern from a number.

**Parameters:**

- `n` : `number` — input number to convert to binary

**Examples:**

```js
"hh".s().struct(binary(5))
// "hh".s().struct("1 0 1")
```

---

## `binaryN`

**Tags:** `generators`

Creates a binary pattern from a number, padded to n bits long.

**Parameters:**

- `n` : `number` — input number to convert to binary
- `nBits` : `number` — pattern length, defaults to 16

**Examples:**

```js
"hh".s().struct(binaryN(55532, 16))
// "hh".s().struct("1 1 0 1 1 0 0 0 1 1 1 0 1 1 0 0")
```

---

## `binaryL`

**Tags:** `generators`

Creates a binary list pattern from a number.

**Parameters:**

- `n` : `number` — input number to convert to binary
s("saw").seg(8)
.partials(binaryL(irand(4096).add(1)))

---

## `binaryNL`

**Tags:** `generators`

Creates a binary list pattern from a number, padded to n bits long.

**Parameters:**

- `n` : `number` — input number to convert to binary
- `nBits` : `number` — pattern length, defaults to 16

---

## `randL`

**Tags:** `generators`

Creates a list of random numbers of the given length

**Parameters:**

- `n` : `number` — Number of random numbers to sample

**Examples:**

```js
s("saw").seg(16).n(irand(12)).scale("F1:minor")
  .partials(randL(8))
```

---

## `rand`

**Tags:** `generators`

A continuous pattern of random numbers, between 0 and 1.

**Examples:**

```js
// randomly change the cutoff
s("bd*4,hh*8").cutoff(rand.range(500,8000))
```

---

## `rand2`

**Tags:** `generators`

A continuous pattern of random numbers, between -1 and 1

---

## `brandBy`

**Tags:** `generators`

A continuous pattern of 0 or 1 (binary random), with a probability for the value being 1

**Parameters:**

- `probability` : `number` — a number between 0 and 1

**Examples:**

```js
s("hh*10").pan(brandBy(0.2))
```

---

## `brand`

**Tags:** `generators`

A continuous pattern of 0 or 1 (binary random)

**Examples:**

```js
s("hh*10").pan(brand)
```

---

## `irand`

**Tags:** `generators`

A continuous pattern of random integers, between 0 and n-1.

**Parameters:**

- `n` : `number` — max value (exclusive)

**Examples:**

```js
// randomly select scale notes from 0 - 7 (= C to C)
n(irand(8)).struct("x x*2 x x*3").scale("C:minor")
```

---

## `perlin`

**Tags:** `generators`

Generates a continuous pattern of perlin noise, in the range 0..1.

**Examples:**

```js
// randomly change the cutoff
s("bd*4,hh*8").cutoff(perlin.range(500,8000))
```

---

## `berlin`

**Tags:** `generators`

Generates a continuous pattern of [berlin noise](conceived by Jame Coyne and Jade Rowland as a joke but turned out to be surprisingly cool and useful,
like perlin noise but with sawtooth waves), in the range 0..1.

**Examples:**

```js
// ascending arpeggios
n("0!16".add(berlin.fast(4).mul(14))).scale("d:minor")
```
