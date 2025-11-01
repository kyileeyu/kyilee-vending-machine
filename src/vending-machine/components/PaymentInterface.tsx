import { useVendingMachineContext } from "../context/VendingMachineContext";
import { CASH_UNITS } from "../model/constants";
import { formatCurrency } from "../utils/helpers";
import { Section, Title, Grid, Button } from "../../shared/styles/common";

export const PaymentInterface = () => {
  const {
    insertCash,
    processCardPayment,
    isProcessingPayment,
    state,
    isCardPayment,
    balance,
  } = useVendingMachineContext();

  const baseDisabled = state === '선택완료' || isProcessingPayment;
  const cashDisabled = baseDisabled || isCardPayment;
  const cardDisabled = baseDisabled || balance > 0;

  return (
    <Section $spacing="md">
      <Title $size="md">금액 투입</Title>
      <Grid $columns={3} $gap="md">
        {CASH_UNITS.map((amount) => (
          <Button
            key={amount}
            $variant="secondary"
            whileHover={!cashDisabled ? { scale: 1.05 } : undefined}
            whileTap={!cashDisabled ? { y: 2 } : undefined}
            onClick={() => !cashDisabled && insertCash(amount)}
            disabled={cashDisabled}>
            {formatCurrency(amount)}원
          </Button>
        ))}

        <Button
          $variant="primary"
          whileHover={!cardDisabled ? { scale: 1.05 } : undefined}
          whileTap={!cardDisabled ? { y: 2 } : undefined}
          onClick={() => !cardDisabled && processCardPayment()}
          disabled={cardDisabled}>
          {isProcessingPayment ? "처리중..." : "카드 결제"}
        </Button>
      </Grid>
    </Section>
  );
};
