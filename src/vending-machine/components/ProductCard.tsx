import styled from "@emotion/styled";
import { formatCurrency } from "../utils/helpers";
import { AnimatedCard, PriceText } from "../styles/common";
import { theme } from "../styles/theme";
import { useVendingMachineContext } from "../context/VendingMachineContext";
import { useProductSelection } from "../hooks/useProductSelection";
import { Product } from "../model/type";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { selectedProduct, balance, selectProduct } =
    useVendingMachineContext();
  const { canPurchase, isOutOfStock } = useProductSelection({
    products: [product],
    balance,
    selectedProduct,
  });

  const isSelected = selectedProduct === product.id;
  const canPurchaseProduct = canPurchase(product);
  const isOut = isOutOfStock(product);

  return (
    <AnimatedCard
      whileHover={canPurchaseProduct ? { scale: 1.05 } : undefined}
      whileTap={canPurchaseProduct ? { scale: 0.95 } : undefined}
      onClick={canPurchaseProduct ? () => selectProduct(product.id) : undefined}
      $selected={isSelected}
      $disabled={!canPurchaseProduct}>
      <ProductName>{product.name}</ProductName>
      <PriceText>{formatCurrency(product.price)}원</PriceText>
      <StockText>{isOut ? `재고: ${product.stock}개` : "품절"}</StockText>
    </AnimatedCard>
  );
};

const ProductName = styled.h3`
  color: ${theme.colors.textPrimary};
  font-size: ${theme.typography.size.md};
  font-weight: ${theme.typography.weight.semibold};
  margin: 0 0 6px 0;
`;

const StockText = styled.div`
  color: ${theme.colors.textDisabled};
  font-size: ${theme.typography.size.sm};
  margin-top: ${theme.spacing.xs};
`;
