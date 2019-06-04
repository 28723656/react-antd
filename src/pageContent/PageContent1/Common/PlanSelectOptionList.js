import React,{Component} from 'react'
import {Select} from "antd";

const { Option } = Select;

/**
 * 关联任务
 */
class PlanSelectOptionList extends Component{

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
            <Select>
                {
                    data.map((record,index) =>{
                        return <Option  value={record.id} >{this.changeRankToLetter(record.rank)}->{record.name} </Option>
                    })
                }
            </Select>
        )
    }
}

export  default  PlanSelectOptionList
