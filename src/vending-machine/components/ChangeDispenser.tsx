import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { useVendingMachineContext } from "../context/VendingMachineContext";
import {
  formatChangeData,
  hasChange,
  getProductName,
  formatCurrency,
} from "../utils/helpers";
import {
  DispenserContainer,
  DispenserContent,
  DispenserItem,
  DispenserButton,
} from "../../shared/styles/common";
import { theme } from "../../shared/styles/theme";

export const ChangeDispenser = () => {
  const { change, selectedProduct, products, reset } =
    useVendingMachineContext();

  const shouldShow = hasChange(change) || selectedProduct !== null;
  const selectedProductName = getProductName(products, selectedProduct);
  const changeData = formatChangeData(change);

  return (
    <DispenserContainer>
      <DispenserContent>
        <AnimatePresence>
          {selectedProduct && (
            <DispenserItem
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}>
              🥤 {selectedProductName}
            </DispenserItem>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {changeData.length > 0 && (
            <ChangeSection
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}>
              <ChangeSectionTitle>거스름돈</ChangeSectionTitle>
              {changeData.map(({ denomination, count }) => (
                <ChangeText key={denomination}>
                  {formatCurrency(denomination)}원 × {count}
                </ChangeText>
              ))}
            </ChangeSection>
          )}
        </AnimatePresence>

        {shouldShow && (
          <DispenserButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={reset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}>
            확인
          </DispenserButton>
        )}
      </DispenserContent>
    </DispenserContainer>
  );
};

const ChangeSection = styled(motion.div)`
  border-top: 1px dashed rgba(255, 255, 255, 0.2);
  padding-top: ${theme.spacing.md};
`;

const ChangeSectionTitle = styled.h4`
  color: ${theme.colors.white};
  font-size: ${theme.typography.size.base};
  font-weight: ${theme.typography.weight.semibold};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

const ChangeText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${theme.typography.size.sm};
  margin: ${theme.spacing.xs} 0;
`;
