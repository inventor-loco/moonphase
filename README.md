# ✦ El Reloj Lunar ✦

*Obra de Inventor Loco, para Lala Meteora.*

A moon-phase clock in the style of a tarot card. The Earth sits at the heart of
the dial, seen from above the North Pole — the Arctic at its center — turning
on its axis in real time, its night side always facing away from the Sun. The
Sun is the fixed hand, crowning the top of the card. The Moon is the turning
hand: one full sweep per lunation (~29.5 days), travelling counterclockwise,
exactly as she truly moves when watched from above the pole. Her sunward face
is always bright; her far side always dark.

## Running it

It is a single self-contained file. Open [index.html](index.html) in any
browser, or serve it:

```sh
python -m http.server 4173
```

Designed for a phone in portrait. Turn the phone to landscape and the plot
stays put — only the texts turn, sliding to the sides like the spine of a book.

## How the hand finds the Moon

- The phase is loaded from the free [wttr.in](https://wttr.in/?format=j1) API
  (`moon_phase` + `moon_illumination`, CORS-open, no key needed) and converted
  into the hand's angle on the dial.
- If the oracle cannot be reached, the app falls back to a local ephemeris
  (synodic month of 29.53058867 days from the new moon of 2000-01-06 18:14 UTC),
  so the clock never stops.
- The dial carries 28 day-ticks (the Sun itself marks day zero), the eight
  phases engraved as medallions — the current one glows — and the Earth's
  rotation is set by true UTC time: the meridian facing the Sun is the one
  where it is solar noon.

## The Earth is real

The globe at the center is a true orthographic projection of the Earth seen
from directly above the North Pole — actual Natural Earth 110m coastlines,
Greenwich pointing up at 12:00 UTC, east longitudes running counterclockwise,
the southern hemisphere hidden beyond the horizon. The SVG path is baked into
`index.html` by [tools/build-earth.mjs](tools/build-earth.mjs); to regenerate:

```sh
curl -sL -o land110.json https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/110m/physical/ne_110m_land.json
node tools/build-earth.mjs land110.json 110
```
