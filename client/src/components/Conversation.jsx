import React, { useEffect, useState } from 'react'
import { getUser } from '../api/actions'

export default function Conversation({ convo, currentUser, isOnline, setCurrentChat }) {
    const [user, setUser] = useState(null)
    const friendSub = convo.members.find(member => member !== currentUser.sub)
    
    useEffect(() => {
        getUser(friendSub).then(data => setUser(data))
    }, [friendSub])
    
    return (
        <div>
            <div className="messengerUserOnline" onClick={() => setCurrentChat(convo)}>
                <span>Name: {user?.nickname}</span>
                <span>Email: {user?.email}</span>
                {isOnline && 
                    <div className="onlineBadge"></div>
                }
            </div>
        </div>
    )
}
