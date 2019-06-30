import React, {Component} from 'react'
import {Button, Form, Input, message, Select, Row, Col, Icon} from 'antd';
import {addAjax} from "../../util/ajax";


class RegisterClass extends Component {

    // 提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                console.log('Received values of form: ', fieldsValue);
                addAjax('/admin/user', fieldsValue)
                    .then(json => {
                        if (json.data.flag) {
                            message.success('注册成功,正在跳转... ...');
                            setTimeout(()=>{window.location='/'},1500);
                        } else {
                            message.warn(json.data.message);
                        }

                    })
            }
        });
    };

    // 验证手机
    validatePhone = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value.startsWith('1') && value.length === 11) {
            callback();
        } else {
            callback('请输入正确的手机号码！');
        }

    };
    // 验证密码
    validatePassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value.length >= 6 && value.length <= 16) {
            callback();
        } else {
            callback('密码的长度6-16');
        }

    };



    render() {
        let {getFieldDecorator} = this.props.form;

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
                    <Col span={2}  >
                        <a href='/'><Button type="primary" style={{marginTop:'59%'}}>
                            <Icon type="left"/>
                            back
                        </Button></a></Col>
                    <Col><h1 style={{marginTop: '10%', textAlign: 'center', color: '#323eee'}}>用户注册</h1></Col>
                    <Col>
                        <div style={{textAlign: 'center'}}>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item >
                                    {getFieldDecorator('phone', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '输入合法的手机号!',
                                            },
                                            {
                                                validator: this.validatePhone,
                                            },
                                        ],
                                    })(
                                        <Input style={{width: '80%'}}
                                               prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="账号（手机号）"
                                        />
                                    )}
                                </Form.Item>

                                <Form.Item >
                                    {getFieldDecorator('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '密码在6-16位之间',
                                            },
                                            {
                                                validator: this.validatePassword,
                                            },
                                        ],
                                    })(
                                        <Input style={{width: '80%'}}
                                               prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               type="password"
                                               placeholder="密码"
                                        />
                                    )}
                                </Form.Item>

                                <Form.Item >
                                    {getFieldDecorator('nickName', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '名字随便取',
                                            },
                                        ],
                                    })(
                                        <Input style={{width: '80%'}}
                                               prefix={<Icon type="idcard" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="昵称"
                                        />
                                    )}
                                </Form.Item>

                                <Form.Item>
                                    <Button style={{width: '80%'}}  block type="primary" htmlType="submit">
                                        提交
                                    </Button>
                                </Form.Item>
                            </Form>

                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}

const Register = Form.create({name: 'validate_other'})(RegisterClass);

export default Register;
