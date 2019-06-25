import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox,Row,Col } from 'antd';

import bgImage from './bg.png'
import bgImage2 from './bg2.png'

/**
 * 登陆界面
 */

const homeImage ={
    background: `url(${ bgImage2})` ,

}

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
            <div style={homeImage} >
            <Row>
                <Col><h1 style={{marginTop:'15%',textAlign:'center',color:'#323eee'}} >用户登陆</h1></Col>
                <Col>
                    <div style={{textAlign:'center'}} >
                    <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input style={{width:'80%'}}
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input style={{width:'80%'}}
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
                            <Button style={{width:'80%'}} block type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>

                        </Form.Item>
                    </Form>
                    </div>
                </Col>

            </Row>
            </div>
        )
    }
}

const Login = Form.create({ name: 'normal_login' })(LoginClass);

export  default Login
