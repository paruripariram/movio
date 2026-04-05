import { useEffect, useState } from "react";
import { AtSign, LockKeyhole, User } from "lucide-react";
import AuthButton from "../components/AuthButton";
import { registerUser } from "../lib/auth.service";
import { useNavigate } from "react-router";
import { auth } from "../lib/firebase";

function Registration() {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const fieldName = id.replace("-input", "");
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const handleRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await registerUser(
                formData.email,
                formData.password,
                formData.username,
            );
            setFormData({
                username: "",
                email: "",
                password: "",
            });
            navigate("/");
        } catch (error) {
            if (error instanceof Error) alert("Ошибка: " + error.message);
            setError("Failed to register user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleRegister}
            className="flex flex-col gap-15"
            autoComplete="off"
        >
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="username-input"
                        className="text-gray-500 font-bold"
                    >
                        username
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            id="username-input"
                            type="text"
                            className="auth-input"
                            placeholder="John Wick"
                            required
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="email-input"
                        className="text-gray-500 font-bold"
                    >
                        email
                    </label>
                    <div className="relative">
                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            id="email-input"
                            type="email"
                            className="auth-input"
                            placeholder="johnwick@email.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="password-input"
                        className="text-gray-500 font-bold"
                    >
                        password
                    </label>
                    <div className="relative">
                        <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            id="password-input"
                            type="password"
                            className="auth-input"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <AuthButton isLoading={loading}>Sign Up</AuthButton>
            {error && (
                <p className="text-red-500 text-base mt-2 text-center">
                    Failed to register, please try again
                </p>
            )}
        </form>
    );
}

export default Registration;
