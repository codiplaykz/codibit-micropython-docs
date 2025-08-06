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
3. **State Tracking**: `was_pressed()`, `get_presses()`, and `get_press_count()` methods automatically track button events
4. **Counter Management**: `get_presses()` resets the counter, while `get_press_count()` does not

## RGB LED

API for controlling the built-in RGB LED strip (3 LEDs).

### Global Instance

```python
rgb_led  # Built-in RGB LED strip
```

### Methods

#### `rgb_led.set_color(strip_id, r, g, b, brightness=255)`

Sets the color and brightness of a specific LED strip.

**Parameters:**
- `strip_id` (int): LED strip number (0, 1, 2)
- `r` (int): Red value (0-255)
- `g` (int): Green value (0-255)
- `b` (int): Blue value (0-255)
- `brightness` (int): Brightness (0-255), default 255

**Example:**
```python
# Set strip 0 to red, strip 1 to green, strip 2 to blue
rgb_led.set_color(0, 255, 0, 0)    # Red
rgb_led.set_color(1, 0, 255, 0)    # Green
rgb_led.set_color(2, 0, 0, 255)    # Blue
rgb_led.show()
```

#### `rgb_led.set_all(r, g, b, brightness=255)`

Sets all LED strips to the same color and brightness.

**Parameters:**
- `r` (int): Red value (0-255)
- `g` (int): Green value (0-255)
- `b` (int): Blue value (0-255)
- `brightness` (int): Brightness (0-255), default 255

**Example:**
```python
# Set all strips to white
rgb_led.set_all(255, 255, 255)
rgb_led.show()

# Set all strips to red with 50% brightness
rgb_led.set_all(255, 0, 0, 128)
rgb_led.show()
```

#### `rgb_led.set_brightness(strip_id, brightness)`

Sets the brightness of a specific LED strip while maintaining its current color.

**Parameters:**
- `strip_id` (int): LED strip number (0, 1, 2)
- `brightness` (int): Brightness (0-255)

**Example:**
```python
# Set strip 0 to red
rgb_led.set_color(0, 255, 0, 0)
# Set brightness to 50%
rgb_led.set_brightness(0, 128)
rgb_led.show()
```

#### `rgb_led.set_all_brightness(brightness)`

Sets the brightness of all LED strips while maintaining their current colors.

**Parameters:**
- `brightness` (int): Brightness (0-255)

**Example:**
```python
# Set different colors for each strip
rgb_led.set_color(0, 255, 0, 0)    # Red
rgb_led.set_color(1, 0, 255, 0)    # Green
rgb_led.set_color(2, 0, 0, 255)    # Blue
# Set all to 50% brightness
rgb_led.set_all_brightness(128)
rgb_led.show()
```

#### `rgb_led.turn_off(strip_id)`

Turns off a specific LED strip.

**Parameters:**
- `strip_id` (int): LED strip number (0, 1, 2)

**Example:**
```python
# Turn off strip 1
rgb_led.turn_off(1)
rgb_led.show()
```

#### `rgb_led.turn_off_all()`

Turns off all LED strips.

**Example:**
```python
# Turn off all strips
rgb_led.turn_off_all()
rgb_led.show()
```

#### `rgb_led.show()`

Applies the set colors and brightness to the actual LED hardware.

**Parameters:**
- None

**Example:**
```python
# Apply changes after setting color
rgb_led.set_color(0, 255, 0, 0)  # Set red
rgb_led.show()  # Apply changes

# Apply multiple settings at once
rgb_led.set_color(0, 255, 0, 0)    # Red
rgb_led.set_color(1, 0, 255, 0)    # Green
rgb_led.set_color(2, 0, 0, 255)    # Blue
rgb_led.show()  # Apply all changes
```

**Notes:**
- You must call `show()` after changing colors or brightness
- Changes will not be reflected on the LED without calling `show()`
- You can set multiple values and call `show()` once at the end

### Hardware Information

- **Type**: WS2812B RGB LED strip
- **Number of LEDs**: 3 LEDs in series
- **Pin Assignment**: GPIO17
- **Power Supply**: 3.3V
- **Data Protocol**: WS2812B protocol
- **Color Depth**: 24-bit (8-bit per color)
- **Brightness Control**: PWM-based brightness control

