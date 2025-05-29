import { link } from "fs";
import { Banner } from "../components/banner";
import { MunicipioCard } from "../components/municipioCard";

const municipiosMock = [
    {
        key: "1",
        titulo: "Alegre",
        linkUrl: "/municipios/iuna",
        img: undefined,
        altText: "Imagem do município de Iuna",
    },
    {
        key: "2",
        titulo: "Iuna",
        linkUrl: undefined,
        img: undefined,
        altText: "Imagem do município de Iuna",
    },
    {
        key: "3",
        titulo: "Irupi",
        linkUrl: undefined,
        img: undefined,
        altText: "Imagem do município de Iuna",
    },{
        key: "4",
        titulo: "Divino de São Lourenço",
        linkUrl: undefined,
        img: undefined,
        altText: undefined,
    },
]

export default function MunicipiosMenu() {
    return (
        <div className="container min-h-screen mx-auto px-4 lg:px-20 py-4 mt-8">
            <Banner texto="Municípios"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {municipiosMock.map((municipio) => (
                    <MunicipioCard
                        key={municipio.key}
                        titulo={municipio.titulo}
                        linkUrl={municipio.linkUrl}
                        img={municipio.img}
                        altText={municipio.altText}
                    />
                ))}
            </div>
        </div>
    );
}