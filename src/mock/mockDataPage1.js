import {Button, Icon, Switch,Progress,Tag} from "antd";
import React from "react";

const onChange = (checked,row) => {
    console.log(`switch to ${checked},and data is :`,row);
}


const addToTodayList = (value) =>{
    console.log("添加到任务列表",value);
}

// 1-今日计划   2-长期计划
export const columns1_1 = [
    {
        title: '任务名称',
        dataIndex: 'name',
        width:'50%',
        render:(value,row,index) =>{
            let nameBefore = '->'+value
            let nameEnd =''
            switch (row.rank) {
                case 1:return 'D'+nameBefore+nameEnd;
                case 2:return 'C'+nameBefore+nameEnd;
                case 3:return 'B'+nameBefore+nameEnd;
                case 4:return 'A'+nameBefore+nameEnd;
                case 5:return 'S'+nameBefore+nameEnd;
                default:return 'B'+nameBefore+nameEnd;
            }
        }
    },
    {
        title: '时间',
        dataIndex: 'startTime',
        width:'32%',
        render:(valaue,row,index) =>{
            if(row.startTime!== undefined && row.endTime !== undefined){
                const hour1 = row.startTime[3] <10 ? '0'+row.startTime[3]:row.startTime[3]
                const minutes1 = row.startTime[4] <10 ? '0'+row.startTime[4]:row.startTime[4]
                const hour2 = row.endTime[3] <10 ? '0'+row.endTime[3]:row.endTime[3]
                const minutes2 = row.endTime[4] <10 ? '0'+row.endTime[4]:row.endTime[4]
                return hour1+':'+minutes1+" - "+
                    hour2+':'+minutes2;
            }
        }
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



export const columns1_3 = [
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
        title: '添加',
        dataIndex: 'finished',
        render: (value,row,index) =>{
          return <Button type="link" onClick={(value) =>addToTodayList(value)}>
                     <Icon type="plus"/>
                    </Button>
        }
    },
];


export const data1_1 = [
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


export const data1_3 = [
    {
        key: 1,
        name: 'D->任务一:洗衣服',
        timeInterval: '13:00 - 16:00',
        finished: 0,
    },
    {

        key: 2,
        name: 'D->任务二：整理桌子',
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



export const columns2_1 = [
    {
        title: '任务名称',
        dataIndex: 'name',
        width:'50%'
    },
    {
        title: '完成度',
        dataIndex: 'percent',
        render: (value, row, index) => (
            <Progress
                strokeColor={{
                    from: '#108ee9',
                    to: '#87d068',
                }}
                percent={value}
                status="active"
            />
        )
    },
];

export const data2_1 = [
    {
        key: 1,
        name: 'A->任务一:xx',
        percent: 80.3,
        finished: 0,
    },
    {
        key: 2,
        name: 'S->绝杀任务：',
        percent: 10.3,
        finished: 0,
    },
    {
        key: 3,
        name: 'B->超级简单的洗衣服',
        percent: 100.0,
        finished: 1,
    },
    {
        key: 4,
        name: 'C->一个名字超级超级长的任务，我看你怎么处理，不够，我还要继续增加字数',
        percent: 50.0,
        finished: 0,
    }
];

export const columns2_3 = [
    {
        title: '任务名称',
        dataIndex: 'name',
        width:'50%',
        render:(value,row,index) =>{
            let topStr ='';
            if(row.top){
                topStr ='[置顶] ' ;
            }
            let nameAfter = '->'+value
            switch (row.rank) {
                case 1:return  <Tag color={row.color}>{topStr}D{nameAfter}</Tag>
                case 2:return  <Tag color={row.color}>{topStr}C{nameAfter}</Tag>
                case 3:return  <Tag color={row.color}>{topStr}B{nameAfter}</Tag>
                case 4:return  <Tag color={row.color}>{topStr}A{nameAfter}</Tag>
                case 5:return  <Tag color={row.color}>{topStr}S{nameAfter}</Tag>
                default:return '??'+nameAfter;
            }
        }
    },
    {
        title: '完成度',
        dataIndex: 'percent',
        render: (value, row, index) => (
            <Progress
                strokeColor={{
                    from: '#108ee9',
                    to: '#87d068',
                }}
                percent={value}
                status="active"
            />
        )
    },
];

export const data2_3 = [
    {
        id:1,
        name: '任务一:xx',
        rank:4,
        score:960,
        top:false,
        percent: 80.3,
        finished: 0,
    },
    {
        id:2,
        name: '绝杀任务：',
        rank:5,
        score:1522,
        top:true,
        percent: 10.3,
        finished: 0,
    },
    {
        id:3,
        name: '超级简单的洗衣服',
        rank:1,
        score:22,
        top:false,
        percent: 100.0,
        finished: 1,
    },
    {
        id:4,
        name: '一个名字超级超级长的任务，我看你怎么处理，不够，我还要继续增加字数',
        rank:2,
        score:1822,
        top:false,
        percent: 50.0,
        finished: 0,
    }
];



