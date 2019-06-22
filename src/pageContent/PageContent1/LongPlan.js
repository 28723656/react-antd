import React, {Component} from 'react'
import {Button, Card, Col, Icon, Row, Table} from "antd";
import {columns2_3} from "../../mock/mockDataPage1";
import AddPlanModal from './Common/AddPlanModal'
import PropTypes from 'prop-types'
import TodayPlan from "../../pages/Page1";
import TablePlan from "./Common/TablePlan";

/**
 * 长期计划
 */
class LongPlan extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        addPlan: PropTypes.func.isRequired,
    }

    // 添加计划
    handleAddPlan = (type) => {
        const {switchModal,setRecord} = this.props;
        setRecord(null);
        switchModal(type,true);
    }


    render() {
        const {weekPlan, monthPlan, yearPlan} = this.props.data;
        const {addPlan, modalData, switchModal, updatePlan, deletePlan,setRecord,recordData} = this.props;

        return (
            <div style={{padding: 5}}>
                <Card title='本周计划' bordered={false} bodyStyle={{padding: '8px'}}>
                    <TablePlan data={weekPlan} columns={columns2_3} type={2} switchModal={switchModal} setRecord={setRecord}/>
                    <AddPlanModal data={monthPlan} record={recordData}
                                  modalData={modalData} switchModal={switchModal}
                                  addPlan={addPlan} updatePlan={updatePlan}
                                  title='添加本周计划' type={2}
                                  deletePlan={deletePlan}
                    />

                    <Row>
                        <Col span={6}>
                            <Button type="link" onClick={() =>this.handleAddPlan(2)}>
                                <Icon type="plus"/> 添加计划
                            </Button>
                        </Col>
                        <Col span={6} offset={12}>
                            <Button type="link" onClick={this.showHistory}>
                                <Icon type="history"/> 查看历史
                            </Button>
                        </Col>

                    </Row>

                </Card>

                <Card title='6月计划' style={{marginTop: 20}} bodyStyle={{padding: '8px'}}>
                    <TablePlan data={monthPlan} columns={columns2_3} type={3} switchModal={switchModal} setRecord={setRecord}/>
                    <AddPlanModal data={yearPlan} record={recordData}
                                  modalData={modalData} switchModal={switchModal}
                                  addPlan={addPlan} updatePlan={updatePlan}
                                  title='添加本月计划' type={3}
                                deletePlan={deletePlan}
                    />


                    <Row>
                        <Col span={6}>
                            <Button type="link" onClick={() =>this.handleAddPlan(3)}>
                                <Icon type="plus"/> 添加计划
                            </Button>
                        </Col>
                        <Col span={6} offset={12}>
                            <Button type="link" onClick={this.showHistory}>
                                <Icon type="history"/> 查看历史
                            </Button>
                        </Col>

                    </Row>
                </Card>

                <Card title='2019年计划' style={{marginTop: 20}} bodyStyle={{padding: '8px'}}>
                    <TablePlan data={yearPlan} columns={columns2_3} type={4} switchModal={switchModal} setRecord={setRecord}/>
                    <AddPlanModal record={recordData}
                                  modalData={modalData} switchModal={switchModal}
                                  addPlan={addPlan} updatePlan={updatePlan}
                                  title='添加本年度计划' type={4}
                                  deletePlan={deletePlan}
                    />
                    <Row>
                        <Col span={6}>
                            <Button type="link" onClick={() =>this.handleAddPlan(4)}>
                                <Icon type="plus"/> 添加计划
                            </Button>
                        </Col>
                        <Col span={6} offset={12}>
                            <Button type="link" onClick={this.showHistory}>
                                <Icon type="history"/> 查看历史
                            </Button>
                        </Col>

                    </Row>

                </Card>

            </div>
        )
    }
}

export default LongPlan


