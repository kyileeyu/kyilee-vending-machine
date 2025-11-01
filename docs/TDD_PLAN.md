# 자판기 프로젝트 TDD 작업 계획서

## 프로젝트 개요

React + TypeScript로 자판기 시스템을 TDD 방식으로 구현

**테스트 작성 원칙: 핵심 기능에 대한 간단한 테스트만 작성**

## TDD 작업 순서

### Phase 1: 테스트 환경 설정 ✅

- [x] vitest 설치 및 설정
- [x] @testing-library/react 설치
- [x] 테스트 실행 스크립트 추가
- [x] vitest.config.ts 작성
- [x] setup.ts 작성
- [x] 샘플 테스트 작성 및 실행 확인

---

### Phase 2: 도메인 모델 타입 정의 (Test-First) ✅

#### 2.1 결제 수단 타입 ✅

**테스트 작성**

- [x] 현금 타입 테스트 (100, 500, 1000, 5000, 10000원)
- [x] 카드 결제 타입 테스트

**구현**

- [x] PaymentMethod 타입 정의
- [x] CashPayment, CardPayment 타입 구현
- [x] CashAmount 리터럴 타입 정의

#### 2.2 상품 타입 ✅

**테스트 작성**

- [x] 상품 정보 구조 테스트 (id, 이름, 가격, 재고)
- [x] 콜라(1100원), 물(600원), 커피(700원) 상품 데이터 검증

**구현**

- [x] Product 타입 정의
- [x] 상품 목록 상수 정의 (constants.ts)

#### 2.3 자판기 상태 타입 ✅

**테스트 작성**

- [x] 자판기 상태 전환 테스트 (대기중 → 입금완료 → 선택완료 → 완료)
- [x] VendingMachineContext 구조 테스트

**구현**

- [x] VendingMachineState 타입 정의
- [x] VendingMachineContext 타입 정의

---

### Phase 3: 비즈니스 로직 TDD 구현 ✅

#### 3.1 결제 처리 로직 ✅

**Red (실패하는 테스트 작성)**

- [x] 현금 투입 시 잔액 증가 테스트
- [x] 여러 현금 누적 테스트
- [x] 유효하지 않은 금액 테스트
- [x] 카드 결제 테스트
- [x] 0원 이하 금액 테스트

**Green (테스트 통과)**

- [x] insertCash 함수 구현
- [x] processCardPayment 함수 구현

#### 3.2 상품 선택 로직 ✅

**Red**

- [x] 구매 가능 여부 체크 테스트
- [x] 잔액 부족 테스트
- [x] 재고 부족 테스트
- [x] 상품 선택 성공 테스트

**Green**

- [x] canPurchase 함수 구현
- [x] selectProduct 함수 구현
- [x] 에러 핸들링 구현

#### 3.3 거스름돈 계산 로직 ✅

**Red**

- [x] 거스름돈 0원 테스트
- [x] 화폐 단위별 계산 테스트
- [x] 다양한 금액 테스트

**Green**

- [x] calculateChange 함수 구현
- [x] 화폐 단위별 거스름돈 계산 알고리즘 구현

---

### Phase 4: 예외 상황 처리 TDD ✅

#### 4.1 에러 타입 정의 ✅

**Red**

- [x] 잔액 부족 에러 테스트
- [x] 재고 부족 에러 테스트
- [x] 잘못된 금액 투입 에러 테스트

**Green**

- [x] VendingMachineError 클래스 구현
- [x] InsufficientBalanceError 클래스 구현
- [x] OutOfStockError 클래스 구현
- [x] InvalidAmountError 클래스 구현
- [x] 기존 서비스 로직에 에러 클래스 적용

**Refactor**

- [x] 에러 메시지 개선 완료

---

### Phase 5: UI 컴포넌트 TDD ✅

#### 5.1 상품 진열 컴포넌트 ✅

**Green**

- [x] ProductDisplay 컴포넌트 구현
- [x] ProductCard 컴포넌트 분리

**Refactor**

- [x] 접근성 개선

#### 5.2 결제 인터페이스 컴포넌트 ✅

**Green**

