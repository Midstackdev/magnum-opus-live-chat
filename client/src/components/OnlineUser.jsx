import React from 'react'

export default function OnlineUser({ user, setConversaton, blockade, isBlocked }) {
    
    return (
        <div className="messengerUserContainer">
            <div className="messengerUserOnline" onClick={() => setConversaton(user.sub)}>
                <span>Name: {user.name}</span>
                <span>Email: {user.email}</span>
            </div>
            <div className="blocked">
                <span>
                    <button 
                        className="blockButton" 
                        onClick={() => blockade(user.sub)}
                    >
                            {isBlocked ? `Unblock` : `Block` }
                    </button>
                </span>
            </div>
        </div>
    )
}
