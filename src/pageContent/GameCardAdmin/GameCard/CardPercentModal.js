import React, {Component} from 'react'
import {Select, Row, Col, Input, Button, Progress,message} from 'antd';
import PropTypes from "prop-types";
import SmallTable from "../../../components/Table/SmallTable";
import {addAjax, getAjax} from "../../../util/ajax";

const {Option} = Select

class CardPercentModal extends Component{

    static propTypes = {
        cardEntity:PropTypes.object.isRequired,
    }

    state = {

        tableVisible:false,
        percentArr:[],  // 选中的对象数组
        allNumsArr: [], // 所有的可选框
    }

    // 生成预览
    handlePreview =() =>{
        this.setState({tableVisible:true})

    }

    // 保存数据
    handleSaveConfig =() =>{
       const {percentArr} = this.state;
       const totalPercent = this.commonGetTotalPercent(percentArr);
       if(totalPercent>=99.9999 && totalPercent <= 100.0001){
            const {cardEntity} = this.props;
           percentArr.map(record =>{
               record.cardId = cardEntity.id
               return record
           })
           console.log('要保送出去的值：',percentArr);
           addAjax(`/game/percent`,percentArr)
               .then(response =>{
                   if(response.data.flag){
                       message.success('保存成功')
                   }else {
                       message.error('保存失败')
                   }
               })
       }else {
           message.error('调整概率至100')
           return
       }
    }

    // 改变输入框的值
    changePercent =(e,record)=>{
        const inputValue = e.target.value
        const {percentArr} = this.state;
        // 基础思路： 动了那个输入框，我先把那个输入框的对象给删除掉，然后重新生成一个对象放入数组
        record.percent = inputValue
        let tempPercentArr = percentArr.filter(entity => entity.nums !== record.nums)
        this.setState({percentArr:[...tempPercentArr,record].sort(this.commonSortArr)})
    }

    // 改变选择框
    changeSelect =(value) =>{
        console.log(value)
        const {percentArr} = this.state;
        let newPercentArr = []
        value.map(record =>{
           const sameOne =  percentArr.filter(percentRecord => percentRecord.nums === record)
            console.log('相同的值',sameOne)
            if(sameOne.length === 0){
                newPercentArr.push({nums:record,percent:''})
            }else {
                newPercentArr.push(...sameOne)
            }
        })
        this.setState({percentArr:newPercentArr.sort(this.commonSortArr)})
    }

    // ***********公共方法************
    // 获取总概率
    commonGetTotalPercent = (percentArr) =>{
        let totalPercent = 0;
        console.log('percentArr',percentArr)
        percentArr && percentArr.map(record =>totalPercent+= record.percent*1);
        return totalPercent;
    }

    // 排序
    commonSortArr =(a,b) =>{
        return a.nums-b.nums;
    }

    // 初始化数据
    initData =() =>{
        const {cardEntity} = this.props
        // 从字典表加载数据
        getAjax(`/plan/dict/percent_nums`)
            .then(response =>{
                    if(response.data.flag){
                        let result = response.data.data;
                       const allNumsArr = result.map(record =>record.name*1)
                        this.setState({allNumsArr})
                    }else {
                        message.warning('没有数据')
                    }
                }
            )

        // 获取配置数据
        getAjax(`/game/percent/${cardEntity.id}`)
            .then(response =>{
                if(response.data.flag){
                    const   result = response.data.data;
                    let percentArr = result.map(record2 => {
                        return {nums:record2.nums,percent:record2.percent}
                    })
                    this.setState({percentArr});
                }
            })


    }

    componentDidMount() {
        this.initData();
    }

    render() {
        const {cardEntity} = this.props
        const {tableVisible,allNumsArr,percentArr} = this.state
        const totalPercent = this.commonGetTotalPercent(percentArr);

        const columns =[
            {
                title:"数量",
                dataIndex:'nums',
            },
            {
                title:"概率",
                dataIndex:'percent',
                render:text =><Progress percent={text*1}  status="active" />
            },

        ]

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
               <Row>
                   <Col span={6}>当前卡片：</Col>
                   <Col span={4}>{cardEntity.name}</Col>
                   <Col span={4}>{cardEntity.type}</Col>
               </Row>
                <hr/>
                <Row>
                    <Col span={6}>总概率：</Col>
                    <Col span={18}><Progress percent={totalPercent}  status={status} /></Col>
                </Row>
                <hr/>
                    <Row>
                        <Col span={6}>
                            <span>数量和概率：</span>
                        </Col>

                        <Col span={18}>
                            <Col xs={20} md={22}>
                                <Select mode="multiple" value={percentArr.map(tempRecord1 =>tempRecord1.nums)} onChange={this.changeSelect}  style={{ width: '100%' }} placeholder='选择个数' >
                                    {
                                        allNumsArr &&allNumsArr.length > 0 &&  allNumsArr.map(record =>
                                            <Option key={record} value={record}>{record+'个'}</Option>
                                        )
                                    }
                                </Select>
                            </Col>
                            {
                                percentArr.length > 0 && percentArr.map(
                                    (record,index) => <Col md={{span:10,offset:index%2 ===0 ?0:2}} xs={{span:20,offset:0}}  key={record.nums} >
                                       <span>{record.nums+'个:'}</span>
                                        <Input value={record.percent} onChange={e =>this.changePercent(e,record)}
                                               type='number' addonBefore='概率:' addonAfter='%'
                                               placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请设置概率'/>
                                    </Col>
                                )
                            }

                        </Col>

                    </Row>
                    <hr/>

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

                {
                    tableVisible &&  <SmallTable rowKey='nums' dataSource={percentArr} columns={columns}/>
                }


            </div>
        )
    }
}

export default CardPercentModal
