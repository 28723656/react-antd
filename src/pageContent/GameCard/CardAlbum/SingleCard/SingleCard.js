import React, {Component} from 'react'
import {Card, Col, Modal, Row} from 'antd';
import CardMorInfo from "./CardMorInfo";
import PropTypes from "prop-types";

class SingleCard extends Component{

    static propTypes = {
        cardEntity:PropTypes.object.isRequired,
    }

    showCardDetail =(cardEntity)=>{
        Modal.success({
            title: cardEntity.name+'卡片详情',
            icon: null,
            content:
                <div>
                    <CardMorInfo cardRecord={cardEntity}/>
                </div>
        })
    }


    render() {

        const {cardEntity} = this.props;

        const bodyStyle={
            paddingTop:'10px',
            paddingLeft:'10px',
            marginBottom:'15px'
        }

        const headStyle ={
        }

        const extra =<a onClick={() => this.showCardDetail(cardEntity)}>查看更多</a>

        let starStr = ''
        for(let i=0;i<cardEntity.topStar;i++){
            starStr+='★';
        }
        const title = cardEntity.name+"         "+starStr;

        return (
            cardEntity && <Card title={title} bordered={false} bodyStyle={bodyStyle} headStyle={headStyle} extra={extra}>
                <Row>
                    <Col span={10}>升星消耗:</Col>
                    <Col span={14}>{ cardEntity.starCostNum && cardEntity.starCostNum.map((record,index,arr) =>{
                       if(index+1 === arr.length ){
                           return record;
                       }else {
                           return record+' / '
                       }
                    })}</Col>
                </Row>
                <Row>
                    <Col span={10}>每星可升等级:</Col>
                    <Col span={14}>{ cardEntity.starRankNum && cardEntity.starRankNum.map((record,index,arr) =>{
                        if(index+1 === arr.length ){
                            return record;
                        }else {
                            return record+' / '
                        }
                    })}</Col>
                </Row>
                <Row>
                    <Col span={10}>满级效果:</Col>
                    {cardEntity.skill === 1 && <Col span={14}>金币+{cardEntity.incCoinFull || '0'}%</Col> }
                    {cardEntity.skill === 2 && <Col span={14}>经验+{cardEntity.incExperienceFull || '0'}%</Col> }
                    {cardEntity.skill === 3 && <Col span={14}>获得钥匙下限+{cardEntity.lowPercentFull || '0'}个</Col> }
                    {cardEntity.skill === 3 && <Col offset={10} span={14}>获得钥匙上限+{cardEntity.topPercentFull || '0'}个</Col> }

                </Row>
                <Row>
                    <Col span={10}>获取途径:</Col>
                    <Col span={14}>
                        <Row>
                            { cardEntity.rewardPlace.length >0 && cardEntity.rewardPlace.map((record,index) =>{
                               return  <Col key={index} xs={12} md={12} xl={8}>{record}</Col>
                            })}
                            {
                                cardEntity.rewardPlace.length === 0 && <Col xs={12} md={12} xl={8}>暂无获取方式</Col>
                            }
                        </Row>
                    </Col>
                </Row>
            </Card>

        )
    }
}

export default SingleCard
