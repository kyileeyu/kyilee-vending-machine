import type { CashAmount } from '../model/type';
import { CASH_UNITS } from '../model/constants';
import { InvalidAmountError } from '../model/error';

export function insertCash(currentBalance: number, amount: number): number {
  if (!CASH_UNITS.includes(amount as CashAmount)) {
    throw new InvalidAmountError(amount);
  }

  return currentBalance + amount;
}

export function processCardPayment(amount: number): { success: boolean; amount: number } {
  if (amount <= 0) {
    throw new InvalidAmountError(amount);
  }

  return {
    success: true,
    amount,
  };
}
