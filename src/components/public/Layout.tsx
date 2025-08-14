import { Footer } from "./Footer";
import { Header } from "./Header";

export function LayoutPublic({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-tourism-bege">{children}</main>
      <Footer />
    </div>
  );
}
