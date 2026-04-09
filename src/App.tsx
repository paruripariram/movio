import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AuthLayout from "./components/AuthLayout";
// import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                        <Home />
                ),
            },
            {
                path: "register",
                element: (
                    <AuthLayout title="Registration">
                        <Register />
                    </AuthLayout>
                ),
            },
            {
                path: "login",
                element: (
                    <AuthLayout title="Login">
                        <Login />
                    </AuthLayout>
                ),
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}
export default App;
