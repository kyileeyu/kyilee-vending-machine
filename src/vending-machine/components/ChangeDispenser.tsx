import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useVendingMachineContext } from '../context/VendingMachineContext';
import { formatChangeData, hasChange, getProductName, formatCurrency } from '../utils/helpers';
import { Title, OutputArea, OutputItem, Button, Text } from '../styles/common';
import { theme } from '../styles/theme';

export const ChangeDispenser = () => {
  const { change, selectedProduct, products, reset, state } = useVendingMachineContext();

  const shouldShow = hasChange(change) || selectedProduct !== null;
  const selectedProductName = getProductName(products, selectedProduct);
  const changeData = formatChangeData(change);

  if (!shouldShow && state !== '에러') return null;

  return (
    <div>
      <Title $size="md">출구</Title>
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
          {changeData.length > 0 && (
            <ChangeSection
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ChangeSectionTitle>거스름돈</ChangeSectionTitle>
              {changeData.map(({ denomination, count }) => (
                <Text key={denomination} $size="sm">
                  {formatCurrency(denomination)}원 × {count}
                </Text>
              ))}
            </ChangeSection>
          )}
        </AnimatePresence>

        {shouldShow && (
          <Button
            $variant="primary"
            $fullWidth
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            확인
          </Button>
        )}
      </OutputArea>
    </div>
  );
};

const ChangeSection = styled(motion.div)`
  border-top: 1px dashed ${theme.colors.border};
  padding-top: ${theme.spacing.md};
`;

const ChangeSectionTitle = styled.h4`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.size.base};
  font-weight: ${theme.typography.weight.semibold};
  margin: 0 0 ${theme.spacing.sm} 0;
`;
