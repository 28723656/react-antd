import React,{Component} from 'react'
import SmallTable from "../../../pages/GameCard";
import {Card,Row,Col} from "antd";
import {getUser} from "../../../util/userUtil";
import {getAjax} from "../../../util/ajax";
import PropTypes from "prop-types";
/**
 * 卡片总计  不需要和其他交互，自己搞数据
 */
class LuckyCountRecord extends Component{

    static propTypes = {
        // 统计几个月份的
        monthCount:PropTypes.number.isRequired,
    }

    state ={
        resultArr:[]
    }

    initData = () =>{
        const {monthCount} = this.props
        const user = getUser();
        getAjax(`/game/recordReward/statisticsCoin/${user.id}/${monthCount}`).then(response =>{
            this.setState({resultArr:response.data.data})
        })
    }

    componentDidMount() {
        this.initData();
    }

    render() {
        const {resultArr} = this.state;

        return (
            <div>
                <Card title='抽奖总计（最近1月）'>
                <Row>
                    <Col offset={1} span={8}>类型</Col>
                    <Col span={8}>数量</Col>
                </Row>
                    <hr/>
                    {resultArr && resultArr.length>0 && resultArr.map((record,index) =>{
                        let rewardType = ''
                        if(record.rewardType === 1){
                            return <Row key = {index}>
                                <Col offset={1} span={8}>金币</Col>
                                <Col span={8}>{record.rewardNum}</Col>
                            </Row>
                        }else if(record.rewardType === 2){
                            return <Row key = {index} >
                                <Col offset={1} span={8}>钻石</Col>
                                <Col span={8}>{record.rewardNum}</Col>
                            </Row>
                        }else if(record.rewardType === 3){
                            return  <Row key = {index}>
                                <Col offset={1} span={8}>钥匙</Col>
                                <Col span={8}>{record.rewardNum}</Col>
                            </Row>
                        }else if(record.rewardType === 4){
                            return  <Row key = {index}>
                                <Col offset={1} span={8}>卡片</Col>
                                <Col span={8}>{record.cardNum}</Col>
                            </Row>
                        }
                    })}
                </Card>
            </div>
        )
    }
}

export default LuckyCountRecord
