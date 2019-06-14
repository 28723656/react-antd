import React,{Component} from 'react'
import ReactEcharts from 'echarts-for-react'
import {Card, Slider} from "antd";

/**
 *  page1 计划统计
 */

//echarts图的option
const  initOptionPercent = {
    title: {
        text: '6月任务完成率'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['完成率']
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
          data:[20,30,30,40,50,60,70,80,90,10,80,65,30,20,60,50,50,50,60,60,10,10,30,90,90,10,30,30,70,10]
        }
    ]
};
const  initOptionScore = {
    title: {
        text: '6月任务完得分'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['得分']
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
            name:'得分',
            type:'bar',
            stack: '总量',
            data:[10,9,8,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9]
        }

    ]
};



class PlanStatistics extends Component{

    state = {
        optionScore:{},
        optionPercent:{}
    }

    // 选择月份发生变化的时候
    handleMonthChange =(value) =>{
        console.log(`选择了${value}月`)
        // 随机一个data percent  31个数
        let dataPercentArr=[]
        let dataScoreArr=[]
        for(let i=0;i<31;i++){
            dataPercentArr.push(Math.round(Math.random()*50+20))
            dataScoreArr.push(Math.round(Math.random()*9+1  ))
        }
        const {optionPercent,optionScore} = this.state;
        optionPercent.title.text=value+'月任务完成率';
        optionScore.title.text=value+'月任务完成率';
        optionPercent.series[0].data=dataPercentArr;
        optionScore.series[0].data=dataScoreArr;

        console.log(optionScore)

        // 这里有点坑，通过ref引用来操作setOption改变数据,不需要setState
      //  this.setState({optionScore,optionPercent})
        this.echartsReactPercentRef.getEchartsInstance().setOption(optionPercent);
        this.echartsReactScoreRef.getEchartsInstance().setOption(optionScore);

    }

    componentDidMount() {
        this.setState({optionScore:initOptionScore,optionPercent:initOptionPercent})
    }


    render() {
        const {optionPercent,optionScore} = this.state;
        console.log(optionScore)

        return (
            <div>
                <Card>
                <Slider
                    style={{margin:'18px'}}
                    max={12}
                    min={1}
                    defaultValue={6}
                    marks={{
                        1: '1月',
                        2: '2月',
                        3: '3月',
                        4: '4月',
                        5: '5月',
                        6: '6月',
                        7: '7月',
                        8: '8月',
                        9: '9月',
                        10: '10月',
                        11: '11月',
                        12: '12月',
                    }}
                    onChange={this.handleMonthChange}
                />
                </Card>
                <Card>
                <ReactEcharts
                    ref={(e) => {
                        this.echartsReactPercentRef = e;
                    }}
                    option={optionPercent}/>
                <ReactEcharts
                    ref={(e) => {
                        this.echartsReactScoreRef = e;
                    }}
                    option={optionScore}/>
                </Card>
            </div>
        )
    }
}

export  default PlanStatistics
