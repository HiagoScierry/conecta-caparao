import Link from "next/link";
import Image from "next/image";
import { link } from "fs";

interface MunicipioCardProps {
    titulo: string;
    linkUrl?: string;
    img?: string;
    altText?: string;
}

export function MunicipioCard({
    titulo,
    linkUrl,
    img,
    altText,
}: MunicipioCardProps) {
    const tituloCard = titulo || "Nome do Município";
    linkUrl = linkUrl || "#";
    const imageUrl = img || "/default-image.jpg";
    const altImage = altText || "Imagem do {tituloCard}";

    return (
        <Link
            href={linkUrl}
            className="group block rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
        >
            <div className="relative w-full aspect-[4/3] md:aspect-square overflow-hidden rounded-lg">
                <Image
                    src={imageUrl}
                    alt={altImage}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-start justify-start pt-8 pl-8">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded font-semibold text-sm lg:text-lg font-montserrat">
                        {tituloCard}
                    </span>
                </div>
            </div>
        </Link>
    );
}
