import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import App from "./app";
import "./index.css";

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold text-foreground mb-4">页面出错了</h2>
      <p className="text-muted-foreground mb-6">{error.message}</p>
      <button onClick={resetErrorBoundary} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
        重新加载
      </button>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <ErrorBoundary fallbackRender={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </HashRouter>
  </StrictMode>,
);
