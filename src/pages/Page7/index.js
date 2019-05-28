import React,{Component} from 'react'
import SmallTable from "../../components/Table/SmallTable";
import {Card, Col, Row, Table} from "antd";

class Page7 extends Component{
    render() {

        const Columns1 = [
            {
                title: '名称',
                dataIndex: 'name',
            },
            {
                title: '价格',
                dataIndex: 'price',
            },
            {
                title: '操作',
                dataIndex: 'buy',
                render: (value,record)=>{
                    return <a>购买</a>
                }
            },
        ];
        const Data1 = [
            {
                key: '1',
                name: '物品一',
                price: 32,
                buy: '购买',
            },
            {
                key: '2',
                name: '物品二',
                price: 31,
                buy: '购买',
            },
            {
                key: '3',
                name: '物品三',
                price: 28,
                buy: '购买',
            },
            {
                key: '4',
                name: '物品四',
                price: 2,
                buy: '购买',
            },
            {
                key: '5',
                name: '物品五',
                price: 3,
                buy: '购买',
            }
        ];


        return (
            <Card title="" bordered={false}  >
                <div style={{  padding: '0px' }}>
                    <Row gutter={16}>
                        <Col xl={8} xs={24}>
                            <Card title="" bordered={false} bodyStyle={{padding:5}}  >
                                <SmallTable title="物品种类一" columns={Columns1} dataSource={Data1}  />
                            </Card>
                        </Col>
                        <Col xl={8} xs={24}>
                            <Card title="" bordered={false} bodyStyle={{padding:5}} >
                                <SmallTable title="物品种类二" />
                            </Card>
                        </Col>
                        <Col xl={8} xs={24}>
                            <Card title="" bordered={false} bodyStyle={{padding:5}} >
                                <SmallTable title="物品种类三" />
                            </Card>
                        </Col>
                    </Row>
                </div>

            </Card>
        )
    }
}


export default Page7
