import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useVendingMachineContext } from '../context/VendingMachineContext';

export const ChangeDispenser = () => {
  const { change, selectedProduct, products, reset, state } = useVendingMachineContext();

  const hasOutput = change !== null || selectedProduct !== null;
  const selectedProductName = products.find(p => p.id === selectedProduct)?.name;

  if (!hasOutput && state !== '에러') return null;

  return (
    <Container>
      <Title>출구</Title>
      <OutputArea>
        <AnimatePresence>
          {selectedProduct && (
            <OutputItem
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              🥤 {selectedProductName}
            </OutputItem>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {change && Object.keys(change).length > 0 && (
            <ChangeSection
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ChangeTitle>거스름돈</ChangeTitle>
              {Object.entries(change)
                .filter(([_, count]) => count > 0)
                .map(([denomination, count]) => (
                  <ChangeItem key={denomination}>
                    {Number(denomination).toLocaleString()}원 × {count}
                  </ChangeItem>
                ))}
            </ChangeSection>
          )}
        </AnimatePresence>

        {hasOutput && (
          <ConfirmButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            확인
          </ConfirmButton>
        )}
      </OutputArea>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 10px;
`;

const Title = styled.h3`
  color: #1f2937;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  text-align: left;
`;

const OutputArea = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OutputItem = styled(motion.div)`
  color: #1f2937;
  font-size: 16px;
  text-align: center;
  padding: 12px;
  background: #fef3f2;
  border: 1px solid #ffd4cd;
  border-radius: 12px;
  font-weight: 600;
`;

const ChangeSection = styled(motion.div)`
  border-top: 1px dashed #e5e7eb;
  padding-top: 12px;
`;

const ChangeTitle = styled.h4`
  color: #6b7280;
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const ChangeItem = styled.p`
  color: #1f2937;
  font-size: 13px;
  margin: 4px 0;
`;

const ConfirmButton = styled(motion.button)`
  width: 100%;
  padding: 14px;
  background: #ff9b9b;
  border: none;
  border-radius: 14px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(255, 155, 155, 0.25);
  transition: all 0.2s;

  &:hover {
    background: #ff8a8a;
    transform: translateY(-1px);
    box-shadow: 0 6px 12px rgba(255, 155, 155, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;
