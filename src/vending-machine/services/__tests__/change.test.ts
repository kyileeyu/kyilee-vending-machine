import { describe, it, expect } from 'vitest';
import { calculateChange } from '../change';

describe('거스름돈 계산 로직', () => {
  it('거스름돈이 없으면 빈 객체를 반환한다', () => {
    const result = calculateChange(0);

    expect(result).toEqual({});
  });

  it('거스름돈을 화폐 단위별로 계산한다', () => {
    const result = calculateChange(1600);

    expect(result).toEqual({
      10000: 0,
      5000: 0,
      1000: 1,
      500: 1,
      100: 1,
    });
  });

  it('큰 금액의 거스름돈을 올바르게 계산한다', () => {
    const result = calculateChange(16700);

    expect(result).toEqual({
      10000: 1,
      5000: 1,
      1000: 1,
      500: 1,
      100: 2,
    });
  });

  it('500원 단위 거스름돈을 계산한다', () => {
    const result = calculateChange(500);

    expect(result).toEqual({
      10000: 0,
      5000: 0,
      1000: 0,
      500: 1,
      100: 0,
    });
  });

  it('100원 단위 거스름돈을 계산한다', () => {
    const result = calculateChange(300);

    expect(result).toEqual({
      10000: 0,
      5000: 0,
      1000: 0,
      500: 0,
      100: 3,
    });
  });
});
