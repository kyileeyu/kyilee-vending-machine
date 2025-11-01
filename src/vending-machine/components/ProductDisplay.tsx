import { useVendingMachineContext } from "../context/VendingMachineContext";
import { Section, Title, Grid } from "../styles/common";
import { ProductCard } from "./ProductCard";

export const ProductDisplay = () => {
  const { products } = useVendingMachineContext();

  return (
    <Section $spacing="lg">
      <Title $size="lg">What would you like to buy?</Title>
      <Grid $columns={3} $gap="md">
        {products.map((product) => ProductCard({ product }))}
      </Grid>
    </Section>
  );
};
