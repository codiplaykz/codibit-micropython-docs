# How to use gyroscope(자이로스코프 사용하기)

Codi:bit 자이로스코프 센서를 사용하여 회전과 각속도를 감지하는 방법을 배워보세요.

## 기본 사용법

### 초기화

```python
from codibit import *

# 자이로스코프 초기화
gyroscope = Gyroscope()
```

### 개별 축 읽기

```python
# 각 축의 각속도 읽기
x = gyroscope.get_x()  # 롤 (좌우 회전)
y = gyroscope.get_y()  # 피치 (앞뒤 회전)
z = gyroscope.get_z()  # 요 (시계방향-반시계방향 회전)

print(f"롤: {x}, 피치: {y}, 요: {z}")
```

### 모든 축 한 번에 읽기

```python
# 모든 축 값을 튜플로 가져오기
x, y, z = gyroscope.get_values()
print(f"각속도: X={x}, Y={y}, Z={z}")
```

### 회전 강도 가져오기

```python
# 회전의 크기(전체 회전 강도) 가져오기
strength = gyroscope.get_strength()
print(f"회전 강도: {strength}")
```

## 실용적인 예제

### 1. 회전 감지

보드가 회전할 때 감지하기:

```python
from codibit import *
import time

gyroscope = Gyroscope()

print("보드를 고정한 후 회전시켜보세요...")
print("중단하려면 Ctrl+C를 누르세요")

while True:
    strength = gyroscope.get_strength()

    if strength > 100:  # 회전 감지 임계값
        print(f"회전이 감지되었습니다! 강도: {strength}")
    else:
        print(f"정지 상태. 강도: {strength}")

    time.sleep(0.1)
```

### 2. 축별 회전 감지

특정 축 주위의 회전을 감지하기:

```python
from codibit import *
import time

gyroscope = Gyroscope()

print("보드를 다른 축 주위로 회전시켜보세요...")
print("중단하려면 Ctrl+C를 누르세요")

while True:
    x, y, z = gyroscope.get_values()

    # 각 축의 회전 확인
    if abs(x) > 50:
        direction = "왼쪽" if x > 0 else "오른쪽"
        print(f"롤링 {direction}: {x}")

    if abs(y) > 50:
        direction = "앞쪽" if y > 0 else "뒤쪽"
        print(f"피칭 {direction}: {y}")

    if abs(z) > 50:
        direction = "시계방향" if z > 0 else "반시계방향"
        print(f"요잉 {direction}: {z}")

    time.sleep(0.1)
```



## 팁과 모범 사례

1. **보정**: 자이로스코프는 정지 상태에서 자동으로 0으로 보정됩니다. 측정을 시작하기 전에 몇 초간 보드를 고정하세요.

2. **임계값 선택**: 응용 프로그램에 적절한 임계값을 선택하세요. 낮은 임계값은 더 민감하지만 노이즈에 의해 트리거될 수 있습니다.

3. **샘플링 속도**: 응용 프로그램의 샘플링 속도를 고려하세요. 높은 속도는 더 반응성이 좋지만 더 많은 처리 능력을 사용합니다.

4. **노이즈 필터링**: 여러 샘플을 평균내거나 이동 평균을 사용하여 간단한 노이즈 필터링을 구현하세요.

5. **좌표계**: 좌표계를 기억하세요:
   - X축: 롤 (좌우 회전)
   - Y축: 피치 (앞뒤 회전)
   - Z축: 요 (시계방향-반시계방향 회전)

6. **적분**: 각도 추적을 위해서는 시간에 걸쳐 각속도를 적분해야 하지만, 드리프트 누적에 주의하세요.

7. **결합 센서**: 더 나은 방향 추적을 위해 센서 융합 알고리즘을 사용하여 자이로스코프 데이터와 가속도계 데이터를 결합하세요.

## 문제 해결

**문제**: 자이로스코프 읽기가 노이즈가 많음
- **해결책**: 평균화 또는 필터링 알고리즘 구현
- **해결책**: 환경의 진동이나 움직임 확인

**문제**: 읽기가 항상 0임
- **해결책**: 센서가 올바르게 초기화되었는지 확인
- **해결책**: I2C 연결과 주소 확인

**문제**: 예상치 못한 읽기
- **해결책**: 좌표계가 예상과 일치하는지 확인
- **해결책**: 주변 물체의 자기 간섭 확인

**문제**: 각도 계산에서 드리프트
- **해결책**: 주기적 재보정 구현
- **해결책**: 드리프트 보정을 위해 보완 센서(가속도계) 사용