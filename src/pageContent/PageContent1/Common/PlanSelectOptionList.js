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
            return nextProps.value;
        }
        return null;
    }

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            selected: value || 1,
        };
    }


    handleSelectChange = record => {
        const selected = record ;

        this.setState({ selected });
        // 调用这个的时候，会调用getDerivedStateFromProps，然后看那个方法里面的return
        this.props.onChange(selected);
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
        const {selected} = this.state;
        debugger
        return (
            <Select onChange={this.handleSelectChange} defaultValue={selected} >
                {
                    data.map((record,index) =>{
                        return <Option key={record.id} value={record.id} >{this.changeRankToLetter(record.rank)}->{record.name} </Option>
                    })
                }
            </Select>
        )
    }
}

export  default  PlanSelectOptionList
