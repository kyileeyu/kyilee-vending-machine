import styled from "@emotion/styled";
import { VendingMachineProvider } from "./context/VendingMachineContext";
import { ProductDisplay } from "./components/ProductDisplay";
import { StatusDisplay } from "./components/StatusDisplay";
import { PaymentInterface } from "./components/PaymentInterface";
import { ChangeDispenser } from "./components/ChangeDispenser";
import { theme } from "./styles/theme";
import { Title } from "./styles/common";

export const VendingMachine = () => {
  return (
    <VendingMachineProvider>
      <Container>
        <MachineBody>
          <Title $size="md">What would you like to buy?</Title>
          <TopSection>
            <LeftSection>
              <ProductDisplay />
            </LeftSection>
            <RightSection>
              <StatusDisplay />
              <PaymentInterface />
            </RightSection>
          </TopSection>
          <BottomSection>
            <ChangeDispenser />
          </BottomSection>
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
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing.xl};
  max-width: 1200px;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius["3xl"]};
  box-shadow: ${theme.shadows.card};
  padding: ${theme.spacing["3xl"]};
  overflow: hidden;
`;

const TopSection = styled.div`
  display: flex;
  gap: ${theme.spacing.xl};
`;

const LeftSection = styled.div`
  flex: 2;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const BottomSection = styled.div`
  width: 100%;
`;
