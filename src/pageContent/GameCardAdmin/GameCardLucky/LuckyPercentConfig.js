import React,{Component} from 'react'
import {Row, Col, Select, Input, Progress, Affix, Button,message} from 'antd';
import PropTypes from "prop-types";
import {addAjax, getAjax} from "../../../util/ajax";
import SmallTable from "../../../components/Table/SmallTable";

const {Option} = Select;


class LuckyPercentConfig extends Component{

    static propTypes = {
        luckyEntity:PropTypes.object.isRequired,
    }

    state = {
        cardArrS:[],    // 所有的S卡片数组
        selectedCardS:[], // 选中的卡片S数组
        totalPercentS:[], // S卡片中的总概率数组
        countTotalPercentS:0, // 计算出总概率S

        cardArrA:[],    // 所有的A卡片数组
        selectedCardA:[], // 选中的卡片A数组
        totalPercentA:[], // A卡片中的总概率数组
        countTotalPercentA:0, // 计算出总概率

        cardArrB:[],    // 所有的B卡片数组
        selectedCardB:[], // 选中的卡片B数组
        totalPercentB:[], // B卡片中的总概率数组
        countTotalPercentB:0, // 计算出总概率B

        cardArrC:[],    // 所有的C卡片数组
        selectedCardC:[], // 选中的卡片C数组
        totalPercentC:[], // C卡片中的总概率数组
        countTotalPercentC:0, // 计算出总概率C

        cardArrD:[],    // 所有的D卡片数组
        selectedCardD:[], // 选中的卡片D数组
        totalPercentD:[], // D卡片中的总概率数组
        countTotalPercentD:0, // 计算出总概率D


        tableVisible:false,  // 生成预览的可见性
        dataSource:[],


    }
    //---------------------------SSSSSSSSSSSSSSSSSSSSSSSS-----------------------------------
    // 改变卡片S
    changeCardS =(value) =>{
        console.log(value);
        const {totalPercentS,cardArrS} = this.state
        // 应该放入从数据库查询到的实例类数组
       let newCardDataS =  cardArrS.filter((record,index) => value.indexOf(record.id) !== -1)
        let newTotalPercentS =this.commonGetTotalPercentArr(value,totalPercentS)
        this.setState({selectedCardS:newCardDataS,totalPercentS:newTotalPercentS});
        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentS:this.commonCountTotalPercent(newTotalPercentS)})
    }

    // 改变输入框S中的概率值
    changePercentS =(e,record) => {
        const inputPercent = e.target.value;
        console.log('输入框的值：', inputPercent, 'record为：', record)
        const {totalPercentS, selectedCardS} = this.state
        // 只有对象才能覆盖。。。
        const tempPercentS = totalPercentS.map((tempResult,index) =>{
            if(record.id === tempResult.id){
                return {id:record.id,percent:inputPercent}
            }else {
                return tempResult;
            }
        })
        this.setState({ totalPercentS:tempPercentS })

        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentS:this.commonCountTotalPercent(tempPercentS)})
    }
