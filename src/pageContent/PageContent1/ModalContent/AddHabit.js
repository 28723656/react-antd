import React, {Component} from 'react'
import {Col, Form, Input, Modal, Row} from "antd";
import PropTypes from "prop-types";
import {addAjax, updateAjax} from "../../../util/ajax";
import {getUser} from "../../../util/userUtil";
import {getMomentTime} from "../../../util/momentUtil";

const {TextArea} = Input

class AddHabitClass extends Component{

    static propTypes = {
        data:PropTypes.object.isRequired,
        visible:PropTypes.bool.isRequired,
        handleModalDisappear:PropTypes.func.isRequired,
        initData:PropTypes.func.isRequired,
    }

    // 点击确定，提交修改/添加卡片信息
    handleOk =(e) =>{
        console.log("点了ok")
        const {initData,handleModalDisappear} = this.props
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const user = getUser();
                values.userId = user.id;
                // 如果有id,就是修改
                if (values.id) {
                    updateAjax('/plan/habit/user', values)
                        .then(response => {
                            initData();
                            handleModalDisappear();
                        })
                } else {
                    // 没有就是插入
                    addAjax('/plan/habit/user', values)
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
        const {getFieldDecorator,setFieldsValue} = this.props.form;

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
                        <Col span={12}>
                            {getFieldDecorator('id', {initialValue: data.id || null})(
                                <Input hidden={true}/>,
                            )}
                            <Form.Item label="名称">
                                {getFieldDecorator('name', {initialValue: data.name || ''})(
                                    <Input/>,
                                )}
                            </Form.Item>
                        </Col>

                        {!data.id &&
                        <Col span={12}>
                            <Form.Item label="坚持天数">
                                {getFieldDecorator('allDays', {initialValue: data.allDays || 14})(
                                    <Input type='number'/>,
                                )}
                            </Form.Item>
                        </Col>
                        }
                        {data.id &&
                        <div>
                            <Col offset={2} span={8}>
                                <Form.Item label="进度">
                                    <span >{data.keepDays}/{data.allDays}</span>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="开始时间">
                                    <span >{getMomentTime(data.startTime,'YYYY-MM-DD')}</span>
                                </Form.Item>
                            </Col>
                            <Col offset={2} span={8}>
                                <Form.Item label="有无拖延">
                                    <span >{data.type ===1?'无':'有'}</span>
                                </Form.Item>
                            </Col>
                        </div>
                        }


                    </Row>
                </Form>
            </Modal>
        )
    }
}

const AddHabit = Form.create({name: 'addHabit1'})(AddHabitClass);

export default AddHabit
