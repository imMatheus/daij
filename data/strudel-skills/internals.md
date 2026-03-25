# internals

41 functions

---

## `queryArc`

**Tags:** `internals`

Query haps inside the given time span.

**Parameters:**

- `begin` : `Fraction | number` — from time
- `end` : `Fraction | number` — to time

**Examples:**

```js
const pattern = sequence('a', ['b', 'c'])
const haps = pattern.queryArc(0, 1)
console.log(haps)
silence
```

---

## `splitQueries`

**Tags:** `internals`

Returns a new pattern, with queries split at cycle boundaries. This makes
some calculations easier to express, as all haps are then constrained to
happen within a cycle.

---

## `withQuerySpan`

**Tags:** `internals`

Returns a new pattern, where the given function is applied to the query
timespan before passing it to the original pattern.

**Parameters:**

- `func` : `function` — the function to apply

---

## `withQueryTime`

**Tags:** `internals`

As with withQuerySpan, but the function is applied to both the
begin and end time of the query timespan.

**Parameters:**

- `func` : `function` — the function to apply

---

## `withHapSpan`

**Tags:** `internals`

Similar to withQuerySpan, but the function is applied to the timespans
of all haps returned by pattern queries (both part timespans, and where
present, whole timespans).

**Parameters:**

- `func` : `function`

---

## `withHapTime`

**Tags:** `internals`

As with withHapSpan, but the function is applied to both the
begin and end time of the hap timespans.

**Parameters:**

- `func` : `function` — the function to apply

---

## `withHaps`

**Tags:** `internals`

Returns a new pattern with the given function applied to the list of haps returned by every query.

**Parameters:**

- `func` : `function`

---

## `withHap`

**Tags:** `internals`

As with withHaps, but applies the function to every hap, rather than every list of haps.

**Parameters:**

- `func` : `function`

---

## `setContext`

**Tags:** `internals`

Returns a new pattern with the context field set to every hap set to the given value.

**Parameters:**

- `context` : `*`

---

## `withContext`

**Tags:** `internals`

Returns a new pattern with the given function applied to the context field of every hap.

**Parameters:**

- `func` : `function`

---

## `stripContext`

**Tags:** `internals`

Returns a new pattern with the context field of every hap set to an empty object.

---

## `withLoc`

**Tags:** `internals`

Returns a new pattern with the given location information added to the
context of every hap.

**Parameters:**

- `start` : `Number` — start offset
- `end` : `Number` — end offset

---

## `filterHaps`

**Tags:** `internals`

Returns a new Pattern, which only returns haps that meet the given test.

**Parameters:**

- `hap_test` : `function` — a function which returns false for haps to be removed from the pattern

**Examples:**

```js
s("bd*8").velocity(rand).filterHaps((h) => (h.whole.begin % 1) < h.value.velocity)
```

---

## `filterValues`

**Tags:** `internals`

As with filterHaps, but the function is applied to values
inside haps.

**Parameters:**

- `value_test` : `function`

**Examples:**

```js
const drums = s("bd sd bd sd")
kick: drums.filterValues((v) => v.s === 'bd').duck(2)
snare: drums.filterValues((v) => v.s === 'sd')
bass: s("saw!4").note("G#1").lpf(80).lpenv(4).orbit(2)
```

---

## `removeUndefineds`

**Tags:** `internals`

Returns a new pattern, with haps containing undefined values removed from
query results.

---

## `onsetsOnly`

**Tags:** `internals`

Returns a new pattern, with all haps without onsets filtered out. A hap
with an onset is one with a whole timespan that begins at the same time
as its part timespan.

---

## `discreteOnly`

**Tags:** `internals`

Returns a new pattern, with 'continuous' haps (those without 'whole'
timespans) removed from query results.

---

## `defragmentHaps`

**Tags:** `internals`

Combines adjacent haps with the same value and whole.  Only
intended for use in tests.

---

