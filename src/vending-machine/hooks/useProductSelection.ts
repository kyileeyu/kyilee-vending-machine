/**
 * 상품 선택 관련 비즈니스 로직 훅
 */

import { useMemo } from "react";
import type { Product } from "../model/type";

interface UseProductSelectionProps {
  products: Product[];
  balance: number;
  selectedProduct: string | null;
}

export const useProductSelection = ({
  products,
  balance,
  selectedProduct,
}: UseProductSelectionProps) => {
  /**
   * 상품 구매 가능 여부 체크
   */
  const canPurchase = (product: Product): boolean => {
    return product.stock > 0 && balance >= product.price;
  };

  /**
   * 품절 여부 체크
   */
  const isOutOfStock = (product: Product): boolean => {
    return product.stock === 0;
  };

  /**
   * 선택된 상품인지 체크
   */
  const isSelected = (productId: string): boolean => {
    return selectedProduct === productId;
  };

  /**
   * 선택된 상품 객체
   */
  const selectedProductData = useMemo(() => {
    return products.find((p) => p.id === selectedProduct) || null;
  }, [products, selectedProduct]);

  /**
   * 구매 가능한 상품 목록
   */
  const availableProducts = useMemo(() => {
    return products.filter((p) => canPurchase(p));
  }, [products, balance]);

  /**
   * 품절 상품 개수
   */
  const outOfStockCount = useMemo(() => {
    return products.filter((p) => isOutOfStock(p)).length;
  }, [products]);

  return {
    canPurchase,
    isOutOfStock,
    isSelected,
    selectedProductData,
    availableProducts,
    outOfStockCount,
  };
};
