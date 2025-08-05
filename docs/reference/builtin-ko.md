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
3. **상태 추적**: `was_pressed()`, `get_presses()`, `get_press_count()` 메서드는 버튼 이벤트를 자동으로 추적합니다
4. **카운터 관리**: `get_presses()`는 카운터를 리셋하지만, `get_press_count()`는 리셋하지 않습니다

## RGB LED

내장 RGB LED 스트립(3개 LED)을 제어하는 API입니다.

### 전역 인스턴스

```python
rgb_led  # 내장 RGB LED 스트립
```

### 메서드

#### `rgb_led.set_color(strip_id, r, g, b, brightness=255)`

특정 LED 스트립의 색상과 밝기를 설정합니다.

**매개변수:**
- `strip_id` (int): LED 스트립 번호 (0, 1, 2)
- `r` (int): 빨간색 값 (0-255)
- `g` (int): 초록색 값 (0-255)
- `b` (int): 파란색 값 (0-255)
- `brightness` (int): 밝기 (0-255), 기본값 255

**예시:**
```python
# 스트립 0을 빨간색, 스트립 1을 초록색, 스트립 2를 파란색으로 설정
rgb_led.set_color(0, 255, 0, 0)    # 빨간색
rgb_led.set_color(1, 0, 255, 0)    # 초록색
rgb_led.set_color(2, 0, 0, 255)    # 파란색
rgb_led.show()
```

#### `rgb_led.set_all(r, g, b, brightness=255)`

모든 LED 스트립을 같은 색상과 밝기로 설정합니다.

**매개변수:**
- `r` (int): 빨간색 값 (0-255)
- `g` (int): 초록색 값 (0-255)
- `b` (int): 파란색 값 (0-255)
- `brightness` (int): 밝기 (0-255), 기본값 255

**예시:**
```python
# 모든 스트립을 흰색으로 설정
rgb_led.set_all(255, 255, 255)
rgb_led.show()

# 모든 스트립을 빨간색으로 50% 밝기로 설정
rgb_led.set_all(255, 0, 0, 128)
rgb_led.show()
```

#### `rgb_led.set_brightness(strip_id, brightness)`

특정 LED 스트립의 밝기만 설정합니다. 현재 색상은 유지됩니다.

**매개변수:**
- `strip_id` (int): LED 스트립 번호 (0, 1, 2)
- `brightness` (int): 밝기 (0-255)

**예시:**
```python
# 스트립 0을 빨간색으로 설정
rgb_led.set_color(0, 255, 0, 0)
# 밝기를 50%로 설정
rgb_led.set_brightness(0, 128)
rgb_led.show()
```

#### `rgb_led.set_all_brightness(brightness)`

모든 LED 스트립의 밝기를 동일하게 설정합니다. 현재 색상들은 유지됩니다.

**매개변수:**
- `brightness` (int): 밝기 (0-255)

**예시:**
```python
# 각 스트립을 다른 색상으로 설정
rgb_led.set_color(0, 255, 0, 0)    # 빨간색
rgb_led.set_color(1, 0, 255, 0)    # 초록색
rgb_led.set_color(2, 0, 0, 255)    # 파란색
# 모든 스트립을 50% 밝기로 설정
rgb_led.set_all_brightness(128)
rgb_led.show()
```

#### `rgb_led.turn_off(strip_id)`

특정 LED 스트립을 끕니다.

**매개변수:**
- `strip_id` (int): LED 스트립 번호 (0, 1, 2)

**예시:**
```python
# 스트립 1을 끄기
rgb_led.turn_off(1)
rgb_led.show()
```

#### `rgb_led.turn_off_all()`

모든 LED 스트립을 끕니다.

**예시:**
```python
# 모든 스트립을 끄기
rgb_led.turn_off_all()
rgb_led.show()
```

#### `rgb_led.show()`

설정된 색상과 밝기를 실제 LED 하드웨어에 적용합니다.

**매개변수:**
- 없음

