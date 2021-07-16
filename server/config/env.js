import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

export const setEnvironment = (app) => {
    if(process.env.NODE_ENV !== 'production') {
        setDevEnv(app)
    }else {
        setProdEnv(app)
    }
}

const setDevEnv = (app) => {
    process.env.NODE_ENV = 'development'
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(morgan('common'))
    app.use(cors())
}

const setProdEnv = (app) => {
    process.env.NODE_ENV === 'production'
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors())
}