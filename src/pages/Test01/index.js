import React,{Component} from 'react'
import {message} from "antd";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import WeaponInfo from "../../pageContent/Test01/WeaponInfo";
import Require from "../../pageContent/Test01/Require";
import WeaponLog from "../../pageContent/Test01/WeaponLog";
import {powerUp,getWeaponData} from "../../redux/actions";


class Test01 extends Component{


    static propTypes = {
        weaponData: PropTypes.object.isRequired,
        powerUp: PropTypes.func.isRequired,
        getWeaponData: PropTypes.func.isRequired,
    }



    componentDidMount() {
        this.props.getWeaponData();
    }

    // 处理金币减少和等级增加
    handleCoinAndRank = (costCoin, success) => {
        const {weaponData, powerUp} = this.props;
        let newRank = weaponData.weaponRank;
        let tempCount = weaponData.count
        if (success) {
            newRank = weaponData.weaponRank + 1;
            if (newRank >= 12)
                message.success('+' + newRank + '成功！');
        } else {
            if (newRank < 10) {
            } else if (newRank >= 12) {
                newRank = 0;
                message.error("破碎吧！")
            }
        }
        // 日志信息
        weaponData.weaponMsg.push(
            success ?
                <p key={tempCount++}>{tempCount}: +{weaponData.weaponRank + 1} 流光星陨刀 强化成功.
                    花费金币: {(costCoin / 10000).toFixed(2)}W</p>
                :
                <p key={tempCount++} style={{color: 'red'}}>{tempCount}: +{weaponData.weaponRank + 1} 流光星陨刀
                    失败{newRank === 0 ? '归零' : ''}! 花费金币: {(costCoin / 10000).toFixed(2)}W</p>
        );
        if (weaponData.weaponMsg.length > 10) {
            weaponData.weaponMsg.shift();
        }
        const newData = {}
        // 让tempData的值变一下
        newData.weaponRank = newRank
        newData.leftCoin = weaponData.leftCoin - costCoin
        newData._costCoin = costCoin
        newData._success = success
        newData.weaponMsg = weaponData.weaponMsg
        newData.count = tempCount
        powerUp(newData);

    }

    render() {

        const {weaponData} = this.props
        const empty =  JSON.stringify(weaponData) === '{}';

        return (
            <div >
                {/*要求*/}
                <Require/>
                { !empty &&
                <div>
                    <WeaponInfo weaponRank={weaponData.weaponRank} leftCoin={weaponData.leftCoin} handleCoinAndRank={this.handleCoinAndRank} />
                    <WeaponLog weaponMsg={weaponData.weaponMsg} />
                </div>

                }



            </div>
        )
    }
}

export  default connect(
    state =>({weaponData:state.weaponData}),
    {powerUp,getWeaponData}
)(Test01)
