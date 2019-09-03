import React,{Component} from 'react'
import {Card, Col, Row} from "antd";
import {getUser} from "../../../util/userUtil";
import {getAjax} from "../../../util/ajax";
import {getMomentTime} from "../../../util/momentUtil";
import PropTypes from "prop-types";

/**
 * 最近50条记录
 */
class LuckyRecentFifty extends Component{

    static propTypes = {
        // 统计最近多少条数据
        count:PropTypes.number.isRequired,
    }


    state ={
        resultArr:[]
    }

    initData = () =>{
        const {count} = this.props
        const user = getUser();
        getAjax(`/game/recordReward/statisticsLatestRecord/${user.id}/${count}`).then(response =>{
            this.setState({resultArr:response.data.data})
        })
    }

    componentDidMount() {
        this.initData();
    }


    render() {


        const style ={
            marginBottom:3
        }

        const {resultArr} = this.state;
        let uniqueMarkBefore = ''
        console.log('最近的数据',resultArr)

        return (
            <div>
                <Card title='抽奖记录（最近50条）'>
                    <Row>
                        <Col span={2}>序号</Col>
                        <Col span={4}>名称</Col>
                        <Col span={4}>类型</Col>
                        <Col span={4}>数量</Col>
                        <Col offset={2} span={8}>时间</Col>
                    </Row>
                    <hr/>

                    {
                        resultArr && resultArr.length > 0 && resultArr.map((record,index) =>{
                             let uniqueMarkAfter = record.uniqueMark;
                             let hrLine = false;
                             if(uniqueMarkBefore !== uniqueMarkAfter){
                                     hrLine = true;
                                 uniqueMarkBefore = uniqueMarkAfter;
                             }
                        if(record.rewardType === 1){
                            return <div key={index} style={style}>
                                <Row >
                                    <Col span={2}>{index+1}</Col>
                                    <Col span={4}>金币</Col>
                                    <Col span={4}>货币</Col>
                                    <Col span={4}>x{record.coinNum}</Col>
                                    <Col span={10}>{getMomentTime(record.rewardTime)}</Col>
                                </Row>
                                    {hrLine && <hr/>}
                            </div>
                        }else if(record.rewardType === 2){
                            return <div key={index} style={style}>
                                <Row >
                                    <Col span={2}>{index+1}</Col>
                                    <Col span={4}>钻石</Col>
                                    <Col span={4}>货币</Col>
                                    <Col span={4}>x{record.coinNum}</Col>
                                    <Col span={10}>{getMomentTime(record.rewardTime)}</Col>
                                    {hrLine && <hr/>}
                                </Row>
                            </div>
                        }else if(record.rewardType === 3){
                            return <div  key={index} style={style}>
                                <Row>
                                    <Col span={2}>{index+1}</Col>
                                    <Col span={4}>钥匙</Col>
                                    <Col span={4}>货币</Col>
                                    <Col span={4}>x{record.coinNum}</Col>
                                    <Col span={10}>{getMomentTime(record.rewardTime)}</Col>
                                    {hrLine && <hr/>}
                                </Row>
                            </div>
                        }else if(record.rewardType === 4){
                            return <div key={index} style={style}>
                                <Row >
                                    <Col span={2}>{index+1}</Col>
                                    <Col span={4}>{record.cardName}卡</Col>
                                    <Col span={4}>{record.cardType}</Col>
                                    <Col span={4}>x{record.cardNum}</Col>
                                    <Col span={10}>{getMomentTime(record.rewardTime)}</Col>
                                    {hrLine && <hr/>}
                                </Row>
                            </div>
                        }
                        })
                    }
                </Card>
            </div>
        )
    }
}

export default LuckyRecentFifty
