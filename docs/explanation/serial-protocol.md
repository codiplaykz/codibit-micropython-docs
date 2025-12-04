---
sidebar_position: 1
---

# Serial Communication Protocol

This document explains the design and implementation details of the Serial communication interface for ESP32 MicroPython on the Codi:bit board.

## Overview

The Serial class provides a microbit-like serial communication interface for ESP32 MicroPython. It enables communication between clients (web apps, serial terminals, etc.) and user code using `sys.stdin` and `sys.stdout`. The implementation uses a 2-way handshake protocol to automatically establish connections with clients.

## Design Constraints

The design is based on the following constraints:

- **Hardware UART separation impossible**: Only UART0 is available, which is used for REPL
- **Communication only through stdin/stdout**: Must use `sys.stdin` and `sys.stdout` for communication
- **Data exchanged as plain strings only**: No binary protocols or complex data structures
- **Event-based interface unnecessary**: Simple read/write operations are sufficient
- **Asynchronous connection establishment**: Works regardless of which side starts first

## Protocol Design

### Operation Principle

The protocol operates as follows:

```
[Client]                    [Board]                    [User Code]
     │                            │                            │
     │─── ENQ (0x05) ────────────>│  Connection request (periodic)
     │                            │  (when board is ready)     │
     │<── ACK (0x06) ─────────────│  Ready response           │
     │                            │                            │
     │─── "Hello" ───────────────>│                            │
     │                            │─── sys.stdin ─────────────>│
     │                            │                            │
     │                            │<── sys.stdout ─────────────│
     │<── "World" ────────────────│                            │
```

### 2-way Handshake Protocol

**Protocol Flow:**
```
Client → Board: 0x05 (ENQ) - Connection request (periodic)
Board → Client: 0x06 (ACK) - Ready response
```

**Operation:**
- Client sends ENQ(0x05) periodically when connected
- Board receives ENQ and responds with ACK(0x06) when ready
- Client starts data transmission upon receiving ACK
- Communication proceeds without additional heartbeat after connection establishment

**Control Character Selection Rationale:**
- `ENQ (0x05)`: Standard control character meaning "connection request" or "are you ready?"
- `ACK (0x06)`: Standard control character meaning "acknowledged/ready"
- Completely separated from user data (not included in plain text)
- Efficient single-byte format

### Why 2-way Handshake?

Unlike TCP's 3-way handshake, serial communication only requires a 2-way handshake:

1. **Not unidirectional**: Serial communication is bidirectional, so additional confirmation steps are unnecessary
2. **Connection establishment complete**: Connection is complete when board sends ACK
3. **Replaced by data transmission**: Client sending data replaces the "third" step
4. **Simple and efficient**: Removing unnecessary steps makes it resource-efficient

### Asynchronous Connection Establishment

**Scenario 1: Client starts first**
- Client sends ENQ periodically when connected
- If board is booting, ENQ accumulates in UART buffer
- When board is ready, it reads ENQ and responds with ACK
- Client starts data transmission upon receiving ACK

**Scenario 2: Board starts first**
- Board performs normal read/write operations
- When client connects, it sends ENQ
- Board receives ENQ and responds with ACK
- Client starts data transmission upon receiving ACK

**Key Point**: Works correctly regardless of which side starts first, with the client leading the connection establishment.

## Implementation Details

### Internal Operations

**Initialization:**
- `_input_buffer` initialization for line buffering
- Connection state handled automatically

**Read Operations:**
- `read()`: Checks `sys.stdin` with `select.select()`, non-blocking read
  - Sends ACK(0x06) response internally when ENQ(0x05) detected
  - ENQ character not exposed to user (filtered)
- `read_line()`: Accumulates data in `_input_buffer` until newline
  - ENQ character filtered
  - Returns complete line when newline received

**Write Operations:**
- `write()`: Directly sends to `sys.stdout`, ensures immediate transmission with `flush()` call
- `write_line()`: Adds `\n` to `write()`

**Connection Establishment:**
- Automatically sends ACK response when ENQ detected in `read()` or `read_line()`
- No explicit call required in user code

### Control Character Handling

**Board Side:**
- Sends ACK response internally when ENQ received
- ENQ/ACK characters filtered from user data and not exposed
- User data transmitted as-is

**Client Side:**
- Sends ENQ (for connection establishment)
- Receives ACK (for connection confirmation)
- Filters ENQ/ACK from received data to process only user data

### Error Handling

