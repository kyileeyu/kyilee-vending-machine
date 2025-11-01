import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { VendingMachineState, CashAmount } from '../model/type';
import { PRODUCTS } from '../model/constants';
import { CardPaymentError } from '../model/error';
import * as paymentService from '../services/payment';
import * as productService from '../services/product';
import * as inventoryService from '../services/inventory';

interface VendingMachineContextValue {
  state: VendingMachineState;
  balance: number;
  selectedProduct: string | null;
  error: string | null;
  isProcessingPayment: boolean;
  insertCash: (amount: CashAmount) => void;
  processCardPayment: () => Promise<void>;
  selectProduct: (productId: string) => void;
  reset: () => void;
}

const VendingMachineContext = createContext<VendingMachineContextValue | null>(null);

export const useVendingMachineContext = () => {
  const context = useContext(VendingMachineContext);
  if (!context) {
    throw new Error('useVendingMachineContext must be used within VendingMachineProvider');
  }
  return context;
};

export const VendingMachineProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<VendingMachineState>('대기중');
  const [balance, setBalance] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  // 재고 변경 시그널 (재고가 변경될 때마다 증가)
  const [, setInventoryVersion] = useState(0);

  // 에러 핸들링 공통 함수
  const handleError = (err: unknown) => {
    setState('에러');
    setError(err instanceof Error ? err.message : '알 수 없는 에러');
  };

  const insertCash = useCallback((amount: CashAmount) => {
    try {
      const newBalance = paymentService.insertCash(balance, amount);
      setBalance(newBalance);
      setState('입금완료');
      setError(null);
    } catch (err) {
      handleError(err);
    }
  }, [balance]);

  const processCardPayment = useCallback(async () => {
    setIsProcessingPayment(true);
    setError(null);

    try {
      const result = await paymentService.requestCardPayment();

      if (result.success && result.amount) {
        setBalance(result.amount);
        setState('입금완료');
      } else {
        handleError(new CardPaymentError(result.error || '알 수 없는 오류'));
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsProcessingPayment(false);
    }
  }, []);

  const selectProduct = useCallback((productId: string) => {
    try {
      // PRODUCTS는 constants에서 가져옴 (전역 상태 아님)
      const product = PRODUCTS.find(p => p.id === productId);
      if (!product) {
        throw new Error('상품을 찾을 수 없습니다');
      }

      // 재고를 포함한 최신 상품 정보 가져오기
      const currentStock = inventoryService.getStock(productId);
      const productWithStock = { ...product, stock: currentStock };

      const result = productService.selectProduct(balance, productWithStock);

      // 재고 감소 (서비스 레이어에서 처리)
      inventoryService.decreaseStock(productId);

      // 재고 변경 시그널 발생 (컴포넌트 리렌더링 트리거)
      setInventoryVersion(v => v + 1);

      setBalance(result.remainingBalance);
      setSelectedProduct(productId);
      setState('선택완료');
      setError(null);
    } catch (err) {
      handleError(err);
    }
  }, [balance]);

  const reset = useCallback(() => {
    setState('대기중');
    setBalance(0);
    setSelectedProduct(null);
    setError(null);
  }, []);

  const value: VendingMachineContextValue = {
    state,
    balance,
    selectedProduct,
    error,
    isProcessingPayment,
    insertCash,
    processCardPayment,
    selectProduct,
    reset,
  };

  return (
    <VendingMachineContext.Provider value={value}>
      {children}
    </VendingMachineContext.Provider>
  );
};
