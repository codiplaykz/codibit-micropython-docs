# Built-in images and icons

This document provides a comprehensive reference for all 64 built-in images and icons available in the Codi:bit library.

## Overview

The Codi:bit library provides 64 built-in images that can be used in two ways:

1. **Image Objects**: Access via `Image.ICON_NAME` (e.g., `Image.HEART`)
2. **ICONS Constants**: Access via `ICONS.ICON_NAME` (e.g., `ICONS.HEART`) - **Recommended**

## Usage Methods

### Method 1: Image Objects (Legacy)
```python
from codibit import display, Image

# Draw built-in icons
display.draw_image(Image.HEART, 0, 0)
display.draw_image(Image.HAPPY, 20, 0)
display.show()
```

### Method 2: ICONS Constants (Recommended)
```python
from codibit import display, ICONS

# Draw built-in icons with type safety
display.draw_icon(ICONS.HEART, 0, 0)
display.draw_icon(ICONS.HAPPY, 20, 0)
display.show()

# With scaling
display.draw_icon(ICONS.STAR, 0, 0, scale=2)
display.draw_icon(ICONS.DIAMOND, 40, 0, scale=3)
display.show()
```

## Complete Icon Reference

import ImagePreview from '@site/src/components/ImagePreview';
import { IMAGE_STRINGS } from '@site/src/constants/imageStrings';

### Basic Icons

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.HEART` / `ICONS.HEART` | <ImagePreview imageString={IMAGE_STRINGS.HEART} /> | `Image.HEART_SMALL` / `ICONS.HEART_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.HEART_SMALL} /> | `Image.HAPPY` / `ICONS.HAPPY` | <ImagePreview imageString={IMAGE_STRINGS.HAPPY} /> |
| `Image.STAR` / `ICONS.STAR` | <ImagePreview imageString={IMAGE_STRINGS.STAR} /> | `Image.SAD` / `ICONS.SAD` | <ImagePreview imageString={IMAGE_STRINGS.SAD} /> | `Image.CONFUSED` / `ICONS.CONFUSED` | <ImagePreview imageString={IMAGE_STRINGS.CONFUSED} /> |
| `Image.ANGRY` / `ICONS.ANGRY` | <ImagePreview imageString={IMAGE_STRINGS.ANGRY} /> | `Image.ASLEEP` / `ICONS.ASLEEP` | <ImagePreview imageString={IMAGE_STRINGS.ASLEEP} /> | `Image.SURPRISED` / `ICONS.SURPRISED` | <ImagePreview imageString={IMAGE_STRINGS.SURPRISED} /> |
| `Image.SILLY` / `ICONS.SILLY` | <ImagePreview imageString={IMAGE_STRINGS.SILLY} /> | `Image.FABULOUS` / `ICONS.FABULOUS` | <ImagePreview imageString={IMAGE_STRINGS.FABULOUS} /> | `Image.MEH` / `ICONS.MEH` | <ImagePreview imageString={IMAGE_STRINGS.MEH} /> |
| `Image.O` / `ICONS.O` | <ImagePreview imageString={IMAGE_STRINGS.O} /> | `Image.X` / `ICONS.X` | <ImagePreview imageString={IMAGE_STRINGS.X} /> | | |

### Geometric Shapes

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.TRIANGLE` / `ICONS.TRIANGLE` | <ImagePreview imageString={IMAGE_STRINGS.TRIANGLE} /> | `Image.TRIANGLE_LEFT` / `ICONS.TRIANGLE_LEFT` | <ImagePreview imageString={IMAGE_STRINGS.TRIANGLE_LEFT} /> | `Image.CHESSBOARD` / `ICONS.CHESSBOARD` | <ImagePreview imageString={IMAGE_STRINGS.CHESSBOARD} /> |
| `Image.DIAMOND` / `ICONS.DIAMOND` | <ImagePreview imageString={IMAGE_STRINGS.DIAMOND} /> | `Image.DIAMOND_SMALL` / `ICONS.DIAMOND_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.DIAMOND_SMALL} /> | `Image.SQUARE` / `ICONS.SQUARE` | <ImagePreview imageString={IMAGE_STRINGS.SQUARE} /> |
| `Image.SQUARE_SMALL` / `ICONS.SQUARE_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.SQUARE_SMALL} /> | | | | |

### Animals & Characters

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.RABBIT` / `ICONS.RABBIT` | <ImagePreview imageString={IMAGE_STRINGS.RABBIT} /> | `Image.COW` / `ICONS.COW` | <ImagePreview imageString={IMAGE_STRINGS.COW} /> | `Image.DUCK` / `ICONS.DUCK` | <ImagePreview imageString={IMAGE_STRINGS.DUCK} /> |
| `Image.TORTOISE` / `ICONS.TORTOISE` | <ImagePreview imageString={IMAGE_STRINGS.TORTOISE} /> | `Image.BUTTERFLY` / `ICONS.BUTTERFLY` | <ImagePreview imageString={IMAGE_STRINGS.BUTTERFLY} /> | `Image.STICKFIGURE` / `ICONS.STICKFIGURE` | <ImagePreview imageString={IMAGE_STRINGS.STICKFIGURE} /> |
| `Image.GHOST` / `ICONS.GHOST` | <ImagePreview imageString={IMAGE_STRINGS.GHOST} /> | `Image.GIRAFFE` / `ICONS.GIRAFFE` | <ImagePreview imageString={IMAGE_STRINGS.GIRAFFE} /> | `Image.SKULL` / `ICONS.SKULL` | <ImagePreview imageString={IMAGE_STRINGS.SKULL} /> |
| `Image.UMBRELLA` / `ICONS.UMBRELLA` | <ImagePreview imageString={IMAGE_STRINGS.UMBRELLA} /> | `Image.SNAKE` / `ICONS.SNAKE` | <ImagePreview imageString={IMAGE_STRINGS.SNAKE} /> | `Image.SCISSORS` / `ICONS.SCISSORS` | <ImagePreview imageString={IMAGE_STRINGS.SCISSORS} /> |

