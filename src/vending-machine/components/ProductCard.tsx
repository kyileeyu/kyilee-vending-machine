import styled from "@emotion/styled";
import { formatCurrency } from "../utils/helpers";
import { AnimatedCard, PriceText } from "../styles/common";
import { theme } from "../styles/theme";
import { Product } from "../model/type";

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  canPurchase: boolean;
  isOutOfStock: boolean;
  onSelect: () => void;
}

export const ProductCard = ({
  product,
  isSelected,
  canPurchase,
  isOutOfStock,
  onSelect,
}: ProductCardProps) => {
  return (
    <AnimatedCard
      whileHover={canPurchase ? { scale: 1.05 } : undefined}
      whileTap={canPurchase ? { scale: 0.95 } : undefined}
      onClick={canPurchase ? onSelect : undefined}
      $selected={isSelected}
      $disabled={!canPurchase}>
      <ProductName>{product.name}</ProductName>
      <PriceText>{formatCurrency(product.price)}원</PriceText>
      <StockText>{isOutOfStock ? "품절" : `재고: ${product.stock}개`}</StockText>
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
