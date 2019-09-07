import React, {Component} from 'react'
import {Col, Form, Input, Modal, Row} from "antd";
import PropTypes from "prop-types";
import {addAjax, updateAjax} from "../../util/ajax";

const {TextArea} = Input

class UpdateSonModalClass extends Component{

    static propTypes = {
        data:PropTypes.object.isRequired,
        visible:PropTypes.bool.isRequired,
        handleModalDisappear:PropTypes.func.isRequired,
        initData:PropTypes.func.isRequired,
        parentData:PropTypes.object.isRequired,
    }

    // 点击确定，提交修改/添加卡片信息
    handleOk =(e) =>{
        console.log("点了ok")
        const {initData,handleModalDisappear,parentData} = this.props
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            values.parentId = parentData.id;
            if (!err) {
                console.log('Received values of form: ', values);
                // 如果有id,就是修改
                if (values.id) {
                    updateAjax('/plan/dict', values)
                        .then(response => {
                            initData();
                            handleModalDisappear();
                        })
                } else {
                    // 没有就是插入
                    addAjax('/plan/dict', values)
                        .then(response => {
                            initData();
                            handleModalDisappear();
                        })
                }
            }
        });
    }



    handleCancel = e => {
        console.log('点了取消')
       this.props.handleModalDisappear();
    };

    render() {
        const {data,visible} = this.props
        console.log(data.id)
        const {getFieldDecorator} = this.props.form;

        return (
            <Modal
                destroyOnClose={true}
                title="修改"
                visible={visible}
                onOk ={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form >
                    <Row gutter={5}>
                        <Col xs={data.id?8:12}>
                            {getFieldDecorator('id', {initialValue: data.id || null})(
                                <Input hidden={true}/>,
                            )}
                            <Form.Item label="code">
                                {getFieldDecorator('code', {initialValue: data.code || ''})(
                                    <Input/>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={data.id?8:12}>
                            <Form.Item label="名称">
                                {getFieldDecorator('name', {initialValue: data.name || ''})(
                                    <Input/>,
                                )}
                            </Form.Item>
                        </Col>
                        { data.id &&   <Col xs={8}>
                            <Form.Item label="序号">
                                {getFieldDecorator('orderList', {initialValue: data.orderList || 1})(
                                    <Input type='number'/>,
                                )}
                            </Form.Item>
                        </Col>}

                        <Col xs={24}>
                            <Form.Item label="描述">
                                {getFieldDecorator('description', {initialValue: data.description || '该用户没有评论，默认好评!'})(
                                    <TextArea rows={3}></TextArea>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}

const UpdateSonModal= Form.create({name: 'UpdateSonForm1'})(UpdateSonModalClass);

export default UpdateSonModal
