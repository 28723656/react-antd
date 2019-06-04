import React,{Component} from 'react'
import {Select} from "antd";

const { Option } = Select;

/**
 * 关联任务
 */
class PlanSelectOptionList extends Component{
    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
            };
        }
        return null;
    }

    constructor(props) {
        super(props);

        const value = props.value || {};
        this.state = {
            selected: value.selected || 1,
        };
    }


    handleSelectChange = record => {
        const selected = record ;
        console.log(selected)

        if (!('value' in this.props)) {
            this.setState({ selected });
        }
        this.triggerChange({ selected });
    };

    triggerChange = changedValue => {
        // Should provide an event to pass value to Form.
        const {onChange} = this.props;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    };

    changeRankToLetter = (value) =>{
        if(value === 1){
            return 'D'
        }else if(value === 2){
            return 'C'
        }else if(value === 3){
            return 'B'
        }else if(value === 4){
            return 'A'
        }else if(value === 5){
            return 'S'
        }
    }

    render() {

        const {data} = this.props

        return (
            <Select onChange={this.handleSelectChange} >
                {
                    data.map((record,index) =>{
                        return <Option key={record.id} value={record.rank} >{this.changeRankToLetter(record.rank)}->{record.name} </Option>
                    })
                }
            </Select>
        )
    }
}

export  default  PlanSelectOptionList
