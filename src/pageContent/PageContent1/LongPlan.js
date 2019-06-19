import React, {Component} from 'react'
import {Button, Card, Col, Icon, Row, Table} from "antd";
import {columns2_3} from "../../mock/mockDataPage1";
import AddPlanModal from './Common/AddPlanModal'
import PropTypes from 'prop-types'

/**
 * 长期计划
 */
class LongPlan extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        addPlan: PropTypes.func.isRequired,
    }

    // 添加计划
    handleAddPlan = (e) =>{
        this.props.switchModal(true);
        this.setState({record:null});
    }


    render() {
        const {weekPlan,monthPlan,yearPlan} = this.props.data;
        const {addPlan} = this.props;

        return (
            <div style={{padding: 5}}>
                <Card title='本周计划' bordered={false} bodyStyle={{padding: '8px'}}>
                    {weekPlan &&
                    <Table  rowKey='id' columns={columns2_3} dataSource={weekPlan} showHeader={false} size='small'
                            pagination={
                                {hideOnSinglePage: true}
                            }
                    />
                    }
                    <AddPlanModal title='添加本周计划' data={monthPlan} type={2} addPlan={addPlan} />

                    <Row>
                        <Col span={6}>
                            <Button type="link" onClick={this.handleAddPlan}>
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
                    {monthPlan &&
                    <Table rowKey='id' columns={columns2_3} dataSource={monthPlan} showHeader={false} size='small'
                           pagination={
                               {hideOnSinglePage: true}
                           }
                    />
                    }

                    <AddPlanModal  data={yearPlan} title='添加本月计划' type={3} addPlan={addPlan} />

                    <Row>
                        <Col span={6}>
                            <Button type="link" onClick={this.handleAddPlan}>
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
                    {yearPlan &&
                    <Table rowKey='id' columns={columns2_3} dataSource={yearPlan} showHeader={false} size='small'
                           pagination={
                               {hideOnSinglePage: true}
                           }
                    />
                    }

                    <AddPlanModal  title='添加本年度计划' type={4} addPlan={addPlan} />
                    <Row>
                        <Col span={6}>
                            <Button type="link" onClick={this.handleAddPlan}>
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


