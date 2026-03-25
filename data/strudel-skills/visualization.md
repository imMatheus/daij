# visualization

13 functions

---

## `slider`

**Tags:** `external_io`, `visualization`

Displays a slider widget to allow the user manipulate a value

**Parameters:**

- `value` : `number` — Initial value
- `min` : `number` — Minimum value - optional, defaults to 0
- `max` : `number` — Maximum value - optional, defaults to 1
- `step` : `number` — Step size - optional

---

## `label`

**Tags:** `visualization`

Sets the displayed text for an event on the pianoroll

**Parameters:**

- `label` : `string` — text to display

---

## `color`

**Tags:** `visualization`
**Synonyms:** `colour`

Sets the color of the hap in visualizations like pianoroll or highlighting.

**Parameters:**

- `color` : `string` — Hexadecimal or CSS color name

---

## `drawLine`

**Tags:** `visualization`

Intended for a debugging, drawLine renders the pattern as a string, where each character represents the same time span.
Should only be used with single characters as values, otherwise the character slots will be messed up.
Character legend:

"|" cycle separator
"-" hold previous value
"." silence

**Parameters:**

- `pattern` : `Pattern` — the pattern to use
- `chars` : `number` — max number of characters (approximately)

**Examples:**

```js
const line = drawLine("0 [1 2 3]", 10); // |0--123|0--123
console.log(line);
silence;
```

---

## `log`

**Tags:** `visualization`

Writes the content of the current event to the console (visible in the side menu).

**Examples:**

```js
s("bd sd").log()
```

---

## `logValues`

**Tags:** `visualization`

A simplified version of log which writes all "values" (various configurable parameters)
within the event to the console (visible in the side menu).

**Examples:**

```js
s("bd sd").gain("0.25 0.5 1").n("2 1 0").logValues()
```

---

## `pianoroll`

**Tags:** `visualization`
**Synonyms:** `punchcard`

Visualises a pattern as a scrolling 'pianoroll', displayed in the background of the editor. To show a pianoroll for all running patterns, use all(pianoroll). To have a pianoroll appear below
a pattern instead, prefix with _, e.g.: sound("bd sd")._pianoroll().

**Parameters:**

- `options` : `Object` — Object containing all the optional following parameters as key value pairs:
- `cycles` : `integer` — number of cycles to be displayed at the same time - defaults to 4
- `playhead` : `number` — location of the active notes on the time axis - 0 to 1, defaults to 0.5
- `vertical` : `boolean` — displays the roll vertically - 0 by default
- `labels` : `boolean` — displays labels on individual notes (see the label function) - 0 by default
- `flipTime` : `boolean` — reverse the direction of the roll - 0 by default
- `flipValues` : `boolean` — reverse the relative location of notes on the value axis - 0 by default
- `overscan` : `number` — lookup X cycles outside of the cycles window to display notes in advance - 1 by default
- `hideNegative` : `boolean` — hide notes with negative time (before starting playing the pattern) - 0 by default
- `smear` : `boolean` — notes leave a solid trace - 0 by default
- `fold` : `boolean` — notes takes the full value axis width - 0 by default
- `active` : `string` — hexadecimal or CSS color of the active notes - defaults to #FFCA28
- `inactive` : `string` — hexadecimal or CSS color of the inactive notes - defaults to #7491D2
- `background` : `string` — hexadecimal or CSS color of the background - defaults to transparent
- `playheadColor` : `string` — hexadecimal or CSS color of the line representing the play head - defaults to white
- `fill` : `boolean` — notes are filled with color (otherwise only the label is displayed) - 0 by default
- `fillActive` : `boolean` — active notes are filled with color - 0 by default
- `stroke` : `boolean` — notes are shown with colored borders - 0 by default
- `strokeActive` : `boolean` — active notes are shown with colored borders - 0 by default
- `hideInactive` : `boolean` — only active notes are shown - 0 by default
- `colorizeInactive` : `boolean` — use note color for inactive notes - 1 by default
- `fontFamily` : `string` — define the font used by notes labels - defaults to 'monospace'
- `minMidi` : `integer` — minimum note value to display on the value axis - defaults to 10
- `maxMidi` : `integer` — maximum note value to display on the value axis - defaults to 90
- `autorange` : `boolean` — automatically calculate the minMidi and maxMidi parameters - 0 by default

