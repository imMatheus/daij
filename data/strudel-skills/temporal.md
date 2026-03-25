# temporal

94 functions

---

## `euclid`

**Tags:** `temporal`

Changes the structure of the pattern to form an Euclidean rhythm.
Euclidean rhythms are rhythms obtained using the greatest common
divisor of two numbers.  They were described in 2004 by Godfried
Toussaint, a Canadian computer scientist.  Euclidean rhythms are
really useful for computer/algorithmic music because they can
describe a large number of rhythms with a couple of numbers.

**Parameters:**

- `pulses` : `number` — the number of onsets/beats
- `steps` : `number` — the number of steps to fill

**Examples:**

```js
// The Cuban tresillo pattern.
note("c3").euclid(3,8)
```

---

## `euclidRot`

**Tags:** `temporal`

Like euclid, but has an additional parameter for 'rotating' the resulting sequence.

**Parameters:**

- `pulses` : `number` — the number of onsets/beats
- `steps` : `number` — the number of steps to fill
- `rotation` : `number` — offset in steps

**Examples:**

```js
// A Samba rhythm necklace from Brazil
note("c3").euclidRot(3,16,14)
```

---

## `euclidLegato`

**Tags:** `temporal`

Similar to euclid, but each pulse is held until the next pulse,
so there will be no gaps.

**Parameters:**

- `pulses` : `number` — the number of onsets/beats
- `steps` : `number` — the number of steps to fill
- `rotation` : `any` — offset in steps
- `pat` : `any`

**Examples:**

```js
note("c3").euclidLegato(3,8)
```

---

## `euclidLegatoRot`

**Tags:** `temporal`

Similar to euclid, but each pulse is held until the next pulse,
so there will be no gaps, and has an additional parameter for 'rotating'
the resulting sequence

**Parameters:**

- `pulses` : `number` — the number of onsets/beats
- `steps` : `number` — the number of steps to fill
- `rotation` : `number` — offset in steps

**Examples:**

```js
note("c3").euclidLegatoRot(3,5,2)
```

---

## `euclidish`

**Tags:** `temporal`
**Synonyms:** `eish`

A 'euclid' variant with an additional parameter that morphs the resulting
rhythm from 0 (no morphing) to 1 (completely 'even'). For example
sound("bd").euclidish(3,8,0) would be the same as
sound("bd").euclid(3,8), and sound("bd").euclidish(3,8,1) would be the
same as sound("bd bd bd"). sound("bd").euclidish(3,8,0.5) would have a
groove somewhere between.
Inspired by the work of Malcom Braff.

**Parameters:**

- `pulses` : `number` — the number of onsets
- `steps` : `number` — the number of steps to fill
- `groove` : `number` — exists between the extremes of 0 (straight euclidian) and 1 (straight pulse)

**Examples:**

```js
sound("hh").euclidish(7,12,sine.slow(8))
.pan(sine.slow(8))
```

---

## `into`

**Tags:** `temporal`

Breaks a pattern into pieces according to the structure of a given pattern.
True values in the given pattern cause the corresponding subcycle of the
source pattern to be looped, and for an (optional) given function to be
applied. False values result in the corresponding part of the source pattern
to be played unchanged.

**Examples:**

```js
sound("bd sd ht lt").into("1 0", hurry(2))
```

---

## `arpWith`

**Tags:** `temporal`

Selects indices in in stacked notes.

**Examples:**

```js
note("<[c,eb,g]!2 [c,f,ab] [d,f,ab]>")
.arpWith(haps => haps[2])
```

---

## `arp`

**Tags:** `temporal`

Selects indices in in stacked notes.

**Examples:**

```js
note("<[c,eb,g]!2 [c,f,ab] [d,f,ab]>")
.arp("0 [0,2] 1 [0,2]")
```

---

## `struct`

**Tags:** `temporal`

Applies the given structure to the pattern:

**Examples:**

```js
note("c,eb,g")
  .struct("x ~ x ~ ~ x ~ x ~ ~ ~ x ~ x ~ ~")
  .slow(2)
```

