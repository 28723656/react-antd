import React, {Component} from 'react'
import {Button, Card, Col, Icon, Row, Switch, Table, Tag} from "antd";

import {columns1_3, data1_1, data1_3} from "../../mock/mockDataPage1";
import AddPlanModal from "./Common/AddPlanModal";
import PropTypes from "prop-types";
import TablePlan from "./Common/TablePlan";

/**
 * page1  今日计划部分
 */


class TodayPlan extends Component{

    static propTypes = {
        data: PropTypes.object.isRequired,
        addPlan: PropTypes.func.isRequired,
        finishPlan: PropTypes.func.isRequired,
    }


     onChange = (checked,row) => {
         const {finishPlan,setStopOpen,switchModal} = this.props;
         setStopOpen(true);
         switchModal(1, false);
         finishPlan(row);

    }

    //显示历史记录  ---->  这个设计不合理，后期改进
    showHistory =() =>{
      //  console.log('显示历史记录')
        localStorage.removeItem("user");
        window.location="/";
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


     browserRedirect =() => {
        let sUserAgent = navigator.userAgent.toLowerCase();
        let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        let bIsMidp = sUserAgent.match(/midp/i) == "midp";
        let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        let bIsAndroid = sUserAgent.match(/android/i) == "android";
        let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if ( bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            console.log("您正在使用移动手机！");
           return 'phone';
        } else if(bIsIpad ){
            console.log("您正在使用平板！");
            return 'pad';
        }else {
            console.log("您正在使用PC设备");
           return 'pc'
        }
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
                    if(this.browserRedirect() === 'phone' && (nameAfter+topStr).length >14){
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
        const {addPlan,modalData,switchModal,updatePlan,deletePlan,setRecord,recordData,setStopOpen,stopOpenData} = this.props;

        return (
            <div style={{padding:5}} >
                <Card title='今日计划' bordered={false} bodyStyle={{padding:'8px'}} >

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
                        <Col span={6} offset={12}>
                            <Button type="link" onClick={this.showHistory}>
                                <Icon type="history"/> 清除(测试)
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
