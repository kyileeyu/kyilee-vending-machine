import { useVendingMachineContext } from '../context/VendingMachineContext';
import { CASH_UNITS } from '../model/constants';
import { Section, Title, Grid, Button } from '../styles/common';

export const PaymentInterface = () => {
  const { insertCash, state } = useVendingMachineContext();
  const disabled = state === '선택완료';

  return (
    <Section $spacing="md">
      <Title $size="md">금액 투입</Title>
      <Grid $columns={3} $gap="md">
        {CASH_UNITS.map(amount => (
          <Button
            key={amount}
            $variant="secondary"
            whileHover={!disabled ? { scale: 1.05 } : undefined}
            whileTap={!disabled ? { y: 2 } : undefined}
            onClick={() => !disabled && insertCash(amount)}
            disabled={disabled}
          >
            {amount.toLocaleString()}원
          </Button>
        ))}
      </Grid>
    </Section>
  );
};

