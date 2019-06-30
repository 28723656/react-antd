import React, {Component} from 'react'
import {Button, Checkbox, Col, Form, Icon, Input, Row, message} from 'antd';
import {addAjax, getAjax} from "../../util/ajax";


/**
 * 登陆界面
 */


class LoginClass extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                addAjax('/admin/user/login', values)
                    .then(response => {
                        const result = response.data;
                        if (result.flag) {

                            //找出通用计划
                            message.success(result.message);
                            localStorage.setItem("user", JSON.stringify(result.data.user));
                            localStorage.setItem("basePlanList", JSON.stringify(result.data.basePlanList));
                            // 由于我是登录后再加载出路由，所以，登录后，页面木有跳转
                            //  this.props.history.replace("/plan");
                            // console.log('this.props.history',this.props.history);
                            window.location = "/"
                        } else {
                            message.error(result.message);
                        }
                    })
                    .catch((error) =>{
                         message.error('请检查网络连接！');
                    })
            }
        });
    };

    handleRegister = () =>{
        this.props.history.push("/register");
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 22},
            },
        };

        return (
            <div>
                <Row>
                    <Col><h1 style={{marginTop: '15%', textAlign: 'center', color: '#323eee'}}>用户登陆</h1></Col>
                    <Col>
                        <div style={{textAlign: 'center'}}>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
                                <Form.Item>
                                    {getFieldDecorator('phone', {
                                        rules: [{required: true, message: 'Please input your username!'}],
                                    })(
                                        <Input style={{width: '80%'}}
                                               prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="账号（手机号）"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Please input your Password!'}],
                                    })(
                                        <Input style={{width: '80%'}}
                                               prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               type="password"
                                               placeholder="密码"
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
                                    <a style={{float: 'right', marginRight: '20%'}} onClick={this.handleRegister}>注册</a>
                                    <Button style={{width: '80%'}} block type="primary" htmlType="submit"
                                            className="login-form-button">
                                        登陆
                                    </Button>

                                </Form.Item>
                                <p>测试用户账号：123 密码：123</p>
                                <p>测试管理员账号：admin 密码：123456</p>
                            </Form>
                        </div>
                    </Col>

                </Row>
            </div>
        )
    }
}

const Login = Form.create({name: 'normal_login'})(LoginClass);

export default Login