---

## `mask`

**Tags:** `temporal`

Returns silence when mask is 0 or "~"

**Examples:**

```js
note("c [eb,g] d [eb,g]").mask("<1 [0 1]>")
```

---

## `reset`

**Tags:** `temporal`

Resets the pattern to the start of the cycle for each onset of the reset pattern.

**Examples:**

```js
s("[<bd lt> sd]*2, hh*8").reset("<x@3 x(5,8)>")
```

---

## `restart`

**Tags:** `temporal`

Restarts the pattern for each onset of the restart pattern.
While reset will only reset the current cycle, restart will start from cycle 0.

**Examples:**

```js
s("[<bd lt> sd]*2, hh*8").restart("<x@3 x(5,8)>")
```

---

## `sequenceP`

**Tags:** `temporal`

Takes a list of patterns, and returns a pattern of lists.

---

## `stack`

**Tags:** `temporal`
**Synonyms:** `polyrhythm`, `pr`

The given items are played at the same time at the same length.

**Examples:**

```js
stack("g3", "b3", ["e4", "d4"]).note()
// "g3,b3,[e4 d4]".note()
```

```js
// As a chained function:
s("hh*4").stack(
  note("c4(5,8)")
)
```

---

## `compress`

**Tags:** `temporal`

Compress each cycle into the given timespan, leaving a gap

**Examples:**

```js
cat(
  s("bd sd").compress(.25,.75),
  s("~ bd sd ~")
)
```

---

## `fastGap`

**Tags:** `temporal`
**Synonyms:** `fastgap`

speeds up a pattern like fast, but rather than it playing multiple times as fast would it instead leaves a gap in the remaining space of the cycle. For example, the following will play the sound pattern "bd sn" only once but compressed into the first half of the cycle, i.e. twice as fast.

**Examples:**

```js
s("bd sd").fastGap(2)
```

---

## `focus`

**Tags:** `temporal`

Similar to compress, but doesn't leave gaps, and the 'focus' can be bigger than a cycle

**Examples:**

```js
s("bd hh sd hh").focus(1/4, 3/4)
```

---

## `ply`

**Tags:** `temporal`

The ply function repeats each event the given number of times.

**Examples:**

```js
s("bd ~ sd cp").ply("<1 2 3>")
```

---

## `fast`

**Tags:** `temporal`
**Synonyms:** `density`

Speed up a pattern by the given factor. Used by "*" in mini notation.

**Parameters:**

- `factor` : `number | Pattern` — speed up factor

**Examples:**

```js
s("bd hh sd hh").fast(2) // s("[bd hh sd hh]*2")
```

---

## `hurry`

**Tags:** `temporal`

Both speeds up the pattern (like 'fast') and the sample playback (like 'speed').

**Examples:**

```js
s("bd sd:2").hurry("<1 2 4 3>").slow(1.5)
```

---

## `slow`

**Tags:** `temporal`
**Synonyms:** `sparsity`

Slow down a pattern over the given number of cycles. Like the "/" operator in mini notation.

**Parameters:**

- `factor` : `number | Pattern` — slow down factor

**Examples:**

```js
s("bd hh sd hh").slow(2) // s("[bd hh sd hh]/2")
```

---

## `inside`

**Tags:** `temporal`

Carries out an operation 'inside' a cycle.

**Examples:**

```js
"0 1 2 3 4 3 2 1".inside(4, rev).scale('C major').note()
// "0 1 2 3 4 3 2 1".slow(4).rev().fast(4).scale('C major').note()
```

---

## `outside`

**Tags:** `temporal`

Carries out an operation 'outside' a cycle.

**Examples:**

```js
"<[0 1] 2 [3 4] 5>".outside(4, rev).scale('C major').note()
// "<[0 1] 2 [3 4] 5>".fast(4).rev().slow(4).scale('C major').note()
```

---

## `lastOf`

**Tags:** `temporal`

