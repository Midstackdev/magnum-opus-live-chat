import Conversation from "../models/Conversation.js"


export const me = (req, res) => {
    res.status(200).json({ name: 'Alfred Smith' })
}

export const create = async(req, res) => {
    const conversationExists = await Conversation.findOne({
        members: { $all: [req.userId, req.body.receiverId] }
    })
    if(!conversationExists) {
        const newConversation = new Conversation({
            members: [req.userId, req.body.receiverId]
        })
        
        try {
            const savedConversation = await newConversation.save()
            return res.status(200).json(savedConversation)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    return res.status(403).json({message: 'Conversation exists'})
}

export const index = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.userId] }
        })
        return res.status(200).json(conversations)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const show = async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id)
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json(error)
    }
}