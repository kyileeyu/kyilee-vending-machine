import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useVendingMachineContext } from '../context/VendingMachineContext';
import { useStatusMessage } from '../hooks/useStatusMessage';
import { formatCurrency } from '../utils/helpers';
import { Section, LCDScreen, Label, PriceText, Divider } from '../styles/common';
import { theme } from '../styles/theme';

export const StatusDisplay = () => {
  const { state, balance, error } = useVendingMachineContext();
  const { message, isError } = useStatusMessage({ state, error });

  return (
    <Section $spacing="md">
      <LCDScreen>
        <BalanceSection>
          <Label>잔액</Label>
          <PriceText $size="lg">{formatCurrency(balance)}원</PriceText>
        </BalanceSection>
        <Divider />
        <AnimatePresence mode="wait">
          <Message
            key={message}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            $isError={isError}
          >
            {message}
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