Applies the given function every n cycles, starting from the last cycle.

**Parameters:**

- `n` : `number` — how many cycles
- `func` : `function` — function to apply

**Examples:**

```js
note("c3 d3 e3 g3").lastOf(4, x=>x.rev())
```

---

## `firstOf`

**Tags:** `temporal`

Applies the given function every n cycles, starting from the first cycle.

**Parameters:**

- `n` : `number` — how many cycles
- `func` : `function` — function to apply

**Examples:**

```js
note("c3 d3 e3 g3").firstOf(4, x=>x.rev())
```

---

## `every`

**Tags:** `temporal`

An alias for firstOf

**Parameters:**

- `n` : `number` — how many cycles
- `func` : `function` — function to apply

**Examples:**

```js
note("c3 d3 e3 g3").every(4, x=>x.rev())
```

---

## `cpm`

**Tags:** `temporal`

Plays the pattern at the given cycles per minute.

**Examples:**

```js
s("<bd sd>,hh*2").cpm(90) // = 90 bpm
```

---

## `early`

**Tags:** `temporal`

Nudge a pattern to start earlier in time. Equivalent of Tidal's <~ operator

**Parameters:**

- `cycles` : `number | Pattern` — number of cycles to nudge left

**Examples:**

```js
"bd ~".stack("hh ~".early(.1)).s()
```

---

## `late`

**Tags:** `temporal`

Nudge a pattern to start later in time. Equivalent of Tidal's ~> operator

**Parameters:**

- `cycles` : `number | Pattern` — number of cycles to nudge right

**Examples:**

```js
"bd ~".stack("hh ~".late(.1)).s()
```

---

## `zoom`

**Tags:** `temporal`

Plays a portion of a pattern, specified by the beginning and end of a time span. The new resulting pattern is played over the time period of the original pattern:

**Examples:**

```js
s("bd*2 hh*3 [sd bd]*2 perc").zoom(0.25, 0.75)
// s("hh*3 [sd bd]*2") // equivalent
```

---

## `bite`

**Tags:** `temporal`

Splits a pattern into the given number of slices, and plays them according to a pattern of slice numbers.
Similar to slice, but slices up patterns rather than sound samples.

**Parameters:**

- `number` : `number` — of slices
- `slices` : `number` — to play

**Examples:**

```js
note("0 1 2 3 4 5 6 7".scale('c:mixolydian'))
.bite(4, "3 2 1 0")
```

```js
sound("bd - bd bd*2, - sd:6 - sd:5 sd:1 - [- sd:2] -, hh [- cp:7]")
  .bank("RolandTR909").speed(1.2)
  .bite(4, "0 0 [1 2] <3 2> 0 0 [2 1] 3")
```

---

## `linger`

**Tags:** `temporal`

Selects the given fraction of the pattern and repeats that part to fill the remainder of the cycle.

**Parameters:**

- `fraction` : `number` — fraction to select

**Examples:**

```js
s("lt ht mt cp, [hh oh]*2").linger("<1 .5 .25 .125>")
```

---

## `segment`

**Tags:** `temporal`
**Synonyms:** `seg`

Samples the pattern at a rate of n events per cycle. Useful for turning a continuous pattern into a discrete one.

**Parameters:**

- `segments` : `number` — number of segments per cycle

**Examples:**

```js
note(saw.range(40,52).segment(24))
```

---

## `swingBy`

**Tags:** `temporal`

The function swingBy x n breaks each cycle into n slices, and then delays events in the second half of each slice by the amount x, which is relative to the size of the (half) slice. So if x is 0 it does nothing, 0.5 delays for half the note duration, and 1 will wrap around to doing nothing again. The end result is a shuffle or swing-like rhythm

**Parameters:**

- `subdivision` : `number`
- `offset` : `number`

**Examples:**

```js
s("hh*8").swingBy(1/3, 4)
```

---

## `swing`

**Tags:** `temporal`

Shorthand for swingBy with 1/3:

**Parameters:**

- `subdivision` : `number`

