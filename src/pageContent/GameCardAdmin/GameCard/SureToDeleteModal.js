import React,{Component} from 'react'
import {Input, message, Modal} from "antd";
import PropTypes from "prop-types";
import {deleteAjax} from "../../../util/ajax";

class SureToDeleteModal extends Component{

    static propTypes = {
        deleteVisible:PropTypes.bool.isRequired,
        handleDeleteCancel:PropTypes.func.isRequired,
        deleteCardId:PropTypes.number.isRequired,
        initCardData:PropTypes.func.isRequired,
        deletePassword:PropTypes.string.isRequired,
        handleDeletePasswordChange:PropTypes.func.isRequired,
    }

    // ------------删除卡片，确认----------------
    handleDeleteOk = () => {
        // 获取
        const {deleteCardId,handleDeleteCancel,initCardData,deletePassword} = this.props
        if(deletePassword ==='awsl'){
            deleteAjax(`/game/card/${deleteCardId}`)
                .then(response =>{
                    if(response.data.flag){
                        message.success('删除成功');
                    }else {
                        message.error('删除失败,请联系管理员反馈');
                    }
                    handleDeleteCancel()
                    initCardData()
                })
        }else {
            message.error('没有口令，就不要乱删除了');
        }
    }

    handleDeletePasswordChange =(e) =>{
        this.props.handleDeletePasswordChange(e.target.value)
    }
    render() {
        const {deleteVisible,handleDeleteCancel,deletePassword} = this.props;
        console.log('deletePassword',deletePassword)
        return (
            <Modal
                destroyOnClose={true}
                title="确认删除吗？"
                visible={deleteVisible}
                onOk={this.handleDeleteOk}
                onCancel={handleDeleteCancel}
            >
                <Input placeholder='请输入管理员口令:' value={deletePassword} onChange={this.handleDeletePasswordChange} />
            </Modal>
        )
    }
}

export default SureToDeleteModal
