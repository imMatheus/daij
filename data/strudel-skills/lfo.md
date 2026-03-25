# lfo

45 functions

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

## `warpsync`

**Tags:** `wavetable`, `lfo`, `superdough`

cycle synced rate of the LFO for the wavetable warp position

**Parameters:**

- `rate` : `number | Pattern` — rate in cycles

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

## `pwrate`

**Tags:** `superdough`, `lfo`
**Synonyms:** `pwr`

Controls the lfo rate for the pulsewidth of the pulse oscillator

**Parameters:**

- `rate` : `number | Pattern`

**Examples:**

```js
n(run(8)).scale("D:pentatonic").s("pulse").pw("0.5").pwrate("<5 .1 25>").pwsweep("<0.3 .8>")
```

---

## `pwsweep`

**Tags:** `superdough`, `lfo`
**Synonyms:** `pws`

Controls the lfo sweep for the pulsewidth of the pulse oscillator

**Parameters:**

- `sweep` : `number | Pattern`

**Examples:**

```js
n(run(8)).scale("D:pentatonic").s("pulse").pw("0.5").pwrate("<5 .1 25>").pwsweep("<0.3 .8>")
```

---

## `phasersweep`

**Tags:** `superdough`, `lfo`
**Synonyms:** `phs`

The frequency sweep range of the lfo for the phaser effect. Defaults to 2000

**Parameters:**

- `phasersweep` : `number | Pattern` — most useful values are between 0 and 4000

**Examples:**

```js
n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser(2).phasersweep("<800 2000 4000>")
```

---

## `lprate`

**Tags:** `filter`, `lfo`, `superdough`

Rate of the LFO for the lowpass filter

**Parameters:**

- `rate` : `number | Pattern` — rate in hertz

**Examples:**

```js
note("<c c c# c c c4>*16").s("sawtooth").lpf(600).lprate("<4 8 2 1>")
```

---

## `lpsync`

**Tags:** `filter`, `lfo`, `superdough`

Cycle-synced rate of the LFO for the lowpass filter

**Parameters:**

- `rate` : `number | Pattern` — rate in cycles

**Examples:**

```js
note("<c c c# c c c4>*16").s("sawtooth").lpf(600).lpsync("<4 8 2 1>")
```

---

## `lpdepth`

**Tags:** `filter`, `lfo`, `superdough`

Depth of the LFO for the lowpass filter

**Parameters:**

- `depth` : `number | Pattern` — depth of modulation

**Examples:**

```js
note("<c c c# c c c4>*16").s("sawtooth").lpf(600).lpdepth("<1 .5 1.8 0>")
```

---

## `lpdepthfrequency`

**Tags:** `filter`, `lfo`, `superdough`
**Synonyms:** `lpdepthfreq`

Depth of the LFO for the lowpass filter, in HZ

**Parameters:**

- `depth` : `number | Pattern` — depth of modulation

**Examples:**

```js
note("<c c c# c c c4>*16").s("sawtooth").lpf(600).lpdepthfrequency("<200 500 100 0>")
```

---

## `lpshape`

**Tags:** `filter`, `lfo`, `superdough`

Shape of the LFO for the lowpass filter

**Parameters:**

- `shape` : `number | Pattern` — Shape of the lfo (0, 1, 2, ..)

---

## `lpdc`

**Tags:** `filter`, `lfo`, `superdough`

DC offset of the LFO for the lowpass filter

**Parameters:**

- `dcoffset` : `number | Pattern` — dc offset. set to 0 for unipolar

---

## `lpskew`

**Tags:** `filter`, `lfo`, `superdough`

Skew of the LFO for the lowpass filter

**Parameters:**

- `skew` : `number | Pattern` — How much to bend the LFO shape

---

## `bprate`

**Tags:** `filter`, `lfo`, `superdough`

Rate of the LFO for the bandpass filter

**Parameters:**

- `rate` : `number | Pattern` — rate in hertz

---

## `bpsync`

**Tags:** `filter`, `lfo`, `superdough`

Cycle-synced rate of the LFO for the bandpass filter

**Parameters:**

- `rate` : `number | Pattern` — rate in cycles

---

## `bpdepth`

**Tags:** `filter`, `lfo`, `superdough`

Depth of the LFO for the bandpass filter

**Parameters:**

- `depth` : `number | Pattern` — depth of modulation

---

## `bpdepthfrequency`

**Tags:** `filter`, `lfo`, `superdough`
**Synonyms:** `bpdepthfreq`

Depth of the LFO for the bandpass filter, in HZ

**Parameters:**

- `depth` : `number | Pattern` — depth of modulation

**Examples:**

```js
note("<c c c# c c c4>*16").s("sawtooth").lpf(600).bpdepthfrequency("<200 500 100 0>")
```

---

## `bpshape`

