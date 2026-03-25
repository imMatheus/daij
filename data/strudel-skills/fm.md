# fm

8 functions

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
