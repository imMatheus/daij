# functional

12 functions

---

## `withValue`

**Tags:** `functional`
**Synonyms:** `fmap`

Returns a new pattern, with the function applied to the value of
each hap. It has the alias fmap.

**Parameters:**

- `func` : `function` — to to apply to the value

**Examples:**

```js
"0 1 2".withValue(v => v + 10).log()
```

---

## `appWhole`

**Tags:** `functional`

Assumes 'this' is a pattern of functions, and given a function to
resolve wholes, applies a given pattern of values to that
pattern of functions.

**Parameters:**

- `whole_func` : `function`
- `func` : `function`

---

## `appBoth`

**Tags:** `functional`

When this method is called on a pattern of functions, it matches its haps
with those in the given pattern of values.  A new pattern is returned, with
each matching value applied to the corresponding function.
In this _appBoth variant, where timespans of the function and value haps
are not the same but do intersect, the resulting hap has a timespan of the
intersection. This applies to both the part and the whole timespan.

**Parameters:**

- `pat_val` : `Pattern`

---

## `appLeft`

**Tags:** `functional`

As with appBoth, but the whole timespan is not the intersection,
but the timespan from the function of patterns that this method is called
on. In practice, this means that the pattern structure, including onsets,
are preserved from the pattern of functions (often referred to as the left
hand or inner pattern).

**Parameters:**

- `pat_val` : `Pattern`

---

## `appRight`

**Tags:** `functional`

As with appLeft, but whole timespans are instead taken from the
pattern of values, i.e. structure is preserved from the right hand/outer
pattern.

**Parameters:**

- `pat_val` : `Pattern`

---

## `register`

**Tags:** `functional`

Registers a new pattern method. The method is added to the Pattern class + the standalone function is returned from register.

**Parameters:**

- `name` : `string | Array.<string>` — name of the function, or an array of names to be used as synonyms
- `func` : `function` — function with 1 or more params, where last is the current pattern
- `patternify` : `bool` — defaults to true; if set to false, you will have more control over the arguments to func as they will be
in their raw form and it will be up to you to patternify them and/or query them for values

**Examples:**

```js
const vlpf = register('vlpf', (freq, pat) => {
  return pat.fmap((v) => ({...v, cutoff: freq * (v.velocity ?? 1) }));
})
s("saw").seg(8).velocity(rand).vlpf(800)
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
