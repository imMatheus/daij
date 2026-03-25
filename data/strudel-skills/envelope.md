# envelope

45 functions

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

## `warpenv`

**Tags:** `wavetable`, `envelope`, `superdough`

Amount of envelope applied wavetable oscillator's position envelope

**Parameters:**

- `amount` : `number | Pattern` — between 0 and 1

---

## `fmenv`

**Tags:** `fm`, `envelope`, `superdough`, `supradough`
**Synonyms:** `fme`

Ramp type of fm envelope. Exp might be a bit broken..
A number may be added afterwards to control the envelope of
any of the 8 individual FMs (e.g. fmenv4)

**Parameters:**

- `type` : `number | Pattern` — lin | exp

**Examples:**

```js
note("c e g b g e")
.fm(4)
.fmdecay(.2)
.fmsustain(0)
.fmenv("<exp lin>")
._scope()
```

---

## `fmattack`

**Tags:** `fm`, `envelope`, `superdough`, `supradough`
**Synonyms:** `fmatt`

Attack time for the FM envelope: time it takes to reach maximum modulation
A number may be added afterwards to control the attack of the envelope of
any of the 8 individual FMs (e.g. fmatt5)

**Parameters:**

- `time` : `number | Pattern` — attack time

**Examples:**

```js
note("c e g b g e")
.fm(4)
.fmattack("<0 .05 .1 .2>")
._scope()
```

---

## `fmdecay`

**Tags:** `fm`, `envelope`, `superdough`, `supradough`
**Synonyms:** `fmdec`

Decay time for the FM envelope: seconds until the sustain level is reached after the attack phase.
A number may be added afterwards to control the decay of the envelope of
any of the 8 individual FMs (e.g. fmdec6)

**Parameters:**

- `time` : `number | Pattern` — decay time

**Examples:**

```js
note("c e g b g e")
.fm(4)
.fmdecay("<.01 .05 .1 .2>")
.fmsustain(.4)
._scope()
```

---

## `fmsustain`

**Tags:** `fm`, `envelope`, `superdough`, `supradough`
**Synonyms:** `fmsus`

Sustain level for the FM envelope: how much modulation is applied after the decay phase
A number may be added afterwards to control the sustain of the envelope of
any of the 8 individual FMs (e.g. fmsus7)

**Parameters:**

- `level` : `number | Pattern` — sustain level

**Examples:**

```js
note("c e g b g e")
.fm(4)
.fmdecay(.1)
.fmsustain("<1 .75 .5 0>")
._scope()
```

---

## `fmrelease`

**Tags:** `fm`, `envelope`, `superdough`, `supradough`
**Synonyms:** `fmrel`

Release time for the FM envelope: how much modulation is applied after the note is released
A number may be added afterwards to control the release of the envelope of
any of the 8 individual FMs (e.g. fmrel8)

**Parameters:**

- `time` : `number | Pattern` — release time

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

## `lpenv`

**Tags:** `filter`, `envelope`, `superdough`, `supradough`
**Synonyms:** `lpe`

Sets the lowpass filter envelope modulation depth.

**Parameters:**

- `modulation` : `number | Pattern` — depth of the lowpass filter envelope between 0 and n

**Examples:**

```js
note("c2 e2 f2 g2")
.sound('sawtooth')
.lpf(300)
.lpa(.5)
.lpenv("<4 2 1 0 -1 -2 -4>/4")
```

---

## `hpenv`

**Tags:** `filter`, `envelope`, `superdough`, `supradough`
**Synonyms:** `hpe`

Sets the highpass filter envelope modulation depth.

**Parameters:**

- `modulation` : `number | Pattern` — depth of the highpass filter envelope between 0 and n

**Examples:**

```js
note("c2 e2 f2 g2")
.sound('sawtooth')
.hpf(500)
.hpa(.5)
.hpenv("<4 2 1 0 -1 -2 -4>/4")
```

---

## `bpenv`

**Tags:** `filter`, `envelope`, `superdough`, `supradough`
**Synonyms:** `bpe`

Sets the bandpass filter envelope modulation depth.

**Parameters:**

- `modulation` : `number | Pattern` — depth of the bandpass filter envelope between 0 and n

**Examples:**

```js
note("c2 e2 f2 g2")
.sound('sawtooth')
.bpf(500)
.bpa(.5)
.bpenv("<4 2 1 0 -1 -2 -4>/4")
```

---

## `lpattack`

