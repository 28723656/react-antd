import React,{Component} from 'react'
import SmallTable from "../../components/Table/SmallTable";
import {Card, Col, Row, Table,Button} from "antd";
import {connect} from "react-redux";
import {buyItem} from "../../redux/actions";

class Page7 extends Component{


    // render格式化
    handleBuy =(text,record) =>(
        <a  onClick={() =>this.handleClick(record)} >购买{record.id}</a>
    )

    //处理点击购物,需要传入id和name
    handleClick =(record) =>{
        console.log(record.name)
        const {buyItem}=this.props;
        buyItem(record);
    }
    render() {



        const Columns1 = [
            {
                title: '名称',
                dataIndex: 'name',
                key:'name',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '操作',
                dataIndex: 'buy',
                render: this.handleBuy
            },
        ];
        const Data1 = [
            {
                key: '1',
                name: '物品一',
                price: 32,
                id:1,
            },
            {
                key: '2',
                name: '物品二',
                price: 31,
                id:2,
            },
            {
                key: '3',
                name: '物品三',
                price: 28,
                id:3,
            },
            {
                key: '4',
                name: '物品四',
                price: 2,
                id:4,
            },
            {
                key: '5',
                name: '物品五',
                price: 3,
                id:5
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
                    </Row>
                </div>

            </Card>
        )
    }
}


export default connect(
    state => ({personData: state.personData}),
    {buyItem}
)(Page7)
