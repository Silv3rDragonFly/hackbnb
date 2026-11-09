/**
 * All rooms filters on home page
 */
export const HomeFilters = ({
    selectedFilter,
    onSelectFilter,
}: {
    selectedFilter: string | null;
    onSelectFilter: (filter: string) => void;
}) => {
    const filters = [
        {
            name: "swimming-pool",
            icon: "/img/filters/swimming-pool.png",
            label: "Piscines",
        },
        {
            name: "hut",
            icon: "/img/filters/hut.png",
            label: "Cabanes",
        },
        {
            name: "seaside",
            icon: "/img/filters/seaside.png",
            label: "Bord de mer",
        },
        {
            name: "ski",
            icon: "/img/filters/ski.png",
            label: "Au ski",
        },
        {
            name: "camping",
            icon: "/img/filters/camping.png",
            label: "Camping",
        },
        {
            name: "desert",
            icon: "/img/filters/desert.png",
            label: "Desert",
        },
    ]

    return <>
        <div className="flex items-center gap-10">
            {filters.map(filter => (
                <button
                    key={filter.name}
                    type="button"
                    onClick={() => onSelectFilter(filter.name)}
                    aria-pressed={filter.name === selectedFilter}
                    className={`flex flex-col items-center cursor-pointer border-b-1 py-1 ${filter.name === selectedFilter ? 'border-b-2 border-b-gray-100' : 'opacity-60 border-b-gray-50'}`}>
                    <img src={filter.icon} width="24" alt="" style={{filter: "brightness(0) invert(1)"}} />
                    <div className="text-sm mt-2">
                        {filter.label}
                    </div>
                </button>
            ))}
        </div>
    </>
}
