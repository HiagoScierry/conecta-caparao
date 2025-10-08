import React from "react";
import Link from "next/link";
import {
    MountainSnow,
    HandPlatter,
    Hotel,
    Handshake,
    Wrench,
} from "lucide-react";

export function Atrativos() {
    return (
        <div className="flex w-full flex-wrap items-start justify-center gap-8 md:gap-12">
        <Link
            href="/atrativos"
            className="group flex flex-col items-center gap-3 text-center"
        >
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-tourism-verde shadow-md transition-transform duration-300 group-hover:scale-110">
            <MountainSnow className="h-12 w-12 text-white" />
            </div>
            <p className="font-semibold text-gray-800 transition-colors group-hover:text-tourism-verde">
            Atrativos
            </p>
        </Link>

        <Link
            href="/gastronomia"
            className="group flex flex-col items-center gap-3 text-center"
        >
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-tourism-verde shadow-md transition-transform duration-300 group-hover:scale-110">
            <HandPlatter className="h-12 w-12 text-white" />
            </div>
            <p className="font-semibold text-gray-800 transition-colors group-hover:text-tourism-verde">
            Gastronomia
            </p>
        </Link>

        <Link
            href="/hospedagem"
            className="group flex flex-col items-center gap-3 text-center"
        >
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-tourism-verde shadow-md transition-transform duration-300 group-hover:scale-110">
            <Hotel className="h-12 w-12 text-white" />
            </div>
            <p className="font-semibold text-gray-800 transition-colors group-hover:text-tourism-verde">
            Hospedagem
            </p>
        </Link>

        <Link
            href="/servicos"
            className="group flex flex-col items-center gap-3 text-center"
        >
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-tourism-verde shadow-md transition-transform duration-300 group-hover:scale-110">
            <Handshake className="h-12 w-12 text-white" />
            </div>
            <p className="font-semibold text-gray-800 transition-colors group-hover:text-tourism-verde">
            Serviços
            </p>
        </Link>

        <Link
            href="/apoio"
            className="group flex flex-col items-center gap-3 text-center"
        >
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-tourism-verde shadow-md transition-transform duration-300 group-hover:scale-110">
            <Wrench className="h-12 w-12 text-white" />
            </div>
            <p className="font-semibold text-gray-800 transition-colors group-hover:text-tourism-verde">
            Apoio
            </p>
        </Link>
        </div>
    );
}

