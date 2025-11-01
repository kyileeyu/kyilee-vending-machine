import type { Product } from '../model/type';

export function canPurchase(balance: number, product: Product): boolean {
  if (product.stock <= 0) {
    return false;
  }

  if (balance < product.price) {
    return false;
  }

  return true;
}

export function selectProduct(
  balance: number,
  product: Product
): { success: boolean; product: Product; remainingBalance: number } {
  if (product.stock <= 0) {
    throw new Error('재고가 부족합니다');
  }

  if (balance < product.price) {
    throw new Error('잔액이 부족합니다');
  }

  return {
    success: true,
    product,
    remainingBalance: balance - product.price,
  };
}
