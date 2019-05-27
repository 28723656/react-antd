import React,{Component} from 'react'
import {Button, Col, Row,message} from "antd";

class WeaponInfo extends Component{


    // 处理强化
    handlePowerUp = () =>{
        const {weaponRank,leftCoin,handleCoinAndRank} = this.props;
        // 花费的金币
        const costCoin = (weaponRank+1)*Math.round(Math.random()*100000);
        // 是否成功
        let success;
        if (leftCoin > 0 && leftCoin >= costCoin) {
            success =  Math.random()*100 < 600/(weaponRank+1)
            //  处理金币减少和等级增加
            handleCoinAndRank(costCoin,success)
        }else{
            message.warning("no enough cash!");
        }

    };


    render() {

        const {weaponRank,leftCoin} = this.props;

        return (
            <div>

                <Row type="flex">
                    <Col xs={16} xl={4}  ><h4>武器名称：{weaponRank>0?'+'+weaponRank:''} 流光星陨刀</h4></Col>
                    <Col xs={4} xl={2}  offset={2}> <Button type="primary" onClick={this.handlePowerUp} > 强化 </Button></Col>
                </Row>
                <Row type="flex">
                    <Col span={24}><h4>剩余金币：{leftCoin}</h4></Col>
                </Row>

            </div>
        )
    }
}

export  default WeaponInfo
