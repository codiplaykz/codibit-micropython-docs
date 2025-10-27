---
id: magnetometer-usage
title: Magnetometer Usage Guide
sidebar_label: Magnetometer
description: Learn how to use the Codi:bit magnetometer sensor for compass and magnetic field detection
---

# How to use magnetometer

The Codi:bit magnetometer sensor allows you to detect magnetic fields and create compass applications. This guide will show you how to use the magnetometer effectively.

## Overview

The magnetometer uses the MMC5603 sensor to measure magnetic fields in three axes (X, Y, Z) and provides compass functionality. It's perfect for:

- **Compass applications**: Determine direction (North, South, East, West)
- **Magnetic field detection**: Measure magnetic field strength
- **Metal detection**: Detect nearby metal objects
- **Navigation**: Create direction-finding applications

## Basic Setup

### Import and Initialize

```python
from codibit import *

# Initialize the magnetometer
magnetometer = Magnetometer()
```

### Basic Reading

```python
# Read individual axis values
x = magnetometer.get_x()
y = magnetometer.get_y()
z = magnetometer.get_z()

# Read all values at once
x, y, z = magnetometer.get_values()

# Get magnetic field strength
strength = magnetometer.get_strength()

# Get compass heading (0-360 degrees)
heading = magnetometer.get_heading()
```

## Practical Examples

### Example 1: Simple Compass

Create a basic compass that shows the current direction:

```python
from codibit import *

magnetometer = Magnetometer()

# Calibrate the magnetometer for accurate readings
print("Starting magnetometer calibration...")
print("Please hold the board in the air and slowly draw figure-8 patterns")
print("for about 20 seconds to calibrate the sensor...")
magnetometer.calibrate()
print("Calibration complete!")

def get_direction_name(heading):
    """Convert heading angle to direction name"""
    if 315 <= heading < 45:
        return "NORTH"
    elif 45 <= heading < 135:
        return "EAST"
    elif 135 <= heading < 225:
        return "SOUTH"
    elif 225 <= heading < 315:
        return "WEST"
    else:
        return "NORTH"

while True:
    heading = magnetometer.get_heading()
    direction = get_direction_name(heading)

    print(f"Direction: {direction} ({heading:.1f}°)")
    sleep(0.5)
```

### Example 2: Magnetic Field Monitor

Monitor magnetic field strength and detect strong magnetic fields:

```python
from codibit import *

magnetometer = Magnetometer()

# Calibrate the magnetometer for accurate readings
print("Starting magnetometer calibration...")
print("Please hold the board in the air and slowly draw figure-8 patterns")
print("for about 20 seconds to calibrate the sensor...")
magnetometer.calibrate()
print("Calibration complete!")

while True:
    strength = magnetometer.get_strength()
    x, y, z = magnetometer.get_values()

    print(f"Magnetic Field Strength: {strength:.3f}")
    print(f"X: {x:.3f}, Y: {y:.3f}, Z: {z:.3f}")

    if strength > 100:
        print("⚠️ Strong magnetic field detected!")
    elif strength > 50:
        print("🔍 Moderate magnetic field")
    else:
        print("✅ Normal magnetic field")

    print("-" * 30)
    sleep(1)
```

### Example 3: Calibration

Calibrate the magnetometer for accurate readings:

```python
from codibit import *

magnetometer = Magnetometer()

print("Starting magnetometer calibration...")
print("Please hold the board in the air and slowly draw figure-8 patterns")
print("for about 20 seconds to calibrate the sensor...")

# Perform calibration
magnetometer.calibrate()

print("Calibration complete!")
print("The magnetometer is now ready for accurate readings")
```

### Example 4: Compass with Display

Create a compass application that shows direction on the OLED display:

```python
from codibit import *

magnetometer = Magnetometer()

# Calibrate the magnetometer for accurate readings
print("Starting magnetometer calibration...")
print("Please hold the board in the air and slowly draw figure-8 patterns")
print("for about 20 seconds to calibrate the sensor...")
magnetometer.calibrate()
print("Calibration complete!")

def get_direction_name(heading):
    """Convert heading angle to direction name"""
    if 315 <= heading < 45:
        return "NORTH"
    elif 45 <= heading < 135:
        return "EAST"
    elif 135 <= heading < 225:
        return "SOUTH"
    elif 225 <= heading < 315:
        return "WEST"
    else:
        return "NORTH"

while True:
    heading = magnetometer.get_heading()
    direction = get_direction_name(heading)

    # Clear display and show compass
    display.clear()
    display.draw_text("COMPASS:", 0, 0)
    display.draw_text(f"{heading:.0f}°", 0, 15)
    display.draw_text(direction, 0, 30)
    display.show()

    sleep(0.5)
```

## Advanced Features

### Calibration

For accurate compass readings, calibrate the magnetometer:

```python
# Calibrate before use
magnetometer.calibrate()
```



### Magnetic Field Strength Monitoring

Monitor the overall magnetic field strength:

```python
strength = magnetometer.get_strength()

if strength > 100:
    print("Strong magnetic field detected")
elif strength > 50:
    print("Moderate magnetic field")
else:
    print("Normal magnetic field")
```

## Coordinate System

The magnetometer uses a 3-axis coordinate system:

- **X-axis**: Left-right direction
- **Y-axis**: Forward-backward direction
- **Z-axis**: Up-down direction

### Compass Directions

- **0°**: North
- **90°**: East
- **180°**: South
- **270°**: West

## Best Practices

### 1. Calibration

- Calibrate the magnetometer before first use
- Calibrate before taking measurements
- Calibrate if readings seem inaccurate

### 2. Environment Considerations

- Keep away from metal objects during calibration
- Avoid strong electromagnetic fields
- Use in a stable, level position for compass readings

### 3. Reading Frequency

- Don't read too frequently (use delays between readings)
- Consider the sensor's update rate (max 100Hz)

### 4. Error Handling

```python
try:
    magnetometer = Magnetometer()
    heading = magnetometer.get_heading()
    print(f"Heading: {heading}°")
except Exception as e:
    print(f"Magnetometer error: {e}")
```

## Troubleshooting

### Common Issues

1. **Inaccurate readings**: Calibrate the sensor
2. **No response**: Check I2C connections
3. **Erratic values**: Move away from metal objects
4. **Wrong direction**: Ensure board is level

### Debug Information

```python
# Print all sensor information
x, y, z = magnetometer.get_values()
strength = magnetometer.get_strength()
heading = magnetometer.get_heading()

print(f"Raw values: X={x:.3f}, Y={y:.3f}, Z={z:.3f}")
print(f"Strength: {strength:.3f}")
print(f"Heading: {heading:.1f}°")
```

## Applications

### Navigation
- Create a digital compass
- Build direction-finding applications
- Implement navigation systems

### Metal Detection
- Detect nearby metal objects
- Create security applications
- Build treasure hunting games

### Science Projects
- Measure magnetic field strength
- Study magnetic properties
- Create educational demonstrations

## Summary

The Codi:bit magnetometer provides powerful magnetic field detection and compass capabilities. With proper calibration and usage, you can create accurate compass applications and magnetic field monitoring systems.

Remember to:
- Calibrate before measurements for accurate readings
- Consider environmental factors
- Handle errors gracefully
- Use appropriate reading frequencies

The magnetometer opens up many possibilities for navigation, detection, and educational applications on the Codi:bit platform.