**Examples:**

```js
s("hh*8").swing(4)
// s("hh*8").swingBy(1/3, 4)
```

---

## `invert`

**Tags:** `temporal`
**Synonyms:** `inv`

Swaps 1s and 0s in a binary pattern.

**Examples:**

```js
s("bd").struct("1 0 0 1 0 0 1 0".lastOf(4, invert))
```

---

## `when`

**Tags:** `temporal`

Applies the given function whenever the given pattern is in a true state.

**Parameters:**

- `binary_pat` : `Pattern`
- `func` : `function`

**Examples:**

```js
"c3 eb3 g3".when("<0 1>/2", x=>x.sub("5")).note()
```

---

## `off`

**Tags:** `temporal`

Superimposes the function result on top of the original pattern, delayed by the given time.

**Parameters:**

- `time` : `Pattern | number` — offset time
- `func` : `function` — function to apply

**Examples:**

```js
"c3 eb3 g3".off(1/8, x=>x.add(7)).note()
```

---

## `brak`

**Tags:** `temporal`

Returns a new pattern where every other cycle is played once, twice as
fast, and offset in time by one quarter of a cycle. Creates a kind of
breakbeat feel.

---

## `rev`

**Tags:** `temporal`

Reverse all cycles in a pattern. See also revv for reversing a whole pattern.

**Examples:**

```js
note("c d e g").rev()
```

---

## `revv`

**Tags:** `temporal`

Reverse a whole pattern. See also rev for reversing each cycle.

**Examples:**

```js
// This is the same as `<[g e] [d c]>`. If `rev()` is used, you get
// the same as `<[d c] [g e]>`, where each cycle reverses, but the order of
// cycles stays the same.
note("<[c d] [e g]>").revv()
```

---

## `pressBy`

**Tags:** `temporal`

Like press, but allows you to specify the amount by which each
event is shifted. pressBy(0.5) is the same as press, while
pressBy(1/3) shifts each event by a third of its timespan.

**Examples:**

```js
stack(s("hh*4"),
      s("bd mt sd ht").pressBy("<0 0.5 0.25>")
     ).slow(2)
```

---

## `press`

**Tags:** `temporal`

Syncopates a rhythm, by shifting each event halfway into its timespan.

**Examples:**

```js
stack(s("hh*4"),
      s("bd mt sd ht").every(4, press)
     ).slow(2)
```

---

## `hush`

**Tags:** `temporal`

Silences a pattern.

**Examples:**

```js
stack(
  s("bd").hush(),
  s("hh*3")
)
```

---

## `palindrome`

**Tags:** `temporal`

Applies rev to a pattern every other cycle, so that the pattern alternates between forwards and backwards.

**Examples:**

```js
note("c d e g").palindrome()
```

---

## `juxBy`

**Tags:** `temporal`
**Synonyms:** `juxby`

Jux with adjustable stereo width. 0 = mono, 1 = full stereo.

**Examples:**

