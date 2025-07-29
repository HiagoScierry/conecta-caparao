import { Button } from "@/components/ui/button";
import { Header } from "@/components/public/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <Header />
    <div className="flex justify-center items-center h-screen">
      <Link href="/entrar">
        <Button className="bg-tourism-primary text-white hover:bg-tourism-dark transition-colors">
          Acessar Painel
        </Button>
      </Link>
    </div>
    </>
  );
}
