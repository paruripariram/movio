import { useEffect, useState } from "react";
import { AtSign, LockKeyhole, User } from "lucide-react";
import AuthButton from "../components/Ui/AuthButton";
import { registerUser } from "../lib/auth.service";
import { useNavigate } from "react-router";
import { auth } from "../lib/firebase";
import AuthInput from "../components/Ui/AuthInput";

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

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if( loading ) return;
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
                <AuthInput inputName="username" inputType="text" label="username" value={formData.username} onChange={handleChange} placeholder="John Wick" icon={User}/>

                <AuthInput inputName="email" inputType="email" label="email" value={formData.email} onChange={handleChange} placeholder="johnwick@email.com" icon={AtSign}/>

                <AuthInput inputName="password" inputType="password" label="password" value={formData.password} onChange={handleChange} placeholder="••••••••" icon={LockKeyhole}/>
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
