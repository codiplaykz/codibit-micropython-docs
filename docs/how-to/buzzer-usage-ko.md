# How to use buzzer(버저 사용하기)

Codi:bit 보드의 내장 버저를 사용하여 소리, 멜로디, 음악을 만드는 방법을 배워보세요.

## 기본 설정

버저는 전역 인스턴스로 사용할 수 있습니다:

```python
from codibit import buzzer
```

## 단순한 음 재생

### 기본 음

특정 주파수로 단순한 음을 재생합니다. 지정된 시간 후 자동으로 정지됩니다:

```python
# A4 음을 1초간 재생 (자동 정지)
buzzer.play_tone(440, 1000)

# 저음 재생
buzzer.play_tone(200, 500)

# 고음 재생
buzzer.play_tone(1000, 2000)
```

### 주파수 예시

일반적인 음악 주파수:

```python
# 음악 음표 주파수 (Hz)
C4 = 262   # 중간 C
D4 = 294
E4 = 330
F4 = 349
G4 = 392
A4 = 440   # 표준 조율 기준
B4 = 494
C5 = 523

# 간단한 C 장음계 재생
notes = [C4, D4, E4, F4, G4, A4, B4, C5]
for note in notes:
    buzzer.play_tone(note, 500)
    sleep(0.1)
```

## 멜로디 재생

### 음표 문자열 사용

음표는 `NOTE[octave][:duration]` 형식으로 표현됩니다:

```python
# C 장음계 재생
buzzer.play_melody(['c4:4', 'd4:4', 'e4:4', 'f4:4', 'g4:4', 'a4:4', 'b4:4', 'c5:8'], tempo=120)

# 간단한 멜로디
melody = ['c4:4', 'e4:4', 'g4:8']
buzzer.play_melody(melody, tempo=100)
```

### 사용자 정의 멜로디

자신만의 멜로디를 만들고 재생합니다:

```python
# 간단한 멜로디 만들기 (C 장음계)
melody = [
    'c4:4',  # C
    'd4:4',  # D
    'e4:4',  # E
    'f4:4',  # F
    'g4:4',  # G
    'a4:4',  # A
    'b4:4',  # B
    'c5:8'   # C (한 옥타브 높음, 긴 음)
]

# 120 BPM 템포로 멜로디 재생
buzzer.play_melody(melody, tempo=120)
```

### 화음 진행

화음 진행을 재생합니다:

```python
# C 장조 화음 진행
chord_progression = [
    'c4:2', 'e4:2', 'g4:4',  # C 장조
    'f4:2', 'a4:2', 'c5:4',  # F 장조
    'g4:2', 'b4:2', 'd5:4',  # G 장조
    'c5:8'  # 마무리 C
]

buzzer.play_melody(chord_progression, tempo=140)
```

### 유명한 멜로디

잘 알려진 멜로디를 재생합니다:

```python
# 베토벤 5번 교향곡 시작 부분
beethoven_5th = [
    'r4:2', 'g', 'g', 'g', 'eb:8', 'r:2', 'f', 'f', 'f', 'd:8'
]

buzzer.play_melody(beethoven_5th, tempo=120)

# 징글벨
jingle_bells = [
    'e4:4', 'e4:4', 'e4:8', 'e4:4', 'e4:4', 'e4:8',
    'e4:4', 'g4:4', 'c4:4', 'd4:4', 'e4:8'
]

buzzer.play_melody(jingle_bells, tempo=150)
```

## 내장 곡 재생

Melody 클래스를 사용하여 미리 정의된 곡을 재생합니다:

```python
from codibit.builtin.buzzer import Melody

# 생일 축하합니다
buzzer.play_melody(Melody.HAPPY_BIRTHDAY, tempo=200)

# 반짝반짝 작은 별
buzzer.play_melody(Melody.TWINKLE_TWINKLE, tempo=180)

# 메리 양의 작은 양
buzzer.play_melody(Melody.MARY_HAD_A_LITTLE_LAMB, tempo=170)
```

## 미리 정의된 소리 재생

### 실용적인 소리

다양한 목적에 유용한 소리를 재생합니다:

```python
from codibit import *

# 기본 소리
buzzer.play_sound(Sound.BEEP)        # 기본 비프음
buzzer.play_sound(Sound.CHIME)       # 차임벨
buzzer.play_sound(Sound.ALERT)       # 경고음
buzzer.play_sound(Sound.NOTIFICATION) # 알림음
buzzer.play_sound(Sound.SUCCESS)     # 성공음
buzzer.play_sound(Sound.ERROR)       # 오류음
buzzer.play_sound(Sound.CLICK)       # 클릭음
buzzer.play_sound(Sound.TICK)        # 틱음
```

### 드럼 소리

