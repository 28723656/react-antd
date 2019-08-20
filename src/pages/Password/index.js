import React, {Component} from 'react'
import {Tabs,Input,Typography ,Select,Icon,Button,Progress,Row,Col,message  } from "antd";
import {addAjax, deleteAjax, getAjax, updateAjax} from "../../util/ajax";
import moment from 'moment';

const {TabPane} = Tabs;
const { Search } = Input;
const { Text } = Typography;
const { Option } = Select;




class Password extends Component {

    state ={
        randomNum:4399,  // 随机的密码
        selectedDays:'15',  // 选择的天数
        passwordData:[],  // 加密的entity数据
    }


     onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    // 改变随机数
    changeRandomNum =() =>{
        const randomNum = Math.floor(Math.random()*9000+1000);
        this.setState({randomNum});
    }

    // 选择时间
    handleSelect =(value) =>{
        console.log('选中的时间为:',value,typeof value+'')
        this.setState({selectedDays:value+''})
    }

    // 解密
    unlock = (record) =>{
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('点我啊',record);
        updateAjax(`/password/password/${user.id}`,{id:record.id})
            .then(response =>{
                const flag = response.data.flag
                if(flag){
                    message.success("密码为:"+response.data.data.realPassword)
                }else {
                    message.error("抱歉，有问题，无法解开");
                }
                this.showInfo()
            })

    }

    // 删除记录
    deleteRecord =(record) =>{
        deleteAjax(`/password/password`,{id:record.id})
            .then(response =>{
                const result = response.data;
                if(result.flag){
                    message.success("删除成功")
                }else {
                    message.error("删除失败")
                }
                this.showInfo();
            })
    }

    // 提交的时候
    handleSubmit =(value) =>{
        const user = JSON.parse(localStorage.getItem('user'));
        // 发送ajax请求保存数据
       addAjax(`/password/password/${user.id}`,{days:this.state.selectedDays,password:value})
            .then(response =>{
                const result = response.data;
                this.showInfo();
            })

        // 初始化
        this.changeRandomNum();
        this.setState({selectedDays:"15"})



    }

    // 展示数据
    showInfo =() =>{
        const user = JSON.parse(localStorage.getItem('user'));
        // 顺便把数据展示一下下
        getAjax(`/password/password/${user.id}`)
            .then(response =>{
                this.setState({passwordData:response.data.data})
            })
    }

    // 初始化密码
    componentDidMount() {
        this.changeRandomNum();
        this.showInfo()
    }


    render() {

        const {randomNum,selectedDays,passwordData} = this.state

        const suffix = <Button icon="sync" onClick={this.changeRandomNum}></Button>

        const selectBefore = (
            <Select  value={selectedDays} style={{ width: 90 }} onChange={this.handleSelect} >
                <Option value="1">1天</Option>
                <Option value="7">7天</Option>
                <Option value="15">15天</Option>
                <Option value="30">1个月</Option>
                <Option value="90">3个月</Option>
            </Select>
        );



        return (
            <Tabs defaultActiveKey="1" onChange={this.callback} style={{padding:'10px'}}>
                <TabPane tab="屏幕使用时间加密" key="1">
                    <Search
                        readOnly={true}
                        placeholder='4位数密码'
                        addonBefore={selectBefore}
                        value={randomNum}
                        enterButton="确定"
                        size="default"
                        onSearch={this.handleSubmit}
                        suffix={suffix}
                    />

                    {passwordData && passwordData.map((record,index) =>{

                        let now2 = moment()
                        let diffDays = moment(record.endDate).subtract(1,'months').diff(moment(),'days');
                        let diffHours =moment(record.endDate).subtract(1,'months').diff(moment(),'hours');

                        const totalHours = moment(record.endDate).diff(moment(record.beginDate),'hours')
                        const percent =parseFloat(((totalHours-diffHours)*100.00/totalHours).toFixed(1));

                        // 稍微处理一下数据
                        diffDays = diffDays<0?0:diffDays
                        diffHours = diffHours<0?0:diffHours%24


                        return <div key={index}>
                            <hr/>
                            <Row  >
                                <Col xs={17} md={8} style={{paddingTop:'5px'}} >
                                    <span > {index+1}.创建时间：{moment(record.beginDate).format("YYYY-MM-DD HH:mm:ss")} </span>
                                </Col>
                                <Col offset={1} xs={6} md={8} style={{paddingTop:'5px'}} >
                                    <span > 周期：{record.days}天 </span>
                                </Col>
                                <Col xs={24} md={8} >
                                    <span style={{paddingTop:'5px'}}>剩余时间：{diffDays}天{diffHours}小时</span>
                                    {percent >=100 && <Button type='link' onClick={() =>this.unlock(record)}>解密</Button> }
                                    {record.realPassword &&<Button type='link' onClick={() =>this.deleteRecord(record)}>删除</Button> }
                                </Col>
                                <Col  xs={23} md={23}>
                                    <Progress
                                        strokeColor={{
                                            from: '#108ee9',
                                            to: '#87d068',
                                        }}
                                        percent={percent} status="active" />
                                </Col>
                            </Row>
                        </div>

                    })}
                    <hr/>

                    <Text type="warning">使用说明：</Text> <br/>
                    <Text>1.随机生成密码用于限制每天使用手机的时间</Text>  <br/> <br/>
                    <Text type="warning">使用方法：</Text>  <br/>
                    <Text>0.自己先设定好屏幕使用时间，哪些程序即使没密码也可以用，各种设定自己搞好后，在来这里忘记密码</Text> <br/>
                    <Text>1.第一个表示密码加密时间，第二个是密码</Text> <br/>
                    <Text>2.点击这个确定，系统会加密这个数字，然后也请您一定要忘记这个密码（就是输完密码后，心里默念其他的4位数，直到自己可能已经忘了这个密码）</Text> <br/>
                    <Text>3.为了心狠一点，我不会留后门的，密码一旦加密，我也无解，只有到时间才能显示,删除也是一样，到了时间才能删除</Text> <br/>
                    <Text>4.遇到问题请联系我</Text> <br/>
                </TabPane>
                <TabPane tab="其他" key="2">

                </TabPane>



            </Tabs>
        )
    }
}

export default Password
