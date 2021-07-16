import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    nickname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    picture:{
        type: String,
    },
    sub:{
        type: String,
        required: true
    },
    blocked: {
        type: Array,
        default: []
    }
},{
    timestamps: true
})

export default mongoose.model('User', userSchema)