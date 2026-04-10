import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AuthLayout from "./components/AuthLayout";
// import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Collection from "./pages/Collection";
import Search from "./pages/Search";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "collection",
                element: <Collection />,
            },
            {
                path: "search",
                element: <Search />,
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
            {
                path: "profile",
                element: <Profile />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}
export default App;
