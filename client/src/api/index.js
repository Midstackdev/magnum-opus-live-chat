import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5001/api'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    return req
})


const users = '/users'
export const register = (data) => API.post(`${users}/register`, data)
export const blockUser = (data) => API.post(`${users}/block`, data)
export const getUser = (id) => API.get(`${users}/${id}`)
export const getUsers = () => API.get(`${users}/`)


const conversation = '/conversation'
export const getConversations = () => API.get(`${conversation}`)
export const createConversation = (data) => API.post(`${conversation}`, data)
export const showConversation = (id) => API.post(`${conversation}/${id}`)

const message = '/message'
export const getMessages = (id) => API.get(`${message}/${id}`)
export const postMessage = (data, id) => API.post(`${message}/${id}`, data)