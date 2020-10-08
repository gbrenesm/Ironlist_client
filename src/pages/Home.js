import React, { useContext } from 'react'
import useSWR, { trigger } from "swr"
import { Context } from "../context"
import { checkTask, newTask } from "../services/tasks"
import { Form, Input, Button, Checkbox, Typography } from "antd"
const { Title } = Typography


function Home() {
  const { user } = useContext(Context)
  const { data, error } = useSWR('/api/tasks')
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  
  const onCheckboxChange = (taskId) => {
    checkTask(taskId)
    trigger('/api/tasks')
  };

  const submitForm = async values => {
    await newTask(values)
    console.log(values)
    trigger('/api/tasks')
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="home">
    <div>
    {user && <h1>Welcome {user.email}</h1>}
        <Title>To-do list</Title>
        <ul>
          {data? data.tasks.map((task, i) => (
            <>
            <div>
            {user && <Checkbox checked={task.completed === true? true : false} onChange={() => onCheckboxChange(task._id)}/>}
            <li style={task.completed === true? {textDecoration: "line-through"}:{}} key={i}>{task.description}</li>
            </div>
            {task.completedBy? <p>Completed by: {task.completedBy.email}</p>: <></>}
            </>
          )): <p>Aún no hay</p>}
        </ul>
    </div>
      {user && 
      <div>
        <Title level={2}> Create a new task</Title>
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
    </div>
  )
}

export default Home
