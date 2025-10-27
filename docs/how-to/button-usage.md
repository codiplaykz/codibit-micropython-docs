# How to use buttons

This guide shows you how to use the built-in buttons on the Codi:bit board to detect user input.

## Prerequisites

- Basic understanding of Python
- Codi:bit board
- MicroPython environment set up

## Button State Detection

The Codi:bit button class provides three main methods for detecting different button states:

### 1. `is_pressed()` - Moment of Press Detection

Detects the exact moment when a button is pressed (one-time event).

```python
from codibit import *

while True:
    # Detect when Button A is pressed
    if button_a.is_pressed():
        print("Button A pressed!")

    # Detect when Button B is pressed
    if button_b.is_pressed():
        print("Button B pressed!")

    # Small delay for optimal performance
    sleep(0.01)
```

### 2. `is_holding()` - Continuous Press Detection

Detects when a button is continuously being held down.

```python
from codibit import *

while True:
    # Check if Button A is being held
    if button_a.is_holding():
        print("Button A is being held...")

    # Check if Button B is being held
    if button_b.is_holding():
        print("Button B is being held...")

    sleep(0.01)
```

### 3. `is_released()` - Moment of Release Detection

Detects the exact moment when a button is released (one-time event).

```python
from codibit import *

while True:
    # Detect when Button A is released
    if button_a.is_released():
        print("Button A released!")

    # Detect when Button B is released
    if button_b.is_released():
        print("Button B released!")

    sleep(0.01)
```

## Complete Button State Monitoring

You can monitor all button states simultaneously:

```python
from codibit import *

while True:
    # Press detection
    if button_a.is_pressed():
        print("🔴 Button A: Pressed!")

    # Continuous holding
    if button_a.is_holding():
        print("🟡 Button A: Holding...", end='\r')

    # Release detection
    if button_a.is_released():
        print("🟢 Button A: Released!")

    sleep(0.01)
```

## Counting Button Presses

The `get_presses()` method returns the total number of button presses and resets the counter.

```python
from codibit import *

print("Press buttons multiple times, then wait 5 seconds for count...")

while True:
    # Wait 5 seconds
    sleep(5)

    # Get the number of times Button A was pressed
    a_presses = button_a.get_presses()

    # Get the number of times Button B was pressed
    b_presses = button_b.get_presses()

    # Display the counts
    if a_presses > 0:
        print(f"Button A was pressed {a_presses} times")

    if b_presses > 0:
        print(f"Button B was pressed {b_presses} times")
```

## Tracking Accumulated Button Presses

The `get_press_count()` method returns the total accumulated number of button presses without resetting the counter.

```python
from codibit import *

print("Press buttons to see real-time accumulated count...")

while True:
    # Get accumulated Button A press count
    total_a = button_a.get_press_count()

    # Get accumulated Button B press count
    total_b = button_b.get_press_count()

    # Real-time display
    print(f"\rTotal presses - A: {total_a}, B: {total_b}", end="")

    sleep(0.1)
```

## get_presses() vs get_press_count() Comparison

It's important to understand the difference between these two methods:

```python
from codibit import *

print("Press buttons multiple times...")
sleep(3)

# First check
presses_a = button_a.get_presses()  # Counter is reset
count_a = button_a.get_press_count()  # Counter is not reset

print(f"get_presses(): {presses_a} (reset)")
print(f"get_press_count(): {count_a} (accumulated)")

sleep(2)

# Second check
presses_a2 = button_a.get_presses()  # 0 (already reset)
count_a2 = button_a.get_press_count()  # Still accumulated value

print(f"get_presses(): {presses_a2} (still 0)")
print(f"get_press_count(): {count_a2} (accumulated maintained)")
```

## Advanced Button Patterns

### State-Based Button Handling

Track button states for more complex interactions:

```python
from codibit import *

button_a_pressed = False
counter = 0

print("Button A: increment, Button B: decrement")
print(f"Counter: {counter}")

while True:
    # Button A press detection
    if button_a.is_pressed():
        button_a_pressed = True
        counter += 1
        print(f"Counter: {counter}")

    # Button A release detection
    if button_a.is_released():
        button_a_pressed = False
        print("Button A released")

    # Button B press detection
    if button_b.is_pressed():
        counter -= 1
        print(f"Counter: {counter}")

    # Button B release detection
    if button_b.is_released():
        print("Button B released")

    sleep(0.01)
```

### Simultaneous Button Detection

Detect when multiple buttons are pressed at the same time:

```python
from codibit import *

print("Press both buttons A and B together...")

while True:
    # Check if both buttons are being held simultaneously
    if button_a.is_holding() and button_b.is_holding():
        print("Both buttons are being held!")

    # Individual button press detection
    if button_a.is_pressed():
        print("Button A pressed")

    if button_b.is_pressed():
        print("Button B pressed")

    # Individual button release detection
    if button_a.is_released():
        print("Button A released")

    if button_b.is_released():
        print("Button B released")

    sleep(0.01)
```

## Simple Menu System

Create a basic menu system using buttons.

```python
from codibit import *

menu_items = ["Start Game", "Settings", "Exit"]
current_item = 0

def show_menu():
    print(f"Menu: {menu_items[current_item]}")
    print("A: Select, B: Next")

# Show initial menu
show_menu()

while True:
    # Menu selection
    if button_a.is_pressed():
        print(f"Selected: {menu_items[current_item]}")
        sleep(1)
        show_menu()

    # Navigate menu
    if button_b.is_pressed():
        current_item = (current_item + 1) % len(menu_items)
        show_menu()

    sleep(0.01)
```

## Tips and Best Practices

### 1. Choose the Right Method

- **`is_pressed()`**: Detect the moment a button is pressed (one-time event)
- **`is_holding()`**: Detect continuous button holding
- **`is_released()`**: Detect the moment a button is released (one-time event)
- **`get_presses()`**: Periodic counting with counter reset
- **`get_press_count()`**: Real-time cumulative counting without reset

### 2. Performance Optimization

Always include small delays in your loops:
```python
sleep(0.01)  # 10ms - recommended for most cases
sleep(0.05)  # 50ms - for stability-focused applications
```

### 3. Button State Flow

The typical button interaction flow:
1. `is_pressed()` - Button is pressed
2. `is_holding()` - Button is being held (continuous)
3. `is_released()` - Button is released

### 4. Debouncing

The buttons automatically handle debouncing with a 50ms delay. You can adjust this:
```python
button_a = Button(BUTTON_A_PIN, debounce_ms=30)  # Faster response
button_b = Button(BUTTON_B_PIN, debounce_ms=100)  # More stable
```

### 5. Event Handling Best Practices

```python
# ✅ Good: Check all states in order
if button_a.is_pressed():
    print("Pressed!")

if button_a.is_holding():
    print("Holding...")

if button_a.is_released():
    print("Released!")

# ❌ Avoid: Missing state checks
if button_a.is_holding():  # Should check is_pressed() first
    print("Holding...")
```

### 6. Counter Management

- **`get_presses()`**: Resets counter, suitable for periodic counting
- **`get_press_count()`**: Maintains counter, suitable for cumulative statistics

### 7. Memory Efficiency

For MicroPython environments, use appropriate sleep intervals to balance responsiveness and CPU usage.