import mongoose from 'mongoose'
import keys from './keys.js'



const CONNECTION_URL = keys.mongoURI

export const connectToDB = () => {
    
    mongoose.connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }, () => {
        console.log('mongo connected')
    })
}