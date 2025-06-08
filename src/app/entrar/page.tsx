"use client";
import { useEffect } from "react";
import { useAuth } from "@/hooks/auth-context";
import { Login } from "@/components/painel-pages/Login";
import { useRouter } from "next/navigation";

export default function Page() {
  const { login, isAuthenticated } = useAuth();
  const route = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      route.push('/painel/dashboard');
    }
  }, [isAuthenticated, route]);

  const handleLogin = (credentials: { email: string; password: string }) => {
    const success = login(credentials.email, credentials.password);
    if (success) {
      route.push('/');
    }
  };

  return <Login onLogin={handleLogin} />;
}