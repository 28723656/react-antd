import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';


/**
 * 登陆界面
 */
class LoginClass extends Component{

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        return (
            <div>
                <h1 style={{marginTop:'15%',textAlign:'center',color:'#323eee'}} >用户登陆</h1>
                <Form  {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住我</Checkbox>)}
                        <a className="login-form-forgot" href="">
                            忘记密码？
                        </a>
                        <a style={{float:'right',marginRight:'20%'}} href="">注册</a>
                        <Button block type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>

                    </Form.Item>
                </Form>
            </div>

        )
    }
}

const Login = Form.create({ name: 'normal_login' })(LoginClass);

export  default Login
