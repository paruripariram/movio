import type { ReactNode } from "react";



interface AuthLayoutProps {
    children: ReactNode
    title: 'Registration' | 'Login'
}

function AuthLayout({ children, title }: AuthLayoutProps) {
    return (
        <>
            <div className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-white text-5xl font-bold mb-6">{title}</h1>
                <div className="rounded-xl bg-form-color p-6 min-h-150 min-w-100">
                    {children}
                </div>
            </div>
        </>
    );
}

export default AuthLayout;
