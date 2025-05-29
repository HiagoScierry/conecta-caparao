export function Banner({ texto }: { texto?: string }) {
    const descricaoBanner = texto || "Municipios";
    return (
        <div className="bg-verde-floresta text-branco py-8 lg:py-16 border rounded lg:rounded-md ">
        <div className="container mx-auto px-4 lg:px-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-start mb-2">
                {descricaoBanner}
            </h1>
        </div>
        </div>
    );
}
