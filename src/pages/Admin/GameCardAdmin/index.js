import React, {Component} from 'react'
import {Button, message, Tabs} from "antd";
import SmallTable from "../../../components/Table/SmallTable";
import Test001 from "../../Test001"
import {deleteAjax, getAjax} from "../../../util/ajax";
import LuckyPercentConfig from "../../../pageContent/GameCardAdmin/GameCardLucky/LuckyPercentConfig";
import UpdateGameCardModal from "../../../pageContent/GameCardAdmin/GameCard/UpdateGameCardModal";
import UpdateGameCardStarModal from "../../../pageContent/GameCardAdmin/GameCard/UpdateGameCardStarModal";
import SureToDeleteModal from "../../../pageContent/GameCardAdmin/GameCard/SureToDeleteModal";
import LuckyUpdateModal from "../../../pageContent/GameCardAdmin/GameCardLucky/LuckyUpdateModal";

const {TabPane} = Tabs;

class GameCardAdmin extends Component {

    state = {
        visibleStar: false, // 星级
        visibleRank: false, // 等级
        visibleCard: false, // 卡片 *
        activeKey: '1', // 默认显示第一个标签页面
        cardEntity: {},  // 修改选择的一个卡片实体 *
        cardTitle: "添加卡片",// 添加卡片还是修改卡片

        cardData: [],// 卡片数据
        starData: [], // 单个卡片升星数据
        starArr: [], // 卡片星级，cardEntity中显示有几星就重复几个星级属性

        // 删除的一些属性
        deleteVisible:false, // 删除确认框是否可见
        deletePassword:'',   //删除的时候的口令
        deleteUrl:'',    // 删除的时候的请求
        initMethod:function () {},   // 删除的方法

        // 抽奖部分
        luckyData:[],//抽奖数据
        luckyTitle:'修改抽奖',  // 模态框标题
        visibleLucky:false,  // 模态框可见性
        luckyEntity:{},  // 单个抽奖数据
        visibleLuckyConfig:false, // 概率配置模态框

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

    // 模态框，【星级管理】点击取消
    handleStarCancel = e => {
        this.setState({ visibleStar: false}); };

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
        if (value !== '3'|| value !=='4') {
            this.setState({
                visibleRank: false,
                visibleLuckyConfig:false,
                activeKey: value
            })
        }
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
        this.setState({deleteVisible:true,deleteUrl:`/game/card/${record.id}`,initMethod:this.initCardData});
    }

    // 卡片取消
    handleCardCancel = () => {
        this.setState({
            visibleCard: false,
            cardEntity: {},
        });
    }

    // 初始化数据
    initCardData = () => {
        getAjax('/game/card')
            .then(response => {
                this.setState({cardData: response.data.data})
            })
    }

    // 隐藏删除模态框
    handleDeleteCancel =() =>{
        this.setState({deleteVisible:false,deletePassword:''})
    }
    handleDeletePasswordChange =(value) =>{
        this.setState({deletePassword:value});
    }

    // 初始化抽奖的数据
    initLuckyData =()=>{
        getAjax('/game/lucky')
            .then(response =>{
                if(response.data.flag){
                    this.setState({luckyData:response.data.data})
                }else {
                    message.error("请检查网络连接");
                }
            })
    }

    // 修改抽奖数据
    updateLucky =(record) =>{
        // 有值，修改
        if(record.id){
            this.setState({visibleLucky:true,luckyEntity:record,luckyTitle:'修改抽奖'});
        }else {
            this.setState({visibleLucky:true,luckyEntity:{},luckyTitle:'添加抽奖'});
        }

    }

    // 删除抽奖大分类
    deleteLucky =(record ) =>{
        this.setState({deleteVisible:true,deleteUrl:`/game/lucky/${record.id}`,initMethod:this.initLuckyData});
    }

    // 取消标签
    handleLuckyCancel =() =>{
        this.setState({visibleLucky:false})
    }

    // 打开概率配置表模态框
    showLuckyConfigModal = (record) => {
        this.setState(
            {
                visibleLuckyConfig: true,
                luckyEntity: record,
                activeKey:'4',
            }
        )
    }

    // --------------------------end:抽奖的事件管理------------------------------
    // 初始化数据
    componentDidMount() {
        this.initCardData();
        this.initLuckyData();
    }

