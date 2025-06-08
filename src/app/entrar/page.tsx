"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const { toast } =  useToast();

  const handleLogin = () => {
     toast({
        title: "Login realizado com sucesso!",
        description: "Você será redirecionado para o painel.",
        duration: 3000,
    });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <h1>Tela de login</h1>
      <Button onClick={() => {
        handleLogin();
      }}>Bottao</Button>
    </div>
  );
}
