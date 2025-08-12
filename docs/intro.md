---
sidebar_position: 1
title: Introduction
description: Codi:bit MicroPython API Documentation
---

# Codi:bit MicroPython API documentation

## 📚 Documentation Structure

This documentation is organized using the [Diátaxis framework](https://diataxis.fr/), which provides four types of documentation for effective technical writing:

### 🎯 **Tutorials**
**Purpose**: Learning - Complete learning paths that users can follow from start to finish

- **Getting Started**: Introduction to Codi:bit, first program, basic concepts
- **Basic Projects**: LED control, button handling, display usage
- **Sensor Projects**: Light detection, sound sensing, environment monitoring
- **Advanced Projects**: Multi-sensor applications, interactive projects

### 🔧 **How-to Guides**
**Purpose**: Tasks - Specific methods for performing particular tasks

- **[Button Usage](how-to/button-usage)**: How to detect button presses and handle user input
- **[Light Change Detection](how-to/light-change-detection)**: How to detect and respond to light level changes
- **[Microphone Usage](how-to/microphone-usage)**: How to use the microphone sensor for sound detection

### 📖 **Reference**
**Purpose**: Information - API and technical details

- **[Built-in Sensors API](reference/builtin)**: Complete API documentation for all built-in sensors
- **Hardware Reference**: Pin assignments, specifications, power management
- **System Reference**: MicroPython and ESP32 related information

### 📚 **Explanation**
**Purpose**: Understanding - Concepts and background knowledge

- **Concepts**: Sensor principles, communication protocols, programming concepts
- **Architecture**: Library structure, hardware architecture, performance optimization
- **Education**: Educational philosophy, STEM education

## 🚀 Getting Started

### Quick Start

```python
from codibit import *

# Display text
display.draw_text("Hello Codi:bit!", 0, 0)
display.show()

# Read button state
if button_a.is_pressed():
    print("Button A is pressed!")

# Read light sensor
light_level = light.read_level()
print(f"Light level: {light_level}")

# Read microphone
sound_level = microphone.get_level()
print(f"Sound level: {sound_level}")
```

### Hardware Overview

Codi:bit is an ESP32-based educational microcontroller board with:

- **Display**: SH1106 OLED (128x64 pixels)
- **Sensors**:
  - MMC5603NJ magnetometer
  - QMI8658C 6-axis IMU (accelerometer, gyroscope)
  - ALS-PT19 light sensor
  - Microphone sensor
- **I/O**:
  - WS2812B RGB LED
  - Buzzer
  - 2 buttons (A and B)
- **Connectivity**: WiFi, Bluetooth

## 📁 Documentation Sections

### Tutorials (Learning)
- **[Getting Started](tutorials/intro)**: Hardware introduction and first program
- **Basic Projects**: LED blinking, button response, display usage
- **Sensor Projects**: Light detection, sound sensing, environment monitoring
- **Advanced Projects**: Multi-sensor applications, interactive projects

### How-to Guides (Tasks)
- **[Button Usage](how-to/button-usage)**: Detect button presses and handle user input
- **[Light Change Detection](how-to/light-change-detection)**: Detect and respond to light level changes
- **[Microphone Usage](how-to/microphone-usage)**: Use microphone sensor for sound detection

### Reference (Information)
- **[Built-in Sensors API](reference/builtin)**: Complete API documentation for all sensors
- **Hardware Reference**: Pin mappings and specifications
- **System Reference**: MicroPython and ESP32 details

### Explanation (Understanding)
- **[Concepts](explanation/intro)**: Sensor principles and programming concepts
- **Architecture**: Library design and hardware architecture
- **Education**: Educational approach and STEM learning

## 🎯 Learning Path

### For Beginners
1. Start with **[Getting Started](tutorials/intro)**
2. Learn **[Button Usage](how-to/button-usage)** for user input
3. Explore **[Light Change Detection](how-to/light-change-detection)** for sensor usage
4. Try **[Microphone Usage](how-to/microphone-usage)** for sound detection

### For Developers
1. Check **[Built-in Sensors API](reference/builtin)** for function details
2. Review hardware specifications for pin assignments
3. Understand library architecture for system design

### For Educators
1. Read educational philosophy and STEM concepts
2. Explore tutorials for classroom activities
3. Use examples for hands-on learning

## 🔗 Quick Links

- **[Built-in Sensors API](reference/builtin)**: Complete API reference
- **[Button Usage Guide](how-to/button-usage)**: How to use buttons
- **[Light Detection Guide](how-to/light-change-detection)**: How to detect light changes
- **[Microphone Usage Guide](how-to/microphone-usage)**: How to use microphone
- **[Examples](https://github.com/codiplaykz/codibit-micropython/tree/main/examples)**: Code examples

## 📚 Code Examples

### Button Example
```python
from codibit import *

while True:
    if button_a.is_pressed():
        print("Button A pressed!")
    if button_b.is_pressed():
        print("Button B pressed!")
    sleep(0.1)
```

### Light Sensor Example
```python
from codibit import *

while True:
    level = light.read_level()
    print(f"Light level: {level}")
    sleep(1)
```

### Microphone Example
```python
from codibit import *

while True:
    if microphone.is_loud():
        print("Loud sound detected!")
    sleep(0.1)
```

## 📚 Additional Resources

- **[GitHub Repository](https://github.com/codiplaykz/codibit-micropython)**: Source code and issues
- **[MicroPython Documentation](https://docs.micropython.org/)**: MicroPython reference
- **[ESP32 Documentation](https://docs.espressif.com/projects/esp-idf/)**: ESP32 technical details

---

**Start Learning**: Begin with [Getting Started](tutorials/intro) to learn about Codi:bit hardware and create your first program!