import { auth } from "../lib/firebase";
import { useState } from "react";
import { AtSign, LockKeyhole, User } from "lucide-react";

function Registration() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form action="" className="flex flex-col gap-4">
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
                        className="w-full pl-10 rounded-md bg-input-color h-12 placeholder:text-gray-500 p-2 text-white caret-primary transition duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="John Wick"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        className="w-full pl-10 rounded-md bg-input-color outline-0 h-12 placeholder:text-gray-500 p-2 text-white caret-primary transition duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="johnwick@email.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
                    <input
                        id="password-input"
                        type="password"
                        className="w-full pl-10 rounded-md bg-input-color outline-0 h-12 placeholder:text-gray-500 p-2 text-white caret-primary transition duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
        </form>
    );
}

export default Registration;
