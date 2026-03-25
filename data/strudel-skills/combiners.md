# combiners

30 functions

---

## `as`

**Tags:** `combiners`

Sets properties in a batch.

**Parameters:**

- `mapping` : `String | Array` — the control names that are set

**Examples:**

```js
"c:.5 a:1 f:.25 e:.8".as("note:clip")
```

```js
"{0@2 0.25 0 0.5 .3 .5}%8".as("begin").s("sax_vib").clip(1)
```

---

## `layer`

**Tags:** `combiners`

Layers the result of the given function(s). Like superimpose, but without the original pattern:

**Examples:**

```js
"<0 2 4 6 ~ 4 ~ 2 0!3 ~!5>*8"
  .layer(x=>x.add("0,2"))
  .scale('C minor').note()
```

---

## `superimpose`

**Tags:** `combiners`

Superimposes the result of the given function(s) on top of the original pattern:

**Examples:**

```js
"<0 2 4 6 ~ 4 ~ 2 0!3 ~!5>*8"
  .superimpose(x=>x.add(2))
  .scale('C minor').note()
```

---

## `set`

**Tags:** `internal`, `combiners`

When called on a pattern a, with a input pattern b (a.set(b)),
combines a and b such that anything defined in b
and anything defined in a that is not defined in b
will be in the resulting pattern.
The structure is maintained from a,
because the default pattern alignment is in,
see the section on Pattern Alignment
in the technical manual in the docs
This is the inverse of keep
See examples below

**Parameters:**

- `pat` : `Pattern`

**Examples:**

```js
// because input pattern has `s` set,
// it overrides the "sine" declared earlier
note("c a f e").s("sine").set(s("triangle"))
```

---

## `keep`

**Tags:** `internal`, `combiners`

When called on a pattern a, with a input pattern b (a.keep(b)),
combines a and b such that anything defined in a,
and anything defined in b that is not defined in a
will be in the resulting pattern
The structure is maintained from a,
because the default pattern alignment is in,
see the section on Pattern Alignment
in the technical manual in the docs
This is the inverse of set
See examples below

**Parameters:**

- `pat` : `Pattern`

**Examples:**

```js
// notes, already defined, will stay "c a f e",
// while "s", not defined, will be set to "piano"
note("c a f e").keep(note("e f a c").s("piano"))
```

---

## `setDefaultJoin`

**Tags:** `combiners`

Sets the default method of combining events from two patterns (aka alignment) in Strudel.
The default method is 'in', meaning that patterns to the left will (typically) dictate the event timings when combined with patterns to the right.
By changing alignment to 'out', the opposite will happen. With 'mix', they will combine their event timings.
Note that we say the default method, because alignments can also be set explicitly with calls like
'add.mix', 'set.squeeze', etc.

**Parameters:**

- `method` : `string` — Default join method to use. Options: 'in', 'out', 'mix', 'squeeze', 'squeezeout', 'reset', 'restart', 'poly'

**Examples:**

```js
setDefaultJoin('mix') // also try 'in', 'out', 'squeeze', etc.
s("saw").vel("1 0.5").note("F A C E").delay("0 0.2 0.3")
```

---

## `slowcat`

**Tags:** `combiners`
**Synonyms:** `cat`

Concatenation: combines a list of patterns, switching between them successively, one per cycle.

**Examples:**

```js
slowcat("e5", "b4", ["d5", "c5"])
```

---

## `slowcatPrime`

**Tags:** `combiners`

Concatenation: combines a list of patterns, switching between them successively, one per cycle. Unlike slowcat, this version will skip cycles.

**Parameters:**

- `items` : `any` — The items to concatenate

---

## `cat`

**Tags:** `combiners`
**Synonyms:** `slowcat`

The given items are concatenated, where each one takes one cycle.

**Parameters:**

- `items` : `any` — The items to concatenate

**Examples:**

```js
cat("e5", "b4", ["d5", "c5"]).note()
// "<e5 b4 [d5 c5]>".note()
```

```js
// As a chained function:
s("hh*4").cat(
   note("c4(5,8)")
)
```

---

## `arrange`

**Tags:** `combiners`

Allows to arrange multiple patterns together over multiple cycles.
Takes a variable number of arrays with two elements specifying the number of cycles and the pattern to use.

**Examples:**

```js
arrange(
  [4, "<c a f e>(3,8)"],
  [2, "<g a>(5,8)"]
).note()
```

---

## `seqPLoop`

**Tags:** `combiners`

Similarly to arrange, allows you to arrange multiple patterns together over multiple cycles.
Unlike arrange, you specify a start and stop time for each pattern rather than duration, which
means that patterns can overlap.

**Examples:**

```js
seqPLoop(
  [0, 2, "bd(3,8)"],
  [1, 3, "cp(3,8)"]
).sound()
```

---

## `sequence`

**Tags:** `combiners`

See fastcat

---

## `seq`

**Tags:** `combiners`
**Synonyms:** `fastcat`

Like cat, but the items are crammed into one cycle.

**Examples:**

```js
seq("e5", "b4", ["d5", "c5"]).note()
// "e5 b4 [d5 c5]".note()
```

```js
// As a chained function:
s("hh*4").seq(
  note("c4(5,8)")
)
```

---

## `apply`

**Tags:** `combiners`

Applies the given function to the pattern. Like layer, but with a single function:

**Examples:**

```js
"<c3 eb3 g3>".scale('C minor').apply(scaleTranspose("0,2,4")).note()
```

---

## `parray`

**Tags:** `combiners`

Turns a list of patterns into a single pattern which outputs list-values

