import { CASH_UNITS } from "./constants";

export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

export type CashAmount = (typeof CASH_UNITS)[number];


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
