# filter

46 functions

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
