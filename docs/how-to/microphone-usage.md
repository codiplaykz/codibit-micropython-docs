# How to use microphone

This guide shows you how to use the built-in microphone sensor on the Codi:bit board to detect sounds and create interactive audio applications.

## Prerequisites

- Codi:bit board with MicroPython firmware
- Basic knowledge of Python programming

## Basic Usage

### 1. Import and Initialize

First, import the microphone module and create a microphone object:

```python
from codibit import *

# Create microphone object
mic = Microphone()
```

### 2. Read Sound Levels

You can read the current sound level in different ways:

```python
# Get raw ADC value (0-4095)
raw_value = mic.read()
print(f"Raw value: {raw_value}")

# Get normalized level (0-9)
level = mic.get_level()
print(f"Sound level: {level}")
```

### 3. Detect Sound Events

Check for different sound conditions:

```python
# Check if any sound is detected
if mic.is_sound_detected():
    print("Sound detected!")

# Check if it's loud
if mic.is_loud():
    print("It's too loud!")

# Check if it's quiet
if mic.is_quiet():
    print("It's very quiet.")
```

## Example: Clap Detection

Here's a complete example that detects clapping sounds:

```python
from codibit import *

# Initialize microphone
mic = Microphone()

print("Clap Detection Started!")
print("Clap your hands to see the detection...")
print("Press Ctrl+C to stop")

try:
    while True:
        # Check for loud sounds (like clapping)
        if mic.is_loud():
            print("👏 Clap detected!")
            # Wait a bit to avoid multiple detections
            sleep(0.5)

        # Show current sound level
        level = mic.get_level()
        if level > 0:
            print(f"Sound level: {level}")

        # Small delay to prevent overwhelming output
        sleep(0.1)

except KeyboardInterrupt:
    print("\nClap detection stopped.")
```

## How It Works

1. **Raw Reading**: The `read()` method returns the raw ADC value from the microphone sensor
2. **Level Conversion**: The `get_level()` method converts the raw value to a normalized level (0-9)
3. **Event Detection**: The sensor automatically calibrates to ambient noise and detects changes
4. **Threshold Checking**: Methods like `is_loud()` and `is_quiet()` use predefined thresholds

## Tips

- The microphone automatically calibrates to the ambient environment
- Loud sounds like clapping typically register as level 7 or higher
- The sensor is most sensitive to sudden changes in sound level
- For best results, test in a relatively quiet environment first

## Troubleshooting

- **No sound detected**: Make sure you're in a quiet environment and try making louder sounds
- **Too sensitive**: The sensor may need time to calibrate to your environment
- **Inconsistent readings**: Try restarting the program to recalibrate the sensor