- [x] PaymentInterface 컴포넌트 구현

**Refactor**

- [x] UI/UX 개선

#### 5.3 거스름돈 출구 컴포넌트 ✅

**Green**

- [x] ChangeDispenser 컴포넌트 구현

**Refactor**

- [x] 애니메이션 추가

#### 5.4 상태 표시 컴포넌트 ✅

**Green**

- [x] StatusDisplay 컴포넌트 구현

**Refactor**

- [x] UI/UX 개선

---

### Phase 6: 자판기 상태 관리 (Context API) ✅

**설계 원칙**

- Context는 정말 필요한 전역 상태만 관리
- 파생 상태는 로컬에서 계산 (useMemo 활용)
- 서버 데이터(products)는 향후 분리 가능하도록 설계

**전역 상태 (Context에서 관리)**

- `balance`: 여러 컴포넌트가 공유
- `selectedProduct`: 여러 컴포넌트가 공유
- `state`: 전체 자판기 상태
- `error`: 에러 메시지

**로컬 상태 (각 컴포넌트에서 관리)**

- `products`: constants에서 import 또는 향후 서버 fetch
- `change`: balance로 계산 가능한 파생 상태 (useMemo)

**Red**

```typescript
describe("VendingMachineContext", () => {
  test('초기 상태는 "대기중"이다');
  test('금액 투입 시 "입금완료" 상태로 변경된다');
  test('상품 선택 시 "선택완료" 상태로 변경된다');
  test('거래 완료 시 "대기중" 상태로 돌아간다');
  test('에러 발생 시 "에러" 상태로 변경된다');
  test("products는 Context가 아닌 각 컴포넌트에서 관리한다");
});
```

**Green**

- [x] VendingMachineContext 구현
- [x] 핵심 전역 상태만 관리 (balance, selectedProduct, state, error)
- [x] 상태 전환 로직 구현
- [x] 비즈니스 로직 통합 (services 호출)

**Refactor**

- [x] products를 Context에서 제거하고 constants 사용
- [x] change를 파생 상태로 변경 (ChangeDispenser에서 useMemo)
- [x] 재고 관리 로직 정리 (향후 서버 API 대응 준비)
- [x] 에러 핸들링 중복 제거 (handleError 공통 함수)
- [x] inventory 서비스 분리 및 OutOfStockError 적용
- [x] 거스름돈 표시 로직 개선 (상품 구매 후에만 표시)

**Note: Context만 사용하는 간결한 설계. Hook 분리 없이 Context가 상태 관리 + 비즈니스 로직 모두 처리**

---

### Phase 7: 카드 결제 기능 추가 (TDD) ✅

**요구사항**

- 카드 결제 버튼 추가 (현금 버튼과 함께 배치)
- 카드 결제 시 잔액 10,000원으로 설정 (모든 상품 구매 가능)
- 외부 API 연동 대비: 3번 중 1번은 실패하도록 구현 (66% 성공률)
- 비동기 처리 및 로딩 상태 표시
- **추가 요구사항**: 카드/현금 결제 상호 배타적 동작
  - 카드 결제 선택 시 현금 투입 불가
  - 현금 투입 시 카드 결제 불가
  - 잔액 표시: 카드 결제 시 "카드결제" 텍스트 표시

#### 7.1 타입 정의 ✅

**Green**

- [x] PaymentGatewayResponse 타입 정의
- [x] CardPaymentError 클래스 정의

**구현**

```typescript
// type.ts
export type PaymentGatewayResponse = {
  success: boolean;
  amount?: number;
  error?: string;
};

// error.ts
export class CardPaymentError extends VendingMachineError {
  constructor(reason: string) {
    super(`카드 결제 실패: ${reason}`);
    this.name = 'CardPaymentError';
  }
}
```

#### 7.2 비즈니스 로직 구현 (TDD) ✅

**Red**

```typescript
describe('requestCardPayment', () => {
  test('성공 시 amount 10000을 반환한다');
  test('실패 시 error 메시지를 반환한다');
  test('비동기로 동작한다');
  test('네트워크 지연을 시뮬레이션한다 (500ms ~ 1500ms)');
  test('3번 중 약 1번은 실패한다 (통계 테스트)');
  test('실패 시 다양한 에러 메시지를 반환한다');
});
```

