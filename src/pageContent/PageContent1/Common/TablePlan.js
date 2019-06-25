import React, {Component} from 'react'
import {Table} from "antd";
import PropTypes from "prop-types";

/**
 * 所有的 表格，日计划、周、月、年
 */
class TablePlan extends Component {
    static propTypes = {
        data: PropTypes.array,
        columns: PropTypes.array.isRequired,
        type: PropTypes.number.isRequired,
        switchModal: PropTypes.func.isRequired,
        setRecord: PropTypes.func.isRequired,
        stopOpenData: PropTypes.bool,
        setStopOpen: PropTypes.func,
    }


    // 更新
    openUpdatePlanModal = (event, record, type) => {
        console.log("-------3333333------");
        // 如果是今日计划
        if (type === 1) {
            const {stopOpenData} = this.props;
            if (!stopOpenData) {
                console.log('点击的是：', event, record);
                const {switchModal, setRecord} = this.props;
                switchModal(type, true);
                setRecord(record);
            }
        } else {
            console.log('点击的是：', event, record);
            const {switchModal, setRecord} = this.props;
            switchModal(type, true);
            setRecord(record);
        }

    }


    // 允许弹出框
    allowOpenUpdatePlanModal = (e, type) => {
        console.log("开始点击了  ----- 111111----  ");
        if (type === 1) {
            this.props.setStopOpen(false);
        }
    }

    render() {

        const {columns, data, type} = this.props


        return (
            <div>
                {data && data.length > 0 &&
                <Table rowKey='id' columns={columns} dataSource={data} showHeader={false} size='small'
                       pagination={
                           {hideOnSinglePage: true}
                       }
                       onRow={record => {
                           return {
                                onClick: event =>{},
                              // onDoubleClick: event => { this.openUpdatePlanModal(event, record, type) },
                               onTouchStart: event => { this.allowOpenUpdatePlanModal(event, type) },
                           //    onTouchEndCapture: event => { this.openUpdatePlanModal(event, record, type) },
                                 onClickCapture:event =>{this.openUpdatePlanModal(event,record,type)},
                           };
                       }}
                />
                }
            </div>

        )
    }
}

export default TablePlan
