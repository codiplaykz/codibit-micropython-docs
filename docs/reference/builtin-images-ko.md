# Built-in images(내장 이미지)

이 문서는 Codi:bit 라이브러리에서 사용할 수 있는 모든 64개의 내장 이미지에 대한 종합적인 참조 자료입니다.

## 개요

Codi:bit 라이브러리는 Image 객체를 통해 접근할 수 있는 64개의 내장 이미지를 제공합니다:

- `Image.ICON_NAME` (예: `Image.HEART`)

## 사용 방법

```python
from codibit import display, Image

# 내장 아이콘 그리기
display.draw_image(Image.HEART, 0, 0)
display.draw_image(Image.HAPPY, 20, 0)
display.show()

# 스케일링과 함께
display.draw_image(Image.STAR, 0, 0, scale=2)
display.draw_image(Image.DIAMOND, 40, 0, scale=3)
display.show()
```

## 완전한 아이콘 참조

import ImagePreview from '@site/src/components/ImagePreview';
import { IMAGE_STRINGS } from '@site/src/constants/imageStrings';

### 기본 아이콘

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.HEART` | <ImagePreview imageString={IMAGE_STRINGS.HEART} /> | `Image.HEART_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.HEART_SMALL} /> | `Image.HAPPY` | <ImagePreview imageString={IMAGE_STRINGS.HAPPY} /> |
| `Image.STAR` | <ImagePreview imageString={IMAGE_STRINGS.STAR} /> | `Image.SAD` | <ImagePreview imageString={IMAGE_STRINGS.SAD} /> | `Image.CONFUSED` | <ImagePreview imageString={IMAGE_STRINGS.CONFUSED} /> |
| `Image.ANGRY` | <ImagePreview imageString={IMAGE_STRINGS.ANGRY} /> | `Image.ASLEEP` | <ImagePreview imageString={IMAGE_STRINGS.ASLEEP} /> | `Image.SURPRISED` | <ImagePreview imageString={IMAGE_STRINGS.SURPRISED} /> |
| `Image.SILLY` | <ImagePreview imageString={IMAGE_STRINGS.SILLY} /> | `Image.FABULOUS` | <ImagePreview imageString={IMAGE_STRINGS.FABULOUS} /> | `Image.MEH` | <ImagePreview imageString={IMAGE_STRINGS.MEH} /> |
| `Image.O` | <ImagePreview imageString={IMAGE_STRINGS.O} /> | `Image.X` | <ImagePreview imageString={IMAGE_STRINGS.X} /> | | |

### 기하학적 도형

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.TRIANGLE` | <ImagePreview imageString={IMAGE_STRINGS.TRIANGLE} /> | `Image.TRIANGLE_LEFT` | <ImagePreview imageString={IMAGE_STRINGS.TRIANGLE_LEFT} /> | `Image.CHESSBOARD` | <ImagePreview imageString={IMAGE_STRINGS.CHESSBOARD} /> |
| `Image.DIAMOND` | <ImagePreview imageString={IMAGE_STRINGS.DIAMOND} /> | `Image.DIAMOND_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.DIAMOND_SMALL} /> | `Image.SQUARE` | <ImagePreview imageString={IMAGE_STRINGS.SQUARE} /> |
| `Image.SQUARE_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.SQUARE_SMALL} /> | | | | |

### 동물 및 캐릭터

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.RABBIT` | <ImagePreview imageString={IMAGE_STRINGS.RABBIT} /> | `Image.COW` | <ImagePreview imageString={IMAGE_STRINGS.COW} /> | `Image.DUCK` | <ImagePreview imageString={IMAGE_STRINGS.DUCK} /> |
| `Image.TORTOISE` | <ImagePreview imageString={IMAGE_STRINGS.TORTOISE} /> | `Image.BUTTERFLY` | <ImagePreview imageString={IMAGE_STRINGS.BUTTERFLY} /> | `Image.STICKFIGURE` | <ImagePreview imageString={IMAGE_STRINGS.STICKFIGURE} /> |
| `Image.GHOST` | <ImagePreview imageString={IMAGE_STRINGS.GHOST} /> | `Image.GIRAFFE` | <ImagePreview imageString={IMAGE_STRINGS.GIRAFFE} /> | `Image.SKULL` | <ImagePreview imageString={IMAGE_STRINGS.SKULL} /> |
| `Image.UMBRELLA` | <ImagePreview imageString={IMAGE_STRINGS.UMBRELLA} /> | `Image.SNAKE` | <ImagePreview imageString={IMAGE_STRINGS.SNAKE} /> | `Image.SCISSORS` | <ImagePreview imageString={IMAGE_STRINGS.SCISSORS} /> |

