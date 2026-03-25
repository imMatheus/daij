# amplitude

21 functions

---

## `velocity`

**Tags:** `amplitude`, `superdough`, `supradough`
**Synonyms:** `vel`

Sets the velocity from 0 to 1. Is multiplied together with gain.

**Examples:**

```js
s("hh*8")
.gain(".4!2 1 .4!2 1 .4 1")
.velocity(".4 1")
```

---

## `gain`

**Tags:** `amplitude`, `superdough`, `supradough`

Controls the gain by an exponential amount.

**Parameters:**

- `amount` : `number | Pattern` — gain.

**Examples:**

```js
s("hh*8").gain(".4!2 1 .4!2 1 .4 1").fast(2)
```

---

## `postgain`

**Tags:** `amplitude`, `superdough`, `supradough`

Gain applied after all effects have been processed.

**Examples:**

```js
s("bd sd [~ bd] sd,hh*8")
.compressor("-20:20:10:.002:.02").postgain(1.5)
```

---

## `amp`

**Tags:** `amplitude`, `superdirt`

Like gain, but linear.

**Parameters:**

- `amount` : `number | Pattern` — gain.

**Examples:**

```js
s("bd*8").amp(".1*2 .5 .1*2 .5 .1 .5").osc()
```

---

## `attack`

**Tags:** `amplitude`, `envelope`, `superdough`, `supradough`
**Synonyms:** `att`

Amplitude envelope attack time: Specifies how long it takes for the sound to reach its peak value, relative to the onset.

**Parameters:**

- `attack` : `number | Pattern` — time in seconds.

**Examples:**

```js
note("c3 e3 f3 g3").attack("<0 .1 .5>")
```

---

## `decay`

**Tags:** `amplitude`, `envelope`, `superdough`, `supradough`
**Synonyms:** `dec`

Amplitude envelope decay time: the time it takes after the attack time to reach the sustain level.
Note that the decay is only audible if the sustain value is lower than 1.

**Parameters:**

- `time` : `number | Pattern` — decay time in seconds

**Examples:**

```js
note("c3 e3 f3 g3").decay("<.1 .2 .3 .4>").sustain(0)
```

---

## `sustain`

**Tags:** `amplitude`, `envelope`, `superdough`, `supradough`
**Synonyms:** `sus`

Amplitude envelope sustain level: The level which is reached after attack / decay, being sustained until the offset.

**Parameters:**

- `gain` : `number | Pattern` — sustain level between 0 and 1

**Examples:**

```js
note("c3 e3 f3 g3").decay(.2).sustain("<0 .1 .4 .6 1>")
```

---

## `release`

**Tags:** `amplitude`, `envelope`, `superdough`, `supradough`
**Synonyms:** `rel`

Amplitude envelope release time: The time it takes after the offset to go from sustain level to zero.

**Parameters:**

- `time` : `number | Pattern` — release time in seconds

**Examples:**

```js
note("c3 e3 g3 c4").release("<0 .1 .4 .6 1>/2")
```

---

## `tremolo`

**Tags:** `amplitude`, `lfo`, `superdough`
**Synonyms:** `trem`

Modulate the amplitude of a sound with a continuous waveform

**Parameters:**

- `speed` : `number | Pattern` — modulation speed in HZ

**Examples:**

```js
note("d d d# d".fast(4)).s("supersaw").tremolo("<3 2 100> ").tremoloskew("<.5>")
```

---

## `tremolosync`

**Tags:** `amplitude`, `lfo`, `superdough`
**Synonyms:** `tremsync`

Modulate the amplitude of a sound with a continuous waveform

**Parameters:**

- `cycles` : `number | Pattern` — modulation speed in cycles

**Examples:**

```js
note("d d d# d".fast(4)).s("supersaw").tremolosync("4").tremoloskew("<1 .5 0>")
```

---

## `tremolodepth`

**Tags:** `amplitude`, `lfo`, `superdough`
**Synonyms:** `tremdepth`

Depth of amplitude modulation

**Parameters:**

- `depth` : `number | Pattern`

**Examples:**

```js
note("a1 a1 a#1 a1".fast(4)).s("pulse").tremsync(4).tremolodepth("<1 2 .7>")
```

---

## `tremoloskew`

**Tags:** `amplitude`, `lfo`, `superdough`
**Synonyms:** `tremskew`

Alter the shape of the modulation waveform

**Parameters:**

- `amount` : `number | Pattern` — between 0 & 1, the shape of the waveform

**Examples:**

```js
note("{f a c e}%16").s("sawtooth").tremsync(4).tremoloskew("<.5 0 1>")
```

---

## `tremolophase`

**Tags:** `amplitude`, `lfo`, `superdough`
**Synonyms:** `tremphase`

Alter the phase of the modulation waveform

**Parameters:**

- `offset` : `number | Pattern` — the offset in cycles of the modulation

**Examples:**

```js
note("{f a c e}%16").s("sawtooth").tremsync(4).tremolophase("<0 .25 .66>")
```

---

## `tremoloshape`

**Tags:** `amplitude`, `lfo`, `superdough`
**Synonyms:** `tremshape`

Shape of amplitude modulation

**Parameters:**

- `shape` : `number | Pattern` — tri | square | sine | saw | ramp

**Examples:**

