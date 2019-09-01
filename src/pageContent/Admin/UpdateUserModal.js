import React, {Component} from 'react'
import {Button, Form, Input, message, Select} from 'antd';
import {addAjax, updateAjax} from "../../util/ajax";
import TextArea from "antd/lib/input/TextArea";

const { Option } = Select;

class UpdateUserModalClass extends Component {

    // 提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                // 这里可以获取所有的值
                console.log('Received values of form: ', fieldsValue);
                const {type} = this.props;
                // 添加   // 1-修改  2-添加  3-查看
                if(type === 2){
                    addAjax('/admin/user',fieldsValue)
                        .then(json =>{
                            if(json.data.flag){
                                this.props.initValue();
                                message.success(json.data.message);
                                // 其实是关闭模态框
                                this.props.handleCancel(1);
                            }else{
                                message.warn(json.data.message);
                            }

                        })
                }else if(type === 1) {
                    updateAjax('/admin/user',fieldsValue)
                        .then(json =>{
                            if(json.data.flag){
                                this.props.initValue();
                                message.success(json.data.message);
                                // 其实是关闭模态框
                                this.props.handleCancel(1);
                            }else{
                                message.warn(json.data.message);
                            }

                        })
                }
            }
        });
    };

    // 验证手机
    validatePhone = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value.startsWith('1') && value.length === 11) {
            callback();
        }else {
            callback('请输入正确的手机号码！');
        }

    };
    // 验证密码
    validatePassword = (rule, value, callback) => {

        const { form ,type} = this.props;
        // 如果是修改，密码就可以随便了
        if (type === 1 || value && value.length >=6 && value.length <=16) {
                callback();
        }else {
            callback('密码的长度6-16');
        }

    };


    componentDidMount() {
        const {data,type} = this.props;
        // 如果是修改
        if(type === 1){
            let {setFieldsValue} = this.props.form;
            setFieldsValue({
                id: data.id,
                phone: data.phone,
                nickName: data.nickName,
                description:data.description,
                roleId:data.roleId,
            });
        }

    }


    render() {
        let {getFieldDecorator} = this.props.form;
        const {roleList,type} = this.props;
        console.log('roleList --->',roleList)

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
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                {getFieldDecorator('id')(
                    <Input hidden={true}/>
                )}
                <Form.Item label="用户名(手机号)">
                    {getFieldDecorator('phone',{
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
                        <Input/>
                    )}
                </Form.Item>

                {type !== 3 &&
                <Form.Item label="密码">
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: false,
                                message: '密码在6-16位之间',
                            },
                            {
                                validator: this.validatePassword,
                            },
                        ],
                    })(
                        <Input/>
                    )}
                </Form.Item>
                }


                <Form.Item label="昵称">
                    {getFieldDecorator('nickName',{
                        rules: [
                            {
                                required: true,
                                message: '名字随便取',
                            },
                        ],
                    })(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item label="备注">
                    {getFieldDecorator('description')(
                       <TextArea/>
                    )}
                </Form.Item>


                <Form.Item label="角色">
                    {getFieldDecorator('roleId',{
                        rules: [
                            {
                                required: true,
                                message: '选一个角色吧',
                            },
                        ],
                    })(
                        <Select
                            placeholder="选择一个角色"
                        >
                            { roleList && roleList.length>0 && roleList.map((record,index) =>  <Option key={record.id} value={record.id}>{record.name}</Option> )}
                        </Select>
                    )}
                </Form.Item>



                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const UpdateUserModal = Form.create({name: 'validate_other'})(UpdateUserModalClass);

export default UpdateUserModal;
