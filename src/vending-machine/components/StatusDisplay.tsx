import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useVendingMachineContext } from '../context/VendingMachineContext';

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
    <Container>
      <LCDScreen>
        <BalanceSection>
          <Label>잔액</Label>
          <Balance>{balance.toLocaleString()}원</Balance>
        </BalanceSection>
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
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 25px;
`;

const LCDScreen = styled.div`
  background: linear-gradient(135deg, #fef3f2 0%, #fff7f5 100%);
  border: 1px solid #ffe0dd;
  border-radius: 20px;
  padding: 20px;
`;

const BalanceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ffd4cd;
`;

const Label = styled.span`
  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
`;

const Balance = styled.span`
  color: #ff9b9b;
  font-size: 22px;
  font-weight: 700;
`;

const Message = styled(motion.p)<{ $isError: boolean }>`
  color: ${props => (props.$isError ? '#ef4444' : '#1f2937')};
  font-size: 14px;
  text-align: center;
  margin: 0;
  min-height: 20px;
  font-weight: 500;

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
