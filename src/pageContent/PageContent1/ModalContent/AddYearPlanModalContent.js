import React from 'react'
import {Button, DatePicker, Form, Input, Modal, Select, Switch,} from 'antd';
import PlanNameSearch from "../Common/PlanNameSearch";
import PlanRadioGroup from "../Common/PlanRadioGroup";
import PlanSlider from "../Common/PlanSlider";
import moment from 'moment';
import locale from "antd/lib/date-picker/locale/zh_CN";

const {confirm} = Modal
const { MonthPicker } = DatePicker;
moment.locale('zh-cn');

class AddYearModalContentClass extends React.Component {

    // 提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 这里可以获取所有的值
                console.log('Received values of form: ', values);

                //  把获得的值传入到data中，还是应该让父界面处理
                const {addPlan,updatePlan,deletePlan,record} = this.props
                if(record == null){
                    addPlan(values);
                }else{
                    // 1表示删除  0-表示添加
                    if(values.delete === '1'){
                        confirm({
                            title: '确定删除?',
                            content: '删就删呗！',
                            okText:'确定',
                            cancelText:'取消',
                            onOk() {
                                deletePlan(values.id)
                            },
                            onCancel() {
                                // console.log('Cancel');
                            },
                        });
                    }else if(values.delete === '0') {
                        updatePlan(values);
                    }

                }

                //    其实是关闭模态框
                this.props.switchModal(4,false);
            }
        });
    };

    // componentDidMount() {
    //     //  初始化数据信息
    //     let {record} = this.props;
    //     const {setFieldsValue} = this.props.form;
    //     if(record !== null){
    //         setFieldsValue(
    //             {
    //                 id:record.id,
    //                 type:4,
    //                 name:record.name,
    //                 startTime:moment(record.startTime).subtract(1,'months'),
    //                 rank:record.rank,
    //                 score:record.score,
    //                 top:record.top
    //             }
    //         );
    //     }else {
    //         setFieldsValue(
    //             {
    //                 id:record.id,
    //                 type:4,
    //                 name:record.name,
    //                 startTime:moment(record.startTime).subtract(1,'months'),
    //                 rank:record.rank,
    //                 score:record.score,
    //                 top:record.top
    //             }
    //         );
    //     }
    // }

    render() {
        let {getFieldDecorator,getFieldValue,setFieldsValue  } = this.props.form;
        let {record} = this.props;


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


               {record &&  record.id !== 118 && getFieldDecorator('delete',{initialValue:'1',trigger:'onClick'})(
                    <Button shape='circle' type="danger" icon='close' htmlType="submit">
                    </Button>
                )}

                {getFieldDecorator('id',{initialValue:record !== null?record.id:null})(
                    <Input hidden={true}/>
                )}


                {getFieldDecorator('type',{initialValue:4})(
                    <Input hidden={true}/>
                )}

                <Form.Item label="计划名称">
                    {getFieldDecorator('name',{initialValue:record !== null?record.name:'计划:', rules: [{ required: true, message: '请输入计划名称！' }]})(
                        <PlanNameSearch/>
                    )}
                </Form.Item>

                <Form.Item label='选择年份'
                >
                    {getFieldDecorator('startTime',{ initialValue:record !== null? moment(record.startTime).subtract(1,'months'):moment()})(
                        <MonthPicker locale={locale}   placeholder="选择年份" />
                        )}
                </Form.Item>

                <Form.Item label="设定等级（由低到高）">
                    {getFieldDecorator('rank',{initialValue:record !== null?record.rank:3})(
                        <PlanRadioGroup setFieldsValue={setFieldsValue}  rate={480}  />

                    )}
                </Form.Item>

                <Form.Item label="设定得分">
                    {getFieldDecorator('score',{initialValue:record !== null?record.score:1200})(
                        <PlanSlider max={2000} getFieldValue={getFieldValue} />
                    )}
                </Form.Item>

                <Form.Item label="置顶">
                    {getFieldDecorator('top', { valuePropName: 'checked',initialValue:record !== null?record.top:false })(<Switch />)}
                </Form.Item>


                {getFieldDecorator('delete',{initialValue:'0',trigger:'onClick'})(
                    <Button type="primary" htmlType="submit" block={true}    >
                        完成
                    </Button>
                )}
            </Form>
        );
    }
}

const AddYearPlanModalContent = Form.create({ name: 'validate_other' })(AddYearModalContentClass);

export  default AddYearPlanModalContent


