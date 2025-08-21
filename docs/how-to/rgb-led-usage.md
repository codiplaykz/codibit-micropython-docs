# How to use RGB LED

This guide shows you how to use the built-in RGB LED strip on the Codi:bit board.

## Basic Usage

### Import the RGB LED

```python
from codibit import rgb_led
```

### Setting Individual LED Colors

You can set each LED strip to a different color:

```python
# Set each strip to a different color
rgb_led.set_color(0, 255, 0, 0)    # Strip 0: Red
rgb_led.set_color(1, 0, 255, 0)    # Strip 1: Green
rgb_led.set_color(2, 0, 0, 255)    # Strip 2: Blue
rgb_led.show()  # Apply the changes
```

### Getting Current Colors

You can get the current color of any strip:

```python
# Get the current color of strip 0
current_color = rgb_led.get_color(0)
print(f"Strip 0 color: {current_color}")  # Returns (r, g, b) tuple
```

### Setting All LEDs to the Same Color

Set all LED strips to the same color:

```python
# Set all strips to white
rgb_led.set_all_color(255, 255, 255)
rgb_led.show()
```

### Controlling Brightness

Adjust the brightness of individual strips:

```python
# Set strip 0 to red
rgb_led.set_color(0, 255, 0, 0)
# Set strip 0 brightness to 50%
rgb_led.set_brightness(0, 0.5)
rgb_led.show()
```

Or adjust all strips at once:

```python
# Set different colors for each strip
rgb_led.set_color(0, 255, 0, 0)    # Red
rgb_led.set_color(1, 0, 255, 0)    # Green
rgb_led.set_color(2, 0, 0, 255)    # Blue
# Set all to 50% brightness
rgb_led.set_all_brightness(0.5)
rgb_led.show()
```

### Turning Off LEDs

Turn off individual strips:

```python
# Turn off strip 1
rgb_led.turn_off(1)
rgb_led.show()
```

Or turn off all strips:

```python
# Turn off all strips
rgb_led.turn_off_all()
rgb_led.show()
```

## Advanced Examples

### Color Gradient Effect

Create a smooth color transition effect:

```python
import time

def color_gradient():
    """Create a smooth color gradient effect"""

    # Define gradient colors
    colors = [
        (255, 0, 0),    # Red
        (255, 127, 0),  # Orange
        (255, 255, 0),  # Yellow
        (0, 255, 0),    # Green
        (0, 255, 255),  # Cyan
        (0, 0, 255),    # Blue
        (127, 0, 255),  # Purple
        (255, 0, 255),  # Magenta
    ]

    # Smooth transition between colors
    for i in range(len(colors) - 1):
        color1 = colors[i]
        color2 = colors[i + 1]

        # 50 steps for smooth transition
        for step in range(51):
            ratio = step / 50
            r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
            g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
            b = int(color1[2] * (1 - ratio) + color2[2] * ratio)

            rgb_led.set_all_color(r, g, b)
            rgb_led.show()
            time.sleep(0.05)

# Run the gradient effect
color_gradient()
```

### Breathing Effect

Create a breathing effect for standby mode:

```python
import time

def breathing_effect():
    """Create a breathing effect with blue color"""

    base_color = (0, 100, 255)  # Soft blue

    # Increase brightness (0% to 100%)
    for brightness in range(0, 101, 5):
        brightness_ratio = brightness / 100
        r = int(base_color[0] * brightness_ratio)
        g = int(base_color[1] * brightness_ratio)
        b = int(base_color[2] * brightness_ratio)
        rgb_led.set_all_color(r, g, b)
        rgb_led.show()
        time.sleep(0.05)

    # Decrease brightness (100% to 0%)
    for brightness in range(100, -1, -5):
        brightness_ratio = brightness / 100
        r = int(base_color[0] * brightness_ratio)
        g = int(base_color[1] * brightness_ratio)
        b = int(base_color[2] * brightness_ratio)
        rgb_led.set_all_color(r, g, b)
        rgb_led.show()
        time.sleep(0.05)

# Run the breathing effect
breathing_effect()
```

### Sequential LED Control

Turn on LEDs one by one:

```python
import time

def sequential_led():
    """Turn on LEDs sequentially"""

    # Turn off all LEDs first
    rgb_led.turn_off_all()
    rgb_led.show()
    time.sleep(1)

    # Turn on each LED with different colors
    colors = [
        (255, 0, 0),    # Red
        (0, 255, 0),    # Green
        (0, 0, 255),    # Blue
    ]

    for i in range(3):
        rgb_led.set_color(i, *colors[i])
        rgb_led.show()
        time.sleep(1)

# Run the sequential LED effect
sequential_led()
```

### Color Memory Effect

Remember and restore colors:

