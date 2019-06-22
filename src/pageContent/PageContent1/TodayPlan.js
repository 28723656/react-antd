import React, {Component} from 'react'
import {Button, Card, Col, Icon, Row, Switch, Table, Tag} from "antd";

import {columns1_3, data1_1, data1_3} from "../../mock/mockDataPage1";
import AddPlanModal from "./Common/AddPlanModal";
import PropTypes from "prop-types";

/**
 * page1  今日计划部分
 */


class TodayPlan extends Component{

    static propTypes = {
        data: PropTypes.object.isRequired,
        addPlan: PropTypes.func.isRequired,
        finishPlan: PropTypes.func.isRequired,
    }

    state ={
        record:null,
        stopOpen:false,
    }


     onChange = (checked,row) => {
        console.log(`switch to ${checked},and data is :`,row);
         const {finishPlan} = this.props;
         this.setState({stopOpen:true});
         finishPlan(row);

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

    //显示历史记录  ---->  这个设计不合理，后期改进
    showHistory =() =>{
        console.log('显示历史记录')
    }


     addToTodayList = (value) =>{
        console.log("添加到任务列表",value);
    }

    // 添加计划
    handleAddPlan = (e) =>{
        this.props.switchModal(1,true);
        this.setState({record:null});
    }

    // 允许弹出框
    allowUpdatePlan =(e) =>{
        this.setState({stopOpen:false});
    }



    render() {

// 1-今日计划
         const columnsToday = [
            {
                title: '任务名称',
                dataIndex: 'name',
                width:'35%',
                render:(value,row,index) =>{
                    let topStr ='';
                    if(row.top){
                        topStr ='[置顶] ' ;
                    }
                    let nameAfter =value
                    if((nameAfter+topStr).length >10){
                        nameAfter = nameAfter.substring(0,9)+"...";
                    }
                    switch (row.rank) {
                        case 1:return  <Tag color={row.color}>{topStr}D{nameAfter}</Tag>
                        case 2:return  <Tag color={row.color}>{topStr}C{nameAfter}</Tag>
                        case 3:return  <Tag color={row.color}>{topStr}B{nameAfter}</Tag>
                        case 4:return  <Tag color={row.color}>{topStr}A{nameAfter}</Tag>
                        case 5:return  <Tag color={row.color}>{topStr}S{nameAfter}</Tag>
                        default:return '??'+nameAfter;
                    }
                }
            },
            {
                title: '时间',
                dataIndex: 'startTime',
                width:'35%',
                render:(valaue,row,index) =>{
                    if(row.startTime && row.endTime ){
                        const hour1 = row.startTime[3] <10 ? '0'+row.startTime[3]:row.startTime[3]
                        const minutes1 = row.startTime[4] <10 ? '0'+row.startTime[4]:row.startTime[4]
                        const hour2 = row.endTime[3] <10 ? '0'+row.endTime[3]:row.endTime[3]
                        const minutes2 = row.endTime[4] <10 ? '0'+row.endTime[4]:row.endTime[4]
                        return `${hour1}:${minutes1}-${hour2}:${minutes2}`;
                    }
                }
            },
            {
                title: '完成',
                dataIndex: 'finished',
                width:'30%',
                render: (value,row,index) =>{
                    console.log( value)
                    if(value === 1){
                        return <div>
                            {row.score}分 &nbsp;
                            <Switch defaultChecked  onChange={(checked) =>this.onChange(checked,row)}/>
                        </div>
                    }else if(value === 0){
                        return<div>
                            {row.score}分 &nbsp;
                            <Switch  onChange={(checked) =>this.onChange(checked,row)}/>
                        </div>
                    }
                }
            },
        ];



        const {todayPlan,weekPlan} = this.props.data;
        console.log('todayPlan--观测中',todayPlan)
        const {addPlan,modalData,switchModal,updatePlan,deletePlan} = this.props;
        const {record} = this.state;

        return (
            <div style={{padding:5}} >
                <Card title='今日计划' bordered={false} bodyStyle={{padding:'8px'}} >

                    {todayPlan && todayPlan.length > 0 &&
                    <Table rowKey='id' columns={columnsToday}  dataSource={todayPlan} showHeader={false} size='small'
                           pagination ={
                               {hideOnSinglePage :true}
                           }
                           onRow={record => {
                               return {
                                   onClick: event => {}, // 点击行
                                   onDoubleClick: event =>{this.updatePlan(event,record)},
                                   onTouchStart:event =>{this.allowUpdatePlan(event)},
                                   onTouchEndCapture:event =>{this.updatePlan(event,record)},
                                 //  onClickCapture:event =>{this.updatePlan(event,record)},
                               };
                           }}
                    />
                    }
                    <AddPlanModal data={weekPlan} record={record}
                                  modalData={modalData} switchModal={switchModal}
                                  addPlan={addPlan} updatePlan={updatePlan}
                                  title='添加今日计划' type={1}
                                  deletePlan={deletePlan}
                    />

                    <Row>
                        <Col span={6}>
                            <Button type="link" onClick={this.handleAddPlan}>
                                <Icon type="plus"/> 添加计划
                            </Button>
                        </Col>
                        <Col span={6} offset={12}>
                            <Button type="link" onClick={this.showHistory}>
                                <Icon type="history"/> 查看历史
                            </Button>
                        </Col>

                    </Row>

                </Card>


                <Card title='未完成' style={{marginTop:15 }} bodyStyle={{padding:'8px'}}  >
                <Table columns={columns1_3} dataSource={data1_1} showHeader={false} size='small'
                       scroll={{x:true}}
                       pagination ={
                           {hideOnSinglePage :true}
                       }
                />
            </Card>

                <Card title='其他任务' style={{marginTop:15 }} bodyStyle={{padding:'8px'}}  >
                    <Table columns={columns1_3} dataSource={data1_3} showHeader={false} size='small'
                           scroll={{x:true}}
                           pagination ={
                               {hideOnSinglePage :true}
                           }
                    />
                </Card>
            </div>
        )
    }
}

export  default TodayPlan
