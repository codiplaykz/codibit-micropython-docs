---
sidebar_position: 12
---

# How to use serial communication

This guide shows you how to use the built-in serial communication on the Codi:bit board to communicate with external clients (web apps, serial terminals, etc.).

## Prerequisites

- Basic understanding of Python
- Codi:bit board
- MicroPython environment set up
- Serial client (web app, serial terminal, etc.)

## Basic Usage

The Serial class provides simple methods for reading and writing data:

```python
from codibit import serial

# Send data
serial.write("Hello")
serial.write_line("World")

# Receive data (non-blocking)
data = serial.read()
if data:
    print(f"Received: {data}")
```

## Reading Patterns

### Non-blocking Read

All read operations are non-blocking, meaning they return immediately even if no data is available. This allows your program to perform other tasks while waiting for data:

```python
from codibit import serial

while True:
    # Check for incoming data
    data = serial.read()
    if data:
        print(f"Received: {data}")
        serial.write(f"Echo: {data}")

    # Other tasks can be performed here
    # For example, check sensors, update display, etc.
    sleep(0.01)
```

### Line-based Communication

For line-based protocols, use `read_line()` and `write_line()`:

```python
from codibit import serial

while True:
    # Read a complete line (until \n)
    line = serial.read_line()
    if line:
        print(f"Received line: {line}")
        # Send response with newline
        serial.write_line(f"Echo: {line}")

    sleep(0.01)
```

## Practical Examples

### Echo Server

A simple echo server that responds to received messages:

```python
from codibit import serial

print("Echo server started")

while True:
    line = serial.read_line()
    if line:
        print(f"Received: {line}")
        serial.write_line(f"Echo: {line}")

    sleep(0.01)
```

### Command Processing

Process commands sent from a client:

```python
from codibit import serial

print("Command processor started")

while True:
    line = serial.read_line()
    if line:
        # Process command
        if line == "LED_ON":
            rgb_led.set_all_color(255, 0, 0)
            rgb_led.show()
            serial.write_line("LED turned on")

        elif line == "LED_OFF":
            rgb_led.turn_off_all()
            serial.write_line("LED turned off")

        elif line.startswith("TEMP"):
            temp = get_board_temperature()
            serial.write_line(f"Temperature: {temp}°C")

        else:
            serial.write_line(f"Unknown command: {line}")

    sleep(0.01)
```

## Common Patterns

### Request-Response Pattern

```python
from codibit import serial

while True:
    line = serial.read_line()
    if line:
        # Process request
        response = process_request(line)
        # Send response
        serial.write_line(response)

    sleep(0.01)
```

### Multi-task Integration

Integrate serial communication with other board features:

```python
from codibit import serial

while True:
    # Handle serial communication
    line = serial.read_line()
    if line:
        handle_command(line)

    # Update display
    display.clear()
    display.draw_text("Running", 0, 0)
    display.show()

    # Check sensors
    if button_a.is_pressed():
        serial.write_line("Button A pressed")

    sleep(0.01)
```

## Best Practices

### 1. Always Include Delays

Include small delays in your loops to ensure optimal performance:

```python
# ✅ Recommended
while True:
    data = serial.read()
    if data:
        process_data(data)
    sleep(0.01)  # 10ms delay

# ❌ Avoid: No delays can cause performance issues
while True:
    data = serial.read()
    if data:
        process_data(data)
```

### 2. Check for Empty Strings

Always check if data is not empty before processing:

```python
# ✅ Good
data = serial.read()
if data:  # Check if not empty
    process_data(data)

# ❌ Avoid: Processing empty strings
data = serial.read()
process_data(data)  # May process empty string
```

### 3. Choose the Right Read Method

Select the appropriate method based on your protocol:

- **`read()`**: For raw data or when you need all available data immediately
- **`read_line()`**: For text-based protocols or command processing

### 4. Silent Error Handling

The Serial class handles errors silently by returning empty strings or 0:

```python
data = serial.read()
if data:  # Empty string indicates no data or error
    process_data(data)

bytes_sent = serial.write("test")
if bytes_sent > 0:  # 0 indicates error
    print("Data sent successfully")
```

### 5. Process Data Immediately

For MicroPython memory efficiency, process data as soon as it's received:

```python
while True:
    line = serial.read_line()
    if line:
        # Process immediately, don't accumulate
        process_line(line)

    sleep(0.01)
```

## Connection Handling

The Serial class automatically handles connection establishment using a 2-way handshake protocol. No explicit connection code is required. For detailed information about the protocol, see [Serial Communication Protocol](../explanation/serial-protocol.md).

```python
from codibit import serial

# Connection is automatically established when client connects
# Just start reading/writing
while True:
    line = serial.read_line()
    if line:
        serial.write_line(f"Received: {line}")

    sleep(0.01)
```

## Troubleshooting

### No Data Received

- Check if client is connected
- Verify baud rate (115200)
- Ensure client is sending data
- Check if control characters are being filtered correctly

### Incomplete Lines

- `read_line()` returns empty string until complete line is received
- This is normal behavior - wait for newline character

### Connection Issues

- Connection is established automatically
- No explicit connection code needed
- If issues persist, restart both board and client

### Performance Issues

- Always include delays in loops (`sleep(0.01)`)
- Avoid processing empty strings
- Process data immediately when received
