import React,{Component} from 'react'
import {Slider} from "antd";

class PlanSlider extends Component{


    // 处理分数的改变
    handleChange = (value) =>{
        this.props.onChange(value);
    }


    render() {

        //   50/5 =10
        // 200/5 =40

        // 50   /5   0 10  20  30  40  50
        // 200  /40  0 40  80 120 160 200
        const {max} = this.props;
        let interval = max/5;   //10    40
        let one = interval;   //10   80
        let two = interval*2;  //20
        let three = interval*3;//35
        let four = interval*4; //40
        let five = max;  //50

        let marks ={}
        let pushArr =['0分', `${one}分`,`${two}分`,`${three}分`,`${four}分`,`${five}分`];
        for(let i=0;i<max/interval+1;i++){
            marks[i*interval] = pushArr[i];
        }
        console.log( marks)



       const realVale =  this.props.getFieldValue('score');
        return (
            <Slider onChange={this.handleChange} value={realVale}
                max={max}
                marks={marks}
            />
        )
    }
}

export  default  PlanSlider
