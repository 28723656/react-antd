import React,{Component} from 'react'
import {Row, Col, Select, Input,Progress } from 'antd';
import PropTypes from "prop-types";

const {Option} = Select;

const cardDataA = [
    {
        id:1,
        name:'A1',
    },
    {
        id:2,
        name:'A2',
    },
    {
        id:3,
        name:'A3',
    },
    {
        id:4,
        name:'A4',
    },
    {
        id:5,
        name:'A5',
    },
]

class LuckyPercentConfig extends Component{

    static propTypes = {
        luckyEntity:PropTypes.object.isRequired,
    }

    state = {
        cardA:[], // 选中的卡片A数组
        totalPercentA:[], // A卡片中的总概率数组
        countTotalPercentA:0, // 计算出总概率
    }

    // 改变卡片A
    changeCardA =(value) =>{
        console.log(value);
        const {totalPercentA} = this.state
        // 应该放入从数据库查询到的实例类数组
       let newCardDataA =  cardDataA.filter((record,index) => value.indexOf(record.id) !== -1)

       let newTotalPercentA =[]
        // 当改变卡片的时候，对于选中的内容，重新计算概率
        value.map((record) =>{
          const tempTotalPercentA = totalPercentA.filter((tempPercentReocrd,index) =>record === tempPercentReocrd.id)
            if(tempTotalPercentA.length === 0){
                newTotalPercentA.push({id:record,percent:0});
            }else {
                newTotalPercentA.push(...tempTotalPercentA);
            }
        })
        console.log('新的对象：',newTotalPercentA)
        this.setState({cardA:newCardDataA,totalPercentA:newTotalPercentA});

        // 公共方法，在控制台输入概率总和
        this.commonCountTotalPercent(newTotalPercentA);


    }

    // 改变输入框A中的概率值
    changePercentA =(e,record) => {
        const inputPercent = e.target.value;
        console.log('输入框的值：', inputPercent, 'record为：', record)
        const {totalPercentA, cardA} = this.state

        // ****这里有问题***** 头晕了，只有对象才能覆盖。。。
        const tempPercentA = totalPercentA.map((tempResult,index) =>{
            if(record.id === tempResult.id){
                return {id:record.id,percent:inputPercent}
            }else {
                return tempResult;
            }
        })
        this.setState({ totalPercentA:tempPercentA })

        // 公共方法，在控制台输入概率总和
        this.commonCountTotalPercent(tempPercentA);

    }

    // ************公共方法***************

    commonCountTotalPercent =(totalPercent) =>{
        let tempPercent = 0;
        for(let i=0;i<totalPercent.length;i++){
            tempPercent+=totalPercent[i].percent*1;
        }
        console.log('总概率:',tempPercent);
        this.setState({countTotalPercentA:tempPercent})
    }

    // ************end 公共方法***************


