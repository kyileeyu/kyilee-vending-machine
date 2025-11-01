import { describe, it, expect } from 'vitest';
import { selectProduct, canPurchase } from '../product';
import type { Product } from '../../model/type';

describe('상품 선택 로직', () => {
  const mockProduct: Product = {
    id: 'cola',
    name: '콜라',
    price: 1100,
    stock: 5,
  };

  describe('상품 구매 가능 여부', () => {
    it('잔액이 충분하면 구매 가능하다', () => {
      const balance = 1100;

      const result = canPurchase(balance, mockProduct);

      expect(result).toBe(true);
    });

    it('잔액이 부족하면 구매 불가능하다', () => {
      const balance = 500;

      const result = canPurchase(balance, mockProduct);

      expect(result).toBe(false);
    });

    it('재고가 없으면 구매 불가능하다', () => {
      const balance = 1100;
      const outOfStockProduct: Product = { ...mockProduct, stock: 0 };

      const result = canPurchase(balance, outOfStockProduct);

      expect(result).toBe(false);
    });
  });

  describe('상품 선택', () => {
    it('조건이 충족되면 상품을 선택할 수 있다', () => {
      const balance = 1500;

      const result = selectProduct(balance, mockProduct);

      expect(result.success).toBe(true);
      expect(result.product).toEqual(mockProduct);
      expect(result.remainingBalance).toBe(400);
    });

    it('잔액이 부족하면 에러를 발생시킨다', () => {
      const balance = 500;

      expect(() => selectProduct(balance, mockProduct)).toThrow('잔액이 부족합니다');
    });

    it('재고가 없으면 에러를 발생시킨다', () => {
      const balance = 1500;
      const outOfStockProduct: Product = { ...mockProduct, stock: 0 };

      expect(() => selectProduct(balance, outOfStockProduct)).toThrow('재고가 부족합니다');
    });
  });
});