---

## `pick`

**Tags:** `combiners`

Picks patterns (or plain values) either from a list (by index) or a lookup table (by name).
Similar to inhabit, but maintains the structure of the original patterns.

**Parameters:**

- `pat` : `Pattern`
- `xs` : `*`

**Examples:**

```js
note("<0 1 2!2 3>".pick(["g a", "e f", "f g f g" , "g c d"]))
```

```js
sound("<0 1 [2,0]>".pick(["bd sd", "cp cp", "hh hh"]))
```

```js
sound("<0!2 [0,1] 1>".pick(["bd(3,8)", "sd sd"]))
```

```js
s("<a!2 [a,b] b>".pick({a: "bd(3,8)", b: "sd sd"}))
```

---

## `pickmod`

**Tags:** `combiners`

The same as pick, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.
For example, if you pick the fifth pattern of a list of three, you'll get the
second one.

**Parameters:**

- `pat` : `Pattern`
- `xs` : `*`

---

## `pickF`

**Tags:** `combiners`, `functional`

pickF lets you use a pattern of numbers to pick which function to apply to another pattern.

**Parameters:**

- `pat` : `Pattern`
- `lookup` : `Pattern` — a pattern of indices or names
- `lookup` : `Array.<function()> | object` — the array or lookup object of functions from which to pull

**Examples:**

```js
s("bd [rim hh]").pickF("<0 1 2>", [rev,jux(rev),fast(2)])
```

```js
note("<c2 d2>(3,8)").s("square")
.pickF("<0 2> 1", [jux(rev), fast(2), x=>x.lpf(800)])
```

```js
note("<c2 d2>(3,8)").s("square")
.pickF("<jr l> f", { jr:jux(rev), f:fast(2), l:x=>x.lpf(800) })
```

---

## `pickmodF`

**Tags:** `combiners`

The same as pickF, but if you pick a number greater than the size of the functions list,
it wraps around, rather than sticking at the maximum value.

**Parameters:**

- `pat` : `Pattern`
- `lookup` : `Pattern` — a pattern of indices or names
- `lookup` : `Array.<function()> | object` — the array or lookup object of functions from which to pull

---

## `pickOut`

**Tags:** `combiners`

Similar to pick, but it applies an outerJoin instead of an innerJoin.

**Parameters:**

- `pat` : `Pattern`
- `xs` : `*`

---

## `pickmodOut`

**Tags:** `combiners`

The same as pickOut, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.

**Parameters:**

- `pat` : `Pattern`
- `xs` : `*`

---

## `pickRestart`

**Tags:** `combiners`

Similar to pick, but the choosen pattern is restarted when its index is triggered.

**Parameters:**

- `pat` : `Pattern`
- `xs` : `*`

---

## `pickmodRestart`

**Tags:** `combiners`

The same as pickRestart, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.

**Parameters:**

- `pat` : `Pattern`
- `xs` : `*`

**Examples:**

```js
"<a@2 b@2 c@2 d@2>".pickRestart({
        a: n("0 1 2 0"),
        b: n("2 3 4 ~"),
        c: n("[4 5] [4 3] 2 0"),
        d: n("0 -3 0 ~")
      }).scale("C:major").s("piano")
```

---

## `pickReset`

**Tags:** `combiners`

Similar to pick, but the choosen pattern is reset when its index is triggered.

**Parameters:**

- `pat` : `Pattern`
- `xs` : `*`

---

## `pickmodReset`

**Tags:** `combiners`

The same as pickReset, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.

**Parameters:**

- `pat` : `Pattern`
- `xs` : `*`

---

## `inhabit`

**Tags:** `combiners`
**Synonyms:** `pickSqueeze`

Picks patterns (or plain values) either from a list (by index) or a lookup table (by name).
Similar to pick, but cycles are squeezed into the target ('inhabited') pattern.

**Parameters:**

- `pat` : `Pattern`
- `xs` : `*`

**Examples:**

```js
let a = s("bd(3,8)")
let b = s("cp sd")
"<a b [a,b]>".inhabit({ a, b })
```

```js
s("a@2 [a b] a"
.inhabit({a: "bd(3,8)", b: "sd sd"}))
.slow(4)
```

---

## `inhabitmod`

**Tags:** `combiners`
**Synonyms:** `pickmodSqueeze`

The same as inhabit, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.
For example, if you pick the fifth pattern of a list of three, you'll get the
second one.

**Parameters:**

- `pat` : `Pattern`
- `xs` : `*`

---

## `squeeze`

**Tags:** `combiners`

Pick from the list of values (or patterns of values) via the index using the given
pattern of integers. The selected pattern will be compressed to fit the duration of the selecting event

**Parameters:**

- `pat` : `Pattern`
- `xs` : `*`

**Examples:**

```js
note(squeeze("<0@2 [1!2] 2>", ["g a", "f g f g" , "g a c d"]))
```

---

## `all`

**Tags:** `combiners`

Applies a function to all the running patterns. Note that the patterns are groups together into a single stack before the function is applied. This is probably what you want, but see each for
a version that applies the function to each pattern separately.
$: sound("bd - cp sd")
$: sound("hh*8")
all(fast("<2 3>"))

$: sound("bd - cp sd")
$: sound("hh*8")
all(x => x.pianoroll())

---

## `each`

**Tags:** `combiners`

Applies a function to each of the running patterns separately. This is intended for future use with upcoming 'stepwise' features. See all for a version that applies the function to all the patterns stacked together into a single pattern.
$: sound("bd - cp sd")
$: sound("hh*8")
each(fast("<2 3>"))
