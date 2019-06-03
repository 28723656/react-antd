import React,{Component} from 'react'
import {Card, Table} from "antd";

import {columns1_1, columns1_3, data1_1, data1_3} from "../../mock/mockDataPage1";
import AddPlanModal from "./Common/AddPlanModal";
import SmallPaddingCard from "../../components/Card/SmallPaddingCard";

/**
 * page1  今日计划部分
 */

class TodayPlan extends Component{


    render() {
        return (
            <div style={{padding:5}} >
                <Card title='今日计划' bordered={false} bodyStyle={{padding:'8px'}} >
                    <Table columns={columns1_1}  dataSource={data1_1} showHeader={false} size='small'
                           pagination ={
                               {hideOnSinglePage :true}
                           }
                    />
                    <AddPlanModal title='添加今日计划' type={1}/>
                </Card>


                <Card title='未完成' style={{marginTop:15 }} bodyStyle={{padding:'8px'}}  >
                <Table columns={columns1_1} dataSource={data1_1} showHeader={false} size='small'
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