**Tags:** `filter`, `envelope`, `superdough`, `supradough`
**Synonyms:** `lpa`

Sets the attack duration for the lowpass filter envelope.

**Parameters:**

- `attack` : `number | Pattern` — time of the filter envelope

**Examples:**

```js
note("c2 e2 f2 g2")
.sound('sawtooth')
.lpf(300)
.lpa("<.5 .25 .1 .01>/4")
.lpenv(4)
```

---

## `hpattack`

**Tags:** `filter`, `envelope`, `superdough`, `supradough`
**Synonyms:** `hpa`

Sets the attack duration for the highpass filter envelope.

**Parameters:**

- `attack` : `number | Pattern` — time of the highpass filter envelope

**Examples:**

```js
note("c2 e2 f2 g2")
.sound('sawtooth')
.hpf(500)
.hpa("<.5 .25 .1 .01>/4")
.hpenv(4)
```

---

## `bpattack`

**Tags:** `filter`, `envelope`, `superdough`, `supradough`
**Synonyms:** `bpa`

Sets the attack duration for the bandpass filter envelope.

**Parameters:**

- `attack` : `number | Pattern` — time of the bandpass filter envelope

**Examples:**

```js
note("c2 e2 f2 g2")
.sound('sawtooth')
.bpf(500)
.bpa("<.5 .25 .1 .01>/4")
.bpenv(4)
```

---

## `lpdecay`

**Tags:** `filter`, `envelope`, `superdough`, `supradough`
**Synonyms:** `lpd`

Sets the decay duration for the lowpass filter envelope.

**Parameters:**

- `decay` : `number | Pattern` — time of the filter envelope

**Examples:**

```js
note("c2 e2 f2 g2")
.sound('sawtooth')
.lpf(300)
.lpd("<.5 .25 .1 0>/4")
.lpenv(4)
```

---

## `hpdecay`

**Tags:** `filter`, `envelope`, `superdough`, `supradough`
**Synonyms:** `hpd`

Sets the decay duration for the highpass filter envelope.

**Parameters:**

- `decay` : `number | Pattern` — time of the highpass filter envelope

**Examples:**

```js
note("c2 e2 f2 g2")
.sound('sawtooth')
.hpf(500)
.hpd("<.5 .25 .1 0>/4")
.hps(0.2)
.hpenv(4)
```

---

## `bpdecay`

**Tags:** `filter`, `envelope`, `superdough`, `supradough`
**Synonyms:** `bpd`

Sets the decay duration for the bandpass filter envelope.

**Parameters:**

- `decay` : `number | Pattern` — time of the bandpass filter envelope

**Examples:**

```js
note("c2 e2 f2 g2")
.sound('sawtooth')
.bpf(500)
.bpd("<.5 .25 .1 0>/4")
.bps(0.2)
.bpenv(4)
```

---

## `lpsustain`

**Tags:** `filter`, `envelope`, `superdough`, `supradough`
**Synonyms:** `lps`

Sets the sustain amplitude for the lowpass filter envelope.

**Parameters:**

- `sustain` : `number | Pattern` — amplitude of the lowpass filter envelope

**Examples:**

```js
note("c2 e2 f2 g2")
.sound('sawtooth')
.lpf(300)
.lpd(.5)
.lps("<0 .25 .5 1>/4")
.lpenv(4)
```

---

## `hpsustain`

**Tags:** `filter`, `envelope`, `superdough`, `supradough`
**Synonyms:** `hps`

Sets the sustain amplitude for the highpass filter envelope.

**Parameters:**

- `sustain` : `number | Pattern` — amplitude of the highpass filter envelope

**Examples:**

```js
note("c2 e2 f2 g2")
.sound('sawtooth')
.hpf(500)
.hpd(.5)
.hps("<0 .25 .5 1>/4")
.hpenv(4)
```

---

## `bpsustain`

**Tags:** `filter`, `envelope`, `superdough`, `supradough`
**Synonyms:** `bps`

Sets the sustain amplitude for the bandpass filter envelope.

**Parameters:**

- `sustain` : `number | Pattern` — amplitude of the bandpass filter envelope

**Examples:**

```js
note("c2 e2 f2 g2")
.sound('sawtooth')
.bpf(500)
.bpd(.5)
.bps("<0 .25 .5 1>/4")
.bpenv(4)
```

---

## `lprelease`

**Tags:** `filter`, `envelope`, `superdough`, `supradough`
**Synonyms:** `lpr`

Sets the release time for the lowpass filter envelope.

**Parameters:**

