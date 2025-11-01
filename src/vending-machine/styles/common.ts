/**
 * 공통 스타일 컴포넌트
 * 재사용 가능한 UI 요소들
 */

import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from './theme';

/**
 * 타이포그래피
 */
export const Title = styled.h2<{ $size?: 'sm' | 'md' | 'lg' }>`
  color: ${theme.colors.textPrimary};
  font-size: ${(props) => {
    switch (props.$size) {
      case 'sm':
        return theme.typography.size.xl;
      case 'lg':
        return theme.typography.size['3xl'];
      case 'md':
      default:
        return theme.typography.size.xl;
    }
  }};
  font-weight: ${(props) =>
    props.$size === 'lg'
      ? theme.typography.weight.bold
      : theme.typography.weight.semibold};
  margin: 0 0 ${theme.spacing.md} 0;
  text-align: left;
`;

export const Text = styled.p<{ $size?: 'xs' | 'sm' | 'md'; $color?: keyof typeof theme.colors }>`
  color: ${(props) => theme.colors[props.$color || 'textPrimary']};
  font-size: ${(props) => {
    switch (props.$size) {
      case 'xs':
        return theme.typography.size.xs;
      case 'sm':
        return theme.typography.size.sm;
      case 'md':
      default:
        return theme.typography.size.base;
    }
  }};
  margin: 0;
`;

export const Label = styled.span<{ $size?: 'sm' | 'md' }>`
  color: ${theme.colors.textSecondary};
  font-size: ${(props) =>
    props.$size === 'sm' ? theme.typography.size.sm : theme.typography.size.base};
  font-weight: ${theme.typography.weight.medium};
`;

export const PriceText = styled.span<{ $size?: 'sm' | 'md' | 'lg' }>`
  color: ${theme.colors.primary};
  font-size: ${(props) => {
    switch (props.$size) {
      case 'sm':
        return theme.typography.size.base;
      case 'lg':
        return theme.typography.size['2xl'];
      case 'md':
      default:
        return theme.typography.size.base;
    }
  }};
  font-weight: ${theme.typography.weight.bold};
`;

/**
 * 레이아웃
 */
export const Section = styled.div<{ $spacing?: 'sm' | 'md' | 'lg' }>`
  margin-bottom: ${(props) => {
    switch (props.$spacing) {
      case 'sm':
        return theme.spacing.xl;
      case 'lg':
        return theme.spacing['3xl'];
      case 'md':
      default:
        return theme.spacing['2xl'];
    }
  }};
`;

export const Grid = styled.div<{ $columns: number; $gap?: 'sm' | 'md' }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  gap: ${(props) => (props.$gap === 'sm' ? theme.spacing.sm : theme.spacing.md)};
`;

/**
 * 카드
 */
export const Card = styled.div<{ $variant?: 'default' | 'pink' | 'surface' }>`
  background: ${(props) => {
    switch (props.$variant) {
      case 'pink':
        return theme.colors.primaryPale;
      case 'surface':
        return theme.colors.surface;
      case 'default':
      default:
        return theme.colors.white;
    }
  }};
  border: ${(props) => {
    switch (props.$variant) {
      case 'pink':
        return `1px solid ${theme.colors.borderPinkDark}`;
      case 'surface':
        return `1px solid ${theme.colors.border}`;
      case 'default':
      default:
        return `2px solid ${theme.colors.borderLight}`;
    }
  }};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  transition: ${theme.transitions.default};
`;

export const AnimatedCard = styled(motion.div)<{
  $selected?: boolean;
  $disabled?: boolean;
  $variant?: 'default' | 'pink';
}>`
  position: relative;
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  background: ${(props) =>
    props.$selected ? theme.colors.primaryPale : theme.colors.surface};
  border: 2px solid
    ${(props) =>
      props.$selected
        ? theme.colors.primary
        : props.$disabled
        ? theme.colors.border
        : theme.colors.borderLight};
  border-radius: ${theme.borderRadius.xl};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  transition: ${theme.transitions.default};
  text-align: center;

  &:hover {
    ${(props) =>
      !props.$disabled &&
      `
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
      border-color: ${theme.colors.primaryLight};
    `}
  }
`;

/**
 * 버튼
 */
export const Button = styled(motion.button)<{
  $variant?: 'primary' | 'secondary';
  $fullWidth?: boolean;
}>`
  padding: ${theme.spacing.md} ${theme.spacing.md};
  background: ${(props) =>
    props.$variant === 'primary' ? theme.colors.primary : theme.colors.white};
  border: ${(props) =>
    props.$variant === 'primary'
      ? 'none'
      : `2px solid ${theme.colors.borderLight}`};
  border-radius: ${theme.borderRadius.lg};
  color: ${(props) =>
    props.$variant === 'primary' ? theme.colors.white : theme.colors.textPrimary};
  font-size: ${theme.typography.size.base};
  font-weight: ${theme.typography.weight.semibold};
  cursor: pointer;
  box-shadow: ${(props) =>
    props.$variant === 'primary' ? theme.shadows.button : theme.shadows.sm};
  transition: ${theme.transitions.default};
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};

  &:hover:not(:disabled) {
    ${(props) =>
      props.$variant === 'primary'
        ? `
      background: #ff8a8a;
      transform: translateY(-1px);
      box-shadow: ${theme.shadows.xl};
    `
        : `
      border-color: ${theme.colors.primaryLight};
      box-shadow: ${theme.shadows.md};
    `}
  }

  &:active:not(:disabled) {
    transform: ${(props) => (props.$variant === 'primary' ? 'translateY(0)' : 'scale(0.97)')};
    background: ${(props) => (props.$variant === 'secondary' ? theme.colors.primaryPale : '')};
    border-color: ${(props) =>
      props.$variant === 'secondary' ? theme.colors.borderPinkDark : ''};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/**
 * 배지
 */
export const Badge = styled.span<{ $variant?: 'error' | 'warning' }>`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  background: ${(props) => (props.$variant === 'error' ? theme.colors.error : theme.colors.primary)};
  color: ${theme.colors.white};
  padding: 3px ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.size.xs};
  font-weight: ${theme.typography.weight.semibold};
`;

/**
 * LCD 스크린
 */
export const LCDScreen = styled.div`
  background: ${theme.colors.gradientPink};
  border: 1px solid ${theme.colors.borderPink};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xl};
`;

/**
 * 출력 영역
 */
export const OutputArea = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  min-height: 100px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const OutputItem = styled(motion.div)`
  color: ${theme.colors.textPrimary};
  font-size: ${theme.typography.size.xl};
  text-align: center;
  padding: ${theme.spacing.md};
  background: ${theme.colors.primaryPale};
  border: 1px solid ${theme.colors.borderPinkDark};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.weight.semibold};
`;

/**
 * 구분선
 */
export const Divider = styled.div<{ $variant?: 'solid' | 'dashed' }>`
  width: 100%;
  height: 1px;
  background: ${(props) =>
    props.$variant === 'dashed' ? 'transparent' : theme.colors.borderPinkDark};
  border-top: ${(props) =>
    props.$variant === 'dashed' ? `1px dashed ${theme.colors.border}` : 'none'};
  margin: ${theme.spacing.md} 0;
`;
