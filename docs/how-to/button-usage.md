# How to use buttons

This guide shows you how to use the built-in buttons on the Codi:bit board to detect user input.

## Prerequisites

- Basic understanding of Python
- Codi:bit board
- MicroPython environment set up

## Basic Button Press Detection

The simplest way to detect button presses is using the `is_pressed()` method.

```python
from codibit import *
import time

while True:
    # Check if Button A is currently pressed
    if button_a.is_pressed():
        print("Button A is pressed!")

    # Check if Button B is currently pressed
    if button_b.is_pressed():
        print("Button B is pressed!")

    # Small delay to avoid too frequent checks
    time.sleep(0.1)
```

## Detecting Button Press Events

Use `was_pressed()` to detect when a button was pressed and released (button press events).

```python
from codibit import *
import time

print("Press buttons A or B...")

while True:
    # Check if Button A was pressed since last check
    if button_a.was_pressed():
        print("Button A was pressed!")

    # Check if Button B was pressed since last check
    if button_b.was_pressed():
        print("Button B was pressed!")

    # Small delay
    time.sleep(0.1)
```

## Counting Button Presses

The `get_presses()` method returns the total number of button presses and resets the counter.

```python
from codibit import *
import time

print("Press buttons multiple times, then wait 5 seconds for count...")

while True:
    # Wait 5 seconds
    time.sleep(5)

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
import time

print("Press buttons to see real-time accumulated count...")

while True:
    # Get accumulated Button A press count
    total_a = button_a.get_press_count()

    # Get accumulated Button B press count
    total_b = button_b.get_press_count()

    # Real-time display
    print(f"\rTotal presses - A: {total_a}, B: {total_b}", end="")

    time.sleep(0.1)
```

## get_presses() vs get_press_count() Comparison

It's important to understand the difference between these two methods:

```python
from codibit import *
import time

print("Press buttons multiple times...")
time.sleep(3)

# First check
presses_a = button_a.get_presses()  # Counter is reset
count_a = button_a.get_press_count()  # Counter is not reset

print(f"get_presses(): {presses_a} (reset)")
print(f"get_press_count(): {count_a} (accumulated)")

time.sleep(2)

# Second check
presses_a2 = button_a.get_presses()  # 0 (already reset)
count_a2 = button_a.get_press_count()  # Still accumulated value

print(f"get_presses(): {presses_a2} (still 0)")
print(f"get_press_count(): {count_a2} (accumulated maintained)")
```

## Different Responses for Each Button

You can create different behaviors for each button.

```python
from codibit import *
import time

counter = 0
print("Button A: increment, Button B: decrement")
print(f"Counter: {counter}")

while True:
    if button_a.was_pressed():
        counter += 1
        print(f"Counter: {counter}")

    if button_b.was_pressed():
        counter -= 1
        print(f"Counter: {counter}")

    time.sleep(0.1)
```

## Combining Button States

You can check multiple buttons at the same time.

```python
from codibit import *
import time

print("Press both buttons A and B together...")

while True:
    # Check if both buttons are pressed simultaneously
    if button_a.is_pressed() and button_b.is_pressed():
        print("Both buttons are pressed!")

    # Check if either button was pressed
    elif button_a.was_pressed() or button_b.was_pressed():
        if button_a.was_pressed():
            print("Only Button A was pressed")
        if button_b.was_pressed():
            print("Only Button B was pressed")

    time.sleep(0.1)
```

## Simple Menu System

Create a basic menu system using buttons.

```python
from codibit import *
import time

menu_items = ["Start Game", "Settings", "Exit"]
current_item = 0

def show_menu():
    print(f"Menu: {menu_items[current_item]}")
    print("A: Select, B: Next")

# Show initial menu
show_menu()

while True:
    if button_a.was_pressed():
        # Select current menu item
        print(f"Selected: {menu_items[current_item]}")
        time.sleep(1)
        show_menu()

    if button_b.was_pressed():
        # Move to next menu item
        current_item = (current_item + 1) % len(menu_items)
        show_menu()

    time.sleep(0.1)
```

## Tips and Best Practices

### 1. Choose the Right Method

- Use `is_pressed()` for continuous actions (e.g., holding a button)
- Use `was_pressed()` for single events (e.g., menu selection)
- Use `get_presses()` for periodic counting (e.g., check every 5 seconds)
- Use `get_press_count()` for real-time cumulative counting (e.g., total press tracking)

### 2. Add Delays

Always include small delays in your loops to avoid overwhelming the output and to allow for proper button debouncing.

### 3. Button Combinations

Remember that `is_pressed()` checks the current state, while `was_pressed()` checks for events since the last call.

### 4. Debouncing

The buttons automatically handle debouncing with a 50ms delay, so you don't need to worry about button bounce.

### 5. Counter Management

- `get_presses()`: Resets the counter, suitable for periodic counting
- `get_press_count()`: Does not reset the counter, suitable for cumulative statistics