import React, {Component} from 'react'
import {Col, Form, Input, Modal, Row, Select} from "antd";
import {updateAjax} from "../../../util/ajax";
import PropTypes from "prop-types";

class UpdateGameCardStarModalForm extends Component{

    static propTypes = {
        visibleStar:PropTypes.bool.isRequired,
        cardEntity:PropTypes.object.isRequired,
        handleStarCancel:PropTypes.func.isRequired,
        starArr:PropTypes.array.isRequired,
        starData:PropTypes.array.isRequired,
    }


    // 模态框，【星级管理】点击确定,修改升星的一些东西
    handleStarOk = e => {
        this.props.handleStarCancel();
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                updateAjax(`/game/upgrade`, values);
            }
        });
    };

    handleStarCancel = () => {
        this.props.handleStarCancel();
    }

    render() {

        const {getFieldDecorator} = this.props.form;
        const {visibleStar,cardEntity,starArr,starData} = this.props

        return (
            <Modal
                title="升星管理"
                visible={visibleStar}
                onOk={this.handleStarOk}
                onCancel={this.handleStarCancel}
            >
                <Form >
                    <Row gutter={5}>
                        {getFieldDecorator('id', {initialValue: cardEntity.id || null})(
                            <Input hidden={true}/>,
                        )}

                        {
                            starArr.map((value, index) =>{
                                const label = value + '星'
                                const starName = 'star' + value
                                let initialValue = starData.filter((record) =>record.star === value)
                                if(initialValue[0] !== undefined){
                                    initialValue = initialValue[0].num ;
                                }else {
                                    initialValue =''
                                }
                                return <Col xs={8} key={index}>
                                    <Form.Item label={label}>
                                        {getFieldDecorator(starName, {initialValue:initialValue || '' })(
                                            <Input suffix="张"/>,
                                        )}
                                    </Form.Item>
                                </Col>
                            })
                        }
                    </Row>
                </Form>
            </Modal>
        )
    }
}

const UpdateGameCardStarModal = Form.create({name: 'game_card_modal2'})(UpdateGameCardStarModalForm);

export default UpdateGameCardStarModal
