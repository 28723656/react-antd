import React, {Component} from 'react'
import {Card, DatePicker, List, Tabs, Typography, Col, Row, Select, Input, Button, Form, Modal} from "antd";
import {addAjax, getAjax} from "../../util/ajax";
import {getUser} from "../../util/userUtil";
import {getMomentTime} from "../../util/momentUtil";

const {TabPane} = Tabs;
const {Option} = Select
const {Text} = Typography;
const {TextArea} = Input


class StarClass extends Component {

    state = {
        starUser: {},   // 用户信息
        user: getUser(),
        transData:[], // 交易记录
        userList:[], // 可选用户列表
    }

    // 初始化数据
    initData = () => {
        const user = getUser();
        // 获取用户的星星数
        getAjax(`/star/user/${user.id}`).then((res) => {
            const result = res.data;
            if (result.flag) {
                this.setState({starUser: result.data})
            }
        })

        // 获取用户的交易记录
        getAjax(`/star/trans/${user.id}`).then((res) =>{
            this.setState({transData:res.data.data})
        })

        // 获取可交易的用户
        getAjax(`/star/trans/transUser`).then((res)=>{
            console.log("userList",res.data.data,'-------------')
            this.setState({userList:res.data.data})
        })

    }

    // 提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 这里可以获取所有的值
                console.log('Received values of form: ', values);
                addAjax(`/star/trans/`,values).then(() =>{
                    this.initData();
                    message.success("交易成功！");

                })
            }
        });
    };



    componentDidMount() {
        this.initData();
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        const {starUser, user,transData,userList} = this.state;
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="我的星星" key="1">
                    <Card title='星星' bordered={true} bodyStyle={{paddingTop: '2px'}}>
                        <Row>
                            <Col xs={6} md={4} xl={3}>我的星星：</Col>
                            <Col xs={6} md={2} xl={1}>{starUser.num}个</Col>
                            <Col xs={4} md={4} xl={3}>类型:</Col>
                            <Col xs={3} md={2} xl={1}>{starUser.type}</Col>
                        </Row>
                    </Card>
                    <Card title='操作' bordered={true} bodyStyle={{paddingTop: '2px'}}>

                        <Form  onSubmit={this.handleSubmit}>
                            <Row>
                                {getFieldDecorator('userId', {initialValue: user.id})(
                                    <Input hidden={true}/>,
                                )}
                                <Col xs={24} md={4} xl={3}><Text>{user.nickName}:</Text></Col>
                                <Col xs={4} md={4} xl={3} ><Text style={{marginTop:'3px'}}>赠送给</Text></Col>
                                <Col xs={8} md={4} xl={3}>
                                    <Form.Item >
                                        {getFieldDecorator('otherId')(
                                            <Select >
                                                {userList && userList.map((item,index) =><Option key={item.id} value={item.id}>{item.nickName}</Option>)}
                                            </Select>,
                                        )}
                                    </Form.Item>

                                </Col>
                                <Col xs={8} md={4} xl={3} style={{marginTop:'3px'}}>
                                    {getFieldDecorator('transNum', {initialValue: 10})(
                                        <Input type='number' width={30}/>
                                    )}

                                </Col>
                                <Col xs={4} md={4} xl={3} >
                                    <Text style={{marginTop:'3px'}}>个星星</Text>
                                </Col>

                                <Col xs={24} md={24} xl={24}>
                                    <Text>描述</Text>
                                </Col>
                                <Col xs={24} md={24} xl={24}>
                                    {getFieldDecorator('description')(
                                        <TextArea/>
                                    )}
                                </Col>
                                <Col xs={24} md={24} xl={24}><p></p></Col>
                                <Col xs={24} md={24} xl={24}>
                                    <Form.Item >
                                        <Button type="primary" htmlType="submit" block={true}>
                                            提交
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>

                    </Card>
                    <Card title='使用记录' bordered={true} bodyStyle={{paddingTop: '2px'}}>
                        <Row>
                            {transData && transData.map((record,index) =>{
                                return <Col xs={24} key={record.id}>我赠送给〖{record.otherName}〗了〖{record.transNum}〗积分({getMomentTime(record.createTime)})</Col>
                            })}

                        </Row>
                    </Card>
                </TabPane>

            </Tabs>
        )
    }
}


const Star = Form.create({ name: 'star_user' })(StarClass);
export  default Star
