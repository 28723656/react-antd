import React, {Component} from 'react'
import PropTypes from "prop-types";
import {Col, Row} from "antd";

class MyMoney extends Component {

    static propTypes = {
        userCoin: PropTypes.array.isRequired,
        userSkill: PropTypes.object.isRequired,
    }

    render() {

        const {userCoin, userSkill} = this.props
        console.log('userSkill', userSkill)

        let coinNum = 0;
        let diamondNum = 0;
        let keyNum = 0;
        userCoin.length > 0 && userCoin.map(record => {
            if (record.type === 1) {
                coinNum = record.moneyNum;
            } else if (record.type === 2) {
                diamondNum = record.moneyNum
            } else if (record.type === 3) {
                keyNum = record.moneyNum
            }
        })

        return (
            <div>
                <Row>
                    <Col xs={6} md={4} xl={3}>我的货币：</Col>
                    <Col xs={6} md={4} xl={3}>{coinNum}💰</Col>
                    <Col xs={6} md={4} xl={3}>{diamondNum}💎</Col>
                    <Col xs={6} md={4} xl={3}>{keyNum}🔑</Col>
                </Row>

                <Row>
                    <Col xs={6} md={4} xl={3}>我的技能：</Col>
                    <Col xs={10} md={4} xl={3}>金币: +{userSkill.incCoin || 0}%</Col>
                    <Col xs={8} md={4} xl={3}>经验: +{userSkill.incExperience || 0}%</Col>
                    <Col xs={{offset:6,span:16}} md={{offset:0,span:8}} xl={{offset:0,span:8}}>钥匙: {userSkill.lowPercent || 0}-{userSkill.topPercent || 0}个</Col>
                </Row>

            </div>


        )
    }
}

export default MyMoney
