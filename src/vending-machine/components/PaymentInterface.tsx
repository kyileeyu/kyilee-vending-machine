import { useVendingMachineContext } from "../context/VendingMachineContext";
import { CASH_UNITS } from "../model/constants";
import { isPaymentDisabled, formatCurrency } from "../utils/helpers";
import { Section, Title, Grid, Button } from "../../shared/styles/common";

export const PaymentInterface = () => {
  const { insertCash, processCardPayment, isProcessingPayment, state } = useVendingMachineContext();
  const disabled = isPaymentDisabled(state) || isProcessingPayment;

  return (
    <Section $spacing="md">
      <Title $size="md">금액 투입</Title>
      <Grid $columns={3} $gap="md">
        {CASH_UNITS.map((amount) => (
          <Button
            key={amount}
            $variant="secondary"
            whileHover={!disabled ? { scale: 1.05 } : undefined}
            whileTap={!disabled ? { y: 2 } : undefined}
            onClick={() => !disabled && insertCash(amount)}
            disabled={disabled}>
            {formatCurrency(amount)}원
          </Button>
        ))}

        <Button
          $variant="primary"
          whileHover={!disabled ? { scale: 1.05 } : undefined}
          whileTap={!disabled ? { y: 2 } : undefined}
          onClick={() => !disabled && processCardPayment()}
          disabled={disabled}>
          {isProcessingPayment ? '처리중...' : '카드 결제'}
        </Button>
      </Grid>
    </Section>
  );
};
