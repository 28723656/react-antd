import React,{Component} from 'react'
import {Slider} from "antd";

class PlanSlider extends Component{


    // 处理分数的改变
    handleChange = (value) =>{
        this.props.onChange(value);
    }


    render() {

        const {max} = this.props;
        let one = max/5;
        let two = max/5*2;
        let three = max/5*3;
        let four = max/5*4;
        let five = max;

        let marks ={}
        let pushArr =['0分', `${one}分`,`${two}分`,`${three}分`,`${four}分`,`${five}分`];
        for(let i=0;i<max/10+1;i++){
            marks[i*10] = pushArr[i];
        }
        console.log( marks)



       const realVale =  this.props.getFieldValue('score');
        return (
            <Slider onChange={this.handleChange} value={realVale}
                max={50}
                marks={marks}
            />
        )
    }
}

export  default  PlanSlider
