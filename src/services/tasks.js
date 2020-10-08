import axios from "axios"

const baseURL = process.env.NODE_ENV === `production`? `/auth` : "http://localhost:3000/api"

const service = axios.create({ baseURL, withCredentials: true })

export const newTask = async description => {
  await service.post("/newtask", description)
}

export const checkTask = async taskId => {
  await service.put(`${taskId}`)
  return true
}