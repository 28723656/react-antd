import React, {Component} from 'react'
import {Button, Card, Col, Icon, Row, Switch, Table, Tag,message} from "antd";

import {columns1_3, data1_1, data1_3} from "../../mock/mockDataPage1";
import AddPlanModal from "./Common/AddPlanModal";
import PropTypes from "prop-types";
import TablePlan from "./Common/TablePlan";
import {browserRedirect} from "../../util/whichDevice";
import SmallTable from "../../components/Table/SmallTable";
import Habit from "./Habit";

/**
 * page1  今日计划部分
 */


class TodayPlan extends Component{

    static propTypes = {
        data: PropTypes.object.isRequired,
        addPlan: PropTypes.func.isRequired,
        finishPlan: PropTypes.func.isRequired,
    }


     onChange = (checked,row,finished) => {
         const {finishPlan,setStopOpen,switchModal} = this.props;
         setStopOpen(true);
         switchModal(1, false);
         finishPlan(row,finished);

    }

    setFinishedStatus =(row,finishedStatus) =>{
        if(row.finished === 1){
            message.warning('您已经完成了，为什么要删除呢');
            return ;
        }
        const {finishPlan,setStopOpen,switchModal} = this.props;
        setStopOpen(true);
        switchModal(1, false);
        finishPlan(row,finishedStatus);
    }

    //显示历史记录  ---->  这个设计不合理，后期改进
    showHistory =() =>{
       console.log('显示历史记录')
    }


     addToTodayList = (value) =>{
        // console.log("添加到任务列表",value);
    }

    // 添加计划
    handleAddPlan = (e) =>{
        const {switchModal,setRecord} = this.props;
        setRecord(null);
        switchModal(1,true);
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
                        topStr ='[置顶]' ;
                    }
                    let nameAfter ='->'+value
                    if(browserRedirect()=== 'phone' && (nameAfter+topStr).length >14){
                        nameAfter = nameAfter.substring(0,12)+"...";
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
                    if(value === 1){
                        return <div>
                            {row.score}分 &nbsp;
                            <Switch defaultChecked  onChange={(checked) =>this.onChange(checked,row,0)}/>
                        </div>
                    }else if(value === 0){
                        return<div>
                            {row.score}分 &nbsp;
                            <Switch  onChange={(checked) =>this.onChange(checked,row,1)}/>
                        </div>
                    }
                }
            },
        ];

        const columnsTodayUnFinished = [
            {
                title: '任务名称',
                dataIndex: 'name',
                width:'35%',
                render:(value,row,index) =>{
                    let topStr ='';
                    if(row.top){
                        topStr ='[置顶]' ;
                    }
                    let nameAfter ='->'+value
                    if(browserRedirect()=== 'phone' && (nameAfter+topStr).length >14){
                        nameAfter = nameAfter.substring(0,12)+"...";
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
                width:'25%',
                render:(value,row,index) =>{
                    return `${value[0]}-${value[1]}-${value[2]}`
                }
            },
            {
                title: '完成',
                dataIndex: 'finished',
                width:'20%',
                render: (value,row,index) =>{
                    if(value === 1){
                        return <div>
                            {row.score}分 &nbsp;
                            <Switch defaultChecked  onChange={(checked) =>this.onChange(checked,row,0)}/>
                        </div>
                    }else if(value === 0){
                        return<div>
                            {row.score}分 &nbsp;
                            <Switch  onChange={(checked) =>this.onChange(checked,row,1)}/>
                        </div>
                    }
                }
            },
            {
                title:'遗忘',
                render:(value,row) =>{
                return <a onClick={() =>this.setFinishedStatus(row,2)}>不做了</a>
                }
            }
            ,
        ];



        const {todayPlan,weekPlan,todayUnFinishedPlan} = this.props.data;
        console.log('todayUnFinishedPlan',todayUnFinishedPlan)
        const {addPlan,modalData,switchModal,updatePlan,deletePlan,setRecord,recordData,setStopOpen,stopOpenData} = this.props;

        return (
            <div style={{padding:5}} >
                <Row gutter={20}>
                    <Col xs={24} xl={12}>
                        <Row>
                            <Col><Card title='今日计划' bordered={false} style={{marginTop:5 }} bodyStyle={{padding:'8px'}} >

                                <TablePlan data={todayPlan} columns={columnsToday} type={1} switchModal={switchModal} setRecord={setRecord} setStopOpen={setStopOpen} stopOpenData={stopOpenData} />
                                <AddPlanModal data={weekPlan} record={recordData}
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
                                    <Col span={6} offset={10}>
                                        <Button type="link" onClick={this.showHistory}>
                                            <Icon type="history"/> 查看历史
                                        </Button>
                                    </Col>

                                </Row>
                            </Card></Col>
                            <Col>
                                <Card title='习惯的力量' style={{marginTop:5 }} bodyStyle={{padding:'8px'}} >
                                <Habit/>
                            </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} xl={12}>
                       <Row>
                           <Col>
                               <Card title='未完成' style={{marginTop:5 }} bodyStyle={{padding:'8px'}}  >
                                   {todayUnFinishedPlan && todayUnFinishedPlan.length>0 && <SmallTable columns={columnsTodayUnFinished} dataSource={todayUnFinishedPlan}/>}
                             </Card>
                           </Col>
                           <Col><Card title='其他任务' style={{marginTop:5 }} bodyStyle={{padding:'8px'}}  >
                               <SmallTable columns={columns1_3} dataSource={data1_3} rowKey='key' />
                           </Card></Col>
                       </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export  default TodayPlan
