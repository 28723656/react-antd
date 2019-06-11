import React,{Component} from 'react'
import {Button, Card} from "antd";
import SmallTable from "../../components/Table/SmallTable";
import {getAjax} from "../../util/ajax";



const Columns1 = [
    {
        title: '名称',
        dataIndex: 'bookName',
        key:'bookName',
    },
    {
        title: '名称',
        dataIndex: 'bookDescription',
        key:'bookDescription',
    },
    {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: '操作',
        dataIndex: 'buy',
        render: (record,index) =>{
            return <div>
                <Button type="primary" >修改</Button> &nbsp;&nbsp;
                <Button type="danger" >删除</Button>
            </div>
        }
    },
];

class Page1 extends Component{


    state ={
        bookData:[]
    }


    // 初始化数据
    componentDidMount() {
        //加载数据
        getAjax('/plan/book/findAll')
            .then(json => {
                console.log(json)
                if(json.data.flag){
                    let dataArr =[];
                    json.data.data.map((record,index)=>{
                        dataArr.push({
                            key: index,
                            id: record.id,
                            bookName:record.bookName,
                            bookDescription:record.bookDescription,
                            price:record.price,
                        });
                    })
                    this.setState({bookData:dataArr})

                }

            });
    }

    render() {

        const {bookData}=this.state;

        return (
            <Card>
                <SmallTable title="图书增删改查" columns={Columns1} dataSource={bookData} >
                </SmallTable>
            </Card>

        )
    }
}


export default Page1
