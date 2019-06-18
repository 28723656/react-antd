import React from 'react'
import {Button, Form, Input, Select, Switch, TimePicker} from 'antd';
import moment from 'moment';
import PlanNameSearch from "../Common/PlanNameSearch";
import PlanRadioGroup from "../Common/PlanRadioGroup";
import PlanSlider from "../Common/PlanSlider";

const { Option } = Select;
const format = 'HH:mm';


class AddPlanModalContentClass extends React.Component {

    // 提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                const startTime = fieldsValue['startTime']
                const endTime = fieldsValue['endTime']
                const values ={
                    ...fieldsValue,
                    'startTime':startTime.add(8,'hours'),
                    'endTime':endTime.add(8,'hours'),
                }

                console.log('Received time ', values.startTime.format('YYYY-MM-DD HH:mm:SS'));
                console.log('Received values of form: ', values);
               // const hourOfStartTime = parseInt(values.startTime.split(':')[0]);
               // const minutesOfStartTime = parseInt(values.startTime.split(':')[1]);
               //
               // const hourOfEndTime = parseInt(values.endTime.split(':')[0]);
               // const minutesOfEndTime = parseInt(values.endTime.split(':')[1]);
               //
               //  // 这里可以获取所有的值
               //  console.log('开始时间',moment().hour(hourOfStartTime).minute(minutesOfStartTime).format('YYYY-MM-DD HH:mm:SS'));
               //  console.log('结束时间',moment().hour(hourOfEndTime).minute(minutesOfEndTime).format('YYYY-MM-DD HH:mm:SS'));
               //
               //

               //  把获得的值传入到data中，还是应该让父界面处理
                const {addPlan} = this.props
                addPlan(values);

           //    其实是关闭模态框
                this.props.handleSubmit();
            }
        });
    };

    render() {
        let { getFieldDecorator ,getFieldValue,setFieldsValue} = this.props.form;

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

                {getFieldDecorator('type',{initialValue:1})(
                    <Input hidden={true}/>
                )}

                <Form.Item label="计划名称">
                    {getFieldDecorator('name',{initialValue:'计划：'})(
                       <PlanNameSearch/>
                        )}
                </Form.Item>

                <Form.Item label="关联任务">
                    {getFieldDecorator('parentName',{initialValue:0})(
                        <Select>
                            <Option value={0}>无</Option>
                            <Option value={1}>任务一:读书</Option>
                            <Option value={2}>任务二:学习react</Option>
                            <Option value={3}>任务三:打架</Option>
                        </Select>
                        )}
                </Form.Item>

                <Form.Item label="时间" style={{ marginBottom: 0 }}>
                    <Form.Item
                        style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                    >
                        {getFieldDecorator('startTime',{ initialValue:moment()})(<TimePicker format={format}  />)}
                    </Form.Item>
                    <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                        {getFieldDecorator('endTime',{initialValue:moment().add(1,'h')})(<TimePicker  format={format}  />)}
                    </Form.Item>
                </Form.Item>


                <Form.Item label="设定等级（由低到高）">
                    {getFieldDecorator('rank',{initialValue:4})(
                        <PlanRadioGroup setFieldsValue={setFieldsValue}  rate={2}  />

                    )}
                </Form.Item>

                <Form.Item label="设定得分">
                    {getFieldDecorator('score',{initialValue:8})(
                        <PlanSlider max={10} getFieldValue={getFieldValue} />
                    )}
                </Form.Item>

                <Form.Item label="置顶">
                    {getFieldDecorator('top', { valuePropName: 'checked',initialValue:false })(<Switch />)}
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

const AddTodayPlanModalContent = Form.create({ name: 'validate_other' })(AddPlanModalContentClass);

export  default AddTodayPlanModalContent;
