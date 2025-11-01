import styled from "@emotion/styled";
import { useVendingMachineContext } from "../context/VendingMachineContext";
import type { Product } from "../model/type";
import { Section, Title, Grid, AnimatedCard, Text, PriceText, Badge } from "../styles/common";
import { theme } from "../styles/theme";

export const ProductDisplay = () => {
  const { products, selectedProduct, balance, selectProduct } =
    useVendingMachineContext();

  const canPurchase = (product: Product) => {
    return product.stock > 0 && balance >= product.price;
  };

  return (
    <Section $spacing="lg">
      <Title $size="lg">What would you like to buy?</Title>
      <Grid $columns={3} $gap="md">
        {products.map((product) => (
          <AnimatedCard
            key={product.id}
            whileHover={canPurchase(product) ? { scale: 1.05 } : undefined}
            whileTap={canPurchase(product) ? { scale: 0.95 } : undefined}
            onClick={() => canPurchase(product) && selectProduct(product.id)}
            $selected={selectedProduct === product.id}
            $disabled={!canPurchase(product)}>
            <ProductName>{product.name}</ProductName>
            <PriceText>{product.price.toLocaleString()}원</PriceText>
            <StockText $isLow={product.stock <= 3}>
              재고: {product.stock}개
            </StockText>
            {product.stock === 0 && <Badge $variant="error">품절</Badge>}
          </AnimatedCard>
        ))}
      </Grid>
    </Section>
  );
};

const ProductName = styled.h3`
  color: ${theme.colors.textPrimary};
  font-size: ${theme.typography.size.md};
  font-weight: ${theme.typography.weight.semibold};
  margin: 0 0 6px 0;
`;

const StockText = styled(Text)<{ $isLow: boolean }>`
  color: ${(props) => (props.$isLow ? theme.colors.error : theme.colors.textDisabled)};
  font-size: ${theme.typography.size.sm};
  margin-top: ${theme.spacing.xs};
`;