### Tools & Objects

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.SWORD` / `ICONS.SWORD` | <ImagePreview imageString={IMAGE_STRINGS.SWORD} /> | `Image.TSHIRT` / `ICONS.TSHIRT` | <ImagePreview imageString={IMAGE_STRINGS.TSHIRT} /> | `Image.ROLLERSKATE` / `ICONS.ROLLERSKATE` | <ImagePreview imageString={IMAGE_STRINGS.ROLLERSKATE} /> |
| `Image.HOUSE` / `ICONS.HOUSE` | <ImagePreview imageString={IMAGE_STRINGS.HOUSE} /> | `Image.TARGET` / `ICONS.TARGET` | <ImagePreview imageString={IMAGE_STRINGS.TARGET} /> | | |

### Music

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.MUSIC_CROTCHET` / `ICONS.MUSIC_CROTCHET` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_CROTCHET} /> | `Image.MUSIC_QUAVER` / `ICONS.MUSIC_QUAVER` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_QUAVER} /> | `Image.MUSIC_QUAVERS` / `ICONS.MUSIC_QUAVERS` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_QUAVERS} /> |
| `Image.PITCHFORK` / `ICONS.PITCHFORK` | <ImagePreview imageString={IMAGE_STRINGS.PITCHFORK} /> | | | | |

### Special

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.XMAS` / `ICONS.XMAS` | <ImagePreview imageString={IMAGE_STRINGS.XMAS} /> | `Image.PACMAN` / `ICONS.PACMAN` | <ImagePreview imageString={IMAGE_STRINGS.PACMAN} /> | | |

### Clock Faces (1-12)

Clock faces for different hours. These are perfect for creating clock animations.

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.CLOCK1` / `ICONS.CLOCK1` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK1} /> | `Image.CLOCK2` / `ICONS.CLOCK2` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK2} /> | `Image.CLOCK3` / `ICONS.CLOCK3` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK3} /> |
| `Image.CLOCK4` / `ICONS.CLOCK4` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK4} /> | `Image.CLOCK5` / `ICONS.CLOCK5` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK5} /> | `Image.CLOCK6` / `ICONS.CLOCK6` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK6} /> |
| `Image.CLOCK7` / `ICONS.CLOCK7` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK7} /> | `Image.CLOCK8` / `ICONS.CLOCK8` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK8} /> | `Image.CLOCK9` / `ICONS.CLOCK9` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK9} /> |
| `Image.CLOCK10` / `ICONS.CLOCK10` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK10} /> | `Image.CLOCK11` / `ICONS.CLOCK11` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK11} /> | `Image.CLOCK12` / `ICONS.CLOCK12` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK12} /> |

### Arrows (8 Directions)

Directional arrows for navigation and movement indicators.

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.ARROW_N` / `ICONS.ARROW_N` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_N} /> | `Image.ARROW_NE` / `ICONS.ARROW_NE` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_NE} /> | `Image.ARROW_E` / `ICONS.ARROW_E` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_E} /> |
| `Image.ARROW_SE` / `ICONS.ARROW_SE` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_SE} /> | `Image.ARROW_S` / `ICONS.ARROW_S` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_S} /> | `Image.ARROW_SW` / `ICONS.ARROW_SW` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_SW} /> |
| `Image.ARROW_W` / `ICONS.ARROW_W` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_W} /> | `Image.ARROW_NW` / `ICONS.ARROW_NW` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_NW} /> | | |

## Icon Sequences

For convenience, the ICONS class provides pre-defined sequences for common animations:

### `ICONS.ALL_CLOCKS`
List of all 12 clock icons for clock animations.

```python
from codibit import ICONS, display
import time

# Clock animation
for clock in ICONS.ALL_CLOCKS:
    display.clear()
    display.draw_icon(clock, 0, 0)
    display.show()
    time.sleep(0.5)
```

### `ICONS.ALL_ARROWS`
List of all 8 arrow icons for directional animations.

```python
from codibit import ICONS, display
import time

# Arrow animation
for arrow in ICONS.ALL_ARROWS:
    display.clear()
    display.draw_icon(arrow, 0, 0)
    display.show()
    time.sleep(0.3)
```