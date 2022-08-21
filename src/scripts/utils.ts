import { ErrorInfo } from "tui-grid/types/store/column";

export const getKIAccountWithDash = (account: string): string => {
  if (8 < account.length) {
    return `${account.substring(0, 8)}-${account.substring(8)}`;
  }

  return account;
};

export const getGridErrorStr = (errorInfo: ErrorInfo): string => {
  const { code } = errorInfo;

  if (code === "REQUIRED") {
    return "빈 값이 될 수 없습니다.";
  } else if (code === "TYPE_STRING") {
    return "문자만 입력 가능합니다.";
  } else if (code === "TYPE_NUMBER") {
    return "숫자만 입력 가능합니다.";
  } else if (code === "MIN") {
    return `${errorInfo.min}보다 작은 값이 들어올 수 없습니다.`;
  } else if (code === "MAX") {
    return `${errorInfo.max}보다 큰 값이 들어올 수 없습니다.`;
  } else if (code === "UNIQUE") {
    return "중복된 값이 있습니다.";
  }

  return "값이 유효하지 않습니다.";
};
