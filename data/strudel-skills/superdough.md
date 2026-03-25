# superdough

170 functions

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

## `source`

**Tags:** `external_io`, `superdough`
**Synonyms:** `src`

Define a custom webaudio node to use as a sound source.

**Parameters:**

- `getSource` : `function`

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

## `fmh`

**Tags:** `fm`, `superdough`, `supradough`

Sets the Frequency Modulation Harmonicity Ratio.
Controls the timbre of the sound.
Whole numbers and simple ratios sound more natural,
while decimal numbers and complex ratios sound metallic.
A number may be added afterwards to control the harmonicity of
any of the 8 individual FMs (e.g. fmh2)

**Parameters:**

- `harmonicity` : `number | Pattern`

**Examples:**

```js
note("c e g b g e")
.fm(4)
.fmh("<1 2 1.5 1.61>")
._scope()
```

---

## `fmi`

**Tags:** `fm`, `superdough`, `supradough`
**Synonyms:** `fm`

Sets the Frequency Modulation of the synth.
Controls the modulation index, which defines the brightness of the sound.
A number may be added afterwards to control the modulation index of
any of the 8 individual FMs (e.g. fm3). Also, FMs may be routed into
each other with matrix commands like fm13, which would send fm1 back into
fm3

**Parameters:**

- `brightness` : `number | Pattern` — modulation index

**Examples:**

```js
note("c e g b g e")
.fm("<0 1 2 8 32>")
._scope()
```

```js
s("sine").note("F1").seg(8)
 .fm(4).fm2(rand.mul(4)).fm3(saw.mul(8).slow(8))
 .fmh(1.06).fmh2(10).fmh3(0.1)
```

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

## `fmwave`

**Tags:** `fm`, `superdough`, `supradough`

Waveform of the fm modulator
A number may be added afterwards to control the waveform
any of the 8 individual FMs (e.g. fmwave6)

**Parameters:**

- `wave` : `number | Pattern` — waveform

**Examples:**

```js
n("0 1 2 3".fast(4)).scale("d:minor").s("sine").fmwave("<sine square sawtooth crackle>").fm(4).fmh(2.01)
```

```js
n("0 1 2 3".fast(4)).chord("<Dm Am F G>").voicing().s("sawtooth").fmwave("brown").fm(.6)
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

## `bpf`

**Tags:** `filter`, `superdough`, `supradough`
**Synonyms:** `bandf`, `bp`

Sets the center frequency of the band-pass filter. When using mininotation, you
can also optionally supply the 'bpq' parameter separated by ':'.

**Parameters:**

- `frequency` : `number | Pattern` — center frequency

**Examples:**

```js
s("bd sd [~ bd] sd,hh*6").bpf("<1000 2000 4000 8000>")
```

---

## `bpq`

**Tags:** `filter`, `superdough`, `supradough`
**Synonyms:** `bandq`

Sets the band-pass q-factor (resonance).

**Parameters:**

- `q` : `number | Pattern` — q factor

**Examples:**

```js
s("bd sd [~ bd] sd").bpf(500).bpq("<0 1 2 3>")
```

---

## `crush`

**Tags:** `superdough`, `supradough`

Bit crusher effect.

**Parameters:**

- `depth` : `number | Pattern` — between 1 (for drastic reduction in bit-depth) to 16 (for barely no reduction).

**Examples:**

```js
s("<bd sd>,hh*3").fast(2).crush("<16 8 7 6 5 4 3 2>")
```

---

## `coarse`

**Tags:** `superdough`, `supradough`

Fake-resampling for lowering the sample rate. Caution: This effect seems to only work in chromium based browsers

**Parameters:**

- `factor` : `number | Pattern` — 1 for original 2 for half, 3 for a third and so on.

**Examples:**

```js
s("bd sd [~ bd] sd,hh*8").coarse("<1 4 8 16 32>")
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

## `drive`

**Tags:** `filter`, `superdough`

Filter overdrive for supported filter types

**Parameters:**

- `amount` : `number | Pattern`

**Examples:**

