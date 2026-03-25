# pitch

17 functions

---

## `chorus`

**Tags:** `pitch`

mix control for the chorus effect

**Parameters:**

- `chorus` : `string | Pattern` — mix amount between 0 and 1

**Examples:**

```js
note("d d a# a").s("sawtooth").chorus(.5)
```

---

## `vib`

**Tags:** `pitch`, `lfo`, `superdough`, `supradough`
**Synonyms:** `vibrato`, `v`

Applies a vibrato to the frequency of the oscillator.

**Parameters:**

- `frequency` : `number | Pattern` — of the vibrato in hertz

**Examples:**

```js
note("a e")
.vib("<.5 1 2 4 8 16>")
._scope()
```

```js
// change the modulation depth with ":"
note("a e")
.vib("<.5 1 2 4 8 16>:12")
._scope()
```

---

## `vibmod`

**Tags:** `pitch`, `lfo`, `superdough`, `supradough`
**Synonyms:** `vmod`

Sets the vibrato depth in semitones. Only has an effect if vibrato | vib | v is is also set

**Parameters:**

- `depth` : `number | Pattern` — of vibrato (in semitones)

**Examples:**

```js
note("a e").vib(4)
.vibmod("<.25 .5 1 2 12>")
._scope()
```

```js
// change the vibrato frequency with ":"
note("a e")
.vibmod("<.25 .5 1 2 12>:8")
._scope()
```

---

## `detune`

**Tags:** `pitch`, `superdough`
**Synonyms:** `det`

Set detune for stacked voices of supported oscillators.

**Parameters:**

- `amount` : `number | Pattern`

**Examples:**

```js
note("d f a a# a d3").fast(2).s("supersaw").detune("<.1 .2 .5 24.1>")
```

---

## `freq`

**Tags:** `pitch`, `superdough`

Set frequency of sound.

**Parameters:**

- `frequency` : `number | Pattern` — in Hz. the audible range is between 20 and 20000 Hz

**Examples:**

```js
freq("220 110 440 110").s("superzow").osc()
```

```js
freq("110".mul.out(".5 1.5 .6 [2 3]")).s("superzow").osc()
```

---

## `pattack`

**Tags:** `pitch`, `envelope`, `superdough`, `supradough`
**Synonyms:** `patt`

Attack time of pitch envelope.

**Parameters:**

- `time` : `number | Pattern` — time in seconds

**Examples:**

```js
note("c eb g bb").pattack("0 .1 .25 .5").slow(2)
```

---

## `pdecay`

**Tags:** `pitch`, `envelope`, `superdough`, `supradough`
**Synonyms:** `pdec`

Decay time of pitch envelope.

**Parameters:**

- `time` : `number | Pattern` — time in seconds

**Examples:**

```js
note("<c eb g bb>").pdecay("<0 .1 .25 .5>")
```

---

## `prelease`

**Tags:** `pitch`, `envelope`, `superdough`, `supradough`
**Synonyms:** `prel`

Release time of pitch envelope

**Parameters:**

- `time` : `number | Pattern` — time in seconds

**Examples:**

```js
note("<c eb g bb> ~")
.release(.5) // to hear the pitch release
.prelease("<0 .1 .25 .5>")
```

---

## `penv`

**Tags:** `pitch`, `envelope`, `superdough`, `supradough`

Amount of pitch envelope. Negative values will flip the envelope.
If you don't set other pitch envelope controls, pattack:.2 will be the default.

**Parameters:**

- `semitones` : `number | Pattern` — change in semitones

**Examples:**

```js
note("c")
.penv("<12 7 1 .5 0 -1 -7 -12>")
```

---

## `pcurve`

**Tags:** `pitch`, `envelope`, `superdough`

Curve of envelope. Defaults to linear. exponential is good for kicks

**Parameters:**

- `type` : `number | Pattern` — 0 = linear, 1 = exponential

**Examples:**

```js
note("g1*4")
.s("sine").pdec(.5)
.penv(32)
.pcurve("<0 1>")
```

---

## `panchor`

**Tags:** `pitch`, `envelope`, `superdough`

Sets the range anchor of the envelope:

anchor 0: range = [note, note + penv]
anchor 1: range = [note - penv, note]
If you don't set an anchor, the value will default to the psustain value.

**Parameters:**

- `anchor` : `number | Pattern` — anchor offset

**Examples:**

```js
note("c c4").penv(12).panchor("<0 .5 1 .5>")
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

## `loopAt`

**Tags:** `samples`, `pitch`

Makes the sample fit the given number of cycles by changing the speed.

**Examples:**

```js
samples({ rhodes: 'https://cdn.freesound.org/previews/132/132051_316502-lq.mp3' })
s("rhodes").loopAt(2)
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