```js
s("bd lt [~ ht] mt cp ~ bd hh").juxBy("<0 .5 1>/2", rev)
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

## `echoWith`

**Tags:** `temporal`, `functional`
**Synonyms:** `echowith`, `stutWith`, `stutwith`

Superimpose and offset multiple times, applying the given function each time.

**Parameters:**

- `times` : `number` — how many times to repeat
- `time` : `number` — cycle offset between iterations
- `func` : `function` — function to apply, given the pattern and the iteration index

**Examples:**

```js
"<0 [2 4]>"
.echoWith(4, 1/8, (p,n) => p.add(n*2))
.scale("C:minor").note()
```

---

## `echo`

**Tags:** `temporal`

Superimpose and offset multiple times, gradually decreasing the velocity

**Parameters:**

- `times` : `number` — how many times to repeat
- `time` : `number` — cycle offset between iterations
- `feedback` : `number` — velocity multiplicator for each iteration

**Examples:**

```js
s("bd sd").echo(3, 1/6, .8)
```

---

## `stut`

**Tags:** `temporal`

Deprecated. Like echo, but the last 2 parameters are flipped.

**Parameters:**

- `times` : `number` — how many times to repeat
- `feedback` : `number` — velocity multiplicator for each iteration
- `time` : `number` — cycle offset between iterations

**Examples:**

```js
s("bd sd").stut(3, .8, 1/6)
```

---

## `plyWith`

**Tags:** `temporal`
**Synonyms:** `plywith`

The plyWith function repeats each event the given number of times, applying the given function to each event.\n

**Parameters:**

- `factor` : `number` — how many times to repeat
- `func` : `function` — function to apply, given the pattern

**Examples:**

```js
"<0 [2 4]>"
.plyWith(4, (p) => p.add(2))
.scale("C:minor").note()
```

---

## `plyForEach`

**Tags:** `temporal`
**Synonyms:** `plyforeach`

The plyForEach function repeats each event the given number of times, applying the given function to each event.
This version of ply uses the iteration index as an argument to the function, similar to echoWith.

**Parameters:**

- `factor` : `number` — how many times to repeat
- `func` : `function` — function to apply, given the pattern and the iteration index

**Examples:**

```js
"<0 [2 4]>"
.plyForEach(4, (p,n) => p.add(n*2))
.scale("C:minor").note()
```

---

## `iter`

**Tags:** `temporal`

Divides a pattern into a given number of subdivisions, plays the subdivisions in order, but increments the starting subdivision each cycle. The pattern wraps to the first subdivision after the last subdivision is played.

**Examples:**

```js
note("0 1 2 3".scale('A minor')).iter(4)
```

---

## `iterBack`

**Tags:** `temporal`
**Synonyms:** `iterback`

Like iter, but plays the subdivisions in reverse order. Known as iter' in tidalcycles

**Examples:**

```js
note("0 1 2 3".scale('A minor')).iterBack(4)
```

---

## `repeatCycles`

**Tags:** `temporal`

Repeats each cycle the given number of times.

**Examples:**

```js
note(irand(12).add(34)).segment(4).repeatCycles(2).s("gm_acoustic_guitar_nylon")
```

---

## `chunk`

**Tags:** `temporal`, `functional`
**Synonyms:** `slowChunk`, `slowchunk`

Divides a pattern into a given number of parts, then cycles through those parts in turn, applying the given function to each part in turn (one part per cycle).

**Examples:**

```js
"0 1 2 3".chunk(4, x=>x.add(7))
.scale("A:minor").note()
```

---

## `chunkBack`

**Tags:** `temporal`
**Synonyms:** `chunkback`

Like chunk, but cycles through the parts in reverse order. Known as chunk' in tidalcycles

**Examples:**

```js
"0 1 2 3".chunkBack(4, x=>x.add(7))
.scale("A:minor").note()
```

---

## `fastChunk`

**Tags:** `temporal`
**Synonyms:** `fastchunk`

Like chunk, but the cycles of the source pattern aren't repeated
for each set of chunks.

**Examples:**

```js
"<0 8> 1 2 3 4 5 6 7"
.scale("C2:major").note()
.fastChunk(4, x => x.color('red')).slow(2)
```

---

## `chunkInto`

**Tags:** `temporal`
**Synonyms:** `chunkinto`

Like chunk, but the function is applied to a looped subcycle of the source pattern.

**Examples:**

```js
sound("bd sd ht lt bd - cp lt").chunkInto(4, hurry(2))
  .bank("tr909")
```

---

## `chunkBackInto`

**Tags:** `temporal`
**Synonyms:** `chunkbackinto`

Like chunkInto, but moves backwards through the chunks.

**Examples:**

```js
sound("bd sd ht lt bd - cp lt").chunkInto(4, hurry(2))
  .bank("tr909")