리듬과 타악기를 위한 드럼 소리를 재생합니다:

```python
from codibit import *

# 기본 드럼 키트
buzzer.play_sound(Sound.DRUM_KICK)      # 킥 드럼
buzzer.play_sound(Sound.DRUM_SNARE)     # 스네어 드럼
buzzer.play_sound(Sound.DRUM_HIHAT)     # 하이햇
buzzer.play_sound(Sound.DRUM_CRASH)     # 크래시 심벌

# 추가 드럼
buzzer.play_sound(Sound.DRUM_TOM1)      # 톰 1
buzzer.play_sound(Sound.DRUM_TOM2)      # 톰 2
buzzer.play_sound(Sound.DRUM_TOM3)      # 톰 3
buzzer.play_sound(Sound.DRUM_FLOOR_TOM) # 플로어 톰

# 심벌
buzzer.play_sound(Sound.DRUM_RIDE)      # 라이드 심벌
buzzer.play_sound(Sound.DRUM_CHINA)     # 차이나 심벌
buzzer.play_sound(Sound.DRUM_SPLASH)    # 스플래시 심벌

# 하이햇 변형
buzzer.play_sound(Sound.DRUM_HIHAT_OPEN)   # 오픈 하이햇
buzzer.play_sound(Sound.DRUM_HIHAT_CLOSED) # 클로즈드 하이햇

# 타악기
buzzer.play_sound(Sound.DRUM_COWBELL)   # 카우벨
buzzer.play_sound(Sound.DRUM_CLAP)      # 클랩
buzzer.play_sound(Sound.DRUM_SHAKER)    # 쉐이커
```

### 드럼 패턴 만들기

간단한 드럼 패턴을 만듭니다:

```python
from codibit import *

# 간단한 록 비트
def play_rock_beat():
    for _ in range(4):  # 4마디
        # 1박자
        buzzer.play_sound(Sound.DRUM_KICK)
        sleep(0.1)
        buzzer.play_sound(Sound.DRUM_HIHAT)
        sleep(0.1)

        # 2박자
        buzzer.play_sound(Sound.DRUM_SNARE)
        sleep(0.1)
        buzzer.play_sound(Sound.DRUM_HIHAT)
        sleep(0.1)

        # 3박자
        buzzer.play_sound(Sound.DRUM_KICK)
        sleep(0.1)
        buzzer.play_sound(Sound.DRUM_HIHAT)
        sleep(0.1)

        # 4박자
        buzzer.play_sound(Sound.DRUM_SNARE)
        sleep(0.1)
        buzzer.play_sound(Sound.DRUM_HIHAT)
        sleep(0.1)

play_rock_beat()
```

## 템포 제어

멜로디의 템포를 설정하고 조정합니다:

```python
# 템포 설정
buzzer.set_tempo(bpm=180)  # 빠른 템포
buzzer.set_tempo(bpm=60)   # 느린 템포

# 현재 템포 확인
ticks, bpm = buzzer.get_tempo()
print(f"현재 템포: {bpm} BPM, {ticks}틱")

# 다양한 템포로 같은 멜로디 재생
melody = ['c4:4', 'd4:4', 'e4:4', 'f4:4', 'g4:8']

buzzer.set_tempo(bpm=60)
buzzer.play_melody(melody)  # 느리게

buzzer.set_tempo(bpm=120)
buzzer.play_melody(melody)  # 보통

buzzer.set_tempo(bpm=180)
buzzer.play_melody(melody)  # 빠르게
```

## 볼륨 제어

버저 볼륨을 조정합니다:

```python
# 볼륨 레벨 설정
buzzer.set_volume(0)  # 음소거
buzzer.set_volume(1)  # 작게
buzzer.set_volume(2)  # 중간 (기본값)
buzzer.set_volume(3)  # 크게

# 큰 볼륨으로 음 재생
buzzer.set_volume(3)
buzzer.play_tone(440, 1000)

# 볼륨 페이드 효과 만들기
for volume in range(4):
    buzzer.set_volume(volume)
    buzzer.play_tone(440, 500)
    sleep(0.1)
```

## 소리 정지

현재 재생 중인 소리를 정지합니다:

```python
# 긴 음 시작
buzzer.play_tone(440, 10000)  # 10초

# 즉시 정지
buzzer.stop()

# 멜로디 정지
buzzer.play_melody(['c4:4', 'd4:4', 'e4:4', 'f4:4', 'g4:8'])
buzzer.stop()  # 멜로디 정지
```

## 완전한 예시

다양한 버저 기능을 보여주는 완전한 예시입니다:

