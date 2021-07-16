import User from "../models/User.js"

export const index = async(req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(200).json({ message: error.message })
    }
}

export const register = async(req, res) => {
    const body = {
        sub: req.userId,
        name: req.body.name,
        email: req.body.email,
        nickname: req.body.nickname,
        picture: req.body.picture,
    }

    try {
        const userExists = await User.findOne({sub: req.userId })
        if(!userExists) {
            const user = await User.create(body)
            return res.status(200).json(user)
        }else {
            return res.status(403).json({ message: 'User exists' })
        }
    } catch (error) {
        res.status(200).json({ message: error.message })
    }
}

export const block = async(req, res) => {
    try {
        const user = await User.findOne({ sub: req.userId })
        if(!user) return res.status(404).json({ message: "No user found" })
        
        if(!user.blocked.includes(req.body.user)) {
            await user.updateOne({ $push: {blocked: req.body.user} })
            return res.status(200).json({ message: 'the user is has been blocked'})
        }else {
            await user.updateOne({ $pull: {blocked: req.body.user} })
            return res.status(200).json({ message: 'the user is has been unblocked'})     
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const show = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findOne({ sub: userId })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)  
    }
    
}