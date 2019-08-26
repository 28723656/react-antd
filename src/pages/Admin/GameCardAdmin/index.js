import React, {Component} from 'react'
import {Tabs, Card, Row, Col, Button, Avatar, Table, Modal, Form, Input, Icon, Checkbox, Select} from "antd";
import SmallTable from "../../../components/Table/SmallTable";
import Test001 from "../../Test001"
import {addAjax, getAjax, updateAjax} from "../../../util/ajax";

const {TabPane} = Tabs;
const {Option} = Select
const {TextArea} = Input;

const gridStyle = {
    width: '50%',
    textAlign: 'center',
    padding: '5px'
};

const marginStyle = {
    marginBottom: '6px'
}


class GameCardAdminForm extends Component {


    state = {
        visibleStar: false, // 星级
        visibleRank: false, // 等级
        visibleCard: false, // 卡片
        activeKey: '1', // 默认显示第一个标签页面
        cardEntity: {},  // 修改选择的一个卡片实体
        cardTitle: "添加卡片",// 添加卡片还是修改卡片

        cardData: [],// 卡片数据
        starData: [], // 单个卡片升星数据
        starArr: [], // 卡片星级，cardEntity中显示有几星就重复几个星级属性
    };

    // 模态框，打开【星级管理】模态框
    showStarModal = (record) => {
        const topStar = record.topStar
        const starArr = []
        for (let i = 1; i <= topStar; i++ ){
            starArr.push(i)
        }


        // 获取升星数据
        getAjax(`/game/upgrade/${record.id}`)
            .then(response => {
                this.setState({
                    starData: response.data.data,
                    cardEntity: record,
                    visibleStar: true,
                    starArr
                });
            })


    };