```js
note("{f g c d}%16").tremsync(4).tremoloshape("<sine tri square>").s("sawtooth")
```

---

## `duckorbit`

**Tags:** `amplitude`, `orbit`, `superdough`
**Synonyms:** `duck`

Modulate the amplitude of an orbit to create a "sidechain" like effect.
Can be applied to multiple orbits with the ':' mininotation, e.g. duckorbit("2:3")

**Parameters:**

- `orbit` : `number | Pattern` — target orbit

**Examples:**

```js
$: n(run(16)).scale("c:minor:pentatonic").s("sawtooth").delay(.7).orbit(2)
$: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit(2).duckattack(0.2).duckdepth(1)
```

```js
$: n(run(16)).scale("c:minor:pentatonic").s("sawtooth").delay(.7).orbit(2)
$: s("hh*16").orbit(3)
$: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit("2:3").duckattack(0.2).duckdepth(1)
```

---

## `duckdepth`

**Tags:** `amplitude`, `orbit`, `superdough`

The amount of ducking applied to target orbit
Can vary across orbits with the ':' mininotation, e.g. duckdepth("0.3:0.1").
Note: this requires first applying the effect to multiple orbits with e.g. duckorbit("2:3").

**Parameters:**

- `depth` : `number | Pattern` — depth of modulation from 0 to 1

**Examples:**

```js
stack( n(run(8)).scale("c:minor").s("sawtooth").delay(.7).orbit(2), s("bd:4!4").beat("0,4,8,11,14",16).duckorbit(2).duckattack(0.2).duckdepth("<1 .9 .6 0>"))
```

```js
$: n(run(16)).scale("c:minor:pentatonic").s("sawtooth").delay(.7).orbit(2)
$: s("hh*16").orbit(3)
$: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit("2:3").duckattack(0.2).duckdepth("1:0.5")
```

---

## `duckonset`

**Tags:** `amplitude`, `envelope`, `orbit`, `superdough`
**Synonyms:** `duckons`

The time required for the ducked signal(s) to reach their lowest volume.
Can be used to prevent clicking or for creative rhythmic effects.
Can vary across orbits with the ':' mininotation, e.g. duckonset("0:0.003").
Note: this requires first applying the effect to multiple orbits with e.g. duckorbit("2:3").

**Parameters:**

- `time` : `number | Pattern` — The onset time in seconds

**Examples:**

```js
// Clicks
sound: freq("63.2388").s("sine").orbit(2).gain(4)
duckerWithClick: s("bd*4").duckorbit(2).duckattack(0.3).duckonset(0).postgain(0)
```

```js
// No clicks
sound: freq("63.2388").s("sine").orbit(2).gain(4)
duckerWithoutClick: s("bd*4").duckorbit(2).duckattack(0.3).duckonset(0.01).postgain(0)
```

```js
// Rhythmic
noise: s("pink").distort("2:1").orbit(4) // used rhythmically with 0.3 onset below
hhat: s("hh*16").orbit(7)
ducker: s("bd*4").bank("tr909").duckorbit("4:7").duckonset("0.3:0.003").duckattack(0.25)
```

---

## `duckattack`

**Tags:** `amplitude`, `envelope`, `orbit`, `superdough`
**Synonyms:** `duckatt`, `datt`

The time required for the ducked signal(s) to return to their normal volume.
Can vary across orbits with the ':' mininotation, e.g. duckonset("0:0.003").
Note: this requires first applying the effect to multiple orbits with e.g. duckorbit("2:3").

**Parameters:**

- `time` : `number | Pattern` — The attack time in seconds

**Examples:**

```js
sound: n(run(8)).scale("c:minor").s("sawtooth").delay(.7).orbit(2)
ducker: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit(2).duckattack("<0.2 0 0.4>").duckdepth(1)
```

```js
moreduck: n(run(8)).scale("c:minor").s("sawtooth").delay(.7).orbit(2)
lessduck: s("hh*16").orbit(5)
ducker: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit("2:5").duckattack("0.4:0.1")
```

---

## `adsr`

**Tags:** `envelope`, `amplitude`

ADSR envelope: Combination of Attack, Decay, Sustain, and Release.

**Parameters:**

- `time` : `number | Pattern` — attack time in seconds
- `time` : `number | Pattern` — decay time in seconds
- `gain` : `number | Pattern` — sustain level (0 to 1)
- `time` : `number | Pattern` — release time in seconds

**Examples:**

```js
note("[c3 bb2 f3 eb3]*2").sound("sawtooth").lpf(600).adsr(".1:.1:.5:.2")
```

---

## `xfade`

**Tags:** `amplitude`

Cross-fades between left and right from 0 to 1:

0 = (full left, no right)
.5 = (both equal)
1 = (no left, full right)

**Examples:**

```js
xfade(s("bd*2"), "<0 .25 .5 .75 1>", s("hh*8"))
```

---

## `setGainCurve`

**Tags:** `amplitude`, `superdough`

Apply a function to all gains provided in patterns. Can be used to rescale gain to be
quadratic, exponential, etc. rather than linear

**Parameters:**

- `function` : `function` — to apply to all gain values

**Examples:**

```js
setGainCurve((x) => x * x) // quadratic gain
s("bd*4").gain(0.5) // equivalent to 0.25 gain normally
```
