import React from 'react'
import {Button,Row, Col, Form, Input, Select, Switch, TimePicker,Modal,DatePicker} from 'antd';
import moment from 'moment';
import PlanNameSearch from "../Common/PlanNameSearch";
import PlanRadioGroup from "../Common/PlanRadioGroup";
import PlanSlider from "../Common/PlanSlider";
import PlanSelectOptionList from "../Common/PlanSelectOptionList";
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import {getMomentTimeNoFormat} from "../../../util/momentUtil";

const { Option } = Select;
//const format = 'HH:mm';
const format = 'YYYY-MM-DD HH:mm';
const {confirm} = Modal
moment.locale('zh-cn');


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

                // console.log('Received time ', values.startTime.format('YYYY-MM-DD HH:mm:SS'));
                // console.log('Received values of form: ', values);
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
                const {addPlan,updatePlan,deletePlan,record} = this.props
                if(record === null){
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
                this.props.switchModal(1,false);
            }
        });
    };


    render() {
        let { getFieldDecorator ,getFieldValue,setFieldsValue} = this.props.form;
        let {data,record} = this.props;
        const basePlanList = JSON.parse(localStorage.getItem('basePlanList'));
        let  parent_id = 0
        basePlanList.map((record,index) =>{
            if(record.type === 2){
                parent_id = record.id;
                console.log("parent_id",parent_id)
                return parent_id;
            }
        })

        if(record){
           // console.log('record.startTime',record.startTime,moment(record.startTime).subtract(1,'months').format("YYYY-MM-DD HH:mm:SS"))
          //  console.log('record.endTime',record.endTime,moment(record.endTime).subtract(1,'months').format("YYYY-MM-DD HH:mm:SS"))
        }

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



                {record && getFieldDecorator('delete',{initialValue:'1',trigger:'onClick'})(
                            <Button shape='circle' type="danger" icon='close'  htmlType="submit">
                            </Button>

                )}
                {getFieldDecorator('id',{initialValue:record !== null?record.id:null})(
                    <Input hidden={true}/>
                )}

                {getFieldDecorator('type',{initialValue:record !== null?record.type:1})(
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


                {/*<Form.Item label="开始时间" style={{ marginBottom: 0 }}>*/}
                    {/*<Form.Item*/}
                        {/*style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}*/}
                    {/*>*/}
                        {/*{getFieldDecorator('startTime',{ initialValue:record !== null? moment(record.startTime).subtract(1,'months'):moment()})(<DatePicker format={format}  />)}*/}
                    {/*</Form.Item>*/}
                    {/*<span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>*/}
                    {/*<Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>*/}
                        {/*{getFieldDecorator('endTime',{initialValue:record !== null? moment(record.endTime).subtract(1,'months'):moment().add(1,'h')})(<DatePicker  format={format}  />)}*/}
                    {/*</Form.Item>*/}
                {/*</Form.Item>*/}


                    <Form.Item label='开始时间'
                    >
                        {getFieldDecorator('startTime',{ initialValue:record !== null? getMomentTimeNoFormat(record.startTime):moment()})(<DatePicker locale={locale} showTime format={format}  />)}
                    </Form.Item>
                    <Form.Item  label='结束时间'>
                        {getFieldDecorator('endTime',{initialValue:record !== null? getMomentTimeNoFormat(record.endTime):moment().add(1,'h')})(<DatePicker locale={locale} showTime  format={format}  />)}
                    </Form.Item>


                <Form.Item label="设定等级（由低到高）">
                    {getFieldDecorator('rank',{initialValue:record !== null?record.rank:4})(
                        <PlanRadioGroup setFieldsValue={setFieldsValue}  rate={2}  />

                    )}
                </Form.Item>

                <Form.Item label="设定得分">
                    {getFieldDecorator('score',{initialValue:record !== null?record.score:8})(
                        <PlanSlider max={10} getFieldValue={getFieldValue} />
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

const   AddTodayPlanModalContent = Form.create({ name: 'validate_other' })(AddPlanModalContentClass);

export  default AddTodayPlanModalContent;
