import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';
import { Table, Input, Button, Popconfirm, Form,Row,Col,Typography  } from 'antd';
import PropTypes from "prop-types";

const { Text,Title } = Typography;

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }
}

class EditableTable extends React.Component {

    static propTypes = {
      cardEntity:PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '等级',
                dataIndex: 'rank',
                width: '10%',
            },
            {
                title: '星级',
                dataIndex: 'star',
            },
            {
                title: '花费',
                dataIndex: 'cost',
                editable: true,
            },
            {
                title: '增加金币%',
                dataIndex: 'incCoin',
                editable: true,
            },
            {
                title: '增加经验%',
                dataIndex: 'incExperience',
                editable: true,
            },
            {
                title: '概率下限',
                dataIndex: 'lowPercent',
                editable: true,
            },
            {
                title: '概率上限',
                dataIndex: 'topPercent',
                editable: true,
            },
            {
                title: '概率期望',
                dataIndex:'hopePercent',
                render:(text,record) =>
                    ((record.lowPercent*1+record.topPercent*1)/2).toFixed(2)
            },
            {
                title: '操作',
                dataIndex: 'operation',
                width: '10%',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                            <a onClick={() => this.handleDelete(record.key)}>删除</a>
                    ) : null,
            },
        ];

        this.state = {
            dataSource: [
         /*       {
                    key:1,
                    rank: 1,
                    star:1,
                    cost: 50,
                    incCoin: 6.2,
                    incExperience: 6.2,
                    lowPercent:0.15,
                    topPercent:0.66,
                },
                {
                    key:2,
                    rank: 2,
                    star:1,
                    cost: 70,
                    incCoin: 6.4,
                    incExperience: 6.4,
                    lowPercent:0.15,
                    topPercent:0.67,
                },*/
            ],
            count: 0,
            upLowPercent:false,
            loop:0,
            star:1,

            // 新增的一些属性
            oneStar:10,
            eachStar:0,
            fullRank:20,

            oneCost:50,
            eachCost:20,
            fullCost:430,
            fullCostAll:0,

            oneIncCoin:6.2,
            eachIncCoin:0.2,
            fullIncCoin:10,

            oneIncExperience:6.2,
            eachIncExperience:0.2,
            fullIncExperience:10,

            oneLowPercent:0.105,
            eachLowPercent:0.005,
            fullLowPercent:0.2,

            oneTopPercent:0.705,
            eachTopPercent:0.005,
            fullTopPercent:0.8,
        };
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    handleAdd = () => {
        const {  dataSource } = this.state;
        let {upLowPercent,count,loop,star} = this.state
        count = count + 1;
        upLowPercent =count % 4 === 0
        loop =Math.floor(count /4)
        star = Math.floor((count-1)/10+1)
        const newData = {
            key: count,
            rank: count,
            star,
            cost: 20*count+50,
            incCoin:(count*0.2+6).toFixed(1),
            incExperience: (count*0.2+6).toFixed(1),
            lowPercent:(0.01*loop+0.15).toFixed(2),
            topPercent:(0.01*count+0.65-loop*0.01).toFixed(2),
        };
        console.log(typeof newData.key,typeof newData.lowPercent)
        this.setState({
            dataSource: [...dataSource, newData],
            count: count ,
            upLowPercent:upLowPercent,
            loop:loop,
        });
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
        console.log("新数据：",row)
    };


    // ----------------分割线----------------------------我自己的方法--------------

    // 公共方法：获得topStar
    getTopStar = () =>{
        const {cardEntity} = this.props
        return  cardEntity.topStar
    }


    // 改变 oneStar
    changeOneStar =(e) =>{
        let oneStar = 10
        // 如果是直接调用，就是为了刷新一下数据
        if(e!== undefined){
            oneStar = e.target.value
        }
        // 根据两个条件改变满级的结果
       const {eachStar,eachCost,oneCost,eachIncCoin,oneIncCoin,eachIncExperience,oneIncExperience,eachLowPercent,oneLowPercent,eachTopPercent,oneTopPercent} = this.state
        const topStar = this.getTopStar();
       const fullRank = oneStar*topStar+eachStar*topStar*(topStar-1)/2
        this.setState({
            oneStar,
            fullRank,
            fullCost:eachCost*fullRank+(oneCost-eachCost),
            fullCostAll:(2*oneCost+eachCost*fullRank-eachCost)*fullRank/2,
            fullIncCoin:eachIncCoin*fullRank+(oneIncCoin-eachIncCoin),
            fullIncExperience:eachIncExperience*fullRank+(oneIncExperience-eachIncExperience),
            fullLowPercent:(eachLowPercent*fullRank+(oneLowPercent-eachLowPercent)).toFixed(2),
            fullTopPercent:(eachTopPercent*fullRank+(oneTopPercent-eachTopPercent)).toFixed(2),
        })
    }

    // 改变eachStar
    changeEachStar = (e) =>{
        const eachStar = e.target.value
        // 根据两个条件改变满级的结果
        const {oneStar,eachCost,oneCost,eachIncCoin,oneIncCoin,eachIncExperience,oneIncExperience,eachLowPercent,oneLowPercent,eachTopPercent,oneTopPercent} = this.state
        const topStar = this.getTopStar();
        const fullRank = oneStar*topStar+eachStar*topStar*(topStar-1)/2
        this.setState(
            {
                eachStar,
                fullRank,
                fullCost:eachCost*fullRank+(oneCost-eachCost),
                fullCostAll:(2*oneCost+eachCost*fullRank-eachCost)*fullRank/2,
                fullIncCoin:(eachIncCoin*fullRank+(oneIncCoin-eachIncCoin)).toFixed(2),
                fullIncExperience:(eachIncExperience*fullRank+(oneIncExperience-eachIncExperience)).toFixed(2),
                fullLowPercent:(eachLowPercent*fullRank+(oneLowPercent-eachLowPercent)).toFixed(2),
                fullTopPercent:(eachTopPercent*fullRank+(oneTopPercent-eachTopPercent)).toFixed(2),
            })
    }

    // 改变OneCost
    changeOneCost =(e) =>{
        const oneCost = e.target.value
        const {fullRank,eachCost} = this.state;
        this.setState(
            {
                fullCost:eachCost*fullRank+(oneCost-eachCost),
                fullCostAll:(2*oneCost+eachCost*fullRank-eachCost)*fullRank/2,
                oneCost,
            }
        )
    }

    // 改变eachCost
    changeEachCost =(e) =>{
        const eachCost = e.target.value
        const {fullRank,oneCost} = this.state;
        this.setState(
            {
                fullCost:eachCost*fullRank+(oneCost-eachCost),
                fullCostAll:(2*oneCost+eachCost*fullRank-eachCost)*fullRank/2,
                eachCost,
            }
        )
    }


    changeOneIncCoin =(e) =>{
        const oneIncCoin = e.target.value
        const {fullRank,eachIncCoin} = this.state;
        this.setState(
            {
                fullIncCoin:(eachIncCoin*fullRank+(oneIncCoin-eachIncCoin)).toFixed(2),
                oneIncCoin,
            }
        )
    }

    changeEachIncCoin =(e) =>{
        const eachIncCoin = e.target.value
        const {fullRank,oneIncCoin} = this.state;
        this.setState(
            {
                fullIncCoin:(eachIncCoin*fullRank+(oneIncCoin-eachIncCoin)).toFixed(2),
                eachIncCoin,
            }
        )
    }

    changeOneIncExperience =(e) =>{
        const oneIncExperience = e.target.value
        const {fullRank,eachIncExperience} = this.state;
        this.setState(
            {
                fullIncExperience:(eachIncExperience*fullRank+(oneIncExperience-eachIncExperience)).toFixed(2),
                oneIncExperience,
            }
        )
    }

    changeEachIncExperience =(e) =>{
        const eachIncExperience = e.target.value
        const {fullRank,oneIncExperience} = this.state;
        this.setState(
            {
                fullIncExperience:(eachIncExperience*fullRank+(oneIncExperience-eachIncExperience)).toFixed(2),
                eachIncExperience,
            }
        )
    }

    changeOneLowPercent =(e) =>{
        const oneLowPercent = e.target.value
        const {fullRank,eachLowPercent} = this.state;
        this.setState(
            {
                fullLowPercent:(eachLowPercent*fullRank+(oneLowPercent-eachLowPercent)).toFixed(2),
                oneLowPercent,
            }
        )
    }

    changeEachLowPercent =(e) =>{
        const eachLowPercent = e.target.value
        const {fullRank,oneLowPercent} = this.state;
        this.setState(
            {
                fullLowPercent:(eachLowPercent*fullRank+(oneLowPercent-eachLowPercent)).toFixed(2),
                eachLowPercent,
            }
        )
    }

    changeOneTopPercent =(e) =>{
        const oneTopPercent = e.target.value
        const {fullRank,eachTopPercent} = this.state;
        this.setState(
            {
                fullTopPercent:(eachTopPercent*fullRank+(oneTopPercent-eachTopPercent)).toFixed(2),
                oneTopPercent,
            }
        )
    }

    changeEachTopPercent =(e) =>{
        const eachTopPercent = e.target.value
        const {fullRank,oneTopPercent} = this.state;
        this.setState(
            {
                fullTopPercent:(eachTopPercent*fullRank+(oneTopPercent-eachTopPercent)).toFixed(2),
                eachTopPercent,
            }
        )
    }

    // ----------------分割线----------------------------我自己的方法--------------


    //------------------------------------我自己的事件处理-----------------------------------

    // 生成预览界面
    handlePreview =() =>{
       // let {count} = this.state
        const {dataSource,fullRank, oneStar,eachStar,eachCost,oneCost,eachIncCoin,oneIncCoin,
            eachIncExperience,oneIncExperience,eachLowPercent,oneLowPercent,eachTopPercent,oneTopPercent} = this.state
        let tempArr =[]
        for(let count=1;count<=fullRank;count++){

            let tempCount =count;
            let star = 0;
            while (tempCount > 0){
                tempCount = tempCount-oneStar-star*eachStar
                star ++;
            }

            const newData = {
                key: count,
                rank: count,
                star,
                cost: (eachCost*count+(oneCost-eachCost)).toFixed(2),
                incCoin:(eachIncCoin*count+(oneIncCoin-eachIncCoin)).toFixed(2),
                incExperience: (eachIncExperience*count+(oneIncExperience-eachIncExperience)).toFixed(2),
                lowPercent:(eachLowPercent*count+(oneLowPercent-eachLowPercent)).toFixed(2),
                topPercent:(eachTopPercent*count+(oneTopPercent-eachTopPercent)).toFixed(2),
            };
            tempArr.push(newData)
        }
        console.log(tempArr)

        this.setState({
            dataSource: tempArr,
        });
    }

    //------------------------------------我自己的事件处理-----------------------------------

    componentDidMount() {
        // 为了开始的时候刷新数据
        this.changeOneStar();
    }


    render() {
        const { dataSource,fullRank,fullCost,fullIncCoin,fullIncExperience,fullLowPercent,fullTopPercent,fullCostAll } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        const {cardEntity} = this.props

        return (
            <div>

                <div>
                    <Row gutter={20}>
                        <Col span={4} >当前卡片:</Col>
                        <Col span={5}>{cardEntity.type}</Col>
                        <Col span={5}>{cardEntity.name}</Col>
                        <Col span={5}>{'最高'+cardEntity.topStar+'星'}</Col>
                    </Row>

                    <Row>
                        <Col span={16}>
                            <div>
                            <Row gutter={20} style={{marginTop:'4px'}} >
                                <Col span={4} >参数设置:</Col>
                                <Col span={8}>1星: <Input type='number' defaultValue={10} suffix="级" onChange={this.changeOneStar} /> </Col>
                                <Col span={8}>每星增加:<Input type='number' defaultValue={0} suffix="级" onChange={this.changeEachStar} /></Col>
                            </Row>

                            <Row gutter={20} style={{marginTop:'4px'}}>
                                <Col offset={4} span={8}>花费(1级): <Input type='number' defaultValue={50} suffix="G" onChange={this.changeOneCost} /> </Col>
                                <Col span={8}>每级增加:<Input type='number' defaultValue={20} suffix="G" onChange={this.changeEachCost} /></Col>
                            </Row>

                            <Row gutter={20} style={{marginTop:'4px'}}>
                                <Col  offset={4}  span={8}>金币(1级): <Input type='number' defaultValue={6.2} suffix="%" onChange={this.changeOneIncCoin} /> </Col>
                                <Col span={8}>每级增加:<Input type='number' defaultValue={0.2} suffix="%" onChange={this.changeEachIncCoin} /></Col>
                            </Row>
                            <Row gutter={20} style={{marginTop:'4px'}}>
                                <Col  offset={4}  span={8}>经验(1级): <Input type='number' defaultValue={6.2} suffix="%" onChange={this.changeOneIncExperience} /> </Col>
                                <Col span={8}>每级增加:<Input type='number' defaultValue={0.2} suffix="%" onChange={this.changeEachIncExperience} /></Col>
                            </Row>
                            <Row gutter={20} style={{marginTop:'4px'}}>
                                <Col  offset={4}  span={8}>概率下限(1级): <Input type='number' defaultValue={0.105} onChange={this.changeOneLowPercent}  /> </Col>
                                <Col span={8}>每级增加:<Input type='number' defaultValue={0.05} onChange={this.changeEachLowPercent}  /></Col>
                            </Row>
                            <Row gutter={20} style={{marginTop:'4px'}}>
                                <Col  offset={4}  span={8}>概率上限(1级): <Input type='number' defaultValue={0.705} onChange={this.changeOneTopPercent}   /> </Col>
                                <Col span={8}>每级增加:<Input type='number' defaultValue={0.05}  onChange={this.changeEachTopPercent} /></Col>
                            </Row>
                            </div>
                        </Col>

                        <Col span={6}>
                            <div>
                                <Row gutter={20} style={{marginTop:'5px'}}>
                                    <Col>满级级数： <Title level={4}>{fullRank}&nbsp;级</Title></Col>

{/*
                                    <Col>满级级数：<Input value={fullRank} suffix="级" readOnly/></Col>
*/}
                                </Row>
                                <Row >
                                    <Col span={12} >满级消耗： <Title level={4}>{fullCost}&nbsp;G</Title></Col>
                                    <Col span={12}>总共消耗：<Title level={4}>{fullCostAll}&nbsp;G</Title></Col>
{/*
                                    <Col span={12} >满级消耗：<Input value={fullCost} suffix="G" readOnly/></Col>
                                    <Col span={12}>总共消耗：<Input value={fullCostAll} suffix="G" readOnly/></Col>
*/}
                                </Row>
                                <Row>
                                    <Col>满级预览:<Title level={4}>{fullIncCoin}&nbsp;%</Title></Col>
                                   {/* <Col>满级预览<Input value={fullIncCoin}  suffix="%" readOnly /></Col>*/}
                                </Row>
                                <Row >

                                    <Col>满级预览:<Title level={4}>{fullIncExperience}&nbsp;%</Title></Col>
                                  {/*  <Col>满级预览<Input value={fullIncExperience} suffix="%" readOnly /></Col>*/}
                                </Row>
                                <Row >

                                    <Col>满级预览: <Title level={4}>{fullLowPercent}</Title></Col>
                                    {/*<Col>满级预览<Input value={fullLowPercent}  readOnly /></Col>*/}
                                </Row>
                                <Row >

                                    <Col>满级预览:<Title level={4}>{fullTopPercent}</Title></Col>
                                 {/*   <Col>满级预览<Input value={fullTopPercent} readOnly /></Col>*/}
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div>
                    <Button onClick={this.handlePreview} type="primary" style={{ marginBottom: 16 }}>
                        生成预览
                    </Button>
                </div>

                <Button disabled onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                  添加一行(暂时不用)
                </Button>

                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={
                        {
                            pageSize:40,
                            hideOnSinglePage:true
                        }
                    }
                />
            </div>
        );
    }
}

export  default EditableTable
