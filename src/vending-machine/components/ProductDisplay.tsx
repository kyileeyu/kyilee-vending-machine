import { useVendingMachineContext } from "../context/VendingMachineContext";
import { useProductSelection } from "../hooks/useProductSelection";
import { Section,  Grid } from "../styles/common";
import { ProductCard } from "./ProductCard";

export const ProductDisplay = () => {
  const { products, selectedProduct, balance, selectProduct } =
    useVendingMachineContext();

  const { canPurchase, isOutOfStock } = useProductSelection({
    products,
    balance,
    selectedProduct,
  });

  return (
    <Section $spacing="lg">
      <Grid $columns={3} $gap="md">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={selectedProduct === product.id}
            canPurchase={canPurchase(product)}
            isOutOfStock={isOutOfStock(product)}
            onSelect={() => selectProduct(product.id)}
          />
        ))}
      </Grid>
    </Section>
  );
};