```js
note("{f g g c d a a#}%16".sub(17)).s("supersaw").lpenv(8).lpf(150).lpq(.8).ftype('ladder').drive("<.5 4>")
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

## `byteBeatExpression`

**Tags:** `superdough`
**Synonyms:** `bbexpr`, `bb`

Create byte beats with custom expressions

**Parameters:**

- `byteBeatExpression` : `number | Pattern` — bitwise expression for creating bytebeat

**Examples:**

```js
s("bytebeat").bbexpr('t*(t>>15^t>>66)')
```

---

## `byteBeatStartTime`

**Tags:** `superdough`
**Synonyms:** `bbst`

Create byte beats with custom expressions

**Parameters:**

- `byteBeatStartTime` : `number | Pattern` — in samples (t)

**Examples:**

```js
note("c3!8".add("{0 0 12 0 7 5 3}%8")).s("bytebeat:5").bbst("<3 1>".mul(10000))._scope()
```

---

## `channels`

**Tags:** `external_io`, `superdough`
**Synonyms:** `ch`

Allows you to set the output channels on the interface

**Parameters:**

- `channels` : `number | Pattern` — pattern the output channels

**Examples:**

```js
note("e a d b g").channels("3:4")
```

---

## `pw`

**Tags:** `superdough`

Controls the pulsewidth of the pulse oscillator

**Parameters:**

- `pulsewidth` : `number | Pattern`

**Examples:**

```js
note("{f a c e}%16").s("pulse").pw(".8:1:.2")
```

```js
n(run(8)).scale("D:pentatonic").s("pulse").pw("0 .75 .5 1")
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

## `phaser`

**Tags:** `superdough`
**Synonyms:** `ph`

Phaser audio effect that approximates popular guitar pedals.

**Parameters:**

- `speed` : `number | Pattern` — speed of modulation

**Examples:**

```js
n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser("<1 2 4 8>")
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

## `phasercenter`

**Tags:** `superdough`
**Synonyms:** `phc`

The center frequency of the phaser in HZ. Defaults to 1000

**Parameters:**

- `centerfrequency` : `number | Pattern` — in HZ

**Examples:**

```js
n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser(2).phasercenter("<800 2000 4000>")
```

---

## `phaserdepth`

**Tags:** `superdough`, `superdirt`
**Synonyms:** `phd`, `phasdp`

The amount the signal is affected by the phaser effect. Defaults to 0.75

**Parameters:**

- `depth` : `number | Pattern` — number between 0 and 1

**Examples:**

```js
n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser(2).phaserdepth("<0 .5 .75 1>")
```

---

## `channel`

**Tags:** `superdough`

Choose the channel the pattern is sent to

**Parameters:**

- `channel` : `number | Pattern` — channel number

---

## `cut`

**Tags:** `superdough`

In the style of classic drum-machines, cut will stop a playing sample as soon as another samples with in same cutgroup is to be played. An example would be an open hi-hat followed by a closed one, essentially muting the open.

**Parameters:**

- `group` : `number | Pattern` — cut group number

**Examples:**

```js
s("[oh hh]*4").cut(1)
```

---

## `lpf`

**Tags:** `filter`, `superdough`, `supradough`
**Synonyms:** `cutoff`, `ctf`, `lp`

Applies the cutoff frequency of the low-pass filter.
When using mininotation, you can also optionally add the 'lpq' parameter, separated by ':'.

**Parameters:**

- `frequency` : `number | Pattern` — audible between 0 and 20000

**Examples:**

```js
s("bd sd [~ bd] sd,hh*6").lpf("<4000 2000 1000 500 200 100>")
```

```js
s("bd*16").lpf("1000:0 1000:10 1000:20 1000:30")
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

## `ftype`

**Tags:** `filter`, `superdough`

Sets the filter type. The ladder filter is more aggressive. More types might be added in the future.

**Parameters:**

- `type` : `number | Pattern` — 12db (0), ladder (1), or 24db (2)

**Examples:**

```js
note("{f g g c d a a#}%8").s("sawtooth").lpenv(4).lpf(500).ftype("<0 1 2>").lpq(1)
```

