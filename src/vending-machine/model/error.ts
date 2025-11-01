export class VendingMachineError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VendingMachineError';
  }
}

export class InsufficientBalanceError extends VendingMachineError {
  constructor(
    public required: number,
    public balance: number
  ) {
    super(`잔액이 부족합니다. 필요 금액: ${required}원, 현재 잔액: ${balance}원`);
    this.name = 'InsufficientBalanceError';
  }
}

export class OutOfStockError extends VendingMachineError {
  constructor(public productName: string) {
    super(`재고가 부족합니다: ${productName}`);
    this.name = 'OutOfStockError';
  }
}

export class InvalidAmountError extends VendingMachineError {
  constructor(public amount: number) {
    super(`유효하지 않은 금액입니다: ${amount}원`);
    this.name = 'InvalidAmountError';
  }
}
