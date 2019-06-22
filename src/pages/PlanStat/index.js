import React, {Component} from 'react';
import {Col, Row, Tabs} from 'antd';
import TreePlan from "../../pageContent/PageContent1/TreePlan";
import PlanStatistics from "../../pageContent/PageContent1/PlanStatistics";
import Rank from "../../components/Rank";


const TabPane = Tabs.TabPane;


class PlanStat extends Component {


    callback = (key) => {
        console.log(key)
    }


    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="任务列表" key="1">
                    <TreePlan/>
                </TabPane>

                <TabPane tab="任务统计" key="2">
                    <Row type='flex'>
                        <Col xs={24} xl={16}>
                            <PlanStatistics/>
                        </Col>
                        <Col  xs={24} xl={8}>
                            <Rank first={true}/>
                            <Rank/>
                            <Rank/>
                            <Rank/>
                        </Col>
                    </Row>

                </TabPane>
            </Tabs>
        )
    }
}


export default PlanStat
