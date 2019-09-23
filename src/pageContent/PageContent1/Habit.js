import React,{Component} from 'react'
import SmallTable from "../../components/Table/SmallTable";
import {Row, Col, Progress, Switch, Button, Icon, Modal, Table} from "antd";
import AddHabit from "./ModalContent/AddHabit";
import {getAjax, updateAjax} from "../../util/ajax";
import {getUser} from "../../util/userUtil";
import {getMomentTime} from "../../util/momentUtil";


let clickFinish =false  // 如果是点击完成的时候，就不让弹出
class Habit extends Component{

    state ={
        visibleAdd:false,
        habitData:{},   //选中的习惯
        habitDataList:[],   //习惯list
        historyHabitDataList:[],// 历史数据
    }

    handleClick =(record) =>{
        console.log('clickFinish',clickFinish)
        if(!clickFinish){
            console.log('handleClick')
            console.log('record',record)
            this.setState({visibleAdd:true,habitData:record})
        }
        clickFinish = false
    }

    changeSwitch =(value,row) =>{
        this.setState({visibleAdd:false})
        clickFinish = true
        console.log("开关",value)
        let finish = 0;
            finish =value?1:0
        updateAjax(`/plan/habit/${row.id}/${finish}`).then(response =>{
            this.initData();
        })
    }


    // 模态框小时
    handleModalDisappear =() =>{
        this.setState({visibleAdd:false})
    }

    // 查看历史
    handleHabitHistory =() =>{
        const {historyHabitDataList} = this.state
        Modal.success({
            icon: null,
            content:
                <div>
                    <div>
                        <p>一.习惯说明</p>
                        <p>1.三天内没有坚持该习惯，习惯会自动删除</p>
                        <p>2.当天没有完成习惯，会默认减去1天</p>
                        <p>3.点击完成后，凌晨才会结算</p>
                    </div>
                    <hr/>
                    <div>

                        {historyHabitDataList && historyHabitDataList.length>0 &&
                        <Row>
                            <Col span={4}>名称</Col>
                            <Col span={6}>创建日期</Col>
                            <Col span={4}>进度</Col>
                            <Col span={6}>实际坚持天数</Col>
                            <Col span={4}>评价</Col>
                        </Row>
                        }

                        {historyHabitDataList && historyHabitDataList.length>0 &&
                        historyHabitDataList.map((record,index)=>{
                            let evaluate = '不明'
                            if(record.type ===3){
                                evaluate = '放弃了'
                            }else if(record.type ===4){
                                evaluate ='完成且完美'
                            }else if(record.type ===5){
                                evaluate ='完成但不完美'
                            }
                            return   <Row key={record.id}>
                                <Col span={4}>{record.name}</Col>
                                <Col span={6}>{getMomentTime(record.startTime,'YYYY-MM-DD')}</Col>
                                <Col span={4}>{record.keepDays}/{record.allDays}</Col>
                                <Col offset={2} span={4}>{record.realKeepDays}天</Col>
                                <Col span={4}>{evaluate}</Col>
                            </Row>
                        })

                        }
                    </div>
                </div>
        })
    }


    // 初始化数据
    initData =() =>{
        console.log("初始化数据");
        const user = getUser();
        getAjax(`/plan/habit/user/${user.id}`).then(response =>{
            const data = response.data.data;
            if(data){
                this.setState({habitDataList:data.filter(record => record.type === 1 || record.type === 2)})
                this.setState({historyHabitDataList:data.filter(record => record.type!==1 && record.type!==2)})
            }

        })
    }

    componentDidMount() {
        this.initData();
    }

    render() {

        const columns = [
            {
                title:'名称',
                dataIndex:'name',
                width:'25%'
            },
            {
                title:'天数',
                dataIndex:'keepDays',
                render: (value,row,index) =>{
                    return `${value}/${row.allDays}`;
                },
                width: '15%'
            },
            {
                title:'百分比',
                render: (value,row,index) =>{
                    const percent = Math.floor(row.keepDays/row.allDays*100);
                    return  <Progress
                        strokeColor={{
                            from: '#108ee9',
                            to: '#87d068',
                        }}
                        percent={percent}
                        status="active"
                    />
                },
                width:'50%'
            },
            {
                dataIndex:'todayFinish',
                title:'完成',
                render : (value,row) => <Switch defaultChecked={value ===1} onChange={ finish => this.changeSwitch(finish,row)} />
            }
        ]


        const {visibleAdd,habitData,habitDataList} = this.state;


        return (
            <div>

              {/*  <SmallTable columns={columns} dataSource={data} showHeader={false}/>*/}

                {
                    habitDataList && habitDataList.length>0 &&
                    <Table rowKey='id' columns={columns} dataSource={habitDataList} showHeader={false} size='small'
                           pagination={{
                               hideOnSinglePage:true,
                               pageSize:30
                           }}
                           onRow={record => {
                               return {
                                   onClick: e => this.handleClick(record),
                               };
                           }}
                    />
                }


                <Row>
                    <Col span={4}>
                        <Button type="link" onClick={() =>this.handleClick({})}>
                            <Icon type="plus"/> 添加习惯
                        </Button>
                    </Col>

                    <Col offset={12} span={6}>
                        <Button type="link" onClick={this.handleHabitHistory}>
                            <Icon type="history"/> 查看历史
                        </Button>
                    </Col>
                </Row>

                <div>
                    <AddHabit data={habitData} visible={visibleAdd} handleModalDisappear={this.handleModalDisappear} initData={this.initData}  ></AddHabit>
                </div>

            </div>
        )
    }
}

export default Habit
