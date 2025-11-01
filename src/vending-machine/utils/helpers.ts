/**
 * 공통 헬퍼 함수들
 */

/**
 * 숫자를 천 단위 구분 기호가 있는 문자열로 변환
 */
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString();
};

/**
 * 거스름돈 데이터를 배열로 변환 (0이 아닌 값만)
 */
export const formatChangeData = (
  change: Record<number, number> | null
): Array<{ denomination: number; count: number }> => {
  if (!change) return [];

  return Object.entries(change)
    .filter(([_, count]) => count > 0)
    .map(([denomination, count]) => ({
      denomination: Number(denomination),
      count,
    }))
    .sort((a, b) => b.denomination - a.denomination); // 큰 금액부터 정렬
};

/**
 * 거스름돈이 있는지 체크
 */
export const hasChange = (change: Record<number, number> | null): boolean => {
  if (!change) return false;
  return Object.values(change).some((count) => count > 0);
};

/**
 * 상품 ID로 상품명 찾기
 */
export const getProductName = (
  products: Array<{ id: string; name: string }>,
  productId: string | null
): string | null => {
  if (!productId) return null;
  const product = products.find((p) => p.id === productId);
  return product?.name || null;
};

/**
 * 결제 비활성화 여부 체크
 */
export const isPaymentDisabled = (state: string): boolean => {
  return state === '선택완료';
};