## `firstCycle`

**Tags:** `internals`

Queries the pattern for the first cycle, returning Haps. Mainly of use when
debugging a pattern.

**Parameters:**

- `with_context` : `Boolean` — set to true, otherwise the context field
will be stripped from the resulting haps.

---

## `firstCycleValues`

**Tags:** `internals`

Accessor for a list of values returned by querying the first cycle.

---

## `showFirstCycle`

**Tags:** `internals`

More human-readable version of the firstCycleValues accessor.

---

## `sortHapsByPart`

**Tags:** `internals`

Returns a new pattern, which returns haps sorted in temporal order. Mainly
of use when comparing two patterns for equality, in tests.

---

## `asNumber`

**Tags:** `internals`

Returns a new pattern with all values parsed as numerals.

---

## `ref`

**Tags:** `internals`

exposes a custom value at query time. basically allows mutating state without evaluation

---

## `reallocateChannelsIfNeeded`

**Tags:** `internals`

Handles dynamic reallocation of input/output channels buffer
(channel numbers may vary during lifecycle)

---

## `readInputs`

**Tags:** `internals`

Read next web audio block to input buffers

---

## `writeOutputs`

**Tags:** `internals`

Write next web audio block from output buffers

---

## `shiftInputBuffers`

**Tags:** `internals`

Shift left content of input buffers to receive new web audio block

---

## `shiftOutputBuffers`

**Tags:** `internals`

Shift left content of output buffers to receive new web audio block

---

## `prepareInputBuffersToSend`

**Tags:** `internals`

Copy contents of input buffers to buffer actually sent to process

---

## `handleOutputBuffersToRetrieve`

**Tags:** `internals`

Add contents of output buffers just processed to output buffers

---

## `generateReverb`

**Tags:** `internals`

Generates a reverb impulse response.

**Parameters:**

- `params` : `Object` — TODO: Document the properties.
- `callback` : `function` — Function to call when
the impulse response has been generated. The impulse response
is passed to this function as its parameter. May be called
immediately within the current execution context, or later.

---

## `generateGraph`

**Tags:** `internals`

Creates a canvas element showing a graph of the given data.

**Parameters:**

- `data` : `Float32Array` — An array of numbers, or a Float32Array.
- `width` : `number` — Width in pixels of the canvas.
- `height` : `number` — Height in pixels of the canvas.
- `min` : `number` — Minimum value of data for the graph (lower edge).
- `max` : `number` — Maximum value of data in the graph (upper edge).

---

## `applyGradualLowpass`

**Tags:** `internals`

Applies a constantly changing lowpass filter to the given sound.

**Parameters:**

- `input` : `AudioBuffer`
- `lpFreqStart` : `number`
- `lpFreqEnd` : `number`
- `lpFreqEndAt` : `number`
- `callback` : `function` — May be called
immediately within the current execution context, or later.

---

## `pickAndRename`

**Tags:** `internals`

Selects entries from source and renames them via map

---

## `applyHannWindow`

**Tags:** `internals`

Apply Hann window in-place

---

## `computeMagnitudes`

**Tags:** `internals`

Compute squared magnitudes for peak finding

---

## `findPeaks`

**Tags:** `internals`

Find peaks in spectrum magnitudes

---

## `shiftPeaks`

**Tags:** `internals`

Shift peaks and regions of influence by pitchFactor into new specturm

---

## `chyx`

**Tags:** `internals`

BYTE BEATS

---

## `crossfade`

**Tags:** `internals`

Equal Power Crossfade function.
Smoothly transitions between signals A and B, maintaining consistent perceived loudness.

**Parameters:**

- `a` : `number` — Signal A (can be a single value or an array value in buffer processing).
- `b` : `number` — Signal B (can be a single value or an array value in buffer processing).
- `m` : `number` — Crossfade parameter (0.0 = all A, 1.0 = all B, 0.5 = equal mix).
