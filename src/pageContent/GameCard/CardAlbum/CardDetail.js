import React,{Component} from 'react'
import { Tabs,Badge ,Row,Col } from 'antd';
import SingleCard from "./SingleCard/SingleCard";
import PropTypes from "prop-types";

const { TabPane } = Tabs;

class CardDetail extends Component{
    static propTypes = {
        cardArr:PropTypes.array.isRequired,
    }

     callback =(key) => {
        console.log(key);
    }

    render() {

        const {cardArr} = this.props;
        console.log("卡牌图鉴数据:",cardArr);

        const cardArrS = cardArr.filter(record =>record.type === 'S')
        const cardArrA = cardArr.filter(record =>record.type === 'A')
        const cardArrB = cardArr.filter(record =>record.type === 'B')
        const cardArrC = cardArr.filter(record =>record.type === 'C')
        const cardArrD = cardArr.filter(record =>record.type === 'D')


         const tabNodeS =  <Badge count={cardArrS.length} overflowCount={99} offset={[5,8]}  style={{ backgroundColor: '#fff', color: '#009759', boxShadow: '0 0 0 1px #d9d9d9 inset' }} >
             <p  style={{fontSize:'18px'}}>S卡&nbsp;&nbsp;</p>
         </Badge>
        const tabNodeA =  <Badge count={cardArrA.length} overflowCount={99} offset={[5,8]}  style={{ backgroundColor: '#fff', color: '#009759', boxShadow: '0 0 0 1px #d9d9d9 inset' }} >
            <p  style={{fontSize:'18px'}}>A卡&nbsp;&nbsp;</p>
        </Badge>
        const tabNodeB =  <Badge count={cardArrB.length} overflowCount={99} offset={[5,8]}  style={{ backgroundColor: '#fff', color: '#009759', boxShadow: '0 0 0 1px #d9d9d9 inset' }} >
            <p  style={{fontSize:'18px'}}>B卡&nbsp;&nbsp;</p>
        </Badge>
        const tabNodeC =  <Badge count={cardArrC.length} overflowCount={99} offset={[5,8]}  style={{ backgroundColor: '#fff', color: '#009759', boxShadow: '0 0 0 1px #d9d9d9 inset' }} >
            <p  style={{fontSize:'18px'}}>C卡&nbsp;&nbsp;</p>
        </Badge>
        const tabNodeD =  <Badge count={cardArrD.length} overflowCount={99} offset={[5,8]}  style={{ backgroundColor: '#fff', color: '#009759', boxShadow: '0 0 0 1px #d9d9d9 inset' }} >
            <p  style={{fontSize:'18px'}}>D卡&nbsp;&nbsp;</p>
        </Badge>

        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={this.callback} tabPosition='left' >
                    <TabPane tab={tabNodeS} key="1">
                        <Row gutter={20}>
                            {cardArrS && cardArrS.length>0 && cardArrS.map((record) =>{
                               return  <Col xs={24} md={12} xl={8} key={record.id}><SingleCard cardEntity={record} /></Col>
                            })}
                        </Row>
                    </TabPane>

                    <TabPane tab={tabNodeA} key="2">
                        <Row gutter={20}>
                            {cardArrA && cardArrA.length>0 && cardArrA.map((record) =>{
                                return  <Col xs={24} md={12} xl={8} key={record.id}><SingleCard cardEntity={record} /></Col>
                            })}
                        </Row>
                    </TabPane>

                    <TabPane tab={tabNodeB} key="3">
                        <Row gutter={20}>
                            {cardArrB && cardArrB.length>0 && cardArrB.map((record) =>{
                                return  <Col xs={24} md={12} xl={8} key={record.id}><SingleCard cardEntity={record} /></Col>
                            })}
                        </Row>
                    </TabPane>
                    <TabPane tab={tabNodeC} key="4">
                        <Row gutter={20}>
                            {cardArrC && cardArrC.length>0 && cardArrC.map((record) =>{
                                return  <Col xs={24} md={12} xl={8} key={record.id}><SingleCard cardEntity={record} /></Col>
                            })}
                        </Row>
                    </TabPane>

                    <TabPane tab={tabNodeD} key="5">
                        <Row gutter={20}>
                            {cardArrD && cardArrD.length>0 && cardArrD.map((record) =>{
                                return  <Col xs={24} md={12} xl={8} key={record.id}><SingleCard cardEntity={record} /></Col>
                            })}
                        </Row>
                    </TabPane>
                </Tabs>

            </div>
        )
    }
}

export default CardDetail
