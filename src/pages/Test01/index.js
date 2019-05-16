import React,{Component} from 'react'
import {message} from "antd";

import WeaponInfo from "../../pageContent/Test01/WeaponInfo";
import Require from "../../pageContent/Test01/Require";
import WeaponLog from "../../pageContent/Test01/WeaponLog";
import {dataSource} from "../../mock/test01data"

let count = 0

class Test01 extends Component{

    state ={
        dataSource :''
    }

    componentWillMount() {
        console.log("count:",count)

        // 开始的时候初始化值
        this.setState({
           dataSource
        });
    }

    // 处理金币减少和等级增加
    handleCoinAndRank = (costCoin,success) =>{
        const {weaponRank,leftCoin,_costCoin,_success,weaponMsg} = this.state.dataSource;
        let newRank = weaponRank;
        if(success){
            newRank = weaponRank + 1;
            if(newRank >= 12)
            message.success('+'+newRank+'成功！');
        }else{
            if(newRank <10){
            }else if(newRank >= 12){
                newRank = 0;
                message.error("破碎吧！")
            }
        }

        // 日志信息
        weaponMsg.push(
            success?
            <p key={count++} >{count}:  +{weaponRank+1}  流光星陨刀 强化成功. 花费金币: {(costCoin/10000).toFixed(2)}W</p>
                :
            <p key={count++} style={{color:'red'}} >{count}:  +{weaponRank+1}  流光星陨刀 失败{newRank === 0?'归零':''}! 花费金币: {(costCoin/10000).toFixed(2)}W</p>

    );
        if(weaponMsg.length >10){
            weaponMsg.shift();
        }


        // 让tempData的值变一下
        dataSource.weaponRank = newRank
        dataSource.leftCoin=leftCoin-costCoin
        dataSource. _costCoin=costCoin
        dataSource. _success=success
        dataSource. weaponMsg=weaponMsg

        this.setState({
            dataSource
        });
    }

    render() {

        const {weaponRank,leftCoin,weaponMsg} = this.state.dataSource;

        return (
            <div >
                {/*要求*/}
                <Require/>

                {/*武器说明*/}
                <WeaponInfo weaponRank={weaponRank} leftCoin={leftCoin} handleCoinAndRank={this.handleCoinAndRank} />

                {/*日志*/}
                <WeaponLog weaponMsg={weaponMsg} />

            </div>
        )
    }
}

export  default Test01
