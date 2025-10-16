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

  const handleLogin = async (credentials: { email: string; password: string }) => {
    const success = await login(credentials.email, credentials.password);
    if (success) {
      route.push('/painel/dashboard');
    } else {
      throw new Error('Login falhou');
    }
  };

  return <Login onLogin={handleLogin} />;
}