---
sidebar_position: 1
title: Introduction
description: Codi:bit MicroPython API Documentation
---

# Codi:bit MicroPython API Documentation

## 📚 Documentation Structure

This documentation is organized using the [Diátaxis framework](https://diataxis.fr/), which provides four types of documentation for effective technical writing:

### 🎯 **Tutorials**
**Purpose**: Learning - Complete learning paths that users can follow from start to finish

- **Getting Started**: Introduction to Codi:bit, first program, basic concepts
- **Basics**: LED control, button handling, display usage
- **Sensors**: Compass, motion detection, environment sensing
- **Advanced**: IoT projects, wireless games, music player

### 🔧 **How-to Guides**
**Purpose**: Tasks - Specific methods for performing particular tasks

- **Hardware Control**: Display, LED, buzzer control
- **Sensor Usage**: Magnetometer, accelerometer, gyroscope usage
- **Communication**: WiFi, HTTP, MQTT connections
- **Data Processing**: Logging, visualization, analysis

### 📖 **Reference**
**Purpose**: Information - API and technical details

- **API Reference**: Detailed descriptions of all functions and classes
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
display.show("Hello Codi:bit!")

# Set LED color
rgb_led.set_pixel(0, (255, 0, 0))  # Red
rgb_led.show()

# Read sensor values
x = compass.get_x()
y = compass.get_y()
z = compass.get_z()
```

### Hardware Overview

Codi:bit is an ESP32-based educational microcontroller board with:

- **Display**: SH1106 OLED (128x64 pixels)
- **Sensors**: MMC5603NJ magnetometer, QMI8658C 6-axis IMU, ALS-PT19 light sensor
- **I/O**: WS2812B LED, buzzer, 2 buttons
- **Connectivity**: WiFi, Bluetooth

## 📁 Documentation Sections

### Tutorials (Learning)
- **[Getting Started](getting-started/introduction)**: Hardware introduction and first program
- **[Basics](basics/blink-led)**: LED blinking, button response, display usage
- **[Sensors](sensors/compass-project)**: Compass, motion detection, environment sensing
- **[Advanced](advanced/iot-sensor)**: IoT projects, wireless communication, music

### How-to Guides (Tasks)
- **[Hardware Control](hardware/display-control)**: Display, LED, buzzer control methods
- **[Sensor Usage](sensors-usage/magnetometer-usage)**: Sensor reading and calibration
- **[Communication](communication/wifi-connection)**: WiFi, HTTP, MQTT setup
- **[Data Processing](data/data-logging)**: Data logging and visualization

### Reference (Information)
- **[API Reference](api/display-api)**: Complete API documentation
- **[Hardware Reference](hardware-ref/pin-assignments)**: Pin mappings and specifications
- **[System Reference](system/micropython-reference)**: MicroPython and ESP32 details

### Explanation (Understanding)
- **[Concepts](concepts/sensor-principles)**: Sensor principles and communication protocols
- **[Architecture](architecture/library-architecture)**: Library design and hardware architecture
- **[Education](education/educational-philosophy)**: Educational approach and STEM learning

## 🎯 Learning Path

### For Beginners
1. Start with **[Getting Started](getting-started/introduction)**
2. Learn **[Basics](basics/blink-led)** for fundamental concepts
3. Explore **[Sensors](sensors/compass-project)** for sensor usage
4. Try **[Advanced](advanced/iot-sensor)** projects

### For Developers
1. Check **[API Reference](api/display-api)** for function details
2. Review **[Hardware Reference](hardware-ref/pin-assignments)** for specifications
3. Understand **[Architecture](architecture/library-architecture)** for system design

### For Educators
1. Read **[Educational Philosophy](education/educational-philosophy)**
2. Explore **[STEM Education](education/stem-education)** concepts
3. Use **[Tutorials](getting-started/introduction)** for classroom activities

## 🔗 Quick Links

- **[Hardware Specifications](hardware-ref/hardware-specifications)**: Detailed hardware specs
- **[Pin Assignments](hardware-ref/pin-assignments)**: GPIO pin mappings
- **[API Documentation](api/display-api)**: Complete API reference
- **[Examples](https://github.com/codiplaykz/codibit-micropython/tree/main/examples)**: Code examples

## 📚 Additional Resources

- **[GitHub Repository](https://github.com/codiplaykz/codibit-micropython)**: Source code and issues
- **[MicroPython Documentation](https://docs.micropython.org/)**: MicroPython reference
- **[ESP32 Documentation](https://docs.espressif.com/projects/esp-idf/)**: ESP32 technical details

---

**Start Learning**: Begin with [Getting Started](getting-started/introduction) to learn about Codi:bit hardware and create your first program!