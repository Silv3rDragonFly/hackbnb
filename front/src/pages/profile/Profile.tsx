import { useEffect, useState } from "react"
import type { User } from "../../types/user"
import { apiCurrentUserDetails } from "../../api/users.api"

/**
 * The current user profile page
 */
export const ProfilePage = () => {
    const [currentUser, setCurrentUser] = useState<User>()
    
    const reloadCurrentUserDetails = async () => {
        const response = await apiCurrentUserDetails()
        setCurrentUser(response.data)
    }

    useEffect(() => {
        void reloadCurrentUserDetails()
    }, [])

    return <>
        {currentUser && <div className="max-w-7xl m-auto px-5 py-8">
            <div className="flex gap-10">
                User profile of {currentUser.name}
            </div>
        </div>}
    </>
}
