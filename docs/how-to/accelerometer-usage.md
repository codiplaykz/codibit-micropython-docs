# Accelerometer Usage Guide

This guide shows you how to use the built-in accelerometer on the Codi:bit board.

## Overview

The Codi:bit board includes a QMI8658 6-axis IMU accelerometer that can detect movement and orientation. The accelerometer provides acceleration data in three axes (X, Y, Z) and can be used for various applications like gesture detection, motion sensing, and orientation detection.

## Basic Usage

### Importing the Accelerometer

```python
from codibit import Accelerometer

# Create an accelerometer instance
accelerometer = Accelerometer()
```

### Reading Individual Axes

You can read acceleration values from each axis separately:

```python
# Read X-axis acceleration
x_value = accelerometer.get_x()
print(f"X-axis: {x_value}")

# Read Y-axis acceleration
y_value = accelerometer.get_y()
print(f"Y-axis: {y_value}")

# Read Z-axis acceleration
z_value = accelerometer.get_z()
print(f"Z-axis: {z_value}")
```

### Reading All Axes at Once

For better performance, you can read all three axes at once:

```python
# Get all acceleration values as a tuple
x, y, z = accelerometer.get_values()
print(f"Acceleration: X={x}, Y={y}, Z={z}")
```

### Getting Total Acceleration Strength

To detect overall movement, use the strength method:

```python
# Get total acceleration magnitude
strength = accelerometer.get_strength()
print(f"Total acceleration: {strength}")
```

## Practical Examples

### 1. Real-time Acceleration Monitoring

```python
from codibit import Accelerometer
import time

accelerometer = Accelerometer()

print("Real-time acceleration monitoring")
print("Press Ctrl+C to stop")

try:
    while True:
        x, y, z = accelerometer.get_values()
        strength = accelerometer.get_strength()

        print(f"X: {x:6d} | Y: {y:6d} | Z: {z:6d} | Strength: {strength:6d}")
        time.sleep(0.1)  # Update 10 times per second

except KeyboardInterrupt:
    print("\nMonitoring stopped")
```

### 2. Movement Detection

```python
from codibit import Accelerometer
import time

accelerometer = Accelerometer()

# Calibrate to ambient conditions
print("Calibrating... Stay still for 2 seconds")
time.sleep(2)

baseline_strength = accelerometer.get_strength()
threshold = baseline_strength * 1.5  # 50% increase threshold

print(f"Baseline strength: {baseline_strength}")
print(f"Movement threshold: {threshold}")
print("Move the board to detect movement")

try:
    while True:
        current_strength = accelerometer.get_strength()

        if current_strength > threshold:
            print("Movement detected!")
            time.sleep(0.5)  # Debounce

        time.sleep(0.1)

except KeyboardInterrupt:
    print("\nDetection stopped")
```

### 3. Orientation Detection

```python
from codibit import Accelerometer, display
import time

accelerometer = Accelerometer()
display = Display()

def get_orientation():
    x, y, z = accelerometer.get_values()

    # Determine primary orientation based on gravity
    if abs(z) > abs(x) and abs(z) > abs(y):
        if z > 0:
            return "Face Up"
        else:
            return "Face Down"
    elif abs(x) > abs(y):
        if x > 0:
            return "Tilted Right"
        else:
            return "Tilted Left"
    else:
        if y > 0:
            return "Tilted Forward"
        else:
            return "Tilted Back"

print("Orientation detection")
print("Press Ctrl+C to stop")

try:
    while True:
        orientation = get_orientation()

        # Display on OLED
        display.clear()
        display.draw_text("Orientation:", 0, 0)
        display.draw_text(orientation, 0, 20)
        display.show()

        print(f"Current orientation: {orientation}")
        time.sleep(0.5)

except KeyboardInterrupt:
    print("\nDetection stopped")
```

### 4. Gesture Detection

```python
from codibit import Accelerometer, buzzer
import time

accelerometer = Accelerometer()

def detect_gesture():
    x, y, z = accelerometer.get_values()

    # Simple gesture detection based on axis values
    if abs(x) > 1000:
        if x > 0:
            return "Right"
        else:
            return "Left"
    elif abs(y) > 1000:
        if y > 0:
            return "Forward"
        else:
            return "Back"
    elif abs(z) > 1000:
        if z > 0:
            return "Up"
        else:
            return "Down"
    else:
        return "Still"

print("Gesture detection")
print("Move the board to detect gestures")

try:
    last_gesture = "Still"

    while True:
        current_gesture = detect_gesture()

        if current_gesture != last_gesture and current_gesture != "Still":
            print(f"Gesture detected: {current_gesture}")
            buzzer.play_tone(440, 100)  # Beep for gesture

        last_gesture = current_gesture
        time.sleep(0.1)

except KeyboardInterrupt:
    print("\nDetection stopped")
```

### 5. Data Logging