**예시:**
```python
# 색상 설정 후 변경사항 적용
rgb_led.set_color(0, 255, 0, 0)  # 빨간색 설정
rgb_led.show()  # 변경사항 적용

# 여러 설정 후 한 번에 적용
rgb_led.set_color(0, 255, 0, 0)    # 빨간색
rgb_led.set_color(1, 0, 255, 0)    # 초록색
rgb_led.set_color(2, 0, 0, 255)    # 파란색
rgb_led.show()  # 모든 변경사항 적용
```

**주의사항:**
- 색상이나 밝기를 변경한 후에는 반드시 `show()`를 호출해야 합니다
- `show()`를 호출하지 않으면 변경사항이 LED에 반영되지 않습니다
- 여러 설정을 한 후 마지막에 한 번만 `show()`를 호출하면 됩니다

### 하드웨어 정보

- **타입**: WS2812B RGB LED 스트립
- **LED 개수**: 3개 LED 직렬 연결
- **핀 할당**: GPIO17
- **전원 공급**: 3.3V
- **데이터 프로토콜**: WS2812B 프로토콜
- **색상 깊이**: 24-bit (색상당 8-bit)
- **밝기 제어**: PWM 기반 밝기 제어

### 주의사항

1. **색상 범위**: 각 색상 구성요소(R, G, B)는 0-255 범위입니다
2. **밝기 제어**: 밝기는 모든 색상 구성요소에 비례적으로 적용됩니다
3. **전력 효율성**: 낮은 밝기는 전력 소모를 줄입니다
4. **업데이트 필요**: 색상 설정 후 `show()`를 호출하여 변경사항을 적용해야 합니다
5. **스트립 번호**: 스트립은 왼쪽부터 0, 1, 2로 번호가 매겨집니다
6. **색상 혼합**: RGB 값들이 혼합되어 다양한 색상을 만듭니다

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

## 디스플레이 (Display)

내장 SH1106 OLED 디스플레이(128x64 픽셀)를 제어하는 API입니다. 버퍼 기반 작동 방식으로, 그리기 명령을 버퍼에 저장한 후 `show()` 함수로 화면에 출력합니다.

### 전역 인스턴스

```python
display = Display()
```

### 기본 제어 메서드

#### `display.clear()`

화면을 지우고 바로 출력에 반영합니다. 모든 픽셀을 0(꺼짐)으로 설정합니다.

**예시:**
```python
display.clear()
display.show()  # 화면에 반영
```

#### `display.clear_buffer()`

버퍼만 지우고 출력은 하지 않습니다. 성능 최적화를 위해 여러 그리기 작업 전에 사용할 수 있습니다.

**예시:**
```python
# 성능 최적화를 위한 사용법
display.clear_buffer()  # 버퍼만 지우기
display.draw_text("Hello", 0, 0)
display.draw_circle(32, 32, 10)
display.show()  # 마지막에 한 번만 출력
```

#### `display.show()`

버퍼의 내용을 화면에 출력합니다. 그리기 작업 후 반드시 호출해야 화면에 표시됩니다.

**예시:**
```python
display.draw_text("Hello", 0, 0)
display.draw_circle(32, 32, 10)
display.show()  # 화면에 출력
```

### 픽셀 제어

#### `display.get_pixel(x, y)`

지정된 좌표의 픽셀 상태를 반환합니다.

**매개변수:**
- `x` (int): X 좌표 (0-127)
- `y` (int): Y 좌표 (0-63)

**반환값:**
- `int`: 픽셀 상태 (0 또는 1)

**예시:**
```python
pixel_state = display.get_pixel(10, 20)
print(f"픽셀 상태: {pixel_state}")
```

#### `display.set_pixel(x, y, val)`

지정된 좌표의 픽셀 상태를 설정합니다.

**매개변수:**
- `x` (int): X 좌표 (0-127)
- `y` (int): Y 좌표 (0-63)
- `val` (int): 픽셀 상태 (0 또는 1)

**예시:**
```python
display.set_pixel(10, 20, 1)  # 픽셀을 켬
display.show()
```

### 그리기 메서드

#### `display.draw_text(text, x, y)`

