import React,{Component} from 'react'
import {Table} from "antd";

import {columns,data} from "../../mock/mockDataPage1";
import AddPlanModal from "./Common/AddPlanModal";

/**
 * page1  今日计划部分
 */

class TodayPlan extends Component{
    render() {
        return (
            <div style={{padding:5}} >
                <Table columns={columns} dataSource={data} showHeader={false} size='small'
                       scroll={{x:true}}
                       pagination ={
                           {hideOnSinglePage :true}
                       }
                />
                <AddPlanModal/>
            </div>
        )
    }
}

export  default TodayPlan
