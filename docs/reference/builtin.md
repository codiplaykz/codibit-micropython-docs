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