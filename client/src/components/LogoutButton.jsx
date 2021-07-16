import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0()

    const initiate = () => {
        logout()
        localStorage.removeItem('token')
    }

    return (
        isAuthenticated && (
            <button onClick={initiate}>
                Logout
            </button>
        )
    )
}

export default LogoutButton
