# wavetable

27 functions

---

## `wt`

**Tags:** `wavetable`, `superdough`
**Synonyms:** `wavetablePosition`

Position in the wavetable of the wavetable oscillator

**Parameters:**

- `position` : `number | Pattern` — Position in the wavetable from 0 to 1

**Examples:**

```js
s("squelch").bank("wt_digital").seg(8).note("F1").wt("0 0.25 0.5 0.75 1")
```

---

## `wtenv`

**Tags:** `wavetable`, `envelope`, `superdough`

Amount of envelope applied wavetable oscillator's position envelope

**Parameters:**

- `amount` : `number | Pattern` — between 0 and 1

---

## `wtattack`

**Tags:** `wavetable`, `envelope`, `superdough`
**Synonyms:** `wtatt`

Attack time of the wavetable oscillator's position envelope

**Parameters:**

- `time` : `number | Pattern` — attack time in seconds

---

## `wtdecay`

**Tags:** `wavetable`, `envelope`, `superdough`
**Synonyms:** `wtdec`

Decay time of the wavetable oscillator's position envelope

**Parameters:**

- `time` : `number | Pattern` — decay time in seconds

---

## `wtsustain`

**Tags:** `wavetable`, `envelope`, `superdough`
**Synonyms:** `wtsus`

Sustain time of the wavetable oscillator's position envelope

**Parameters:**

- `gain` : `number | Pattern` — sustain level (0 to 1)

---

## `wtrelease`

**Tags:** `wavetable`, `envelope`, `superdough`
**Synonyms:** `wtrel`

Release time of the wavetable oscillator's position envelope

**Parameters:**

- `time` : `number | Pattern` — release time in seconds

---

## `wtrate`

**Tags:** `wavetable`, `lfo`, `superdough`

Rate of the LFO for the wavetable oscillator's position

**Parameters:**

- `rate` : `number | Pattern` — rate in hertz

---

## `wtsync`

**Tags:** `wavetable`, `lfo`, `superdough`

cycle synced rate of the LFO for the wavetable oscillator's position

**Parameters:**

- `rate` : `number | Pattern` — rate in cycles

---

## `wtdepth`

**Tags:** `wavetable`, `lfo`, `superdough`

Depth of the LFO for the wavetable oscillator's position

**Parameters:**

- `depth` : `number | Pattern` — depth of modulation

---

## `wtshape`

**Tags:** `wavetable`, `lfo`, `superdough`

Shape of the LFO for the wavetable oscillator's position

**Parameters:**

- `shape` : `number | Pattern` — Shape of the lfo (0, 1, 2, ..)

---

## `wtdc`

**Tags:** `wavetable`, `lfo`, `superdough`

DC offset of the LFO for the wavetable oscillator's position

**Parameters:**

- `dcoffset` : `number | Pattern` — dc offset. set to 0 for unipolar

---

## `wtskew`

**Tags:** `wavetable`, `lfo`, `superdough`

Skew of the LFO for the wavetable oscillator's position

**Parameters:**

- `skew` : `number | Pattern` — How much to bend the LFO shape

---

## `warp`

**Tags:** `wavetable`, `superdough`
**Synonyms:** `wavetableWarp`

Amount of warp (alteration of the waveform) to apply to the wavetable oscillator

**Parameters:**

- `amount` : `number | Pattern` — Warp of the wavetable from 0 to 1

**Examples:**

```js
s("basique").bank("wt_digital").seg(8).note("F1").warp("0 0.25 0.5 0.75 1")
  .warpmode("spin")
```

---

## `warpattack`

**Tags:** `wavetable`, `envelope`, `superdough`
**Synonyms:** `warpatt`

Attack time of the wavetable oscillator's warp envelope

**Parameters:**

- `time` : `number | Pattern` — attack time in seconds

---

## `warpdecay`

**Tags:** `wavetable`, `envelope`, `superdough`
**Synonyms:** `warpdec`

Decay time of the wavetable oscillator's warp envelope

**Parameters:**

- `time` : `number | Pattern` — decay time in seconds

---

## `warpsustain`

**Tags:** `wavetable`, `envelope`, `superdough`
**Synonyms:** `warpsus`

Sustain time of the wavetable oscillator's warp envelope

**Parameters:**

- `gain` : `number | Pattern` — sustain level (0 to 1)

---

## `warprelease`

**Tags:** `wavetable`, `envelope`, `superdough`
**Synonyms:** `warprel`

Release time of the wavetable oscillator's warp envelope

**Parameters:**

- `time` : `number | Pattern` — release time in seconds

---

## `warprate`

**Tags:** `wavetable`, `lfo`, `superdough`

Rate of the LFO for the wavetable oscillator's warp

**Parameters:**

- `rate` : `number | Pattern` — rate in hertz

---

## `warpdepth`

**Tags:** `wavetable`, `lfo`, `superdough`

Depth of the LFO for the wavetable oscillator's warp

**Parameters:**

- `depth` : `number | Pattern` — depth of modulation

---

## `warpshape`

**Tags:** `wavetable`, `lfo`, `superdough`

Shape of the LFO for the wavetable oscillator's warp

**Parameters:**

- `shape` : `number | Pattern` — Shape of the lfo (0, 1, 2, ..)

---

## `warpdc`

**Tags:** `wavetable`, `lfo`, `superdough`

DC offset of the LFO for the wavetable oscillator's warp

**Parameters:**

- `dcoffset` : `number | Pattern` — dc offset. set to 0 for unipolar

---

## `warpskew`

**Tags:** `wavetable`, `lfo`, `superdough`

Skew of the LFO for the wavetable oscillator's warp

**Parameters:**

- `skew` : `number | Pattern` — How much to bend the LFO shape

---

## `warpmode`

**Tags:** `wavetable`, `superdough`
**Synonyms:** `wavetableWarpMode`

Type of warp (alteration of the waveform) to apply to the wavetable oscillator.
The current options are: none, asym, bendp, bendm, bendmp, sync, quant, fold, pwm, orbit,
spin, chaos, primes, binary, brownian, reciprocal, wormhole, logistic, sigmoid, fractal, flip

**Parameters:**

- `mode` : `number | string | Pattern` — Warp mode

**Examples:**

```js
s("morgana").bank("wt_digital").seg(8).note("F1").warp("0 0.25 0.5 0.75 1")
  .warpmode("<asym bendp spin logistic sync wormhole brownian>*2")
```

---

## `wtphaserand`

**Tags:** `wavetable`, `superdough`
**Synonyms:** `wavetablePhaseRand`

Amount of randomness of the initial phase of the wavetable oscillator.

**Parameters:**

- `amount` : `number | Pattern` — Randomness of the initial phase. Between 0 (not random) and 1 (fully random)

**Examples:**

```js
s("basique").bank("wt_digital").seg(16).wtphaserand("<0 1>")
```

---

## `warpenv`

**Tags:** `wavetable`, `envelope`, `superdough`

Amount of envelope applied wavetable oscillator's position envelope

**Parameters:**

- `amount` : `number | Pattern` — between 0 and 1

---

## `warpsync`

**Tags:** `wavetable`, `lfo`, `superdough`

cycle synced rate of the LFO for the wavetable warp position

**Parameters:**

- `rate` : `number | Pattern` — rate in cycles

---

## `tables`

**Tags:** `wavetable`

Loads a collection of wavetables to use with s
