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
        name: 'A->读书《穷爸爸，富爸爸》',
        timeInterval: '13:00 - 16:00',
        finished: 0,
    },
    {

        key: 2,
        name: 'S->学习react',
        timeInterval: '9:00 - 11:00',
        finished: 1,
    },
    {

        key: 3,
        name: 'C->玩游戏《鬼泣5》-通关血宫模式通关血宫模式通关血宫模式',
        timeInterval: '19:00 - 22:00',
        finished: 0,
    },
];

