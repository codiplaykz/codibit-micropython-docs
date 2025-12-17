# Light Sensor Hardware

Hardware specifications for the ambient light sensor on the Codi:bit board.

## Sensor Model

- **Model**: EVERLIGHT ALS-PT19-315C
- **Type**: Phototransistor (Surface Mount)
- **Spectrum**: Close to human eye response (Peak 630nm)

## Circuit Configuration

- **Connection**: Common Collector (Emitter Follower)
- **Power Supply**: 3.3V
- **Output Pin**: ESP32 IO39 (SENSOR_VN)
- **Load Resistor (R30)**: 8.2 kΩ
- **Filter Capacitor (C44)**: 1 µF (Hardware Low-pass Filter)
- **Pull-up/Bias (R33)**: 10 MΩ (Negligible parallel resistance)

## ADC Settings

- **Voltage Range**: 0V ~ approx 2.9V (Saturation Voltage = Vcc - 0.4V)
- **Attenuation**: ATTN_11DB (0~3.3V range)
- **Resolution**: 12-bit (0-4095)
- **Measurement Limit**: Maximum approximately 2,350 Lux

## Calibration Data

- **Test Condition**: Vce = 5V, Ev = 100 Lux (White LED/Fluorescent)
- **Typical Light Current (I_ph)**: 15 µA @ 100 Lux
- **Sensitivity Factor**: ~6.67 Lux per 1 µA (100 / 15)

## Measurement Limits

- **Maximum Measurable Illuminance**:
  - Max Current = 2.9V / 8200Ω ≈ 353 µA
  - Max Lux ≈ 353 µA * 6.67 ≈ 2,350 Lux
- **Direct Sunlight**: >10,000 Lux will immediately saturate the sensor
- **Linearity**: Output is linear across wide illumination range

## Notes

1. **ADC Attenuation**: ADC attenuation (11dB) is required to measure > 1.1V
2. **Saturation**: Direct sunlight immediately saturates the sensor, making accurate measurement impossible
3. **Noise**: Noise levels below 0.005V are automatically ignored
4. **Sampling**: Average sampling (default 8 samples, 2ms interval) is used for accurate measurement
