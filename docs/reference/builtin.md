# Built-in Sensors

API for controlling built-in sensors on the Codi:bit board.

## Buttons

API for controlling the built-in buttons on the Codi:bit board.

### Global Instances

```python
button_a  # Button A (GPIO0)
button_b  # Button B (GPIO2)
```

### Methods

#### `button.is_pressed()`

Returns whether the button is currently being pressed.

**Returns:**
- `bool`: `True` if the button is currently pressed, `False` otherwise

**Example:**
```python
if button_a.is_pressed():
    print("Button A is pressed")
```

#### `button.was_pressed()`

Returns whether the button was pressed since the last call to this method or since the device started.

**Returns:**
- `bool`: `True` if the button was pressed, `False` otherwise

**Example:**
```python
if button_a.was_pressed():
    print("Button A was pressed")
```

#### `button.get_presses()`

Returns the total number of button presses since the last call to this method or since the device started, and resets the counter to zero.

**Returns:**
- `int`: Number of button presses

**Example:**
```python
presses = button_a.get_presses()
print(f"Button A was pressed {presses} times")
```

#### `button.get_press_count()`

Returns the total accumulated number of button presses without resetting the counter.

**Returns:**
- `int`: Total accumulated number of button presses

**Example:**
```python
total_presses = button_a.get_press_count()
print(f"Button A was pressed {total_presses} times total")
```

### Method Comparison

| Method | Function | Counter Reset | Use Case |
|--------|----------|---------------|----------|
| `is_pressed()` | Check current press state | - | Continuous actions (holding button) |
| `was_pressed()` | Event detection | - | Single events (menu selection) |
| `get_presses()` | Return press count and reset | ✅ | Periodic counting (check every 5 seconds) |
| `get_press_count()` | Check accumulated press count | ❌ | Real-time cumulative counting (total press tracking) |

### Hardware Information

- **Type**: Tactile push buttons
- **Pull-up Resistor**: 10KΩ (Hardware)
- **Active State**: LOW (pressed = 0V, released = 3.3V)
- **Debounce Time**: 50ms (Software)
- **Pin Assignment**: Button A (GPIO0), Button B (GPIO2)
- **Physical Location**: Front side of the board, labeled A and B

### Notes

1. **Debouncing**: Hardware button bouncing is handled automatically with 50ms debounce time
2. **Pull-up**: Built-in 10KΩ pull-up resistors ensure stable HIGH state when not pressed
3. **Compatibility**: API is compatible with micro:bit button interface
4. **State Tracking**: `was_pressed()`, `get_presses()`, and `get_press_count()` methods automatically track button events
5. **Counter Management**: `get_presses()` resets the counter, while `get_press_count()` does not

## Buzzer

API for controlling the built-in buzzer on the Codi:bit board.

### Global Instance

```python
buzzer  # Built-in buzzer (GPIO16)
```

### Classes

#### `Note`

Musical note frequency constants.

```python
# Octave 3
Note.C3 = 131
Note.D3 = 147
Note.E3 = 165
Note.F3 = 175
Note.G3 = 196
Note.A3 = 220
Note.B3 = 247

# Octave 4 (Standard)
Note.C4 = 262
Note.D4 = 294
Note.E4 = 330
Note.F4 = 349
Note.G4 = 392
Note.A4 = 440
Note.B4 = 494

# Octave 5
Note.C5 = 523
Note.D5 = 587
Note.E5 = 659
Note.F5 = 698
Note.G5 = 784
Note.A5 = 880
Note.B5 = 988
Note.C6 = 1047
```

#### `Sound`

Sound type constants for practical sounds and drum sounds.

**Practical Sounds:**
```python
Sound.BEEP = "beep"           # Basic beep
Sound.CHIME = "chime"         # Chime bell
Sound.ALERT = "alert"         # Warning sound
Sound.NOTIFICATION = "notification"  # Notification sound
Sound.SUCCESS = "success"      # Success sound
Sound.ERROR = "error"          # Error sound
Sound.CLICK = "click"         # Click sound
Sound.TICK = "tick"           # Tick sound
```

