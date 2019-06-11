import React, {Component} from 'react'
import {Button, Card, message, Modal, Row, Col, Input} from "antd";
import SmallTable from "../../components/Table/SmallTable";
import {deleteAjax, getAjax, updateAjax} from "../../util/ajax";
import ModalContent from '../../pageContent/Page2/ModalContent'

const Search = Input.Search;

class Page1 extends Component {


    state = {
        bookData: [],
        visible: false,
        entity:{}
    }

    handleSearch = (e) =>{
        let value = e.target.value;
        getAjax(`/plan/book/${value}`)
            .then(json =>{
                if(json.data.flag){
                    let dataArr = []
                    json.data.data.map((record,index) =>{
                        dataArr.push({
                            key: index,
                            id: record.id,
                            bookName: record.bookName,
                            bookDescription: record.bookDescription,
                            price: record.price,
                        });
                    })
                    this.setState({bookData: dataArr})
                }else{
                    message.error(json.data.message);
                }
            });
    }

    showModal = (record) => {
        this.setState({
            visible: true,
            entity:record,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.initTable();
    };


    handleDelete = (record) => {
        debugger
        deleteAjax(`/plan/book/${record.id}`)
            .then(json => {
                if (json.data.flag) {
                    let {bookData} = this.state;
                    let updatedBookData = bookData.filter((data) => data.id != record.id);
                    this.setState({bookData: updatedBookData});
                    message.success("删除成功！")
                }
            });
    }

    initTable = () =>{
        //加载数据
        getAjax('/plan/book')
            .then(json => {
                console.log(json)
                if (json.data.flag) {
                    let dataArr = [];
                    json.data.data.map((record, index) => {
                        dataArr.push({
                            key: index,
                            id: record.id,
                            bookName: record.bookName,
                            bookDescription: record.bookDescription,
                            price: record.price,
                        });
                    })
                    this.setState({bookData: dataArr})

                }

            });
    }


    // 初始化数据
    componentDidMount() {
           this.initTable();
    }

    render() {

        const columns1 = [
            {
                title: '名称',
                dataIndex: 'bookName',
                key: 'bookName',
            },
            {
                title: '描述',
                dataIndex: 'bookDescription',
                key: 'bookDescription',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '操作',
                dataIndex: 'buy',
                render: (text, record, index) => {
                    return <div>
                        <Button type="primary" onClick={() =>this.showModal(record)} >修改</Button> &nbsp;&nbsp;
                        <Button type="danger"> <a onClick={() => this.handleDelete(record)}>删除</a> </Button>
                    </div>
                }
            },
        ];

        const {bookData,entity} = this.state;

        return (
            <div>
                <Card bodyStyle={{padding: 20}} title='图书管理'>
                    <Row>
                        <Col xs={8} xl={4} > <Button shape="circle" icon="plus" onClick={this.showModal} /></Col>
                        <Col xs={120} xl={18}> <Search style={{width:'50%'}} placeholder="查询图书名称" onChange={this.handleSearch}  enterButton /></Col>
                    </Row>
                    <SmallTable  columns={columns1} dataSource={bookData}>
                    </SmallTable>
                </Card>

                <Modal
                    title='图书修改'
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    destroyOnClose={true}
                >
                    <div> <ModalContent handleCancel={this.handleCancel} data={entity} />  </div>
                </Modal>

            </div>
        )
    }
}


export default Page1
