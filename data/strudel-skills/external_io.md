# external_io

46 functions

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

## `source`

**Tags:** `external_io`, `superdough`
**Synonyms:** `src`

Define a custom webaudio node to use as a sound source.

**Parameters:**

- `getSource` : `function`

---

## `channels`

**Tags:** `external_io`, `superdough`
**Synonyms:** `ch`

Allows you to set the output channels on the interface

**Parameters:**

- `channels` : `number | Pattern` — pattern the output channels

**Examples:**

```js
note("e a d b g").channels("3:4")
```

---

## `midichan`

**Tags:** `external_io`, `midi`

MIDI channel: Sets the MIDI channel for the event.

**Parameters:**

- `channel` : `number | Pattern` — MIDI channel number (0-15)

**Examples:**

```js
note("c4").midichan(1).midi()
```

---

## `midiport`

**Tags:** `external_io`, `midi`

MIDI port: Sets the MIDI port for the event.

**Parameters:**

- `port` : `number | Pattern` — MIDI port

**Examples:**

```js
note("c a f e").midiport("<0 1 2 3>").midi()
```

---

## `midicmd`

**Tags:** `external_io`, `midi`

MIDI command: Sends a MIDI command message.

**Parameters:**

- `command` : `number | Pattern` — MIDI command

**Examples:**

```js
midicmd("clock*48,<start stop>/2").midi()
```

---

## `control`

**Tags:** `external_io`, `midi`

MIDI control: Sends a MIDI control change message.

**Parameters:**

- `MIDI` : `number | Pattern` — control number (0-127)
- `MIDI` : `number | Pattern` — controller value (0-127)

---

## `ccn`

**Tags:** `external_io`, `midi`

MIDI control number: Sends a MIDI control change message.

**Parameters:**

- `MIDI` : `number | Pattern` — control number (0-127)

---

## `ccv`

**Tags:** `external_io`, `midi`

MIDI control value: Sends a MIDI control change message.

**Parameters:**

- `MIDI` : `number | Pattern` — control value (0-127)

---

## `nrpnn`

**Tags:** `external_io`, `midi`

MIDI NRPN non-registered parameter number: Sends a MIDI NRPN non-registered parameter number message.

**Parameters:**

- `nrpnn` : `number | Pattern` — MIDI NRPN non-registered parameter number (0-127)

**Examples:**

```js
note("c4").nrpnn("1:8").nrpv("123").midichan(1).midi()
```

---

## `nrpv`

**Tags:** `external_io`, `midi`

MIDI NRPN non-registered parameter value: Sends a MIDI NRPN non-registered parameter value message.

**Parameters:**

- `nrpv` : `number | Pattern` — MIDI NRPN non-registered parameter value (0-127)

**Examples:**

```js
note("c4").nrpnn("1:8").nrpv("123").midichan(1).midi()
```

---

## `progNum`

**Tags:** `external_io`

MIDI program number: Sends a MIDI program change message.

**Parameters:**

- `program` : `number | Pattern` — MIDI program number (0-127)

**Examples:**

```js
note("c4").progNum(10).midichan(1).midi()
```

---

## `sysex`

**Tags:** `external_io`, `midi`

MIDI sysex: Sends a MIDI sysex message.

**Parameters:**

- `id` : `number | Pattern` — Sysex ID
- `data` : `number | Pattern` — Sysex data

**Examples:**

```js
note("c4").sysex(["0x77", "0x01:0x02:0x03:0x04"]).midichan(1).midi()
```

---

## `sysexid`

**Tags:** `external_io`, `midi`

MIDI sysex ID: Sends a MIDI sysex identifier message.

**Parameters:**

- `id` : `number | Pattern` — Sysex ID

**Examples:**

```js
note("c4").sysexid("0x77").sysexdata("0x01:0x02:0x03:0x04").midichan(1).midi()
```

---

## `sysexdata`

**Tags:** `external_io`, `midi`

MIDI sysex data: Sends a MIDI sysex message.

**Parameters:**

- `data` : `number | Pattern` — Sysex data

**Examples:**

```js
note("c4").sysexid("0x77").sysexdata("0x01:0x02:0x03:0x04").midichan(1).midi()
```

---

## `midibend`

**Tags:** `external_io`, `midi`

MIDI pitch bend: Sends a MIDI pitch bend message.

**Parameters:**

- `midibend` : `number | Pattern` — MIDI pitch bend (-1 - 1)

**Examples:**

```js
note("c4").midibend(sine.slow(4).range(-0.4,0.4)).midi()
```

---

## `miditouch`

**Tags:** `external_io`, `midi`

MIDI key after touch: Sends a MIDI key after touch message.

**Parameters:**

- `miditouch` : `number | Pattern` — MIDI key after touch (0-1)

**Examples:**

```js
note("c4").miditouch(sine.slow(4).range(0,1)).midi()
```

