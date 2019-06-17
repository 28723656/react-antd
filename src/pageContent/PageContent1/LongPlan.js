import React, {Component} from 'react'
import {Card, Table} from "antd";
import {columns2_1, columns2_3, data2_1, data2_3} from "../../mock/mockDataPage1";
import AddPlanModal from './Common/AddPlanModal'
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {addPlan, initPlanData} from "../../redux/actions";

/**
 * 长期计划
 */
class LongPlan extends Component {

    static propTypes = {
        addYearPlan: PropTypes.func
    }

    componentDidMount() {
        this.props.initPlanData(4);
        this.props.initPlanData(3);
        this.props.initPlanData(2);
    }


    render() {

        const {yearPlanData,monthPlanData,weekPlanData} = this.props;
        console.log('yearPlanData->',yearPlanData,monthPlanData,weekPlanData);

        return (
            <div style={{padding: 5}}>
                <Card title='本周计划' bordered={false} bodyStyle={{padding: '8px'}}>
                    <Table  rowKey='id' columns={columns2_3} dataSource={weekPlanData} showHeader={false} size='small'
                           pagination={
                               {hideOnSinglePage: true}
                           }
                    />
                    <AddPlanModal title='添加本周计划' data={monthPlanData} type={2}/>
                </Card>

                <Card title='6月计划' style={{marginTop: 20}} bodyStyle={{padding: '8px'}}>
                    <Table rowKey='id' columns={columns2_3} dataSource={monthPlanData} showHeader={false} size='small'
                           pagination={
                               {hideOnSinglePage: true}
                           }
                    />
                    <AddPlanModal addPlan={this.props.addPlan}  data={yearPlanData} title='添加本月计划' type={3}/>
                </Card>

                <Card title='2019年计划' style={{marginTop: 20}} bodyStyle={{padding: '8px'}}>
                    <Table rowKey='id' columns={columns2_3} dataSource={yearPlanData} showHeader={false} size='small'
                           pagination={
                               {hideOnSinglePage: true}
                           }
                    />
                    <AddPlanModal addPlan={this.props.addPlan} title='添加本年度计划' type={4}/>
                </Card>

            </div>
        )
    }
}

export default connect(
    state => ({yearPlanData: state.yearPlanData,monthPlanData:state.monthPlanData,weekPlanData:state.weekPlanData}),
    {addPlan, initPlanData})
(LongPlan)