지정된 위치에 텍스트를 그립니다.

**매개변수:**
- `text` (str): 그릴 텍스트
- `x` (int): X 좌표
- `y` (int): Y 좌표

**예시:**
```python
display.draw_text("Hello", 0, 0)
display.draw_text("World", 0, 10)
display.show()
```

#### `display.draw_rectangle(x, y, w, h, fill=False)`

사각형을 그립니다.

**매개변수:**
- `x` (int): 왼쪽 상단 모서리의 X 좌표
- `y` (int): 왼쪽 상단 모서리의 Y 좌표
- `w` (int): 너비
- `h` (int): 높이
- `fill` (bool): 채우기 여부 (기본값: False)

**예시:**
```python
# 빈 사각형
display.draw_rectangle(10, 10, 20, 15)
# 채워진 사각형
display.draw_rectangle(40, 10, 20, 15, fill=True)
display.show()
```

#### `display.draw_line(x1, y1, x2, y2)`

두 점 사이에 선을 그립니다.

**매개변수:**
- `x1` (int): 시작점의 X 좌표
- `y1` (int): 시작점의 Y 좌표
- `x2` (int): 끝점의 X 좌표
- `y2` (int): 끝점의 Y 좌표

**예시:**
```python
display.draw_line(0, 0, 50, 50)
display.draw_line(0, 50, 50, 0)
display.show()
```

#### `display.draw_circle(x, y, r, fill=False)`

원을 그립니다.

**매개변수:**
- `x` (int): 중심의 X 좌표
- `y` (int): 중심의 Y 좌표
- `r` (int): 반지름
- `fill` (bool): 채우기 여부 (기본값: False)

**예시:**
```python
# 빈 원
display.draw_circle(32, 32, 10)
# 채워진 원
display.draw_circle(64, 32, 8, fill=True)
display.show()
```

#### `display.draw_triangle(x1, y1, x2, y2, x3, y3, fill=False)`

삼각형을 그립니다.

**매개변수:**
- `x1, y1` (int): 첫 번째 꼭지점의 좌표
- `x2, y2` (int): 두 번째 꼭지점의 좌표
- `x3, y3` (int): 세 번째 꼭지점의 좌표
- `fill` (bool): 채우기 여부 (기본값: False)

**예시:**
```python
# 빈 삼각형
display.draw_triangle(10, 10, 20, 40, 40, 40)
# 채워진 삼각형
display.draw_triangle(50, 10, 60, 40, 80, 40, fill=True)
display.show()
```

### 이미지 및 아이콘

#### `display.draw_image(image, x, y)`

지정된 위치에 이미지를 그립니다.

**매개변수:**
- `image`: Image 객체
- `x` (int): 시작 X 좌표
- `y` (int): 시작 Y 좌표

**예시:**
```python
from codibit import Image

# 내장 아이콘 그리기
display.draw_image(Image.HEART, 0, 0)
display.draw_image(Image.HAPPY, 20, 0)
display.show()
```

#### `display.draw_icon(icon_name, x=0, y=0, scale=1)`

지정된 위치에 내장 아이콘을 그립니다.

**매개변수:**
- `icon_name` (str): 아이콘 이름 (예: 'HEART', 'HAPPY', 'SAD')
- `x` (int): X 좌표 (기본값: 0)
- `y` (int): Y 좌표 (기본값: 0)
- `scale` (int): 스케일 크기 (1=5x5, 2=10x10, 3=15x15)

**예시:**
```python
# 기본 크기로 하트 그리기
display.draw_icon('HEART', 0, 0)
# 2배 크기로 웃는 얼굴 그리기
display.draw_icon('HAPPY', 20, 0, scale=2)
display.show()
```

### 하드웨어 정보

- **디스플레이**: SH1106 OLED
- **해상도**: 128x64 픽셀
- **색상**: 단색 (흰색/검은색)
- **인터페이스**: I2C
- **주소**: 0x3C
- **회전**: 180도 (화면이 올바른 방향으로 표시)
- **전원 공급**: 3.3V
- **물리적 위치**: 보드 앞면

