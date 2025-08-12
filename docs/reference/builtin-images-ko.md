# 내장 이미지 및 아이콘

이 문서는 Codi:bit 라이브러리에서 사용할 수 있는 모든 64개의 내장 이미지와 아이콘에 대한 종합적인 참조 자료입니다.

## 개요

Codi:bit 라이브러리는 두 가지 방법으로 사용할 수 있는 64개의 내장 이미지를 제공합니다:

1. **Image 객체**: `Image.ICON_NAME`으로 접근 (예: `Image.HEART`)
2. **ICONS 상수**: `ICONS.ICON_NAME`으로 접근 (예: `ICONS.HEART`) - **권장**

## 사용 방법

### 방법 1: Image 객체 (레거시)
```python
from codibit import display, Image

# 내장 아이콘 그리기
display.draw_image(Image.HEART, 0, 0)
display.draw_image(Image.HAPPY, 20, 0)
display.show()
```

### 방법 2: ICONS 상수 (권장)
```python
from codibit import display, ICONS

# 타입 안전성을 갖춘 내장 아이콘 그리기
display.draw_icon(ICONS.HEART, 0, 0)
display.draw_icon(ICONS.HAPPY, 20, 0)
display.show()

# 스케일링과 함께
display.draw_icon(ICONS.STAR, 0, 0, scale=2)
display.draw_icon(ICONS.DIAMOND, 40, 0, scale=3)
display.show()
```

## 완전한 아이콘 참조

import ImagePreview from '@site/src/components/ImagePreview';
import { IMAGE_STRINGS } from '@site/src/constants/imageStrings';

### 기본 아이콘

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.HEART` / `ICONS.HEART` | <ImagePreview imageString={IMAGE_STRINGS.HEART} /> | `Image.HEART_SMALL` / `ICONS.HEART_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.HEART_SMALL} /> | `Image.HAPPY` / `ICONS.HAPPY` | <ImagePreview imageString={IMAGE_STRINGS.HAPPY} /> |
| `Image.STAR` / `ICONS.STAR` | <ImagePreview imageString={IMAGE_STRINGS.STAR} /> | `Image.SAD` / `ICONS.SAD` | <ImagePreview imageString={IMAGE_STRINGS.SAD} /> | `Image.CONFUSED` / `ICONS.CONFUSED` | <ImagePreview imageString={IMAGE_STRINGS.CONFUSED} /> |
| `Image.ANGRY` / `ICONS.ANGRY` | <ImagePreview imageString={IMAGE_STRINGS.ANGRY} /> | `Image.ASLEEP` / `ICONS.ASLEEP` | <ImagePreview imageString={IMAGE_STRINGS.ASLEEP} /> | `Image.SURPRISED` / `ICONS.SURPRISED` | <ImagePreview imageString={IMAGE_STRINGS.SURPRISED} /> |
| `Image.SILLY` / `ICONS.SILLY` | <ImagePreview imageString={IMAGE_STRINGS.SILLY} /> | `Image.FABULOUS` / `ICONS.FABULOUS` | <ImagePreview imageString={IMAGE_STRINGS.FABULOUS} /> | `Image.MEH` / `ICONS.MEH` | <ImagePreview imageString={IMAGE_STRINGS.MEH} /> |
| `Image.O` / `ICONS.O` | <ImagePreview imageString={IMAGE_STRINGS.O} /> | `Image.X` / `ICONS.X` | <ImagePreview imageString={IMAGE_STRINGS.X} /> | | |

### 기하학적 도형

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.TRIANGLE` / `ICONS.TRIANGLE` | <ImagePreview imageString={IMAGE_STRINGS.TRIANGLE} /> | `Image.TRIANGLE_LEFT` / `ICONS.TRIANGLE_LEFT` | <ImagePreview imageString={IMAGE_STRINGS.TRIANGLE_LEFT} /> | `Image.CHESSBOARD` / `ICONS.CHESSBOARD` | <ImagePreview imageString={IMAGE_STRINGS.CHESSBOARD} /> |
| `Image.DIAMOND` / `ICONS.DIAMOND` | <ImagePreview imageString={IMAGE_STRINGS.DIAMOND} /> | `Image.DIAMOND_SMALL` / `ICONS.DIAMOND_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.DIAMOND_SMALL} /> | `Image.SQUARE` / `ICONS.SQUARE` | <ImagePreview imageString={IMAGE_STRINGS.SQUARE} /> |
| `Image.SQUARE_SMALL` / `ICONS.SQUARE_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.SQUARE_SMALL} /> | | | | |

### 동물 및 캐릭터

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.RABBIT` / `ICONS.RABBIT` | <ImagePreview imageString={IMAGE_STRINGS.RABBIT} /> | `Image.COW` / `ICONS.COW` | <ImagePreview imageString={IMAGE_STRINGS.COW} /> | `Image.DUCK` / `ICONS.DUCK` | <ImagePreview imageString={IMAGE_STRINGS.DUCK} /> |
| `Image.TORTOISE` / `ICONS.TORTOISE` | <ImagePreview imageString={IMAGE_STRINGS.TORTOISE} /> | `Image.BUTTERFLY` / `ICONS.BUTTERFLY` | <ImagePreview imageString={IMAGE_STRINGS.BUTTERFLY} /> | `Image.STICKFIGURE` / `ICONS.STICKFIGURE` | <ImagePreview imageString={IMAGE_STRINGS.STICKFIGURE} /> |
| `Image.GHOST` / `ICONS.GHOST` | <ImagePreview imageString={IMAGE_STRINGS.GHOST} /> | `Image.GIRAFFE` / `ICONS.GIRAFFE` | <ImagePreview imageString={IMAGE_STRINGS.GIRAFFE} /> | `Image.SKULL` / `ICONS.SKULL` | <ImagePreview imageString={IMAGE_STRINGS.SKULL} /> |
| `Image.UMBRELLA` / `ICONS.UMBRELLA` | <ImagePreview imageString={IMAGE_STRINGS.UMBRELLA} /> | `Image.SNAKE` / `ICONS.SNAKE` | <ImagePreview imageString={IMAGE_STRINGS.SNAKE} /> | `Image.SCISSORS` / `ICONS.SCISSORS` | <ImagePreview imageString={IMAGE_STRINGS.SCISSORS} /> |

