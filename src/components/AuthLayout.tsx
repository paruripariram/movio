import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { auth } from "../lib/firebase";

interface AuthLayoutProps {
    children: ReactNode;
    title: "Registration" | "Login";
}

function AuthLayout({ children, title }: AuthLayoutProps) {
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, [navigate]);
    return (
            <div className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-white text-5xl font-bold mb-6">{title}</h1>
                <div className="rounded-xl bg-form-color p-8 min-h-100 min-w-100">
                    {children}
                </div>
            </div>
    );
}

export default AuthLayout;
