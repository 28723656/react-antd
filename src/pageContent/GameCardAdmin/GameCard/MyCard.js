import React, {Component} from 'react'
import {Card} from "antd";
import {GenNonDuplicateID} from "../../../util/randomUtil";
import {Col, Row} from "antd";

import PropTypes from "prop-types";
import {browserRedirect} from "../../../util/whichDevice";


const gridStylePad = {
    width: '50%',
    textAlign: 'left',
    padding: '8px',
    border: '#229282 1px solid',
};

const gridStylePhone = {
    width: '100%',
    textAlign: 'left',
    padding: '8px',
    border: '#229282 1px solid',
};

class MyCard extends Component {

    static propTypes = {
        cardData: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
    }

    render() {

        const {cardData, title} = this.props
        const phone = browserRedirect();

        return (
            <Card title={title}>
                {cardData.length > 0 && cardData.map(record => {
                    // 黑色星星的数量
                    const blackStar = record.currentStar
                    const whiteStar = record.topStar - record.currentStar

                    let blackStarStr = ''
                    let WhiteStarStr = ''
                    for (let i = 0; i < blackStar; i++) {
                        blackStarStr += '★'
                    }
                    for (let i = 0; i < whiteStar; i++) {
                        WhiteStarStr += '☆'
                    }
                    return <Card.Grid key={GenNonDuplicateID()} style={phone === 'phone' ? gridStylePhone : gridStylePad}>
                        <Row>
                            <Row>
                                <Col span={12} offset={6}><span style={{fontSize: '22px'}}>{blackStarStr}{WhiteStarStr}</span></Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Row>
                                        <span>&nbsp;</span>
                                    </Row>
                                    <Row>
                                        <Col span={24}> <span style={{color: 'blue', fontSize: '20px'}}>&nbsp;&nbsp;{record.cardName + '卡'}</span></Col>
                                    </Row>
                                    <Row>
                                        <span>&nbsp;</span>
                                    </Row>

                                </Col>
                                <Col span={18}>
                                    <Row>
                                        <Col xs={8}>
                                            <span>卡片数量:</span>
                                        </Col>
                                        <Col xs={6}>
                                            <span>{record.cardNum}/{record.updateStarNeedNum}</span>
                                        </Col>
                                        <Col xs={6}>
                                            {record.cardNum - record.updateStarNeedNum >= 0 &&
                                            <a onClick={this.updateCard}> 升星</a>}
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={8}>
                                            <span>当前等级:</span>
                                        </Col>
                                        <Col xs={6}>
                                            <span>{record.currentRank+'级'}</span>
                                        </Col>
                                        <Col xs={4}>
                                            <a onClick={this.updateCard}> 升级</a>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={8}>
                                            <span>升级花费:</span>
                                        </Col>
                                        <Col xs={6}>
                                            <span>{record.cost+'💰'}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={8}>
                                            <span>当前效果：</span>
                                        </Col>
                                        <Col xs={16}>
                                            {record.skill === 1 && <span>金币: +{record.incSkill}% </span>}
                                            {record.skill === 2 && <span>经验: +{record.incSkill}% </span>}
                                            {record.skill === 3 &&
                                            <span>免费钥匙: {record.incSkillLow}-{record.incSkillTop}🔑 </span>}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={8}>
                                            <span>下一级：</span>
                                        </Col>
                                        <Col xs={16}>
                                            {record.skill === 1 && <span>金币: +{record.incSkillNext}% </span>}
                                            {record.skill === 2 && <span>经验: +{record.incSkillNext}% </span>}
                                            {record.skill === 3 &&
                                            <span>免费钥匙: {record.incSkillLowNext}-{record.incSkillTopNext}🔑 </span>}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                        </Row>
                    </Card.Grid>
                })}
            </Card>
        )
    }
}

export default MyCard