### Notes

1. **Color Range**: Each color component (R, G, B) ranges from 0-255
2. **Brightness Control**: Brightness is applied to all color components proportionally
3. **Power Efficiency**: Lower brightness reduces power consumption
4. **Update Required**: Call `show()` after setting colors to apply changes
5. **Strip Numbering**: Strips are numbered 0, 1, 2 from left to right
6. **Color Mixing**: RGB values are mixed to create various colors

## Buzzer

API for controlling the built-in buzzer on the Codi:bit board.

### Global Instance

```python
buzzer  # Built-in buzzer (GPIO16)
```

### Musical Notation

Musical notes are expressed in the format `NOTE[octave][:duration]`.

**Note Format:**
```python
'c4:4'    # C4 note for 4 ticks
'g'        # G4 note for default duration (4 ticks)
'r:2'      # Rest for 2 ticks
'eb:8'     # E♭4 note for 8 ticks
'f#5:1'    # F#5 note for 1 tick
```

**Supported Notes:**
- Basic notes: `c`, `d`, `e`, `f`, `g`, `a`, `b`
- Flats: `cb`, `db`, `eb`, `fb`, `gb`, `ab`, `bb`
- Sharps: `c#`, `d#`, `e#`, `f#`, `g#`, `a#`, `b#`
- Octaves: 3, 4(default), 5
- Rest: `r` (silence)

**Tempo System:**
- Default: 4 ticks, 120 BPM
- 1 tick = 60000 / BPM / ticks_per_beat milliseconds
- Default: 1 tick = 125ms, 1 beat = 500ms

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
Sound.DRUM_TOM3 = "drum_tom3"         # Tom 3
Sound.DRUM_FLOOR_TOM = "drum_floor_tom"  # Floor tom
Sound.DRUM_CRASH = "drum_crash"       # Crash cymbal
Sound.DRUM_RIDE = "drum_ride"         # Ride cymbal
Sound.DRUM_HIHAT_OPEN = "drum_hihat_open"  # Open hi-hat
Sound.DRUM_HIHAT_CLOSED = "drum_hihat_closed"  # Closed hi-hat
Sound.DRUM_CHINA = "drum_china"       # China cymbal
Sound.DRUM_SPLASH = "drum_splash"     # Splash cymbal
Sound.DRUM_COWBELL = "drum_cowbell"   # Cowbell
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
- `frequency` (int): Frequency in Hz
- `duration_ms` (int): Duration in milliseconds (default: 1000)
- `auto_stop` (bool): Whether to stop automatically after playing (default: True)

**Example:**
```python
buzzer.play_tone(440, 1000)      # Play 440Hz for 1 second
buzzer.play_tone(262, 500)       # Play C4 note for 0.5 seconds
```

#### `buzzer.play_melody(melody, tempo=None)`

Plays a melody with the specified tempo.

**Parameters:**
- `melody` (list): List of note strings (e.g., `['c4:4', 'd4:4', 'e4:8']`)
- `tempo` (int): Tempo in BPM (Beats Per Minute), uses default if None

**Example:**
```python
# C major scale
melody = ['c4:4', 'd4:4', 'e4:4', 'f4:4', 'g4:4', 'a4:4', 'b4:4', 'c5:8']
buzzer.play_melody(melody, tempo=120)

# Beethoven's 5th Symphony opening
melody = ['r4:2', 'g', 'g', 'g', 'eb:8', 'r:2', 'f', 'f', 'f', 'd:8']
buzzer.play_melody(melody)
```

#### `buzzer.play_song(song_name)`

Plays a built-in song.

**Parameters:**
- `song_name` (str): Song name string

**Available Songs:**
- `'happy_birthday'`: Happy Birthday
- `'twinkle'`: Twinkle Twinkle Little Star
- `'mary'`: Mary Had a Little Lamb

