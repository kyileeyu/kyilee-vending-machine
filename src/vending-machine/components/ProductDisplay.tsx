import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useVendingMachineContext } from "../context/VendingMachineContext";
import type { Product } from "../model/type";

export const ProductDisplay = () => {
  const { products, selectedProduct, balance, selectProduct } =
    useVendingMachineContext();

  const canPurchase = (product: Product) => {
    return product.stock > 0 && balance >= product.price;
  };

  return (
    <Container>
      <Title>What would you like to buy?</Title>
      <Grid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            whileHover={canPurchase(product) ? { scale: 1.05 } : undefined}
            whileTap={canPurchase(product) ? { scale: 0.95 } : undefined}
            onClick={() => canPurchase(product) && selectProduct(product.id)}
            $isSelected={selectedProduct === product.id}
            $isAvailable={canPurchase(product)}
            $isOutOfStock={product.stock === 0}>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
            <ProductStock $isLow={product.stock <= 3}>
              재고: {product.stock}개
            </ProductStock>
            {product.stock === 0 && <OutOfStockBadge>품절</OutOfStockBadge>}
          </ProductCard>
        ))}
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h2`
  color: #1f2937;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 20px 0;
  text-align: left;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const ProductCard = styled(motion.div)<{
  $isSelected: boolean;
  $isAvailable: boolean;
  $isOutOfStock: boolean;
}>`
  position: relative;
  padding: 16px 12px;
  background: ${(props) => (props.$isSelected ? "#fef3f2" : "#f9fafb")};
  border: 2px solid
    ${(props) =>
      props.$isSelected
        ? "#ff9b9b"
        : props.$isOutOfStock
        ? "#e5e7eb"
        : "#f3f4f6"};
  border-radius: 16px;
  cursor: ${(props) => (props.$isAvailable ? "pointer" : "not-allowed")};
  opacity: ${(props) => (props.$isOutOfStock ? 0.5 : 1)};
  transition: all 0.2s;
  text-align: center;

  &:hover {
    ${(props) =>
      props.$isAvailable &&
      `
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 155, 155, 0.15);
      border-color: #ffb3b3;
    `}
  }
`;

const ProductName = styled.h3`
  color: #1f2937;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 6px 0;
`;

const ProductPrice = styled.p`
  color: #ff9b9b;
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 4px 0;
`;

const ProductStock = styled.p<{ $isLow: boolean }>`
  color: ${(props) => (props.$isLow ? "#ef4444" : "#9ca3af")};
  font-size: 11px;
  margin: 0;
`;

const OutOfStockBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ef4444;
  color: #fff;
  padding: 3px 8px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 600;
`;
