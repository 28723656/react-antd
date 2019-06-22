import React, {Component} from 'react'
import {Button, Col, Icon, Modal, Row} from "antd";
import AddTodayPlanModalContent from "../ModalContent/AddTodayPlanModalContent";
import AddWeekPlanModalContent from "../ModalContent/AddWeekPlanModalContent";
import AddMonthPlanModalContent from "../ModalContent/AddMonthPlanModalContent";
import AddYearPlanModalContent from "../ModalContent/AddYearPlanModalContent";
import PropTypes from 'prop-types'
import TodayPlan from "../../../pages/Page1";

/**
 *  用于page1 今日计划的modal
 */

// 初始化标题
const initTitle = '添加今日计划'
// 初始化类型   1-今日   2-本周   3-本月   4-今年
const initType = 1

class AddPlanModal extends Component{

    static propTypes ={
        title:PropTypes.string.isRequired,
        type:PropTypes.number.isRequired,
        data:PropTypes.array,
        addPlan: PropTypes.func.isRequired,
    }




    render() {
        let {title,type,addPlan} = this.props;
        title = title === undefined?initTitle:title
        type = type ===undefined?initType:type

        const {data,modalData,switchModal,record,updatePlan,deletePlan} = this.props;

        if(record !== null){
            title='修改计划 '
        }
        let visible = false;
        if(type === 1){
            visible = modalData.today
        }else if(type ===2 ){
            visible = modalData.week
        }else if(type ===3 ){
            visible = modalData.month
        }else if(type ===4 ){
            visible = modalData.year
        }

        return (
            <div>
                <Modal
                    width={650}
                    title={title}
                    visible={visible}
                    onOk={() => switchModal(type,false)}
                    onCancel={() => switchModal(type,false)}
                    maskClosable={false}
                    footer={null}
                    destroyOnClose={true}
                >
                    {type ===1 &&<AddTodayPlanModalContent  addPlan={addPlan} data={data} switchModal={switchModal}
                                                            record={record}     updatePlan={updatePlan} deletePlan={deletePlan}
                    />}
                    {type ===2 &&<AddWeekPlanModalContent   addPlan={addPlan} data={data} switchModal={switchModal}
                                                            record={record}     updatePlan={updatePlan} deletePlan={deletePlan}
                    />}
                    {type ===3 &&<AddMonthPlanModalContent  addPlan={addPlan}  data={data}  switchModal={switchModal}
                                                            record={record}     updatePlan={updatePlan} deletePlan={deletePlan}
                    />}
                    {type ===4 &&<AddYearPlanModalContent   addPlan={addPlan} switchModal={switchModal}
                                                            record={record}    updatePlan={updatePlan} deletePlan={deletePlan}
                    />}


                </Modal>
            </div>
        )
    }
}

export  default AddPlanModal