**Examples:**

```js
note("c2 a2 eb2")
.euclid(5,8)
.s('sawtooth')
.lpenv(4).lpf(300)
.pianoroll({ labels: 1 })
```

---

## `wordfall`

**Tags:** `visualization`

Displays a vertical pianoroll with event labels.
Supports all the same options as pianoroll.

---

## `pitchwheel`

**Tags:** `visualization`

Renders a pitch circle to visualize frequencies within one octave

**Parameters:**

- `hapcircles` : `number`
- `circle` : `number`
- `edo` : `number`
- `root` : `string`
- `thickness` : `number`
- `hapRadius` : `number`
- `mode` : `string`
- `margin` : `number`

**Examples:**

```js
n("0 .. 12").scale("C:chromatic")
.s("sawtooth")
.lpf(500)
._pitchwheel()
```

---

## `spiral`

**Tags:** `visualization`

Displays a spiral visual.

**Parameters:**

- `options` : `Object` — Object containing all the optional following parameters as key value pairs:
- `stretch` : `number` — controls the rotations per cycle ratio, where 1 = 1 cycle / 360 degrees
- `size` : `number` — the diameter of the spiral
- `thickness` : `number` — line thickness
- `cap` : `string` — style of line ends: butt (default), round, square
- `inset` : `string` — number of rotations before spiral starts (default 3)
- `playheadColor` : `string` — color of playhead, defaults to white
- `playheadLength` : `number` — length of playhead in rotations, defaults to 0.02
- `playheadThickness` : `number` — thickness of playheadrotations, defaults to thickness
- `padding` : `number` — space around spiral
- `steady` : `number` — steadyness of spiral vs playhead. 1 = spiral doesn't move, playhead does.
- `activeColor` : `number` — color of active segment. defaults to foreground of theme
- `inactiveColor` : `number` — color of inactive segments. defaults to gutterForeground of theme
- `colorizeInactive` : `boolean` — wether or not to colorize inactive segments, defaults to 0
- `fade` : `boolean` — wether or not past and future should fade out. defaults to 1
- `logSpiral` : `boolean` — wether or not the spiral should be logarithmic. defaults to 0

**Examples:**

```js
note("c2 a2 eb2")
.euclid(5,8)
.s('sawtooth')
.lpenv(4).lpf(300)
._spiral({ steady: .96 })
```

---

## `fscope`

**Tags:** `visualization`

Renders an oscilloscope for the frequency domain of the audio signal.

**Parameters:**

- `color` : `string` — line color as hex or color name. defaults to white.
- `scale` : `number` — scales the y-axis. Defaults to 0.25
- `pos` : `number` — y-position relative to screen height. 0 = top, 1 = bottom of screen
- `lean` : `number` — y-axis alignment where 0 = top and 1 = bottom
- `min` : `number` — min value
- `max` : `number` — max value

**Examples:**

```js
s("sawtooth").fscope()
```

---

## `scope`

**Tags:** `visualization`
**Synonyms:** `tscope`

Renders an oscilloscope for the time domain of the audio signal.

**Parameters:**

- `config` : `object` — optional config with options:
- `align` : `boolean` — if 1, the scope will be aligned to the first zero crossing. defaults to 1
- `color` : `string` — line color as hex or color name. defaults to white.
- `thickness` : `number` — line thickness. defaults to 3
- `scale` : `number` — scales the y-axis. Defaults to 0.25
- `pos` : `number` — y-position relative to screen height. 0 = top, 1 = bottom of screen
- `trigger` : `number` — amplitude value that is used to align the scope. defaults to 0.

**Examples:**

```js
s("sawtooth")._scope()
```

---

## `spectrum`

**Tags:** `visualization`

Renders a spectrum analyzer for the incoming audio signal.

**Parameters:**

- `config` : `object` — optional config with options:
- `thickness` : `integer` — line thickness in px (default 3)
- `speed` : `integer` — scroll speed (default 1)
- `min` : `integer` — min db (default -80)
- `max` : `integer` — max db (default 0)

**Examples:**

```js
n("<0 4 <2 3> 1>*3")
.off(1/8, add(n(5)))
.off(1/5, add(n(7)))
.scale("d3:minor:pentatonic")
.s('sine')
.dec(.3).room(.5)
._spectrum()
```
