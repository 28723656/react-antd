import React,{Component} from 'react'
import {Button, Icon, Modal} from "antd";
import AddPlanModalContent from "../ModalContent/AddPlanModalContent";

/**
 *  用于page1 今日计划的modal
 */
class AddPlanModal extends Component{

    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
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

    render() {
        return (
            <div>
                <Modal
                    title="添加今日计划"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <AddPlanModalContent handleSubmit={this.handleSubmit} />
                </Modal>
                <Button type="link" onClick={this.showModal}>
                    <Icon type="plus" /> 添加
                </Button>
            </div>
        )
    }
}

export  default AddPlanModal
