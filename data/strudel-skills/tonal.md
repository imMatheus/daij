# tonal

20 functions

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

## `i`

**Tags:** `tonal`

Selects the given degree. Currently used in xen and tune:

**Parameters:**

- `value` : `number | Pattern`

**Examples:**

```js
i("0 1 2 3 4 5 6 7").xen("<5edo 10edo 15edo hexany15>")
```

---

## `note`

**Tags:** `tonal`

Plays the given note name or midi number. A note name consists of

a letter (a-g or A-G)
optional accidentals (b or #)
optional (possibly negative) octave number (0-9). Defaults to 3

Examples of valid note names: c, bb, Bb, f#, c3, A4, Eb2, c#5
You can also use midi numbers instead of note names, where 69 is mapped to A4 440Hz in 12EDO.

**Examples:**

```js
note("c a f e")
```

```js
note("c4 a4 f4 e4")
```

```js
note("60 69 65 64")
```

```js
note("fbb1 a#0 cbbb-1 e##-2").sound("saw")
```

---

## `chord`

**Tags:** `tonal`

The chord to voice

**Parameters:**

- `symbols` : `string | Pattern` — chord symbols to voice e.g., C, Eb, Fm7, G7. The symbols can be defined via addVoicings

**Examples:**

```js
chord("<Am C D F Am E Am E>").voicing()
```

---

## `dictionary`

**Tags:** `tonal`

Which dictionary to use for the voicings. This falls back to the default dictionary if not provided

**Parameters:**

- `dictionaryName` : `string` — which dictionary (having been defined with addVoicings) to use

**Examples:**

```js
addVoicings('house', {
'': ['7 12 16', '0 7 16', '4 7 12'],
'm': ['0 3 7']
})
chord("<Am C D F Am E Am E>")
.dict('house').anchor(66)
.voicing().room(.5)
```

---

## `anchor`

**Tags:** `tonal`

The top note to align the voicing to. Defaults to c5

**Parameters:**

- `anchorNote` : `string | Pattern` — the note to align the voicing or scale to

**Examples:**

```js
anchor("<c4 g4 c5 g5>").chord("C").voicing()
```

```js
n("0 .. 7").anchor("<c4 g4 c5 g5>").scale("<C:major F:minor>")
```

---

## `offset`

**Tags:** `tonal`

Sets how the voicing is offset from the anchored position

**Parameters:**

- `shift` : `number | Pattern` — the amount to shift the voicing up or down

**Examples:**

```js
chord("<Am C D F Am E Am E>").offset("<0 1 2 3 4 5>") // alter the voicing each time
```

---

## `octaves`

**Tags:** `tonal`

How many octaves are voicing steps spread apart, defaults to 1

**Parameters:**

- `count` : `number | Pattern` — the number of octaves

**Examples:**

```js
chord("<Am C D F Am E Am E>").octaves("<2 4>").voicing()
```

---

## `mode`

**Tags:** `tonal`

Remove anchor note from the voicing. Useful for melody harmonization

**Parameters:**

- `modeName` : `string | Pattern` — one of {below | above | duck | root}

**Examples:**

```js
mode("<below above duck root>").chord("C").voicing()
```

---

## `transpose`

**Tags:** `tonal`
**Synonyms:** `trans`

Change the pitch of each value by the given amount. Expects numbers or note strings as values.
The amount can be given as a number of semitones or as a string in interval short notation.
If you don't care about enharmonic correctness, just use numbers. Otherwise, pass the interval of
the form: ST where S is the degree number and T the type of interval with

M = major
m = minor
P = perfect
A = augmented
d = diminished

Examples intervals:

1P = unison
3M = major third
3m = minor third
4P = perfect fourth
4A = augmented fourth
5P = perfect fifth
5d = diminished fifth

**Parameters:**

- `amount` : `string | number` — Either number of semitones or interval string.

**Examples:**

```js
"c2 c3".fast(2).transpose("<0 -2 5 3>".slow(2)).note()
```

```js
"c2 c3".fast(2).transpose("<1P -2M 4P 3m>".slow(2)).note()
```

---

## `scaleTranspose`

**Tags:** `tonal`
**Synonyms:** `scaleTrans`, `strans`

Transposes notes inside the scale by the number of steps.
Expected to be called on a Pattern which already has a {@link Pattern#scale}

**Parameters:**

- `offset` : `offset` — number of steps inside the scale

**Examples:**

```js
"-8 [2,4,6]"
.scale('C4 bebop major')
.scaleTranspose("<0 -1 -2 -3 -4 -5 -6 -4>")
.note()
```

---

## `scale`

**Tags:** `tonal`

Turns numbers into notes in the scale (zero indexed) or quantizes notes to a scale.
When describing notes via numbers, note that negative numbers can be used to wrap backwards
in the scale as well as sharps or flats to produce notes outside of the scale.
Also sets scale for other scale operations, like {@link Pattern#scaleTranspose}.
A scale consists of a root note (e.g. c4, c, f#, bb4) followed by semicolon (':') and then a scale type.
The scale name must be written without spaces (because it would be interpreted as a multi-step pattern otherwise).
If your scale name includes spaces, replace them with colons.
The root note defaults to octave 3, if no octave number is given.

**Parameters:**

- `scale` : `string` — Name of scale

**Examples:**

```js
n("0 2 4 6 4 2").scale("C:major")
```

```js
n("[0,7] 4 [2,7] 4")
.scale("C:<major minor>/2")
.s("piano")
```

```js
n(rand.range(0,12).segment(8))
.scale("C:ritusen")
.s("piano")
```

```js
n("<[0,7b] [-4# -4] [-2,7##] 4 [0,7] [-4# -4b] [-2,7###] 4b>*4")
.scale("C:<major minor>/2")
.s("piano")
```

```js
note("C1*16").transpose(irand(36)).scale('Cb2 major').scaleTranspose(3)
```

```js
n("[0 0] [1 2] [3 4] [5 6]").scale("C:major:blues")
```

---

## `addVoicings`

**Tags:** `tonal`

Adds a new custom voicing dictionary.

**Parameters:**

- `name` : `string` — identifier for the voicing dictionary
- `dictionary` : `Object` — maps chord symbol to possible voicings
- `range` : `Array` — min, max note

**Examples:**

```js
addVoicings('cookie', {
  7: ['3M 7m 9M 12P 15P', '7m 10M 13M 16M 19P'],
  '^7': ['3M 6M 9M 12P 14M', '7M 10M 13M 16M 19P'],
  m7: ['8P 11P 14m 17m 19P', '5P 8P 11P 14m 17m'],
  m7b5: ['3m 5d 8P 11P 14m', '5d 8P 11P 14m 17m'],
  o7: ['3m 6M 9M 11A 15P'],
  '7alt': ['3M 7m 10m 13m 15P'],
  '7#11': ['7m 10m 13m 15P 17m'],
}, ['C3', 'C6'])
"<C^7 A7 Dm7 G7>".voicings('cookie').note()
```

---

## `voicings`

**Tags:** `tonal`

DEPRECATED: still works, but it is recommended you use .voicing instead (without s).
Turns chord symbols into voicings, using the smoothest voice leading possible.
Uses chord-voicings package.

**Parameters:**

- `dictionary` : `string` — which voicing dictionary to use.

**Examples:**

```js
stack("<C^7 A7 Dm7 G7>".voicings('lefthand'), "<C3 A2 D3 G2>").note()
```

---

## `rootNotes`

**Tags:** `tonal`

Maps the chords of the incoming pattern to root notes in the given octave.

**Parameters:**

- `octave` : `octave` — octave to use

**Examples:**

```js
"<C^7 A7 Dm7 G7>".rootNotes(2).note()
```

---

## `voicing`

**Tags:** `tonal`

Turns chord symbols into voicings. You can use the following control params:

chord: Note, followed by chord symbol, e.g. C Am G7 Bb^7
dict: voicing dictionary to use, falls back to default dictionary
anchor: the note that is used to align the chord
mode: how the voicing is aligned to the anchor

below: top note <= anchor
duck: top note <= anchor, anchor excluded
above: bottom note >= anchor


offset: whole number that shifts the voicing up or down to the next voicing
n: if set, the voicing is played like a scale. Overshooting numbers will be octaved

All of the above controls are optional, except chord.
If you pass a pattern of strings to voicing, they will be interpreted as chords.

**Examples:**

```js
n("0 1 2 3").chord("<C Am F G>").voicing()
```

---

## `tune`

**Tags:** `tonal`

Assumes pattern contains numerical scale degrees on the i control (see examples below). Accepts a scale name or list of frequencies (see all available names at the link on the reference). Returns a new pattern with all values mapped to a frequency ratio. Similar to xen.

**Parameters:**

- `scale` : `string | Array.<number>`

**Examples:**

```js
i("0 1 2 3 4 5").tune("hexany15").mul("220").freq()
```

```js
// You can set your root to be a
// particular note with getFreq:
i("4 8 9 10 - - 5 7 9 11 - -").tune("tranh3")
  .mul(getFreq('c3'))
  .freq().clip(.5).room(1)
```

```js
// You can also give tune a list of
// frequencies to use as the scale:
i("0 1 2 3 4").tune([
  261.6255653006,
  302.72962012827,
  350.29154279212,
  405.32593044476,
  469.00678383895,
  523.2511306012
]).mul(220).freq();
```

---

## `xen`

**Tags:** `tonal`

Assumes a numerical pattern of scale steps, and a scale. Scales accepted are all preset scale names of tune, arbitrary edos such as 31edo, or an array of frequency ratios. Assumes scales repeat at octave (2/1). Returns a new pattern with all values mapped to their associated frequency, assuming a base frequency of 220hz.

**Parameters:**

- `scaleNameOrRatios` : `string | Array.<number>`

**Examples:**

```js
// A minor triad in 31edo:
i("0 8 18").xen("31edo").piano()
```

```js
// You can also use xen with frequency ratios.
// This is equivalent to the above:
i("0 1 2").xen([
  Math.pow(2, 0/31),
  Math.pow(2, 8/31),
  Math.pow(2, 18/31),
]).piano()
```

```js
// xen also supports all scale names that
// tune does:
i("0 1 2 3 4 5").xen("hexany15")
// equiv to:
// "0 1 2 3 4 5".tune("hexany15").mul("220").freq()
```

```js
i("0 1 2 3 4 5 6 7").xen("<5edo 10edo 15edo hexany15>")
```

---

## `withBase`

**Tags:** `tonal`

Assumes pattern of frequencies tuned to some base frequency, such as the output of xen
Because xen defaults to 220Hz, so will withBase.
but you can specify a different original base with the standard optional array syntax ':'

**Parameters:**

- `base` : `number`
- `(optional)` : `number` — originalBase

**Examples:**

```js
i("[0 1 2 3] [3 4] [4 3 2 1]").xen("hexany23").withBase("<220 [300 200]>")
```

```js
mini([1 / 1, 16 / 15, 9 / 8, 6 / 5, 5 / 4].join(' ')).withBase("220:1")
// mini([1 / 1, 16 / 15, 9 / 8, 6 / 5, 5 / 4].join(' ')).mul(220).freq()
```

---

## `ftranspose`

**Tags:** `tonal`
**Synonyms:** `ftrans`, `fTrans`, `ftranspose`, `fTranspose`

Frequency transpose. Assumes pattern either has freq set, or has values that can be interpreted as frequencies
amt has optional edoSize param, defaults to 12.
If haps have edoSize param set, such as from the output of xen("31edo"),
ftrans will fallback to that instead of 12 as the default.
Transposes the frequency by amt edoSteps

**Parameters:**

- `amt` : `number`
- `edoSize` : `number` — (optional)

**Examples:**

```js
i("0 1 2").xen("12edo").ftrans("7")
// n("0 1 2").scale("A:chromatic").trans("7")
```

```js
i("0 8 18").xen("31edo").ftrans("<8 -8>")
```

```js
// to transpose by steps of an edo, use "step:edo" :
i("0 7 8 18").xen("31edo").ftrans("<0 1:31 1:12>")
```

```js
// it can also work with frequency values directly
freq("200 300 400").ftrans("<0 7:31 7>")
```