- `release` : `number | Pattern` — time of the filter envelope

**Examples:**

```js
note("c2 e2 f2 g2")
.sound('sawtooth')
.clip(.5)
.lpf(300)
.lpenv(4)
.lpr("<.5 .25 .1 0>/4")
.release(.5)
```

---

## `hprelease`

**Tags:** `filter`, `envelope`, `superdough`, `supradough`
**Synonyms:** `hpr`

Sets the release time for the highpass filter envelope.

**Parameters:**

- `release` : `number | Pattern` — time of the highpass filter envelope

**Examples:**

```js
note("c2 e2 f2 g2")
.sound('sawtooth')
.clip(.5)
.hpf(500)
.hpenv(4)
.hpr("<.5 .25 .1 0>/4")
.release(.5)
```

---

## `bprelease`

**Tags:** `filter`, `envelope`, `superdough`, `supradough`
**Synonyms:** `bpr`

Sets the release time for the bandpass filter envelope.

**Parameters:**

- `release` : `number | Pattern` — time of the bandpass filter envelope

**Examples:**

```js
note("c2 e2 f2 g2")
.sound('sawtooth')
.clip(.5)
.bpf(500)
.bpenv(4)
.bpr("<.5 .25 .1 0>/4")
.release(.5)
```

---

## `fanchor`

**Tags:** `filter`, `envelope`, `superdough`

controls the center of the filter envelope. 0 is unipolar positive, .5 is bipolar, 1 is unipolar negative

**Parameters:**

- `center` : `number | Pattern` — 0 to 1

**Examples:**

```js
note("{f g g c d a a#}%8").s("sawtooth").lpf("{1000}%2")
.lpenv(8).fanchor("<0 .5 1>")
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

## `env`

**Tags:** `envelope`, `superdough`

Configures an envelope. Can be called in sequence like pat.env(...).env(...) to set up multiple envelopes
There are two ways to declare which control will be modulated:

Explicitly put control in the config (e.g. env({ c: "lpf" }))
If the control parameter is absent, the control immediately before the env call will be used
(e.g. s("saw").lpf(500).env({ a: 1 }) to modulate lpf)

Modulators can be referred to by id so that they can be updated later e.g. inside
a sometimes. See example below.

**Parameters:**

- `config` : `Object` — Envelope configuration.
- `config.control` : `string | Pattern` — Node to modulate. Aliases: c
- `config.subControl` : `string | Pattern` — Sub-control name to append to the control key. Aliases: sc
- `config.depth` : `number | Pattern` — Relative modulation depth. Aliases: dep, dr
- `config.depthabs` : `number | Pattern` — Absolute modulation depth. Aliases: da
- `config.attack` : `number | Pattern` — Time to reach depth. Aliases: att, a
- `config.decay` : `number | Pattern` — Time to reach sustain. Aliases: dec, d
- `config.sustain` : `number | Pattern` — Sustain depth. Aliases: sus, s
- `config.release` : `number | Pattern` — Time to return to nominal value. Aliases: rel, r
- `config.acurve` : `number | Pattern` — Snappiness of attack curve (-1 = relaxed, 1 = snappy). Aliases: ac
- `config.dcurve` : `number | Pattern` — Snappiness of decay curve (-1 = relaxed, 1 = snappy). Aliases: dc
- `config.rcurve` : `number | Pattern` — Snappiness of release curve (-1 = relaxed, 1 = snappy). Aliases: rc
- `config.fxi` : `number | Pattern` — FX index to target
- `id` : `string | Pattern` — ID to use for this modulator

**Examples:**

```js
s("saw").note("F1").lpf(500).env({ a: 1 })
```

```js
s("saw").env({ d: 1 }).note("F1")
  .lpq(4).lpf(50)
  .env({ a: 0.1, d: 1, ac: 0.8, dc: 0.3, depth: 50 })
```

```js
s("saw").lpf(500).diode(0.3)
  .env({ c: "lpf", a: 0.5, d: 0.5 })
```

```js
s("pulse").lpf(500).env({ a: 1 })
  .env({ c: "s", a: 1 })
  .diode(0.3)
  .sometimes(x => x.env({ a: "0.5" }, 1)) // envelope #1 (0-indexed)
```

```js
s("pulse").lpf(500).env({ a: 1 }, 'lpf_mod')
  .env({ c: "s", a: 1 })
  .diode(0.3)
  .sometimes(x => x.env({ a: "0.5" }, 'lpf_mod'))
```
