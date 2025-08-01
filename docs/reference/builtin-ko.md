# Built-in Sensors(내장 센서)

Codi:bit 보드의 내장 센서들을 제어하는 API입니다.

## 버튼 (Buttons)

Codi:bit 보드의 내장 버튼을 제어하는 API입니다.

### 전역 인스턴스

```python
button_a  # 버튼 A (GPIO0)
button_b  # 버튼 B (GPIO2)
```

### 메서드

#### `button.is_pressed()`

버튼이 현재 눌려있는지 확인합니다.

**반환값:**
- `bool`: 버튼이 현재 눌려있으면 `True`, 그렇지 않으면 `False`

**예시:**
```python
if button_a.is_pressed():
    print("버튼 A가 눌려있습니다")
```

#### `button.was_pressed()`

마지막 호출 이후 또는 장치 시작 이후 버튼이 눌렸는지 확인합니다.

**반환값:**
- `bool`: 버튼이 눌렸으면 `True`, 그렇지 않으면 `False`

**예시:**
```python
if button_a.was_pressed():
    print("버튼 A가 눌렸습니다")
```

#### `button.get_presses()`

마지막 호출 이후 또는 장치 시작 이후의 총 버튼 눌림 횟수를 반환하고 카운터를 0으로 리셋합니다.

**반환값:**
- `int`: 버튼 눌림 횟수

**예시:**
```python
presses = button_a.get_presses()
print(f"버튼 A가 {presses}번 눌렸습니다")
```

#### `button.get_press_count()`

현재까지 누적된 총 버튼 눌림 횟수를 반환합니다. 카운터는 리셋되지 않습니다.

**반환값:**
- `int`: 누적된 버튼 눌림 횟수

**예시:**
```python
total_presses = button_a.get_press_count()
print(f"버튼 A가 총 {total_presses}번 눌렸습니다")
```

### 메서드 비교

| 메서드 | 기능 | 카운터 리셋 | 사용 시나리오 |
|--------|------|-------------|---------------|
| `is_pressed()` | 현재 눌림 상태 확인 | - | 연속적인 동작 (버튼을 계속 누르고 있을 때) |
| `was_pressed()` | 이벤트 감지 | - | 단일 이벤트 (메뉴 선택) |
| `get_presses()` | 누름 횟수 반환 후 리셋 | ✅ | 주기적인 카운팅 (5초마다 누름 횟수 확인) |
| `get_press_count()` | 누적 누름 횟수 확인 | ❌ | 실시간 누적 카운팅 (총 누름 횟수 추적) |

### 하드웨어 정보

- **타입**: 택틸 푸시 버튼
- **풀업 저항**: 10KΩ (하드웨어)
- **활성 상태**: LOW (눌림 = 0V, 뗌 = 3.3V)
- **디바운스 시간**: 50ms (소프트웨어)
- **핀 할당**: 버튼 A (GPIO0), 버튼 B (GPIO2)
- **물리적 위치**: 보드 앞면, A와 B로 라벨 표시

### 주의사항

1. **디바운싱**: 하드웨어 버튼 바운싱은 50ms 디바운스 시간으로 자동 처리됩니다
2. **풀업**: 내장 10KΩ 풀업 저항으로 눌리지 않았을 때 안정적인 HIGH 상태를 보장합니다
3. **호환성**: micro:bit 버튼 인터페이스와 호환됩니다
4. **상태 추적**: `was_pressed()`, `get_presses()`, `get_press_count()` 메서드는 버튼 이벤트를 자동으로 추적합니다
5. **카운터 관리**: `get_presses()`는 카운터를 리셋하지만, `get_press_count()`는 리셋하지 않습니다

## 버저 (Buzzer)

Codi:bit 보드의 내장 버저를 제어하는 API입니다.

### 전역 인스턴스

```python
buzzer  # 내장 버저 (GPIO16)
```

### 음표 표기법

음표는 `NOTE[octave][:duration]` 형식으로 표현됩니다.

