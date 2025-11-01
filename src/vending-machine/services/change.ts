import { CASH_UNITS } from '../model/constants';

type ChangeBreakdown = {
  [key: number]: number;
};

export function calculateChange(amount: number): ChangeBreakdown {
  if (amount === 0) {
    return {};
  }

  const result: ChangeBreakdown = {};
  let remaining = amount;

  for (const unit of CASH_UNITS) {
    const count = Math.floor(remaining / unit);
    result[unit] = count;
    remaining = remaining % unit;
  }

  return result;
}
