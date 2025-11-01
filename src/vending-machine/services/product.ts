import type { Product } from '../model/type';
import { InsufficientBalanceError, OutOfStockError } from '../model/error';

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
    throw new OutOfStockError(product.name);
  }

  if (balance < product.price) {
    throw new InsufficientBalanceError(product.price, balance);
  }

  return {
    success: true,
    product,
    remainingBalance: balance - product.price,
  };
}
