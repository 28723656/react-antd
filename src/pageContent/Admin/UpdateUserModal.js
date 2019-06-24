import React, {Component} from 'react'
import {Button, Form, Input, message,Select} from 'antd';
import {addAjax, updateAjax} from "../../util/ajax";
const { Option } = Select;

class UpdateUserModalClass extends Component {

    state ={
        type:0   // 0-修改  1-添加
    }


    // 提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                // 这里可以获取所有的值
                console.log('Received values of form: ', fieldsValue);
            }
        });
    };

    componentDidMount() {
        const {data} = this.props;
        if(data === null){
            console.log('新增')
            this.setState({type:1});
        }else{
            let {setFieldsValue} = this.props.form;
            setFieldsValue({
                id: data.id,
                phone: data.phone,
                nickName: data.nickName,
                roleId:data.roleId,
            });
        }

    }


    render() {
        let {getFieldDecorator} = this.props.form;

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
                <Form.Item label="用户名">
                    {getFieldDecorator('phone')(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item label="昵称">
                    {getFieldDecorator('nickName')(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item label="角色">
                    {getFieldDecorator('roleId')(
                        <Select
                            placeholder="选择一个角色"
                        >
                            <Option value={1}>管理员</Option>
                            <Option value={2}>普通用户</Option>
                            <Option value={3}>高级用户</Option>
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
