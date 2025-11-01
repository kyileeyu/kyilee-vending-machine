import type { CashAmount } from '../model/type';
import { CASH_UNITS } from '../model/constants';

export function insertCash(currentBalance: number, amount: number): number {
  if (!CASH_UNITS.includes(amount as CashAmount)) {
    throw new Error('유효하지 않은 금액입니다');
  }

  return currentBalance + amount;
}

export function processCardPayment(amount: number): { success: boolean; amount: number } {
  if (amount <= 0) {
    throw new Error('유효하지 않은 금액입니다');
  }

  return {
    success: true,
    amount,
  };
}
