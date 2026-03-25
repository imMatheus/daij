# internal

2 functions

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
