# samples

22 functions

---

## `s`

**Tags:** `superdough`, `samples`
**Synonyms:** `sound`

Select a sound / sample by name. When using mininotation, you can also optionally supply 'n' and 'gain' parameters
separated by ':'.

**Parameters:**

- `sound` : `string | Pattern` — The sound / pattern of sounds to pick

**Examples:**

```js
s("bd hh")
```

```js
s("bd:0 bd:1 bd:0:0.3 bd:1:1.4")
```

---

## `n`

**Tags:** `superdough`, `samples`, `tonal`

Selects the given index:

for samples, it picks the sample by index, with wrap around
for scales, it picks the scale degree
for voicings, it picks the voice index

**Parameters:**

- `value` : `number | Pattern` — sample index starting from 0

**Examples:**

```js
s("bd sd [~ bd] sd,hh*6").n("<0 1>")
```

---

## `accelerate`

**Tags:** `samples`, `superdirt`

A pattern of numbers that speed up (or slow down) samples while they play. Currently only supported by osc / superdirt.

**Parameters:**

- `amount` : `number | Pattern` — acceleration.

**Examples:**

```js
s("sax").accelerate("<0 1 2 4 8 16>").slow(2).osc()
```

---

## `bank`

**Tags:** `samples`, `superdough`

Select the sound bank to use. To be used together with s. The bank name (+ "_") will be prepended to the value of s.

**Parameters:**

- `bank` : `string | Pattern` — the name of the bank

**Examples:**

```js
s("bd sd [~ bd] sd").bank('RolandTR909') // = s("RolandTR909_bd RolandTR909_sd")
```

---

## `begin`

**Tags:** `samples`

A pattern of numbers from 0 to 1. Skips the beginning of each sample, e.g. 0.25 to cut off the first quarter from each sample.

**Parameters:**

- `amount` : `number | Pattern` — between 0 and 1, where 1 is the length of the sample

**Examples:**

```js
samples({ rave: 'rave/AREUREADY.wav' }, 'github:tidalcycles/dirt-samples')
s("rave").begin("<0 .25 .5 .75>").fast(2)
```

---

## `end`

**Tags:** `samples`

The same as .begin, but cuts off the end off each sample.

**Parameters:**

- `length` : `number | Pattern` — 1 = whole sample, .5 = half sample, .25 = quarter sample etc..

**Examples:**

```js
s("bd*2,oh*4").end("<.1 .2 .5 1>").fast(2)
```

---

## `loop`

**Tags:** `samples`

Loops the sample.
Note that the tempo of the loop is not synced with the cycle tempo.
To change the loop region, use loopBegin / loopEnd.

**Parameters:**

- `on` : `number | Pattern` — If 1, the sample is looped

**Examples:**

```js
s("casio").loop(1)
```

---

## `loopBegin`

**Tags:** `samples`
**Synonyms:** `loopb`

Begin to loop at a specific point in the sample (inbetween begin and end).
Note that the loop point must be inbetween begin and end, and before loopEnd!
Note: Samples starting with wt_ will automatically loop! (wt = wavetable)

**Parameters:**

- `time` : `number | Pattern` — between 0 and 1, where 1 is the length of the sample

**Examples:**

```js
s("space").loop(1)
.loopBegin("<0 .125 .25>")._scope()
```

---

## `loopEnd`

**Tags:** `samples`
**Synonyms:** `loope`

End the looping section at a specific point in the sample (inbetween begin and end).
Note that the loop point must be inbetween begin and end, and after loopBegin!

**Parameters:**

- `time` : `number | Pattern` — between 0 and 1, where 1 is the length of the sample

**Examples:**

```js
s("space").loop(1)
.loopEnd("<1 .75 .5 .25>")._scope()
```

---

## `speed`

**Tags:** `pitch`, `samples`

Changes the speed of sample playback, i.e. a cheap way of changing pitch.

**Parameters:**

- `speed` : `number | Pattern` — inf to inf, negative numbers play the sample backwards.

**Examples:**

```js
s("bd*6").speed("1 2 4 1 -2 -4")
```

```js
speed("1 1.5*2 [2 1.1]").s("piano").clip(1)
```

---

## `stretch`

**Tags:** `pitch`, `samples`

Changes the speed of sample playback, i.e. a cheap way of changing pitch.

**Parameters:**