    // 模态框，【星级管理】点击确定,修改升星的一些东西
    handleStarOk = e => {
        console.log(e);
        this.setState({
            visibleStar: false,
        });

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                updateAjax(`/game/upgrade`,values);
            }
        });
    };

    // 模态框，【星级管理】点击取消
    handleStarCancel = e => {
        console.log(e);
        this.setState({
            visibleStar: false,
        });
    };

    // 模态框，打开【等级管理】模态框
    showRankModal = (record) => {
        this.setState({
            visibleRank: true,
            activeKey: '3',
            cardEntity:record,
        });
    };

    // 改变tab页面
    changeTabs = (value) => {
        if (value !== '3') {
            this.setState({
                visibleRank: false,
                activeKey: value
            })
        }
    }

    // 升级卡片
    updateCard = () => {
        console.log('升级了卡片')
    }

    // 开箱一次
    openOne = () => {
        console.log('开一次')
    }
    // 开箱10次
    openTen = () => {
        console.log('开10次')
    }

    // 查看概率
    showPercent = () => {
        console.log('查看概率')
    }

    // 修改或者添加卡片信息
    updateCard = (record) => {
        // 有值，修改卡片
        if (record.id) {
            console.log('修改卡片', record)
            this.setState({
                visibleCard: true,
                cardEntity: record,
                cardTitle: '修改卡片',
            })
        } else {
            // 没有值，添加卡片
            console.log('添加卡片', record)
            this.setState({
                visibleCard: true,
                cardEntity: {},
                cardTitle: '添加卡片',
            })
        }

    }

    // 删除卡片
    deleteCard = (record) => {
        console.log("删除卡片涉及到很多东西，等下再做")
    }

    // 卡片ok
    handleCardOk = (e) => {
        console.log(e);
        this.setState({
            visibleCard: false,
            cardEntity: {},
        });

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // 如果有id,就是修改
                if (values.id) {
                    updateAjax('/game/card', values)
                        .then(response => {
                            this.initCardData();
                        })
                } else {
                    // 没有就是插入
                    addAjax('/game/card', values)
                        .then(response => {
                            this.initCardData();
                        })
                }
            }
        });
    }

    // 卡片取消
    handleCardCancel = (e) => {
        console.log(e);
        this.setState({
            visibleCard: false,
            cardEntity: {},
        });
    }


    updateCardStar = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    // 初始化数据
    initCardData = () => {
        getAjax('/game/card')
            .then(response => {
                this.setState({cardData: response.data.data})
            })
    }

    // 初始化数据
    componentDidMount() {
        this.initCardData();
    }

    render() {

        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
            },
            {
                title: '类型',
                dataIndex: 'type',
            },
            {
                title: '昵称',
                dataIndex: 'nickName',
            },
            {
                title: '最高星级',
                dataIndex: 'topStar',
            },
            {
                title: '修改数据',
                render: (text, record) => {
                    return <div>
                        <a onClick={() => this.updateCard(record)}>修改</a>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <a onClick={() => this.deleteCard(record)}>删除</a>
                    </div>
                }
            },
            {
                title: '星级管理',
                render: (text, record) => {
                    return <a onClick={() => this.showStarModal(record)}>编辑</a>
                }
            },
            {
                title: '等级管理',
                render: (text,record) => {
                    return <a onClick={() =>this.showRankModal(record)}>编辑</a>
                }
            },
        ]

        const {getFieldDecorator} = this.props.form;

        const {activeKey, visibleRank, visibleCard, cardEntity, cardTitle, cardData, starData,starArr} = this.state

        return (
            <Tabs activeKey={activeKey} onChange={this.changeTabs}>
                <TabPane tab="卡片管理" key="1">
                    <Button type='primary' onClick={this.updateCard}>+添加卡片</Button>
                    <SmallTable columns={columns} dataSource={cardData}/>

                    <Modal
                        title={cardTitle}
                        visible={visibleCard}
                        onOk={this.handleCardOk}
                        onCancel={this.handleCardCancel}
                    >
                        <Form onSubmit={this.updateCard}>
                            <Row gutter={5}>
                                <Col xs={12}>
                                    {getFieldDecorator('id', {initialValue: cardEntity.id || null})(
                                        <Input hidden={true}/>,
                                    )}
                                    <Form.Item label="名称">
                                        {getFieldDecorator('name', {initialValue: cardEntity.name || 'D'})(
                                            <Input/>,
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col xs={12}>
                                    <Form.Item label="类型">
                                        {getFieldDecorator('type', {initialValue: cardEntity.type || 'D'})(
                                            <Select>
                                                <Option value="S">S级</Option>
                                                <Option value="A">A级</Option>
                                                <Option value="B">B级</Option>
                                                <Option value="C">C级</Option>
                                                <Option value="D">D级</Option>
                                            </Select>,
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col xs={12}>
                                    <Form.Item label="昵称">
                                        {getFieldDecorator('nickName', {initialValue: cardEntity.nickName || 'D级卡片'})(
                                            <Input/>,
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col xs={12}>
                                    <Form.Item label="最高星级">
                                        {getFieldDecorator('topStar', {initialValue: cardEntity.topStar || 3})(
                                            <Select>
                                                <Option value={1}>1星</Option>
                                                <Option value={2}>2星</Option>
                                                <Option value={3}>3星</Option>
                                                <Option value={4}>4星</Option>
                                                <Option value={5}>5星</Option>
                                                <Option value={6}>6星</Option>
                                                <Option value={7}>7星</Option>
                                                <Option value={8}>8星</Option>
                                                <Option value={9}>9星</Option>
                                                <Option value={10}>10星</Option>
                                            </Select>,
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col xs={24}>
                                    <Form.Item label="描述">
                                        {getFieldDecorator('description', {initialValue: cardEntity.description || '这是D级卡片'})(
                                            <TextArea rows={3}></TextArea>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>

                    <Modal
                        title="升星管理"
                        visible={this.state.visibleStar}
                        onOk={this.handleStarOk}
                        onCancel={this.handleStarCancel}
                    >
                        <Form onSubmit={this.updateCardStar}>
                            <Row gutter={5}>
                                {getFieldDecorator('id', {initialValue: cardEntity.id || null})(
                                    <Input hidden={true}/>,
                                )}

                                {
                                    starArr.map((value, index) =>{
                                        const label = value + '星'
                                        const starName = 'star' + value
                                        let initialValue = starData.filter((record) =>record.star === value)
                                        if(initialValue[0] !== undefined){
                                            initialValue = initialValue[0].num ;
                                        }else {
                                            initialValue =''
                                        }
                                        return <Col xs={8} key={index}>
                                            <Form.Item label={label}>
                                                {getFieldDecorator(starName, {initialValue:initialValue || '' })(
                                                    <Input suffix="张"/>,
                                                )}
                                            </Form.Item>
                                        </Col>
                                    })
                                }
                            </Row>
                        </Form>
                    </Modal>

                </TabPane>
                <TabPane tab="抽奖管理" key="2">
                    <h1>随便表示一下</h1>
                </TabPane>

                {visibleRank &&
                <TabPane tab="等级管理(临时)" key="3">
                    <Test001 cardEntity={cardEntity}></Test001>
                </TabPane>
                }


            </Tabs>
        )
    }
}

const GameCardAdmin = Form.create({name: 'game_card'})(GameCardAdminForm);

export default GameCardAdmin
