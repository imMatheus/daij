# stepwise

14 functions

---

## `pace`

**Tags:** `stepwise`

Experimental
Speeds a pattern up or down, to fit to the given number of steps per cycle.

**Examples:**

```js
sound("bd sd cp").pace(4)
// The same as sound("{bd sd cp}%4") or sound("<bd sd cp>*4")
```

---

## `polymeter`

**Tags:** `stepwise`
**Synonyms:** `pm`

Experimental
Aligns the steps of the patterns, creating polymeters. The patterns are repeated until they all fit the cycle. For example, in the below the first pattern is repeated twice, and the second is repeated three times, to fit the lowest common multiple of six steps.

**Examples:**

```js
// The same as note("{c eb g, c2 g2}%6")
polymeter("c eb g", "c2 g2").note()
```

---

## `stepcat`

**Tags:** `stepwise`
**Synonyms:** `timeCat`, `timecat`

'Concatenates' patterns like fastcat, but proportional to a number of steps per cycle.
The steps can either be inferred from the pattern, or provided as a [length, pattern] pair.
Has the alias timecat.

**Examples:**

```js
stepcat([3,"e3"],[1, "g3"]).note()
// the same as "e3@3 g3".note()
```

```js
stepcat("bd sd cp","hh hh").sound()
// the same as "bd sd cp hh hh".sound()
```

---

## `stepalt`

**Tags:** `stepwise`

Experimental
Concatenates patterns stepwise, according to an inferred 'steps per cycle'.
Similar to stepcat, but if an argument is a list, the whole pattern will alternate between the elements in the list.

**Examples:**

```js
stepalt(["bd cp", "mt"], "bd").sound()
// The same as "bd cp bd mt bd".sound()
```

---

## `take`

**Tags:** `stepwise`

Experimental
Takes the given number of steps from a pattern (dropping the rest).
A positive number will take steps from the start of a pattern, and a negative number from the end.

**Examples:**

```js
"bd cp ht mt".take("2").sound()
// The same as "bd cp".sound()
```

```js
"bd cp ht mt".take("1 2 3").sound()
// The same as "bd bd cp bd cp ht".sound()
```

```js
"bd cp ht mt".take("-1 -2 -3").sound()
// The same as "mt ht mt cp ht mt".sound()
```

---

## `drop`

**Tags:** `stepwise`

Experimental
Drops the given number of steps from a pattern.
A positive number will drop steps from the start of a pattern, and a negative number from the end.

**Examples:**

```js
"tha dhi thom nam".drop("1").sound().bank("mridangam")
```

```js
"tha dhi thom nam".drop("-1").sound().bank("mridangam")
```

```js
"tha dhi thom nam".drop("0 1 2 3").sound().bank("mridangam")
```

```js
"tha dhi thom nam".drop("0 -1 -2 -3").sound().bank("mridangam")
```

---

## `extend`

**Tags:** `stepwise`

Experimental
extend is similar to fast in that it increases its density, but it also increases the step count
accordingly. So stepcat("a b".extend(2), "c d") would be the same as "a b a b c d", whereas
stepcat("a b".fast(2), "c d") would be the same as "[a b] [a b] c d".

**Examples:**

```js
stepcat(
  sound("bd bd - cp").extend(2),
  sound("bd - sd -")
).pace(8)
```

---

## `replicate`

**Tags:** `stepwise`

Experimental
replicate is similar to fast in that it increases its density, but it also increases the step count
accordingly. So stepcat("a b".replicate(2), "c d") would be the same as "a b a b c d", whereas
stepcat("a b".fast(2), "c d") would be the same as "[a b] [a b] c d".
TODO: find out how this function differs from extend

**Examples:**

```js
stepcat(
  sound("bd bd - cp").replicate(2),
  sound("bd - sd -")
).pace(8)
```

---

## `expand`

**Tags:** `stepwise`

Experimental
Expands the step size of the pattern by the given factor.

**Examples:**

```js
sound("tha dhi thom nam").bank("mridangam").expand("3 2 1 1 2 3").pace(8)
```

---

## `contract`

**Tags:** `stepwise`

Experimental
Contracts the step size of the pattern by the given factor. See also expand.

**Examples:**

```js
sound("tha dhi thom nam").bank("mridangam").contract("3 2 1 1 2 3").pace(8)
```

---

## `shrink`

**Tags:** `stepwise`

Experimental
Progressively shrinks the pattern by 'n' steps until there's nothing left, or if a second value is given (using mininotation list syntax with :),
that number of times.
A positive number will progressively drop steps from the start of a pattern, and a negative number from the end.

**Examples:**

```js
"tha dhi thom nam".shrink("1").sound()
.bank("mridangam")
```

```js
"tha dhi thom nam".shrink("-1").sound()
.bank("mridangam")
```

```js
"tha dhi thom nam".shrink("1 -1").sound().bank("mridangam").pace(4)
```

```js
note("0 1 2 3 4 5 6 7".scale("C:ritusen")).sound("folkharp")
   .shrink("1 -1").pace(8)
```

---

## `grow`

**Tags:** `stepwise`

Experimental
Progressively grows the pattern by 'n' steps until the full pattern is played, or if a second value is given (using mininotation list syntax with :),
that number of times.
A positive number will progressively grow steps from the start of a pattern, and a negative number from the end.

**Examples:**

```js
"tha dhi thom nam".grow("1").sound()
.bank("mridangam")
```

```js
"tha dhi thom nam".grow("-1").sound()
.bank("mridangam")
```

```js
"tha dhi thom nam".grow("1 -1").sound().bank("mridangam").pace(4)
```

```js
note("0 1 2 3 4 5 6 7".scale("C:ritusen")).sound("folkharp")
   .grow("1 -1").pace(8)
```

---

## `tour`

**Tags:** `stepwise`

Experimental
Inserts a pattern into a list of patterns. On the first repetition it will be inserted at the end of the list, then moved backwards through the list
on successive repetitions. The patterns are added together stepwise, with all repetitions taking place over a single cycle. Using pace to set the
number of steps per cycle is therefore usually recommended.

**Examples:**

```js
"[c g]".tour("e f", "e f g", "g f e c").note()
   .sound("folkharp")
   .pace(8)
```

---

## `zip`

**Tags:** `stepwise`

Experimental
'zips' together the steps of the provided patterns. This can create a long repetition, taking place over a single, dense cycle.
Using pace to set the number of steps per cycle is therefore usually recommended.

**Examples:**

```js
zip("e f", "e f g", "g [f e] a f4 c").note()
   .sound("folkharp")
   .pace(8)
```