**음표 형식:**
```python
'c4:4'    # C4 음을 4틱 동안
'g'        # G4 음을 기본 지속시간(4틱) 동안
'r:2'      # 2틱 동안 쉼표
'eb:8'     # E♭4 음을 8틱 동안
'f#5:1'    # F#5 음을 1틱 동안
```

**지원하는 음표:**
- 기본 음표: `c`, `d`, `e`, `f`, `g`, `a`, `b`
- 플랫: `cb`, `db`, `eb`, `fb`, `gb`, `ab`, `bb`
- 샵: `c#`, `d#`, `e#`, `f#`, `g#`, `a#`, `b#`
- 옥타브: 3, 4(기본), 5
- 쉼표: `r` (rest)

**템포 시스템:**
- 기본값: 4틱, 120 BPM
- 1틱 = 60000 / BPM / ticks_per_beat 밀리초
- 기본값으로 1틱 = 125ms, 1박자 = 500ms

#### `Sound`

실용적인 소리와 드럼 소리 타입 상수들입니다.

**실용적인 소리들:**
```python
Sound.BEEP = "beep"           # 기본 비프음
Sound.CHIME = "chime"         # 차임벨
Sound.ALERT = "alert"         # 경고음
Sound.NOTIFICATION = "notification"  # 알림음
Sound.SUCCESS = "success"      # 성공음
Sound.ERROR = "error"          # 오류음
Sound.CLICK = "click"         # 클릭음
Sound.TICK = "tick"           # 틱음
```

**드럼 소리들 (16가지):**
```python
Sound.DRUM_KICK = "drum_kick"         # 킥 드럼
Sound.DRUM_SNARE = "drum_snare"       # 스네어 드럼
Sound.DRUM_HIHAT = "drum_hihat"       # 하이햇
Sound.DRUM_TOM1 = "drum_tom1"         # 톰1
Sound.DRUM_TOM2 = "drum_tom2"         # 톰2
Sound.DRUM_TOM3 = "drum_tom3"         # 톰3
Sound.DRUM_FLOOR_TOM = "drum_floor_tom"  # 플로어 톰
Sound.DRUM_CRASH = "drum_crash"       # 크래시 심벌
Sound.DRUM_RIDE = "drum_ride"         # 라이드 심벌
Sound.DRUM_HIHAT_OPEN = "drum_hihat_open"  # 오픈 하이햇
Sound.DRUM_HIHAT_CLOSED = "drum_hihat_closed"  # 클로즈드 하이햇
Sound.DRUM_CHINA = "drum_china"       # 차이나 심벌
Sound.DRUM_SPLASH = "drum_splash"     # 스플래시 심벌
Sound.DRUM_COWBELL = "drum_cowbell"   # 카우벨
Sound.DRUM_CLAP = "drum_clap"         # 클랩
Sound.DRUM_SHAKER = "drum_shaker"     # 쉐이커
```

#### `Melody`

내장 멜로디 정의들입니다.

```python
Melody.HAPPY_BIRTHDAY  # 생일 축하합니다
Melody.TWINKLE_TWINKLE # 반짝반짝 작은 별
Melody.MARY_HAD_A_LITTLE_LAMB  # 메리 양의 작은 양
```

### 메서드

#### `buzzer.play_tone(frequency, duration_ms=1000, auto_stop=True)`

지정된 주파수로 음을 재생합니다.

**매개변수:**
- `frequency` (int): 주파수 (Hz)
- `duration_ms` (int): 재생 시간 (밀리초, 기본값: 1000)
- `auto_stop` (bool): 재생 완료 후 자동 정지 여부 (기본값: True)

**예시:**
```python
buzzer.play_tone(440, 1000)      # 440Hz를 1초간 재생
buzzer.play_tone(262, 500)       # C4 음을 0.5초간 재생
```

#### `buzzer.play_melody(melody, tempo=None)`

지정된 템포로 멜로디를 재생합니다.

