import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import OnlineUser from './OnlineUser'
import Profile from './Profile'
// import Conversation from './Conversation'
import { useAuth0 } from '@auth0/auth0-react'
import { blockUser, createConversation, getConversations, getMessages, getUsers, postMessage } from '../api/actions'
import io from 'socket.io-client'

export default function Messenger() {
    const { user, isAuthenticated } = useAuth0()
    const [conversatons, setConversatons] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [users, setUsers] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const scrollRef = useRef()
    const socket = useRef()

    useEffect(() =>{
        socket.current = io('ws://localhost:8500')
        socket.current.on('getMessage', (data) => {
            setArrivalMessage(
                {
                    _id: Date.now(),
                    sender: data.sender,
                    text: data.text,
                    createdAt: new Date().toISOString()
                }
            )
        })
    }, [])

    useEffect(() => {
        arrivalMessage && 
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        if(user && users) {
            socket.current.emit('addUser', user.sub)
            socket.current.on('getUsers', data => {
                // setOnlineUsers(users?.filter((user) => data.some((item) => item.userId === user.sub)))
                setOnlineUsers(users?.filter((u) => data.some((item) => item.userId === u.sub && (!u.blocked.includes(user.sub))) && (u.sub !== user.sub)))
            })
        }
    }, [user, users])

    useEffect(() => {
        getConversations().then(data => setConversatons(data))
        getUsers().then((data) => setUsers(data))
    }, [])
    
    useEffect(() => {
        socket.current.on('update', payload => {
            if(payload.blockedId === user?.sub) {
                getUsers().then((data) => setUsers(data))
            }
        })
    }, [user])

    useEffect(() => {
        getMessages(currentChat?._id).then(data => setMessages(data))
    }, [currentChat])

    const handleSubmit = (e) => {
        e.preventDefault()
        const text = {
            text: newMessage
        }

        const receiverId = currentChat.members.find(member => member !== user.sub)
        socket.current.emit('sendMessage', {
            sender: user.sub,
            receiverId,
            text: newMessage
        })

        postMessage(text, currentChat?._id).then(data => setMessages([...messages, data]))
        setNewMessage('')
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // const isOnline = (members) => {
    //     return onlineUsers.some((u) => u.sub === members.find(member => member !== user.sub))
    // }

    const setConversaton = (id) => {
        if(conversatons.some((c) => c.members.includes(id, user.sub))) {
            setCurrentChat(conversatons.find(c => c.members.includes(id, user.sub)))
        }else {
            createConversation({receiverId: id}).then(data => setCurrentChat(data))
        }
    }

    const isBlocked = (id) => {
        return users?.some((u) => u.sub === user.sub && u.blocked.includes(id))
    }
    
    const blockade = (id) => {
        blockUser({ user: id }).then(data => {

            socket.current.emit('updateUser', {
                blockedId: id,
            })
            getUsers().then((data) => setUsers(data))
        })
    }

    // console.log(onlineUsers.filter(u => !u.blocked.includes(user.sub)))
    return (
        !isAuthenticated ? (
            <>
                <div className="begin">Login to begin</div>
            </>
        ) : (
            <div className="messenger">
                <div className="messengerWrapper">
                    <div className="messengerLeft">
                        <Profile user={user} />
                        <div className="messengerOnlineUsers">
                            {/* <h3>Conversations</h3>
                            {conversatons?.length > 0 ? conversatons.map(convo => (
                                <div key={convo._id}>
                                    <Conversation 
                                        convo={convo} 
                                        currentUser={user} 
                                        isOnline={isOnline(convo.members)}
                                        setCurrentChat={setCurrentChat}
                                    />
                                </div>

                            )): (<h3>You have no conversations yet.</h3>)} */}

                            <h3>Online Users</h3>
                            {onlineUsers?.length > 0 ? onlineUsers.map(online => (
                                <div key={online._id} >
                                    <OnlineUser 
                                        user={online} 
                                        setConversaton={setConversaton} 
                                        blockade={blockade}
                                        isBlocked={isBlocked(online.sub)}
                                    />
                                </div>

                            )): (<h3>There are no online users.</h3>)}
                            
                        </div>
                    </div>
                    <div className="messengerRight">
                        {currentChat ? (
                        <>
                            <div className="chatTop"> 
                                {messages.map((message) => (
                                    <div ref={scrollRef} key={message._id}>
                                        <Message message={message} own={message.sender === user.sub} />
                                    </div>
                                ))} 
                                
                            </div>
                            <div className="chatBottom">
                                <textarea 
                                    className="chatInput" 
                                    placeholder="say something"
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                ></textarea>
                                <button className="chatButton" onClick={handleSubmit}>Send</button>
                            </div> 
                            </>
                        ): (<h3>Select a aconversation or online user to begin</h3>)}
                            
                    </div>
                </div>
            </div>
        )
    )
}
