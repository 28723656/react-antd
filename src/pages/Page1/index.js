import React,{Component} from 'react';
import { Tabs ,Table,Switch,Modal, Button ,Icon} from 'antd';
import ReactEcharts from 'echarts-for-react'
import {getAjax, updateAjax} from "../../util/ajax";
import TodayPlan from "../../pageContent/PageContent1/TodayPlan";


const TabPane = Tabs.TabPane;

//echarts图的option
const  option = {
    title: {
        text: '5月任务完成率'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1','2','3','4','5','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'完成率',
            type:'line',
            stack: '总量',
            data:[100,20,30,40,50,60,70,80,90,10,0,0,0,0,0,0,0,0,0,0,10,10,10,10,10,10,10,10,10,10]
        },
        {
            name:'得分',
            type:'line',
            stack: '总量',
            data:[10,2,3,4,5,6,7,8,9,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,10,10,10,10,10,10]
        }

    ]
};

class Page1 extends Component{


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

                  <TodayPlan/>

                </TabPane>
                <TabPane tab="长期计划" key="2">
                    <h4>周一（5.20） </h4>
               {/*     <Table columns={columns} dataSource={data} showHeader={false} size='small'
                           pagination ={
                               {hideOnSinglePage :true}
                           }
                    />
                    <br />
                    <h4>周二（5.21） </h4>
                    <Table columns={columns} dataSource={data} showHeader={false} size='small'
                           pagination ={
                               {hideOnSinglePage :true}
                           }
                    />
                    <br />
                    <h4>周三（5.22） </h4>
                    <Table columns={columns} dataSource={data} showHeader={false} size='small'
                           pagination ={
                               {hideOnSinglePage :true}
                           }
                    />
                    <br />
                    <h4>周四（5.23） </h4>
                    <Table columns={columns} dataSource={data} showHeader={false} size='small'
                           pagination ={
                               {hideOnSinglePage :true}
                           }
                    />
                    <br />
                    <h4>周五（5.24） </h4>
                    <Table columns={columns} dataSource={data} showHeader={false} size='small'
                           pagination ={
                               {hideOnSinglePage :true}
                           }
                    />
                    <br />
                    <h4>周六（5.25） </h4>
                    <Table columns={columns} dataSource={data} showHeader={false} size='small'
                           pagination ={
                               {hideOnSinglePage :true}
                           }
                    />
                    <br />
                    <h4>周日（5.26） </h4>
                    <Table columns={columns} dataSource={data} showHeader={false} size='small'
                           pagination ={
                               {hideOnSinglePage :true}
                           }
                    />*/}
                </TabPane>
                <TabPane tab="任务统计" key="3">
                    <ReactEcharts option={option}/>
                </TabPane>
            </Tabs>
        )
    }
}


export default Page1
