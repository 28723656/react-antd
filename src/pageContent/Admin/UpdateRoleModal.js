import React, {Component} from 'react'
import {Button, Form, Input, message,Select} from 'antd';
import {addAjax, updateAjax} from "../../util/ajax";
import TextArea from "antd/es/input/TextArea";
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
                name: data.name,
                description: data.description,
                menuId:data.menuId,
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
                <Form.Item label="角色名">
                    {getFieldDecorator('name')(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item label="描述">
                    {getFieldDecorator('description')(
                       <TextArea/>
                    )}
                </Form.Item>
                <Form.Item label="权限菜单">
                    {getFieldDecorator('menuId')(
                        <Select
                            mode="multiple"
                            placeholder="选择权限菜单"
                        >
                            <Option value={1}>今日计划</Option>
                            <Option value={2}>动漫</Option>
                            <Option value={3}>更新日志</Option>
                            <Option value={4}>计划统计</Option>
                            <Option value={5}>系统管理</Option>
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