**Green**

- [x] requestCardPayment 함수 구현 (payment.ts)
- [x] 랜덤 성공/실패 로직 구현 (66% 성공, 34% 실패)
- [x] 네트워크 지연 시뮬레이션 (Promise + setTimeout)
- [x] 다양한 실패 사유 구현 (카드사 승인 거부, 네트워크 오류, 한도 초과)

**구현**

```typescript
// payment.ts
export function requestCardPayment(): Promise<PaymentGatewayResponse> {
  return new Promise((resolve) => {
    const delay = Math.random() * 1000 + 500;

    setTimeout(() => {
      const random = Math.random();

      if (random < 0.66) {
        resolve({ success: true, amount: 10000 });
      } else {
        const errors = ['카드사 승인 거부', '네트워크 오류', '한도 초과'];
        const randomError = errors[Math.floor(Math.random() * errors.length)];
        resolve({ success: false, error: randomError });
      }
    }, delay);
  });
}
```

#### 7.3 Context 비동기 처리 추가 ✅

**Green**

- [x] VendingMachineContext에 processCardPayment 비동기 함수 추가
- [x] isProcessingPayment 상태 추가
- [x] isCardPayment 상태 추가 (카드/현금 상호 배타적 처리)
- [x] 성공/실패 시나리오별 상태 전환 로직 구현
- [x] 에러 핸들링 (CardPaymentError 사용)

**구현**

```typescript
// VendingMachineContext.tsx
const [isProcessingPayment, setIsProcessingPayment] = useState(false);
const [isCardPayment, setIsCardPayment] = useState(false);

const processCardPayment = useCallback(async () => {
  setIsProcessingPayment(true);
  setError(null);

  try {
    const result = await paymentService.requestCardPayment();

    if (result.success && result.amount) {
      setBalance(result.amount);
      setState('입금완료');
      setIsCardPayment(true); // 카드 결제 성공 표시
    } else {
      handleError(new CardPaymentError(result.error || '알 수 없는 오류'));
    }
  } catch (err) {
    handleError(err);
  } finally {
    setIsProcessingPayment(false);
  }
}, []);

const insertCash = useCallback((amount: CashAmount) => {
  try {
    const newBalance = paymentService.insertCash(balance, amount);
    setBalance(newBalance);
    setState('입금완료');
    setError(null);
    setIsCardPayment(false); // 현금 투입 시 카드 결제 상태 해제
  } catch (err) {
    handleError(err);
  }
}, [balance]);
```

#### 7.4 UI 구현 (카드 결제 버튼 추가) ✅

**Green**

- [x] PaymentInterface에 카드 결제 버튼 추가
- [x] 로딩 상태 표시 ("처리중..." 텍스트)
- [x] 버튼 비활성화 로직 (카드/현금 상호 배타적)
  - 카드 결제 선택 시 현금 버튼 비활성화
  - 현금 투입 시 카드 버튼 비활성화
- [x] StatusDisplay에 카드 결제 표시 ("카드결제" 텍스트)

**구현**

```typescript
// PaymentInterface.tsx
export const PaymentInterface = () => {
  const {
    insertCash,
    processCardPayment,
    isProcessingPayment,
    state,
    isCardPayment,
    balance,
  } = useVendingMachineContext();

  const baseDisabled = state === '선택완료' || isProcessingPayment;
  const cashDisabled = baseDisabled || isCardPayment; // 카드 결제 시 현금 불가
  const cardDisabled = baseDisabled || balance > 0; // 현금 투입 시 카드 불가

  return (
    <Section $spacing="md">
      <Title $size="md">금액 투입</Title>
      <Grid $columns={3} $gap="md">
        {CASH_UNITS.map((amount) => (
          <Button
            key={amount}
            $variant="secondary"
            onClick={() => !cashDisabled && insertCash(amount)}
            disabled={cashDisabled}>
            {formatCurrency(amount)}원
          </Button>
        ))}

        <Button
          $variant="primary"
          onClick={() => !cardDisabled && processCardPayment()}
          disabled={cardDisabled}>
          {isProcessingPayment ? '처리중...' : '카드 결제'}
        </Button>
      </Grid>
    </Section>
  );
};
```

