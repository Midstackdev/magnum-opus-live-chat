import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { register } from '../api/actions'
import { Link } from 'react-router-dom'

export default function Landing() {
    const { isLoading, user, getAccessTokenSilently, isAuthenticated } = useAuth0()
    const [accessToken, setAccessToken] = useState("")

    useEffect(() => {
        const getAccessToken = async() => {
            try {
                const token = await getAccessTokenSilently();
                setAccessToken(token)
                localStorage.setItem('token', JSON.stringify(token))
            } catch (e) {
                console.log(e);
            }
        }
        getAccessToken()
    }, [getAccessTokenSilently])
    
    useEffect(() => {
        if(isAuthenticated) {
            register({ email: user.email, picture: user.picture, name: user.name, nickname: user.nickname })
                .catch((err) =>console.log(err.response.status))
        }
    }, [isAuthenticated, user, accessToken])

    if(isLoading) return <div>Loading...</div>
    return (
        !isAuthenticated ? (
            <>
                <div className="begin">Login to begin</div>
            </>
        ) : (
            <div className="begin">
                <Link to="/chat">Go to chat</Link>
            </div>
        )
    )
}
