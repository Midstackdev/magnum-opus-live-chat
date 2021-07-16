import React from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

export default function Topbar() {
    return (
        <div className="navbar">
            <div className="navWrapper">
                <div className="navRight">
                    Live Chatty
                </div>
                <div className="navleft">
                    <span><LoginButton/></span>
                    <span><LogoutButton/></span>
                </div>
            </div>
        </div>
    )
}
