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
    TimePicker,
} from 'antd';
import PlanSelectOptionList from "../Common/PlanSelectOptionList";
import JustForTest2 from "../Common/JustForTest2";
import PlanNameSearch from "../Common/PlanNameSearch";
import PlanRadioGroup from "../Common/PlanRadioGroup";
import PlanSlider from "../Common/PlanSlider";

const { Option } = Select;
const format = 'HH:mm';

class AddMonthModalContentClass extends React.Component {


    // 提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 这里可以获取所有的值
                console.log('Received values of form-month ', values);
                const {addPlan} = this.props
                addPlan(values);
                // 其实是关闭模态框
                this.props.handleSubmit();
            }
        });
    };

    render() {
        let { getFieldDecorator,getFieldValue,setFieldsValue } = this.props.form;
        const {data} = this.props;

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

                {getFieldDecorator('type',{initialValue:3})(
                    <Input hidden={true}/>
                )}

                <Form.Item label="计划名称">
                    {getFieldDecorator('name',{initialValue:'计划：'})(<PlanNameSearch/>)}
                </Form.Item>

                <Form.Item label="关联任务">
                    {getFieldDecorator('parentId',{initialValue:1})(
                        <PlanSelectOptionList data={data} />
                    )}
                </Form.Item>

                <Form.Item label="设定等级（由低到高）">
                    {getFieldDecorator('rank',{ initialValue:3 })(
                    <PlanRadioGroup setFieldsValue={setFieldsValue}  rate={40} />
                    )}
                </Form.Item>

                <Form.Item label="设定得分">
                    {getFieldDecorator('score',{ initialValue:120 })(
                  <PlanSlider max={200} getFieldValue={getFieldValue} />
                    )}
                </Form.Item>

                <Form.Item label="置顶">
                    {getFieldDecorator('switch', { valuePropName: 'checked',initialValue:false })(<Switch />)}
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

const AddMonthPlanModalContent = Form.create({ name: 'validate_other' })(AddMonthModalContentClass);

export  default AddMonthPlanModalContent;