    render() {

        const xsColStyle={ span: 16, offset: 6 }
        const mdColStyle1={ span: 8, offset: 6}
        const mdColStyle2={ span: 8, offset: 1 }



        const {cardA,countTotalPercentA} = this.state;
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

        return (
            <div>
                   <div>
                       <Row gutter={20}>
                           <Col xs={6} md={6}>当前配置：</Col>
                           <Col xs={6} md={4}>{luckyType}</Col>
                           <Col xs={6} md={4}>{luckyEntity.output}</Col>
                       </Row>
                       <hr />

                       <Row >
                           <Row>
                               <Col xs={6} md={6} >本周S卡包：</Col>
                               <Col xs={16} md={17} >
                                   <Select mode="multiple"  style={{ width: '100%' }} placeholder='请选择本周的S卡' >
                                       <Option value={101}>S1卡</Option>
                                       <Option value={102}>S2卡</Option>
                                       <Option value={103}>S3卡</Option>
                                       <Option value={104}>S4卡</Option>
                                       <Option value={105}>S5卡</Option>
                                   </Select>
                               </Col>
                           </Row>

                           <Row>
                               <Col xs={16} offset={6} md={8} >
                                   S1卡配置： <Input type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                               </Col>
                           </Row>

                       </Row>
                       <hr />

                       <Row >
                           <Row>
                               <Col xs={6} md={6} >本周A卡包：</Col>
                               <Col xs={16} md={17} >
                                   <Select mode="multiple"  style={{ width: '100%' }} placeholder='请选择本周的A卡' onChange={this.changeCardA} >
                                       <Option value={1}>A1卡(3星 已选1次)</Option>
                                       <Option value={2}>A2卡(3星 已选0次)</Option>
                                       <Option value={3}>A3卡(3星 已选0次)</Option>
                                       <Option value={4}>A4卡(4星 已选0次)</Option>
                                       <Option value={5}>A5卡(5星 已选0次)</Option>
                                   </Select>
                               </Col>
                           </Row>


                           <Row>
                               {
                                   cardA && cardA.length > 0 && <Col xs={{span:17,offset:6}} md={{span:17,offset:6}}>概率总计:<Progress percent={countTotalPercentA} size="small" status="active" /></Col>
                               }
                               {
                                   cardA && cardA.map((record,index) =>{
                                       let mdColStyle = mdColStyle1
                                        if(index %2 ==0){
                                           mdColStyle = mdColStyle1
                                       }else {
                                           mdColStyle = mdColStyle2
                                       }
                                       return  <Col xs={xsColStyle}  md={mdColStyle} key={record.id} >
                                               {record.name}配置： <Input onChange={(e) => this.changePercentA(e,record)} type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
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
                                   <Select mode="multiple"  style={{ width: '100%' }} placeholder='请选择本周的B卡' >
                                       <Option value={81}>B1卡</Option>
                                       <Option value={82}>B2卡</Option>
                                       <Option value={83}>B3卡</Option>
                                       <Option value={84}>B4卡</Option>
                                       <Option value={85}>B5卡</Option>
                                       <Option value={86}>B6卡</Option>
                                   </Select>
                               </Col>
                           </Row>

                           <Row>
                               <Col xs={xsColStyle}  md={mdColStyle1} >
                                   B1卡配置： <Input type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                               </Col>
                               <Col  xs={xsColStyle}  md={mdColStyle2} >
                                   B2卡配置： <Input type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                               </Col>
                               <Col  xs={xsColStyle}  md={mdColStyle1} >
                                   B3卡配置： <Input type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                               </Col>
                           </Row>

                       </Row>
                       <hr />

                       <Row >
                           <Row>
                               <Col xs={6} md={6} >本周C卡包：</Col>
                               <Col xs={16} md={17} >
                                   <Select mode="multiple"  style={{ width: '100%' }} placeholder='请选择本周的C卡' >
                                       <Option value={81}>C1卡</Option>
                                       <Option value={82}>C2卡</Option>
                                       <Option value={83}>C3卡</Option>
                                       <Option value={84}>C4卡</Option>
                                       <Option value={85}>C5卡</Option>
                                       <Option value={86}>C6卡</Option>
                                   </Select>
                               </Col>
                           </Row>

                           <Row>
                               <Col  xs={xsColStyle}  md={mdColStyle1} >
                                   C1卡配置： <Input type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                               </Col>
                               <Col   xs={xsColStyle}  md={mdColStyle2} >
                                   C2卡配置： <Input type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                               </Col>
                               <Col  xs={xsColStyle}  md={mdColStyle1} >
                                   C3卡配置： <Input type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                               </Col>
                               <Col  xs={xsColStyle}  md={mdColStyle2} >
                                   C4卡配置： <Input type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                               </Col>
                           </Row>

                       </Row>
                       <hr />

                       <Row >
                           <Row>
                               <Col xs={6} md={6} >本周D卡包：</Col>
                               <Col xs={16} md={17} >
                                   <Select mode="multiple"  style={{ width: '100%' }} placeholder='请选择本周的D卡' >
                                       <Option value={81}>D1卡</Option>
                                       <Option value={82}>D2卡</Option>
                                       <Option value={83}>D3卡</Option>
                                       <Option value={84}>D4卡</Option>
                                       <Option value={85}>D5卡</Option>
                                       <Option value={86}>D6卡</Option>
                                   </Select>
                               </Col>
                           </Row>

                           <Row>
                               <Col  xs={xsColStyle}  md={mdColStyle1} >
                                   D1卡配置： <Input type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                               </Col>
                               <Col  xs={xsColStyle}  md={mdColStyle2} >
                                   D2卡配置： <Input type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                               </Col>
                               <Col  xs={xsColStyle}  md={mdColStyle1} >
                                   D3卡配置： <Input type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                               </Col>
                               <Col  xs={xsColStyle}  md={mdColStyle2} >
                                   D4卡配置： <Input type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                               </Col>
                               <Col  xs={xsColStyle}  md={mdColStyle1} >
                                   D5卡配置： <Input type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                               </Col>
                               <Col  xs={xsColStyle}  md={mdColStyle2} >
                                   D6卡配置： <Input type='number' addonBefore='概率:' addonAfter='%' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率' />
                               </Col>
                           </Row>

                       </Row>
                       <hr />


                   </div>
            </div>
        )
    }
}

export default LuckyPercentConfig
