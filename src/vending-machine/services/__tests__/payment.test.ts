import { describe, it, expect, vi } from 'vitest';
import { insertCash, processCardPayment, requestCardPayment } from '../payment';

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

  describe('카드 결제 게이트웨이 (requestCardPayment)', () => {
    

    it('실패 시 error 메시지를 반환한다', async () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.8); // 66% 초과이므로 실패

      const result = await requestCardPayment();

      expect(result.success).toBe(false);
      expect(result.amount).toBeUndefined();
      expect(result.error).toBeDefined();
      expect(typeof result.error).toBe('string');

      vi.restoreAllMocks();
    });

    it('비동기로 동작한다', async () => {
      const promise = requestCardPayment();

      expect(promise).toBeInstanceOf(Promise);

      await promise;
    });

    
    it('실패 시 다양한 에러 메시지를 반환한다', async () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.8); // 실패하도록

      const result = await requestCardPayment();

      expect(result.error).toMatch(/카드사 승인 거부|네트워크 오류|한도 초과/);

      vi.restoreAllMocks();
    });

    it('3번 중 약 1번은 실패한다 (통계 테스트)', async () => {
      const trials = 30; 
      let successCount = 0;

      for (let i = 0; i < trials; i++) {
        const result = await requestCardPayment();
        if (result.success) {
          successCount++;
        }
      }

      const successRate = successCount / trials;

      expect(successRate).toBeGreaterThan(0.45);
      expect(successRate).toBeLessThan(0.85);
    }, 60000); // 타임아웃 60초
  });
});