```python
def color_memory_demo():
    """Demonstrate color memory functionality"""

    # Set different colors for each strip
    rgb_led.set_color(0, 255, 0, 0)    # Red
    rgb_led.set_color(1, 0, 255, 0)    # Green
    rgb_led.set_color(2, 0, 0, 255)    # Blue
    rgb_led.show()

    # Store current colors
    stored_colors = []
    for i in range(3):
        stored_colors.append(rgb_led.get_color(i))

    print("Stored colors:", stored_colors)

    # Turn off all strips
    rgb_led.turn_off_all()
    rgb_led.show()
    time.sleep(2)

    # Restore colors
    for i, color in enumerate(stored_colors):
        rgb_led.set_color(i, *color)
    rgb_led.show()

# Run color memory demo
color_memory_demo()
```

## Common Color Values

Here are some common RGB color values you can use:

| Color | R | G | B | Description |
|-------|---|---|---|-------------|
| Red | 255 | 0 | 0 | Pure red |
| Green | 0 | 255 | 0 | Pure green |
| Blue | 0 | 0 | 255 | Pure blue |
| White | 255 | 255 | 255 | Pure white |
| Yellow | 255 | 255 | 0 | Yellow |
| Magenta | 255 | 0 | 255 | Magenta |
| Cyan | 0 | 255 | 255 | Cyan |
| Orange | 255 | 127 | 0 | Orange |
| Purple | 127 | 0 | 255 | Purple |
| Pink | 255 | 20 | 147 | Pink |

## Troubleshooting

### LEDs Not Turning On

1. **Check the `show()` call**: Make sure you call `rgb_led.show()` after setting colors
2. **Verify pin connection**: Ensure GPIO17 is properly connected
3. **Check power supply**: Make sure the board has sufficient power
4. **Verify neopixel library**: The neopixel library should be available in your MicroPython firmware

### LEDs Too Bright or Too Dim

1. **Adjust brightness**: Use the brightness parameter (0.0-1.0)
2. **Power consumption**: Lower brightness reduces power consumption
3. **Eye comfort**: Use lower brightness for better eye comfort

### Color Not Displaying Correctly

1. **Check RGB values**: Ensure values are between 0-255
2. **Verify color order**: RGB LED uses RGB color order
3. **Test individual strips**: Try setting each strip individually

### Performance Issues

1. **Reduce update frequency**: Increase delay between updates
2. **Simplify effects**: Use fewer color transitions
3. **Memory usage**: Avoid creating large color arrays

## Best Practices

1. **Always call `show()`**: Changes don't apply until you call `show()`
2. **Use appropriate brightness**: Lower brightness saves power
3. **Smooth transitions**: Use small steps for smooth color changes
4. **Error handling**: Wrap LED operations in try-catch blocks
5. **Power management**: Turn off LEDs when not in use

## Example Projects

### Traffic Light Simulator

```python
import time

def traffic_light():
    """Simulate a traffic light"""

    while True:
        # Red light
        rgb_led.set_all_color(255, 0, 0)
        rgb_led.show()
        time.sleep(3)

        # Yellow light
        rgb_led.set_all_color(255, 255, 0)
        rgb_led.show()
        time.sleep(1)

        # Green light
        rgb_led.set_all_color(0, 255, 0)
        rgb_led.show()
        time.sleep(3)

# Run traffic light (Ctrl+C to stop)
traffic_light()
```

### Mood Light

```python
import time

def mood_light():
    """Create a mood lighting effect"""

    colors = [
        (255, 0, 0),    # Red - Energy
        (0, 255, 0),    # Green - Calm
        (0, 0, 255),    # Blue - Relax
        (255, 255, 0),  # Yellow - Happy
        (255, 0, 255),  # Magenta - Creative
    ]

    for color in colors:
        rgb_led.set_all_color(*color)
        rgb_led.set_all_brightness(0.5)  # 50% brightness
        rgb_led.show()
        time.sleep(2)

# Run mood light
mood_light()
```

### Individual Strip Brightness Control

```python
import time

def individual_brightness_demo():
    """Individual strip brightness control demo"""

    # Set different colors for each strip
    rgb_led.set_color(0, 255, 0, 0)    # Red
    rgb_led.set_color(1, 0, 255, 0)    # Green
    rgb_led.set_color(2, 0, 0, 255)    # Blue

    # Set different brightness for each strip
    rgb_led.set_brightness(0, 1.0)   # Strip 0: Maximum brightness
    rgb_led.set_brightness(1, 0.5)   # Strip 1: 50% brightness
    rgb_led.set_brightness(2, 0.25)  # Strip 2: 25% brightness

    rgb_led.show()

# Run individual brightness control demo
individual_brightness_demo()
```