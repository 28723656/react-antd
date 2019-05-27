import React,{Component} from 'react'
import {Card, Col, Row, Table} from "antd";

const columns = [
    {
        title: 'order',
        dataIndex: 'order',
        render:(value) =>{
            if(value <= 10){
                return <span style={{
                    display: 'inline-block',
                    minWidth: '2em',
                    fontSize: '.8em',
                    paddingLeft: '2px',
                    paddingRight: '2px',
                    textAlign: 'center',
                    color: '#fe0101',
                    border: '1px solid #3d4f61'}} >{value}</span>
            }else{
                return <span style={{
                    display: 'inline-block',
                    minWidth: '2em',
                    fontSize: '.8em',
                    paddingLeft: '2px',
                    paddingRight: '2px',
                    textAlign: 'center'
                    }} >{value}</span>
            }
        }
    },
    {
        title: 'name',
        dataIndex: 'name',
        render: (text,record,index) =>{
            if(record.order === 1){
                return  <a href='https://donghua.agefans.com/detail/20190086' target='_blank'  >{text}</a>
            }else if(record.order ===2){
                return  <a href='https://donghua.agefans.com/detail/20190083' target='_blank'  >{text}</a>
            }else {
                return  <a href='https://donghua.agefans.com/detail/20000001' target='_blank'  >{text}</a>

            }
        }

    },
    {
        title: 'hot',
        dataIndex: 'hot',
    },
];
const data = [
    {
        key: '1',
        order: 1,
        name: "一拳超人 第二季",
        hot: 1800000,
    },
    {
        key: '2',
        order: 2,
        name: "进击的巨人 第三季",
        hot: 900000,
    },
    {
        key: '3',
        order: 3,
        name: "JoJo的奇妙冒险 第三季）",
        hot: 680000,
    },
    {
        key: '4',
        order: 4,
        name: "海贼王",
        hot: 500000,
    },
    {
        key: '5',
        order: 5,
        name: "刀剑神域",
        hot: 400000,
    },
    {
        key: '6',
        order: 6,
        name: "一拳超人",
        hot: 500000,
    },
    {
        key: '7',
        order: 7,
        name: "约会大作战",
        hot: 200000,
    },
    {
        key: '8',
        order: 8,
        name: "约定的梦幻岛",
        hot: 80000,
    },
    {
        key: '9',
        order: 9,
        name: "东京喰种",
        hot: 60000,
    },
    {
        key: '10',
        order: 10,
        name: "浪客剑心",
        hot: 20000,
    },
    {
        key: '11',
        order: 11,
        name: "缘之空",
        hot: 3420,
    },
    {
        key: '12',
        order: 12,
        name: "从零开始的异世界生活",
        hot: 3424,
    },
    {
        key: '13',
        order: 13,
        name: "七龙珠",
        hot: 3424,
    },
    {
        key: '14',
        order: 14,
        name: "化物语",
        hot: 3424,
    },
    {
        key: '15',
        order: 15,
        name: "赌博默示录",
        hot: 3424,
    }

];

class RankingList extends Component{

    render() {
        return (
            <div style={{  padding: '0px' }}>
                <Row gutter={16}>
                    <Col xl={8} xs={24}>
                        <Card title="" bordered={false} bodyStyle={{padding:5}}  >
                            <Table columns={columns} dataSource={data} size="middle"
                                   pagination={{
                                       hideOnSinglePage:true,
                                       pageSize:30
                                   }}
                                   showHeader={false}
                            />
                        </Card>
                    </Col>
                    <Col xl={8} xs={24}>
                        <Card title="" bordered={false} bodyStyle={{padding:5}} >
                            <Table columns={columns} dataSource={data} size="middle"
                                   pagination={{
                                       hideOnSinglePage:true,
                                       pageSize:30
                                   }}
                                   showHeader={false}
                            />
                        </Card>
                    </Col>
                    <Col xl={8} xs={24}>
                        <Card title="" bordered={false} bodyStyle={{padding:5}} >
                            <Table columns={columns} dataSource={data} size="middle"
                                   pagination={{
                                       hideOnSinglePage:true,
                                       pageSize:30
                                   }}
                                   showHeader={false}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export  default RankingList
