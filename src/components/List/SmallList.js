import React,{Component} from 'react'
import { List, Typography } from 'antd';

const data = [
    {id:3,name:'王五',totalScore:30,todayScore:30,rank:1},
    {id:2,name:'李四',totalScore:60,todayScore:20,rank:2},
    {id:1,name:'张三',totalScore:90,todayScore:10,rank:3},
    {id:4,name:'田七',totalScore:10,todayScore:10,rank:4},
];
class SmallList extends Component{
    render() {
        return (
            <div>
                <List
                    size="small"
                    dataSource={data}
                    renderItem={item => <List.Item>{item.rank}:{item.name}-{item.todayScore}分</List.Item>}
                />
            </div>
        )
    }
}

export default SmallList;
