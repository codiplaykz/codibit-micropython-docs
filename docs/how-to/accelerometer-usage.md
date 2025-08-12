# How to use accelerometer

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
from codibit import Accelerometer, Display
import time

accelerometer = Accelerometer()
display = Display()

print("Orientation detection")
print("Press Ctrl+C to stop")

try:
    while True:
        # Use the built-in gesture detection API
        orientation = accelerometer.get_gesture()

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

**Available Gesture Types:**
- `"FACE_UP"`, `"FACE_DOWN"`, `"UP"`, `"DOWN"`, `"LEFT"`, `"RIGHT"`, `"SHAKE"`, `"FREE_FALL"`

For detailed descriptions of each gesture type, see the [Accelerometer Reference](../reference/builtin#accelerometer).

### 4. Gesture Detection

```python
from codibit import Accelerometer, Buzzer
import time

accelerometer = Accelerometer()
buzzer = Buzzer()

print("Gesture detection")
print("Move the board to detect gestures")

try:
    while True:
        # Check for specific gestures using was_gesture()
        if accelerometer.was_gesture("SHAKE"):
            print("Shake detected!")
            buzzer.play_tone(440, 100)  # Beep for shake

        elif accelerometer.was_gesture("FREE_FALL"):
            print("Free fall detected!")
            buzzer.play_tone(880, 200)  # Higher tone for free fall

        elif accelerometer.was_gesture("FACE_UP"):
            print("Board flipped to face up!")
            buzzer.play_tone(330, 50)

        elif accelerometer.was_gesture("FACE_DOWN"):
            print("Board flipped to face down!")
            buzzer.play_tone(330, 50)

        time.sleep(0.1)

except KeyboardInterrupt:
    print("\nDetection stopped")
```

**Using `is_gesture()` for continuous state checking:**

```python
from codibit import Accelerometer, RGBLed
import time

accelerometer = Accelerometer()
rgb_led = RGBLed()

print("Continuous gesture monitoring")
print("Press Ctrl+C to stop")

try:
    while True:
        # Check current gesture state
        if accelerometer.is_gesture("FACE_UP"):
            rgb_led.set_color(0, 255, 0)  # Green when face up
        elif accelerometer.is_gesture("FACE_DOWN"):
            rgb_led.set_color(255, 0, 0)  # Red when face down
        elif accelerometer.is_gesture("SHAKE"):
            rgb_led.set_color(255, 255, 0)  # Yellow when shaking
        else:
            rgb_led.set_color(0, 0, 255)  # Blue for other orientations

        time.sleep(0.1)

except KeyboardInterrupt:
    print("\nMonitoring stopped")
    rgb_led.off()
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
   - Check sensor placement in a stable environment

2. **High Noise Levels**
   - Use low-pass filtering for smoother readings
   - Increase sampling intervals
   - Check for vibration sources

3. **Incorrect Orientation Detection**
   - Verify coordinate system understanding
   - Check sensor placement and orientation
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