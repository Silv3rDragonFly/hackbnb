import { HomeRoomCard } from "./HomeRoomCard"
import { HomeFilters } from "./HomeFilters"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { Room } from "../../types/room"
import { apiRoomsList } from "../../api/rooms.api"

/**
 * The home page of the application
 */
export const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [rooms, setRooms] = useState<Room[]>([])
    const [category, setCategory] = useState<string | null>(null)

    /**
     * Triggered when new category filter for rooms is selected
     */
    const onFilterCategory = (category: string) => {
        setSearchParams(`?category=${encodeURIComponent(category)}`)
    }

    useEffect(() => {
        setCategory(searchParams.get('category'))
    }, [searchParams])

    const reloadRooms = async () => {
        const response = await apiRoomsList(category)
        setRooms(response.data)
    }

    useEffect(() => {
        void reloadRooms()
    }, [category])

    return <>
        <div className="max-w-7xl m-auto px-5 py-8">
            {/* Filters Bar */}
            <HomeFilters selectedFilter={category} onSelectFilter={onFilterCategory} />

            {/* Rooms Listing */}
            <div className="mt-8 grid grid-cols-4 gap-7">
                {rooms.map(room => <HomeRoomCard room={room} />)}
            </div>
        </div>
    </>
}