```js
note("c f g g a c d4").fast(2)
.sound('sawtooth')
.lpf(200).fanchor(0)
.lpenv(3).lpq(1)
.ftype("<ladder 12db 24db>")
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

## `hpf`

**Tags:** `filter`, `superdough`, `supradough`
**Synonyms:** `hp`, `hcutoff`

Applies the cutoff frequency of the high-pass filter.
When using mininotation, you can also optionally add the 'hpq' parameter, separated by ':'.

**Parameters:**

- `frequency` : `number | Pattern` — audible between 0 and 20000

**Examples:**

```js
s("bd sd [~ bd] sd,hh*8").hpf("<4000 2000 1000 500 200 100>")
```

```js
s("bd sd [~ bd] sd,hh*8").hpf("<2000 2000:25>")
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

## `hpq`

**Tags:** `filter`, `superdough`, `supradough`
**Synonyms:** `hresonance`

Controls the high-pass q-value.

**Parameters:**

- `q` : `number | Pattern` — resonance factor between 0 and 50

**Examples:**

```js
s("bd sd [~ bd] sd,hh*8").hpf(2000).hpq("<0 10 20 30>")
```

---

## `lpq`

**Tags:** `filter`, `superdough`, `supradough`
**Synonyms:** `resonance`

Controls the low-pass q-value.

**Parameters:**

- `q` : `number | Pattern` — resonance factor between 0 and 50

**Examples:**

```js
s("bd sd [~ bd] sd,hh*8").lpf(2000).lpq("<0 10 20 30>")
```

---

## `djf`

**Tags:** `filter`, `superdough`

DJ filter, below 0.5 is low pass filter, above is high pass filter.

**Parameters:**

- `cutoff` : `number | Pattern` — below 0.5 is low pass filter, above is high pass filter

**Examples:**

```js
n(irand(16).seg(8)).scale("d:phrygian").s("supersaw").djf("<.5 .3 .2 .75>")
```

---

## `delay`

**Tags:** `orbit`, `superdough`, `supradough`

Sets the level of the delay signal.
When using mininotation, you can also optionally add the 'delaytime' and 'delayfeedback' parameter,
separated by ':'.

**Parameters:**

- `level` : `number | Pattern` — between 0 and 1

**Examples:**

```js
s("bd bd").delay("<0 .25 .5 1>")
```

```js
s("bd bd").delay("0.65:0.25:0.9 0.65:0.125:0.7")
```

---

## `delayfeedback`

**Tags:** `orbit`, `superdough`, `supradough`
**Synonyms:** `delayfb`, `dfb`

Sets the level of the signal that is fed back into the delay.
Caution: Values >= 1 will result in a signal that gets louder and louder! Don't do it

**Parameters:**

- `feedback` : `number | Pattern` — between 0 and 1

**Examples:**

```js
s("bd").delay(.25).delayfeedback("<.25 .5 .75 1>")
```

---

## `delaytime`

**Tags:** `orbit`, `superdough`, `supradough`
**Synonyms:** `delayt`, `dt`

Sets the time of the delay effect in seconds.

**Parameters:**

- `delay` : `number | Pattern` — in seconds

**Examples:**

```js
note("d d a# a".fast(2))
.s("sawtooth")
.delay(.8)
.delaytime(1/2)
.delayspeed("<2 .5 -1 -2>")
```

---

## `delaysync`

**Tags:** `orbit`, `superdough`
**Synonyms:** `delays`, `ds`

Sets the time of the delay effect in cycles.

**Parameters:**

- `cycles` : `number | Pattern` — delay length in cycles

**Examples:**

```js
s("bd bd").delay(.25).delaysync("<1 2 3 5>".div(8))
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

## `unison`

**Tags:** `superdough`

Set number of stacked voices for supported oscillators.

**Parameters:**

- `numvoices` : `number | Pattern`

**Examples:**

```js
note("d f a a# a d3").fast(2).s("supersaw").unison("<1 2 7>")
```

---

## `spread`

**Tags:** `superdough`

Set the stereo pan spread for supported oscillators

**Parameters:**

- `spread` : `number | Pattern` — between 0 and 1

**Examples:**

```js
note("d f a a# a d3").fast(2).s("supersaw").spread("<0 .3 1>")
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

