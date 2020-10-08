import React, { useContext } from 'react'
import useSWR from "swr"
import { Context } from "../context"
import { checkTask, newTask } from "../services/tasks"
import { Form, Input, Button, Checkbox } from "antd"

function Home() {
  const { user } = useContext(Context)
  const { data, error } = useSWR('/api/tasks')
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  
  const onCheckboxChange = (taskId) => {
    checkTask(taskId)
  };

  const submitForm = async values => {
    await newTask(values)
    console.log(values)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
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
      {user && 
      <div>
        <h2> Create a new task</h2>
        <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={submitForm}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Task"
          name="description"
          rules={[{ required: true, message: 'Please add the description of the new task' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>}
    </>
  )
}

export default Home
