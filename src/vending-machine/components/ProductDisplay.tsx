import { useVendingMachineContext } from "../context/VendingMachineContext";
import { useProductSelection } from "../hooks/useProductSelection";
import { getProductsWithStock } from "../services/inventory";
import { Section, Grid, Card } from "../../shared/styles/common";
import { ProductCard } from "./ProductCard";

export const ProductDisplay = () => {
  const { selectedProduct, balance, selectProduct } = useVendingMachineContext();

  // products는 재고 정보와 함께 가져옴 (서비스 레이어에서 관리)
  const products = getProductsWithStock();

  const { canPurchase, isOutOfStock } = useProductSelection({
    products,
    balance,
    selectedProduct,
  });

  return (
    <Section $spacing="lg">
      <Card style={{ minHeight: "300px" }}>
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
      </Card>
    </Section>
  );
};