## `orbit`

**Tags:** `superdough`
**Synonyms:** `o`

An orbit is a global parameter context for patterns. Patterns with the same orbit will share the same global effects.

**Parameters:**

- `number` : `number | Pattern`

**Examples:**

```js
stack(
  s("hh*6").delay(.5).delaytime(.25).orbit(1),
  s("~ sd ~ sd").delay(.5).delaytime(.125).orbit(2)
)
```

---

## `pan`

**Tags:** `superdough`, `supradough`

Sets position in stereo.

**Parameters:**

- `pan` : `number | Pattern` — between 0 and 1, from left to right (assuming stereo), once round a circle (assuming multichannel)

**Examples:**

```js
s("[bd hh]*2").pan("<.5 1 .5 0>")
```

```js
s("bd rim sd rim bd ~ cp rim").pan(sine.slow(2))
```

---

## `room`

**Tags:** `orbit`, `superdough`

Sets the level of reverb.
When using mininotation, you can also optionally add the 'size' parameter, separated by ':'.

**Parameters:**

- `level` : `number | Pattern` — between 0 and 1

**Examples:**

```js
s("bd sd [~ bd] sd").room("<0 .2 .4 .6 .8 1>")
```

```js
s("bd sd [~ bd] sd").room("<0.9:1 0.9:4>")
```

---

## `roomlp`

**Tags:** `orbit`, `superdough`
**Synonyms:** `rlp`

Reverb lowpass starting frequency (in hertz).
When this property is changed, the reverb will be recaculated, so only change this sparsely..

**Parameters:**

- `frequency` : `number` — between 0 and 20000hz

**Examples:**

```js
s("bd sd [~ bd] sd").room(0.5).rlp(10000)
```

```js
s("bd sd [~ bd] sd").room(0.5).rlp(5000)
```

---

## `roomdim`

**Tags:** `orbit`, `superdough`
**Synonyms:** `rdim`

Reverb lowpass frequency at -60dB (in hertz).
When this property is changed, the reverb will be recaculated, so only change this sparsely..

**Parameters:**

- `frequency` : `number` — between 0 and 20000hz

**Examples:**

```js
s("bd sd [~ bd] sd").room(0.5).rlp(10000).rdim(8000)
```

```js
s("bd sd [~ bd] sd").room(0.5).rlp(5000).rdim(400)
```

---

## `roomfade`

**Tags:** `orbit`, `superdough`
**Synonyms:** `rfade`

Reverb fade time (in seconds).
When this property is changed, the reverb will be recaculated, so only change this sparsely..

**Parameters:**

- `seconds` : `number` — for the reverb to fade

**Examples:**

```js
s("bd sd [~ bd] sd").room(0.5).rlp(10000).rfade(0.5)
```

```js
s("bd sd [~ bd] sd").room(0.5).rlp(5000).rfade(4)
```

---

## `iresponse`

**Tags:** `orbit`, `superdough`
**Synonyms:** `ir`

Sets the sample to use as an impulse response for the reverb.

**Parameters:**

- `sample` : `string | Pattern` — to use as an impulse response

**Examples:**

```js
s("bd sd [~ bd] sd").room(.8).ir("<shaker_large:0 shaker_large:2>")
```

---

## `irspeed`

**Tags:** `orbit`, `superdough`

Sets speed of the sample for the impulse response.

**Parameters:**

- `speed` : `string | Pattern`

**Examples:**

```js
samples('github:switchangel/pad')
$: s("brk/2").fit().scrub(irand(16).div(16).seg(8)).ir("swpad:4").room(.2).irspeed("<2 1 .5>/2").irbegin(.5).roomsize(.5)
```

---

## `irbegin`

**Tags:** `orbit`, `superdough`
**Synonyms:** `ir`

Sets the beginning of the IR response sample

**Parameters:**

- `begin` : `string | Pattern` — between 0 and 1

**Examples:**

