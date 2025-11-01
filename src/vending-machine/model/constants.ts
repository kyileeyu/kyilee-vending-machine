import type { Product } from "./type";

export const CASH_UNITS = [10000, 5000, 1000, 500, 100] as const;

export const PRODUCTS: Product[] = [
  {
    id: "cola",
    name: "콜라",
    price: 1100,
    stock: 0,
  },
  {
    id: "water",
    name: "물",
    price: 600,
    stock: 2,
  },
  {
    id: "coffee",
    name: "커피",
    price: 700,
    stock: 10,
  },
];
