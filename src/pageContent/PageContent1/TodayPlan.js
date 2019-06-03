import React,{Component} from 'react'
import {Card, Table} from "antd";

import {columns, columns3, data, data3} from "../../mock/mockDataPage1";
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
                    <Table columns={columns}  dataSource={data} showHeader={false} size='small'
                           scroll={{x:true}}
                           pagination ={
                               {hideOnSinglePage :true}
                           }
                    />
                    <AddPlanModal/>
                </Card>


                <Card title='未完成' style={{marginTop:15 }} bodyStyle={{padding:'8px'}}  >
                <Table columns={columns} dataSource={data} showHeader={false} size='small'
                       scroll={{x:true}}
                       pagination ={
                           {hideOnSinglePage :true}
                       }
                />
            </Card>

                <SmallPaddingCard title='其他任务'>
                    <Table columns={columns3} dataSource={data3} showHeader={false} size='small'
                           scroll={{x:true}}
                           pagination ={
                               {hideOnSinglePage :true}
                           }
                    />
                </SmallPaddingCard>
            </div>
        )
    }
}

export  default TodayPlan