---

## `oschost`

**Tags:** `external_io`

The host to send open sound control messages to. Requires running the OSC bridge.

**Parameters:**

- `oschost` : `string | Pattern` — e.g. 'localhost'

**Examples:**

```js
note("c4").oschost('127.0.0.1').oscport(57120).osc();
```

---

## `oscport`

**Tags:** `external_io`

The port to send open sound control messages to. Requires running the OSC bridge.

**Parameters:**

- `oscport` : `number | Pattern` — e.g. 57120

**Examples:**

```js
note("c4").oschost('127.0.0.1').oscport(57120).osc();
```

---

## `onTriggerTime`

**Tags:** `external_io`

make something happen on event time
uses browser timeout which is innacurate for audio tasks

**Examples:**

```js
s("bd!8").onTriggerTime((hap) => {console.log(hap)})
```

---

## `mousex`

**Tags:** `external_io`

The mouse's x position value ranges from 0 to 1.

**Examples:**

```js
n(mousex.segment(4).range(0,7)).scale("C:minor")
```

---

## `mousey`

**Tags:** `external_io`

The mouse's y position value ranges from 0 to 1.

**Examples:**

```js
n(mousey.segment(4).range(0,7)).scale("C:minor")
```

---

## `whenKey`

**Tags:** `external_io`

Do something on a keypress, or array of keypresses
Key name reference

**Examples:**

```js
s("bd(5,8)").whenKey("Control:j", x => x.segment(16).color("red")).whenKey("Control:i", x => x.fast(2).color("blue"))
```

---

## `keyDown`

**Tags:** `external_io`

returns true when a key or array of keys is held
Key name reference

**Examples:**

```js
keyDown("Control:j").pick([s("bd(5,8)"), s("cp(3,8)")])
```

---

## `csoundm`

**Tags:** `external_io`

