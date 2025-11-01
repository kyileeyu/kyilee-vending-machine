# Vending Machine 🥤

> React + TypeScript + Emotion + Framer Motion을 활용한 모던 키오스크 스타일 자판기 UI

## 개요

TDD 방식으로 구현한 자판기 시스템입니다. 핵심 비즈니스 로직을 먼저 테스트 코드로 작성하고, 실제 코드를 구현한 후, 모던한 UI로 완성했습니다.

## 주요 특징

- ✅ **TDD 개발**: 테스트 주도 개발로 안정적인 비즈니스 로직 구현
- ✅ **타입 안전성**: TypeScript로 런타임 에러 최소화
- ✅ **컴포넌트 분리**: 단일 책임 원칙에 따른 명확한 컴포넌트 구조
- ✅ **상태 관리**: Context API를 활용한 중앙 집중식 상태 관리
- ✅ **애니메이션**: Framer Motion으로 부드러운 사용자 경험
- ✅ **디자인 시스템**: Theme 기반 일관된 스타일링

## 기술 스택

- **Frontend**: React 18, TypeScript
- **Styling**: Emotion (CSS-in-JS)
- **Animation**: Framer Motion
- **Testing**: Vitest, Testing Library
- **Build Tool**: Vite

## 프로젝트 구조

```
src/
├── vending-machine/
│   ├── model/              # 비즈니스 로직 (순수 함수)
│   │   ├── VendingMachine.ts
│   │   ├── CashInventory.ts
│   │   └── type.ts
│   ├── context/            # 상태 관리
│   │   └── VendingMachineContext.tsx
│   ├── components/         # UI 컴포넌트
│   │   ├── ProductDisplay.tsx
│   │   ├── StatusDisplay.tsx
│   │   ├── PaymentInterface.tsx
│   │   └── ChangeDispenser.tsx
│   ├── hooks/              # 커스텀 훅
│   └── utils/              # 헬퍼 함수
└── shared/
    └── styles/             # 공통 스타일
        ├── theme.ts
        └── common.ts
```

## 핵심 기능

### 1. 상품 선택 및 구매
- 상품 목록 표시 및 선택
- 재고 확인 및 품절 표시
- 잔액 확인 및 구매 가능 여부 검증

### 2. 결제 시스템
- 현금 투입 (100원 ~ 10,000원)
- 잔액 관리
- 거스름돈 계산 및 반환

### 3. 예외 처리
- 잔액 부족 시 에러 메시지
- 재고 부족 시 구매 불가
- 거스름돈 부족 시 환불
- 모든 예외 상황에 대한 명확한 피드백

## 스타일링 철학

### Theme 기반 디자인 시스템
- 모든 색상, 간격, 폰트 크기는 `theme.ts`에서 중앙 관리
- 하드코딩된 값 사용 금지
- 일관된 디자인 유지

### 공통 컴포넌트 재사용
- `common.ts`에 정의된 재사용 가능한 컴포넌트 활용
- `Title`, `Section`, `Grid`, `Card`, `Button` 등
- 중복 코드 최소화

### 컴포넌트별 특수 스타일
- 각 컴포넌트에서만 사용되는 스타일은 로컬에 정의
- 비즈니스 로직과 강하게 결합된 스타일

자세한 스타일링 규칙은 [STYLING_RULES.md](STYLING_RULES.md)를 참고하세요.



## 디자인 컨셉

### 🎨 모던 키오스크 스타일 (참고: Amura Vending Machine UI)
**디자인 레퍼런스**: https://dribbble.com/shots/17321287-Amura-Vending-Machine-UI-UX-Design

- **색상 팔레트**: 파스텔 핑크 (#ff9b9b) + 화이트 (#ffffff) + 네이비/다크그레이 (#1f2937)
- **배경**: 라이트 그레이 (#f5f7fa)
- **스타일**: 모던, 미니멀, 클린
- **카드 디자인**: 넓은 여백, 큰 border-radius, 부드러운 그림자
- **타이포그래피**: 깔끔한 sans-serif, 명확한 계층 구조
- **버튼**: 미니멀한 화이트 박스, hover 시 핑크 테두리
- **애니메이션**: 부드러운 전환 효과, Framer Motion 활용

---

## 개발 가이드

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 테스트 실행
npm test

# 빌드
npm run build
```

### 테스트

```bash
# 전체 테스트 실행
npm test

# 특정 파일 테스트
npm test VendingMachine.test.ts

# 커버리지 확인
npm test -- --coverage
```

## 설계 문서

- [UI_DESIGN.md](UI_DESIGN.md) - 상세한 UI 설계 문서
- [TDD_PLAN.md](TDD_PLAN.md) - TDD 개발 계획
- [STYLING_RULES.md](STYLING_RULES.md) - 스타일링 규칙 및 가이드

---

## 라이선스

MIT

---