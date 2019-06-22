import React,{Component} from 'react'
import {Card, Table} from "antd";
import PropTypes from "prop-types";

class TablePlan extends Component{


    static propTypes = {
        data: PropTypes.array.isRequired,
        columns: PropTypes.array.isRequired,
        type:PropTypes.number.isRequired,
        switchModal:PropTypes.func.isRequired,
    }



    state ={
        stopOpen:false,
    }

    // 更新
    updatePlan = (event,record) =>{
        const {stopOpen} = this.state;
        if(!stopOpen){
            console.log('点击的是：',event,record);
            this.props.switchModal(1,true);
            this.setState({record})
        }

    }


    // 允许弹出框
    allowUpdatePlan =(e) =>{
        this.setState({stopOpen:false});
    }


    render() {

        const {columns,data,type} = this.props

        return (
            <div>
                {data && data.length > 0 &&
                <Table rowKey='id' columns={columns}  dataSource={data} showHeader={false} size='small'
                       pagination ={
                           {hideOnSinglePage :true}
                       }
                       onRow={record => {
                           return {
                               onClick: event => {}, // 点击行
                               onDoubleClick: event =>{this.updatePlan(event,record,type)},
                               onTouchStart:event =>{this.allowUpdatePlan(event)},
                               onTouchEndCapture:event =>{this.updatePlan(event,record,type)},
                               //  onClickCapture:event =>{this.updatePlan(event,record)},
                           };
                       }}
                />
                }
            </div>

        )
    }
}

export default TablePlan
