export interface ApiError extends Error {
  status?: number;
  code?: string;
}

export class CustomApiError extends Error implements ApiError {
  status: number;
  code?: string;

  constructor(message: string, status: number = 500, code?: string) {
    super(message);
    this.name = "CustomApiError";
    this.status = status;
    this.code = code;
  }
}

// Todo specific error codes
export const TodoErrorCodes = {
  INVALID_TODO: "INVALID_TODO",
  TODO_NOT_FOUND: "TODO_NOT_FOUND",
  DUPLICATE_TODO: "DUPLICATE_TODO",
  NETWORK_ERROR: "NETWORK_ERROR",
} as const;

export type TodoErrorCode =
  (typeof TodoErrorCodes)[keyof typeof TodoErrorCodes];

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof Error && "status" in error;
};

export const handleApiError = (error: unknown): ApiError => {
  if (isApiError(error)) {
    return error;
  }

  if (error instanceof Error) {
    // Handle network errors
    if (error.message.includes("fetch")) {
      return new CustomApiError(
        "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.",
        503,
        TodoErrorCodes.NETWORK_ERROR,
      );
    }
    return new CustomApiError(error.message);
  }

  return new CustomApiError("Beklenmeyen bir hata oluştu");
};

export const createErrorMessage = (statusCode: number): string => {
  const errorMessages: Record<number, string> = {
    400: "Geçersiz istek",
    401: "Yetkilendirme başarısız",
    403: "Erişim reddedildi",
    404: "Kaynak bulunamadı",
    422: "Geçersiz veri",
    429: "Çok fazla istek",
    500: "Sunucu hatası",
    503: "Servis kullanılamıyor",
  };

  return errorMessages[statusCode] || "Beklenmeyen bir hata oluştu";
};

export const getTodoErrorMessage = (code: TodoErrorCode): string => {
  const todoErrorMessages: Record<TodoErrorCode, string> = {
    [TodoErrorCodes.INVALID_TODO]: "Geçersiz görev verisi",
    [TodoErrorCodes.TODO_NOT_FOUND]: "Görev bulunamadı",
    [TodoErrorCodes.DUPLICATE_TODO]: "Bu görev zaten mevcut",
    [TodoErrorCodes.NETWORK_ERROR]:
      "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.",
  };

  return todoErrorMessages[code] || "Beklenmeyen bir hata oluştu";
};
