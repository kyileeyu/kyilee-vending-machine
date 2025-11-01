import { createContext, useContext, useState, ReactNode } from 'react';
import type { VendingMachineState, CashAmount } from '../model/type';
import { PRODUCTS } from '../model/constants';
import * as paymentService from '../services/payment';
import * as productService from '../services/product';
import * as inventoryService from '../services/inventory';

interface VendingMachineContextValue {
  state: VendingMachineState;
  balance: number;
  selectedProduct: string | null;
  error: string | null;
  insertCash: (amount: CashAmount) => void;
  processCardPayment: (amount: number) => void;
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
  // 재고 변경 시그널 (재고가 변경될 때마다 증가)
  const [, setInventoryVersion] = useState(0);

  // 에러 핸들링 공통 함수
  const handleError = (err: unknown) => {
    setState('에러');
    setError(err instanceof Error ? err.message : '알 수 없는 에러');
  };

  const insertCash = (amount: CashAmount) => {
    try {
      const newBalance = paymentService.insertCash(balance, amount);
      setBalance(newBalance);
      setState('입금완료');
      setError(null);
    } catch (err) {
      handleError(err);
    }
  };

  const processCardPayment = (amount: number) => {
    try {
      const result = paymentService.processCardPayment(amount);
      setBalance(result.amount);
      setState('입금완료');
      setError(null);
    } catch (err) {
      handleError(err);
    }
  };

  const selectProduct = (productId: string) => {
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
  };

  const reset = () => {
    setState('대기중');
    setBalance(0);
    setSelectedProduct(null);
    setError(null);
  };

  const value: VendingMachineContextValue = {
    state,
    balance,
    selectedProduct,
    error,
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
