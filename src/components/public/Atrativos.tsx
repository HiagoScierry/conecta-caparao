import React from "react";
import { CardCategoria } from "./CardCategoria";
import {
  MountainSnow,
  HandPlatter,
  Hotel,
  Handshake,
  Wrench,
} from "lucide-react";

export function Atrativos() {
  const categorias = [
    {
      titulo: "Gastronomia",
      descricao: "Sabores únicos da região",
      icone: HandPlatter,
      href: "/gastronomia",
    },
    {
      titulo: "Hospedagem",
      descricao: "Aconchego e conforto nas montanhas",
      icone: Hotel,
      href: "/hospedagem",
    },
    {
      titulo: "Atrativos",
      descricao: "Cachoeiras, trilhas e muito mais que a região oferece",
      icone: MountainSnow,
      href: "/atrativos",
    },
    {
      titulo: "Serviços",
      descricao: "Guias, lojas e experiências",
      icone: Handshake,
      href: "/servicos",
    },
    {
      titulo: "Apoio",
      descricao: "Informações e assistência",
      icone: Wrench,
      href: "/apoio",
    },
  ];

  return (
    <>
      {categorias.map((categoria, index) => (
        <CardCategoria
          key={index}
          titulo={categoria.titulo}
          descricao={categoria.descricao}
          icone={categoria.icone}
          href={categoria.href}
        />
      ))}
    </>
  );
}


