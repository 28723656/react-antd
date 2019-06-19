import React, {Component} from 'react'
import {Card, Switch, Table,Tag} from "antd";

import { columns1_3, data1_1, data1_3} from "../../mock/mockDataPage1";
import AddPlanModal from "./Common/AddPlanModal";
import PropTypes from "prop-types";
import LongPlan from "../../pages/Page1";

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
        console.log(`switch to ${checked},and data is :`,row);
         const {finishPlan} = this.props;
         finishPlan(row);
    }


     addToTodayList = (value) =>{
        console.log("添加到任务列表",value);
    }



    render() {

// 1-今日计划   2-长期计划
         const columnsToday = [
            {
                title: '任务名称',
                dataIndex: 'name',
                width:'50%',
                render:(value,row,index) =>{
                    let topStr ='';
                    if(row.top){
                        topStr ='[置顶] ' ;
                    }
                    let nameAfter = '->'+value
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
                width:'32%',
                render:(valaue,row,index) =>{
                    if(row.startTime!== undefined && row.endTime !== undefined){
                        const hour1 = row.startTime[3] <10 ? '0'+row.startTime[3]:row.startTime[3]
                        const minutes1 = row.startTime[4] <10 ? '0'+row.startTime[4]:row.startTime[4]
                        const hour2 = row.endTime[3] <10 ? '0'+row.endTime[3]:row.endTime[3]
                        const minutes2 = row.endTime[4] <10 ? '0'+row.endTime[4]:row.endTime[4]
                        return hour1+':'+minutes1+" - "+
                            hour2+':'+minutes2;
                    }
                }
            },
            {
                title: '完成',
                dataIndex: 'finished',
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
        const {addPlan} = this.props;


        return (
            <div style={{padding:5}} >
                <Card title='今日计划' bordered={false} bodyStyle={{padding:'8px'}} >

                    {todayPlan &&
                    <Table rowKey='id' columns={columnsToday}  dataSource={todayPlan} showHeader={false} size='small'
                           pagination ={
                               {hideOnSinglePage :true}
                           }
                    />
                    }
                    <AddPlanModal data={weekPlan}  addPlan={addPlan}  title='添加今日计划' type={1}/>
                </Card>


                <Card title='未完成' style={{marginTop:15 }} bodyStyle={{padding:'8px'}}  >
                <Table columns={columnsToday} dataSource={data1_1} showHeader={false} size='small'
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
