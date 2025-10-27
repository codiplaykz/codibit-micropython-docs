# Built-in images

This document provides a comprehensive reference for all 64 built-in images available in the Codi:bit library.

## Overview

The Codi:bit library provides 64 built-in images that can be accessed via Image objects:

- `Image.ICON_NAME` (e.g., `Image.HEART`)

## Usage

```python
from codibit import display, Image

# Draw built-in icons
display.draw_image(Image.HEART, 0, 0)
display.draw_image(Image.HAPPY, 20, 0)
display.show()

# With scaling
display.draw_image(Image.STAR, 0, 0, scale=2)
display.draw_image(Image.DIAMOND, 40, 0, scale=3)
display.show()
```

## Complete Icon Reference

import ImagePreview from '@site/src/components/ImagePreview';
import { IMAGE_STRINGS } from '@site/src/constants/imageStrings';

### Basic Icons

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.HEART` | <ImagePreview imageString={IMAGE_STRINGS.HEART} /> | `Image.HEART_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.HEART_SMALL} /> | `Image.HAPPY` | <ImagePreview imageString={IMAGE_STRINGS.HAPPY} /> |
| `Image.STAR` | <ImagePreview imageString={IMAGE_STRINGS.STAR} /> | `Image.SAD` | <ImagePreview imageString={IMAGE_STRINGS.SAD} /> | `Image.CONFUSED` | <ImagePreview imageString={IMAGE_STRINGS.CONFUSED} /> |
| `Image.ANGRY` | <ImagePreview imageString={IMAGE_STRINGS.ANGRY} /> | `Image.ASLEEP` | <ImagePreview imageString={IMAGE_STRINGS.ASLEEP} /> | `Image.SURPRISED` | <ImagePreview imageString={IMAGE_STRINGS.SURPRISED} /> |
| `Image.SILLY` | <ImagePreview imageString={IMAGE_STRINGS.SILLY} /> | `Image.FABULOUS` | <ImagePreview imageString={IMAGE_STRINGS.FABULOUS} /> | `Image.MEH` | <ImagePreview imageString={IMAGE_STRINGS.MEH} /> |
| `Image.O` | <ImagePreview imageString={IMAGE_STRINGS.O} /> | `Image.X` | <ImagePreview imageString={IMAGE_STRINGS.X} /> | | |

### Geometric Shapes

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.TRIANGLE` | <ImagePreview imageString={IMAGE_STRINGS.TRIANGLE} /> | `Image.TRIANGLE_LEFT` | <ImagePreview imageString={IMAGE_STRINGS.TRIANGLE_LEFT} /> | `Image.CHESSBOARD` | <ImagePreview imageString={IMAGE_STRINGS.CHESSBOARD} /> |
| `Image.DIAMOND` | <ImagePreview imageString={IMAGE_STRINGS.DIAMOND} /> | `Image.DIAMOND_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.DIAMOND_SMALL} /> | `Image.SQUARE` | <ImagePreview imageString={IMAGE_STRINGS.SQUARE} /> |
| `Image.SQUARE_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.SQUARE_SMALL} /> | | | | |

### Animals & Characters

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.RABBIT` | <ImagePreview imageString={IMAGE_STRINGS.RABBIT} /> | `Image.COW` | <ImagePreview imageString={IMAGE_STRINGS.COW} /> | `Image.DUCK` | <ImagePreview imageString={IMAGE_STRINGS.DUCK} /> |
| `Image.TORTOISE` | <ImagePreview imageString={IMAGE_STRINGS.TORTOISE} /> | `Image.BUTTERFLY` | <ImagePreview imageString={IMAGE_STRINGS.BUTTERFLY} /> | `Image.STICKFIGURE` | <ImagePreview imageString={IMAGE_STRINGS.STICKFIGURE} /> |
| `Image.GHOST` | <ImagePreview imageString={IMAGE_STRINGS.GHOST} /> | `Image.GIRAFFE` | <ImagePreview imageString={IMAGE_STRINGS.GIRAFFE} /> | `Image.SKULL` | <ImagePreview imageString={IMAGE_STRINGS.SKULL} /> |
| `Image.UMBRELLA` | <ImagePreview imageString={IMAGE_STRINGS.UMBRELLA} /> | `Image.SNAKE` | <ImagePreview imageString={IMAGE_STRINGS.SNAKE} /> | `Image.SCISSORS` | <ImagePreview imageString={IMAGE_STRINGS.SCISSORS} /> |

### Tools & Objects

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.SWORD` | <ImagePreview imageString={IMAGE_STRINGS.SWORD} /> | `Image.TSHIRT` | <ImagePreview imageString={IMAGE_STRINGS.TSHIRT} /> | `Image.ROLLERSKATE` | <ImagePreview imageString={IMAGE_STRINGS.ROLLERSKATE} /> |
| `Image.HOUSE` | <ImagePreview imageString={IMAGE_STRINGS.HOUSE} /> | `Image.TARGET` | <ImagePreview imageString={IMAGE_STRINGS.TARGET} /> | | |

### Music

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.MUSIC_CROTCHET` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_CROTCHET} /> | `Image.MUSIC_QUAVER` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_QUAVER} /> | `Image.MUSIC_QUAVERS` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_QUAVERS} /> |
| `Image.PITCHFORK` | <ImagePreview imageString={IMAGE_STRINGS.PITCHFORK} /> | | | | |

### Special

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.XMAS` | <ImagePreview imageString={IMAGE_STRINGS.XMAS} /> | `Image.PACMAN` | <ImagePreview imageString={IMAGE_STRINGS.PACMAN} /> | | |

### Clock Faces (1-12)

Clock faces for different hours. These are perfect for creating clock animations.

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.CLOCK1` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK1} /> | `Image.CLOCK2` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK2} /> | `Image.CLOCK3` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK3} /> |
| `Image.CLOCK4` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK4} /> | `Image.CLOCK5` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK5} /> | `Image.CLOCK6` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK6} /> |
| `Image.CLOCK7` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK7} /> | `Image.CLOCK8` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK8} /> | `Image.CLOCK9` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK9} /> |
| `Image.CLOCK10` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK10} /> | `Image.CLOCK11` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK11} /> | `Image.CLOCK12` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK12} /> |

### Arrows (8 Directions)

Directional arrows for navigation and movement indicators.

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.ARROW_N` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_N} /> | `Image.ARROW_NE` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_NE} /> | `Image.ARROW_E` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_E} /> |
| `Image.ARROW_SE` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_SE} /> | `Image.ARROW_S` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_S} /> | `Image.ARROW_SW` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_SW} /> |
| `Image.ARROW_W` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_W} /> | `Image.ARROW_NW` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_NW} /> | | |

## Icon Sequences

For convenience, the Image class provides pre-defined sequences for common animations:

### `Image.ALL_CLOCKS`
List of all 12 clock icons for clock animations.

```python
from codibit import Image, display
import time

# Clock animation
for clock in Image.ALL_CLOCKS:
    display.clear()
    display.draw_image(clock, 0, 0)
    display.show()
    sleep(0.5)
```

### `Image.ALL_ARROWS`
List of all 8 arrow icons for directional animations.

```python
from codibit import Image, display
import time

# Arrow animation
for arrow in Image.ALL_ARROWS:
    display.clear()
    display.draw_image(arrow, 0, 0)
    display.show()
    sleep(0.3)
```