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
                    this.setState({bookData: json.data.data})
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
                    this.setState({bookData: json.data.data})
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
                title: '姓名',
                dataIndex: 'bookName',
                key: 'bookName',
            },
            {
                title: '电话',
                dataIndex: 'bookDescription',
                key: 'bookDescription',
            },
            {
                title: '学号',
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
        console.log('bookData',bookData,'entity',entity.id)
        let title = entity.id === undefined?"新增":"修改";

        return (
            <div>
                <Card bodyStyle={{padding: 20}} title='数据库大作业'>
                    <Row>
                        <Col xs={8} xl={4} > <Button shape="circle" icon="plus" onClick={this.showModal} /></Col>
                        <Col xs={120} xl={18}> <Search style={{width:'50%'}} placeholder="" onChange={this.handleSearch}  enterButton /></Col>
                    </Row>
                    <SmallTable   columns={columns1} dataSource={bookData}>
                    </SmallTable>
                </Card>

                <Modal
                    title={title}
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