- `factor` : `number | Pattern` — inf to inf, negative numbers play the sample backwards.

**Examples:**

```js
s("gm_flute").stretch("1 2 .5")
```

---

## `scrub`

**Tags:** `samples`

Allows you to scrub an audio file like a tape loop by passing values that represents the position in the audio file
in the optional array syntax ex: "0.5:2", the second value controls the speed of playback

**Examples:**

```js
samples('github:switchangel/pad')
s("swpad:0").scrub("{0.1!2 .25@3 0.7!2 <0.8:1.5>}%8")
```

```js
samples('github:yaxu/clean-breaks/main');
s("amen/4").fit().scrub("{0@3 0@2 4@3}%8".div(16))
```

---

## `chop`

**Tags:** `samples`

Cuts each sample into the given number of parts, allowing you to explore a technique known as 'granular synthesis'.
It turns a pattern of samples into a pattern of parts of samples.

**Examples:**

```js
samples({ rhodes: 'https://cdn.freesound.org/previews/132/132051_316502-lq.mp3' })
s("rhodes")
 .chop(4)
 .rev() // reverse order of chops
 .loopAt(2) // fit sample into 2 cycles
```

---

## `striate`

**Tags:** `samples`

Cuts each sample into the given number of parts, triggering progressive portions of each sample at each loop.

**Examples:**

```js
s("numbers:0 numbers:1 numbers:2").striate(6).slow(3)
```

---

## `loopAt`

**Tags:** `samples`, `pitch`

Makes the sample fit the given number of cycles by changing the speed.

**Examples:**

```js
samples({ rhodes: 'https://cdn.freesound.org/previews/132/132051_316502-lq.mp3' })
s("rhodes").loopAt(2)
```

---

## `slice`

**Tags:** `samples`

Chops samples into the given number of slices, triggering those slices with a given pattern of slice numbers.
Instead of a number, it also accepts a list of numbers from 0 to 1 to slice at specific points.

**Examples:**

```js
samples('github:tidalcycles/dirt-samples')
s("breaks165").slice(8, "0 1 <2 2*2> 3 [4 0] 5 6 7".every(3, rev)).slow(0.75)
```

```js
samples('github:tidalcycles/dirt-samples')
s("breaks125").fit().slice([0,.25,.5,.75], "0 1 1 <2 3>")
```

---

## `splice`

**Tags:** `samples`, `pitch`

Works the same as slice, but changes the playback speed of each slice to match the duration of its step.

**Examples:**

```js
samples('github:tidalcycles/dirt-samples')
s("breaks165")
.splice(8,  "0 1 [2 3 0]@2 3 0@2 7")
```

---

## `fit`

**Tags:** `samples`, `pitch`

Makes the sample fit its event duration. Good for rhythmical loops like drum breaks.
Similar to loopAt.

**Examples:**

```js
samples({ rhodes: 'https://cdn.freesound.org/previews/132/132051_316502-lq.mp3' })
s("rhodes/2").fit()
```

---

## `loopAtCps`

**Tags:** `samples`, `pitch`

Makes the sample fit the given number of cycles and cps value, by
changing the speed. deprecated: use loopAt or fit instead, together with setCps / setCpm.

**Examples:**

```js
samples({ rhodes: 'https://cdn.freesound.org/previews/132/132051_316502-lq.mp3' })
s("rhodes").loopAtCps(4,1.5).cps(1.5)
```

---

## `samples`

**Tags:** `samples`

Loads a collection of samples to use with s

**Examples:**

```js
samples('github:tidalcycles/dirt-samples');
s("[bd ~]*2, [~ hh]*2, ~ sd")
```

```js
samples({
 bd: '808bd/BD0000.WAV',
 sd: '808sd/SD0010.WAV'
 }, 'https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/');
s("[bd ~]*2, [~ hh]*2, ~ sd")
```

---

## `aliasBank`

**Tags:** `samples`

Register an alias for a bank of sounds.
Optionally accepts a single argument map of bank aliases.
Optionally accepts a single argument string of a path to a JSON file containing bank aliases.

**Parameters:**

- `bank` : `string` — The bank to alias
- `alias` : `string` — The alias to use for the bank

---

## `soundAlias`

**Tags:** `samples`

Register an alias for a sound.

**Parameters:**

- `original` : `string` — The original sound name
- `alias` : `string` — The alias to use for the sound
