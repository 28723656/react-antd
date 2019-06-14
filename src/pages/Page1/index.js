import React, {Component} from 'react';
import {Tabs, Table, Switch, Modal, Button, Icon, Row, Col} from 'antd';
import ReactEcharts from 'echarts-for-react'
import {getAjax, updateAjax} from "../../util/ajax";
import TodayPlan from "../../pageContent/PageContent1/TodayPlan";
import LongPlan from "../../pageContent/PageContent1/LongPlan";
import PlanStatistics from "../../pageContent/PageContent1/PlanStatistics";
import Rank from "../../components/Rank";


const TabPane = Tabs.TabPane;


class Page1 extends Component {


    callback = (key) => {
        console.log(key)
    }


    //  onChange =(checked,record) => {
    //      const finished = checked?1:0
    //      const  url = '/today/save'
    //     const  data = {'id':record.id,finished} // 一个json
    //
    //      updateAjax(url,data)
    //          .then(response =>{
    //              console.log(response.data)
    //          })
    //          .catch((error) =>{
    //              alert('出错啦...'+error.message)
    //          })
    // }


    // ajax获取异步请求
    // componentWillMount() {
    //
    //     const  url = '/today/2'
    //     getAjax(url)
    //         .then(response =>{
    //             const result = response.data
    //             if(result.code === 20000){
    //                 console.log(result.data)
    //                 this.setState({data:result.data})
    //             }
    //
    //         })
    //         .catch((error) =>{
    //             alert('出错啦...'+error.message)
    //         })
    //
    // }


    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="今日任务" key="1">
                    <Row type='flex'>
                        <Col span={16}>
                            <TodayPlan/>
                        </Col>
                        <Col span={8}>
                            <Rank first={true}/>
                            <Rank/>
                            <Rank/>
                            <Rank/>
                        </Col>
                    </Row>

                </TabPane>

                <TabPane tab="长期计划" key="2">
                    <Row type='flex'>
                        <Col span={16}>
                            <LongPlan/>
                        </Col>
                        <Col span={8}>
                            <Rank first={true}/>
                            <Rank/>
                            <Rank/>
                            <Rank/>
                        </Col>
                    </Row>

                </TabPane>

                <TabPane tab="任务统计" key="3">
                    <Row type='flex'>
                        <Col span={16}>
                            <PlanStatistics/>
                        </Col>
                        <Col span={8}>
                            <Rank first={true}/>
                            <Rank/>
                            <Rank/>
                            <Rank/>
                        </Col>
                    </Row>

                </TabPane>
            </Tabs>
        )
    }
}


export default Page1
