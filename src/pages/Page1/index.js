import React, {Component} from 'react';
import {Col, Row, Tabs} from 'antd';
import TodayPlan from "../../pageContent/PageContent1/TodayPlan";
import LongPlan from "../../pageContent/PageContent1/LongPlan";
import {connect} from "react-redux";
import {
    addPlan,
    deletePlan,
    finishPlan,
    initPlanData,
    setRecord,
    setStopOpen,
    switchModal,
    updatePlan
} from "../../redux/actions";
import Rank from "../../components/Rank";


const TabPane = Tabs.TabPane;


class Page1 extends Component {


    callback = (key) => {
        console.log(key)
    }

    componentDidMount() {
        this.props.initPlanData();
    }


    render() {
        const {planData,modalData,addPlan,finishPlan,deletePlan,switchModal,updatePlan,setRecord,recordData,setStopOpen,stopOpenData} = this.props;
        console.log(planData)

        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="今日任务" key="1">
                            <TodayPlan data={planData} modalData={modalData} switchModal={switchModal}
                                       addPlan={addPlan} finishPlan={finishPlan} updatePlan={updatePlan}
                                        deletePlan={deletePlan} setRecord={setRecord} recordData={recordData}
                                       setStopOpen={setStopOpen} stopOpenData={stopOpenData}

                            />
                </TabPane>

                <TabPane tab="长期计划" key="2">
                      <LongPlan data={planData} modalData={modalData} switchModal={switchModal}
                                addPlan={addPlan}   updatePlan={updatePlan}
                                deletePlan={deletePlan} setRecord={setRecord} recordData={recordData}
                      />
                </TabPane>

                <TabPane tab="排名奖励" key="3">
                    <Row type='flex' gutter={16}>
                        <Col  xs={24} xl={8}>
                            <Rank />
                        </Col>
                        <Col  xs={24} xl={8}>
                            <Rank/>
                        </Col>
                        <Col  xs={24} xl={8}>
                            <Rank />
                        </Col>
                        <Col  xs={24} xl={8}>
                            <Rank/>
                        </Col>
                    </Row>
                </TabPane>


            </Tabs>
        )
    }
}


export default connect(
    state =>({planData: state.planData,modalData:state.modalData,recordData:state.recordData,stopOpenData:state.stopOpenData}),
    {initPlanData,addPlan,finishPlan,deletePlan,switchModal,updatePlan,setRecord,setStopOpen})
(Page1)
