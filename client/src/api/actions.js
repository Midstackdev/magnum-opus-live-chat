import * as api from './index'

export const register = async(formData) => {
    try {
      await api.register(formData)
    } catch (error) {
      console.log(error.message)
    }
}

export const blockUser = async(formData) => {
    try {
      const {data} = await api.blockUser(formData)
      return data
    } catch (error) {
      console.log(error.message)
    }
}

export const getUser = async(id) => {
    try {
      const {data} = await api.getUser(id)
      return data
    } catch (error) {
      console.log(error.message)
    }
}

export const getUsers = async() => {
    try {
      const {data} = await api.getUsers()
      return data
    } catch (error) {
      console.log(error.message)
    }
}

export const getConversations = async() => {
    try {
      const { data } = await api.getConversations()
      return data
    } catch (error) {
      console.log(error.message)
    }
}

export const createConversation = async(formData) => {
    try {
      const { data } = await api.createConversation(formData)
      return data
    } catch (error) {
      console.log(error.message)
    }
}

export const showConversations = async() => {
    try {
        const { data } = await api.showConversation()
        return data
    } catch (error) {
        console.log(error.message)
    }
}

export const getMessages = async(id) => {
    try {
      const { data } = await api.getMessages(id)
      return data
    } catch (error) {
      console.log(error.message)
    }
}

export const postMessage = async(text, id) => {
    try {
      const { data } = await api.postMessage(text, id)
      return data
    } catch (error) {
      console.log(error.message)
    }
}