```js
samples('github:switchangel/pad')
$: s("brk/2").fit().scrub(irand(16).div(16).seg(8)).ir("swpad:4").room(.65).irspeed("-2").irbegin("<0 .5 .75>/2").roomsize(.6)
```

---

## `roomsize`

**Tags:** `orbit`, `superdough`
**Synonyms:** `rsize`, `sz`, `size`

Sets the room size of the reverb, see room.
When this property is changed, the reverb will be recaculated, so only change this sparsely..

**Parameters:**

- `size` : `number | Pattern` — between 0 and 10

**Examples:**

```js
s("bd sd [~ bd] sd").room(.8).rsize(1)
```

```js
s("bd sd [~ bd] sd").room(.8).rsize(4)
```

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

## `distortvol`

**Tags:** `superdough`, `supradough`
**Synonyms:** `distortion`, `distvol`

Postgain for waveshaping distortion.

**Parameters:**

- `volume` : `number | Pattern` — linear postgain of the distortion

**Examples:**

```js
s("bd*4").bank("tr909").distort(2).distortvol(0.8)
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

## `compressor`

**Tags:** `superdough`

Dynamics Compressor. The params are compressor("threshold:ratio:knee:attack:release")
More info here

**Examples:**

```js
s("bd sd [~ bd] sd,hh*8")
.compressor("-20:20:10:.002:.02")
```

---

## `vowel`

**Tags:** `superdough`

Formant filter to make things sound like vowels.

**Parameters:**

- `vowel` : `string | Pattern` — You can use a e i o u ae aa oe ue y uh un en an on, corresponding to [a] [e] [i] [o] [u] [æ] [ɑ] [ø] [y] [ɯ] [ʌ] [œ̃] [ɛ̃] [ɑ̃] [ɔ̃]. Aliases: aa = å = ɑ, oe = ø = ö, y = ı, ae = æ.

**Examples:**

```js
note("[c2 <eb2 <g2 g1>>]*2").s('sawtooth')
.vowel("<a e i <o u>>")
```

```js
s("bd sd mt ht bd [~ cp] ht lt").vowel("[a|e|i|o|u]")
```

---

## `density`

**Tags:** `superdough`

crackle noise density

**Parameters:**

- `density` : `number | Pattern` — between 0 and x

**Examples:**

```js
s("crackle*4").density("<0.01 0.04 0.2 0.5>".slow(4))
```

---

## `clip`

**Tags:** `superdough`
**Synonyms:** `legato`

Multiplies the duration with the given number. Also cuts samples off at the end if they exceed the duration.

**Parameters:**

- `factor` : `number | Pattern` — = 0

**Examples:**

```js
note("c a f e").s("piano").clip("<.5 1 2>")
```

---

## `duration`

**Tags:** `superdough`
**Synonyms:** `dur`

Sets the duration of the event in cycles. Similar to clip / legato, it also cuts samples off at the end if they exceed the duration.

**Parameters:**

- `seconds` : `number | Pattern` — = 0

**Examples:**

```js
note("c a f e").s("piano").dur("<.5 1 2>")
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

---

## `bmod`

**Tags:** `superdough`

Modulates with the output from a given bus.
Can be called in sequence like pat.bmod(...).bmod(...) to set up multiple modulators
Send to an audio bus with otherPat.bus(..).
There are two ways to declare which control will be modulated:

Explicitly put control in the config (e.g. bmod({ id: 2, c: "lpf" }))
If the control parameter is absent, the control immediately before the bmod call will be used
(e.g. s("saw").lpf(500).bmod({ id: 2 }) to modulate lpf)

Modulators can be referred to by id so that they can be updated later e.g. inside
a sometimes. See example below.

**Parameters:**

- `config` : `Object` — Bus modulation configuration.
- `config.bus` : `string | Pattern` — Bus to get modulation signal from
- `config.control` : `string | Pattern` — Node to modulate. Aliases: c
- `config.subControl` : `string | Pattern` — Sub-control name to append to the control key. Aliases: sc
- `config.depth` : `number | Pattern` — Relative modulation depth. Aliases: dep, dr
- `config.depthabs` : `number | Pattern` — Absolute modulation depth. Aliases: da
- `config.dc` : `number | Pattern` — DC offset prior to application
- `config.fxi` : `number | Pattern` — FX index to target
- `id` : `string | Pattern` — ID to use for this modulator

