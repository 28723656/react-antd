import React from 'react'
import {Button, Form, Select, Switch, TimePicker} from 'antd';
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
                    'startTime':startTime.format('HH:mm'),
                    'endTime':endTime.format('HH:mm')
                }

                // 这里可以获取所有的值
                console.log('Received values of form: ', values);

                // 其实是关闭模态框
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
                    {getFieldDecorator('switch', {initialValue:false })(<Switch  />)}
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
