import React, {Component} from 'react'
import {Modal} from "antd";
import PropTypes from 'prop-types'

class CommonModal extends Component{


    static propTypes ={
        title: PropTypes.string.isRequired,
    }

    state = {
        visible: false,
    }

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {

       const {title} = this.props;

        return (
            <Modal
                title={title}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={null}
                destroyOnClose={true}
            >
            </Modal>
        )
    }
}

export  default CommonModal
