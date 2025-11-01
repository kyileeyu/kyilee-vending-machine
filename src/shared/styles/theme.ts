/**
 * 디자인 시스템 테마
 * 모던 키오스크 스타일 자판기 UI 토큰
 */

export const colors = {
  // 주요 색상
  primary: '#ff9b9b',      // 파스텔 핑크
  primaryLight: '#ffb3b3',
  primaryPale: '#fef3f2',

  // 배경
  background: '#f5f7fa',   // 라이트 그레이
  white: '#ffffff',
  surface: '#f9fafb',

  // 텍스트
  textPrimary: '#1f2937',  // 다크 그레이
  textSecondary: '#6b7280', // 미디엄 그레이
  textDisabled: '#9ca3af', // 라이트 그레이

  // 테두리
  border: '#e5e7eb',
  borderLight: '#f3f4f6',
  borderPink: '#ffe0dd',
  borderPinkDark: '#ffd4cd',

  // 상태 색상
  error: '#ef4444',

  // 추가 색상
  navy: '#1e293b',          // 네이비 (디스펜서 배경)
  hoverPink: '#ff8a8a',     // 호버 핑크 (버튼 호버)
  lightGray: '#f1f5f9',     // 라이트 그레이 (버튼 호버)

  // 그라디언트
  gradientPink: 'linear-gradient(135deg, #fef3f2 0%, #fff7f5 100%)',
} as const;

export const typography = {
  // 폰트 크기
  size: {
    xs: '10px',
    sm: '11px',
    base: '13px',
    md: '14px',
    lg: '15px',
    xl: '16px',
    '2xl': '22px',
    '3xl': '24px',
  },

  // 폰트 무게
  weight: {
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '25px',
  '3xl': '30px',
} as const;

export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '14px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '30px',
} as const;

export const shadows = {
  sm: '0 2px 4px rgba(0, 0, 0, 0.04)',
  md: '0 4px 8px rgba(255, 155, 155, 0.15)',
  lg: '0 4px 12px rgba(255, 155, 155, 0.15)',
  xl: '0 6px 12px rgba(255, 155, 155, 0.3)',
  card: '0 10px 40px rgba(0, 0, 0, 0.08)',
  button: '0 4px 8px rgba(255, 155, 155, 0.25)',
} as const;

export const transitions = {
  default: 'all 0.2s',
  fast: 'all 0.15s',
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
} as const;

export type Theme = typeof theme;
