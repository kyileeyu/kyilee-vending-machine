import { describe, it, expect } from 'vitest';
import { insertCash, processCardPayment } from '../payment';

describe('결제 처리 로직', () => {
  describe('현금 투입', () => {
    it('현금 투입 시 잔액이 증가한다', () => {
      const currentBalance = 0;
      const cash = 1000;

      const newBalance = insertCash(currentBalance, cash);

      expect(newBalance).toBe(1000);
    });

    it('여러 현금을 투입하면 잔액이 누적된다', () => {
      let balance = 0;

      balance = insertCash(balance, 1000);
      balance = insertCash(balance, 500);

      expect(balance).toBe(1500);
    });

    it('유효하지 않은 금액은 투입할 수 없다', () => {
      const balance = 0;

      expect(() => insertCash(balance, 200)).toThrow('유효하지 않은 금액입니다');
    });
  });

  describe('카드 결제', () => {
    it('카드 결제 시 결제 금액을 반환한다', () => {
      const amount = 1100;

      const result = processCardPayment(amount);

      expect(result.success).toBe(true);
      expect(result.amount).toBe(1100);
    });

    it('0원 이하는 결제할 수 없다', () => {
      expect(() => processCardPayment(0)).toThrow('유효하지 않은 금액입니다');
      expect(() => processCardPayment(-100)).toThrow('유효하지 않은 금액입니다');
    });
  });
});