```python
from codibit import *

print("=== Codi:bit 버저 데모 ===")

# 볼륨 테스트
print("볼륨 레벨 테스트 중...")
for volume in range(4):
    buzzer.set_volume(volume)
    buzzer.play_tone(440, 500)
    sleep(0.5)

# 음표 문자열 테스트
print("C 장음계 재생 중...")
melody = ['c4:4', 'd4:4', 'e4:4', 'f4:4', 'g4:4', 'a4:4', 'b4:4', 'c5:8']
buzzer.play_melody(melody, tempo=120)

# 실용적인 소리 테스트
print("실용적인 소리 재생 중...")
sounds = [Sound.BEEP, Sound.CHIME, Sound.ALERT, Sound.SUCCESS]
for sound in sounds:
    buzzer.play_sound(sound)
    sleep(0.5)

# 드럼 소리 테스트
print("드럼 소리 재생 중...")
drums = [Sound.DRUM_KICK, Sound.DRUM_SNARE, Sound.DRUM_HIHAT, Sound.DRUM_CRASH]
for drum in drums:
    buzzer.play_sound(drum)
    sleep(0.3)

# 사용자 정의 멜로디
print("사용자 정의 멜로디 재생 중...")
melody = ['c4:2', 'e4:2', 'g4:4']
buzzer.play_melody(melody, tempo=120)

# 템포 제어 테스트
print("다양한 템포로 멜로디 재생 중...")
melody = ['c4:4', 'd4:4', 'e4:4', 'f4:4', 'g4:8']
for bpm in [60, 120, 180]:
    buzzer.set_tempo(bpm=bpm)
    buzzer.play_melody(melody)
    sleep(0.5)

# 내장 곡
print("생일 축하합니다 재생 중...")
buzzer.play_melody(Melody.HAPPY_BIRTHDAY, tempo=200)

print("버저 데모 완료!")
```

## 음표 표기법

### 기본 형식

음표는 `NOTE[octave][:duration]` 형식으로 표현됩니다:

```python
'c4:4'    # C4 음을 4틱 동안
'g'        # G4 음을 기본 지속시간(4틱) 동안
'r:2'      # 2틱 동안 쉼표
'eb:8'     # E♭4 음을 8틱 동안
'f#5:1'    # F#5 음을 1틱 동안
```

### 지원하는 음표

- **기본 음표**: `c`, `d`, `e`, `f`, `g`, `a`, `b`
- **플랫**: `cb`, `db`, `eb`, `fb`, `gb`, `ab`, `bb`
- **샵**: `c#`, `d#`, `e#`, `f#`, `g#`, `a#`, `b#`
- **옥타브**: 3, 4(기본), 5
- **쉼표**: `r` (silence)

### 템포 시스템

- **기본값**: 4틱, 120 BPM
- **1틱**: 60000 / BPM / ticks_per_beat 밀리초
- **기본값**: 1틱 = 125ms, 1박자 = 500ms

## API 요약

### 핵심 메서드

- `buzzer.play_tone(frequency, duration_ms)` - 단일 음 재생 (자동 정지)
- `buzzer.play_melody(melody, tempo=None)` - 음표 문자열로 멜로디 재생
- `buzzer.play_sound(sound_type)` - 미리 정의된 소리 재생
- `buzzer.stop()` - 현재 소리 정지

### 제어 메서드

- `buzzer.set_volume(volume)` - 볼륨 설정 (0-3)
- `buzzer.set_tempo(ticks=4, bpm=120)` - 템포 설정
- `buzzer.get_tempo()` - 현재 템포 가져오기

### 내장 리소스

- `Melody.HAPPY_BIRTHDAY` - 생일 축하합니다
- `Melody.TWINKLE_TWINKLE` - 반짝반짝 작은 별
- `Melody.MARY_HAD_A_LITTLE_LAMB` - 메리 양의 작은 양
- `Sound.BEEP`, `Sound.CHIME` 등 - 실용적인 소리
- `Sound.DRUM_KICK`, `Sound.DRUM_SNARE` 등 - 드럼 소리

## 팁

1. **단순하고 직관적**: API는 `auto_stop` 같은 복잡한 파라미터 없이 단순하게 설계되었습니다
2. **자동 정지**: 모든 음은 지정된 시간 후 자동으로 정지됩니다
3. **중단**: Ctrl+C로 모든 멜로디나 곡 재생을 중단할 수 있습니다
4. **볼륨 범위**: 볼륨 레벨은 0 (음소거)부터 3 (크게)까지입니다
5. **템포**: 템포는 BPM (분당 비트 수)로 지정됩니다
6. **음표 표기법**: 음표는 `NOTE[octave][:duration]` 형식을 사용하세요
7. **소리 타입**: 8가지 실용적인 소리와 16가지 드럼 소리를 사용할 수 있습니다
8. **틱 시스템**: 음악의 기본 시간 단위는 틱이며, 템포에 따라 길이가 결정됩니다