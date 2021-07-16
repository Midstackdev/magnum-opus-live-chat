import dotenv from 'dotenv'
dotenv.config()

const keys =  {
    mongoURI: 'mongodb+srv://modstacks:fYv4LqCvHohMISGN@cluster0.yuaby.mongodb.net/opus?retryWrites=true&w=majority',
    port: process.env.PORT || '5001',
}

export default keys