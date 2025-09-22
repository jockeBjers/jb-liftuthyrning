import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import type { JSX } from "react";
import { Spinner } from "react-bootstrap";

interface ProtectedRouteProps {
    children: JSX.Element;
    requiredRole?: string;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
    const { user, loading } = useAuth();

    if (loading) {
        return <Spinner animation="border" role="status"></Spinner>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
}
