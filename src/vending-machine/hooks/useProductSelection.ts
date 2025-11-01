import { useMemo } from "react";
import type { Product } from "../model/type";

interface UseProductSelectionProps {
  products: Product[];
  balance: number;
  selectedProduct: string | null;
}

interface UseProductSelectionReturn {
  canPurchase: (product: Product) => boolean;
  isOutOfStock: (product: Product) => boolean;
  isSelected: (productId: string) => boolean;
  selectedProductData: Product | null;
  availableProducts: Product[];
  outOfStockCount: number;
}

export const useProductSelection = ({
  products,
  balance,
  selectedProduct,
}: UseProductSelectionProps): UseProductSelectionReturn => {

  const canPurchase = (product: Product): boolean => {
    return product.stock > 0 && balance >= product.price;
  };

  const isOutOfStock = (product: Product): boolean => {
    return product.stock === 0;
  };

  const isSelected = (productId: string): boolean => {
    return selectedProduct === productId;
  };

  const selectedProductData = useMemo(() => {
    return products.find((p) => p.id === selectedProduct) || null;
  }, [products, selectedProduct]);

  const availableProducts = useMemo(() => {
    return products.filter((p) => canPurchase(p));
  }, [products, balance]);

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
