import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import type { User } from "../types/user"
import { apiCurrentUserDetails } from "../api/users.api"

/**
 * The current user profile in the app header
 */
export const HeaderProfile = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
        
    const reloadCurrentUserDetails = async () => {
        try {
            const response = await apiCurrentUserDetails()
            setCurrentUser(response.data)
        } catch (error) {
            console.log('User not logged in')
        }
    }

    useEffect(() => {
        void reloadCurrentUserDetails()
    }, [])

    return <>
        <NavLink to={currentUser ? "/profile" : "/login"} className="rounded-4xl border-1 p-[8px] border-gray-200 flex items-center cursor-pointer">
            <div className="ml-2 mr-3 text-gray-300">
                {currentUser?.name || 'Se connecter'}
            </div>

            <img src="/img/profile.svg" width="32" alt="user profile" className="opacity-60" />
        </NavLink>
    </>
}
