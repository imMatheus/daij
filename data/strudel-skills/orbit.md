# orbit

16 functions

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