### 도구 및 물건

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.SWORD` | <ImagePreview imageString={IMAGE_STRINGS.SWORD} /> | `Image.TSHIRT` | <ImagePreview imageString={IMAGE_STRINGS.TSHIRT} /> | `Image.ROLLERSKATE` | <ImagePreview imageString={IMAGE_STRINGS.ROLLERSKATE} /> |
| `Image.HOUSE` | <ImagePreview imageString={IMAGE_STRINGS.HOUSE} /> | `Image.TARGET` | <ImagePreview imageString={IMAGE_STRINGS.TARGET} /> | | |

### 음악

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.MUSIC_CROTCHET` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_CROTCHET} /> | `Image.MUSIC_QUAVER` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_QUAVER} /> | `Image.MUSIC_QUAVERS` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_QUAVERS} /> |
| `Image.PITCHFORK` | <ImagePreview imageString={IMAGE_STRINGS.PITCHFORK} /> | | | | |

### 특수

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.XMAS` | <ImagePreview imageString={IMAGE_STRINGS.XMAS} /> | `Image.PACMAN` | <ImagePreview imageString={IMAGE_STRINGS.PACMAN} /> | | |

### 시계 얼굴 (1-12)

다양한 시간의 시계 얼굴입니다. 시계 애니메이션을 만드는 데 완벽합니다.

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.CLOCK1` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK1} /> | `Image.CLOCK2` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK2} /> | `Image.CLOCK3` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK3} /> |
| `Image.CLOCK4` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK4} /> | `Image.CLOCK5` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK5} /> | `Image.CLOCK6` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK6} /> |
| `Image.CLOCK7` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK7} /> | `Image.CLOCK8` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK8} /> | `Image.CLOCK9` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK9} /> |
| `Image.CLOCK10` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK10} /> | `Image.CLOCK11` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK11} /> | `Image.CLOCK12` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK12} /> |

### 화살표 (8방향)

네비게이션과 움직임 표시를 위한 방향 화살표입니다.

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.ARROW_N` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_N} /> | `Image.ARROW_NE` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_NE} /> | `Image.ARROW_E` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_E} /> |
| `Image.ARROW_SE` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_SE} /> | `Image.ARROW_S` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_S} /> | `Image.ARROW_SW` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_SW} /> |
| `Image.ARROW_W` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_W} /> | `Image.ARROW_NW` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_NW} /> | | |

## 아이콘 시퀀스

편의를 위해 Image 클래스는 일반적인 애니메이션을 위한 미리 정의된 시퀀스를 제공합니다:

### `Image.ALL_CLOCKS`
시계 애니메이션을 위한 모든 12개 시계 아이콘 목록입니다.

```python
from codibit import Image, display
import time

# 시계 애니메이션
for clock in Image.ALL_CLOCKS:
    display.clear()
    display.draw_image(clock, 0, 0)
    display.show()
    time.sleep(0.5)
```

### `Image.ALL_ARROWS`
방향 애니메이션을 위한 모든 8개 화살표 아이콘 목록입니다.

```python
from codibit import Image, display
import time

# 화살표 애니메이션
for arrow in Image.ALL_ARROWS:
    display.clear()
    display.draw_image(arrow, 0, 0)
    display.show()
    time.sleep(0.3)
```
