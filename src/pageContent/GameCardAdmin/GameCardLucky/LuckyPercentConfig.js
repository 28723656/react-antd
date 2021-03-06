import React,{Component} from 'react'
import {Row, Col, Select, Input, Progress, Affix, Button,message} from 'antd';
import PropTypes from "prop-types";
import {addAjax, getAjax} from "../../../util/ajax";
import SmallTable from "../../../components/Table/SmallTable";
import {GenIntegerId, GenNonDuplicateID} from "../../../util/randomUtil";

const {Option} = Select;


class LuckyPercentConfig extends Component{

    static propTypes = {
        luckyEntity:PropTypes.object.isRequired,
    }

    state = {
        cardArrS:[],    // 所有的S卡片数组
        selectedCardS:[], // 选中的卡片S数组
        percentArrS:[], // S卡片中的每一个选中的概率（id+percent）
        countTotalPercentS:0, // 计算出总概率S

        cardArrA:[],    // 所有的A卡片数组
        selectedCardA:[], // 选中的卡片A数组
        percentArrA:[], // A卡片中的每一个选中的概率（id+percent）
        countTotalPercentA:0, // 计算出总概率

        cardArrB:[],    // 所有的B卡片数组
        selectedCardB:[], // 选中的卡片B数组
        percentArrB:[], // B卡片中的每一个选中的概率（id+percent）
        countTotalPercentB:0, // 计算出总概率B

        cardArrC:[],    // 所有的C卡片数组
        selectedCardC:[], // 选中的卡片C数组
        percentArrC:[], // C卡片中的每一个选中的概率（id+percent）
        countTotalPercentC:0, // 计算出总概率C

        cardArrD:[],    // 所有的D卡片数组
        selectedCardD:[], // 选中的卡片D数组
        percentArrD:[], // D卡片中的每一个选中的概率（id+percent）
        countTotalPercentD:0, // 计算出总概率D


        tableVisible:false,  // 生成预览的可见性
        dataSource:[],


        // 下面用于加载金币、钻石、钥匙的列表
        coinArr:[],
        diamondArr:[],
        keyArr:[],

        selectedCoin:[],
        countTotalPercentCoin:0, // 总概率

        selectedDiamond:[],
        countTotalPercentDiamond:0,

        selectedKey:[],
        countTotalPercentKey:0,



    }
    //---------------------------SSSSSSSSSSSSSSSSSSSSSSSS-----------------------------------
    // 改变卡片S
    changeCardS =(value) =>{
        console.log(value);
        const {percentArrS,cardArrS} = this.state
        // 应该放入从数据库查询到的实例类数组
       let newCardDataS =  cardArrS.filter((record,index) => value.indexOf(record.id) !== -1)
        let newTotalPercentS =this.commonGetTotalPercentArr(value,percentArrS)
        this.setState({selectedCardS:newCardDataS,percentArrS:newTotalPercentS});
        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentS:this.commonCountTotalPercent(newTotalPercentS)})
    }

    // 改变输入框S中的概率值
    changePercentS =(e,record) => {
        const inputPercent = e.target.value;
        console.log('输入框的值：', inputPercent, 'record为：', record)
        const {percentArrS, selectedCardS} = this.state
        // 只有对象才能覆盖。。。
        const tempPercentS = percentArrS.map((tempResult,index) =>{
            if(record.id === tempResult.id){
                return {id:record.id,percent:inputPercent}
            }else {
                return tempResult;
            }
        })
        this.setState({ percentArrS:tempPercentS})

        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentS:this.commonCountTotalPercent(tempPercentS)})
    }