**Drum Sounds (16 types):**
```python
Sound.DRUM_KICK = "drum_kick"         # Kick drum
Sound.DRUM_SNARE = "drum_snare"       # Snare drum
Sound.DRUM_HIHAT = "drum_hihat"       # Hi-hat
Sound.DRUM_TOM1 = "drum_tom1"         # Tom 1
Sound.DRUM_TOM2 = "drum_tom2"         # Tom 2
Sound.DRUM_CRASH = "drum_crash"       # Crash cymbal
Sound.DRUM_RIDE = "drum_ride"         # Ride cymbal
Sound.DRUM_COWBELL = "drum_cowbell"   # Cowbell
Sound.DRUM_TOM3 = "drum_tom3"         # Tom 3
Sound.DRUM_FLOOR_TOM = "drum_floor_tom"  # Floor tom
Sound.DRUM_HIHAT_OPEN = "drum_hihat_open"  # Open hi-hat
Sound.DRUM_HIHAT_CLOSED = "drum_hihat_closed"  # Closed hi-hat
Sound.DRUM_CHINA = "drum_china"       # China cymbal
Sound.DRUM_SPLASH = "drum_splash"     # Splash cymbal
Sound.DRUM_CLAP = "drum_clap"         # Clap
Sound.DRUM_SHAKER = "drum_shaker"     # Shaker
```

#### `Melody`

Built-in melody definitions.

```python
Melody.HAPPY_BIRTHDAY  # Happy Birthday song
Melody.TWINKLE_TWINKLE # Twinkle Twinkle Little Star
Melody.MARY_HAD_A_LITTLE_LAMB  # Mary Had a Little Lamb
```

### Methods

#### `buzzer.play_tone(frequency, duration_ms=1000, auto_stop=True)`

Plays a tone with the specified frequency.

**Parameters:**
- `frequency` (int | Note): Frequency in Hz or Note constant
- `duration_ms` (int): Duration in milliseconds (default: 1000)
- `auto_stop` (bool): Whether to stop automatically after playing (default: True)

**Example:**
```python
buzzer.play_tone(Note.A4, 1000)  # Play A4 for 1 second
buzzer.play_tone(440, 1000)      # Play 440Hz for 1 second
```

#### `buzzer.play_melody(melody, tempo=None)`

Plays a melody with the specified tempo.

**Parameters:**
- `melody` (list): List of tuples `(frequency | Note, duration)` representing notes
- `tempo` (int): Tempo in BPM (Beats Per Minute), uses default if None

**Example:**
```python
melody = [(Note.C4, 300), (Note.D4, 300), (Note.E4, 300)]
buzzer.play_melody(melody, tempo=120)
```

#### `buzzer.play_song(song_name)`

Plays a built-in song.

**Parameters:**
- `song_name` (str | Melody): Song name string or Melody constant

**Available Songs:**
- `Melody.HAPPY_BIRTHDAY`: Happy Birthday
- `Melody.TWINKLE_TWINKLE`: Twinkle Twinkle Little Star
- `Melody.MARY_HAD_A_LITTLE_LAMB`: Mary Had a Little Lamb

**Example:**
```python
buzzer.play_song(Melody.HAPPY_BIRTHDAY)
```

#### `buzzer.play_sound(sound_type)`

Plays a predefined sound.

**Parameters:**
- `sound_type` (str | Sound): Sound type from Sound class constants

**Example:**
```python
buzzer.play_sound(Sound.BEEP)
buzzer.play_sound(Sound.DRUM_KICK)
```

#### `buzzer.stop()`

Stops the current sound.

**Example:**
```python
buzzer.play_tone(440, 5000)  # Play for 5 seconds
buzzer.stop()  # Stop immediately
```

#### `buzzer.set_volume(volume)`

Sets the buzzer volume.

**Parameters:**
- `volume` (int): Volume level (0-3)
  - `0`: Mute
  - `1`: Low
  - `2`: Medium (default)
  - `3`: High