```

---

## `ribbon`

**Tags:** `temporal`
**Synonyms:** `rib`

Loops the pattern inside an offset for cycles.
If you think of the entire span of time in cycles as a ribbon, you can cut a single piece and loop it.

**Parameters:**

- `offset` : `number` — start point of loop in cycles
- `cycles` : `number` — loop length in cycles

**Examples:**

```js
note("<c d e f>").ribbon(1, 2)
```

```js
// Looping a portion of randomness
n(irand(8).segment(4)).scale("c:pentatonic").ribbon(1337, 2)
```

```js
// rhythm generator
s("bd!16?").ribbon(29,.5)
```

---

## `tag`

**Tags:** `temporal`

Tags each Hap with an identifier. Good for filtering. The function populates Hap.context.tags (Array).

**Parameters:**

- `tag` : `string` — anything unique

**Examples:**

```js
s("saw!16").note("F1")
  .lpf(tri.range(40, 80).slow(4)).lpenv(5).lpq(4).lpd(0.15)
  .when(rand.late(0.1).gte(0.5), x => x.transpose("12").tag('altered'))
  .when(rand.late(0.2).gte(0.5), x => x.s("square").tag('altered'))
  .when("<0 1>", x => x.filter((hap) => hap.hasTag('altered')))
```

---

## `filter`

**Tags:** `temporal`, `functional`

Filters haps using the given function

**Parameters:**

- `test` : `function` — function to test Hap

**Examples:**

```js
s("hh!7 oh").filter(hap => hap.value.s === 'hh')
```

---

## `filterWhen`

**Tags:** `temporal`, `functional`

Filters haps by their begin time

**Parameters:**

- `test` : `function` — function to test Hap.whole.begin

**Examples:**

```js
oneCycle: s("bd*4").filterWhen((t) => t < 1)
```

---

## `within`

**Tags:** `temporal`, `functional`

Use within to apply a function to only a part of a pattern.

**Parameters:**

- `start` : `number` — start within cycle (0 - 1)
- `end` : `number` — end within cycle (0 - 1). Must be > start
- `func` : `function` — function to be applied to the sub-pattern

---

## `beat`

**Tags:** `temporal`

creates a structure pattern from divisions of a cycle
especially useful for creating rhythms

**Examples:**

```js
s("bd").beat("0,7,10", 16)
```

```js
s("sd").beat("4,12", 16)
```

---

## `morph`

**Tags:** `temporal`

Takes two binary rhythms represented as lists of 1s and 0s, and a number
between 0 and 1 that morphs between them. The two lists should contain the same
number of true values.

**Examples:**

```js
sound("hh").struct(morph([1,0,1,0,1,0,1,0], // straight rhythm
                         [1,1,0,1,0,1,0], // wonky rhythm
                         0.25 // creates a slightly wonky rhythm
                        )
                  )
```

```js
sound("hh").struct(morph("1:0:1:0:1:0:1:0", // straight rhythm
                         "1:1:0:1:0:1:0", // wonky rhythm
                         sine.slow(8) // slowly morph between the rhythms
                        )
                  )
