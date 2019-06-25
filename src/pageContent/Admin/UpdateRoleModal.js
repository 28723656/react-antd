import React, {Component} from 'react'
import {Button, Form, Input, message, Select} from 'antd';
import {addAjax, updateAjax} from "../../util/ajax";
import TextArea from "antd/es/input/TextArea";

const {Option} = Select;

class UpdateUserModalClass extends Component {


    // 提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                // 这里可以获取所有的值
                console.log('Received values of form: ', fieldsValue);
                const {type} = this.props;
                // 添加
                if (type === 2) {
                    addAjax('/admin/role', fieldsValue)
                        .then(json => {
                            if (json.data.flag) {
                                this.props.initValue();
                                message.success(json.data.message);
                            } else {
                                message.warn(json.data.message);
                            }
                            // 其实是关闭模态框
                            this.props.handleCancel(2);
                        })
                } else if (type === 1) {
                    // 修改
                    updateAjax('/admin/role', fieldsValue)
                        .then(json => {
                            if (json.data.flag) {
                                this.props.initValue();
                                message.success(json.data.message);
                            } else {
                                message.warn(json.data.message);
                            }
                            // 其实是关闭模态框
                            this.props.handleCancel(2);
                        })
                }

            }
        });
    };

    componentDidMount() {
        const {data, type} = this.props;
        if (type === 1) {
            let {setFieldsValue} = this.props.form;
            setFieldsValue({
                id: data.id,
                name: data.name,
                description: data.description,
                menuId: data.menuId,
            });
        }

    }


    render() {
        let {getFieldDecorator} = this.props.form;
        const {menuList, userListByRoleId, type, data} = this.props;

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
                {type !== 3 && <Form {...formItemLayout} onSubmit={this.handleSubmit}>

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
                                {menuList && menuList.length > 0 && menuList.map((record, index) => <Option
                                    key={record.id} value={record.id}>{record.description}</Option>)}
                            </Select>
                        )}
                    </Form.Item>


                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>}
                {type === 3 && <div>
                    <p>用户列表：</p>
                    {userListByRoleId.map((record, index) => {
                        if (record.roleId === data.id) {
                            return <p key={record.id} style={{marginLeft: '20%'}}>{record.nickName}</p>
                        }
                    })
                    }
                </div>}
            </div>
        );
    }
}

const UpdateUserModal = Form.create({name: 'validate_other'})(UpdateUserModalClass);

export default UpdateUserModal;
