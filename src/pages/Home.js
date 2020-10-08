import React, { useContext, useState } from 'react'
import useSWR from "swr"
import { Context } from "../context"
import { checkTask } from "../services/tasks"
import { Checkbox } from "antd"

function Home() {
  const { user } = useContext(Context)
  const { data, error } = useSWR('/api/tasks')
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  
  const onCheckboxChange = (taskId)=> {
    checkTask(taskId)
  };

  return (
    <>
    {user && <h1>Welcome {user.email}</h1>}
    <div>
        <h1>To-do list</h1>
        <ul>
          {data? data.tasks.map((task, i) => (
            <>
            <Checkbox checked={task.completed === true? true : false} onChange={() => onCheckboxChange(task._id)}/>
            <li style={task.completed === true? {textDecoration: "line-through"}:{}} key={i}>{task.description}</li>
              {task.completedBy? <p>Completed by: {task.completedBy.email}</p>: <></>}
            </>
          )): <p>Aún no hay</p>}
        </ul>
     </div>
    </>
  )
}

export default Home
