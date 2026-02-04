interface SectionProps {
    children: React.ReactNode;
    bgClass?: string;
    className?: string;
}

export function Section({
    children,
    bgClass = "bg-white",
    className = "",
}: SectionProps) {
    return (
        <section className={`w-full ${bgClass} ${className}`}>
            <div className={`container mx-auto px-6 md:px-16`}>{children}</div>
        </section>
    );
}
