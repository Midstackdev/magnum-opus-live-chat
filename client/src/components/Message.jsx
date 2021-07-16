import React from 'react'

export default function Message({message, own }) {
    return (
        <div className={own ? `message own` : `message`}>
            <p className="messageText">{message?.text}</p>
            <div className="messageBottom">
                <span>{new Date(message?.createdAt).toDateString()}</span> &bull;
                <span>{own ? ' You' : ' other guy'}</span>
            </div>
        </div>
    )
}
