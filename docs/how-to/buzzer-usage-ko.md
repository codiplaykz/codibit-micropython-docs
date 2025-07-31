# Buzzer Usage Guide(버저 사용 가이드)

Codi:bit 보드의 내장 버저를 사용하여 소리, 멜로디, 음악을 만드는 방법을 배워보세요.

## 기본 설정

버저는 전역 인스턴스로 사용할 수 있습니다:

```python
from codibit import buzzer
```

## 간단한 음 재생

### 기본 음

특정 주파수로 간단한 음을 재생합니다:

```python
# A4 음을 1초간 재생
buzzer.play_tone(Note.A4, 1000)
```

### 음표 상수 사용

표준 음악 주파수를 위한 미리 정의된 음표 상수를 사용합니다:

```python
from codibit.builtin.buzzer import Note

# C 장음계 재생
buzzer.play_tone(Note.C4, 500)  # 도
buzzer.play_tone(Note.D4, 500)  # 레
buzzer.play_tone(Note.E4, 500)  # 미
buzzer.play_tone(Note.F4, 500)  # 파
buzzer.play_tone(Note.G4, 500)  # 솔
buzzer.play_tone(Note.A4, 500)  # 라
buzzer.play_tone(Note.B4, 500)  # 시
buzzer.play_tone(Note.C5, 500)  # 도 (높은 옥타브)
```

## 미리 정의된 소리 재생

### 실용적인 소리

다양한 목적에 맞는 유용한 소리를 재생합니다:

```python
from codibit.builtin.buzzer import Sound

# 기본 소리들
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
from codibit.builtin.buzzer import Sound

# 기본 드럼킷
buzzer.play_sound(Sound.DRUM_KICK)      # 킥 드럼
buzzer.play_sound(Sound.DRUM_SNARE)     # 스네어 드럼
buzzer.play_sound(Sound.DRUM_HIHAT)     # 하이햇
buzzer.play_sound(Sound.DRUM_CRASH)     # 크래시 심벌

# 추가 드럼들
buzzer.play_sound(Sound.DRUM_TOM1)      # 톰1
buzzer.play_sound(Sound.DRUM_TOM2)      # 톰2
buzzer.play_sound(Sound.DRUM_TOM3)      # 톰3
buzzer.play_sound(Sound.DRUM_FLOOR_TOM) # 플로어 톰

# 심벌들
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

## 멜로디 재생

### 사용자 정의 멜로디

자신만의 멜로디를 만들고 재생합니다:

```python
from codibit.builtin.buzzer import Note

# 간단한 멜로디 만들기 (C 장음계)
melody = [
    (Note.C4, 300),  # 도
    (Note.D4, 300),  # 레
    (Note.E4, 300),  # 미
    (Note.F4, 300),  # 파
    (Note.G4, 300),  # 솔
    (Note.A4, 300),  # 라
    (Note.B4, 300),  # 시
    (Note.C5, 600)   # 도 (높은 옥타브, 긴 음)
]

# 120 BPM 템포로 멜로디 재생
buzzer.play_melody(melody, tempo=120)
```

### 화음 진행

화음 진행을 재생합니다:

```python
from codibit.builtin.buzzer import Note

# C 장조 화음 진행
chord_progression = [
    (Note.C4, 200), (Note.E4, 200), (Note.G4, 400),  # C 장조
    (Note.F4, 200), (Note.A4, 200), (Note.C5, 400),  # F 장조
    (Note.G4, 200), (Note.B4, 200), (Note.D5, 400),  # G 장조
    (Note.C5, 800)  # 마무리 C
]

buzzer.play_melody(chord_progression, tempo=140)
```

## 내장 곡 재생

미리 정의된 곡을 재생합니다:

```python
# 생일 축하합니다
buzzer.play_song(Melody.HAPPY_BIRTHDAY)

# 반짝반짝 작은 별
buzzer.play_song(Melody.TWINKLE_TWINKLE)

# 메리 양의 작은 양
buzzer.play_song(Melody.MARY_HAD_A_LITTLE_LAMB)
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
buzzer.play_tone(Note.A4, 1000)
```

## 소리 정지

현재 재생 중인 소리를 정지합니다:

```python
# 긴 음 시작
buzzer.play_tone(Note.A4, 10000)  # 10초

# 즉시 정지
buzzer.stop()
```

## 완전한 예시

다양한 버저 기능을 보여주는 완전한 예시입니다:

```python
from codibit import buzzer
from codibit.builtin.buzzer import Note, Sound
import time

# 볼륨 테스트
print("볼륨 레벨 테스트 중...")
for volume in range(4):
    buzzer.set_volume(volume)
    buzzer.play_tone(Note.A4, 500)
    time.sleep(0.5)

# 음표 상수 테스트
print("C 장음계 재생 중...")
notes = [Note.C4, Note.D4, Note.E4, Note.F4, Note.G4, Note.A4, Note.B4, Note.C5]
for note in notes:
    buzzer.play_tone(note, 300)
    time.sleep(0.1)

# 실용적인 소리 테스트
print("실용적인 소리 재생 중...")
sounds = [Sound.BEEP, Sound.CHIME, Sound.ALERT, Sound.SUCCESS]
for sound in sounds:
    buzzer.play_sound(sound)
    time.sleep(0.5)

# 드럼 소리 테스트
print("드럼 소리 재생 중...")
drums = [Sound.DRUM_KICK, Sound.DRUM_SNARE, Sound.DRUM_HIHAT, Sound.DRUM_CRASH]
for drum in drums:
    buzzer.play_sound(drum)
    time.sleep(0.3)

# 사용자 정의 멜로디
print("사용자 정의 멜로디 재생 중...")
melody = [(Note.C4, 200), (Note.E4, 200), (Note.G4, 400)]
buzzer.play_melody(melody, tempo=120)

# 내장 곡
print("생일 축하합니다 재생 중...")
buzzer.play_song(Melody.HAPPY_BIRTHDAY)

print("버저 데모 완료!")
```

## 팁

1. **중단**: Ctrl+C로 모든 멜로디나 곡 재생을 중단할 수 있습니다
2. **볼륨 범위**: 볼륨 레벨은 0 (음소거)부터 3 (크게)까지입니다
3. **템포**: 템포는 BPM (분당 비트 수)로 지정됩니다
4. **음표 상수**: 표준 음악 주파수는 Note 클래스 상수를 사용하세요
5. **소리 타입**: 8가지 실용적인 소리와 16가지 드럼 소리를 사용할 수 있습니다