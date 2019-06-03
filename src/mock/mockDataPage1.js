import {Switch} from "antd";
import React from "react";

const onChange = (checked) => {
    console.log(`switch to ${checked}`);
}


export const columns = [
    {
        title: '任务名称',
        dataIndex: 'name',
        width:'50%'
    },
    {
        title: '时间',
        dataIndex: 'timeInterval',
        width:'32%'
    },
    {
        title: '完成',
        dataIndex: 'finished',
        render: (value,row,index) =>{
            console.log( value)
            if(value === 1){
                return <div>
                    <Switch defaultChecked  onChange={(checked) =>onChange(checked,row)}/>
                    &nbsp;10分
                </div>
            }else if(value === 0){
                return <Switch  onChange={(checked) =>onChange(checked,row)}/>
            }
        }
    },
];


export const data = [
    {
        key: 1,
        name: 'A->任务一:xx',
        timeInterval: '13:00 - 16:00',
        finished: 0,
    },
    {

        key: 2,
        name: 'S->任务二：学习react',
        timeInterval: '9:00 - 11:00',
        finished: 1,
    },
    {

        key: 3,
        name: 'C->任务三：读书',
        timeInterval: '19:00 - 22:00',
        finished: 0,
    },
];