**Example:**
```python
buzzer.play_song('happy_birthday')
buzzer.play_song('twinkle')
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

#### `buzzer.set_tempo(ticks=4, bpm=120)`

Sets the tempo.

**Parameters:**
- `ticks` (int): Ticks per beat (default: 4)
- `bpm` (int): Beats per minute (default: 120)

**Example:**
```python
buzzer.set_tempo(bpm=180)  # Set to fast tempo
buzzer.play_melody(['c4:4', 'd4:4', 'e4:4', 'f4:4', 'g4:8'])
```

#### `buzzer.get_tempo()`

Returns the current tempo.

**Returns:**
- `tuple`: (ticks, bpm)

**Example:**
```python
ticks, bpm = buzzer.get_tempo()
print(f"Current tempo: {bpm} BPM, {ticks} ticks")
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
4. **Musical Notation**: Use `NOTE[octave][:duration]` format for musical notes
5. **Sound Types**: 8 practical sounds and 16 drum sounds available
6. **Drum Sounds**: Provides 16 different drum sounds
7. **Tick System**: The basic time unit for music is ticks, which length is determined by tempo

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

## Display

API for controlling the built-in SH1106 OLED display (128x64 pixels). Uses a buffer-based approach where drawing commands are stored in a buffer and then output to the screen using the `show()` function.

### Global Instance

```python
display = Display()
```

### Basic Control Methods

#### `display.clear()`

Clears the screen and immediately outputs to display. Sets all pixels to 0 (off).

**Example:**
```python
display.clear()
display.show()  # Apply to screen
```

#### `display.clear_buffer()`

Clears only the buffer without outputting to display. Useful for performance optimization before multiple drawing operations.

**Example:**
```python
# Performance optimization usage
display.clear_buffer()  # Clear buffer only
display.draw_text("Hello", 0, 0)
display.draw_circle(32, 32, 10)
display.show()  # Output once at the end
```

#### `display.show()`

Outputs the buffer contents to the screen. Must be called after drawing operations to display on screen.

**Example:**
```python
display.draw_text("Hello", 0, 0)
display.draw_circle(32, 32, 10)
display.show()  # Output to screen
```

### Pixel Control

#### `display.get_pixel(x, y)`

Returns the pixel state at the specified coordinates.

**Parameters:**
- `x` (int): X coordinate (0-127)
- `y` (int): Y coordinate (0-63)

**Returns:**
- `int`: Pixel state (0 or 1)

**Example:**
```python
pixel_state = display.get_pixel(10, 20)
print(f"Pixel state: {pixel_state}")
```

#### `display.set_pixel(x, y, val)`

Sets the pixel state at the specified coordinates.

**Parameters:**
- `x` (int): X coordinate (0-127)
- `y` (int): Y coordinate (0-63)
- `val` (int): Pixel state (0 or 1)

**Example:**
```python
display.set_pixel(10, 20, 1)  # Turn on pixel
display.show()
```

### Drawing Methods

#### `display.draw_text(text, x, y)`

Draws text at the specified position.

**Parameters:**
- `text` (str): Text to draw
- `x` (int): X coordinate
- `y` (int): Y coordinate

**Example:**
```python
display.draw_text("Hello", 0, 0)
display.draw_text("World", 0, 10)
display.show()
```

#### `display.draw_rectangle(x, y, w, h, fill=False)`

Draws a rectangle.

**Parameters:**
- `x` (int): X coordinate of top-left corner
- `y` (int): Y coordinate of top-left corner
- `w` (int): Width
- `h` (int): Height
- `fill` (bool): Whether to fill (default: False)

**Example:**
```python
# Empty rectangle
display.draw_rectangle(10, 10, 20, 15)
# Filled rectangle
display.draw_rectangle(40, 10, 20, 15, fill=True)
display.show()
```

#### `display.draw_line(x1, y1, x2, y2)`

Draws a line between two points.

**Parameters:**
- `x1` (int): X coordinate of start point
- `y1` (int): Y coordinate of start point
- `x2` (int): X coordinate of end point
- `y2` (int): Y coordinate of end point

**Example:**
```python
display.draw_line(0, 0, 50, 50)
display.draw_line(0, 50, 50, 0)
display.show()
```