Sends notes to Csound for rendering with MIDI semantics. The hap value is
translated to these Csound pfields:
p1 -- Csound instrument either as a number (1-based, can be a fraction),
or as a string name.
p2 -- time in beats (usually seconds) from start of performance.
p3 -- duration in beats (usually seconds).
p4 -- MIDI key number (as a real number, not an integer but in [0, 127].
p5 -- MIDI velocity (as a real number, not an integer but in [0, 127].
p6 -- Strudel controls, as a string.

---

## `defaultmidimap`

**Tags:** `external_io`, `midi`

configures the default midimap, which is used when no "midimap" port is set

**Examples:**

```js
defaultmidimap({ lpf: 74 })
$: note("c a f e").midi();
$: lpf(sine.slow(4).segment(16)).midi();
```

---

## `midimaps`

**Tags:** `external_io`, `midi`

Adds midimaps to the registry. Inside each midimap, control names (e.g. lpf) are mapped to cc numbers.

**Examples:**

```js
midimaps({ mymap: { lpf: 74 } })
$: note("c a f e")
.lpf(sine.slow(4))
.midimap('mymap')
.midi()
```

```js
midimaps({ mymap: {
  lpf: { ccn: 74, min: 0, max: 20000, exp: 0.5 }
}})
$: note("c a f e")
.lpf(sine.slow(2).range(400,2000))
.midimap('mymap')
.midi()
```

---

## `midi`

**Tags:** `external_io`

MIDI output: Opens a MIDI output port.

**Parameters:**

- `midiport` : `string | number` — MIDI device name or index defaulting to 0
- `options` : `object` — Additional MIDI configuration options

**Examples:**

```js
note("c4").midichan(1).midi('IAC Driver Bus 1')
```

```js
note("c4").midichan(1).midi('IAC Driver Bus 1', { controller: true, latency: 50 })
```

---

## `midin`

**Tags:** `external_io`, `midi`

MIDI input: Opens a MIDI input port to receive MIDI control change messages.
The output is a function that accepts a midi cc value to query as well as (optionally) a midi channel

**Parameters:**

- `input` : `string | number` — MIDI device name or index defaulting to 0

**Examples:**

```js
const cc = await midin('IAC Driver Bus 1')
note("c a f e").lpf(cc(0).range(0, 1000)).lpq(cc(1).range(0, 10)).sound("sawtooth")
```

```js
const allCC = await midin('IAC Driver Bus 1')
const cc = (ccNum) => allCC(ccNum, 2) // just channel 2
note("c a f e").s("saw")
  .when(cc(0).gt(0), x => x.postgain(0))
```

---

## `midikeys`

**Tags:** `external_io`, `midi`

MIDI keyboard: Opens a MIDI input port to receive MIDI keyboard messages.
The note length is fixed as Superdough is not currently set up for undetermined
note durations

**Parameters:**

- `input` : `string | number` — MIDI device name or index defaulting to 0

**Examples:**

```js
const kb = await midikeys('Arturia KeyStep 32')
kb().s("tri").lpf(80).lpe(6).lpd(0.1).room(2).delay(0.35)
```

```js
const kb = await midikeys('Arturia KeyStep 32')
kb("0.5 1")
  .s("saw")
  .add(note(rand.mul(0.3)))
  .lpf(1000).lpe(2).room(0.5)
```

---

## `accelerationX`

**Tags:** `external_io`
**Synonyms:** `accX`

The accelerometer's x-axis value ranges from 0 to 1.

**Examples:**

```js
n(accelerationX.segment(4).range(0,7)).scale("C:minor")
```

---

## `accelerationY`

**Tags:** `external_io`
**Synonyms:** `accY`

The accelerometer's y-axis value ranges from 0 to 1.

**Examples:**

```js
n(accelerationY.segment(4).range(0,7)).scale("C:minor")
```

---

## `accelerationZ`

**Tags:** `external_io`
**Synonyms:** `accZ`

The accelerometer's z-axis value ranges from 0 to 1.

**Examples:**

```js
n(accelerationZ.segment(4).range(0,7)).scale("C:minor")
```

---

## `gravityX`

**Tags:** `external_io`
**Synonyms:** `gravX`

The device's gravity x-axis value ranges from 0 to 1.

**Examples:**

```js
n(gravityX.segment(4).range(0,7)).scale("C:minor")
```

---

## `gravityY`

**Tags:** `external_io`
**Synonyms:** `gravY`

The device's gravity y-axis value ranges from 0 to 1.

**Examples:**

```js
n(gravityY.segment(4).range(0,7)).scale("C:minor")
```

---

## `gravityZ`

**Tags:** `external_io`
**Synonyms:** `gravZ`

The device's gravity z-axis value ranges from 0 to 1.

**Examples:**

```js
n(gravityZ.segment(4).range(0,7)).scale("C:minor")
```

---

## `rotationAlpha`

**Tags:** `external_io`
**Synonyms:** `rotA`, `rotZ`, `rotationZ`

The device's rotation around the alpha-axis value ranges from 0 to 1.

**Examples:**

```js
n(rotationAlpha.segment(4).range(0,7)).scale("C:minor")
```

---

## `rotationBeta`

**Tags:** `external_io`
**Synonyms:** `rotB`, `rotX`, `rotationX`

The device's rotation around the beta-axis value ranges from 0 to 1.

**Examples:**

```js
n(rotationBeta.segment(4).range(0,7)).scale("C:minor")
```

---

## `rotationGamma`

**Tags:** `external_io`
**Synonyms:** `rotG`, `rotY`, `rotationY`

The device's rotation around the gamma-axis value ranges from 0 to 1.

**Examples:**

```js
n(rotationGamma.segment(4).range(0,7)).scale("C:minor")
```

---

## `orientationAlpha`

**Tags:** `external_io`
**Synonyms:** `oriA`, `oriZ`, `orientationZ`

The device's orientation alpha value ranges from 0 to 1.

**Examples:**

```js
n(orientationAlpha.segment(4).range(0,7)).scale("C:minor")
```

---

## `orientationBeta`

**Tags:** `external_io`
**Synonyms:** `oriB`, `oriX`, `orientationX`

The device's orientation beta value ranges from 0 to 1.

**Examples:**

```js
n(orientationBeta.segment(4).range(0,7)).scale("C:minor")
```

---

## `orientationGamma`

**Tags:** `external_io`
**Synonyms:** `oriG`, `oriY`, `orientationY`

The device's orientation gamma value ranges from 0 to 1.

**Examples:**

```js
n(orientationGamma.segment(4).range(0,7)).scale("C:minor")
```

---

## `absoluteOrientationAlpha`

**Tags:** `external_io`
**Synonyms:** `absOriA`, `absOriZ`, `absoluteOrientationZ`

The device's absolute orientation alpha value ranges from 0 to 1.

**Examples:**

```js
n(absoluteOrientationAlpha.segment(4).range(0,7)).scale("C:minor")
```

---

## `absoluteOrientationBeta`

**Tags:** `external_io`
**Synonyms:** `absOriB`, `absOriX`, `absoluteOrientationX`

The device's absolute orientation beta value ranges from 0 to 1.

**Examples:**

```js
n(absoluteOrientationBeta.segment(4).range(0,7)).scale("C:minor")
```

---

## `absoluteOrientationGamma`

**Tags:** `external_io`
**Synonyms:** `absOriG`, `absOriY`, `absoluteOrientationY`

The device's absolute orientation gamma value ranges from 0 to 1.

**Examples:**

```js
n(absoluteOrientationGamma.segment(4).range(0,7)).scale("C:minor")
```

---

## `osc`

**Tags:** `external_io`

Sends each hap as an OSC message, which can be picked up by SuperCollider or any other OSC-enabled software.
For more info, read MIDI & OSC in the docs
