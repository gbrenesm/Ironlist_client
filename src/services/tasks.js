import axios from "axios"

const baseURL = process.env.NODE_ENV === `production`? `/auth` : "http://localhost:3000/api"

const service = axios.create({ baseURL, withCredentials: true })

export const newTask = async description => {
  await service.post("/newtask", description)
}

export const userTask = async () => {
  const {data: tasks} = await service.get("/usertasks")
  return tasks
}

export const checkTask = async taskId => {
  await service.put(`${taskId}`)
  return true
}

export const deleteTask = async taskId => {
  await service.delete(`${taskId}`)
  return true
}