### 작동 방식

1. **버퍼 기반**: 모든 그리기 명령은 내부 버퍼에 저장됩니다
2. **지연 출력**: `show()` 함수를 호출해야 화면에 출력됩니다
3. **성능 최적화**: 여러 그리기 작업을 한 번에 처리한 후 출력 가능
4. **메모리 효율**: 버퍼 사용으로 메모리 사용량 최적화

### 사용 패턴

```python
# 1. 화면 지우기
display.clear()

# 2. 여러 그리기 작업 수행
display.draw_text("Hello", 0, 0)
display.draw_circle(32, 32, 10)
display.draw_rectangle(10, 10, 20, 15)

# 3. 화면에 출력
display.show()
```

### 주의사항

1. **픽셀 좌표**: 원점 (0,0)은 왼쪽 상단 모서리입니다
2. **픽셀 값**: 0(꺼짐) 또는 1(켜짐)만 지원합니다
3. **버퍼 출력**: 그리기 작업 후 반드시 `show()`를 호출해야 화면에 표시됩니다
4. **내장 아이콘**: 64가지 다양한 아이콘을 사용할 수 있습니다 (Image 섹션 참조)
5. **스케일링**: 아이콘은 더 나은 가시성을 위해 표시할 때 확대할 수 있습니다
6. **성능**: 여러 그리기 작업을 한 번에 처리한 후 `show()`를 호출하는 것이 효율적입니다
7. **버퍼 제어**: `clear()`는 즉시 출력하지만, `clear_buffer()`는 버퍼만 지워서 성능 최적화에 유용합니다

## 이미지 (Image)

디스플레이용 이미지를 생성하고 조작하는 API입니다.

### 전역 인스턴스

```python
from codibit import Image
```

### 이미지 생성

#### `Image(width, height)`

지정된 크기의 빈 이미지를 생성합니다.

**매개변수:**
- `width` (int): 이미지 너비
- `height` (int): 이미지 높이

**예시:**
```python
img = Image(5, 5)  # 5x5 빈 이미지 생성
```

#### `Image(string)`

문자열 표현에서 이미지를 생성합니다.

**매개변수:**
- `string` (str): "행1:행2:행3:..." 형식의 이미지 문자열

**예시:**
```python
heart = Image('09090:99999:99999:09990:00900:')
```

### 메서드

#### `image.set_pixel(x, y, value)`

이미지의 픽셀 밝기를 설정합니다.

**매개변수:**
- `x` (int): X 좌표
- `y` (int): Y 좌표
- `value` (int): 밝기 값 (0-9)

**예시:**
```python
img = Image(5, 5)
img.set_pixel(2, 2, 9)  # 중앙 픽셀을 최대 밝기로 설정
```

#### `image.get_pixel(x, y)`

이미지의 픽셀 밝기를 반환합니다.

**매개변수:**
- `x` (int): X 좌표
- `y` (int): Y 좌표

**반환값:**
- `int`: 픽셀 밝기 (0-9)

**예시:**
```python
brightness = img.get_pixel(2, 2)
```

#### `image.width()`

이미지의 너비를 반환합니다.

**반환값:**
- `int`: 이미지 너비

**예시:**
```python
width = img.width()
```

#### `image.height()`

이미지의 높이를 반환합니다.

**반환값:**
- `int`: 이미지 높이

**예시:**
```python
height = img.height()
```

#### `image.shift_left(n)`

이미지를 왼쪽으로 n픽셀 이동시킵니다.

**매개변수:**
- `n` (int): 이동할 픽셀 수

**반환값:**
- `Image`: 새로 이동된 이미지

**예시:**
```python
shifted = img.shift_left(1)
```

#### `image.shift_right(n)`

이미지를 오른쪽으로 n픽셀 이동시킵니다.

**매개변수:**
- `n` (int): 이동할 픽셀 수

**반환값:**
- `Image`: 새로 이동된 이미지

**예시:**
```python
shifted = img.shift_right(1)
```

