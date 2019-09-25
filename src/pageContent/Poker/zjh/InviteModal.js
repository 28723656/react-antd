import React,{Component} from 'react'
import { Modal, Button } from 'antd';

import PropTypes from "prop-types";

class InviteModal extends Component {

    static propTypes = {
        handleCancel:PropTypes.func.isRequired,
        handleOk:PropTypes.func.isRequired,
        inviteVisible:PropTypes.bool.isRequired,

    }


    handleOk = e => {
       this.props.handleOk();
    };

    handleCancel = e => {
        this.props.handleCancel();
    };

    render() {

        const {inviteVisible} = this.props;

        return (
            <div>
                <Modal
                    title="接受邀请？"
                    visible={inviteVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="接受"
                    cancelText="拒绝"
                >
                    <p>接受XXX的邀请，参加XXX</p>
                </Modal>
            </div>
        );
    }
}

export default InviteModal
