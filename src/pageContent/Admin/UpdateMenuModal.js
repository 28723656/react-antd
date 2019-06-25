import React, {Component} from 'react'
import {Button, Form, Input, message, Select} from 'antd';
import {addAjax, updateAjax} from "../../util/ajax";

const { Option } = Select;

class UpdateMenuModalClass extends Component {


    // 提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                // 这里可以获取所有的值
                console.log('Received values of form: ', fieldsValue);
                const {type} = this.props;
                // 添加
                if(type === 2){
                    addAjax('/admin/menu',fieldsValue)
                        .then(json =>{
                            if(json.data.flag){
                                this.props.initValue();
                                message.success(json.data.message);
                            }else{
                                message.warn(json.data.message);
                            }
                            // 其实是关闭模态框
                            this.props.handleCancel(3);
                        })
                }else if(type === 1) {
                    // 修改
                    updateAjax('/admin/menu',fieldsValue)
                        .then(json =>{
                            if(json.data.flag){
                                this.props.initValue();
                                message.success(json.data.message);
                            }else{
                                message.warn(json.data.message);
                            }
                            // 其实是关闭模态框
                            this.props.handleCancel(3);
                        })
                }

            }
        });
    };

    componentDidMount() {
        const {data,type} = this.props;
        if(type === 1){
            let {setFieldsValue} = this.props.form;
            setFieldsValue({
                id: data.id,
                name: data.name,
                description: data.description,
            });
        }

    }


    render() {
        let {getFieldDecorator} = this.props.form;
        const {type,roleListByMenuId,data} = this.props;

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
                {type !== 3 &&  <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                    {getFieldDecorator('id')(
                        <Input hidden={true}/>
                    )}
                    <Form.Item label="菜单(路径名)">
                        {getFieldDecorator('name')(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="菜单(中文名)">
                        {getFieldDecorator('description')(
                            <Input/>
                        )}
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>}
                {type === 3 &&
                <div>
                    <p>角色列表：</p>
                    {roleListByMenuId.map((record,index) =>{
                        if(record.tempMenuId === data.id){
                            return  <p key={record.id} style={{marginLeft:'20%'}} >{record.name}</p>
                        }
                    })}
                </div>
                }

            </div>

        );
    }
}

const UpdateMenuModal = Form.create({name: 'validate_other'})(UpdateMenuModalClass);

export default UpdateMenuModal;