#### `display.draw_circle(x, y, r, fill=False)`

Draws a circle.

**Parameters:**
- `x` (int): X coordinate of center
- `y` (int): Y coordinate of center
- `r` (int): Radius
- `fill` (bool): Whether to fill (default: False)

**Example:**
```python
# Empty circle
display.draw_circle(32, 32, 10)
# Filled circle
display.draw_circle(64, 32, 8, fill=True)
display.show()
```

#### `display.draw_triangle(x1, y1, x2, y2, x3, y3, fill=False)`

Draws a triangle.

**Parameters:**
- `x1, y1` (int): Coordinates of first vertex
- `x2, y2` (int): Coordinates of second vertex
- `x3, y3` (int): Coordinates of third vertex
- `fill` (bool): Whether to fill (default: False)

**Example:**
```python
# Empty triangle
display.draw_triangle(10, 10, 20, 40, 40, 40)
# Filled triangle
display.draw_triangle(50, 10, 60, 40, 80, 40, fill=True)
display.show()
```

### Images and Icons

#### `display.draw_image(image, x, y)`

Draws an image at the specified position.

**Parameters:**
- `image`: Image object
- `x` (int): Starting X coordinate
- `y` (int): Starting Y coordinate

**Example:**
```python
from codibit import Image

# Draw built-in icons
display.draw_image(Image.HEART, 0, 0)
display.draw_image(Image.HAPPY, 20, 0)
display.show()
```

#### `display.draw_icon(icon_name, x=0, y=0, scale=1)`

Draws a built-in icon at the specified position.

**Parameters:**
- `icon_name` (str): Name of the icon (e.g., 'HEART', 'HAPPY', 'SAD')
- `x` (int): X coordinate (default: 0)
- `y` (int): Y coordinate (default: 0)
- `scale` (int): Scale size (1=5x5, 2=10x10, 3=15x15)

**Example:**
```python
# Draw heart at default size
display.draw_icon('HEART', 0, 0)
# Draw happy face at 2x scale
display.draw_icon('HAPPY', 20, 0, scale=2)
display.show()
```

### Hardware Information

- **Display**: SH1106 OLED
- **Resolution**: 128x64 pixels
- **Color**: Monochrome (white/black)
- **Interface**: I2C
- **Address**: 0x3C
- **Rotation**: 180 degrees (screen displays in correct orientation)
- **Power Supply**: 3.3V
- **Physical Location**: Front side of the board

### Operation Mode

1. **Buffer-based**: All drawing commands are stored in an internal buffer
2. **Delayed Output**: The `show()` function must be called to output to screen
3. **Performance Optimization**: Multiple drawing operations can be processed at once before output
4. **Memory Efficiency**: Buffer usage optimizes memory consumption

### Usage Pattern

```python
# 1. Clear screen
display.clear()

# 2. Perform multiple drawing operations
display.draw_text("Hello", 0, 0)
display.draw_circle(32, 32, 10)
display.draw_rectangle(10, 10, 20, 15)

# 3. Output to screen
display.show()
```

### Notes

1. **Pixel Coordinates**: Origin (0,0) is at top-left corner
2. **Pixel Values**: Only 0 (off) or 1 (on) are supported
3. **Buffer Output**: `show()` must be called after drawing operations to display on screen
4. **Built-in Icons**: 64 different icons available (see Image section)
5. **Scaling**: Icons can be scaled for better visibility when displayed
6. **Performance**: It's efficient to process multiple drawing operations at once before calling `show()`
7. **Buffer Control**: `clear()` outputs immediately, while `clear_buffer()` only clears the buffer for performance optimization

## Image

API for creating and manipulating images for the display.

### Global Instance

```python
from codibit import Image
```

### Creating Images

#### `Image(width, height)`

Creates an empty image with the specified dimensions.

**Parameters:**
- `width` (int): Image width
- `height` (int): Image height

**Example:**
```python
img = Image(5, 5)  # Create 5x5 empty image
```

#### `Image(string)`

Creates an image from a string representation.

**Parameters:**
- `string` (str): Image string in format "row1:row2:row3:..."