**Tags:** `filter`, `lfo`, `superdough`

Shape of the LFO for the bandpass filter

**Parameters:**

- `shape` : `number | Pattern` — Shape of the lfo (0, 1, 2, ..)

---

## `bpdc`

**Tags:** `filter`, `lfo`, `superdough`

DC offset of the LFO for the bandpass filter

**Parameters:**

- `dcoffset` : `number | Pattern` — dc offset. set to 0 for unipolar

---

## `bpskew`

**Tags:** `filter`, `lfo`, `superdough`

Skew of the LFO for the bandpass filter

**Parameters:**

- `skew` : `number | Pattern` — How much to bend the LFO shape

---

## `hprate`

**Tags:** `filter`, `lfo`, `superdough`

Rate of the LFO for the highpass filter

**Parameters:**

- `rate` : `number | Pattern` — rate in hertz

---

## `hpsync`

**Tags:** `filter`, `lfo`, `superdough`

Cycle-synced rate of the LFO for the highpass filter

**Parameters:**

- `rate` : `number | Pattern` — rate in cycles

---

## `hpdepth`

**Tags:** `filter`, `lfo`, `superdough`

Depth of the LFO for the highpass filter

**Parameters:**

- `depth` : `number | Pattern` — depth of modulation

---

## `hpdepthfrequency`

**Tags:** `filter`, `lfo`, `superdough`
**Synonyms:** `hpdepthfreq`

Depth of the LFO for the hipass filter, in hz

**Parameters:**

- `depth` : `number | Pattern` — depth of modulation

**Examples:**

```js
note("<c c c# c c c4>*16").s("sawtooth").lpf(600).hpdepthfrequency("<200 500 100 0>")
```

---

## `hpshape`

**Tags:** `filter`, `lfo`, `superdough`

Shape of the LFO for the highpass filter

**Parameters:**

- `shape` : `number | Pattern` — Shape of the lfo (0, 1, 2, ..)

---

## `hpdc`

**Tags:** `filter`, `lfo`, `superdough`

DC offset of the LFO for the highpass filter

**Parameters:**

- `dcoffset` : `number | Pattern` — dc offset. set to 0 for unipolar

---

## `hpskew`

**Tags:** `filter`, `lfo`, `superdough`

Skew of the LFO for the highpass filter

**Parameters:**

- `skew` : `number | Pattern` — How much to bend the LFO shape

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

## `lfo`

**Tags:** `lfo`, `superdough`

Configures an LFO. Can be called in sequence like pat.lfo(...).lfo(...) to set up multiple LFOs.
There are two ways to declare which control will be modulated:

Explicitly put control in the config (e.g. lfo({ c: "lpf" }))
If the control parameter is absent, the control immediately before the lfo call will be used
(e.g. s("saw").lpf(500).lfo() to modulate lpf)

Modulators can be referred to by id so that they can be updated later e.g. inside
a sometimes. See example below.

**Parameters:**

- `config` : `Object` — LFO configuration.
- `config.control` : `string | Pattern` — Node to modulate. Aliases: c
- `config.subControl` : `string | Pattern` — Sub-control name to append to the control key. Aliases: sc
- `config.rate` : `number | Pattern` — Modulation rate. Aliases: r
- `config.sync` : `number | Pattern` — Tempo-synced modulation rate. Aliases: s
- `config.depth` : `number | Pattern` — Relative modulation depth. Aliases: dep, dr
- `config.depthabs` : `number | Pattern` — Absolute modulation depth. Aliases: da
- `config.dcoffset` : `number | Pattern` — DC offset / bias for the waveform. Aliases: dc
- `config.shape` : `number | Pattern` — Shape index. Aliases: sh
- `config.skew` : `number | Pattern` — Skew amount. Aliases: sk
- `config.curve` : `number | Pattern` — Exponential curve amount. Aliases: cu
- `config.retrig` : `number | Pattern` — If > 0.5, the LFO will retrigger on each event. Aliases: rt
- `config.fxi` : `number | Pattern` — FX index to target
- `id` : `string | Pattern` — ID to use for this modulator

**Examples:**

```js
s("saw").note("F1").lpf(500).lfo()
```

```js
s("saw").lfo().lpf(500).lfo({ s: 0.3 })
```

```js
s("saw").lpf(500).diode(0.3)
  .lfo({ c: "lpf" })
```

```js
s("pulse").lpf(500).lfo()
  .lfo({ c: "s" })
  .diode(0.3)
  .sometimes(x => x.lfo({ s: "8" }, 1)) // lfo #1 (0-indexed)
```

```js
s("pulse").lpf(500).lfo({ depth: 4 }, 'lpf_mod')
  .lfo({ c: "s" })
  .diode(0.3)
  .sometimes(x => x.lfo({ s: "8" }, 'lpf_mod'))
```
