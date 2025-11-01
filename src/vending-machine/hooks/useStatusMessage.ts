import { useMemo } from "react";
import type { VendingMachineState } from "../model/type";

interface UseStatusMessageProps {
  state: VendingMachineState;
  error: string | null;
}

interface UseStatusMessageReturn {
  message: string;
  isError: boolean;
}

export const useStatusMessage = ({ state, error }: UseStatusMessageProps): UseStatusMessageReturn => {
  const message = useMemo(() => {
    // 에러가 있으면 에러 메시지 우선 표시
    if (error) return error;

    switch (state) {
      case "대기중":
        return "상품을 선택해주세요";
      case "입금완료":
        return "상품을 선택하세요";
      case "선택완료":
        return "상품이 나옵니다";
      case "에러":
        return error || "오류가 발생했습니다";
      default:
        return "";
    }
  }, [state, error]);

  const isError = state === "에러";

  return {
    message,
    isError,
  };
};
