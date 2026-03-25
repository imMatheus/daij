# midi

17 functions

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
