import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useVendingMachineContext } from '../context/VendingMachineContext';
import { Section, LCDScreen, Label, PriceText, Divider } from '../styles/common';
import { theme } from '../styles/theme';

export const StatusDisplay = () => {
  const { state, balance, error } = useVendingMachineContext();

  const getMessage = () => {
    if (error) return error;
    switch (state) {
      case '대기중':
        return '상품을 선택해주세요';
      case '입금완료':
        return '상품을 선택하세요';
      case '선택완료':
        return '상품이 나옵니다';
      case '에러':
        return error || '오류가 발생했습니다';
      default:
        return '';
    }
  };

  return (
    <Section $spacing="md">
      <LCDScreen>
        <BalanceSection>
          <Label>잔액</Label>
          <PriceText $size="lg">{balance.toLocaleString()}원</PriceText>
        </BalanceSection>
        <Divider />
        <AnimatePresence mode="wait">
          <Message
            key={getMessage()}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            $isError={state === '에러'}
          >
            {getMessage()}
          </Message>
        </AnimatePresence>
      </LCDScreen>
    </Section>
  );
};

const BalanceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

const Message = styled(motion.p)<{ $isError: boolean }>`
  color: ${props => (props.$isError ? theme.colors.error : theme.colors.textPrimary)};
  font-size: ${theme.typography.size.md};
  text-align: center;
  margin: 0;
  min-height: 20px;
  font-weight: ${theme.typography.weight.medium};

  ${props =>
    props.$isError &&
    `
    animation: blink 0.5s infinite;
  `}

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
`;
