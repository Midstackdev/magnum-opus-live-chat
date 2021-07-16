import React from 'react'

const Profile = ({ user }) => {
    
    return (
        <>
        <h3>Loggin User</h3>
        <img src={user.picture} alt={user.nickname}/>
        <div className="messengerUser">
            <span>Name: {user.name}</span>
            <span>Email: {user.email}</span>
        </div>
        </>
    )
}

export default Profile
