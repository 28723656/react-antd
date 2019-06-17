import React from 'react'
import {Button, Form, Input, Radio, Select, Slider, Switch,} from 'antd';
import PlanNameSearch from "../Common/PlanNameSearch";
import PlanRadioGroup from "../Common/PlanRadioGroup";
import PlanSlider from "../Common/PlanSlider";

const { Option } = Select;
const format = 'HH:mm';


class AddYearModalContentClass extends React.Component {

    // 提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 这里可以获取所有的值
                console.log('Received values of form: ', values);

              //  把获得的值传入到data中，还是应该让父界面处理
               const {addYearPlan} = this.props
                addYearPlan(values);
              //  其实是关闭模态框
                this.props.handleSubmit();
            }
        });
    };


    render() {
        let {getFieldDecorator,getFieldValue,setFieldsValue  } = this.props.form;
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

                {getFieldDecorator('type',{initialValue:4})(
                    <Input hidden={true}/>
                )}

                <Form.Item label="计划名称">
                    {getFieldDecorator('name',{initialValue:'计划：'})(
                      <PlanNameSearch/>
                    )}
                </Form.Item>

                <Form.Item label="设定等级（由低到高）">
                    {getFieldDecorator('rank',{ initialValue:3 })(
                       <PlanRadioGroup setFieldsValue={setFieldsValue}  rate={480} />
                    )}
                </Form.Item>

                <Form.Item label="设定得分">
                    {getFieldDecorator('score',{ initialValue:1200 })(
                        <PlanSlider max={2400} getFieldValue={getFieldValue}  />
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

const AddYearPlanModalContent = Form.create({ name: 'validate_other' })(AddYearModalContentClass);

export  default AddYearPlanModalContent


