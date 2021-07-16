import Message from "../models/Message.js"


export const me = (req, res) => {
    res.status(200).json({ name: 'Alfred Smith' })
}

export const create = async(req, res) => {
    const body = {
        conversationId: req.params.id,
        sender: req.userId,
        text: req.body.text
    }
    try {
        const message = await Message.create(body)
        
        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const index = async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.id })
        
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json(error)
    }
}