```

---

## `setcpm`

**Tags:** `temporal`

Changes the global tempo to the given cycles per minute

**Parameters:**

- `cpm` : `number` — cycles per minute

**Examples:**

```js
setcpm(140/4) // =140 bpm in 4/4
$: s("bd*4,[- sd]*2").bank('tr707')
```

---

## `shuffle`

**Tags:** `temporal`

Slices a pattern into the given number of parts, then plays those parts in random order.
Each part will be played exactly once per cycle.

**Examples:**

```js
note("c d e f").sound("piano").shuffle(4)
```

```js
seq("c d e f".shuffle(4), "g").note().sound("piano")
```

---

## `scramble`

**Tags:** `temporal`

Slices a pattern into the given number of parts, then plays those parts at random. Similar to shuffle,
but parts might be played more than once, or not at all, per cycle.

**Examples:**

```js
note("c d e f").sound("piano").scramble(4)
```

```js
seq("c d e f".scramble(4), "g").note().sound("piano")
```

---

## `chooseWith`

**Tags:** `temporal`

Choose from the list of values (or patterns of values) using the given
pattern of numbers, which should be in the range of 0..1

**Parameters:**

- `pat` : `Pattern`
- `xs` : `*`

**Examples:**

```js
note("c2 g2!2 d2 f1").s(chooseWith(sine.fast(2), ["sawtooth", "triangle", "bd:6"]))
```

---

## `chooseInWith`

**Tags:** `temporal`

As with {chooseWith}, but the structure comes from the chosen values, rather
than the pattern you're using to choose with.

**Parameters:**

- `pat` : `Pattern`
- `xs` : `*`

---

## `choose`

**Tags:** `temporal`

Chooses randomly from the given list of elements.

**Parameters:**

- `xs` : `any` — values / patterns to choose from.

**Examples:**

```js
note("c2 g2!2 d2 f1").s(choose("sine", "triangle", "bd:6"))
```

---

## `choose2`

**Tags:** `temporal`

As with choose, but the pattern that this method is called on should be
in the range -1 .. 1

**Parameters:**

- `xs` : `any`

---

## `chooseCycles`

**Tags:** `temporal`
**Synonyms:** `randcat`

Picks one of the elements at random each cycle.

**Examples:**

```js
chooseCycles("bd", "hh", "sd").s().fast(8)
```

```js
s("bd | hh | sd").fast(8)
```

---

## `wchoose`

**Tags:** `temporal`

Chooses randomly from the given list of elements by giving a probability to each element

**Parameters:**

- `pairs` : `any` — arrays of value and weight

**Examples:**

```js
note("c2 g2!2 d2 f1").s(wchoose(["sine",10], ["triangle",1], ["bd:6",1]))
```

---

## `wchooseCycles`

**Tags:** `temporal`
**Synonyms:** `wrandcat`

Picks one of the elements at random each cycle by giving a probability to each element

**Examples:**

```js
wchooseCycles(["bd",10], ["hh",1], ["sd",1]).s().fast(8)
```

```js
wchooseCycles(["c c c",5], ["a a a",3], ["f f f",1]).fast(4).note()
```

```js
// The probability can itself be a pattern
wchooseCycles(["bd(3,8)","<5 0>"], ["hh hh hh",3]).fast(4).s()
```

---

## `degradeBy`

**Tags:** `temporal`

Randomly removes events from the pattern by a given amount.
0 = 0% chance of removal
1 = 100% chance of removal

**Parameters:**

- `amount` : `number` — a number between 0 and 1

**Examples:**

```js
s("hh*8").degradeBy(0.2)
```

```js
s("[hh?0.2]*8")
```

```js
//beat generator
s("bd").segment(16).degradeBy(.5).ribbon(16,1)
```

---

## `degrade`

**Tags:** `temporal`

Randomly removes 50% of events from the pattern. Shorthand for .degradeBy(0.5)

**Examples:**

```js
s("hh*8").degrade()
```

```js
s("[hh?]*8")
```

---

## `undegradeBy`

**Tags:** `temporal`

Inverse of degradeBy: Randomly removes events from the pattern by a given amount.
0 = 100% chance of removal
1 = 0% chance of removal
Events that would be removed by degradeBy are let through by undegradeBy and vice versa (see second example).

**Parameters:**

- `amount` : `number` — a number between 0 and 1

**Examples:**

```js
s("hh*8").undegradeBy(0.2)
```

```js
s("hh*10").layer(
  x => x.degradeBy(0.2).pan(0),
  x => x.undegradeBy(0.8).pan(1)
)
```

---

## `undegrade`

**Tags:** `temporal`

Inverse of degrade: Randomly removes 50% of events from the pattern. Shorthand for .undegradeBy(0.5)
Events that would be removed by degrade are let through by undegrade and vice versa (see second example).

**Examples:**

```js
s("hh*8").undegrade()
```

```js
s("hh*10").layer(
  x => x.degrade().pan(0),
  x => x.undegrade().pan(1)
)
```

---

## `sometimesBy`

**Tags:** `temporal`

Randomly applies the given function by the given probability.
Similar to someCyclesBy

**Parameters:**

- `probability` : `number | Pattern` — a number between 0 and 1
- `function` : `function` — the transformation to apply

**Examples:**

```js
s("hh*8").sometimesBy(.4, x=>x.speed("0.5"))
```

---

## `sometimes`

**Tags:** `temporal`

Applies the given function with a 50% chance

**Parameters:**

- `function` : `function` — the transformation to apply

**Examples:**

```js
s("hh*8").sometimes(x=>x.speed("0.5"))
```

---

## `someCyclesBy`

**Tags:** `temporal`

Randomly applies the given function by the given probability on a cycle by cycle basis.
Similar to sometimesBy

**Parameters:**

- `probability` : `number | Pattern` — a number between 0 and 1
- `function` : `function` — the transformation to apply

**Examples:**

```js
s("bd,hh*8").someCyclesBy(.3, x=>x.speed("0.5"))
```

---

## `someCycles`

**Tags:** `temporal`

Shorthand for .someCyclesBy(0.5, fn)

**Examples:**

```js
s("bd,hh*8").someCycles(x=>x.speed("0.5"))
```

---

## `often`

**Tags:** `temporal`

Shorthand for .sometimesBy(0.75, fn)

**Examples:**

```js
s("hh*8").often(x=>x.speed("0.5"))
```

---

## `rarely`

**Tags:** `temporal`

Shorthand for .sometimesBy(0.25, fn)

**Examples:**

```js
s("hh*8").rarely(x=>x.speed("0.5"))
```

---

## `almostNever`

**Tags:** `temporal`

Shorthand for .sometimesBy(0.1, fn)

**Examples:**

```js
s("hh*8").almostNever(x=>x.speed("0.5"))
```

---

## `almostAlways`

**Tags:** `temporal`

Shorthand for .sometimesBy(0.9, fn)

**Examples:**

```js
s("hh*8").almostAlways(x=>x.speed("0.5"))
```

---

## `never`

**Tags:** `temporal`

Shorthand for .sometimesBy(0, fn) (never calls fn)

**Examples:**

```js
s("hh*8").never(x=>x.speed("0.5"))
```

---

## `always`

**Tags:** `temporal`

Shorthand for .sometimesBy(1, fn) (always calls fn)

**Examples:**

```js
s("hh*8").always(x=>x.speed("0.5"))
```

---

## `cyclesPer`

**Tags:** `temporal`

A pattern measuring the duration of events,
in cycles per event. cyclesPer doesn't have structure itself, but takes structure, and therefore
event durations, from the pattern that it is combined with.
For example cyclesPer.struct("1 1 [1 1] 1") would give the same as "0.25 0.25 [0.125 0.125] 0.25".
See also its reciprocal, per, also known as perCycle.

**Examples:**

```js
// Shorter events are lower in pitch
sound("saw saw [saw saw] saw")
  .note(cyclesPer.range(50, 100))
```

```js
sound("bd sd [bd bd] sd*4 [- sd] [bd [bd bd]]")
  .note(cyclesPer.add(20))
```

---

## `per`

**Tags:** `temporal`
**Synonyms:** `perCycle`

A pattern measuring the 'shortness' of events, or in other words, the duration of pattern events,
in events per cycle. per doesn't have structure itself, but takes structure, and therefore
event durations, from the pattern that it is combined with.
For example per.struct("1 1 [1 1] 1") would give the same as "4 4 [8 8] 4".
See also its reciprocal, cyclesPer.

**Examples:**

```js
// Shorter events are more distorted
n("0 0*2 0 0*2 0 [0 0 0]@2").sound("bd")
 .distort(per.div(2))
```

---

## `perx`

**Tags:** `temporal`

Like per but measures the shortness of events according to an exponential curve. In
particular, where the event duration halves, the
returned value increases by one. perx.struct("1 1 [1 [1 1]] 1") would therefore be
the same as "3 3 [4 [5 5]] 3".
