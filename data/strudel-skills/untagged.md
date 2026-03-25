# untagged

80 functions

---

## `markcss`


Overrides the css of highlighted events. Make sure to use single quotes!

**Examples:**

```js
note("c a f e")
.markcss('text-decoration:underline')
```

---

## `_euclidRot`


**Examples:**

```js
// A thirteenth-century Persian rhythm called Khafif-e-ramal.
note("c3").euclid(2,5)
```

```js
// The archetypal pattern of the Cumbia from Colombia, as well as a Calypso rhythm from Trinidad.
note("c3").euclid(3,4)
```

```js
// Another thirteenth century Persian rhythm by the name of Khafif-e-ramal, as well as a Rumanian folk-dance rhythm.
note("c3").euclidRot(3,5,2)
```

```js
// A Ruchenitza rhythm used in a Bulgarian folk dance.
note("c3").euclid(3,7)
```

```js
// The Cuban tresillo pattern.
note("c3").euclid(3,8)
```

```js
// Another Ruchenitza Bulgarian folk-dance rhythm.
note("c3").euclid(4,7)
```

```js
// The Aksak rhythm of Turkey.
note("c3").euclid(4,9)
```

```js
// The metric pattern used by Frank Zappa in his piece titled Outside Now.
note("c3").euclid(4,11)
```

```js
// Yields the York-Samai pattern, a popular Arab rhythm.
note("c3").euclid(5,6)
```

```js
// The Nawakhat pattern, another popular Arab rhythm.
note("c3").euclid(5,7)
```

```js
// The Cuban cinquillo pattern.
note("c3").euclid(5,8)
```

```js
// A popular Arab rhythm called Agsag-Samai.
note("c3").euclid(5,9)
```

```js
// The metric pattern used by Moussorgsky in Pictures at an Exhibition.
note("c3").euclid(5,11)
```

```js
// The Venda clapping pattern of a South African children’s song.
note("c3").euclid(5,12)
```

```js
// The Bossa-Nova rhythm necklace of Brazil.
note("c3").euclid(5,16)
```

```js
// A typical rhythm played on the Bendir (frame drum).
note("c3").euclid(7,8)
```

```js
// A common West African bell pattern.
note("c3").euclid(7,12)
```

```js
// A Samba rhythm necklace from Brazil.
note("c3").euclidRot(7,16,14)
```

```js
// A rhythm necklace used in the Central African Republic.
note("c3").euclid(9,16)
```

```js
// A rhythm necklace of the Aka Pygmies of Central Africa.
note("c3").euclidRot(11,24,14)
```

```js
// Another rhythm necklace of the Aka Pygmies of the upper Sangha.
note("c3").euclidRot(13,24,5)
```

---

## `clearScope`


Clears all user-defined variables and functions from the scope.
This removes variables created during block-based evaluation.

**Examples:**

```js
// After defining variables in blocks:
// let myVar = 5
// function myFunc() { return 10; }
clearScope() // removes myVar and myFunc from scope
```

---

## `Pattern`


Create a pattern. As an end user, you will most likely not create a Pattern directly.

**Parameters:**

- `query` : `function` — The function that maps a State to an array of Hap.

---

## `fmap`


see withValue

---

## `timecat`


Aliases for stepcat

---

## `worklet`


Creates a worklet effect. Typically derived by writing K(...) in the REPL which will parse
Kabelsalat code.

**Parameters:**

- `src` : `string` — Source code of the worklet update function
- `inputs` : `number | Pattern` — Worklet inputs

---

## `getFreq`


---

## `midi2note`


---

## `edoScale`


