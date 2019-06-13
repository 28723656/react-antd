import React, {Component} from 'react'
import {Button, Form, Input, InputNumber, Select,message} from 'antd';
import {addAjax, updateAjax} from '../../util/ajax'

class ModalContentClass extends Component {

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
                    addAjax('/plan/book',fieldsValue)
                        .then(json =>{
                            if(json.data.flag){
                                message.success(json.data.message);
                            }else{
                                message.warn(json.data.message);
                            }
                            // 其实是关闭模态框
                            this.props.handleCancel();
                        })
                }else {
                    updateAjax('/plan/book',fieldsValue)
                        .then(json =>{
                            if(json.data.flag){
                                message.success(json.data.message);
                            }else{
                                message.warn(json.data.message);
                            }
                            // 其实是关闭模态框
                            this.props.handleCancel();
                        })
                }


            }
        });
    };

    componentDidMount() {
        const {data} = this.props;
        if(data.id === undefined){
            console.log('ok')
            this.setState({type:1});
        }
        let {setFieldsValue} = this.props.form;
        setFieldsValue({
            id: data.id,
            bookName: data.bookName,
            bookDescription: data.bookDescription,
            price:data.price,
        });
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

                <Form.Item label="姓名">
                    {getFieldDecorator('bookName')(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item label="电话">
                    {getFieldDecorator('bookDescription')(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item label="学号">
                    {getFieldDecorator('price')(
                        <Input/>
                    )}
                </Form.Item>


                <Form.Item wrapperCol={{span: 12, offset: 6}}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const ModalContent = Form.create({name: 'validate_other'})(ModalContentClass);

export default ModalContent;
