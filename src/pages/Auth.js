import React, { useContext, useState } from 'react'
import { Context } from "../context"
import { signup, login } from "../services/auth"
import { Form, Input, Button } from 'antd';
import { Link } from "react-router-dom"
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Auth({ history }) {
    const { ctxUser } = useContext(Context)
    const [signupForm, setsignupForm] = useState(true)

    const onFinishSigunp = async values => {
      await signup(values)
      setsignupForm(false)
    };

    const onFinishLogin = async values => {
      const user = await login(values)
      ctxUser(user)
      history.push("/")
    }
  
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    const changeFrom = () => {
      setsignupForm(false)
    }

  return (
    <>
    {signupForm &&
    <>
      <h1> Create an acount</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinishSigunp}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please provide an email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please provide a password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <p>Al redy have an acount? <Link onClick={changeFrom}>Login</Link></p>
    </>}
    {!signupForm &&
    <>
      <h1> Login</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinishLogin}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please provide an email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please provide a password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>}
    </>
  )
}

export default Auth