#### `image.shift_up(n)`

이미지를 위로 n픽셀 이동시킵니다.

**매개변수:**
- `n` (int): 이동할 픽셀 수

**반환값:**
- `Image`: 새로 이동된 이미지

**예시:**
```python
shifted = img.shift_up(1)
```

#### `image.shift_down(n)`

이미지를 아래로 n픽셀 이동시킵니다.

**매개변수:**
- `n` (int): 이동할 픽셀 수

**반환값:**
- `Image`: 새로 이동된 이미지

**예시:**
```python
shifted = img.shift_down(1)
```

import ImagePreview from '@site/src/components/ImagePreview';
import { IMAGE_STRINGS } from '@site/src/constants/imageStrings';

### 내장 이미지

Image 클래스는 디스플레이에서 사용할 수 있는 64개의 내장 이미지를 제공합니다.

#### 기본 아이콘

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.HEART` | <ImagePreview imageString={IMAGE_STRINGS.HEART} /> | `Image.HEART_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.HEART_SMALL} /> | `Image.HAPPY` | <ImagePreview imageString={IMAGE_STRINGS.HAPPY} /> |
| `Image.STAR` | <ImagePreview imageString={IMAGE_STRINGS.STAR} /> | `Image.SAD` | <ImagePreview imageString={IMAGE_STRINGS.SAD} /> | `Image.CONFUSED` | <ImagePreview imageString={IMAGE_STRINGS.CONFUSED} /> |
| `Image.ANGRY` | <ImagePreview imageString={IMAGE_STRINGS.ANGRY} /> | `Image.ASLEEP` | <ImagePreview imageString={IMAGE_STRINGS.ASLEEP} /> | `Image.SURPRISED` | <ImagePreview imageString={IMAGE_STRINGS.SURPRISED} /> |
| `Image.SILLY` | <ImagePreview imageString={IMAGE_STRINGS.SILLY} /> | `Image.FABULOUS` | <ImagePreview imageString={IMAGE_STRINGS.FABULOUS} /> | `Image.MEH` | <ImagePreview imageString={IMAGE_STRINGS.MEH} /> |
| `Image.O` | <ImagePreview imageString={IMAGE_STRINGS.O} /> | `Image.X` | <ImagePreview imageString={IMAGE_STRINGS.X} /> | | |

#### 기하학적 도형

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.TRIANGLE` | <ImagePreview imageString={IMAGE_STRINGS.TRIANGLE} /> | `Image.TRIANGLE_LEFT` | <ImagePreview imageString={IMAGE_STRINGS.TRIANGLE_LEFT} /> | `Image.CHESSBOARD` | <ImagePreview imageString={IMAGE_STRINGS.CHESSBOARD} /> |
| `Image.DIAMOND` | <ImagePreview imageString={IMAGE_STRINGS.DIAMOND} /> | `Image.DIAMOND_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.DIAMOND_SMALL} /> | `Image.SQUARE` | <ImagePreview imageString={IMAGE_STRINGS.SQUARE} /> |
| `Image.SQUARE_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.SQUARE_SMALL} /> | | | | |

#### 동물

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.RABBIT` | <ImagePreview imageString={IMAGE_STRINGS.RABBIT} /> | `Image.COW` | <ImagePreview imageString={IMAGE_STRINGS.COW} /> | `Image.DUCK` | <ImagePreview imageString={IMAGE_STRINGS.DUCK} /> |
| `Image.TORTOISE` | <ImagePreview imageString={IMAGE_STRINGS.TORTOISE} /> | `Image.BUTTERFLY` | <ImagePreview imageString={IMAGE_STRINGS.BUTTERFLY} /> | `Image.STICKFIGURE` | <ImagePreview imageString={IMAGE_STRINGS.STICKFIGURE} /> |
| `Image.GHOST` | <ImagePreview imageString={IMAGE_STRINGS.GHOST} /> | `Image.GIRAFFE` | <ImagePreview imageString={IMAGE_STRINGS.GIRAFFE} /> | `Image.SKULL` | <ImagePreview imageString={IMAGE_STRINGS.SKULL} /> |
| `Image.UMBRELLA` | <ImagePreview imageString={IMAGE_STRINGS.UMBRELLA} /> | `Image.SNAKE` | <ImagePreview imageString={IMAGE_STRINGS.SNAKE} /> | `Image.SCISSORS` | <ImagePreview imageString={IMAGE_STRINGS.SCISSORS} /> |

