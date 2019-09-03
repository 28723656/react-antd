import React,{Component} from 'react'
import {Card,Row,Col} from "antd";
import {getAjax} from "../../../util/ajax";
import {getUser} from "../../../util/userUtil";
import PropTypes from "prop-types";

/**
 * 卡片总计  不需要和其他交互，自己搞数据
 */
class LuckyCardRecord extends Component{

    static propTypes = {
        // 统计几个月份的
        monthCount:PropTypes.number.isRequired,
    }

    state ={
        resultArr:[]
    }

    initData = () =>{
        const user = getUser();
        const {monthCount} = this.props
        getAjax(`/game/recordReward/statisticsCard/${user.id}/${monthCount}`).then(response =>{
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
                <Card title='卡片总计（最近1月）'>
                <Row>
                    <Col span={8}>卡片类型</Col>
                    <Col span={8}>卡牌数量</Col>
                </Row>
                    <hr/>
                    {resultArr && resultArr.length>0 && resultArr.map((record,index) =>{
                        return record.cardType && <Row key={index}>
                            <Col offset={1} span={8}>{record.cardType}卡</Col>
                            <Col span={8}>{record.cardNum}</Col>
                        </Row>
                    })}
                </Card>
            </div>
        )
    }
}

export default LuckyCardRecord
