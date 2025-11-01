import { createContext, useContext, useState, ReactNode } from 'react';
import type { VendingMachineState, Product, CashAmount } from '../model/type';
import { PRODUCTS } from '../model/constants';
import * as paymentService from '../services/payment';
import * as productService from '../services/product';
import { calculateChange } from '../services/change';

interface VendingMachineContextValue {
  state: VendingMachineState;
  balance: number;
  products: Product[];
  selectedProduct: string | null;
  change: Record<number, number> | null;
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
  const [change, setChange] = useState<Record<number, number> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(PRODUCTS.map(p => ({ ...p })));

  const insertCash = (amount: CashAmount) => {
    try {
      const newBalance = paymentService.insertCash(balance, amount);
      setBalance(newBalance);
      setState('입금완료');
      setError(null);
    } catch (err) {
      setState('에러');
      setError(err instanceof Error ? err.message : '알 수 없는 에러');
    }
  };

  const processCardPayment = (amount: number) => {
    try {
      const result = paymentService.processCardPayment(amount);
      setBalance(result.amount);
      setState('입금완료');
      setError(null);
    } catch (err) {
      setState('에러');
      setError(err instanceof Error ? err.message : '알 수 없는 에러');
    }
  };

  const selectProduct = (productId: string) => {
    try {
      const product = products.find(p => p.id === productId);
      if (!product) {
        throw new Error('상품을 찾을 수 없습니다');
      }

      const result = productService.selectProduct(balance, product);

      setProducts(prev =>
        prev.map(p => (p.id === productId ? { ...p, stock: p.stock - 1 } : p))
      );

      setBalance(result.remainingBalance);
      setSelectedProduct(productId);
      setState('선택완료');

      const changeAmount = calculateChange(result.remainingBalance);
      setChange(changeAmount);
      setError(null);
    } catch (err) {
      setState('에러');
      setError(err instanceof Error ? err.message : '알 수 없는 에러');
    }
  };

  const reset = () => {
    setState('대기중');
    setBalance(0);
    setSelectedProduct(null);
    setChange(null);
    setError(null);
  };

  const value: VendingMachineContextValue = {
    state,
    balance,
    products,
    selectedProduct,
    change,
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