#### 음악

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.MUSIC_CROTCHET` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_CROTCHET} /> | `Image.MUSIC_QUAVER` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_QUAVER} /> | `Image.MUSIC_QUAVERS` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_QUAVERS} /> |
| `Image.PITCHFORK` | <ImagePreview imageString={IMAGE_STRINGS.PITCHFORK} /> | | | | |

#### 기타

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.XMAS` | <ImagePreview imageString={IMAGE_STRINGS.XMAS} /> | `Image.PACMAN` | <ImagePreview imageString={IMAGE_STRINGS.PACMAN} /> | `Image.TARGET` | <ImagePreview imageString={IMAGE_STRINGS.TARGET} /> |
| `Image.TSHIRT` | <ImagePreview imageString={IMAGE_STRINGS.TSHIRT} /> | `Image.ROLLERSKATE` | <ImagePreview imageString={IMAGE_STRINGS.ROLLERSKATE} /> | `Image.HOUSE` | <ImagePreview imageString={IMAGE_STRINGS.HOUSE} /> |

#### 시계 얼굴
- `Image.CLOCK1`부터 `Image.CLOCK12`까지 - 다양한 시간의 시계 얼굴

#### 화살표

| 아이콘 | 미리보기 | 아이콘 | 미리보기 | 아이콘 | 미리보기 |
|--------|----------|--------|----------|--------|----------|
| `Image.ARROW_N` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_N} /> | `Image.ARROW_NE` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_NE} /> | `Image.ARROW_E` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_E} /> |
| `Image.ARROW_SE` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_SE} /> | `Image.ARROW_S` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_S} /> | `Image.ARROW_SW` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_SW} /> |
| `Image.ARROW_W` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_W} /> | `Image.ARROW_NW` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_NW} /> | | |

### 이미지 연산

#### 덧셈 (`+`)

두 이미지를 각 픽셀에서 최대 밝기를 취하여 결합합니다.

**예시:**
```python
combined = Image.HEART + Image.HAPPY
```

#### 곱셈 (`*`)

이미지의 밝기를 조정합니다.

**예시:**
```python
brighter = Image.HEART * 2  # 밝기를 2배로
```

### 디스플레이와 함께 사용

이미지는 디스플레이와 원활하게 작동하도록 설계되었습니다:

**예시:**
```python
from codibit import display, Image

# 내장 아이콘 그리기
display.draw_image(Image.HEART, 0, 0)
display.draw_image(Image.HAPPY, 20, 0)
display.show()

# 사용자 정의 이미지 생성 및 그리기
custom = Image('90009:09090:00900:09090:90009:')
display.draw_image(custom, 0, 20)
display.show()

# 아이콘 스케일링
display.draw_icon('HAPPY', 0, 0, scale=2)
display.draw_icon('SAD', 40, 0, scale=3)
display.show()
```

### 주의사항

1. **문자열 형식**: 이미지는 ':'로 행을 구분하는 문자열에서 생성할 수 있습니다
2. **밝기 스케일**: 0-9 스케일 (0=꺼짐, 9=최대 밝기)
3. **내장 아이콘**: 즉시 사용할 수 있는 64가지 다양한 아이콘
4. **호환성**: API는 Image 인터페이스와 호환됩니다
5. **디스플레이 통합**: 이미지는 `draw_image()` 메서드로 디스플레이에 그릴 수 있습니다
6. **스케일링**: 아이콘은 `draw_icon()` 메서드로 더 나은 가시성을 위해 확대할 수 있습니다
7. **버퍼 기반**: 이미지 그리기도 버퍼 기반으로 작동하므로 `show()` 호출이 필요합니다