**Example:**
```python
heart = Image('09090:99999:99999:09990:00900:')
```

### Methods

#### `image.set_pixel(x, y, value)`

Sets the brightness of a pixel in the image.

**Parameters:**
- `x` (int): X coordinate
- `y` (int): Y coordinate
- `value` (int): Brightness value (0-9)

**Example:**
```python
img = Image(5, 5)
img.set_pixel(2, 2, 9)  # Set center pixel to maximum brightness
```

#### `image.get_pixel(x, y)`

Returns the brightness of a pixel in the image.

**Parameters:**
- `x` (int): X coordinate
- `y` (int): Y coordinate

**Returns:**
- `int`: Pixel brightness (0-9)

**Example:**
```python
brightness = img.get_pixel(2, 2)
```

#### `image.width()`

Returns the width of the image.

**Returns:**
- `int`: Image width

**Example:**
```python
width = img.width()
```

#### `image.height()`

Returns the height of the image.

**Returns:**
- `int`: Image height

**Example:**
```python
height = img.height()
```

#### `image.shift_left(n)`

Shifts the image left by n pixels.

**Parameters:**
- `n` (int): Number of pixels to shift

**Returns:**
- `Image`: New shifted image

**Example:**
```python
shifted = img.shift_left(1)
```

#### `image.shift_right(n)`

Shifts the image right by n pixels.

**Parameters:**
- `n` (int): Number of pixels to shift

**Returns:**
- `Image`: New shifted image

**Example:**
```python
shifted = img.shift_right(1)
```

#### `image.shift_up(n)`

Shifts the image up by n pixels.

**Parameters:**
- `n` (int): Number of pixels to shift

**Returns:**
- `Image`: New shifted image

**Example:**
```python
shifted = img.shift_up(1)
```

#### `image.shift_down(n)`

Shifts the image down by n pixels.

**Parameters:**
- `n` (int): Number of pixels to shift

**Returns:**
- `Image`: New shifted image

**Example:**
```python
shifted = img.shift_down(1)
```

import ImagePreview from '@site/src/components/ImagePreview';
import { IMAGE_STRINGS } from '@site/src/constants/imageStrings';

### Built-in Images

The Image class provides 64 built-in images that can be used with the display.

#### Basic Icons

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.HEART` | <ImagePreview imageString={IMAGE_STRINGS.HEART} /> | `Image.HEART_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.HEART_SMALL} /> | `Image.HAPPY` | <ImagePreview imageString={IMAGE_STRINGS.HAPPY} /> |
| `Image.STAR` | <ImagePreview imageString={IMAGE_STRINGS.STAR} /> | `Image.SAD` | <ImagePreview imageString={IMAGE_STRINGS.SAD} /> | `Image.CONFUSED` | <ImagePreview imageString={IMAGE_STRINGS.CONFUSED} /> |
| `Image.ANGRY` | <ImagePreview imageString={IMAGE_STRINGS.ANGRY} /> | `Image.ASLEEP` | <ImagePreview imageString={IMAGE_STRINGS.ASLEEP} /> | `Image.SURPRISED` | <ImagePreview imageString={IMAGE_STRINGS.SURPRISED} /> |
| `Image.SILLY` | <ImagePreview imageString={IMAGE_STRINGS.SILLY} /> | `Image.FABULOUS` | <ImagePreview imageString={IMAGE_STRINGS.FABULOUS} /> | `Image.MEH` | <ImagePreview imageString={IMAGE_STRINGS.MEH} /> |
| `Image.O` | <ImagePreview imageString={IMAGE_STRINGS.O} /> | `Image.X` | <ImagePreview imageString={IMAGE_STRINGS.X} /> | | |

