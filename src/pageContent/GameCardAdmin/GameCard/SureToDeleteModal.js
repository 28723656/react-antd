import React,{Component} from 'react'
import {Input, message, Modal} from "antd";
import PropTypes from "prop-types";
import {deleteAjax} from "../../../util/ajax";

class SureToDeleteModal extends Component{

    static propTypes = {
        deleteVisible:PropTypes.bool.isRequired,
        handleDeleteCancel:PropTypes.func.isRequired,
        deleteUrl:PropTypes.string.isRequired,
        initMethod:PropTypes.func.isRequired,
        deletePassword:PropTypes.string.isRequired,
        handleDeletePasswordChange:PropTypes.func.isRequired,
    }

    // ------------删除卡片，确认----------------
    handleDeleteOk = () => {
        // 获取
        const {deleteUrl,handleDeleteCancel,initMethod,deletePassword} = this.props
        if(deletePassword ==='awsl'){
            deleteAjax(deleteUrl)
                .then(response =>{
                    if(response.data.flag){
                        message.success('删除成功');
                    }else {
                        if(response.data.code === 20001){
                            message.error('删除失败,请联系管理员反馈')
                        }else {
                            message.error('该数据无法被删除，因为其他地方引用了这个数据');
                        }
                    }
                    handleDeleteCancel()
                    initMethod()
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
