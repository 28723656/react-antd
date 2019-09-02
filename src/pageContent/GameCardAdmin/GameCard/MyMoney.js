import React, {Component} from 'react'
import PropTypes from "prop-types";
import {Col, Row} from "antd";

class MyMoney extends Component{

    static propTypes = {
        userCoin: PropTypes.array.isRequired,
    }

    render() {

        const {userCoin} = this.props

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
            <Row>
                <Col xs={6} md={4}>我的货币：</Col>
                <Col xs={6} md={3}>{coinNum}💰</Col>
                <Col xs={6} md={3}>{diamondNum}💎</Col>
                <Col xs={6} md={3}>{keyNum}🔑</Col>
            </Row>
        )
    }
}

export default MyMoney
