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
    AutoComplete
} from 'antd';
import moment, {now} from 'moment';

const { Option } = Select;
const format = 'HH:mm';

// 用于搜索的数据
const defaultSelections=[
    '读书：学习java编程思想',
    '读书：看小王子',
    '读书:看白夜行',
    '游戏：玩鬼泣5',
    '游戏：玩死亡搁浅',
    '生活：爬山',
    '生活：去杭州玩',
    '生活：去西藏旅行',
    'nmsl',
    '没有什么计划，看看书就行了',
    '这个很好玩唉',
    '死亡笔记',
    '不知道写什么了',
    '心里的雨倾盆而下，却始终淋不到她',
    '小学篱笆旁的蒲公英',
    '一起长大的约定',
    '故事的小黄花',
    '从出生那年就飘着',
    '童年的荡秋千',
    '随记忆一直晃到现在',
    '吹着前奏望着天空',
    '我想起花瓣试着掉落',
    '为你翘课的那一天',
    '花落的那一天',
    '教室的那一间',
    '我怎么看不见',
    '消失的下雨天',
    '我好想再淋一遍',
    '没想到失去的勇气我还留着',
    '好想再问一遍',
    '你会等待还是离开',
    '刮风这天我试过握着你手',
    '但偏偏雨渐渐大到我看你不见',
    '还要多久我才能在你身边',
    '等到放晴的那天也许我会比较好一点',
    '从前从前有个人爱你很久',
    '但偏偏风渐渐把距离吹得好远',
]

class AddPlanModalContentClass extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
        dataSource: [],
    };

    componentDidMount() {
        this.setState({dataSource:defaultSelections})
    }

    // 任务栏显示搜索的内容
    handleSearch = (value) => {

        let resultSelections = defaultSelections.filter((record,index) => record.includes(value))

        while (resultSelections.length >5){
            resultSelections.pop()
        }

        if(!value){
            resultSelections = defaultSelections;
        }

        this.setState({
            dataSource:resultSelections,
        });
    };

    // 任务栏选择后的效果
    onSelect = (value) =>{

        console.log('onSelect', value);
    }


    // 处理等级的改变
    handleRankChange = (e) =>{
        console.log(e.target.value);
        const resultValue = e.target.value *2
        console.log(resultValue)
        this.props.form.setFieldsValue({
            score:resultValue
        });
    }


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
        let { getFieldDecorator } = this.props.form;

        const { dataSource } = this.state;

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
                    {getFieldDecorator('name')(
                        <AutoComplete
                            dataSource={dataSource}
                            onSelect={this.onSelect}
                            onSearch={this.handleSearch}
                            placeholder="计划名称"
                        />
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
                        <Radio.Group onChange={this.handleRankChange} >
                            <Radio.Button value={1}>&nbsp;&nbsp;D&nbsp;&nbsp;</Radio.Button>
                            <Radio.Button value={2}>&nbsp;&nbsp;C&nbsp;&nbsp;</Radio.Button>
                            <Radio.Button value={3}>&nbsp;&nbsp;B&nbsp;&nbsp;</Radio.Button>
                            <Radio.Button value={4}>&nbsp;&nbsp;A&nbsp;&nbsp;</Radio.Button>
                            <Radio.Button value={5}>&nbsp;&nbsp;S&nbsp;&nbsp;</Radio.Button>
                        </Radio.Group>,
                    )}
                </Form.Item>

                <Form.Item label="设定得分">
                    {getFieldDecorator('score',{initialValue:8})(
                        <Slider
                            max={10}
                            marks={{
                                0: '0分',
                                2: '2分',
                                4: '4分',
                                6: '6分',
                                8: '8分',
                                10: '10分',
                            }}
                        />,
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