    render() {

        const cardColumns = [
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
                align:'center',
            },
            {
                title: '卡片技能',
                dataIndex: 'skill',
                render: (text) =>{
                    if(text === 1){
                        return '金币加成'
                    }else if(text === 2){
                        return '经验加成'
                    }else if(text === 3){
                        return '免费抽卡加成'
                    }
                }
            },
            {
                title: '修改数据',
                width:'25%',
                align:'center',
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
        const luckyColumns = [
            {
                title: '类型',
                dataIndex: 'type',
                render: (text) =>{
                    if(text ===1 ){
                        return '免费卡包'
                    }else if(text ===2 ){
                        return '普通卡包'
                    }else if(text ===3 ){
                        return '高级卡包'
                    }else if(text ===4 ){
                        return '至尊卡包'
                    }
                }
            },
            {
                title: '产出',
                dataIndex: 'output',
                align:'center',
                render:(text) =>{
                    const outputArr = text.split('')
                    return outputArr.map((record,index) =>{
                        if(outputArr.length-1 === index){
                            return record
                        }else {
                            return record+'、'
                        }
                    })
                }
            },
            {
                title: '单次花费',
                dataIndex: 'onceCost',
                render: (text, record) =>{
                    if(record.costType ===1){
                        return text+' 💰'
                    }else if(record.costType ===2){
                        return text+' 💎'
                    }else if(record.costType ===3){
                        return text+' 🔑'
                    }
                }
            },
            {
                title: '10次花费',
                dataIndex: 'tenTimesCost',
                render: (text, record) =>{
                    if(record.costType ===1){
                        return text+' 💰'
                    }else if(record.costType ===2){
                        return text+' 💎'
                    }else if(record.costType ===3){
                        return text+' 🔑'
                    }
                }
            },
            {
                title: '修改数据',
                render: (text,record) => {
                    return <div>
                        <a onClick={() =>this.updateLucky(record)} >修改</a>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <a onClick={() =>this.deleteLucky(record)} >删除</a>
                    </div>
                }
            },

            {
                title: '概率配置',
                render: (text,record) => {
                    return <a onClick={() =>this.showLuckyConfigModal(record)} >编辑</a>
                }
            },
        ]

        const {activeKey, visibleRank, visibleCard, cardEntity, cardTitle, cardData, starData,starArr,visibleStar,deletePassword,deleteUrl,initMethod} = this.state
        const {luckyData,luckyTitle,visibleLucky,luckyEntity,visibleLuckyConfig,deleteVisible} = this.state;

        return (
            <Tabs activeKey={activeKey} onChange={this.changeTabs}>
                <TabPane tab="卡片管理" key="1">
                    <Button type='primary' onClick={this.updateCard}>+添加卡片</Button>
                    <SmallTable columns={cardColumns} dataSource={cardData}/>
                    <UpdateGameCardModal cardEntity={cardEntity} initCardData={this.initCardData} visibleCard={visibleCard} cardTitle={cardTitle} handleCardCancel={this.handleCardCancel} />
                    <UpdateGameCardStarModal visibleStar={visibleStar} cardEntity={cardEntity} handleStarCancel={this.handleStarCancel} starArr={starArr} starData={starData} />
                    <SureToDeleteModal deleteVisible={deleteVisible} handleDeleteCancel={this.handleDeleteCancel} deleteUrl={deleteUrl} initMethod={initMethod} deletePassword={deletePassword} handleDeletePasswordChange={this.handleDeletePasswordChange}/>
                </TabPane>
                <TabPane tab="抽奖管理" key="2">
                    <Button type='primary' onClick={this.updateLucky}>+添加抽奖</Button>
                   <SmallTable columns={luckyColumns} dataSource={luckyData}/>
                   <LuckyUpdateModal luckyTitle={luckyTitle} visibleLucky={visibleLucky} initLuckyData={this.initLuckyData}  handleLuckyCancel={this.handleLuckyCancel} luckyEntity={luckyEntity} />
                </TabPane>

                {visibleRank &&
                <TabPane tab="等级管理(临时)" key="3">
                    <Test001 cardEntity={cardEntity}></Test001>
                </TabPane>
                }

                {visibleLuckyConfig &&
                <TabPane tab="概率配置(临时)" key="4">
                    <LuckyPercentConfig luckyEntity={luckyEntity}/>
                </TabPane>
                }


            </Tabs>
        )
    }
}

export default GameCardAdmin
