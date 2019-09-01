import React,{Component} from 'react'
import {Row,Col} from "antd";
import PropTypes from "prop-types";

class ShowPercentModal extends Component{

    static propTypes = {
        percentArr:PropTypes.array.isRequired,
    }

    render() {

        const {percentArr} = this.props

       const cardArr =  percentArr.filter(record => record.rewardType === 4)
       const coinArr =  percentArr.filter(record => record.rewardType === 1)
       const diamondArr =  percentArr.filter(record => record.rewardType === 2)
       const keyArr =  percentArr.filter(record => record.rewardType === 3)

        return (
            <div>
                <hr/>

                {cardArr.length > 0 &&
                <div>
                    <Row>
                        <Col span={6}>卡牌：</Col>
                        <Col span={18}>
                            {cardArr.map(record =>
                                <Row key={record.id}>
                                    <Col span={7}>{record.name}</Col>
                                    <Col span={7}>{record.cardType}</Col>
                                    <Col spaon={7}>{record.percent}%</Col>
                                </Row>
                            )}
                        </Col>
                    </Row>
                    <hr/>
                </div>
                }

                {coinArr.length > 0 &&
                <div>
                    <Row>
                        <Col span={6}>金币：</Col>
                        <Col span={18}>
                            {coinArr.map(record =>
                                <Row key={record.id}>
                                    <Col span={7}>{record.rewardNum}</Col>
                                    <Col span={7}>金币</Col>
                                    <Col spaon={7}>{record.percent}%</Col>
                                </Row>
                            )}
                        </Col>
                    </Row>
                    <hr/>
                </div>
                }

                {diamondArr.length > 0 &&
                <div>
                    <Row>
                        <Col span={6}>钻石：</Col>
                        <Col span={18}>
                            {diamondArr.map(record =>
                                <Row key={record.id}>
                                    <Col span={7}>{record.rewardNum}</Col>
                                    <Col span={7}>钻石</Col>
                                    <Col spaon={7}>{record.percent}%</Col>
                                </Row>
                            )}
                        </Col>
                    </Row>
                    <hr/>
                </div>
                }

                {keyArr.length > 0 &&
                <div>
                    <Row>
                        <Col span={6}>钥匙：</Col>
                        <Col span={18}>
                            {keyArr.map(record =>
                                <Row key={record.id}>
                                    <Col span={7}>{record.rewardNum}</Col>
                                    <Col span={7}>钥匙</Col>
                                    <Col spaon={7}>{record.percent}%</Col>
                                </Row>
                            )}
                        </Col>
                    </Row>
                    <hr/>
                </div>
                }

            </div>
        )
    }
}

export default ShowPercentModal