**매개변수:**
- `melody` (list): 음표 문자열들의 리스트 (예: `['c4:4', 'd4:4', 'e4:8']`)
- `tempo` (int): 템포 (BPM, 분당 비트 수), None이면 기본값 사용

**예시:**
```python
# 도레미파솔라시도
melody = ['c4:4', 'd4:4', 'e4:4', 'f4:4', 'g4:4', 'a4:4', 'b4:4', 'c5:8']
buzzer.play_melody(melody, tempo=120)

# 베토벤 5번 교향곡 시작
melody = ['r4:2', 'g', 'g', 'g', 'eb:8', 'r:2', 'f', 'f', 'f', 'd:8']
buzzer.play_melody(melody)
```

#### `buzzer.play_song(song_name)`

내장 곡을 재생합니다.

**매개변수:**
- `song_name` (str): 곡 이름 문자열

**사용 가능한 곡들:**
- `'happy_birthday'`: 생일 축하합니다
- `'twinkle'`: 반짝반짝 작은 별
- `'mary'`: 메리 양의 작은 양

**예시:**
```python
buzzer.play_song('happy_birthday')
buzzer.play_song('twinkle')
```

#### `buzzer.play_sound(sound_type)`

미리 정의된 소리를 재생합니다.

**매개변수:**
- `sound_type` (str | Sound): Sound 클래스 상수 중 하나

**예시:**
```python
buzzer.play_sound(Sound.BEEP)
buzzer.play_sound(Sound.DRUM_KICK)
```

#### `buzzer.stop()`

현재 재생 중인 소리를 정지합니다.

**예시:**
```python
buzzer.play_tone(440, 5000)  # 5초간 재생
buzzer.stop()  # 즉시 정지
```

#### `buzzer.set_tempo(ticks=4, bpm=120)`

템포를 설정합니다.

**매개변수:**
- `ticks` (int): 박자당 틱 수 (기본값: 4)
- `bpm` (int): 분당 박자 수 (기본값: 120)

**예시:**
```python
buzzer.set_tempo(bpm=180)  # 빠른 템포로 설정
buzzer.play_melody(['c4:4', 'd4:4', 'e4:4', 'f4:4', 'g4:8'])
```

#### `buzzer.get_tempo()`

현재 템포를 반환합니다.

**반환값:**
- `tuple`: (ticks, bpm)

**예시:**
```python
ticks, bpm = buzzer.get_tempo()
print(f"현재 템포: {bpm} BPM, {ticks}틱")
```

#### `buzzer.set_volume(volume)`

버저 볼륨을 설정합니다.

**매개변수:**
- `volume` (int): 볼륨 레벨 (0-3)
  - `0`: 음소거
  - `1`: 작게
  - `2`: 중간 (기본값)
  - `3`: 크게

**예시:**
```python
buzzer.set_volume(3)  # 크게로 설정
buzzer.play_tone(440, 1000)
```

### 하드웨어 정보

- **타입**: 압전 버저
- **핀 할당**: GPIO16
- **PWM 주파수 범위**: 20Hz - 20kHz
- **볼륨 제어**: PWM 듀티 사이클 (0-900)
- **전원 공급**: 3.3V
- **물리적 위치**: 보드 앞면

### 주의사항

1. **볼륨 제어**: 볼륨은 PWM 듀티 사이클로 제어되며, 최대 듀티 사이클은 900입니다
2. **중단 가능**: 모든 멜로디와 곡 재생은 Ctrl+C로 중단할 수 있습니다
3. **템포 제어**: 템포는 BPM (분당 비트 수)로 지정됩니다
4. **음표 표기법**: 음표는 `NOTE[octave][:duration]` 형식을 사용하세요
5. **소리 타입**: 8가지 실용적인 소리와 16가지 드럼 소리를 사용할 수 있습니다
6. **드럼 사운드**: 16가지 다양한 드럼 소리를 제공합니다
7. **틱 시스템**: 음악의 기본 시간 단위는 틱이며, 템포에 따라 길이가 결정됩니다

