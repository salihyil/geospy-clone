"use client";

import { Button } from "@/components/ui/button";
import {
  ApiError,
  getTodoErrorMessage,
  isApiError,
  TodoErrorCode,
  TodoErrorCodes,
} from "@/lib/utils/error-utils";
import { AlertCircle, Home, RefreshCcw } from "lucide-react";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string } & Partial<ApiError>;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Opsiyonel: Hata izleme servisi entegrasyonu
    console.error("Error:", error);
  }, [error]);

  const getErrorMessage = () => {
    if (isApiError(error) && error.code) {
      return getTodoErrorMessage(error.code as TodoErrorCode);
    }
    return (
      error.message || "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin."
    );
  };

  const isNetworkError = error.code === TodoErrorCodes.NETWORK_ERROR;

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-4">
      <div className="max-w-md space-y-6 rounded-lg border bg-card p-6 text-center shadow-sm">
        <div className="flex justify-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">
            {isNetworkError ? "Bağlantı Hatası" : "Bir Sorun Oluştu"}
          </h2>
          <p className="text-muted-foreground">{getErrorMessage()}</p>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={reset} variant="default" className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            Tekrar Dene
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Ana Sayfaya Dön
          </Button>
        </div>

        {isNetworkError && (
          <p className="text-sm text-muted-foreground">
            İpucu: İnternet bağlantınızı kontrol edin ve sayfayı yenileyin.
          </p>
        )}
      </div>
    </div>
  );
}
