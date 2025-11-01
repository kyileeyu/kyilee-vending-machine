import { describe, test, expect } from 'vitest';
import {
  VendingMachineError,
  InsufficientBalanceError,
  OutOfStockError,
  InvalidAmountError,
} from '../error';

describe('에러 처리', () => {
  test('잔액 부족 에러', () => {
    const error = new InsufficientBalanceError(1000, 500);

    expect(error).toBeInstanceOf(VendingMachineError);
    expect(error.message).toContain('잔액이 부족합니다');
    expect(error.name).toBe('InsufficientBalanceError');
  });

  test('재고 부족 에러', () => {
    const error = new OutOfStockError('콜라');

    expect(error).toBeInstanceOf(VendingMachineError);
    expect(error.message).toContain('재고가 부족합니다');
    expect(error.name).toBe('OutOfStockError');
  });

  test('잘못된 금액 투입 에러', () => {
    const error = new InvalidAmountError(300);

    expect(error).toBeInstanceOf(VendingMachineError);
    expect(error.message).toContain('유효하지 않은 금액입니다');
    expect(error.name).toBe('InvalidAmountError');
  });
});
