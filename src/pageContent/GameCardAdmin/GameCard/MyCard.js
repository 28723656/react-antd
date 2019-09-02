import React, {Component} from 'react'
import {Card} from "antd";
import {GenNonDuplicateID} from "../../../util/randomUtil";
import {Col, Row,message} from "antd";

import PropTypes from "prop-types";
import {browserRedirect} from "../../../util/whichDevice";
import {updateAjax} from "../../../util/ajax";
import {getUser} from "../../../util/userUtil";


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
    height:'156px',
};

const zeroGridStylePad = {
    width: '50%',
    textAlign: 'left',
    padding: '8px',
    height:'156px',
};

const zeroGridStylePhone = {
    width: '100%',
    textAlign: 'left',
    padding: '8px',
    height:'156px',
};

const fullRankStylePhone = {
    width: '100%',
    textAlign: 'left',
    padding: '8px',
    height:'156px',
    border:'2px solid rgb(0, 76, 253)'
}

const fullRankStylePad = {
    width: '50%',
    textAlign: 'left',
    padding: '8px',
    height:'156px',
    border:'2px solid rgb(0, 76, 253)'
}


class MyCard extends Component {

    static propTypes = {
        cardData: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        initMethod:PropTypes.func.isRequired,
    }

    // 升级卡片   unlock是为了提示一下 传入表示解锁
    updateCard =(cardId,updateType) =>{
        const {initMethod} = this.props
        console.log('准备升级id为'+cardId+'的卡片');
        const user = getUser()
        updateAjax(`/game/myCard/${user.id}/${cardId}/${updateType}`).then(response =>{
            if(response.data.flag){
                initMethod()
            }else {
                message.warning("好像没钱了唉...");
            }
        })
    }

    render() {

        const {cardData, title} = this.props
        const phone = browserRedirect();

        return (
            cardData.length>0 &&
            <Card title={title}>
                { cardData.map(record => {
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

                    // 判断这个卡片是否为0星
                    const haveTheCard = record.currentStar !==0

                    // 这个判断是否为满级了
                   const fullRank = record.currentRank - record.topRank >=0
                    // 这个是判断当前星级是否为满级
                   const fullStarRank = record.currentRank - record.starTopRank >=0

                    let style = gridStylePhone;
                    // 判断style
                    if(phone === 'phone'){
                        if(fullRank){
                            style = fullRankStylePhone
                        }else {
                            if(haveTheCard){
                                style = gridStylePhone
                            }else {
                                style = zeroGridStylePhone
                            }
                        }
                    }else {
                        if(fullRank){
                            style = fullRankStylePad
                        }else {
                            if(haveTheCard){
                                style = gridStylePad
                            }else {
                                style = zeroGridStylePad
                            }
                        }
                    }

                    return <Card.Grid key={record.cardId}  style={style}>
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
                                        <Col span={24}> <span style={haveTheCard?{ color: 'blue', fontSize: '20px'}:{fontSize:'20px'}}>&nbsp;&nbsp;{record.cardName + '卡'}</span></Col>
                                    </Row>
                                    <Row>
                                        <span>&nbsp;</span>
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
                                            {record.updateStarNeedNum &&
                                            <span>{record.cardNum}/{record.updateStarNeedNum }</span>
                                            }
                                            {!record.updateStarNeedNum && <span>{record.cardNum}</span>}
                                        </Col>
                                        {record.updateStarNeedNum &&
                                            <Col xs={6}>
                                                {record.cardNum - record.updateStarNeedNum >= 0 &&
                                                <a onClick={() =>this.updateCard(record.cardId,2)}> {haveTheCard?'升星':'解锁'}</a>}
                                            </Col>
                                        }

                                    </Row>

                                    {haveTheCard &&
                                    <div>
                                        <Row>
                                            <Col xs={8}>
                                                <span>当前等级:</span>
                                            </Col>
                                            <Col xs={6}>
                                                <span>{record.currentRank+'/'+record.starTopRank}</span>
                                            </Col>
                                            <Col xs={4}>
                                                {!fullStarRank && <a onClick={() =>this.updateCard(record.cardId,1)}> 升级</a> }
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs={8}>
                                                <span>升级花费:</span>
                                            </Col>
                                            <Col xs={6}>
                                                <span>{!fullStarRank? record.cost+'💰':'0💰'}</span>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={8}>
                                                <span>当前效果：</span>
                                            </Col>
                                            <Col xs={16}>
                                                {record.skill === 1 && <span>金币: +{record.incCoin ||0}% </span>}
                                                {record.skill === 2 && <span>经验: +{record.incExperience ||0}% </span>}
                                                {record.skill === 3 &&
                                                <span>免费钥匙: {record.incKeyLow||0}-{record.incKeyTop||0}🔑 </span>}
                                            </Col>
                                        </Row>

                                    </div>
                                    }

                                    {!fullRank &&
                                    <Row>
                                        <Col xs={8}>
                                            <span>{haveTheCard?'下一级：':'解锁效果'}</span>
                                        </Col>
                                        <Col xs={16}>
                                            {record.skill === 1 && <span>金币: +{record.incCoinNext}% </span>}
                                            {record.skill === 2 && <span>经验: +{record.incExperienceNext}% </span>}
                                            {record.skill === 3 &&
                                            <span>免费钥匙: {record.incKeyLowNext}-{record.incKeyTopNext}🔑 </span>}
                                        </Col>
                                    </Row> }

                                    {!haveTheCard &&
                                    <Row>
                                        <Col xs={8}>
                                            <span>满级效果：</span>
                                        </Col>
                                        <Col xs={16}>
                                            {record.skill === 1 && <span>金币: +{record.incCoinFull ||0}% </span>}
                                            {record.skill === 2 && <span>经验: +{record.incExperienceFull ||0}% </span>}
                                            {record.skill === 3 &&
                                            <span>免费钥匙: {record.incKeyLowFull||0}-{record.incKeyTopFull||0}🔑 </span>}
                                        </Col>
                                    </Row>
                                    }

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
