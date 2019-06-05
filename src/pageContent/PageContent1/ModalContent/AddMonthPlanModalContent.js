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

const { Option } = Select;
const format = 'HH:mm';

class AddMonthModalContentClass extends React.Component {

    constructor(props){
        super(props);
    }

    // 处理等级的改变
    handleRankChange = (e) =>{
        console.log(e.target.value);
        const resultValue = e.target.value *40
        console.log(resultValue)
        this.props.form.setFieldsValue({
            score:resultValue
        });
    }


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
        let { getFieldDecorator } = this.props.form;
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
                <Form.Item label="计划名称">
                    {getFieldDecorator('name',{initialValue:'计划：'})(<PlanNameSearch/>)}
                </Form.Item>

                <Form.Item label="关联任务">
                    {getFieldDecorator('parentId',{initialValue:1})(
                        <PlanSelectOptionList data={data} />
                    )}
                </Form.Item>

                <Form.Item label="设定等级（由低到高）">
                    {getFieldDecorator('rank')(
                        <Radio.Group onChange={this.handleRankChange}>
                            <Radio.Button value={1}>&nbsp;&nbsp;D&nbsp;&nbsp;</Radio.Button>
                            <Radio.Button value={2}>&nbsp;&nbsp;C&nbsp;&nbsp;</Radio.Button>
                            <Radio.Button value={3}>&nbsp;&nbsp;B&nbsp;&nbsp;</Radio.Button>
                            <Radio.Button value={4}>&nbsp;&nbsp;A&nbsp;&nbsp;</Radio.Button>
                            <Radio.Button value={5}>&nbsp;&nbsp;S&nbsp;&nbsp;</Radio.Button>
                        </Radio.Group>,
                    )}
                </Form.Item>

                <Form.Item label="设定得分">
                    {getFieldDecorator('score')(
                        <Slider
                            max={200}
                            marks={{
                                0: '0分',
                                40: '40分',
                                80: '80分',
                                120: '120分',
                                160: '160分',
                                200: '200分',
                            }}
                        />,
                    )}
                </Form.Item>

                <Form.Item label="置顶">
                    {getFieldDecorator('switch', { valuePropName: 'checked' })(<Switch />)}
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
