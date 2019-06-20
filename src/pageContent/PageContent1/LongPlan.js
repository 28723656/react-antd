import React, {Component} from 'react'
import {Button, Card, Col, Icon, Row, Table} from "antd";
import {columns2_3} from "../../mock/mockDataPage1";
import AddPlanModal from './Common/AddPlanModal'
import PropTypes from 'prop-types'
import TodayPlan from "../../pages/Page1";

/**
 * 长期计划
 */
class LongPlan extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        addPlan: PropTypes.func.isRequired,
    }

    state = {
        record: null,
    }


    // 添加计划
    handleAddPlan = (type) => {
        this.props.switchModal(type,true);
        this.setState({record: null});
    }

    // 更新
    updatePlan = (event, record,type) => {
        console.log('点击的是：', record);
        this.props.switchModal(type,true);
        this.setState({record})
    }


    render() {
        const {weekPlan, monthPlan, yearPlan} = this.props.data;
        const {addPlan, modalData, switchModal, updatePlan, deletePlan} = this.props;
        const {record} = this.state;

        return (
            <div style={{padding: 5}}>
                <Card title='本周计划' bordered={false} bodyStyle={{padding: '8px'}}>
                    {weekPlan && weekPlan.length > 0 &&
                    <Table rowKey='id' columns={columns2_3} dataSource={weekPlan} showHeader={false} size='small'
                           pagination={
                               {hideOnSinglePage: true}
                           }
                           onRow={record => {
                               return {
                                   onClick: event => {
                                   }, // 点击行
                                   onDoubleClick: event => {
                                       this.updatePlan(event, record,2)
                                   },
                                   onContextMenu: event => {
                                   },
                                   onMouseEnter: event => {
                                   }, // 鼠标移入行
                                   onMouseLeave: event => {
                                   },
                               };
                           }}
                    />
                    }
                    <AddPlanModal data={monthPlan} record={record}
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
                    {monthPlan && monthPlan.length > 0 &&
                    <Table rowKey='id' columns={columns2_3} dataSource={monthPlan} showHeader={false} size='small'
                           pagination={
                               {hideOnSinglePage: true}
                           }
                           onRow={record => {
                               return {
                                   onClick: event => {
                                   }, // 点击行
                                   onDoubleClick: event => {
                                       this.updatePlan(event, record,3)
                                   },
                                   onContextMenu: event => {
                                   },
                                   onMouseEnter: event => {
                                   }, // 鼠标移入行
                                   onMouseLeave: event => {
                                   },
                               };
                           }}
                    />
                    }

                    <AddPlanModal data={yearPlan} record={record}
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
                    {yearPlan && yearPlan.length > 0 &&
                    <Table rowKey='id' columns={columns2_3} dataSource={yearPlan} showHeader={false} size='small'
                           pagination={
                               {hideOnSinglePage: true}
                           }
                           onRow={record => {
                               return {
                                   onClick: event => {
                                   }, // 点击行
                                   onDoubleClick: event => {
                                       this.updatePlan(event, record,4)
                                   },
                                   onContextMenu: event => {
                                   },
                                   onMouseEnter: event => {
                                   }, // 鼠标移入行
                                   onMouseLeave: event => {
                                   },
                               };
                           }}
                    />
                    }

                    <AddPlanModal record={record}
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