**Example:**
```python
buzzer.set_volume(3)  # Set to high volume
buzzer.play_tone(440, 1000)
```

### Hardware Information

- **Type**: Piezoelectric buzzer
- **Pin Assignment**: GPIO16
- **PWM Frequency Range**: 20Hz - 20kHz
- **Volume Control**: PWM duty cycle (0-900)
- **Power Supply**: 3.3V
- **Physical Location**: Front side of the board

### Notes

1. **Volume Control**: Volume is controlled by PWM duty cycle, with maximum duty cycle of 900
2. **Interruptible**: All melody and song playback can be interrupted with Ctrl+C
3. **Tempo Control**: Tempo is specified in BPM (Beats Per Minute)
4. **Note Constants**: Use Note class constants for standard musical frequencies
5. **Sound Types**: 8 practical sounds and 16 drum sounds available

## Microphone

API for controlling the built-in microphone sensor.

### Global Instance

```python
mic = Microphone()
```

### Methods

#### `mic.read()`

Returns the raw ADC value from the microphone sensor.

**Returns:**
- `int`: Raw ADC value (0-4095)

**Example:**
```python
value = mic.read()
print(f"Raw value: {value}")
```

#### `mic.get_level()`

Returns the sound level as a normalized value.

**Returns:**
- `int`: Sound level from 0 to 9, where:
  - 0: Very quiet
  - 1-2: Quiet
  - 3-4: Moderate
  - 5-6: Loud
  - 7-8: Very loud
  - 9: Extremely loud

**Example:**
```python
level = mic.get_level()
print(f"Sound level: {level}")
```

#### `mic.is_sound_detected()`

Checks if any sound is detected.

**Returns:**
- `bool`: `True` if sound is detected, `False` otherwise

**Example:**
```python
if mic.is_sound_detected():
    print("Sound detected!")
```

#### `mic.is_loud()`

Checks if the sound level is considered loud.

**Returns:**
- `bool`: `True` if sound level is 7 or higher, `False` otherwise

**Example:**
```python
if mic.is_loud():
    print("It's too loud!")
```

#### `mic.is_quiet()`

Checks if the sound level is considered quiet.

**Returns:**
- `bool`: `True` if sound level is 2 or lower, `False` otherwise

**Example:**
```python
if mic.is_quiet():
    print("It's very quiet.")
```

### Hardware Information

- **Sensor**: Built-in microphone
- **Measurement Range**: 0-4095 (12-bit ADC)
- **Level Conversion**: 0-4095 → 0-9 (10 levels)
- **Auto-calibration**: Automatically calibrates to ambient noise
- **Response Time**: < 1ms

### Notes

1. **Auto-calibration**: The sensor automatically calibrates to the ambient environment
2. **Sound Detection**: Most sensitive to sudden changes in sound level
3. **Thresholds**: Loud sounds typically register as level 7 or higher
4. **Environment**: Works best in relatively quiet environments

## Light Sensor

API for controlling the ambient light sensor (ALS-PT19).

### Global Instance

```python
light = Light()
```

### Methods

#### `light.read()`

Reads the raw light sensor value.

**Returns:**
- `int`: Light value (0-4095)

**Example:**
```python
value = light.read()
```

#### `light.read_level()`

Reads the light level.

**Returns:**
- `int`: Light level (0-9)

**Levels:**
- 0: Very dark
- 1-2: Dark
- 3-6: Normal
- 7-8: Bright
- 9: Very bright

**Example:**
```python
level = light.read_level()
```

### Hardware Information

- **Sensor**: ALS-PT19 ambient light sensor
- **Measurement Range**: 0-4095 (12-bit ADC)
- **Level Conversion**: 0-4095 → 0-9 (10 levels)
- **Response Time**: < 1ms
- **Power Consumption**: Very low

### Notes

1. **Environmental Factors**: Values may vary depending on ambient lighting
2. **Reflection**: Reflective objects near the sensor may affect measurements
3. **Temperature**: Accuracy may decrease at extreme temperatures
4. **Initialization**: Sensor automatically initializes when board is powered on