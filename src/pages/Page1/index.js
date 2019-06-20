import React, {Component} from 'react';
import {Col, Row, Tabs} from 'antd';
import TodayPlan from "../../pageContent/PageContent1/TodayPlan";
import LongPlan from "../../pageContent/PageContent1/LongPlan";
import TreePlan from "../../pageContent/PageContent1/TreePlan";
import PlanStatistics from "../../pageContent/PageContent1/PlanStatistics";
import Rank from "../../components/Rank";
import {connect} from "react-redux";
import {addPlan, finishPlan,deletePlan, initPlanData, switchModal,updatePlan,loading} from "../../redux/actions";


const TabPane = Tabs.TabPane;


class Page1 extends Component {


    callback = (key) => {
        console.log(key)
    }

    componentDidMount() {
        this.props.initPlanData();
    }


    render() {
        const {planData,modalData,addPlan,finishPlan,deletePlan,switchModal,updatePlan} = this.props;
        console.log(planData)

        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="今日任务" key="1">
                            <TodayPlan data={planData} modalData={modalData} switchModal={switchModal}
                                       addPlan={addPlan} finishPlan={finishPlan} updatePlan={updatePlan}
                                        deletePlan={deletePlan}
                            />
                </TabPane>

                <TabPane tab="长期计划" key="2">
                      <LongPlan data={planData} modalData={modalData} switchModal={switchModal}
                                addPlan={addPlan}   updatePlan={updatePlan}
                                deletePlan={deletePlan}  />
                </TabPane>

                <TabPane tab="树状图查看" key="3">
                    <Row type='flex'>
                        <Col span={16}>
                            <TreePlan/>
                        </Col>
                        <Col span={8}>
                            {/*<Rank first={true}/>*/}
                            {/*<Rank/>*/}
                            {/*<Rank/>*/}
                            {/*<Rank/>*/}
                        </Col>
                    </Row>

                </TabPane>

                <TabPane tab="任务统计" key="4">
                    <Row type='flex'>
                        <Col span={16}>
                            <PlanStatistics/>
                        </Col>
                        <Col span={8}>
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


export default connect(
    state =>({planData: state.planData,modalData:state.modalData,loadingData:state.loadingData}),
    {initPlanData,addPlan,finishPlan,deletePlan,switchModal,updatePlan,loading})
(Page1)