Turns numbers into notes in the given EDO scale (zero indexed).
An EDO scale definition looks like this:
e.g. C:LLsLLLs:2:1 <- this is the C major scale, 12 EDO
e.g. C:LLsLLL:3:1 <- this is the Gorgo 6 note scale, 16 EDO
An EDO scale, e.g. C:LLsLLLs:2:1, consists of a root note (e.g. C)
followed by semicolon (':')
and then a Large/small step notation sequence
(e.g. LLsLLLs)
followed by semicolon, then the large step size (e.g. 2)
followed by semicolon, then the small step size (e.g. 1).
The number of divisions of the octave is calculated as the sum
of the steps in the EDO scale definition.
e.g. C:LLsLLLs:2:1 is 2+2+1+2+2+2+1 = 12 EDO, 7 note scale
e.g. C:LLsLLL:3:1 is 3+3+1+3+3+3 = 16 EDO, 6 note scale
The root note defaults to octave 3, if no octave number is given.

**Parameters:**

- `scale` : `string` — Definition of EDO scale.

**Examples:**

```js
n("0 2 4 6 4 2").edoScale("C:LLsLLLs:2:1")
```

```js
n("[0,7] 4 [2,7] 4")
.edoScale("G2:<LLsLLL LLLLsL>:3:1")
.s("piano")._pitchwheel()
```

```js
n(rand.range(0,5).segment(6))
.edoScale("<G2 C3>:LLsLL:3:1")
.s("piano")._pitchwheel()
```

---

## `MidiInput`


**Parameters:**

- `input` : `string | number` — MIDI device name or index defaulting to 0

---

## `createCC`


Implementation for the cc() factory function tied to this specific input.

**Parameters:**

- `cc` : `number` — MIDI CC number
- `chan` : `number | undefined` — MIDI channel (1-16) or undefined for all channels

---

## `_initializeInput`


Initialize a midi input device

---

## `getMidiDeviceNamesString`


Get a string listing device names for error messages.

**Parameters:**

- `devices` : `Array.<Input> | Array.<Output>`

---

## `getDevice`


Look up a device by index or name. Otherwise return a default device, or fail if none are connected.

**Parameters:**

- `indexOrName` : `string | number`
- `devices` : `Array.<Input> | Array.<Output>`

---

## `OLAProcessor`


---

## `getAllChannelData`


**Parameters:**

- `buffer` : `AudioBuffer`

---

## `randomSample`


---

## `getDur`


Returns the duration, in seconds, of the given sample.
Has optional param n (for instance, the 2 in s("casio:2"))
Note: must be called with await, otherwise you'll get a pending Promise object.

**Parameters:**

- `sampleName` : `string`
- `(optional)` : `number` — n

**Examples:**

```js
// Set a patterns cycle length to exactly the length of the sample
samples('github:tidalcycles/dirt-samples')
let k = await getDuration('sax')
s("sax").cps(1/k)
```

---

## `id`


---

## `out`


---

## `attack`


---

## `decay`


---

## `sustain`


---

## `release`


---

## `_begin`


---

## `_duration`


---

## `_sound`


---

## `_channels`


---

## `_buffers`


---

## `unit`


---

## `_penv`


---

## `penv`


---

## `pattack`


---

## `pdecay`


---

## `psustain`


---

## `prelease`


---

## `vib`


---

## `vibmod`


---

## `_fm`


---

## `fmh`


---

## `fmi`


---

## `_fmenv`


---

## `fmattack`


---

## `fmdecay`


---

## `fmsustain`


---

## `fmrelease`


---

## `_lpenv`


---

## `lpattack`


---

## `lpdecay`


---

## `lpsustain`


---

## `lprelease`


---

## `_hpenv`


---

## `hpenv`


---

## `hpattack`


---

## `hpdecay`


---

## `hpsustain`


---

## `hprelease`


---

## `_bpenv`


---

## `bpenv`


---

## `bpattack`


---

## `bpdecay`


---

## `bpsustain`


---

## `bprelease`


---

## `cutoff`


---

## `hcutoff`


---

## `bandf`


---

## `coarse`


---

## `crush`


---

## `distort`


---

## `freq`


---

## `note`


---

## `_lpf`


---

## `_hpf`


---

## `_bpf`


---

## `_chorus`


---

## `_coarse`


---

## `_crush`


---

## `_distort`


---

## `DoughVoice`


**Parameters:**

- `value` : `DoughVoice`
