import React, {Component} from 'react'
import {Button, Col, Icon, Modal, Row} from "antd";
import AddTodayPlanModalContent from "../ModalContent/AddTodayPlanModalContent";
import AddWeekPlanModalContent from "../ModalContent/AddWeekPlanModalContent";
import AddMonthPlanModalContent from "../ModalContent/AddMonthPlanModalContent";
import AddYearPlanModalContent from "../ModalContent/AddYearPlanModalContent";
import PropTypes from 'prop-types'

/**
 *  用于page1 今日计划的modal
 */

// 初始化标题
const initTitle = '修改计划'
// 初始化类型   1-今日   2-本周   3-本月   4-今年
const initType = 1

class AddPlanModal extends Component{

    static propTypes ={
        title:PropTypes.string.isRequired,
        type:PropTypes.number.isRequired,
        data:PropTypes.array,
        addPlan: PropTypes.func.isRequired,
    }

    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    // 处理子窗口提交
    handleSubmit = () =>{
        this.setState({
            visible: false,
        });
    }

    //显示历史记录  ---->  这个设计不合理，后期改进
    showHistory =() =>{
    }

    render() {
        let {title,type,addPlan} = this.props;
        title = title === undefined?initTitle:title
        type = type ===undefined?initType:type

        const {data,modalData,switchModal} = this.props;

        return (
            <div>
                <Modal
                    width={650}
                    title={title}
                    visible={modalData}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    destroyOnClose={true}
                >
                    {type ===1 &&<AddTodayPlanModalContent  modalData={modalData} switchModal={switchModal} addPlan={addPlan} data={data} handleSubmit={this.handleSubmit} />}
                    {type ===2 &&<AddWeekPlanModalContent   addPlan={addPlan} data={data} handleSubmit={this.handleSubmit} />}
                    {type ===3 &&<AddMonthPlanModalContent  addPlan={addPlan}  data={data}   handleSubmit={this.handleSubmit} />}
                    {type ===4 &&<AddYearPlanModalContent   addPlan={addPlan} handleSubmit={this.handleSubmit} />}


                </Modal>

                <Row>
                    <Col span={6} >
                        <Button type="link" onClick={this.showModal}>
                            <Icon type="plus" /> 添加计划
                        </Button>
                    </Col>
                    {
                        type !==1 &&
                        <Col span={6} offset={12}>
                            <Button type="link" onClick={this.showHistory}>
                                <Icon type="history" /> 查看历史
                            </Button>
                        </Col>
                    }

                </Row>

            </div>
        )
    }
}

export  default AddPlanModal
