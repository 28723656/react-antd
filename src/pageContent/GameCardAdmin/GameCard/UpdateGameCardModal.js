import React,{Component} from 'react'
import {Col, Input, Modal, Row, Select,Form} from "antd";
import {addAjax, updateAjax} from "../../../util/ajax";
import PropTypes from "prop-types";

const {Option} = Select
const {TextArea} = Input;

class UpdateGameCardModalForm extends Component{

    static propTypes = {
        cardEntity:PropTypes.object.isRequired,
        initCardData:PropTypes.func.isRequired,
        visibleCard:PropTypes.bool.isRequired,
        cardTitle:PropTypes.string.isRequired,
        handleCardCancel:PropTypes.func.isRequired,
    }


    // 点击确定，提交修改/添加卡片信息
    handleCardOk =(e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // 如果有id,就是修改
                if (values.id) {
                    updateAjax('/game/card', values)
                        .then(response => {
                            this.props.handleCardCancel();
                            this.props.initCardData();

                        })
                } else {
                    // 没有就是插入
                    addAjax('/game/card', values)
                        .then(response => {
                            this.props.handleCardCancel();
                            this.props.initCardData();
                        })
                }
            }
        });
    }


    // 点击取消
    handleCardCancel = () => {
        this.props.handleCardCancel();
    }

    render() {

        const {getFieldDecorator} = this.props.form;
        const {cardTitle,visibleCard,cardEntity} = this.props;

        return (
            <Modal
                title={cardTitle}
                visible={visibleCard}
                onOk={this.handleCardOk}
                onCancel={this.handleCardCancel}
            >
                <Form >
                    <Row gutter={5}>
                        <Col xs={8}>
                            {getFieldDecorator('id', {initialValue: cardEntity.id || null})(
                                <Input hidden={true}/>,
                            )}
                            <Form.Item label="名称">
                                {getFieldDecorator('name', {initialValue: cardEntity.name || 'D'})(
                                    <Input/>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={8}>
                            <Form.Item label="类型">
                                {getFieldDecorator('type', {initialValue: cardEntity.type || 'D'})(
                                    <Select>
                                        <Option value="S">S级</Option>
                                        <Option value="A">A级</Option>
                                        <Option value="B">B级</Option>
                                        <Option value="C">C级</Option>
                                        <Option value="D">D级</Option>
                                    </Select>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={8}>
                            <Form.Item label="最高星级">
                                {getFieldDecorator('topStar', {initialValue: cardEntity.topStar || 3})(
                                    <Select>
                                        <Option value={1}>1星</Option>
                                        <Option value={2}>2星</Option>
                                        <Option value={3}>3星</Option>
                                        <Option value={4}>4星</Option>
                                        <Option value={5}>5星</Option>
                                        <Option value={6}>6星</Option>
                                        <Option value={7}>7星</Option>
                                        <Option value={8}>8星</Option>
                                        <Option value={9}>9星</Option>
                                        <Option value={10}>10星</Option>
                                    </Select>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={12}>
                            <Form.Item label="昵称">
                                {getFieldDecorator('nickName', {initialValue: cardEntity.nickName || 'D级卡片'})(
                                    <Input/>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={12}>
                            <Form.Item label="技能">
                                {getFieldDecorator('skill', {initialValue: cardEntity.skill || 1})(
                                    <Select>
                                        <Option value={1}>金币加成</Option>
                                        <Option value={2}>经验加成</Option>
                                        <Option value={3}>免费抽卡加成</Option>
                                    </Select>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item label="描述">
                                {getFieldDecorator('description', {initialValue: cardEntity.description || '这是D级卡片'})(
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

const UpdateGameCardModal = Form.create({name: 'game_card_modal1'})(UpdateGameCardModalForm);

export default UpdateGameCardModal
