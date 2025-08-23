import React from "react";

interface BannerProps {
    titulo: string;
    cor: string;
}

export function Banner({ titulo, cor }: BannerProps) {
    return(
        <div className={`h-32 md:h-48 lg:h-64 ${cor} flex items-center justify-start text-start rounded-md shadow-lg`}>
            <h1 className="text-white  text-2xl md:text-5xl font-bold mx-10">{titulo}</h1>
        </div>
    );
}