```typescript
// StatusDisplay.tsx
export const StatusDisplay = () => {
  const { state, balance, error, reset, isCardPayment } =
    useVendingMachineContext();

  return (
    <PriceText $size="lg">
      {isCardPayment ? '카드결제' : `${formatCurrency(balance)}원`}
    </PriceText>
  );
};
```

#### 7.5 에러 처리 및 로딩 상태 UI 개선 ✅

**Refactor**

- [x] StatusDisplay에서 에러 메시지 표시 개선
- [x] 에러 발생 시 reset 버튼 표시
- [x] 처리 중 다른 버튼 비활성화
- [x] CardPaymentError 에러 메시지 한글화
- [x] 카드/현금 결제 상호 배타적 UI 처리 완료

**구현 완료**

- [x] useStatusMessage 훅에서 에러 상태 처리
- [x] StatusDisplay에 reset 버튼 표시
- [x] 모든 버튼에 적절한 비활성화 로직 적용
- [x] 카드 결제 표시 및 상호 배타적 동작 구현

---

### Phase 8: 통합 테스트 (선택사항)

#### 8.1 전체 플로우 테스트

```typescript
describe("자판기 전체 플로우", () => {
  test("현금으로 음료 구매 성공 시나리오");
  test("카드로 음료 구매 성공 시나리오");
  test("카드 결제 실패 후 재시도 시나리오");
  test("잔액 부족으로 구매 실패 시나리오");
  test("재고 부족으로 구매 실패 시나리오");
  test("거스름돈 반환 시나리오");
  test("여러 음료 연속 구매 시나리오");
});
```

**구현**

- [ ] 통합 테스트 작성 및 검증

---

## TDD 원칙 준수 사항

1. **Red-Green-Refactor 사이클**

   - 항상 실패하는 테스트를 먼저 작성
   - 테스트를 통과하는 최소한의 코드 작성
   - 리팩토링으로 코드 품질 개선

2. **테스트 커버리지**

   - 핵심 비즈니스 로직 100% 커버리지 목표
   - 엣지 케이스 테스트 작성

3. **테스트 독립성**

   - 각 테스트는 독립적으로 실행 가능
   - Mock/Stub 적절히 활용

4. **가독성**
   - AAA 패턴 (Arrange-Act-Assert) 사용
   - 명확한 테스트 이름 작성

---

## 디렉토리 구조

```
src/
├── vending-machine/
│   ├── model/
│   │   ├── type.ts                 # 타입 정의
│   │   ├── constants.ts            # 상품 목록 등 상수
│   │   └── __tests__/
│   │       └── type.test.ts
│   ├── services/
│   │   ├── payment.ts              # 결제 로직
│   │   ├── product.ts              # 상품 관리
│   │   ├── change.ts               # 거스름돈 계산
│   │   └── __tests__/
│   │       ├── payment.test.ts
│   │       ├── product.test.ts
│   │       └── change.test.ts
│   ├── context/
│   │   ├── VendingMachineContext.tsx  # Context API - 전역 상태 관리
│   │   └── __tests__/
│   │       └── VendingMachineContext.test.tsx
│   ├── hooks/
│   │   ├── useProductSelection.ts  # UI 헬퍼 훅 (상품 선택 관련)
│   │   ├── useStatusMessage.ts     # UI 헬퍼 훅 (상태 메시지)
│   │   └── __tests__/
│   │       ├── useProductSelection.test.ts
│   │       └── useStatusMessage.test.ts
│   └── components/
│       ├── VendingMachine.tsx      # Container 컴포넌트
│       ├── ProductDisplay.tsx
│       ├── PaymentInterface.tsx
│       ├── ChangeDispenser.tsx
│       ├── StatusDisplay.tsx
│       └── __tests__/
│           ├── ProductDisplay.test.tsx
│           ├── PaymentInterface.test.tsx
│           ├── ChangeDispenser.test.tsx
│           └── StatusDisplay.test.tsx
└── __tests__/
    └── integration/
        └── vending-machine.test.tsx
```

