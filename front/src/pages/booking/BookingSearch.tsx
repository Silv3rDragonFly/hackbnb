import { useState, type FormEvent } from "react"
import { apiBookingDetails } from "../../api/bookings.api"
import { useNavigate } from "react-router-dom"

/**
 * Search booking by reference
 */
export const BookingSearchPage = () => {
    const [bookingReference, setBookingReference] = useState<string>('')
    const navigate = useNavigate()

    const checkBookingReference = async (event: FormEvent) => {
        event.preventDefault()

        try {
            await apiBookingDetails(`${bookingReference}`)
            navigate('./' + bookingReference)
        } catch (error) {
            alert("Référence de réservation invalide")
        }

        return false
    }

    return <>
        <div className="max-w-lg m-auto mt-10 rounded-3xl p-8 border-1 border-gray-300">
            <h1 className="text-xl">
                Rechercher une réservation
            </h1>
            <form onSubmit={checkBookingReference}>
                <div className="mt-6">
                    <div className="ml-2">
                        Référence de la réservation
                    </div>
                    <input
                        type="text"
                        className="rounded-3xl border-1 border-gray-300 w-full h-10 px-4 mt-2"
                        value={bookingReference}
                        onChange={(e) => setBookingReference(e.target.value)}
                        required />
                </div>

                <div className="mt-8">
                    <button type="submit" className="rounded-3xl bg-gray-200 text-gray-800 px-6 py-2 cursor-pointer">
                        Rechercher
                    </button>
                </div>
            </form>
        </div>
    </>
}
