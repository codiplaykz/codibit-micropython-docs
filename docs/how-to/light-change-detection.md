# How to detect light changes

This guide shows you how to detect when the light level changes and respond to those changes.

## Prerequisites

- Basic understanding of Python
- Codi:bit board with light sensor
- MicroPython environment set up

## Basic Light Change Detection

The simplest way to detect light changes is to compare the current reading with the previous one.

```python
from codibit import *
import time

# Store the previous light level
previous_level = light.read_level()

while True:
    # Get current light level
    current_level = light.read_level()

    # Check if light level has changed
    if current_level != previous_level:
        print(f"Light changed: {previous_level} → {current_level}")

        # Update the previous level
        previous_level = current_level

    # Small delay to avoid too frequent checks
    time.sleep(0.5)
```

## Responding to Light Changes

You can add different responses based on the type of change.

```python
from codibit import *

previous_level = light.read_level()

while True:
    current_level = light.read_level()

    if current_level != previous_level:
        # Determine the type of change
        if current_level > previous_level:
            print("Light increased!")
            display.draw_text("↑", 0, 0)  # Up arrow
            display.show()
        elif current_level < previous_level:
            print("Light decreased!")
            display.draw_text("↓", 0, 0)  # Down arrow
            display.show()

        previous_level = current_level

    time.sleep(0.5)
```

## Advanced: Threshold-Based Detection

For more precise control, you can set specific thresholds for light changes.

```python
from codibit import *
import time

previous_level = light.read_level()
threshold = 2  # Minimum change to trigger detection

while True:
    current_level = light.read_level()

    # Check if change exceeds threshold
    change = abs(current_level - previous_level)

    if change >= threshold:
        print(f"Significant light change: {previous_level} → {current_level}")

        # Different responses based on change magnitude
        if change >= 4:
            print("Major light change detected!")
            rgb_led.set_color(255, 0, 0)  # Red for major change
        else:
            print("Minor light change detected!")
            rgb_led.set_color(0, 255, 0)  # Green for minor change

        previous_level = current_level

    time.sleep(0.3)
```

## Practical Applications

### 1. Automatic Light Monitoring

```python
from codibit import *
import time

previous_level = light.read_level()
change_count = 0

while True:
    current_level = light.read_level()

    if current_level != previous_level:
        change_count += 1
        print(f"Change #{change_count}: {previous_level} → {current_level}")

        # Log the change with timestamp
        print(f"Time: {running_time()}ms")

        previous_level = current_level

    time.sleep(0.5)
```

### 2. Light-Based Alerts

```python
from codibit import *
import time

previous_level = light.read_level()

while True:
    current_level = light.read_level()

    if current_level != previous_level:
        # Alert based on light level
        if current_level <= 2:
            print("ALERT: Very dark environment!")
            buzzer.play_tone(1000, 200)  # Beep for 200ms
        elif current_level >= 7:
            print("ALERT: Very bright environment!")
            buzzer.play_tone(2000, 200)  # Higher pitch beep

        previous_level = current_level

    time.sleep(0.5)
```

## Tips and Best Practices

1. **Choose appropriate delay**: Too frequent checks (small delay) can waste resources, too infrequent checks (large delay) might miss changes.

2. **Use thresholds**: For noisy environments, use threshold-based detection to avoid false triggers.

3. **Consider hysteresis**: Add a small buffer to prevent rapid toggling between states.

4. **Log changes**: Keep track of changes for debugging and analysis.

5. **Handle edge cases**: Consider what happens when the sensor fails or returns unexpected values.

## Troubleshooting

**Problem**: Too many false detections
- **Solution**: Increase the threshold or add a debounce mechanism

**Problem**: Missing light changes
- **Solution**: Decrease the delay between readings

**Problem**: Inconsistent readings
- **Solution**: Add averaging or filtering to smooth the readings

## Next Steps

- Try combining light change detection with other sensors
- Create a light change logging system
- Build a light-based security system
- Experiment with different response mechanisms