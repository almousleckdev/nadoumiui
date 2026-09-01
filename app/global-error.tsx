"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { isNetworkError, getErrorMessage } from "@/utils/getErrorMessage";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError Caught]:", error);
  }, [error]);

  const isNetwork = isNetworkError(error);
  const message = getErrorMessage(error);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans antialiased text-gray-900">
        <div className="max-w-md w-full text-center p-8 bg-white border border-gray-200 rounded-3xl shadow-sm space-y-6">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto border border-red-100">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {isNetwork ? "Service Unavailable" : "Application Error"}
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              {message}
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-xl transition shadow-md shadow-orange-600/20"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reload Page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
