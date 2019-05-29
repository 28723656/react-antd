import React,{Component} from 'react';
import { Tabs ,Table,Switch,Modal, Button ,Icon} from 'antd';
import ReactEcharts from 'echarts-for-react'
import {getAjax, updateAjax} from "../../util/ajax";


const TabPane = Tabs.TabPane;







class Page1 extends Component{

    state = {
        visible: false,
        data: []
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

     callback = (key) => {
        console.log(key)
     }


     onChange =(checked,record) => {
         const finished = checked?1:0
         const  url = '/today/save'
        const  data = {'id':record.id,finished}

         updateAjax(url,data)
             .then(response =>{
                 console.log(response.data)
             })
             .catch((error) =>{
                 alert('出错啦...'+error.message)
             })
    }

    componentWillMount() {

        const  url = '/today/2'
        getAjax(url)
            .then(response =>{
                const result = response.data
                if(result.code === 20000){
                    console.log(result.data)
                    this.setState({data:result.data})
                }

            })
            .catch((error) =>{
                alert('出错啦...'+error.message)
            })

    }


    render() {

        const {data} = this.state

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


        const columns = [
            {
                title: '任务名称',
                dataIndex: 'name',
            },
            {
                title: '时间',
                dataIndex: 'timeInterval',
            },
            {
                title: '完成',
                dataIndex: 'finished',
                render: (value,row,index) =>{
                    if(value === 1){
                        return <div>
                            <Switch defaultChecked checkedChildren="已完成" unCheckedChildren="未完成" onChange={(checked) =>this.onChange(checked,row)}/>
                            &nbsp;&nbsp; &nbsp;&nbsp;得分：10分
                        </div>
                    }else if(value === 0){
                        return <Switch checkedChildren="已完成" unCheckedChildren="未完成"  onChange={(checked) =>this.onChange(checked,row)}/>
                    }
                }
            },
        ];
        /*const data = [
            {
                key: 1,
                name: 'A->读书《穷爸爸，富爸爸》',
                timeInterval: '13:00 - 16:00',
                finished: '0',
            },
            {

                key: 2,
                name: 'S->学习react',
                timeInterval: '9:00 - 11:00',
                finished: '1',
            },
            {

                key: 3,
                name: 'C->玩游戏《鬼泣5》-通关血宫模式',
                timeInterval: '19:00 - 22:00',
                finished: '0',
            },
        ];*/


        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="今日任务" key="1">

                    <div style={{padding:5}} >
                        <Button type="dashed" onClick={this.showModal}>
                            <Icon type="plus" />添加任务
                        </Button>
                        <Modal
                            title="Basic Modal"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>
                    </div>


                    <Table columns={columns} dataSource={data} showHeader={false} size='small'
                           pagination ={
                               {hideOnSinglePage :true}
                           }
                    />

                </TabPane>
                <TabPane tab="本周任务" key="2">
                    <h4>周一（5.20） </h4>
                    <Table columns={columns} dataSource={data} showHeader={false} size='small'
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
                    />
                </TabPane>
                <TabPane tab="任务统计" key="3">
                    <ReactEcharts option={option}/>
                </TabPane>
            </Tabs>
        )
    }
}


export default Page1
