# How to use buzzer

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
buzzer.play_tone(440, 1000)
```

### Using Note Strings

Musical notes are expressed in the format `NOTE[octave][:duration]`:

```python
# Play C major scale
buzzer.play_melody(['c4:4', 'd4:4', 'e4:4', 'f4:4', 'g4:4', 'a4:4', 'b4:4', 'c5:8'], tempo=120)
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

### Beethoven's 5th Symphony Opening

Play famous melodies:

```python
# Beethoven's 5th Symphony opening
beethoven_5th = [
    'r4:2', 'g', 'g', 'g', 'eb:8', 'r:2', 'f', 'f', 'f', 'd:8'
]

buzzer.play_melody(beethoven_5th, tempo=120)
```

## Playing Built-in Songs

Play predefined songs:

```python
# Happy Birthday
buzzer.play_song('happy_birthday')

# Twinkle Twinkle Little Star
buzzer.play_song('twinkle')

# Mary Had a Little Lamb
buzzer.play_song('mary')
```

## Tempo Control

Set and adjust the tempo:

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
```

## Stopping Sounds

Stop the current sound:

```python
# Start a long tone
buzzer.play_tone(440, 10000)  # 10 seconds

# Stop it immediately
buzzer.stop()
```

## Complete Example

Here's a complete example that demonstrates various buzzer features:

```python
from codibit import buzzer
from codibit.builtin.buzzer import Sound
import time

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
buzzer.play_song('happy_birthday')

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

## Tips

1. **Interrupting**: You can interrupt any melody or song playback with Ctrl+C
2. **Volume Range**: Volume levels range from 0 (mute) to 3 (high)
3. **Tempo**: Tempo is specified in BPM (Beats Per Minute)
4. **Musical Notation**: Use `NOTE[octave][:duration]` format for musical notes
5. **Sound Types**: 8 practical sounds and 16 drum sounds are available
6. **Tick System**: The basic time unit for music is ticks, which length is determined by tempo