//-----------------------end:SSSSSSSSSSSSSSSSSSSSSSSS-----------------------------------


    //---------------------------AAAAAAAAAAAAAAAAAAAAAAAA-----------------------------------

    // 改变卡片A
    changeCardA =(value) =>{
        console.log("我执行了--------------AAAAAAA----changeCardA");
        const {percentArrA,cardArrA} = this.state
        // 应该放入从数据库查询到的实例类数组
        let newCardDataA =  cardArrA.filter((record,index) => value.indexOf(record.id) !== -1)
        let newTotalPercentA =this.commonGetTotalPercentArr(value,percentArrA)
        this.setState({selectedCardA:newCardDataA,percentArrA:newTotalPercentA});
        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentA:this.commonCountTotalPercent(newTotalPercentA)})
    }

    // 改变输入框A中的概率值
    changePercentA =(e,record) => {
        console.log("我执行了--------------AAAAAAA----changePercentA");
        const inputPercent = e.target.value;
        console.log('输入框的值：', inputPercent, 'record为：', record)
        const {percentArrA, selectedCardA} = this.state
        // 只有对象才能覆盖。。。
        const tempPercentA = percentArrA.map((tempResult,index) =>{
            if(record.id === tempResult.id){
                return {id:record.id,percent:inputPercent}
            }else {
                return tempResult;
            }
        })
        console.log("新的percentArrA:",tempPercentA)
        this.setState({ percentArrA:tempPercentA })

        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentA:this.commonCountTotalPercent(tempPercentA)})
    }

    //-----------------------end:AAAAAAAAAAAAAAAAAAAAAAAA-----------------------------------

    //---------------------------BBBBBBBBBBBBBBBBBBBBBBBB-----------------------------------

    // 改变卡片B
    changeCardB =(value) =>{
        console.log(value);
        const {percentArrB,cardArrB} = this.state
        // 应该放入从数据库查询到的实例类数组
        let newCardDataB =  cardArrB.filter((record,index) => value.indexOf(record.id) !== -1)
        let newTotalPercentB =this.commonGetTotalPercentArr(value,percentArrB)
        this.setState({selectedCardB:newCardDataB,percentArrB:newTotalPercentB});
        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentB:this.commonCountTotalPercent(newTotalPercentB)})
    }

    // 改变输入框B中的概率值
    changePercentB =(e,record) => {
        const inputPercent = e.target.value;
        console.log('输入框的值：', inputPercent, 'record为：', record)
        const {percentArrB, selectedCardB} = this.state
        // 只有对象才能覆盖。。。
        const tempPercentB = percentArrB.map((tempResult,index) =>{
            if(record.id === tempResult.id){
                return {id:record.id,percent:inputPercent}
            }else {
                return tempResult;
            }
        })
        this.setState({ percentArrB:tempPercentB })

        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentB:this.commonCountTotalPercent(tempPercentB)})
    }
    //-----------------------end:BBBBBBBBBBBBBBBBBBBBBBBB-----------------------------------

    //---------------------------CCCCCCCCCCCCCCCCCCCCCCCC-----------------------------------

    // 改变卡片C
    changeCardC =(value) =>{
        console.log(value);
        const {percentArrC,cardArrC} = this.state
        // 应该放入从数据库查询到的实例类数组
        let newCardDataC =  cardArrC.filter((record,index) => value.indexOf(record.id) !== -1)
        let newTotalPercentC =this.commonGetTotalPercentArr(value,percentArrC)
        this.setState({selectedCardC:newCardDataC,percentArrC:newTotalPercentC});
        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentC:this.commonCountTotalPercent(newTotalPercentC)})
    }

    // 改变输入框C中的概率值
    changePercentC =(e,record) => {
        const inputPercent = e.target.value;
        console.log('输入框的值：', inputPercent, 'record为：', record)
        const {percentArrC, selectedCardC} = this.state
        // 只有对象才能覆盖。。。
        const tempPercentC = percentArrC.map((tempResult,index) =>{
            if(record.id === tempResult.id){
                return {id:record.id,percent:inputPercent}
            }else {
                return tempResult;
            }
        })
        this.setState({ percentArrC:tempPercentC })

        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentC:this.commonCountTotalPercent(tempPercentC)})
    }
    //-----------------------end:CCCCCCCCCCCCCCCCCCCCCCCC-----------------------------------


    //---------------------------DDDDDDDDDDDDDDDDDDDDDDDD-----------------------------------
    // 改变卡片D
    changeCardD =(value) =>{
        console.log(value);
        const {percentArrD,cardArrD} = this.state
        // 应该放入从数据库查询到的实例类数组
        let newCardDataD =  cardArrD.filter((record,index) => value.indexOf(record.id) !== -1)
        let newTotalPercentD =this.commonGetTotalPercentArr(value,percentArrD)
        this.setState({selectedCardD:newCardDataD,percentArrD:newTotalPercentD});
        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentD:this.commonCountTotalPercent(newTotalPercentD)})
    }

    // 改变输入框D中的概率值
    changePercentD =(e,record) => {
        const inputPercent = e.target.value;
        console.log('输入框的值：', inputPercent, 'record为：', record)
        const {percentArrD, selectedCardD} = this.state
        // 只有对象才能覆盖。。。
        const tempPercentD = percentArrD.map((tempResult,index) =>{
            if(record.id === tempResult.id){
                return {id:record.id,percent:inputPercent}
            }else {
                return tempResult;
            }
        })
        this.setState({ percentArrD:tempPercentD })

        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentD:this.commonCountTotalPercent(tempPercentD)})
    }

    //-----------------------end:DDDDDDDDDDDDDDDDDDDDDDDD-----------------------------------

    // 改变金币配置
    changeCardCoin =(value) =>{
        const {selectedCoin,countTotalPercentCoin} = this.state;
        const finalResult = value.map(record => {
            let temp = selectedCoin.filter(record2 => record2.rewardNum === record)
            if(temp.length > 0){
                return temp[0]
            }else {
                return {percent:'',rewardNum:record}
            }
        })
        this.setState({selectedCoin:finalResult.sort(this.commonSort),countTotalPercentCoin:this.commonCountTotalPercent(finalResult)});

    }

    // 改变金币下面的输入框
    changePercentCoin =(e,rewardNum) =>{
        const inputValue = e.target.value
        const {selectedCoin,countTotalPercentCoin} = this.state;
        // 这里又是直接给对象赋值，进而改变数组
        selectedCoin.map(record =>{
            if(record.rewardNum === rewardNum){
                record.percent = inputValue
            }
        })
        this.setState({selectedCoin,countTotalPercentCoin:this.commonCountTotalPercent(selectedCoin)});
    }

    // 改变钻石配置
    changeCardDiamond =(value) =>{
        const {selectedDiamond,countTotalPercentDiamond} = this.state;
        const finalResult = value.map(record => {
            let temp = selectedDiamond.filter(record2 => record2.rewardNum === record)
            if(temp.length > 0){
                return temp[0]
            }else {
                return {percent:'',rewardNum:record}
            }
        })
        this.setState({selectedDiamond:finalResult.sort(this.commonSort),countTotalPercentDiamond:this.commonCountTotalPercent(finalResult)});

    }

    // 改变钻石下面的输入框
    changePercentDiamond =(e,rewardNum) =>{
        const inputValue = e.target.value
        const {selectedDiamond,countTotalPercentDiamond} = this.state;
        // 这里又是直接给对象赋值，进而改变数组
        selectedDiamond.map(record =>{
            if(record.rewardNum === rewardNum){
                record.percent = inputValue
            }
        })
        this.setState({selectedDiamond,countTotalPercentDiamond:this.commonCountTotalPercent(selectedDiamond)});
    }

    // 改变钥匙配置
    changeCardKey =(value) =>{
        const {selectedKey,countTotalPercentKey} = this.state;
        const finalResult = value.map(record => {
            let temp = selectedKey.filter(record2 => record2.rewardNum === record)
            if(temp.length > 0){
                return temp[0]
            }else {
                return {percent:'',rewardNum:record}
            }
        })
        this.setState({selectedKey:finalResult.sort(this.commonSort),countTotalPercentKey:this.commonCountTotalPercent(finalResult)});

    }

    // 改变钥匙下面的输入框
    changePercentKey =(e,rewardNum) =>{
        const inputValue = e.target.value
        const {selectedKey,countTotalPercentKey} = this.state;
        // 这里又是直接给对象赋值，进而改变数组
        selectedKey.map(record =>{
            if(record.rewardNum === rewardNum){
                record.percent = inputValue
            }
        })
        this.setState({selectedKey,countTotalPercentKey:this.commonCountTotalPercent(selectedKey)});
    }

    // ************公共方法***************

    commonSort =(a,b) =>{
        return a.rewardNum -b.rewardNum;
    }

    commonGetRewardTypeArr =(finalResult,rewardType) =>{
       const tempResult = finalResult.filter(record =>record.rewardType === rewardType)
        return tempResult.map(record =>{
            return {percent:record.percent,rewardNum:record.rewardNum}
        })
    }

    commonCountTotalPercent =(totalPercent) =>{
        let tempPercent = 0;
        for(let i=0;i<totalPercent.length;i++){
            tempPercent+=totalPercent[i].percent*1;
        }
        console.log('总概率:',tempPercent);
        this.setState({tableVisible:false})
        return tempPercent
    }

    commonGetTotalPercentArr =(selectedArr,percentArrArr) =>{
        let newTotalPercent =[]
        // 当改变卡片的时候，对于选中的内容，重新计算概率
        selectedArr.map((record) =>{
            const tempTotalPercent = percentArrArr.filter((tempPercentReocrd,index) =>record === tempPercentReocrd.id)
            if(tempTotalPercent.length === 0){
                newTotalPercent.push({id:record,percent:0});
            }else {
                newTotalPercent.push(...tempTotalPercent);
            }
        })
        console.log('新的对象：',newTotalPercent)
        return newTotalPercent;
    }
    // 组装成DataSource,好直接传入后台
    commonGetDataSource = (selectedCard,totalPercent,dataSource) =>{
        const {luckyEntity} = this.props
        selectedCard.map((record,index) =>{
            let singleDataSource ={}
            let tempEntity =[]
            singleDataSource.cardId = record.id
            tempEntity = totalPercent.filter(percentRecord =>percentRecord.id === record.id)
            singleDataSource.percent = tempEntity[0].percent*1
            singleDataSource.cardType = record.type
            singleDataSource.luckyId = luckyEntity.id
            singleDataSource.rewardType = 4
            singleDataSource.type = luckyEntity.type
            singleDataSource.key = GenNonDuplicateID()
            singleDataSource.star = record.topStar
            singleDataSource.name = record.name
            dataSource.push(singleDataSource)
        })
        return dataSource
    }

    // 组装成DataSource,好直接传入后台
    commonGetDataSource2 = (selectedMoney,rewardType,dataSource) =>{
        const {luckyEntity} = this.props
        selectedMoney.map((record,index) =>{
            let singleDataSource ={}
            singleDataSource.percent =record.percent*1
            singleDataSource.luckyId = luckyEntity.id
            singleDataSource.rewardNum = record.rewardNum
            singleDataSource.rewardType = rewardType
            singleDataSource.type = luckyEntity.type
            singleDataSource.key = GenNonDuplicateID()
            dataSource.push(singleDataSource)
        })
        return dataSource
    }

    // 给两个数组，进行比较，找出交集部分
    commonGetCommon= (wantedResult,allResult) =>{
        return wantedResult .filter(record =>{
                const tempResult =allResult.filter(record2 => record2.cardId === record.id)
                if(tempResult.length ===0){
                    return false
                }
                return record.id === tempResult[0].cardId
            }
        )
    }

    // 把一个数组属性转化为另一个（临时用的）
    commonTranslateTo(finalResult,type){
        const tempPercentArr = finalResult.filter(record =>record.cardType ===type)
        let finalPercentArr =[]
        if(tempPercentArr.length > 0){
            tempPercentArr.map(record2 => {
                finalPercentArr.push({id:record2.cardId,percent:record2.percent})
            })
        }
        return finalPercentArr;
    }

    // 也是一个临时的,为了空值判断
    commonCompareArr=(percentArr,record) =>{
        const tempPercent = percentArr.filter(recordSelf => recordSelf.id === record.id)
        let percentValue = 0;
        if(tempPercent.length > 0){
            percentValue = tempPercent[0].percent;
        }
        return percentValue;
    }

    // ************end 公共方法***************

    //**********其他方法，生成预览，保存配置*********

    // 生成预览
    handlePreview =() =>{
        console.log('预览界面执行-----------')
        this.setState({tableVisible:true})
        const {selectedCardS,selectedCardA,selectedCardB,selectedCardC,selectedCardD}=this.state;
        const {percentArrS,percentArrA,percentArrB,percentArrC,percentArrD}=this.state;
        const {selectedCoin,selectedDiamond,selectedKey} = this.state;

        let dataSource = []
        dataSource = this.commonGetDataSource(selectedCardS,percentArrS,dataSource);
        dataSource = this.commonGetDataSource(selectedCardA,percentArrA,dataSource);
        dataSource = this.commonGetDataSource(selectedCardB,percentArrB,dataSource);
        dataSource = this.commonGetDataSource(selectedCardC,percentArrC,dataSource);
        dataSource = this.commonGetDataSource(selectedCardD,percentArrD,dataSource);
        dataSource = this.commonGetDataSource2(selectedCoin,1,dataSource);
        dataSource = this.commonGetDataSource2(selectedDiamond,2,dataSource);
        dataSource = this.commonGetDataSource2(selectedKey,3,dataSource);
        this.setState({dataSource})
    }

    // 保存配置
    handleSaveConfig =() =>{

        // 没有生成预览
        const {tableVisible,dataSource} = this.state;
        if(!tableVisible){
            message.error('请先生成预览！')
            return;
        }
        // 没有达到100%
        const {countTotalPercentS,countTotalPercentA,countTotalPercentB,countTotalPercentC,countTotalPercentD,countTotalPercentCoin,countTotalPercentDiamond,countTotalPercentKey} = this.state;
        const totalPercent = countTotalPercentA+countTotalPercentB+countTotalPercentC+countTotalPercentD+countTotalPercentS+countTotalPercentCoin+countTotalPercentDiamond+countTotalPercentKey
        console.log('totalPercent',totalPercent)
        if(totalPercent< 99.9999 || totalPercent > 100.0001 ){
            message.error('请调整至100再保存配置！')
            return;
        }

        addAjax(`/game/luckyConfig`,dataSource)
            .then(response =>{
                if(response.data.flag){
                    message.success('保存成功');
                }else {
                    message.error('保存失败')
                }
            })


    }


    //**********end其他方法，生成预览，保存配置*********

    // 初始化卡包数据
    initCardData =() =>{

        const {luckyEntity} = this.props;

        // 初始化卡片数据
        getAjax('/game/card')
            .then(response =>{
               const result = response.data.data;
               const tempCardS = result.filter(record =>record.type === 'S');
               const tempCardA = result.filter(record =>record.type === 'A');
               const tempCardB = result.filter(record =>record.type === 'B');
               const tempCardC = result.filter(record =>record.type === 'C');
               const tempCardD = result.filter(record =>record.type === 'D');
               this.setState({
                   cardArrS:tempCardS,
                   cardArrA:tempCardA,
                   cardArrB:tempCardB,
                   cardArrC:tempCardC,
                   cardArrD:tempCardD,
               })

                // 解决一下问题  selectedCardS   countTotalPercentS
                getAjax(`/game/luckyConfig/last/${luckyEntity.id}`)
                    .then(response2 =>{
                        const result2 = response2.data
                        if(result2.flag){
                            const finalResult = result2.data;
                            console.log('获取到的数据:',finalResult)
                            let selectedCardS=[] ,selectedCardA=[],selectedCardB=[],selectedCardC=[],selectedCardD=[]
                            selectedCardS = this.commonGetCommon(tempCardS,finalResult);
                            selectedCardA = this.commonGetCommon(tempCardA,finalResult);
                            selectedCardB = this.commonGetCommon(tempCardB,finalResult);
                            selectedCardC = this.commonGetCommon(tempCardC,finalResult);
                            selectedCardD = this.commonGetCommon(tempCardD,finalResult);
                            this.setState({selectedCardS,selectedCardA,selectedCardB,selectedCardC,selectedCardD})

                            const selectedCoin =this.commonGetRewardTypeArr(finalResult,1)
                            const selectedDiamond =this.commonGetRewardTypeArr(finalResult,2)
                            const selectedKey = this.commonGetRewardTypeArr(finalResult,3)

                            this.setState({selectedCoin})
                            this.setState({selectedDiamond})
                            this.setState({selectedKey})


                            this.setState({countTotalPercentS:this.commonCountTotalPercent(finalResult.filter(record =>record.cardType ==='S'))})
                            this.setState({countTotalPercentA:this.commonCountTotalPercent(finalResult.filter(record =>record.cardType ==='A'))})
                            this.setState({countTotalPercentB:this.commonCountTotalPercent(finalResult.filter(record =>record.cardType ==='B'))})
                            this.setState({countTotalPercentC:this.commonCountTotalPercent(finalResult.filter(record =>record.cardType ==='C'))})
                            this.setState({countTotalPercentD:this.commonCountTotalPercent(finalResult.filter(record =>record.cardType ==='D'))})

                            this.setState({countTotalPercentCoin:this.commonCountTotalPercent(selectedCoin)});
                            this.setState({countTotalPercentDiamond:this.commonCountTotalPercent(selectedDiamond)});
                            this.setState({countTotalPercentKey:this.commonCountTotalPercent(selectedKey)});

                            this.setState({percentArrS:this.commonTranslateTo(finalResult,'S')})
                            this.setState({percentArrA:this.commonTranslateTo(finalResult,'A')})
                            this.setState({percentArrB:this.commonTranslateTo(finalResult,'B')})
                            this.setState({percentArrC:this.commonTranslateTo(finalResult,'C')})
                            this.setState({percentArrD:this.commonTranslateTo(finalResult,'D')})

                        }

                    })

            })

        // 初始化金币钻石钥匙数据
       getAjax(`/plan/dict/percent_coin`).then(response =>this.setState({coinArr:response.data.data}))
       getAjax(`/plan/dict/percent_diamond`).then(response =>this.setState({diamondArr:response.data.data}))
       getAjax(`/plan/dict/percent_key`).then(response =>this.setState({keyArr:response.data.data}))

    }

    // 初始化所有卡包的数据
    componentDidMount() {
        this.initCardData();
    }

    render() {

        const columns =[
            {
                title:'卡片',
                dataIndex:'name',
                width:'15%'
            },

            {
                title:'星级',
                dataIndex:'star',
                width:'20%',
                render:text =>{
                    let starNums = ''
                    for(let i=0;i<text;i++){
                        starNums+='★'
                    }
                    return starNums;
                }
            },

            {
                title:'类型',
                dataIndex:'type',
                width:'20%',
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
                title:'概率',
                dataIndex:'percent',
                align:'center',
                render:text =><Progress percent={text}  status="active" />
            },
        ]
        const columns2 =[
            {
                title:'货币类型',
                dataIndex:'rewardType',
                width:'15%',
                render: text =>{
                    if(text === 1){
                        return '金币'
                    }else if(text === 2){
                        return '钻石'
                    }else if(text === 3){
                        return '钥匙'
                    }else {
                        return '不明物体'
                    }
                }
            },

            {
                title:'数量',
                dataIndex:'rewardNum',
                width:'20%',
            },

            {
                title:'类型',
                dataIndex:'type',
                width:'20%',
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
                title:'概率',
                dataIndex:'percent',
                align:'center',
                render:text =><Progress percent={text}  status="active" />
            },
        ]


        const xsColStyle={ span: 16, offset: 6 }
        const mdColStyle1={ span: 8, offset: 6}
        const mdColStyle2={ span: 8, offset: 1 }


        //
        const {tableVisible,dataSource} = this.state
        //console.log(dataSource)

        // 金币钻石key
        const {coinArr,diamondArr,keyArr} = this.state;
        const {selectedCoin,countTotalPercentCoin} = this.state;
        const {selectedDiamond,countTotalPercentDiamond} = this.state;
        const {selectedKey,countTotalPercentKey} = this.state;

        // 服务于S
        const {selectedCardS,countTotalPercentS,cardArrS,percentArrS} = this.state;
        const {selectedCardA,countTotalPercentA,cardArrA,percentArrA} = this.state;
        const {selectedCardB,countTotalPercentB,cardArrB,percentArrB} = this.state;
        const {selectedCardC,countTotalPercentC,cardArrC,percentArrC} = this.state;
        const {selectedCardD,countTotalPercentD,cardArrD,percentArrD} = this.state;

        const {luckyEntity} = this.props;
        let luckyType = '暂无显示'

        if(luckyEntity.type === 1){
            luckyType ='免费卡包'
        }else if(luckyEntity.type ===2){
            luckyType ='普通卡包'
        }else if(luckyEntity.type === 3){
            luckyType ='高级卡包'
        }else if(luckyEntity.type ===4){
            luckyType ='至尊卡包'
        }

        const output = luckyEntity.output;

        const totalPercent = countTotalPercentA+countTotalPercentB+countTotalPercentC+countTotalPercentD+countTotalPercentS+countTotalPercentCoin+countTotalPercentDiamond+countTotalPercentKey
        let status ='normal'
        if(totalPercent<0 || totalPercent>100.0001){
            status = 'exception'
        }else if(totalPercent>=99.9999 && totalPercent <= 100.0001){
            status = 'success'
        }else {
            status = 'normal'
        }

        return (
            <div>
                   <div>
                       <Row>
                           <Col xs={6} md={6}>卡片说明：</Col>
                           <Col xs={6} md={6}>{luckyType}</Col>
                           <Col xs={6} md={6}>{output}</Col>
                       </Row>
                               {
                                   totalPercent !== 0 &&
                                   <Affix offsetTop={80}>
                                   <Row>
                                       <Col xs={6} md={6}>概率总计：{totalPercent}%</Col>
                                       <Col xs={16} md={17}><Progress percent={totalPercent}   status={status} /></Col>
                                   </Row>
                                   </Affix>
                               }
                       <hr />

                       {
                           output.indexOf('S') !== -1 &&
                               <div>
                                   <Row >
                                       <Row>
                                           <Col xs={6} md={6} >本周S卡包：</Col>
                                           <Col xs={16} md={17} >
                                               <Select mode="multiple" value={selectedCardS.map(record =>record.id)}  style={{ width: '100%' }} placeholder='请选择本周的S卡' onChange={this.changeCardS} >
                                                   {
                                                       cardArrS &&cardArrS.length > 0 &&  cardArrS.map(record =>
                                                           <Option key={record.id} value={record.id}>{record.name+`(${record.topStar}星)`}</Option>
                                                       )
                                                   }
                                               </Select>
                                           </Col>
                                       </Row>


                                       <Row>
                                           {
                                               selectedCardS && selectedCardS.length > 0 && <Col xs={{span:17,offset:6}} md={{span:17,offset:6}}>概率总计:<Progress percent={countTotalPercentS} size="small" status="active" /></Col>
                                           }
                                           {
                                               selectedCardS && selectedCardS.map((record,index) =>{
                                                   let percentValue = this.commonCompareArr(percentArrS,record)

                                                   let mdColStyle = mdColStyle1
                                                   if(index %2 ==0){
                                                       mdColStyle = mdColStyle1
                                                   }else {
                                                       mdColStyle = mdColStyle2
                                                   }
                                                   return  <Col xs={xsColStyle}  md={mdColStyle} key={record.id} >
                                                       {record.name+`(${record.topStar}星)`}配置： <Input value={percentValue} onChange={(e) => this.changePercentS(e,record)} type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                                                   </Col>
                                               })
                                           }
                                       </Row>
                                   </Row>
                                   <hr />
                               </div>
                       }

                       {
                           output.indexOf('A') !== -1 &&
                               <div>
                                   <Row >
                                       <Row>
                                           <Col xs={6} md={6} >本周A卡包：</Col>
                                           <Col xs={16} md={17} >
                                               <Select mode="multiple" value={selectedCardA.map(record =>record.id)}  style={{ width: '100%' }} placeholder='请选择本周的A卡' onChange={this.changeCardA} >
                                                   {
                                                       cardArrA &&cardArrA.length > 0 &&  cardArrA.map(record =>
                                                           <Option key={record.id} value={record.id}>{record.name+`(${record.topStar}星)`}</Option>
                                                       )
                                                   }
                                               </Select>
                                           </Col>
                                       </Row>


                                       <Row>
                                           {
                                               selectedCardA && selectedCardA.length > 0 && <Col xs={{span:17,offset:6}} md={{span:17,offset:6}}>概率总计:<Progress percent={countTotalPercentA} size="small" status="active" /></Col>
                                           }
                                           {
                                               selectedCardA && selectedCardA.map((record,index) =>{
                                                   let percentValue = this.commonCompareArr(percentArrA,record)

                                                   let mdColStyle = mdColStyle1
                                                   if(index %2 ==0){
                                                       mdColStyle = mdColStyle1
                                                   }else {
                                                       mdColStyle = mdColStyle2
                                                   }
                                                   return  <Col xs={xsColStyle}  md={mdColStyle} key={record.id} >
                                                       {record.name+`(${record.topStar}星)`}配置： <Input value={percentValue}  onChange={(e) => this.changePercentA(e,record)} type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                                                   </Col>
                                               })
                                           }
                                       </Row>
                                   </Row>
                                   <hr />
                               </div>
                       }

                       {
                           output.indexOf('B') !== -1 &&
                           <div>
                               <Row >
                                   <Row>
                                       <Col xs={6} md={6} >本周B卡包：</Col>
                                       <Col xs={16} md={17} >
                                           <Select mode="multiple" value={selectedCardB.map(record =>record.id)}  style={{ width: '100%' }} placeholder='请选择本周的B卡' onChange={this.changeCardB} >
                                               {
                                                   cardArrB &&cardArrB.length > 0 &&  cardArrB.map(record =>
                                                       <Option key={record.id} value={record.id}>{record.name+`(${record.topStar}星)`}</Option>
                                                   )
                                               }
                                           </Select>
                                       </Col>
                                   </Row>


                                   <Row>
                                       {
                                           selectedCardB && selectedCardB.length > 0 && <Col xs={{span:17,offset:6}} md={{span:17,offset:6}}>概率总计:<Progress percent={countTotalPercentB} size="small" status="active" /></Col>
                                       }
                                       {
                                           selectedCardB && selectedCardB.map((record,index) =>{
                                               let percentValue = this.commonCompareArr(percentArrB,record)

                                               let mdColStyle = mdColStyle1
                                               if(index %2 ==0){
                                                   mdColStyle = mdColStyle1
                                               }else {
                                                   mdColStyle = mdColStyle2
                                               }
                                               return  <Col xs={xsColStyle}  md={mdColStyle} key={record.id} >
                                                   {record.name+`(${record.topStar}星)`}配置： <Input value={percentValue} onChange={(e) => this.changePercentB(e,record)} type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                                               </Col>
                                           })
                                       }
                                   </Row>
                               </Row>
                               <hr />
                           </div>
                       }

                       {
                           output.indexOf('C') !== -1 &&
                           <div>
                               <Row >
                                   <Row>
                                       <Col xs={6} md={6} >本周C卡包：</Col>
                                       <Col xs={16} md={17} >
                                           <Select mode="multiple" value={selectedCardC.map(record =>record.id)}  style={{ width: '100%' }} placeholder='请选择本周的C卡' onChange={this.changeCardC} >
                                               {
                                                   cardArrC &&cardArrC.length > 0 &&  cardArrC.map(record =>
                                                       <Option key={record.id} value={record.id}>{record.name+`(${record.topStar}星)`}</Option>
                                                   )
                                               }
                                           </Select>
                                       </Col>
                                   </Row>


                                   <Row>
                                       {
                                           selectedCardC && selectedCardC.length > 0 && <Col xs={{span:17,offset:6}} md={{span:17,offset:6}}>概率总计:<Progress percent={countTotalPercentC} size="small" status="active" /></Col>
                                       }
                                       {
                                           selectedCardC && selectedCardC.map((record,index) =>{
                                               let percentValue = this.commonCompareArr(percentArrC,record)

                                               let mdColStyle = mdColStyle1
                                               if(index %2 ==0){
                                                   mdColStyle = mdColStyle1
                                               }else {
                                                   mdColStyle = mdColStyle2
                                               }
                                               return  <Col xs={xsColStyle}  md={mdColStyle} key={record.id} >
                                                   {record.name+`(${record.topStar}星)`}配置： <Input value={percentValue} onChange={(e) => this.changePercentC(e,record)} type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                                               </Col>
                                           })
                                       }
                                   </Row>
                               </Row>
                               <hr />
                           </div>
                       }

                       {
                           output.indexOf('D') !== -1 &&
                           <div>
                               <Row >
                                   <Row>
                                       <Col xs={6} md={6} >本周D卡包：</Col>
                                       <Col xs={16} md={17} >
                                           <Select mode="multiple" value={selectedCardD.map(record =>record.id)}  style={{ width: '100%' }} placeholder='请选择本周的D卡' onChange={this.changeCardD} >
                                               {
                                                   cardArrD &&cardArrD.length > 0 &&  cardArrD.map(record =>
                                                       <Option key={record.id} value={record.id}>{record.name+`(${record.topStar}星)`}</Option>
                                                   )
                                               }
                                           </Select>
                                       </Col>
                                   </Row>


                                   <Row>
                                       {
                                           selectedCardD && selectedCardD.length > 0 && <Col xs={{span:17,offset:6}} md={{span:17,offset:6}}>概率总计:<Progress percent={countTotalPercentD} size="small" status="active" /></Col>
                                       }
                                       {
                                           selectedCardD && selectedCardD.map((record,index) =>{
                                               let percentValue = this.commonCompareArr(percentArrD,record)

                                               let mdColStyle = mdColStyle1
                                               if(index %2 ==0){
                                                   mdColStyle = mdColStyle1
                                               }else {
                                                   mdColStyle = mdColStyle2
                                               }
                                               return  <Col xs={xsColStyle}  md={mdColStyle} key={record.id} >
                                                   {record.name+`(${record.topStar}星)`}配置： <Input value={percentValue} onChange={(e) => this.changePercentD(e,record)} type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                                               </Col>
                                           })
                                       }
                                   </Row>
                               </Row>
                               <hr />
                           </div>
                       }
                            {/*金币配置*/}
                       <div>
                           <Row >
                               <Row>
                                   <Col xs={6} md={6} >金币配置：</Col>
                                   <Col xs={16} md={17} >
                                       <Select mode="multiple" value={selectedCoin.map(coinRecord => coinRecord.rewardNum*1)}   style={{ width: '100%' }} placeholder='请选择本周的金币' onChange={this.changeCardCoin} >
                                           {
                                               coinArr &&coinArr.length > 0 &&  coinArr.map(record =>
                                                   <Option key={record.id} value={record.name*1}>{record.name+`个`}</Option>
                                               )
                                           }
                                       </Select>
                                   </Col>
                               </Row>


                               <Row>
                                   {
                                       selectedCoin && selectedCoin.length > 0 && <Col xs={{span:17,offset:6}} md={{span:17,offset:6}}>概率总计:<Progress percent={countTotalPercentCoin} size="small" status="active" /></Col>
                                   }
                                   {
                                       selectedCoin && selectedCoin.map((record,index) =>{
                                       //    let percentValue = this.commonCompareArr(percentArrD,record)

                                           let mdColStyle = mdColStyle1
                                           if(index %2 ==0){
                                               mdColStyle = mdColStyle1
                                           }else {
                                               mdColStyle = mdColStyle2
                                           }
                                           return  <Col xs={xsColStyle}  md={mdColStyle} key={record.rewardNum} >
                                               {`${record.rewardNum}个`}配置： <Input value={record.percent} onChange={e =>this.changePercentCoin(e,record.rewardNum)}  type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                                           </Col>
                                       })
                                   }
                               </Row>
                           </Row>
                           <hr />
                       </div>

                       {/*钻石配置*/}
                       <div>
                           <Row >
                               <Row>
                                   <Col xs={6} md={6} >钻石配置：</Col>
                                   <Col xs={16} md={17} >
                                       <Select mode="multiple" value={selectedDiamond.map(diamondRecord => diamondRecord.rewardNum*1)}   style={{ width: '100%' }} placeholder='请选择本周的金币' onChange={this.changeCardDiamond} >
                                           {
                                               diamondArr &&diamondArr.length > 0 &&  diamondArr.map(record =>
                                                   <Option key={record.id} value={record.name*1}>{record.name+`个`}</Option>
                                               )
                                           }
                                       </Select>
                                   </Col>
                               </Row>


                               <Row>
                                   {
                                       selectedDiamond && selectedDiamond.length > 0 && <Col xs={{span:17,offset:6}} md={{span:17,offset:6}}>概率总计:<Progress percent={countTotalPercentDiamond} size="small" status="active" /></Col>
                                   }
                                   {
                                       selectedDiamond && selectedDiamond.map((record,index) =>{
                                           //    let percentValue = this.commonCompareArr(percentArrD,record)

                                           let mdColStyle = mdColStyle1
                                           if(index %2 ==0){
                                               mdColStyle = mdColStyle1
                                           }else {
                                               mdColStyle = mdColStyle2
                                           }
                                           return  <Col xs={xsColStyle}  md={mdColStyle} key={record.rewardNum} >
                                               {`${record.rewardNum}个`}配置： <Input value={record.percent} onChange={e =>this.changePercentDiamond(e,record.rewardNum)}  type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                                           </Col>
                                       })
                                   }
                               </Row>
                           </Row>
                           <hr />
                       </div>

                       {/*钥匙配置*/}
                       <div>
                           <Row >
                               <Row>
                                   <Col xs={6} md={6} >钥匙配置：</Col>
                                   <Col xs={16} md={17} >
                                       <Select mode="multiple" value={selectedKey.map(keyRecord => keyRecord.rewardNum*1)}   style={{ width: '100%' }} placeholder='请选择本周的金币' onChange={this.changeCardKey} >
                                           {
                                               keyArr &&keyArr.length > 0 &&  keyArr.map(record =>
                                                   <Option key={record.id} value={record.name*1}>{record.name+`个`}</Option>
                                               )
                                           }
                                       </Select>
                                   </Col>
                               </Row>


                               <Row>
                                   {
                                       selectedKey && selectedKey.length > 0 && <Col xs={{span:17,offset:6}} md={{span:17,offset:6}}>概率总计:<Progress percent={countTotalPercentKey} size="small" status="active" /></Col>
                                   }
                                   {
                                       selectedKey && selectedKey.map((record,index) =>{
                                           //    let percentValue = this.commonCompareArr(percentArrD,record)

                                           let mdColStyle = mdColStyle1
                                           if(index %2 ==0){
                                               mdColStyle = mdColStyle1
                                           }else {
                                               mdColStyle = mdColStyle2
                                           }
                                           return  <Col xs={xsColStyle}  md={mdColStyle} key={record.rewardNum} >
                                               {`${record.rewardNum}个`}配置： <Input value={record.percent} onChange={e =>this.changePercentKey(e,record.rewardNum)}  type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                                           </Col>
                                       })
                                   }
                               </Row>
                           </Row>
                           <hr />
                       </div>

                   </div>
                <div>
                    <Row gutter={50}>
                        <Col xs={{offset:5, span:4}} md={{offset:5, span:4}} >
                            <Button onClick={this.handlePreview} type="primary">
                                生成预览
                            </Button>
                        </Col>
                        <Col xs={{offset:2, span:4}} md={{offset:2, span:4}}>
                            <Button loading={false} onClick={this.handleSaveConfig} type="primary">
                                保存配置
                            </Button>
                        </Col>
                    </Row>
                </div>


                <div>
                    {
                        tableVisible && <div>
                            <hr/>
                            <SmallTable rowKey='key' columns={columns} dataSource={dataSource.filter(record =>record.rewardType === 4)} />
                            <SmallTable rowKey='key' columns={columns2} dataSource={dataSource.filter(record =>record.rewardType !== 4)} />
                        </div>
                    }
                </div>

            </div>
        )
    }
}

export default LuckyPercentConfig
