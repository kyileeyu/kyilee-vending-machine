import type { CashAmount, PaymentGatewayResponse } from '../model/type';
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

export function requestCardPayment(): Promise<PaymentGatewayResponse> {
  return new Promise((resolve) => {
    // 네트워크 지연 시뮬레이션 (500ms ~ 1500ms)
    const delay = Math.random() * 1000 + 500;

    setTimeout(() => {
      const random = Math.random();

      // 66% 성공률
      if (random < 0.66) {
        resolve({
          success: true,
          amount: 10000,
        });
      } else {
        // 34% 실패 (다양한 실패 사유)
        const errorMessages = ['카드사 승인 거부', '네트워크 오류', '한도 초과'];
        const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];

        resolve({
          success: false,
          error: randomError,
        });
      }
    }, delay);
  });
}