```python
from codibit import Accelerometer
import time

accelerometer = Accelerometer()

# Log acceleration data to file
def log_acceleration_data(filename="acceleration_log.txt"):
    print(f"Logging acceleration data to {filename}")
    print("Press Ctrl+C to stop")

    with open(filename, "w") as f:
        f.write("Timestamp,X,Y,Z,Strength\n")

        try:
            while True:
                timestamp = time.time()
                x, y, z = accelerometer.get_values()
                strength = accelerometer.get_strength()

                # Write to file
                f.write(f"{timestamp:.3f},{x},{y},{z},{strength}\n")
                f.flush()  # Ensure data is written immediately

                print(f"Logged: X={x}, Y={y}, Z={z}, Strength={strength}")
                time.sleep(0.1)  # 10Hz sampling rate

        except KeyboardInterrupt:
            print(f"\nLogging stopped. Data saved to {filename}")

# Start logging
log_acceleration_data()
```

## Advanced Usage

### Calibration

For accurate measurements, you may want to calibrate the accelerometer:

```python
from codibit import Accelerometer
import time

accelerometer = Accelerometer()

def calibrate():
    print("Calibrating accelerometer...")
    print("Place the board on a flat surface and stay still")

    # Collect samples for calibration
    samples = []
    for i in range(50):  # Collect 50 samples
        x, y, z = accelerometer.get_values()
        samples.append((x, y, z))
        time.sleep(0.1)

    # Calculate average (offset)
    avg_x = sum(s[0] for s in samples) / len(samples)
    avg_y = sum(s[1] for s in samples) / len(samples)
    avg_z = sum(s[2] for s in samples) / len(samples)

    print(f"Calibration complete:")
    print(f"X offset: {avg_x:.2f}")
    print(f"Y offset: {avg_y:.2f}")
    print(f"Z offset: {avg_z:.2f}")

    return avg_x, avg_y, avg_z

# Run calibration
offset_x, offset_y, offset_z = calibrate()
```

### Low-Pass Filtering

For smoother readings, you can implement a simple low-pass filter:

```python
from codibit import Accelerometer
import time

accelerometer = Accelerometer()

class LowPassFilter:
    def __init__(self, alpha=0.1):
        self.alpha = alpha
        self.filtered_x = 0
        self.filtered_y = 0
        self.filtered_z = 0

    def update(self, x, y, z):
        self.filtered_x = self.alpha * x + (1 - self.alpha) * self.filtered_x
        self.filtered_y = self.alpha * y + (1 - self.alpha) * self.filtered_y
        self.filtered_z = self.alpha * z + (1 - self.alpha) * self.filtered_z
        return self.filtered_x, self.filtered_y, self.filtered_z

# Create filter
filter = LowPassFilter(alpha=0.1)

print("Filtered acceleration readings")
print("Press Ctrl+C to stop")

try:
    while True:
        x, y, z = accelerometer.get_values()
        filtered_x, filtered_y, filtered_z = filter.update(x, y, z)

        print(f"Raw: X={x:6d} Y={y:6d} Z={z:6d}")
        print(f"Filtered: X={filtered_x:6.1f} Y={filtered_y:6.1f} Z={filtered_z:6.1f}")
        print("-" * 40)

        time.sleep(0.1)

except KeyboardInterrupt:
    print("\nMonitoring stopped")
```

## Troubleshooting

### Common Issues

1. **Inconsistent Readings**
   - Ensure the board is properly connected
   - Check for electromagnetic interference
   - Calibrate the sensor in a stable environment

2. **High Noise Levels**
   - Use low-pass filtering for smoother readings
   - Increase sampling intervals
   - Check for vibration sources

3. **Incorrect Orientation Detection**
   - Verify coordinate system understanding
   - Recalibrate the sensor
   - Check for magnetic interference

### Performance Tips

1. **Sampling Rate**: Adjust based on your application needs
   - High frequency (100Hz): Real-time applications
   - Medium frequency (10Hz): General monitoring
   - Low frequency (1Hz): Battery-saving applications

2. **Data Processing**: Consider processing data in batches for better performance

3. **Memory Usage**: Be mindful of memory when logging large amounts of data

## Hardware Specifications

- **Sensor**: QMI8658 6-axis IMU
- **Interface**: I2C (400kHz)
- **Address**: 0x6B
- **Measurement Range**: ±2g, ±4g, ±8g, ±16g (configurable)
- **Resolution**: 16-bit
- **Update Rate**: Up to 200Hz
- **Power Consumption**: ~1.5mA (active mode)

## Coordinate System

The accelerometer uses a right-handed coordinate system:
- **X-axis**: Left to right (positive when moving right)
- **Y-axis**: Bottom to top (positive when moving up)
- **Z-axis**: Back to front (positive when moving forward)

When the board is placed flat on a table:
- X-axis: Parallel to the table surface
- Y-axis: Parallel to the table surface
- Z-axis: Perpendicular to the table surface (pointing up)