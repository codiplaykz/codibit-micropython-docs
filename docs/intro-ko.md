---
sidebar_position: 1
title: Introduction(소개)
description: Codi:bit MicroPython API 문서
---

# Codi:bit MicroPython API documentation(Codi:bit MicroPython API 문서)

## 📚 문서 구조

이 문서는 효과적인 기술 문서 작성을 위한 [Diátaxis 프레임워크](https://diataxis.fr/)를 사용하여 구성되었습니다:

### 🎯 **튜토리얼**
**목적**: 학습 - 사용자가 처음부터 끝까지 따라할 수 있는 완전한 학습 경로

- **시작하기**: Codi:bit 소개, 첫 번째 프로그램, 기본 개념
- **기본 프로젝트**: LED 제어, 버튼 처리, 디스플레이 사용법
- **센서 프로젝트**: 조도 감지, 소리 감지, 환경 모니터링
- **고급 프로젝트**: 다중 센서 응용, 인터랙티브 프로젝트

### 🔧 **사용법 가이드**
**목적**: 작업 - 특정 작업을 수행하는 구체적인 방법

- **[버튼 사용법](how-to/button-usage-ko)**: 버튼 누름 감지 및 사용자 입력 처리 방법
- **[조도 변화 감지](how-to/light-change-detection-ko)**: 조도 레벨 변화 감지 및 대응 방법
- **[마이크 사용법](how-to/microphone-usage-ko)**: 소리 감지를 위한 마이크 센서 사용법

### 📖 **참조 문서**
**목적**: 정보 - API 및 기술 세부사항

- **[내장 센서 API](reference/builtin-ko)**: 모든 내장 센서의 완전한 API 문서
- **하드웨어 참조**: 핀 할당, 사양, 전력 관리
- **시스템 참조**: MicroPython 및 ESP32 관련 정보

### 📚 **설명**
**목적**: 이해 - 개념 및 배경 지식

- **개념**: 센서 원리, 통신 프로토콜, 프로그래밍 개념
- **아키텍처**: 라이브러리 구조, 하드웨어 아키텍처, 성능 최적화
- **교육**: 교육 철학, STEM 교육

## 🚀 시작하기

### 빠른 시작

```python
from codibit import *

# 텍스트 표시
display.draw_text("안녕하세요 Codi:bit!", 0, 0)

# 버튼 상태 읽기
if button_a.is_pressed():
    print("버튼 A가 눌렸습니다!")

# 조도 센서 읽기
light_level = light.get_level()
print(f"조도 레벨: {light_level}")

# 마이크 읽기
sound_level = microphone.get_level()
print(f"소리 레벨: {sound_level}")
```

### 하드웨어 개요

Codi:bit는 ESP32 기반 교육용 마이크로컨트롤러 보드로 다음과 같은 구성요소를 가지고 있습니다:

- **디스플레이**: SH1106 OLED (128x64 픽셀)
- **센서**:
  - MMC5603NJ 자기장 센서
  - QMI8658C 6축 IMU (가속도계, 자이로스코프)
  - ALS-PT19 조도 센서
  - 마이크 센서
- **입출력**:
  - WS2812B RGB LED
  - 부저
  - 2개의 버튼 (A와 B)
- **연결성**: WiFi, 블루투스

## 📁 문서 섹션

### 튜토리얼 (학습)
- **[시작하기](tutorials/intro)**: 하드웨어 소개 및 첫 번째 프로그램
- **기본 프로젝트**: LED 깜빡임, 버튼 응답, 디스플레이 사용법
- **센서 프로젝트**: 조도 감지, 소리 감지, 환경 모니터링
- **고급 프로젝트**: 다중 센서 응용, 인터랙티브 프로젝트

### 사용법 가이드 (작업)
- **[버튼 사용법](how-to/button-usage-ko)**: 버튼 누름 감지 및 사용자 입력 처리
- **[조도 변화 감지](how-to/light-change-detection-ko)**: 조도 레벨 변화 감지 및 대응
- **[마이크 사용법](how-to/microphone-usage-ko)**: 소리 감지를 위한 마이크 센서 사용

### 참조 문서 (정보)
- **[내장 센서 API](reference/builtin-ko)**: 모든 센서의 완전한 API 문서
- **하드웨어 참조**: 핀 매핑 및 사양
- **시스템 참조**: MicroPython 및 ESP32 세부사항

### 설명 (이해)
- **[개념](explanation/intro)**: 센서 원리 및 프로그래밍 개념
- **아키텍처**: 라이브러리 설계 및 하드웨어 아키텍처
- **교육**: 교육적 접근 및 STEM 학습

## 🎯 학습 경로

### 초보자를 위한
1. **[시작하기](tutorials/intro)**부터 시작
2. 사용자 입력을 위한 **[버튼 사용법](how-to/button-usage-ko)** 학습
3. 센서 사용을 위한 **[조도 변화 감지](how-to/light-change-detection-ko)** 탐색
4. 소리 감지를 위한 **[마이크 사용법](how-to/microphone-usage-ko)** 시도

### 개발자를 위한
1. 함수 세부사항을 위한 **[내장 센서 API](reference/builtin-ko)** 확인
2. 핀 할당을 위한 하드웨어 사양 검토
3. 시스템 설계를 위한 라이브러리 아키텍처 이해

### 교육자를 위한
1. 교육 철학 및 STEM 개념 읽기
2. 교실 활동을 위한 튜토리얼 탐색
3. 실습 학습을 위한 예제 사용

## 🔗 빠른 링크

- **[내장 센서 API](reference/builtin-ko)**: 완전한 API 참조
- **[버튼 사용법 가이드](how-to/button-usage-ko)**: 버튼 사용법
- **[조도 감지 가이드](how-to/light-change-detection-ko)**: 조도 변화 감지법
- **[마이크 사용법 가이드](how-to/microphone-usage-ko)**: 마이크 사용법
- **[예제](https://github.com/codiplaykz/codibit-micropython/tree/main/examples)**: 코드 예제

## 📚 코드 예제

### 버튼 예제
```python
from codibit import *

while True:
    if button_a.is_pressed():
        print("버튼 A가 눌렸습니다!")
    if button_b.is_pressed():
        print("버튼 B가 눌렸습니다!")
    sleep(0.1)
```

### 조도 센서 예제
```python
from codibit import *

while True:
    level = light.get_level()
    print(f"조도 레벨: {level}")
    sleep(1)
```

### 마이크 예제
```python
from codibit import *

while True:
    if microphone.is_loud():
        print("큰 소리가 감지되었습니다!")
    sleep(0.1)
```

## 📚 추가 자료

- **[GitHub 저장소](https://github.com/codiplaykz/codibit-micropython)**: 소스 코드 및 이슈
- **[MicroPython 문서](https://docs.micropython.org/)**: MicroPython 참조
- **[ESP32 문서](https://docs.espressif.com/projects/esp-idf/)**: ESP32 기술 세부사항

---

**학습 시작**: Codi:bit 하드웨어에 대해 배우고 첫 번째 프로그램을 만들기 위해 [시작하기](tutorials/intro)부터 시작하세요!
