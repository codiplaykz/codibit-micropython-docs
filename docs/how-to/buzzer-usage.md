# How to use buzzer

Learn how to use the built-in buzzer on the Codi:bit board to create sounds, melodies, and music.

## Basic Setup

The buzzer is available as a global instance:

```python
from codibit import buzzer
```

## Playing Simple Tones

### Basic Tone

Play a simple tone with a specific frequency. The tone will automatically stop after the specified duration:

```python
# Play A4 note for 1 second (auto-stops)
buzzer.play_tone(440, 1000)

# Play a low frequency tone
buzzer.play_tone(200, 500)

# Play a high frequency tone
buzzer.play_tone(1000, 2000)
```

### Frequency Examples

Common musical frequencies:

```python
# Musical note frequencies (Hz)
C4 = 262   # Middle C
D4 = 294
E4 = 330
F4 = 349
G4 = 392
A4 = 440   # Standard tuning reference
B4 = 494
C5 = 523

# Play a simple C major scale
notes = [C4, D4, E4, F4, G4, A4, B4, C5]
for note in notes:
    buzzer.play_tone(note, 500)
    time.sleep(0.1)
```

## Playing Melodies

### Using Note Strings

Musical notes are expressed in the format `NOTE[octave][:duration]`:

```python
# Play C major scale
buzzer.play_melody(['c4:4', 'd4:4', 'e4:4', 'f4:4', 'g4:4', 'a4:4', 'b4:4', 'c5:8'], tempo=120)

# Simple melody
melody = ['c4:4', 'e4:4', 'g4:8']
buzzer.play_melody(melody, tempo=100)
```

### Custom Melody

Create and play your own melody:

```python
# Create a simple melody (C major scale)
melody = [
    'c4:4',  # C
    'd4:4',  # D
    'e4:4',  # E
    'f4:4',  # F
    'g4:4',  # G
    'a4:4',  # A
    'b4:4',  # B
    'c5:8'   # C (octave higher, longer note)
]

# Play the melody with 120 BPM tempo
buzzer.play_melody(melody, tempo=120)
```

### Chord Progression

Play a chord progression:

```python
# C major chord progression
chord_progression = [
    'c4:2', 'e4:2', 'g4:4',  # C major
    'f4:2', 'a4:2', 'c5:4',  # F major
    'g4:2', 'b4:2', 'd5:4',  # G major
    'c5:8'  # Final C
]

buzzer.play_melody(chord_progression, tempo=140)
```

### Famous Melodies

Play well-known melodies:

```python
# Beethoven's 5th Symphony opening
beethoven_5th = [
    'r4:2', 'g', 'g', 'g', 'eb:8', 'r:2', 'f', 'f', 'f', 'd:8'
]

buzzer.play_melody(beethoven_5th, tempo=120)

# Jingle Bells
jingle_bells = [
    'e4:4', 'e4:4', 'e4:8', 'e4:4', 'e4:4', 'e4:8',
    'e4:4', 'g4:4', 'c4:4', 'd4:4', 'e4:8'
]

buzzer.play_melody(jingle_bells, tempo=150)
```

## Playing Built-in Songs

Play predefined songs using the Melody class:

```python
from codibit.builtin.buzzer import Melody

# Happy Birthday
buzzer.play_melody(Melody.HAPPY_BIRTHDAY, tempo=200)

# Twinkle Twinkle Little Star
buzzer.play_melody(Melody.TWINKLE_TWINKLE, tempo=180)

# Mary Had a Little Lamb
buzzer.play_melody(Melody.MARY_HAD_A_LITTLE_LAMB, tempo=170)
```

## Playing Predefined Sounds

### Practical Sounds

Play useful sounds for different purposes:

```python
from codibit import *

# Basic sounds
buzzer.play_sound(Sound.BEEP)        # Basic beep
buzzer.play_sound(Sound.CHIME)       # Chime bell
buzzer.play_sound(Sound.ALERT)       # Warning sound
buzzer.play_sound(Sound.NOTIFICATION) # Notification sound
buzzer.play_sound(Sound.SUCCESS)     # Success sound
buzzer.play_sound(Sound.ERROR)       # Error sound
buzzer.play_sound(Sound.CLICK)       # Click sound
buzzer.play_sound(Sound.TICK)        # Tick sound
```

### Drum Sounds

Play drum sounds for rhythm and percussion:

```python
from codibit import *

# Basic drum kit
buzzer.play_sound(Sound.DRUM_KICK)      # Kick drum
buzzer.play_sound(Sound.DRUM_SNARE)     # Snare drum
buzzer.play_sound(Sound.DRUM_HIHAT)     # Hi-hat
buzzer.play_sound(Sound.DRUM_CRASH)     # Crash cymbal

# Additional drums
buzzer.play_sound(Sound.DRUM_TOM1)      # Tom 1
buzzer.play_sound(Sound.DRUM_TOM2)      # Tom 2
buzzer.play_sound(Sound.DRUM_TOM3)      # Tom 3
buzzer.play_sound(Sound.DRUM_FLOOR_TOM) # Floor tom

# Cymbals
buzzer.play_sound(Sound.DRUM_RIDE)      # Ride cymbal
buzzer.play_sound(Sound.DRUM_CHINA)     # China cymbal
buzzer.play_sound(Sound.DRUM_SPLASH)    # Splash cymbal

# Hi-hat variations
buzzer.play_sound(Sound.DRUM_HIHAT_OPEN)   # Open hi-hat
buzzer.play_sound(Sound.DRUM_HIHAT_CLOSED) # Closed hi-hat

# Percussion
buzzer.play_sound(Sound.DRUM_COWBELL)   # Cowbell
buzzer.play_sound(Sound.DRUM_CLAP)      # Clap
buzzer.play_sound(Sound.DRUM_SHAKER)    # Shaker
```

### Creating Drum Patterns

Create simple drum patterns:

```python
from codibit import *
import time

# Simple rock beat
def play_rock_beat():
    for _ in range(4):  # 4 measures
        # Beat 1
        buzzer.play_sound(Sound.DRUM_KICK)
        time.sleep(0.1)
        buzzer.play_sound(Sound.DRUM_HIHAT)
        time.sleep(0.1)

        # Beat 2
        buzzer.play_sound(Sound.DRUM_SNARE)
        time.sleep(0.1)
        buzzer.play_sound(Sound.DRUM_HIHAT)
        time.sleep(0.1)

        # Beat 3
        buzzer.play_sound(Sound.DRUM_KICK)
        time.sleep(0.1)
        buzzer.play_sound(Sound.DRUM_HIHAT)
        time.sleep(0.1)

        # Beat 4
        buzzer.play_sound(Sound.DRUM_SNARE)
        time.sleep(0.1)
        buzzer.play_sound(Sound.DRUM_HIHAT)
        time.sleep(0.1)

play_rock_beat()
```

## Tempo Control

Set and adjust the tempo for melodies:

```python
# Set tempo
buzzer.set_tempo(bpm=180)  # Fast tempo
buzzer.set_tempo(bpm=60)   # Slow tempo

# Check current tempo
ticks, bpm = buzzer.get_tempo()
print(f"Current tempo: {bpm} BPM, {ticks} ticks")

# Play the same melody at different tempos
melody = ['c4:4', 'd4:4', 'e4:4', 'f4:4', 'g4:8']

buzzer.set_tempo(bpm=60)
buzzer.play_melody(melody)  # Slow

buzzer.set_tempo(bpm=120)
buzzer.play_melody(melody)  # Normal

buzzer.set_tempo(bpm=180)
buzzer.play_melody(melody)  # Fast
```

## Volume Control

Adjust the buzzer volume:

```python
# Set volume levels
buzzer.set_volume(0)  # Mute
buzzer.set_volume(1)  # Low
buzzer.set_volume(2)  # Medium (default)
buzzer.set_volume(3)  # High

# Play a tone with high volume
buzzer.set_volume(3)
buzzer.play_tone(440, 1000)

# Create a volume fade effect
for volume in range(4):
    buzzer.set_volume(volume)
    buzzer.play_tone(440, 500)
    time.sleep(0.1)
```

## Stopping Sounds

Stop the current sound:

```python
# Start a long tone
buzzer.play_tone(440, 10000)  # 10 seconds

# Stop it immediately
buzzer.stop()

# Stop a melody
buzzer.play_melody(['c4:4', 'd4:4', 'e4:4', 'f4:4', 'g4:8'])
buzzer.stop()  # Stop the melody
```

## Complete Example

Here's a complete example that demonstrates various buzzer features:

```python
from codibit import *
import time

print("=== Codi:bit Buzzer Demo ===")

# Volume test
print("Testing volume levels...")
for volume in range(4):
    buzzer.set_volume(volume)
    buzzer.play_tone(440, 500)
    time.sleep(0.5)

# Note string test
print("Playing C major scale...")
melody = ['c4:4', 'd4:4', 'e4:4', 'f4:4', 'g4:4', 'a4:4', 'b4:4', 'c5:8']
buzzer.play_melody(melody, tempo=120)

# Practical sounds test
print("Playing practical sounds...")
sounds = [Sound.BEEP, Sound.CHIME, Sound.ALERT, Sound.SUCCESS]
for sound in sounds:
    buzzer.play_sound(sound)
    time.sleep(0.5)

# Drum sounds test
print("Playing drum sounds...")
drums = [Sound.DRUM_KICK, Sound.DRUM_SNARE, Sound.DRUM_HIHAT, Sound.DRUM_CRASH]
for drum in drums:
    buzzer.play_sound(drum)
    time.sleep(0.3)

# Custom melody
print("Playing custom melody...")
melody = ['c4:2', 'e4:2', 'g4:4']
buzzer.play_melody(melody, tempo=120)

# Tempo control test
print("Playing melody at different tempos...")
melody = ['c4:4', 'd4:4', 'e4:4', 'f4:4', 'g4:8']
for bpm in [60, 120, 180]:
    buzzer.set_tempo(bpm=bpm)
    buzzer.play_melody(melody)
    time.sleep(0.5)

# Built-in song
print("Playing Happy Birthday...")
buzzer.play_melody(Melody.HAPPY_BIRTHDAY, tempo=200)

print("Buzzer demonstration complete!")
```

## Musical Notation

### Basic Format

Musical notes are expressed in the format `NOTE[octave][:duration]`:

```python
'c4:4'    # C4 note for 4 ticks
'g'        # G4 note for default duration (4 ticks)
'r:2'      # Rest for 2 ticks
'eb:8'     # E♭4 note for 8 ticks
'f#5:1'    # F#5 note for 1 tick
```

### Supported Notes

- **Basic notes**: `c`, `d`, `e`, `f`, `g`, `a`, `b`
- **Flats**: `cb`, `db`, `eb`, `fb`, `gb`, `ab`, `bb`
- **Sharps**: `c#`, `d#`, `e#`, `f#`, `g#`, `a#`, `b#`
- **Octaves**: 3, 4(default), 5
- **Rest**: `r` (silence)

### Tempo System

- **Default**: 4 ticks, 120 BPM
- **1 tick**: 60000 / BPM / ticks_per_beat milliseconds
- **Default**: 1 tick = 125ms, 1 beat = 500ms

## API Summary

### Core Methods

- `buzzer.play_tone(frequency, duration_ms)` - Play a single tone (auto-stops)
- `buzzer.play_melody(melody, tempo=None)` - Play a melody using note strings
- `buzzer.play_sound(sound_type)` - Play predefined sounds
- `buzzer.stop()` - Stop current sound

### Control Methods

- `buzzer.set_volume(volume)` - Set volume (0-3)
- `buzzer.set_tempo(ticks=4, bpm=120)` - Set tempo
- `buzzer.get_tempo()` - Get current tempo

### Built-in Resources

- `Melody.HAPPY_BIRTHDAY` - Happy Birthday song
- `Melody.TWINKLE_TWINKLE` - Twinkle Twinkle Little Star
- `Melody.MARY_HAD_A_LITTLE_LAMB` - Mary Had a Little Lamb
- `Sound.BEEP`, `Sound.CHIME`, etc. - Practical sounds
- `Sound.DRUM_KICK`, `Sound.DRUM_SNARE`, etc. - Drum sounds

## Tips

1. **Simple and Intuitive**: The API is designed to be simple - no complex parameters like `auto_stop`
2. **Auto-stopping**: All tones automatically stop after their duration
3. **Interrupting**: You can interrupt any melody or song playback with Ctrl+C
4. **Volume Range**: Volume levels range from 0 (mute) to 3 (high)
5. **Tempo**: Tempo is specified in BPM (Beats Per Minute)
6. **Musical Notation**: Use `NOTE[octave][:duration]` format for musical notes
7. **Sound Types**: 8 practical sounds and 16 drum sounds are available
8. **Tick System**: The basic time unit for music is ticks, which length is determined by tempo