//-----------------------end:SSSSSSSSSSSSSSSSSSSSSSSS-----------------------------------


    //---------------------------AAAAAAAAAAAAAAAAAAAAAAAA-----------------------------------

    // 改变卡片A
    changeCardA =(value) =>{
        console.log(value);
        const {totalPercentA,cardArrA} = this.state
        // 应该放入从数据库查询到的实例类数组
        let newCardDataA =  cardArrA.filter((record,index) => value.indexOf(record.id) !== -1)
        let newTotalPercentA =this.commonGetTotalPercentArr(value,totalPercentA)
        this.setState({selectedCardA:newCardDataA,totalPercentA:newTotalPercentA});
        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentA:this.commonCountTotalPercent(newTotalPercentA)})
    }

    // 改变输入框A中的概率值
    changePercentA =(e,record) => {
        const inputPercent = e.target.value;
        console.log('输入框的值：', inputPercent, 'record为：', record)
        const {totalPercentA, selectedCardA} = this.state
        // 只有对象才能覆盖。。。
        const tempPercentA = totalPercentA.map((tempResult,index) =>{
            if(record.id === tempResult.id){
                return {id:record.id,percent:inputPercent}
            }else {
                return tempResult;
            }
        })
        this.setState({ totalPercentA:tempPercentA })

        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentA:this.commonCountTotalPercent(tempPercentA)})
    }

    //-----------------------end:AAAAAAAAAAAAAAAAAAAAAAAA-----------------------------------

    //---------------------------BBBBBBBBBBBBBBBBBBBBBBBB-----------------------------------

    // 改变卡片B
    changeCardB =(value) =>{
        console.log(value);
        const {totalPercentB,cardArrB} = this.state
        // 应该放入从数据库查询到的实例类数组
        let newCardDataB =  cardArrB.filter((record,index) => value.indexOf(record.id) !== -1)
        let newTotalPercentB =this.commonGetTotalPercentArr(value,totalPercentB)
        this.setState({selectedCardB:newCardDataB,totalPercentB:newTotalPercentB});
        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentB:this.commonCountTotalPercent(newTotalPercentB)})
    }

    // 改变输入框B中的概率值
    changePercentB =(e,record) => {
        const inputPercent = e.target.value;
        console.log('输入框的值：', inputPercent, 'record为：', record)
        const {totalPercentB, selectedCardB} = this.state
        // 只有对象才能覆盖。。。
        const tempPercentB = totalPercentB.map((tempResult,index) =>{
            if(record.id === tempResult.id){
                return {id:record.id,percent:inputPercent}
            }else {
                return tempResult;
            }
        })
        this.setState({ totalPercentB:tempPercentB })

        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentB:this.commonCountTotalPercent(tempPercentB)})
    }
    //-----------------------end:BBBBBBBBBBBBBBBBBBBBBBBB-----------------------------------

    //---------------------------CCCCCCCCCCCCCCCCCCCCCCCC-----------------------------------

    // 改变卡片C
    changeCardC =(value) =>{
        console.log(value);
        const {totalPercentC,cardArrC} = this.state
        // 应该放入从数据库查询到的实例类数组
        let newCardDataC =  cardArrC.filter((record,index) => value.indexOf(record.id) !== -1)
        let newTotalPercentC =this.commonGetTotalPercentArr(value,totalPercentC)
        this.setState({selectedCardC:newCardDataC,totalPercentC:newTotalPercentC});
        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentC:this.commonCountTotalPercent(newTotalPercentC)})
    }

    // 改变输入框C中的概率值
    changePercentC =(e,record) => {
        const inputPercent = e.target.value;
        console.log('输入框的值：', inputPercent, 'record为：', record)
        const {totalPercentC, selectedCardC} = this.state
        // 只有对象才能覆盖。。。
        const tempPercentC = totalPercentC.map((tempResult,index) =>{
            if(record.id === tempResult.id){
                return {id:record.id,percent:inputPercent}
            }else {
                return tempResult;
            }
        })
        this.setState({ totalPercentC:tempPercentC })

        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentC:this.commonCountTotalPercent(tempPercentC)})
    }
    //-----------------------end:CCCCCCCCCCCCCCCCCCCCCCCC-----------------------------------


    //---------------------------DDDDDDDDDDDDDDDDDDDDDDDD-----------------------------------
    // 改变卡片D
    changeCardD =(value) =>{
        console.log(value);
        const {totalPercentD,cardArrD} = this.state
        // 应该放入从数据库查询到的实例类数组
        let newCardDataD =  cardArrD.filter((record,index) => value.indexOf(record.id) !== -1)
        let newTotalPercentD =this.commonGetTotalPercentArr(value,totalPercentD)
        this.setState({selectedCardD:newCardDataD,totalPercentD:newTotalPercentD});
        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentD:this.commonCountTotalPercent(newTotalPercentD)})
    }

    // 改变输入框D中的概率值
    changePercentD =(e,record) => {
        const inputPercent = e.target.value;
        console.log('输入框的值：', inputPercent, 'record为：', record)
        const {totalPercentD, selectedCardD} = this.state
        // 只有对象才能覆盖。。。
        const tempPercentD = totalPercentD.map((tempResult,index) =>{
            if(record.id === tempResult.id){
                return {id:record.id,percent:inputPercent}
            }else {
                return tempResult;
            }
        })
        this.setState({ totalPercentD:tempPercentD })

        // 公共方法，在控制台输入概率总和
        this.setState({countTotalPercentD:this.commonCountTotalPercent(tempPercentD)})
    }

    //-----------------------end:DDDDDDDDDDDDDDDDDDDDDDDD-----------------------------------


    // ************公共方法***************

    commonCountTotalPercent =(totalPercent) =>{
        let tempPercent = 0;
        for(let i=0;i<totalPercent.length;i++){
            tempPercent+=totalPercent[i].percent*1;
        }
        console.log('总概率:',tempPercent);
        this.setState({tableVisible:false})
        return tempPercent
    }

    commonGetTotalPercentArr =(selectedArr,totalPercentArr) =>{
        let newTotalPercent =[]
        // 当改变卡片的时候，对于选中的内容，重新计算概率
        selectedArr.map((record) =>{
            const tempTotalPercent = totalPercentArr.filter((tempPercentReocrd,index) =>record === tempPercentReocrd.id)
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
            singleDataSource.key = record.id
            singleDataSource.star = record.topStar
            singleDataSource.cardType = record.type
            singleDataSource.type = luckyEntity.type
            singleDataSource.luckyId = luckyEntity.id
            singleDataSource.name = record.name
            tempEntity = totalPercent.filter(percentRecord =>percentRecord.id === record.id)
            singleDataSource.percent = tempEntity[0].percent*1
            dataSource.push(singleDataSource)
        })
        return dataSource
    }

    // ************end 公共方法***************

    //**********其他方法，生成预览，保存配置*********

    // 生成预览
    handlePreview =() =>{
        this.setState({tableVisible:true})
        const {selectedCardS,selectedCardA,selectedCardB,selectedCardC,selectedCardD}=this.state;
        const {totalPercentS,totalPercentA,totalPercentB,totalPercentC,totalPercentD}=this.state;

        let dataSource = []
        dataSource = this.commonGetDataSource(selectedCardS,totalPercentS,dataSource);
        dataSource = this.commonGetDataSource(selectedCardA,totalPercentA,dataSource);
        dataSource = this.commonGetDataSource(selectedCardB,totalPercentB,dataSource);
        dataSource = this.commonGetDataSource(selectedCardC,totalPercentC,dataSource);
        dataSource = this.commonGetDataSource(selectedCardD,totalPercentD,dataSource);
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
        const {countTotalPercentS,countTotalPercentA,countTotalPercentB,countTotalPercentC,countTotalPercentD} = this.state;
        const totalPercent = countTotalPercentA+countTotalPercentB+countTotalPercentC+countTotalPercentD+countTotalPercentS
        console.log('totalPercent',totalPercent)
        if(totalPercent!=100 ){
            message.error('请调整至100再保存配置！')
            return;
        }

        message.success('可以保存了')
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
            })

        // 解决一下问题  selectedCardS   cardArrS  countTotalPercentS
        getAjax(`/game/luckyConfig/last/${luckyEntity.id}`)
            .then(response =>{
                if(response.data.flag){
                    console.log('获取到的数据:',response.data.data);
                }else {
                    console.log('没有数据')
                }
            })
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
                width:'20%'
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
                width:'40%',
                render:text =><Progress percent={text}  status="active" />
            },
        ]

        const xsColStyle={ span: 16, offset: 6 }
        const mdColStyle1={ span: 8, offset: 6}
        const mdColStyle2={ span: 8, offset: 1 }


        //
        const {tableVisible,dataSource} = this.state
        console.log(dataSource)

        // 服务于S
        const {selectedCardS,countTotalPercentS,cardArrS} = this.state;
        const {selectedCardA,countTotalPercentA,cardArrA} = this.state;
        const {selectedCardB,countTotalPercentB,cardArrB} = this.state;
        const {selectedCardC,countTotalPercentC,cardArrC} = this.state;
        const {selectedCardD,countTotalPercentD,cardArrD} = this.state;

        console.log('selectedCardA',selectedCardA)
        console.log('cardArrA',cardArrA)

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

        const totalPercent = countTotalPercentA+countTotalPercentB+countTotalPercentC+countTotalPercentD+countTotalPercentS
        let status ='normal'
        if(totalPercent<0 || totalPercent>100){
            status = 'exception'
        }else if(totalPercent === 100){
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
                           <Col xs={6} md={6}>{luckyEntity.output}</Col>
                       </Row>
                           <Affix offsetTop={80}>
                               {
                                   totalPercent !== 0 &&
                               <Row>
                                   <Col xs={6} md={6}>概率总计：{totalPercent}%</Col>
                                   <Col xs={16} md={17}><Progress percent={totalPercent}   status={status} /></Col>
                               </Row>
                               }
                           </Affix>
                       <hr />
                       <Row >
                           <Row>
                               <Col xs={6} md={6} >本周S卡包：</Col>
                               <Col xs={16} md={17} >
                                   <Select mode="multiple"  style={{ width: '100%' }} placeholder='请选择本周的S卡' onChange={this.changeCardS} >
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
                                       let mdColStyle = mdColStyle1
                                       if(index %2 ==0){
                                           mdColStyle = mdColStyle1
                                       }else {
                                           mdColStyle = mdColStyle2
                                       }
                                       return  <Col xs={xsColStyle}  md={mdColStyle} key={record.id} >
                                           {record.name+`(${record.topStar}星)`}配置： <Input onChange={(e) => this.changePercentS(e,record)} type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                                       </Col>
                                   })
                               }
                           </Row>
                       </Row>
                       <hr />

                       <Row >
                           <Row>
                               <Col xs={6} md={6} >本周A卡包：</Col>
                               <Col xs={16} md={17} >
                                   <Select mode="multiple"  style={{ width: '100%' }} placeholder='请选择本周的A卡' onChange={this.changeCardA} >
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
                                       let mdColStyle = mdColStyle1
                                       if(index %2 ==0){
                                           mdColStyle = mdColStyle1
                                       }else {
                                           mdColStyle = mdColStyle2
                                       }
                                       return  <Col xs={xsColStyle}  md={mdColStyle} key={record.id} >
                                           {record.name+`(${record.topStar}星)`}配置： <Input onChange={(e) => this.changePercentA(e,record)} type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                                       </Col>
                                   })
                               }
                           </Row>
                       </Row>
                       <hr />

                       <Row >
                           <Row>
                               <Col xs={6} md={6} >本周B卡包：</Col>
                               <Col xs={16} md={17} >
                                   <Select mode="multiple"  style={{ width: '100%' }} placeholder='请选择本周的B卡' onChange={this.changeCardB} >
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
                                       let mdColStyle = mdColStyle1
                                       if(index %2 ==0){
                                           mdColStyle = mdColStyle1
                                       }else {
                                           mdColStyle = mdColStyle2
                                       }
                                       return  <Col xs={xsColStyle}  md={mdColStyle} key={record.id} >
                                           {record.name+`(${record.topStar}星)`}配置： <Input onChange={(e) => this.changePercentB(e,record)} type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                                       </Col>
                                   })
                               }
                           </Row>
                       </Row>
                       <hr />

                       <Row >
                           <Row>
                               <Col xs={6} md={6} >本周C卡包：</Col>
                               <Col xs={16} md={17} >
                                   <Select mode="multiple"  style={{ width: '100%' }} placeholder='请选择本周的C卡' onChange={this.changeCardC} >
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
                                       let mdColStyle = mdColStyle1
                                       if(index %2 ==0){
                                           mdColStyle = mdColStyle1
                                       }else {
                                           mdColStyle = mdColStyle2
                                       }
                                       return  <Col xs={xsColStyle}  md={mdColStyle} key={record.id} >
                                           {record.name+`(${record.topStar}星)`}配置： <Input onChange={(e) => this.changePercentC(e,record)} type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                                       </Col>
                                   })
                               }
                           </Row>
                       </Row>
                       <hr />

                       <Row >
                           <Row>
                               <Col xs={6} md={6} >本周D卡包：</Col>
                               <Col xs={16} md={17} >
                                   <Select mode="multiple"  style={{ width: '100%' }} placeholder='请选择本周的D卡' onChange={this.changeCardD} >
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
                                       let mdColStyle = mdColStyle1
                                        if(index %2 ==0){
                                           mdColStyle = mdColStyle1
                                       }else {
                                           mdColStyle = mdColStyle2
                                       }
                                       return  <Col xs={xsColStyle}  md={mdColStyle} key={record.id} >
                                               {record.name+`(${record.topStar}星)`}配置： <Input onChange={(e) => this.changePercentD(e,record)} type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                                       </Col>
                                   })
                               }
                           </Row>
                       </Row>
                       <hr />


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
                            <SmallTable rowKey='key' columns={columns} dataSource={dataSource} />
                        </div>
                    }
                </div>

            </div>
        )
    }
}

export default LuckyPercentConfig
