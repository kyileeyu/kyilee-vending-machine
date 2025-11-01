import styled from "@emotion/styled";
import { VendingMachineProvider } from "./context/VendingMachineContext";
import { ProductDisplay } from "./components/ProductDisplay";
import { StatusDisplay } from "./components/StatusDisplay";
import { PaymentInterface } from "./components/PaymentInterface";
import { ChangeDispenser } from "./components/ChangeDispenser";
import { theme } from "./styles/theme";

export const VendingMachine = () => {
  return (
    <VendingMachineProvider>
      <Container>
        <MachineBody>
          <ProductDisplay />
          <StatusDisplay />
          <PaymentInterface />
          <ChangeDispenser />
        </MachineBody>
      </Container>
    </VendingMachineProvider>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${theme.colors.background};
  padding: ${theme.spacing.xl};
`;

const MachineBody = styled.div`
  width: 100%;
  max-width: 450px;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius['3xl']};
  box-shadow: ${theme.shadows.card};
  padding: ${theme.spacing['3xl']};
  overflow: hidden;
`;
