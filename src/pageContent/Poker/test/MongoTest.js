import React,{Component} from 'react'
import {getMongoAjax} from "../../../util/ajax";
import {Row,Col} from "antd";

class MongoTest extends Component{

    state ={
        users:[],
    }

    initData = () =>{
        getMongoAjax('/all').then((response) =>{
            console.log(response)
            console.log(response.data)
            this.setState({users:response.data})
        }).catch(error =>{
            console.log('错误',error)
        })
    }

    componentDidMount() {
        this.initData();
    }

    render() {

        const {users}  = this.state;

        return (
            <div>
                <p>Mongo的一些测试:，</p>
                <p>显示注册数据：</p>
                {users && users.length>0 &&
                    users.map((record,indexe)=>{
                        return <Row key={record._id}>
                            <Col span={6}>
                                {record._id}
                            </Col>
                            <Col span={6}>
                                {record.username}
                            </Col>
                            <Col span={6}>
                                {record.type}
                            </Col>
                        </Row>
                    })
                }
                <p></p>
            </div>
        )
    }
}

export default MongoTest