**핵심 설계 철학**

- `context/`: 전역 상태 관리 (balance, selectedProduct, state, error만)
- `hooks/`: UI용 헬퍼 훅 (비즈니스 로직 없음, 계산/변환만)
- `services/`: 순수 비즈니스 로직 (재사용 가능)
- `model/`: 타입 정의 + 상수 (products는 여기서 export)

---

## 체크리스트

### 환경 설정

- [x] vitest 설치 및 설정 완료
- [x] testing-library 설치 완료
- [x] 테스트 실행 확인

### Phase별 진행

- [x] Phase 1: 테스트 환경 설정 완료
- [x] Phase 2: 도메인 모델 타입 정의 완료
- [x] Phase 3: 비즈니스 로직 구현 완료 (핵심 로직)
- [x] Phase 4: 예외 상황 처리 완료
- [x] Phase 5: UI 컴포넌트 구현 완료
- [x] Phase 6: 자판기 상태 관리 리팩토링 완료
- [x] **Phase 7: 카드 결제 기능 추가 (TDD) 완료**
- [ ] **Phase 8: 통합 테스트 (선택사항)**

### 아키텍처 설계

- [x] Context vs Hook 역할 정의
- [x] 전역 상태 범위 결정 (balance, selectedProduct, state, error)
- [x] 로컬 상태 범위 결정 (products, change)
- [x] 파생 상태 계산 방식 결정 (useMemo)

### 최종 검증

- [ ] 모든 테스트 통과
- [ ] 코드 커버리지 80% 이상
- [x] 리팩토링 완료
- [ ] README 작성 완료

### Phase 6 리팩토링 완료 항목

- [x] Context에서 불필요한 전역 상태 제거 (products, change)
- [x] 파생 상태를 로컬 계산으로 변경 (useMemo)
- [x] inventory 서비스 분리 및 재고 관리 로직 독립화
- [x] 에러 핸들링 중복 코드 제거 (DRY 원칙)
- [x] OutOfStockError 타입 적용
- [x] 거스름돈 표시 로직 개선
- [x] Clean Code 원칙 준수 (주석 제거, 명확한 함수명)
- [x] SOLID 원칙 준수 (단일 책임, 관심사 분리)

### Phase 7 카드 결제 기능 추가 항목 ✅

**작업 순서: 타입 작성 → 비즈니스 로직 테스트 작성 → UI 카드 결제 버튼 추가 → Context에 추가 → 에러 처리 및 로딩 상태 개선**

- [x] 7.1 타입 정의
  - [x] PaymentGatewayResponse 타입 정의
  - [x] CardPaymentError 클래스 정의
- [x] 7.2 비즈니스 로직 TDD
  - [x] requestCardPayment 테스트 작성
  - [x] requestCardPayment 함수 구현 (66% 성공률)
  - [x] 네트워크 지연 시뮬레이션
  - [x] 다양한 실패 사유 구현
- [x] 7.3 Context 비동기 처리
  - [x] processCardPayment 비동기 함수 구현
  - [x] isProcessingPayment 상태 추가
  - [x] isCardPayment 상태 추가 (상호 배타적 처리)
  - [x] 에러 핸들링 구현
- [x] 7.4 UI 구현
  - [x] PaymentInterface에 카드 결제 버튼 추가
  - [x] 로딩 상태 표시
  - [x] 버튼 비활성화 로직 (카드/현금 상호 배타적)
  - [x] StatusDisplay에 카드 결제 표시
- [x] 7.5 에러 처리 및 로딩 상태 개선
  - [x] StatusDisplay 에러 메시지 개선
  - [x] 에러 상태에서 reset 버튼 표시
  - [x] 처리 중 버튼 비활성화
  - [x] 카드/현금 결제 상호 배타적 UI 완성

---

## AI 활용 기록

이 계획 문서는 Claude Code를 활용하여 작성되었습니다:

- TDD 작업 계획 구조화
- 테스트 케이스 시나리오 제안
- 디렉토리 구조 설계
