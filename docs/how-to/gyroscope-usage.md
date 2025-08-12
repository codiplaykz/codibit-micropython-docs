# How to use gyroscope

Learn how to use the Codi:bit gyroscope sensor to detect rotation and angular velocity.

## Basic Usage

### Initialization

```python
from codibit import *

# Initialize the gyroscope
gyroscope = Gyroscope()
```

### Reading Individual Axes

```python
# Read angular velocity for each axis
x = gyroscope.get_x()  # Roll (left-right rotation)
y = gyroscope.get_y()  # Pitch (forward-backward rotation)
z = gyroscope.get_z()  # Yaw (clockwise-counterclockwise rotation)

print(f"Roll: {x}, Pitch: {y}, Yaw: {z}")
```

### Reading All Axes at Once

```python
# Get all axis values as a tuple
x, y, z = gyroscope.get_values()
print(f"Angular velocity: X={x}, Y={y}, Z={z}")
```

### Getting Rotation Strength

```python
# Get the magnitude of rotation (overall rotation strength)
strength = gyroscope.get_strength()
print(f"Rotation strength: {strength}")
```

## Practical Examples

### 1. Rotation Detection

Detect when the board is being rotated:

```python
from codibit import *
import time

gyroscope = Gyroscope()

print("Hold the board still, then rotate it...")
print("Press Ctrl+C to stop")

while True:
    strength = gyroscope.get_strength()

    if strength > 100:  # Threshold for rotation detection
        print(f"Rotation detected! Strength: {strength}")
    else:
        print(f"Still. Strength: {strength}")

    time.sleep(0.1)
```

### 2. Axis-Specific Rotation Detection

Detect rotation around specific axes:

```python
from codibit import *
import time

gyroscope = Gyroscope()

print("Rotate the board around different axes...")
print("Press Ctrl+C to stop")

while True:
    x, y, z = gyroscope.get_values()

    # Check each axis for rotation
    if abs(x) > 50:
        direction = "left" if x > 0 else "right"
        print(f"Rolling {direction}: {x}")

    if abs(y) > 50:
        direction = "forward" if y > 0 else "backward"
        print(f"Pitching {direction}: {y}")

    if abs(z) > 50:
        direction = "clockwise" if z > 0 else "counterclockwise"
        print(f"Yawing {direction}: {z}")

    time.sleep(0.1)
```



## Tips and Best Practices

1. **Calibration**: The gyroscope automatically calibrates to zero when stationary. Keep the board still for a few seconds before starting measurements.

2. **Threshold Selection**: Choose appropriate thresholds based on your application. Lower thresholds are more sensitive but may trigger on noise.

3. **Sampling Rate**: Consider the sampling rate for your application. Higher rates provide more responsive detection but use more processing power.

4. **Noise Filtering**: Implement simple noise filtering by averaging multiple samples or using moving averages.

5. **Coordinate System**: Remember the coordinate system:
   - X-axis: Roll (left-right rotation)
   - Y-axis: Pitch (forward-backward rotation)
   - Z-axis: Yaw (clockwise-counterclockwise rotation)

6. **Integration**: For angle tracking, you'll need to integrate angular velocity over time, but be aware of drift accumulation.

7. **Combined Sensors**: For better orientation tracking, combine gyroscope data with accelerometer data using sensor fusion algorithms.

## Troubleshooting

**Problem**: Gyroscope readings are noisy
- **Solution**: Implement averaging or filtering algorithms
- **Solution**: Check for vibrations or movement in the environment

**Problem**: Readings are always zero
- **Solution**: Ensure the sensor is properly initialized
- **Solution**: Check I2C connections and addresses

**Problem**: Unexpected readings
- **Solution**: Verify the coordinate system matches your expectations
- **Solution**: Check for magnetic interference from nearby objects

**Problem**: Drift in angle calculations
- **Solution**: Implement periodic recalibration
- **Solution**: Use complementary sensors (accelerometer) for drift correction