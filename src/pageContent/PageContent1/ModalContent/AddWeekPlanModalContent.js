import React,{Component} from 'react'
import {
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Icon,
    Rate,
    Checkbox,
    Row,
    Col,
    Input,
    TimePicker, AutoComplete,
} from 'antd';
import PlanNameSearch from "../Common/PlanNameSearch";
import PlanSelectOptionList from "../Common/PlanSelectOptionList";
import PlanRadioGroup from "../Common/PlanRadioGroup";
import PlanSlider from "../Common/PlanSlider";


class AddWeekModalContentClass extends React.Component {

    // 处理等级的改变
  /*  handleRankChange = (e) =>{
        console.log(e.target.value);
        const resultValue = e.target.value *10
        console.log(resultValue)
        this.props.form.setFieldsValue({
            score:resultValue
        });
    }*/


    // 提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 这里可以获取所有的值
                console.log('Received values of form: ', values);
                // 其实是关闭模态框
                this.props.handleSubmit();
            }
        });
    };




    render() {
        let { getFieldDecorator ,getFieldValue,setFieldsValue} = this.props.form;
        let {data} = this.props;


        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                {getFieldDecorator('type',{initialValue:2})(
                    <Input hidden={true}/>
                )}

                <Form.Item label="计划名称">
                    {getFieldDecorator('name',{initialValue:'计划：'})(
                       <PlanNameSearch/>
                    )}
                </Form.Item>

                <Form.Item label="关联任务">
                    {getFieldDecorator('parentId',{initialValue:1})(
                        <PlanSelectOptionList data={data} />
                    )}
                </Form.Item>


                <Form.Item label="设定等级（由低到高）">
                    {getFieldDecorator('rank',{ initialValue:3 })(
                        <PlanRadioGroup setFieldsValue={setFieldsValue}  rate={10}  />
                    )}
                </Form.Item>

                <Form.Item label="设定得分">
                    {getFieldDecorator('score',{ initialValue:30 })(
                     <PlanSlider max={50} getFieldValue={getFieldValue} />
                    )}

                </Form.Item>

                <Form.Item label="置顶">
                    {getFieldDecorator('top',{valuePropName:'checked',initialValue:false})(<Switch />)}
                </Form.Item>


                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        完成
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const AddWeekPlanModalContent = Form.create({ name: 'validate_other' })(AddWeekModalContentClass);

export  default AddWeekPlanModalContent;