#### Geometric Shapes

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.TRIANGLE` | <ImagePreview imageString={IMAGE_STRINGS.TRIANGLE} /> | `Image.TRIANGLE_LEFT` | <ImagePreview imageString={IMAGE_STRINGS.TRIANGLE_LEFT} /> | `Image.CHESSBOARD` | <ImagePreview imageString={IMAGE_STRINGS.CHESSBOARD} /> |
| `Image.DIAMOND` | <ImagePreview imageString={IMAGE_STRINGS.DIAMOND} /> | `Image.DIAMOND_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.DIAMOND_SMALL} /> | `Image.SQUARE` | <ImagePreview imageString={IMAGE_STRINGS.SQUARE} /> |
| `Image.SQUARE_SMALL` | <ImagePreview imageString={IMAGE_STRINGS.SQUARE_SMALL} /> | | | | |

#### Animals

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.RABBIT` | <ImagePreview imageString={IMAGE_STRINGS.RABBIT} /> | `Image.COW` | <ImagePreview imageString={IMAGE_STRINGS.COW} /> | `Image.DUCK` | <ImagePreview imageString={IMAGE_STRINGS.DUCK} /> |
| `Image.TORTOISE` | <ImagePreview imageString={IMAGE_STRINGS.TORTOISE} /> | `Image.BUTTERFLY` | <ImagePreview imageString={IMAGE_STRINGS.BUTTERFLY} /> | `Image.STICKFIGURE` | <ImagePreview imageString={IMAGE_STRINGS.STICKFIGURE} /> |
| `Image.GHOST` | <ImagePreview imageString={IMAGE_STRINGS.GHOST} /> | `Image.GIRAFFE` | <ImagePreview imageString={IMAGE_STRINGS.GIRAFFE} /> | `Image.SKULL` | <ImagePreview imageString={IMAGE_STRINGS.SKULL} /> |
| `Image.UMBRELLA` | <ImagePreview imageString={IMAGE_STRINGS.UMBRELLA} /> | `Image.SNAKE` | <ImagePreview imageString={IMAGE_STRINGS.SNAKE} /> | `Image.SCISSORS` | <ImagePreview imageString={IMAGE_STRINGS.SCISSORS} /> |

#### Music

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.MUSIC_CROTCHET` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_CROTCHET} /> | `Image.MUSIC_QUAVER` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_QUAVER} /> | `Image.MUSIC_QUAVERS` | <ImagePreview imageString={IMAGE_STRINGS.MUSIC_QUAVERS} /> |
| `Image.PITCHFORK` | <ImagePreview imageString={IMAGE_STRINGS.PITCHFORK} /> | | | | |

#### Miscellaneous

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.XMAS` | <ImagePreview imageString={IMAGE_STRINGS.XMAS} /> | `Image.PACMAN` | <ImagePreview imageString={IMAGE_STRINGS.PACMAN} /> | `Image.TARGET` | <ImagePreview imageString={IMAGE_STRINGS.TARGET} /> |
| `Image.TSHIRT` | <ImagePreview imageString={IMAGE_STRINGS.TSHIRT} /> | `Image.ROLLERSKATE` | <ImagePreview imageString={IMAGE_STRINGS.ROLLERSKATE} /> | `Image.HOUSE` | <ImagePreview imageString={IMAGE_STRINGS.HOUSE} /> |

#### Clock Faces
- `Image.CLOCK1` through `Image.CLOCK12` - Clock faces for different hours

#### Arrows

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `Image.ARROW_N` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_N} /> | `Image.ARROW_NE` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_NE} /> | `Image.ARROW_E` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_E} /> |
| `Image.ARROW_SE` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_SE} /> | `Image.ARROW_S` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_S} /> | `Image.ARROW_SW` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_SW} /> |
| `Image.ARROW_W` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_W} /> | `Image.ARROW_NW` | <ImagePreview imageString={IMAGE_STRINGS.ARROW_NW} /> | | |

### Image Operations

#### Addition (`+`)

Combines two images by taking the maximum brightness at each pixel.

**Example:**
```python
combined = Image.HEART + Image.HAPPY
```

#### Multiplication (`*`)

Adjusts the brightness of an image.

**Example:**
```python
brighter = Image.HEART * 2  # Double the brightness
```

### Usage with Display

Images are designed to work seamlessly with the display:

**Example:**
```python
from codibit import display, Image

# Draw built-in icons
display.draw_image(Image.HEART, 0, 0)
display.draw_image(Image.HAPPY, 20, 0)
display.show()