- Returns empty string or 0 on exception
- Returns default value on type conversion failure
- Silently handles connection establishment failures (not exposed to user)

### Buffer and Memory

- `_input_buffer`: Managed as string (dynamic size)
- Memory limitations considered (ESP32 constraints)
- Warning or automatic handling on buffer overflow
- UART buffer is sufficiently large (128-256 bytes), no issues in normal usage

### Resource Efficiency

- **Client-driven**: Client leads connection requests, saving board resources
- **Connection establishment only**: Communication without additional heartbeat after connection
- **Automatic processing**: No explicit calls required in user code

## Client Implementation

### Web App (JavaScript)

Here's a complete example of how to implement a client using the Web Serial API:

```javascript
// 1. Serial port connection
const port = await navigator.serial.requestPort();
await port.open({ baudRate: 115200 });

// 2. Connection establishment (2-way handshake)
const writer = port.writable.getWriter();
const reader = port.readable.getReader();
let connected = false;

// Send connection request (periodic)
const connectInterval = setInterval(async () => {
  if (!connected) {
    await writer.write(new Uint8Array([0x05])); // ENQ
  }
}, 500); // Every 0.5 seconds

// Wait for connection confirmation
while (!connected) {
  const { value } = await reader.read();
  const bytes = new Uint8Array(value);
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] === 0x06) {  // ACK received
      connected = true;
      clearInterval(connectInterval);
      break;
    }
  }
}

// 3. Start data transmission
console.log("Connected!");
const decoder = new TextDecoder();
while (true) {
  const { value } = await reader.read();
  const bytes = new Uint8Array(value);

  // Filter ENQ/ACK (may remain after connection establishment)
  const userData = [];
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] !== 0x05 && bytes[i] !== 0x06) {
      userData.push(bytes[i]);
    }
  }

  if (userData.length > 0) {
    const text = decoder.decode(new Uint8Array(userData));
    handleUserData(text);
  }
}
```

### Python Client (pyserial)

```python
import serial
import time

# Open serial port
ser = serial.Serial('/dev/ttyUSB0', 115200, timeout=1)
connected = False

# Send connection request (periodic)
while not connected:
    ser.write(bytes([0x05]))  # ENQ
    time.sleep(0.5)

    # Check for ACK
    if ser.in_waiting > 0:
        data = ser.read(ser.in_waiting)
        if 0x06 in data:  # ACK received
            connected = True
            print("Connected!")

# Start data transmission
while True:
    # Send data
    ser.write(b"Hello\n")

    # Read data (filter ENQ/ACK)
    if ser.in_waiting > 0:
        data = ser.read(ser.in_waiting)
        # Filter control characters
        user_data = bytes([b for b in data if b not in [0x05, 0x06]])
        if user_data:
            print(f"Received: {user_data.decode('utf-8')}")

    time.sleep(0.1)
```

## Design Decisions

### Why REPL stdin/stdout?

- **Single UART**: ESP32 has limited UART resources, UART0 is used for REPL
- **Simplicity**: No need for separate hardware UART configuration
- **Compatibility**: Works with standard serial terminals and tools
- **Flexibility**: Can be used alongside REPL for debugging

### Why 2-way Handshake?

- **Efficiency**: Minimal overhead for connection establishment
- **Simplicity**: Easy to implement on both client and board sides
- **Reliability**: Sufficient for serial communication needs
- **Resource-friendly**: No continuous heartbeat required

### Why Filter Control Characters?

- **Transparency**: User code doesn't need to handle protocol details
- **Simplicity**: Clean API without protocol complexity
- **Compatibility**: Works with existing code that expects plain text
- **Error prevention**: Prevents accidental processing of control characters

### Why Non-blocking Reads?

- **Responsiveness**: Board can perform other tasks while waiting for data
- **Real-time**: Sensors and displays can be updated continuously
- **Efficiency**: No wasted CPU cycles waiting for data
- **Flexibility**: Supports various application patterns

## Limitations

1. **Single connection**: Only one client can connect at a time
2. **Plain text only**: Binary protocols require encoding/decoding
3. **No flow control**: Relies on UART buffer for flow control
4. **REPL interference**: REPL input may interfere with serial data (use with caution)

## Best Practices

1. **Always check return values**: Empty strings indicate no data
2. **Include delays**: Small delays in loops improve performance
3. **Filter control characters**: Client should filter ENQ/ACK from user data
4. **Handle errors gracefully**: Check return values and handle errors appropriately
5. **Use appropriate methods**: Choose `read()` or `read_line()` based on protocol needs
