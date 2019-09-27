import React,{Component} from 'react'
import { Modal, Button,Typography  } from 'antd';

import PropTypes from "prop-types";
const { Text } = Typography;

class InviteModal extends Component {

    static propTypes = {
        handleCancel:PropTypes.func.isRequired,
        handleOk:PropTypes.func.isRequired,
        inviteVisible:PropTypes.bool.isRequired,
        owner:PropTypes.object.isRequired,
        guest:PropTypes.object.isRequired,
    }


    handleOk = (owner,guest) => {
       this.props.handleOk(owner,guest);
    };

    handleCancel = (owner,guest) => {
        this.props.handleCancel(owner,guest);
    };

    render() {

        const {inviteVisible,owner,guest} = this.props;

        return (
            <div>
                <Modal
                    title="接受邀请？"
                    visible={inviteVisible}
                    onOk={ () =>this.handleOk(owner,guest)}
                    onCancel={() =>this.handleCancel(owner,guest)}
                    okText="接受"
                    cancelText="拒绝"
                >
                    <p>接受<Text mark>{owner.nickName}</Text>的邀请?</p>
                </Modal>
            </div>
        );
    }
}

export default InviteModal
