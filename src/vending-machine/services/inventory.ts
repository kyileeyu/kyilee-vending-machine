import type { Product } from '../model/type';
import { PRODUCTS } from '../model/constants';
import { OutOfStockError } from '../model/error';

let inventory = new Map<string, number>(
  PRODUCTS.map(product => [product.id, product.stock])
);

export const resetInventory = (): void => {
  inventory = new Map(PRODUCTS.map(product => [product.id, product.stock]));
};

export const getStock = (productId: string): number => {
  return inventory.get(productId) ?? 0;
};

export const getProductsWithStock = (): Product[] => {
  return PRODUCTS.map(product => ({
    ...product,
    stock: getStock(product.id),
  }));
};

export const decreaseStock = (productId: string): void => {
  const currentStock = getStock(productId);
  const product = PRODUCTS.find(p => p.id === productId);

  if (currentStock <= 0) {
    throw new OutOfStockError(product?.name ?? '알 수 없는 상품');
  }

  inventory.set(productId, currentStock - 1);
};

export const increaseStock = (productId: string, amount: number = 1): void => {
  const currentStock = getStock(productId);
  inventory.set(productId, currentStock + amount);
};
