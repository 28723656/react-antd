import React,{Component} from 'react'


import { Statistic, Row, Col,message } from 'antd';
import {COUNT_DOWN_DAY, COUNT_DOWN_HOUR, COUNT_DOWN_MINUTE, COUNT_DOWN_SECOND} from "../../util/dataUtil";

const Countdown = Statistic.Countdown;
let deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
let format ='D 天 H 时 m 分 s 秒'

/**
 * 参数    type: day | hour | minute | second
 *
 *        value：数字
 *
 * 例子：    type={COUNT_DOWN_SECOND}
             value={100}
 */

class StatisticCountDown extends Component{

     onFinish() {
        message.warning("time over!")
    }

    render() {

         let {type,value}=this.props;

         type = type=== undefined?COUNT_DOWN_HOUR:type
         value = value=== undefined?1:value

        if(type === COUNT_DOWN_DAY){
            deadline =  Date.now() + 1000 * 60 * 60 * 24 * value
            format ='D 天 H 时 m 分 s 秒'
        }else if(type === COUNT_DOWN_HOUR){
            deadline =  Date.now() + 1000 * 60 * 60 *  value
            format = 'H 时 m 分 s 秒'
        }else if(type === COUNT_DOWN_MINUTE){
            deadline =  Date.now() + 1000 * 60 * value
            format = 'm 分 s 秒'
        }else if(type === COUNT_DOWN_SECOND){
            deadline =  Date.now() + 1000 * value
            format = 's 秒 SSS'
        }

        return (
            <Row gutter={16}>
                <Col span={24} style={{ margin:20 }}>
                    <Countdown title="倒计时" value={deadline} format={format} onFinish={this.onFinish} />
                </Col>
            </Row>
        )
    }
}

export  default StatisticCountDown
