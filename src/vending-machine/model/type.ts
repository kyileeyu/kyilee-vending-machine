export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

export type CashAmount = 100 | 500 | 1000 | 5000 | 10000;

export type CashPayment = {
  type: "cash";
  amount: CashAmount;
};

export type CardPayment = {
  type: "card";
  amount: number;
};

export type PaymentMethod = CashPayment | CardPayment;

export type VendingMachineState =
  | "대기중"
  | "입금완료"
  | "선택완료"
  | "완료"
  | "에러";

export type VendingMachineContext = {
  balance: number;
  selectedProduct: string | null;
  change: number;
  errorMessage: string | null;
};