### 도구 및 물건

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.SWORD` / `ICONS.SWORD` | <ImagePreview imageString={IMAGE_STRINGS.SWORD} /> | `Image.TSHIRT` / `ICONS.TSHIRT` | <ImagePreview imageString={IMAGE_STRINGS.TSHIRT} /> | `Image.ROLLERSKATE` / `ICONS.ROLLERSKATE` | <ImagePreview imageString={IMAGE_STRINGS.ROLLERSKATE} /> |
| `Image.HOUSE` / `ICONS.HOUSE` | <ImagePreview imageString={IMAGE_STRINGS.HOUSE} /> | `Image.TARGET` / `ICONS.TARGET` | <ImagePreview imageString={IMAGE_STRINGS.TARGET} /> | | |

### 음악

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.MUSIC_CROTCHET` / `ICONS.MUSIC_CROTCHET` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_CROTCHET} /> | `Image.MUSIC_QUAVER` / `ICONS.MUSIC_QUAVER` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_QUAVER} /> | `Image.MUSIC_QUAVERS` / `ICONS.MUSIC_QUAVERS` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_QUAVERS} /> |
| `Image.PITCHFORK` / `ICONS.PITCHFORK` | <ImagePreview imageString={IMAGE_STRINGS.PITCHFORK} /> | | | | |

### 특수

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.XMAS` / `ICONS.XMAS` | <ImagePreview imageString={IMAGE_STRINGS.XMAS} /> | `Image.PACMAN` / `ICONS.PACMAN` | <ImagePreview imageString={IMAGE_STRINGS.PACMAN} /> | | |

### 시계 얼굴 (1-12)

다양한 시간의 시계 얼굴입니다. 시계 애니메이션을 만드는 데 완벽합니다.

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.CLOCK1` / `ICONS.CLOCK1` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK1} /> | `Image.CLOCK2` / `ICONS.CLOCK2` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK2} /> | `Image.CLOCK3` / `ICONS.CLOCK3` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK3} /> |
| `Image.CLOCK4` / `ICONS.CLOCK4` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK4} /> | `Image.CLOCK5` / `ICONS.CLOCK5` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK5} /> | `Image.CLOCK6` / `ICONS.CLOCK6` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK6} /> |
| `Image.CLOCK7` / `ICONS.CLOCK7` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK7} /> | `Image.CLOCK8` / `ICONS.CLOCK8` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK8} /> | `Image.CLOCK9` / `ICONS.CLOCK9` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK9} /> |
| `Image.CLOCK10` / `ICONS.CLOCK10` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK10} /> | `Image.CLOCK11` / `ICONS.CLOCK11` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK11} /> | `Image.CLOCK12` / `ICONS.CLOCK12` | <ImagePreview imageString={IMAGE_STRINGS.CLOCK12} /> |

### 화살표 (8방향)

네비게이션과 움직임 표시를 위한 방향 화살표입니다.

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.ARROW_N` / `ICONS.ARROW_N` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_N} /> | `Image.ARROW_NE` / `ICONS.ARROW_NE` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_NE} /> | `Image.ARROW_E` / `ICONS.ARROW_E` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_E} /> |
| `Image.ARROW_SE` / `ICONS.ARROW_SE` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_SE} /> | `Image.ARROW_S` / `ICONS.ARROW_S` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_S} /> | `Image.ARROW_SW` / `ICONS.ARROW_SW` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_SW} /> |
| `Image.ARROW_W` / `ICONS.ARROW_W` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_W} /> | `Image.ARROW_NW` / `ICONS.ARROW_NW` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_NW} /> | | |

## 아이콘 시퀀스

편의를 위해 ICONS 클래스는 일반적인 애니메이션을 위한 미리 정의된 시퀀스를 제공합니다:

### `ICONS.ALL_CLOCKS`
시계 애니메이션을 위한 모든 12개 시계 아이콘 목록입니다.

```python
from codibit import ICONS, display
import time

# 시계 애니메이션
for clock in ICONS.ALL_CLOCKS:
    display.clear()
    display.draw_icon(clock, 0, 0)
    display.show()
    time.sleep(0.5)
```

### `ICONS.ALL_ARROWS`
방향 애니메이션을 위한 모든 8개 화살표 아이콘 목록입니다.

```python
from codibit import ICONS, display
import time

# 화살표 애니메이션
for arrow in ICONS.ALL_ARROWS:
    display.clear()
    display.draw_icon(arrow, 0, 0)
    display.show()
    time.sleep(0.3)
```