**Examples:**

```js
modulator: s("one").seg(64).gain(slider(0, 0, 1)).bus(1).dry(0)
carrier: s("saw").bmod({ b: 1 })
```

---

## `transient`

**Tags:** `superdough`

Transient shaper. Gives independent control over the emphasis on transients
and sustains

**Parameters:**

- `attack` : `number | Pattern` — Emphasis on transients; between -1 (deaccentuate) and 1 (accentuate)
- `sustain` : `number | Pattern` — Emphasis on the sustains; between -1 (deaccentuate) and 1 (accentuate)

**Examples:**

```js
s("bd").transient("<-1 -0.5 0 0.5 1>")
```

```js
s("hh*16").bank("tr909").transient("<-1:1 1:-1>")
```

---

## `jux`

**Tags:** `temporal`, `superdough`

The jux function creates strange stereo effects, by applying a function to a pattern, but only in the right-hand channel.

**Examples:**

```js
s("bd lt [~ ht] mt cp ~ bd hh").jux(rev)
```

```js
s("bd lt [~ ht] mt cp ~ bd hh").jux(press)
```

```js
s("bd lt [~ ht] mt cp ~ bd hh").jux(iter(4))
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

---

## `partials`

**Tags:** `superdough`

Scale the magnitude of the harmonics of one of the core synths ('sine', 'tri', 'saw', ..)
Can also be used to create a new synth via s('user').partials(...)

**Parameters:**

- `magnitudes` : `Array.<number> | Pattern` — List of [0, 1] magnitudes for partials. 0th entry is the fundamental harmonic (i.e. DC offset is skipped)

**Examples:**

```js
s("user").seg(16).n(irand(8)).scale("A:major")
  .partials([1, 0, 1, 0, 0, 1])
```

```js
s("saw").seg(8).n(irand(12)).scale("G#:minor")
  .partials(binaryL(irand(256).add("1")))
```

---

## `phases`

**Tags:** `superdough`

Rotates the harmonics of one of the core synths ('sine', 'tri', 'saw', 'user', ..) by a list of phases

**Parameters:**

- `phases` : `Array.<number> | Pattern` — List of [0, 1) phases for partials. 0th entry is the fundamental phase (i.e. DC offset is skipped)

**Examples:**

```js
// Phase cancellation
s("saw").seg(8).n(irand(12)).scale("G#1:minor")
  .partials(partials([1, 1, 1]))
  .superimpose(x => x.phases([0.5, 0.5, 0.5]))
```

---

## `FX`

**Tags:** `superdough`

Establishes an FX chain. Can be called by chaining .FX(fx1).FX(fx2)..
calls and/or in a single .FX(fx1, fx2, ..) call. The fx1, .. are patterns which
establish the controls of the given effect. See examples.

**Examples:**

```js
$: s("[sbd <hh [bd | lt | oh]>]*4").dec(.4)
  .FX(
    phaser(0.5).gain(2),
    bpf(800),
    distort(1.3),
    room(0.2),
    delay(0.5).gain(1.25),
    distort(0.3),
  ).fxr(1.7) // sets release time of effects (like delay)
```

```js
$: s("saw").fm(0.5)
  .delay(0.3) // outer effects are applied *last*
  .FX(coarse(4)) // first coarse
  .FX(lpf(500).lpe(4).lpa(1).lpd(2)) // then lpf
  .FX(distort(1)) // then distort
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

## `setMaxPolyphony`

**Tags:** `superdough`

Set the max polyphony. If notes are ringing out via release then they will
start to die out in first-in-first-out order once the max polyphony has been hit

**Parameters:**

- `Max` : `number` — polyphony. Defaults to 128

**Examples:**

```js
setMaxPolyphony(4)
n(irand(24).seg(8)).scale("C#3:minor").room(1).release(4).gain(0.5)
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
