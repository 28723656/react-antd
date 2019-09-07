import React from 'react'
import {Button, Form, Input, Switch,Modal,DatePicker } from 'antd';
import PlanNameSearch from "../Common/PlanNameSearch";
import PlanSelectOptionList from "../Common/PlanSelectOptionList";
import PlanRadioGroup from "../Common/PlanRadioGroup";
import PlanSlider from "../Common/PlanSlider";
import moment from 'moment';
import locale from "antd/lib/date-picker/locale/zh_CN";
import {getMomentTimeNoFormat} from "../../../util/momentUtil";

const {confirm} = Modal
const { WeekPicker } = DatePicker;
moment.locale('zh-cn');


class AddWeekModalContentClass extends React.Component {



    // 提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 这里可以获取所有的值
                console.log('Received values of form: ', values);
                //  把获得的值传入到data中，还是应该让父界面处理
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
                        //        console.log('Cancel');
                            },
                        });
                    }else if(values.delete === '0') {
                        updatePlan(values);
                    }

                }

                //    其实是关闭模态框
                this.props.switchModal(2,false);
            }
        });
    };




    render() {
        let { getFieldDecorator ,getFieldValue,setFieldsValue} = this.props.form;
        let {data,record} = this.props;

        const basePlanList = JSON.parse(localStorage.getItem('basePlanList'));
        let  parent_id = 0
        basePlanList.map((record,index) =>{
            if(record.type === 3){
                parent_id = record.id;
                console.log("parent_id",parent_id)
                return parent_id;
            }
        })

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


               {record && record.id !== 120 && getFieldDecorator('delete',{initialValue:'1',trigger:'onClick'})(
                    <Button shape='circle' type="danger" icon='close' htmlType="submit">
                    </Button>
                )}
                {getFieldDecorator('id',{initialValue:record !== null?record.id:null})(
                    <Input hidden={true}/>
                )}


                {getFieldDecorator('type',{initialValue:record !== null?record.type:2})(
                    <Input hidden={true}/>
                )}


                <Form.Item label="计划名称">
                    {getFieldDecorator('name',{initialValue:record !== null?record.name:'计划:', rules: [{ required: true, message: '请输入计划名称！' }]})(
                        <PlanNameSearch/>
                    )}
                </Form.Item>

                {data &&
                <Form.Item label="关联任务">
                    {getFieldDecorator('parentId',{initialValue:record !== null?record.parentId:parent_id, rules: [{ required: true, message: '请选择关联任务！' }]})(
                        <PlanSelectOptionList data={data} />
                    )}
                </Form.Item>
                }

                <Form.Item label='选择周'
                >
                    {getFieldDecorator('startTime',{ initialValue:record !== null? getMomentTimeNoFormat(record.startTime):moment()})(  <WeekPicker locale={locale}   placeholder="选择周" />)}
                </Form.Item>


                <Form.Item label="设定等级（由低到高）">
                    {getFieldDecorator('rank',{initialValue:record !== null?record.rank:3})(
                        <PlanRadioGroup setFieldsValue={setFieldsValue}  rate={10}  />

                    )}
                </Form.Item>

                <Form.Item label="设定得分">
                    {getFieldDecorator('score',{initialValue:record !== null?record.score:30})(
                        <PlanSlider max={50} getFieldValue={getFieldValue} />
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

const AddWeekPlanModalContent = Form.create({ name: 'validate_other' })(AddWeekModalContentClass);

export  default AddWeekPlanModalContent;
