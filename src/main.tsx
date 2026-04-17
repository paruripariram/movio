import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import { GenresProvider } from "./context/GenresContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <GenresProvider>
                <App />
            </GenresProvider>
        </AuthProvider>
    </StrictMode>,
);
