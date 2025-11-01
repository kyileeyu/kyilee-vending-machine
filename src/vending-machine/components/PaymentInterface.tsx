import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useVendingMachineContext } from '../context/VendingMachineContext';
import { CASH_UNITS } from '../model/constants';

export const PaymentInterface = () => {
  const { insertCash, state } = useVendingMachineContext();
  const disabled = state === '선택완료';

  return (
    <Container>
      <Title>금액 투입</Title>
      <ButtonGrid>
        {CASH_UNITS.map(amount => (
          <CashButton
            key={amount}
            whileHover={!disabled ? { scale: 1.05 } : undefined}
            whileTap={!disabled ? { y: 2 } : undefined}
            onClick={() => !disabled && insertCash(amount)}
            disabled={disabled}
          >
            {amount.toLocaleString()}원
          </CashButton>
        ))}
      </ButtonGrid>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 25px;
`;

const Title = styled.h3`
  color: #1f2937;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  text-align: left;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const CashButton = styled(motion.button)`
  padding: 14px 10px;
  background: #ffffff;
  border: 2px solid #f3f4f6;
  border-radius: 14px;
  color: #1f2937;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  transition: all 0.2s;

  &:active:not(:disabled) {
    transform: scale(0.97);
    background: #fef3f2;
    border-color: #ffd4cd;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    border-color: #ffb3b3;
    box-shadow: 0 4px 8px rgba(255, 155, 155, 0.15);
  }
`;
