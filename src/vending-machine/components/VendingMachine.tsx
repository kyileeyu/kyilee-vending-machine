import styled from "@emotion/styled";
import { VendingMachineProvider } from "../context/VendingMachineContext";
import { ProductDisplay } from "./ProductDisplay";
import { StatusDisplay } from "./StatusDisplay";
import { PaymentInterface } from "./PaymentInterface";
import { ChangeDispenser } from "./ChangeDispenser";

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
  background: #f5f7fa;
  padding: 20px;
`;

const MachineBody = styled.div`
  width: 100%;
  max-width: 450px;
  background: #ffffff;
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  padding: 30px;
  overflow: hidden;
`;
