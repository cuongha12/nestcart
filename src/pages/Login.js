import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Spin, useForm } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticationUser } from '../redux/actions/user';
import axios from 'axios';

const Login = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinish = async (values) => {
        form.resetFields()
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/');
        }, 1000)
        // dispatch(authenticationUser(values))
        try {
            const res = await axios.post('/auth', values)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            localStorage.setItem('token', res.data.token)
            navigate('/');
            return res
        } catch (error) {
            console.log(error);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            {loading && <Spin />}
        </div>
    )
}

export default Login