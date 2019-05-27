import React,{Component} from 'react'
import {Row, Col, Table, Select, Input, Button, DatePicker,Tag} from 'antd';



class CardTwo extends Component{
    render() {

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
            },
            {
                title: 'Age',
                dataIndex: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
            },
        ];
        const data = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '4',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '5',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '6',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '7',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '8',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '9',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            }, {
                key: '10',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            }, {
                key: '11',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '12',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '13',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '14',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '15',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '16',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '17',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },

        ];



        return (


            <div>

                <Row type="flex">
                    <Col span={2} >
                        姓名：
                    </Col>
                    <Col span={4} >
                        <Input placeholder="姓名"   />
                    </Col>
                    <Col span={2} >
                        年龄
                    </Col>
                    <Col span={4} >
                        <Input placeholder="年龄"   />
                    </Col>
                    <Col span={2} >
                        地址
                    </Col>
                    <Col span={4} >
                        <Input placeholder="地址"   />
                    </Col>
                    <Col span={2} >
                        <Input placeholder="搜索"   />
                    </Col>

                </Row>

                <h4>Middle size table</h4>
                <Table columns={columns} dataSource={data} size="middle" />
            </div>

        )
    }
}

export  default CardTwo
