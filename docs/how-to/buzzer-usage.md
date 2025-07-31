# Buzzer Usage Guide

Learn how to use the built-in buzzer on the Codi:bit board to create sounds, melodies, and music.

## Basic Setup

The buzzer is available as a global instance:

```python
from codibit import buzzer
```

## Playing Simple Tones

### Basic Tone

Play a simple tone with a specific frequency:

```python
# Play A4 note for 1 second
buzzer.play_tone(Note.A4, 1000)
```

### Using Note Constants

Use predefined note constants for standard musical frequencies:

```python
from codibit.builtin.buzzer import Note

# Play C major scale
buzzer.play_tone(Note.C4, 500)  # C
buzzer.play_tone(Note.D4, 500)  # D
buzzer.play_tone(Note.E4, 500)  # E
buzzer.play_tone(Note.F4, 500)  # F
buzzer.play_tone(Note.G4, 500)  # G
buzzer.play_tone(Note.A4, 500)  # A
buzzer.play_tone(Note.B4, 500)  # B
buzzer.play_tone(Note.C5, 500)  # C (octave higher)
```

## Playing Predefined Sounds

### Practical Sounds

Play useful sounds for different purposes:

```python
from codibit.builtin.buzzer import Sound

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
from codibit.builtin.buzzer import Sound

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

## Playing Melodies

### Custom Melody

Create and play your own melody:

```python
from codibit.builtin.buzzer import Note

# Create a simple melody (C major scale)
melody = [
    (Note.C4, 300),  # C
    (Note.D4, 300),  # D
    (Note.E4, 300),  # E
    (Note.F4, 300),  # F
    (Note.G4, 300),  # G
    (Note.A4, 300),  # A
    (Note.B4, 300),  # B
    (Note.C5, 600)   # C (octave higher, longer note)
]

# Play the melody with 120 BPM tempo
buzzer.play_melody(melody, tempo=120)
```

### Chord Progression

Play a chord progression:

```python
from codibit.builtin.buzzer import Note

# C major chord progression
chord_progression = [
    (Note.C4, 200), (Note.E4, 200), (Note.G4, 400),  # C major
    (Note.F4, 200), (Note.A4, 200), (Note.C5, 400),  # F major
    (Note.G4, 200), (Note.B4, 200), (Note.D5, 400),  # G major
    (Note.C5, 800)  # Final C
]

buzzer.play_melody(chord_progression, tempo=140)
```

## Playing Built-in Songs

Play predefined songs:

```python
# Happy Birthday
buzzer.play_song(Melody.HAPPY_BIRTHDAY)

# Twinkle Twinkle Little Star
buzzer.play_song(Melody.TWINKLE_TWINKLE)

# Mary Had a Little Lamb
buzzer.play_song(Melody.MARY_HAD_A_LITTLE_LAMB)
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
buzzer.play_tone(Note.A4, 1000)
```

## Stopping Sounds

Stop the current sound:

```python
# Start a long tone
buzzer.play_tone(Note.A4, 10000)  # 10 seconds

# Stop it immediately
buzzer.stop()
```

## Complete Example

Here's a complete example that demonstrates various buzzer features:

```python
from codibit import buzzer
from codibit.builtin.buzzer import Note, Sound
import time

# Volume test
print("Testing volume levels...")
for volume in range(4):
    buzzer.set_volume(volume)
    buzzer.play_tone(Note.A4, 500)
    time.sleep(0.5)

# Note constants test
print("Playing C major scale...")
notes = [Note.C4, Note.D4, Note.E4, Note.F4, Note.G4, Note.A4, Note.B4, Note.C5]
for note in notes:
    buzzer.play_tone(note, 300)
    time.sleep(0.1)

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
melody = [(Note.C4, 200), (Note.E4, 200), (Note.G4, 400)]
buzzer.play_melody(melody, tempo=120)

# Built-in song
print("Playing Happy Birthday...")
buzzer.play_song(Melody.HAPPY_BIRTHDAY)

print("Buzzer demonstration complete!")
```

## Tips

1. **Interrupting**: You can interrupt any melody or song playback with Ctrl+C
2. **Volume Range**: Volume levels range from 0 (mute) to 3 (high)
3. **Tempo**: Tempo is specified in BPM (Beats Per Minute)
4. **Note Constants**: Use Note class constants for standard musical frequencies
5. **Sound Types**: 8 practical sounds and 16 drum sounds are available