# Create and draw custom image
custom = Image('90009:09090:00900:09090:90009:')
display.draw_image(custom, 0, 20)
display.show()

# Icon scaling
display.draw_icon('HAPPY', 0, 0, scale=2)
display.draw_icon('SAD', 40, 0, scale=3)
display.show()
```

### Notes

1. **String Format**: Images can be created from strings using ':' to separate rows
2. **Brightness Scale**: 0-9 scale (0=off, 9=maximum brightness)
3. **Built-in Icons**: 64 different icons available for immediate use
4. **Display Integration**: Images can be drawn to the display using the `draw_image()` method
5. **Scaling**: Icons can be scaled for better visibility using the `draw_icon()` method
6. **Buffer-based**: Image drawing also works with the buffer-based approach, requiring `show()` calls

## Accelerometer

API for controlling the built-in QMI8658 accelerometer sensor.

### Global Instance

```python
accelerometer = Accelerometer()
```

### Methods

#### `accelerometer.get_x()`

Returns the acceleration value on the X-axis.

**Returns:**
- `int`: X-axis acceleration value

**Example:**
```python
x_value = accelerometer.get_x()
print(f"X-axis acceleration: {x_value}")
```

#### `accelerometer.get_y()`

Returns the acceleration value on the Y-axis.

**Returns:**
- `int`: Y-axis acceleration value

**Example:**
```python
y_value = accelerometer.get_y()
print(f"Y-axis acceleration: {y_value}")
```

#### `accelerometer.get_z()`

Returns the acceleration value on the Z-axis.

**Returns:**
- `int`: Z-axis acceleration value

**Example:**
```python
z_value = accelerometer.get_z()
print(f"Z-axis acceleration: {z_value}")
```

#### `accelerometer.get_values()`

Returns a tuple of acceleration values for all three axes.

**Returns:**
- `tuple`: (x, y, z) acceleration values

**Example:**
```python
x, y, z = accelerometer.get_values()
print(f"Acceleration: X={x}, Y={y}, Z={z}")
```

#### `accelerometer.get_strength()`

Returns the magnitude of acceleration (total acceleration strength).

**Returns:**
- `int`: Acceleration magnitude

**Example:**
```python
strength = accelerometer.get_strength()
print(f"Acceleration strength: {strength}")
```

### Hardware Information

- **Sensor**: QMI8658 6-axis IMU
- **Interface**: I2C
- **Address**: 0x6B
- **Measurement Range**: ±2g, ±4g, ±8g, ±16g
- **Resolution**: 16-bit
- **Update Rate**: Up to 200Hz
- **Power Supply**: 3.3V
- **Physical Location**: Integrated on the board

### Coordinate System

The Codi:bit board's accelerometer operates based on the board's actual physical orientation:

#### **Axis Directions**
- **X-axis**: Forward and backward tilt (Tilt forward and backward)
  - Positive when tilted forward, negative when tilted backward
- **Y-axis**: Left and right tilt (Tilt left and right)
  - Positive when tilted left, negative when tilted right
- **Z-axis**: Up and down flip (Flip up and down)
  - Approximately -1.0 when flat, approximately +1.0 when flipped

#### **Gravity Reference**
- When the board is placed flat, gravity acts in the -Z direction
- In stationary state, Z-axis is approximately -1.0 (opposite to gravity direction)
- When the board is flipped, Z-axis is approximately +1.0 (same as gravity direction)

#### **Measurement Range**
- **General range**: -2.0 ~ +2.0 (measures up to approximately 2 times gravity)
- **Stationary state**: -1.0 ~ +1.0 (gravity only)
- **Tilt detection**: Each axis measures gravity components decomposed according to tilt in that direction

### Notes

1. **Calibration**: The sensor automatically calibrates to gravity
2. **Gravity**: When stationary, the Z-axis typically shows ~1g (gravity)
3. **Movement Detection**: Use `get_strength()` to detect overall movement
4. **Axis Values**: Individual axis values can be positive or negative
5. **Sampling**: Values are updated at the sensor's configured rate
6. **Noise**: Small variations are normal due to sensor noise