## 마이크 (Microphone)

내장 마이크 센서를 제어하는 API입니다.

### 전역 인스턴스

```python
mic = Microphone()
```

### 메서드

#### `mic.read()`

마이크 센서의 원시 ADC 값을 반환합니다.

**반환값:**
- `int`: 원시 ADC 값 (0-4095)

**예시:**
```python
value = mic.read()
print(f"원시 값: {value}")
```

#### `mic.get_level()`

정규화된 소리 레벨을 반환합니다.

**반환값:**
- `int`: 0부터 9까지의 소리 레벨, 여기서:
  - 0: 매우 조용함
  - 1-2: 조용함
  - 3-4: 보통
  - 5-6: 시끄러움
  - 7-8: 매우 시끄러움
  - 9: 극도로 시끄러움

**예시:**
```python
level = mic.get_level()
print(f"소리 레벨: {level}")
```

#### `mic.is_sound_detected()`

소리가 감지되는지 확인합니다.

**반환값:**
- `bool`: 소리가 감지되면 `True`, 그렇지 않으면 `False`

**예시:**
```python
if mic.is_sound_detected():
    print("소리가 감지되었습니다!")
```

#### `mic.is_loud()`

소리 레벨이 큰지 확인합니다.

**반환값:**
- `bool`: 소리 레벨이 7 이상이면 `True`, 그렇지 않으면 `False`

**예시:**
```python
if mic.is_loud():
    print("너무 시끄럽습니다!")
```

#### `mic.is_quiet()`

소리 레벨이 조용한지 확인합니다.

**반환값:**
- `bool`: 소리 레벨이 2 이하면 `True`, 그렇지 않으면 `False`

**예시:**
```python
if mic.is_quiet():
    print("매우 조용합니다.")
```

### 하드웨어 정보

- **센서**: 내장 마이크 센서
- **측정 범위**: 0-4095 (12-bit ADC)
- **레벨 변환**: 0-4095 → 0-9 (10단계)
- **자동 보정**: 주변 소음에 자동으로 보정
- **응답 시간**: < 1ms

### 주의사항

1. **자동 보정**: 센서는 주변 환경에 자동으로 보정됩니다
2. **소리 감지**: 소리 레벨의 갑작스러운 변화에 가장 민감합니다
3. **임계값**: 시끄러운 소리는 보통 레벨 7 이상으로 기록됩니다
4. **환경**: 상대적으로 조용한 환경에서 가장 잘 작동합니다

## 주변광 센서 (Light Sensor)

주변광 센서(ALS-PT19)를 제어하는 API입니다.

### 전역 인스턴스

```python
light = Light()
```

### 메서드

#### `light.read()`

조도 센서의 원시 값을 읽습니다.

**반환값:**
- `int`: 조도 값 (0-4095)

**예시:**
```python
value = light.read()
```

#### `light.read_level()`

조도 레벨을 읽습니다.

**반환값:**
- `int`: 조도 레벨 (0-9)

**레벨:**
- 0: 매우 어두움
- 1-2: 어두움
- 3-6: 보통
- 7-8: 밝음
- 9: 매우 밝음

**예시:**
```python
level = light.read_level()
```

### 하드웨어 정보

- **센서**: ALS-PT19 주변광 센서
- **측정 범위**: 0-4095 (12-bit ADC)
- **레벨 변환**: 0-4095 → 0-9 (10단계)
- **응답 시간**: < 1ms
- **전력 소모**: 매우 낮음

### 주의사항

1. **환경 영향**: 주변 조명에 따라 값이 달라질 수 있습니다
2. **반사**: 센서 주변의 반사 물체가 측정에 영향을 줄 수 있습니다
3. **온도**: 극한 온도에서는 정확도가 떨어질 수 있습니다
4. **초기화**: 센서는 보드 전원 공급 시 자동으로 초기화됩니다