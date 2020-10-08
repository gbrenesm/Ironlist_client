import React, { useState, useEffect } from 'react'
import { userTask, deleteTask } from "../services/tasks"
import { Button, Typography } from 'antd'
const { Title } = Typography

function UserTasks() {
const [tasks, setTasks] = useState(null)
const [beDeleted, setbeDeleted] = useState(false)

async function fetchTasks(){
  const usert = await userTask()
  setTasks(usert.tasks.createdTasks)
}

async function delte(taskId){
  await deleteTask(taskId)
  setbeDeleted(true)
}

useEffect(() => {
  fetchTasks()
  setbeDeleted(false)
}, [beDeleted])

  return (
    <div className="usertasks">
      <Title>Your tasks</Title>
        {tasks?.map((task, i) => (
            <div>
            <li style={task.completed === true? {textDecoration: "line-through"}:{}} key={i}>{task.description}</li>
            <Button onClick={()=>delte(task._id)} danger>Delete task</Button>
            </div>
          ))}
    </div>
  )
}

export default UserTasks
