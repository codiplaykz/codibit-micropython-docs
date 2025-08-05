# Display Usage Guide

This guide explains how to use the Codi:bit display with the new buffer-based API.

## Overview

The Codi:bit display uses a buffer-based approach where drawing commands are stored in an internal buffer and then output to the screen using the `show()` function. This approach provides better performance and more control over the display.

## Basic Usage Pattern

```python
from codibit import display

# 1. Clear the screen
display.clear()

# 2. Perform drawing operations
display.draw_text("Hello", 0, 0)
display.draw_circle(32, 32, 10)

# 3. Output to screen
display.show()
```

## Drawing Text

### Basic Text Drawing

```python
# Draw text at position (0, 0)
display.draw_text("Hello", 0, 0)
display.show()
```

### Multiple Lines

```python
display.draw_text("Line 1", 0, 0)
display.draw_text("Line 2", 0, 10)
display.draw_text("Line 3", 0, 20)
display.show()
```

### Text Positioning

```python
# Center text horizontally
text = "Hello"
x = (128 - len(text) * 6) // 2  # Approximate character width
display.draw_text(text, x, 0)
display.show()
```

## Drawing Shapes

### Rectangles

```python
# Empty rectangle
display.draw_rectangle(10, 10, 20, 15)

# Filled rectangle
display.draw_rectangle(40, 10, 20, 15, fill=True)
display.show()
```

### Circles

```python
# Empty circle
display.draw_circle(32, 32, 10)

# Filled circle
display.draw_circle(64, 32, 8, fill=True)
display.show()
```

### Lines

```python
# Draw a cross
display.draw_line(0, 0, 50, 50)
display.draw_line(0, 50, 50, 0)
display.show()
```

### Triangles

```python
# Empty triangle
display.draw_triangle(10, 10, 20, 40, 40, 40)

# Filled triangle
display.draw_triangle(50, 10, 60, 40, 80, 40, fill=True)
display.show()
```

## Working with Images

### Built-in Icons

```python
from codibit import Image

# Draw built-in icons
display.draw_image(Image.HEART, 0, 0)
display.draw_image(Image.HAPPY, 20, 0)
display.draw_image(Image.SAD, 40, 0)
display.show()
```

### Icon Scaling

```python
# Draw icons at different scales
display.draw_icon('HEART', 0, 0, scale=1)    # 5x5
display.draw_icon('HAPPY', 20, 0, scale=2)   # 10x10
display.draw_icon('SAD', 50, 0, scale=3)     # 15x15
display.show()
```

### Custom Images

```python
# Create custom image from string
custom = Image('90009:09090:00900:09090:90009:')
display.draw_image(custom, 0, 20)
display.show()
```

## Pixel-Level Control

### Setting Individual Pixels

```python
# Draw a simple pattern
for i in range(0, 128, 2):
    display.set_pixel(i, 32, 1)
display.show()
```

### Reading Pixel States

```python
# Check if a pixel is on
if display.get_pixel(10, 20):
    print("Pixel is on")
else:
    print("Pixel is off")
```

## Performance Optimization

### Batch Drawing Operations

```python
# Efficient: Multiple operations, single show()
display.clear()
display.draw_text("Hello", 0, 0)
display.draw_circle(32, 32, 10)
display.draw_rectangle(10, 10, 20, 15)
display.show()  # Single output operation
```

### Buffer Control for Performance

```python
# For performance optimization: clear_buffer() + multiple operations
display.clear_buffer()  # Clear buffer only, no output
display.draw_text("Hello", 0, 0)
display.draw_circle(32, 32, 10)
display.draw_rectangle(10, 10, 20, 15)
display.show()  # Single output operation

# For immediate feedback: clear() for simple operations
display.clear()  # Clear and output immediately
display.draw_text("Status", 0, 0)
display.show()
```

### Avoid Frequent Updates

```python
# Inefficient: Multiple show() calls
display.draw_text("Hello", 0, 0)
display.show()  # Don't do this
display.draw_circle(32, 32, 10)
display.show()  # Don't do this

# Efficient: Single show() call
display.draw_text("Hello", 0, 0)
display.draw_circle(32, 32, 10)
display.show()  # Do this instead
```

## Common Patterns

### Status Display

```python
def show_status(message, value):
    display.clear()
    display.draw_text(message, 0, 0)
    display.draw_text(str(value), 0, 20)
    display.show()

# Usage
show_status("Temp:", "25C")
```

### Progress Bar

```python
def draw_progress_bar(progress, x=10, y=30, width=100, height=10):
    # Background
    display.draw_rectangle(x, y, width, height, fill=True)
    # Progress
    progress_width = int(width * progress / 100)
    display.draw_rectangle(x, y, progress_width, height, fill=True)
    display.show()

# Usage
draw_progress_bar(75)  # 75% progress
```

### Menu Display

```python
def show_menu(items, selected_index):
    display.clear()
    y = 0
    for i, item in enumerate(items):
        if i == selected_index:
            display.draw_text(f"> {item}", 0, y)
        else:
            display.draw_text(f"  {item}", 0, y)
        y += 10
    display.show()

# Usage
menu_items = ["Option 1", "Option 2", "Option 3"]
show_menu(menu_items, 1)  # Highlight second option
```

## Animation

### Simple Animation

```python
import time

# Animate a moving circle
for x in range(0, 128, 5):
    display.clear()
    display.draw_circle(x, 32, 5)
    display.show()
    time.sleep(0.1)
```

### Blinking Text

```python
import time

# Blinking text
for _ in range(5):
    display.clear()
    display.draw_text("Hello", 0, 0)
    display.show()
    time.sleep(0.5)

    display.clear()
    display.show()
    time.sleep(0.5)
```

## Error Handling

### Safe Drawing

```python
def safe_draw_text(text, x, y):
    try:
        display.draw_text(text, x, y)
        return True
    except:
        return False

# Usage
if safe_draw_text("Hello", 0, 0):
    display.show()
else:
    print("Failed to draw text")
```

## Tips and Best Practices

1. **Always call `show()`**: After drawing operations, always call `show()` to display the content
2. **Clear before drawing**: Use `clear()` to start with a clean screen
3. **Batch operations**: Group multiple drawing operations before calling `show()`
4. **Check coordinates**: Ensure coordinates are within the display bounds (0-127 for x, 0-63 for y)
5. **Use built-in icons**: Leverage the 64 built-in icons for common graphics
6. **Consider performance**: Minimize the number of `show()` calls for better performance
7. **Test visibility**: Ensure text and graphics are visible against the background
8. **Choose clear method**: Use `clear_buffer()` for performance optimization with multiple operations, `clear()` for immediate feedback

## Hardware Limitations

- **Resolution**: 128x64 pixels
- **Color**: Monochrome (white/black only)
- **Pixel values**: Only 0 (off) or 1 (on)
- **Memory**: Limited buffer space, avoid very large images
- **Refresh rate**: Consider the display's refresh capabilities for animations