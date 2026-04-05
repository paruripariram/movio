import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser, registerUser } from "../lib/auth.service";
import type { authForm } from "../types";

export default function useAuth() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (formData: authForm) => {
        if (loading) return;
        setLoading(true);
        setError(null);
        try {
            await registerUser(
                formData.email,
                formData.password,
                formData.username!,
            );
            navigate("/");
            return true;
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                return false;
            } else {
                setError("Failed to register user");
                return false;
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (formData: authForm) => {
        if (loading) return;
        setLoading(true);
        setError(null);
        try {
            await loginUser(formData.email, formData.password);
            navigate("/");
            return true;
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                return false;
            } else {
                setError("Failed to login user");
                return false;
            }
        } finally {
            setLoading(false);
        }
    };
    return { handleRegister, handleLogin, loading, error };
}
