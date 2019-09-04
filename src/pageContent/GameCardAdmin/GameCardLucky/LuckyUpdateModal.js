import React,{Component} from 'react'
import {Col, Input, Modal, Row, Select,Form} from "antd";
import PropTypes from "prop-types";
import {addAjax, updateAjax} from "../../../util/ajax";
const {Option} = Select
const {TextArea} = Input;

class LuckyUpdateModalForm extends Component{

    static propTypes = {
        luckyTitle:PropTypes.string.isRequired,
        visibleLucky:PropTypes.bool.isRequired,
        handleLuckyCancel:PropTypes.func.isRequired,
        initLuckyData:PropTypes.func.isRequired,
        luckyEntity:PropTypes.object.isRequired,

    }

    // 提交修改概率数据
    handleLuckyOk =(e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 处理了一下产出的显示  把 BASCD转化成 SABCD
                const output = values.output;
                let testArr = output.sort();  // ABCDS
                if(testArr.indexOf('S')!==-1){
                    testArr.unshift(testArr.splice(testArr.length-1,1)[0]);
                }
                values.output=testArr.join('');
                console.log('Received values of form: ', values);

                // 修改
                if(values.id){
                    updateAjax('/game/lucky',values)
                        .then(response =>{
                            this.props.initLuckyData();
                        })
                }else {
                    // 添加
                    addAjax('/game/lucky',values)
                        .then(response =>{
                            this.props.initLuckyData();
                        })
                }

            }
        });
        this.props.handleLuckyCancel();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {luckyTitle,visibleLucky,handleLuckyCancel,luckyEntity} = this.props

        return (
            <Modal
                destroyOnClose={true}
                title={luckyTitle}
                visible={visibleLucky}
                onOk={this.handleLuckyOk}
                onCancel={handleLuckyCancel}
            >
                <Form >
                    <Row gutter={5}>

                        <Col xs={24}>
                            <Form.Item label="抽奖名称">
                                {getFieldDecorator('name', {initialValue: luckyEntity.name || ''})(
                                    <Input />,
                                )}
                            </Form.Item>
                        </Col>

                        <Col xs={12}>
                            {getFieldDecorator('id', {initialValue: luckyEntity.id || null})(
                                <Input hidden={true}/>,
                            )}
                            <Form.Item label="类型">
                                {getFieldDecorator('type', {initialValue: luckyEntity.type || 1})(
                                    <Select>
                                        <Option value={1}>免费卡包</Option>
                                        <Option value={2}>普通卡包</Option>
                                        <Option value={3}>高级卡包</Option>
                                        <Option value={4}>至尊卡包</Option>
                                    </Select>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={12}>
                            <Form.Item label="产出">
                                {getFieldDecorator('output', {initialValue: luckyEntity.output && luckyEntity.output.split('') || ['D']})(
                                    <Select mode="multiple">
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
                            <Form.Item label="单次花费">
                                {getFieldDecorator('onceCost', {initialValue: luckyEntity.onceCost || 1})(
                                    <Input type='number' />,
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={8}>
                            <Form.Item label="10次花费">
                                {getFieldDecorator('tenTimesCost', {initialValue: luckyEntity.tenTimesCost || 10})(
                                    <Input type='number' />,
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={8}>
                            <Form.Item label="花费单位">
                                {getFieldDecorator('costType', {initialValue: luckyEntity.costType || 1})(
                                    <Select>
                                        <Option value={1}>💰--金币</Option>
                                        <Option value={2}>💎--钻石</Option>
                                        <Option value={3}>🔑--钥匙</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item label="描述">
                                {getFieldDecorator('description', {initialValue: luckyEntity.description || '免费的卡包，还等啥'})(
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


const LuckyUpdateModal = Form.create({name: 'game_card_modal3'})(LuckyUpdateModalForm);

export default LuckyUpdateModal
