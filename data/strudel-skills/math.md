# math

16 functions

---

## `add`

**Tags:** `math`

Assumes a pattern of numbers. Adds the given number to each item in the pattern.

**Examples:**

```js
// Here, the triad 0, 2, 4 is shifted by different amounts
n("0 2 4".add("<0 3 4 0>")).scale("C:major")
// Without add, the equivalent would be:
// n("<[0 2 4] [3 5 7] [4 6 8] [0 2 4]>").scale("C:major")
```

```js
// You can also use add with notes:
note("c3 e3 g3".add("<0 5 7 0>"))
// Behind the scenes, the notes are converted to midi numbers:
// note("48 52 55".add("<0 5 7 0>"))
```

---

## `sub`

**Tags:** `math`

Like add, but the given numbers are subtracted.

**Examples:**

```js
n("0 2 4".sub("<0 1 2 3>")).scale("C4:minor")
// See add for more information.
```

---

## `mul`

**Tags:** `math`

Multiplies each number by the given factor.

**Examples:**

```js
"<1 1.5 [1.66, <2 2.33>]>*4".mul(150).freq()
```

---

## `div`

**Tags:** `math`

Divides each number by the given factor.

---

## `round`

**Tags:** `math`

Assumes a numerical pattern. Returns a new pattern with all values rounded
to the nearest integer.

**Examples:**

```js
n("0.5 1.5 2.5".round()).scale("C:major")
```

---

## `floor`

**Tags:** `math`

Assumes a numerical pattern. Returns a new pattern with all values set to
their mathematical floor. E.g. 3.7 replaced with to 3, and -4.2
replaced with -5.

**Examples:**

```js
note("42 42.1 42.5 43".floor())
```

---

## `ceil`

**Tags:** `math`

Assumes a numerical pattern. Returns a new pattern with all values set to
their mathematical ceiling. E.g. 3.2 replaced with 4, and -4.2
replaced with -4.

**Examples:**

```js
note("42 42.1 42.5 43".ceil())
```

---

## `toBipolar`

**Tags:** `math`

Assumes a numerical pattern, containing unipolar values in the range 0 ..

Returns a new pattern with values scaled to the bipolar range -1 .. 1

---

## `fromBipolar`

**Tags:** `math`

Assumes a numerical pattern, containing bipolar values in the range -1 .. 1
Returns a new pattern with values scaled to the unipolar range 0 .. 1

---

## `range`

**Tags:** `math`

Assumes a numerical pattern, containing unipolar values in the range 0 .. 1.
Returns a new pattern with values scaled to the given min/max range.
Most useful in combination with continuous patterns.

**Examples:**

```js
s("[bd sd]*2,hh*8")
.cutoff(sine.range(500,4000))
```

---

## `rangex`

**Tags:** `math`

Assumes a numerical pattern, containing unipolar values in the range 0 .. 1
Returns a new pattern with values scaled to the given min/max range,
following an exponential curve.

**Examples:**

```js
s("[bd sd]*2,hh*8")
.cutoff(sine.rangex(500,4000))
```

---

## `range2`

**Tags:** `math`

Assumes a numerical pattern, containing bipolar values in the range -1 .. 1
Returns a new pattern with values scaled to the given min/max range.

**Examples:**

```js
s("[bd sd]*2,hh*8")
.cutoff(sine2.range2(500,4000))
```

---

## `ratio`

**Tags:** `math`

Allows dividing numbers via list notation using ":".
Returns a new pattern with just numbers.

**Examples:**

```js
ratio("1, 5:4, 3:2").mul(110)
.freq().s("piano")
```

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

## `withSeed`

**Tags:** `math`

Modify a pattern by applying a function to the randomSeed control if present

**Parameters:**

- `func` : `function` — Function from seed (or undefined) to seed (or undefined)
- `pat` : `Pattern` — Pattern to update

---

## `seed`

**Tags:** `math`

Change the seed for random signals. Normally, random signals depend on time,
so two patterns at the same time will have the same random values. Specifying
a new seed changes the signal output by rand. This also affects other functions
that use randomness, like shuffle and sometimes.

**Parameters:**

- `n` : `number` — A new seed. Can be any number.

**Examples:**

```js
$: s("hh*4").degrade();
$: s("bd*4").degrade().seed(1); // Will degrade different events from the hi-hat
```
