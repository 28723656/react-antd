import React, {Component} from 'react'
import {Button, Form, Input, message, Select} from 'antd';
import {addAjax, updateAjax} from "../../util/ajax";
import TextArea from "antd/lib/input/TextArea";

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
                const {type} = this.state;
                // 添加
                if(type === 1){
                    addAjax('/admin/user',fieldsValue)
                        .then(json =>{
                            if(json.data.flag){
                                message.success(json.data.message);
                            }else{
                                message.warn(json.data.message);
                            }
                            // 其实是关闭模态框
                            this.props.handleCancel(1);
                        })
                }else {
                    updateAjax('/admin/user',fieldsValue)
                        .then(json =>{
                            if(json.data.flag){
                                message.success(json.data.message);
                            }else{
                                message.warn(json.data.message);
                            }
                            // 其实是关闭模态框
                            this.props.handleCancel(1);
                        })
                }

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
                description:data.description,
                roleId:data.roleId,
            });
        }

    }


    render() {
        let {getFieldDecorator} = this.props.form;
        const {roleList} = this.props;
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
                    {getFieldDecorator('phone')(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item label="密码">
                    {getFieldDecorator('password')(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item label="昵称">
                    {getFieldDecorator('nickName')(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item label="备注">
                    {getFieldDecorator('description')(
                       <TextArea/>
                    )}
                </Form.Item>


                <Form.Item label="角色">
                    {getFieldDecorator('roleId')(
                        <Select
                            placeholder="选择一个角色"
                        >
                            { roleList && roleList.length>0 && roleList.map((record,index) =>  <Option value={record.id}>{record.name}</Option> )}
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
