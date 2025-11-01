# 스타일링 규칙 (클로드 지침용)

## 🎨 필수 규칙

### 1. 색상 사용 규칙
- **반드시** `src/shared/styles/theme.ts`에 정의된 색상 코드만 사용한다
- 하드코딩된 색상 코드(예: `#1e293b`, `#ff8a8a`)는 **절대 사용 금지**
- 새로운 색상이 필요한 경우:
  1. `theme.ts`의 `colors` 객체에 먼저 추가
  2. 의미 있는 이름으로 정의 (예: `navy`, `hoverPink`)
  3. 추가 후 해당 색상을 사용

### 2. 공통 컴포넌트 사용 규칙
- **반드시** `src/shared/styles/common.ts`에 정의된 공통 컴포넌트를 우선 사용
- 기존 공통 컴포넌트: `Title`, `Section`, `Grid`, `Card`, `Button`, `LCDScreen`, `Label`, `PriceText`, `Divider`, `AnimatedCard`, `DispenserContainer` 등
- 새로운 공통 레이아웃이 필요한 경우:
  1. 2개 이상의 컴포넌트에서 재사용될 가능성 확인
  2. `common.ts`에 추가 후 사용
  3. 명확한 props 인터페이스 정의

### 3. 로컬 스타일 사용 규칙
- 단순한 레이아웃은 각 컴포넌트에서 정의 가능
- 로컬 스타일 허용 사례:
  - 해당 컴포넌트에서만 사용되는 특수한 레이아웃
  - 비즈니스 로직과 강하게 결합된 스타일
  - 예: `BalanceSection`, `Message`, `ChangeSection`, `ChangeSectionTitle`, `ChangeText`

### 4. 스타일 정의 우선순위
```
1. theme.ts 색상/spacing/borderRadius 사용
   ↓
2. common.ts 공통 컴포넌트 재사용
   ↓
3. 로컬 styled-component 정의 (필요시)
```

---

## ✅ 올바른 예시

### 색상 사용
```typescript
// ✅ Good: theme 색상 사용
import { theme } from '../../shared/styles/theme';

const Container = styled.div`
  background: ${theme.colors.navy};
  color: ${theme.colors.white};
`;
```

### 공통 컴포넌트 사용
```typescript
// ✅ Good: common 컴포넌트 재사용
import { Button, Section, Grid } from '../../shared/styles/common';

export const MyComponent = () => {
  return (
    <Section $spacing="md">
      <Grid $columns={3} $gap="md">
        <Button $variant="primary">클릭</Button>
      </Grid>
    </Section>
  );
};
```

### 새 색상 추가
```typescript
// ✅ Good: 필요한 색상을 theme.ts에 먼저 추가
// theme.ts
export const colors = {
  // ... 기존 색상
  navy: '#1e293b',
  hoverPink: '#ff8a8a',
  lightGray: '#f1f5f9',
} as const;

// 그 후 사용
const Container = styled.div`
  background: ${theme.colors.navy};

  &:hover {
    background: ${theme.colors.lightGray};
  }
`;
```

---

## ❌ 잘못된 예시

### 하드코딩된 색상
```typescript
// ❌ Bad: 하드코딩된 색상 - 금지!
const Container = styled.div`
  background: #1e293b;  // 금지!
  color: #ffffff;       // 금지!

  &:hover {
    background: #ff8a8a;  // 금지!
  }
`;
```

### 공통 컴포넌트 재정의
```typescript
// ❌ Bad: common.ts에 Button이 이미 있는데 재정의
const MyButton = styled.button`
  padding: 12px;
  background: ${theme.colors.primary};
  // Button 컴포넌트가 common.ts에 이미 있음!
`;
```

### 공통 레이아웃을 로컬에 정의
```typescript
// ❌ Bad: 여러 곳에서 사용될 Grid를 로컬에 정의
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  // 이런 공통 레이아웃은 common.ts에 추가해야 함!
`;
```

---

## 📋 체크리스트

스타일 코드를 작성하기 전에 다음을 확인하세요:

- [ ] 하드코딩된 색상 코드가 없는가? (theme.ts 사용)
- [ ] common.ts에 이미 있는 컴포넌트를 재사용했는가?
- [ ] 새로운 공통 컴포넌트가 필요하면 common.ts에 추가했는가?
- [ ] theme.ts의 spacing, borderRadius, shadows를 사용했는가?
- [ ] 로컬 스타일은 정말 해당 컴포넌트에서만 사용되는가?

---

## 🔍 코드 리뷰 포인트

코드 리뷰 시 다음을 확인:

1. **색상**: `#` 으로 시작하는 하드코딩된 색상이 있는지 검색
2. **중복**: common.ts에 이미 있는 스타일을 재정의하지 않았는지
3. **일관성**: 모든 컴포넌트가 동일한 theme를 사용하는지
4. **재사용성**: 2개 이상의 컴포넌트에서 사용되는 스타일은 common.ts로 이동

---

## 현재 사용 가능한 공통 컴포넌트

### 타이포그래피
- `Title` - 제목 (size: sm, md, lg)
- `Label` - 라벨 (size: sm, md)
- `PriceText` - 가격 텍스트 (size: sm, md, lg)

### 레이아웃
- `Section` - 섹션 컨테이너 (spacing: sm, md, lg)
- `Grid` - 그리드 레이아웃 (columns, gap)
- `Card` - 카드 컨테이너 (variant: default, pink, surface)

### 인터랙티브
- `Button` - 버튼 (variant: primary, secondary, fullWidth)
- `AnimatedCard` - 애니메이션 카드 (selected, disabled)

### 특수 컴포넌트
- `LCDScreen` - LCD 화면
- `Divider` - 구분선 (variant: solid, dashed)
- `DispenserContainer` - 디스펜서 컨테이너
- `DispenserContent` - 디스펜서 내용
- `DispenserItem` - 디스펜서 아이템
- `DispenserButton` - 디스펜서 버튼

---

## 현재 사용 가능한 Theme 값

### Colors
`primary`, `primaryLight`, `primaryPale`, `background`, `white`, `surface`, `textPrimary`, `textSecondary`, `textDisabled`, `border`, `borderLight`, `borderPink`, `borderPinkDark`, `error`, `gradientPink`

### Typography
- Size: `xs`, `sm`, `base`, `md`, `lg`, `xl`, `2xl`, `3xl`
- Weight: `medium`, `semibold`, `bold`

### Spacing
`xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`

### Border Radius
`sm`, `md`, `lg`, `xl`, `2xl`, `3xl`

### Shadows
`sm`, `md`, `lg`, `xl`, `card`, `button`

### Transitions
`default`, `fast`
