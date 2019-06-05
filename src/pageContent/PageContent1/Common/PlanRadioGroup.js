import React, {Component} from 'react'
import {Radio} from "antd";

class PlanRadioGroup extends Component {

    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
    //    debugger
        if ('value' in nextProps) {
            return nextProps.value;
        }
        return null;
    }

    constructor(props) {
        super(props);
     //   debugger
        const value = props.value || {};
        this.state = {
            selected: value || 1,
        };
    }


    // 处理等级的改变
    handleRankChange = (e) =>{
        const resultValue = e.target.value *10
        this.setState({selected:e.target.value})
        this.props.setFieldsValue({
            score:resultValue,
        });
        this.props.onChange(e.target.value);
    }

    render() {
        const {selected} = this.state;

        return (
            <Radio.Group onChange={this.handleRankChange}  defaultValue={selected}>
                <Radio.Button value={1}>&nbsp;&nbsp;D&nbsp;&nbsp;</Radio.Button>
                <Radio.Button value={2}>&nbsp;&nbsp;C&nbsp;&nbsp;</Radio.Button>
                <Radio.Button value={3}>&nbsp;&nbsp;B&nbsp;&nbsp;</Radio.Button>
                <Radio.Button value={4}>&nbsp;&nbsp;A&nbsp;&nbsp;</Radio.Button>
                <Radio.Button value={5}>&nbsp;&nbsp;S&nbsp;&nbsp;</Radio.Button>
            </Radio.Group>
        )
    }
}

export default PlanRadioGroup
