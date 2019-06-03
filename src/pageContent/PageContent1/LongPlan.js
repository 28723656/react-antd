import React,{Component} from 'react'
import {Card, Table} from "antd";
import {columns2_1,data2_1} from "../../mock/mockDataPage1";
import AddPlanModal from './Common/AddPlanModal'

/**
 * 长期计划
 */
class LongPlan extends Component{
    render() {
        return (
            <div style={{padding:5}} >
                <Card title='本周计划' bordered={false} bodyStyle={{padding:'8px'}} >
                    <Table columns={columns2_1}  dataSource={data2_1} showHeader={false} size='small'
                           pagination ={
                               {hideOnSinglePage :true}
                           }
                    />
                    <AddPlanModal title='添加本周计划' type={2}/>
                </Card>

                <Card title='6月计划' style={{marginTop:20 }} bodyStyle={{padding:'8px'}}  >
                    <Table columns={columns2_1}  dataSource={data2_1} showHeader={false} size='small'
                           pagination ={
                               {hideOnSinglePage :true}
                           }
                    />
                    <AddPlanModal title='添加本月计划' type={3}/>
                </Card>

                <Card title='2019年计划' style={{marginTop:20 }} bodyStyle={{padding:'8px'}}  >
                    <Table columns={columns2_1}  dataSource={data2_1} showHeader={false} size='small'
                           pagination ={
                               {hideOnSinglePage :true}
                           }
                    />
                    <AddPlanModal title='添加本年度计划' type={4}/>
                </Card>

            </div>
        )
    }
}

export  default LongPlan


