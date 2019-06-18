import React, {Component} from 'react'
import {Card, Table} from "antd";
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


    render() {
        const {weekPlan,monthPlan,yearPlan} = this.props.data;
        const {addPlan} = this.props;

        return (
            <div style={{padding: 5}}>
                <Card title='本周计划' bordered={false} bodyStyle={{padding: '8px'}}>
                    <Table  rowKey='id' columns={columns2_3} dataSource={weekPlan} showHeader={false} size='small'
                           pagination={
                               {hideOnSinglePage: true}
                           }
                    />
                    <AddPlanModal title='添加本周计划' data={monthPlan} type={2} addPlan={addPlan} />
                </Card>

                <Card title='6月计划' style={{marginTop: 20}} bodyStyle={{padding: '8px'}}>
                    <Table rowKey='id' columns={columns2_3} dataSource={monthPlan} showHeader={false} size='small'
                           pagination={
                               {hideOnSinglePage: true}
                           }
                    />
                    <AddPlanModal  data={yearPlan} title='添加本月计划' type={3} addPlan={addPlan} />
                </Card>

                <Card title='2019年计划' style={{marginTop: 20}} bodyStyle={{padding: '8px'}}>
                    <Table rowKey='id' columns={columns2_3} dataSource={yearPlan} showHeader={false} size='small'
                           pagination={
                               {hideOnSinglePage: true}
                           }
                    />
                    <AddPlanModal  title='添加本年度计划' type={4} addPlan={addPlan} />
                </Card>

            </div>
        )
    }
}

export default LongPlan


