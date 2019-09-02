import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';
import { Table, Input, Button, Popconfirm, Form,Row,Col,Typography,message  } from 'antd';
import PropTypes from "prop-types";
import {addAjax, getAjax, updateAjax} from "../../util/ajax";

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
            },
       /*     {
                title: '操作',
                dataIndex: 'operation',
                width: '10%',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                            <a onClick={() => this.handleDelete(record.key)}>删除</a>
                    ) : null,
            },*/
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

            loadingButton:false,

            // 新增的一些属性
        /*    oneStar:10,
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
            fullTopPercent:0.8,*/
            configEntity:{
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
            },
        };
    }

/*    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };*/

  /*  handleAdd = () => {
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
    };*/

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
        let oneStar = e
        // 如果是直接调用，就是为了刷新一下数据
        if(e.target!== undefined){
            oneStar = e.target.value
        }
        // 根据两个条件改变满级的结果
        const {configEntity} =  this.state;
       const {eachStar,eachCost,oneCost,eachIncCoin,oneIncCoin,eachIncExperience,oneIncExperience,eachLowPercent,oneLowPercent,eachTopPercent,oneTopPercent} = this.state.configEntity
        const topStar = this.getTopStar();
       const fullRank = oneStar*topStar+eachStar*topStar*(topStar-1)/2
        this.setState({
            configEntity:{
                ...configEntity,   // 解构，然后后面的属性会覆盖前面的属性
                oneStar,
                fullRank,
                fullCost:eachCost*fullRank+(oneCost-eachCost),
                fullCostAll:(2*oneCost+eachCost*fullRank-eachCost)*fullRank/2,
                fullIncCoin:eachIncCoin*fullRank+(oneIncCoin-eachIncCoin),
                fullIncExperience:eachIncExperience*fullRank+(oneIncExperience-eachIncExperience),
                fullLowPercent:eachLowPercent*fullRank+(oneLowPercent-eachLowPercent),
                fullTopPercent:eachTopPercent*fullRank+(oneTopPercent-eachTopPercent),
            },
        })
    }

    // 改变eachStar
    changeEachStar = (e) =>{
        const eachStar = e.target.value
        // 根据两个条件改变满级的结果
        const {configEntity} =  this.state;
        const {oneStar,eachCost,oneCost,eachIncCoin,oneIncCoin,eachIncExperience,oneIncExperience,eachLowPercent,oneLowPercent,eachTopPercent,oneTopPercent} = this.state.configEntity
        const topStar = this.getTopStar();
        const fullRank = oneStar*topStar+eachStar*topStar*(topStar-1)/2
        this.setState(
            {
                configEntity:{
                    ...configEntity,   // 解构，然后后面的属性会覆盖前面的属性
                    eachStar,
                    fullRank,
                    fullCost:eachCost*fullRank+(oneCost-eachCost),
                    fullCostAll:(2*oneCost+eachCost*fullRank-eachCost)*fullRank/2,
                    fullIncCoin:eachIncCoin*fullRank+(oneIncCoin-eachIncCoin),
                    fullIncExperience:eachIncExperience*fullRank+(oneIncExperience-eachIncExperience),
                    fullLowPercent:eachLowPercent*fullRank+(oneLowPercent-eachLowPercent),
                    fullTopPercent:eachTopPercent*fullRank+(oneTopPercent-eachTopPercent),
                },
            })
    }

    // 改变OneCost
    changeOneCost =(e) =>{
        const oneCost = e.target.value
        const {configEntity} =  this.state;
        const {fullRank,eachCost} = this.state.configEntity;
        this.setState(
            {
                configEntity:{
                    ...configEntity,   // 解构，然后后面的属性会覆盖前面的属性
                    fullCost:eachCost*fullRank+(oneCost-eachCost),
                    fullCostAll:(2*oneCost+eachCost*fullRank-eachCost)*fullRank/2,
                    oneCost,
                },
            }
        )
    }

    // 改变eachCost
    changeEachCost =(e) =>{
        const eachCost = e.target.value
        const {configEntity} =  this.state;
        const {fullRank,oneCost} = this.state.configEntity;
        this.setState(
            {
                configEntity:{
                    ...configEntity,   // 解构，然后后面的属性会覆盖前面的属性
                    fullCost:eachCost*fullRank+(oneCost-eachCost),
                    fullCostAll:(2*oneCost+eachCost*fullRank-eachCost)*fullRank/2,
                    eachCost,
                },
            }
        )
    }


    changeOneIncCoin =(e) =>{
        const oneIncCoin = e.target.value
        const {configEntity} =  this.state;
        const {fullRank,eachIncCoin} = this.state.configEntity;
        this.setState(
            {
                configEntity:{
                    ...configEntity,   // 解构，然后后面的属性会覆盖前面的属性
                    fullIncCoin:(eachIncCoin*fullRank+(oneIncCoin-eachIncCoin)).toFixed(2),
                    oneIncCoin,
                },
            }
        )
    }

    changeEachIncCoin =(e) =>{
        const eachIncCoin = e.target.value
        const {configEntity} =  this.state;
        const {fullRank,oneIncCoin} = this.state.configEntity;
        this.setState(
            {
                configEntity:{
                    ...configEntity,   // 解构，然后后面的属性会覆盖前面的属性
                    fullIncCoin:(eachIncCoin*fullRank+(oneIncCoin-eachIncCoin)).toFixed(2),
                    eachIncCoin,
                },

            }
        )
    }

    changeOneIncExperience =(e) =>{
        const oneIncExperience = e.target.value
        const {configEntity} =  this.state;
        const {fullRank,eachIncExperience} = this.state.configEntity;
        this.setState(
            {
                configEntity:{
                    ...configEntity,   // 解构，然后后面的属性会覆盖前面的属性
                    fullIncExperience:(eachIncExperience*fullRank+(oneIncExperience-eachIncExperience)).toFixed(2),
                    oneIncExperience,
                },
            }
        )
    }

    changeEachIncExperience =(e) =>{
        const eachIncExperience = e.target.value
        const {configEntity} =  this.state;
        const {fullRank,oneIncExperience} = this.state.configEntity;
        this.setState(
            {
                configEntity:{
                    ...configEntity,   // 解构，然后后面的属性会覆盖前面的属性
                    fullIncExperience:(eachIncExperience*fullRank+(oneIncExperience-eachIncExperience)).toFixed(2),
                    eachIncExperience,
                },
            }
        )
    }

    changeOneLowPercent =(e) =>{
        const oneLowPercent = e.target.value
        const {configEntity} =  this.state;
        const {fullRank,eachLowPercent} = this.state.configEntity;
        this.setState(
            {
                configEntity:{
                    ...configEntity,   // 解构，然后后面的属性会覆盖前面的属性
                    fullLowPercent:(eachLowPercent*fullRank+(oneLowPercent-eachLowPercent)).toFixed(2),
                    oneLowPercent,
                },
            }
        )
    }

    changeEachLowPercent =(e) =>{
        const eachLowPercent = e.target.value
        const {configEntity} =  this.state;
        const {fullRank,oneLowPercent} = this.state.configEntity;
        this.setState(
            {
                configEntity:{
                    ...configEntity,   // 解构，然后后面的属性会覆盖前面的属性
                    fullLowPercent:(eachLowPercent*fullRank+(oneLowPercent-eachLowPercent)).toFixed(2),
                    eachLowPercent,
                },

            }
        )
    }

    changeOneTopPercent =(e) =>{
        const oneTopPercent = e.target.value
        const {configEntity} =  this.state;
        const {fullRank,eachTopPercent} = this.state.configEntity;
        this.setState(
            {
                configEntity:{
                    ...configEntity,   // 解构，然后后面的属性会覆盖前面的属性
                    fullTopPercent:(eachTopPercent*fullRank+(oneTopPercent-eachTopPercent)).toFixed(2),
                    oneTopPercent,
                },

            }
        )
    }

    changeEachTopPercent =(e) =>{
        const eachTopPercent = e.target.value
        const {configEntity} =  this.state;
        const {fullRank,oneTopPercent} = this.state.configEntity;
        this.setState(
            {
                configEntity:{
                    ...configEntity,   // 解构，然后后面的属性会覆盖前面的属性
                    fullTopPercent:(eachTopPercent*fullRank+(oneTopPercent-eachTopPercent)).toFixed(2),
                    eachTopPercent,
                },
            }
        )
    }

    // ----------------分割线----------------------------我自己的方法--------------


    //------------------------------------我自己的事件处理-----------------------------------

    // 生成预览界面
    handlePreview =() =>{
        const {cardEntity} = this.props
        const {fullRank, oneStar,eachStar,eachCost,oneCost,eachIncCoin,oneIncCoin,
            eachIncExperience,oneIncExperience,eachLowPercent,oneLowPercent,eachTopPercent,oneTopPercent} = this.state.configEntity
        let tempArr =[]
        let rank = 1;
        for(let count=1;count<=fullRank;count++){
            let tempCount =count;
            let star = 0;
            while (tempCount > 0){
                tempCount = tempCount-oneStar-star*eachStar
                star ++;
            }
            let newData = {
                cardId:cardEntity.id,
                key: count,
                rank: count,
                star,
                cost: eachCost*count+(oneCost-eachCost),
            };
            // 处理技能的问题
            if(cardEntity.skill === 1){
                newData ={
                    ...newData,
                    incCoin:(eachIncCoin*count+(oneIncCoin-eachIncCoin)).toFixed(2),
                }
            }else if(cardEntity.skill === 2){
                newData ={
                    ...newData,
                    incExperience: (eachIncExperience*count+(oneIncExperience-eachIncExperience)).toFixed(2),
                }
            }else if(cardEntity.skill === 3){
                newData ={
                    ...newData,
                    lowPercent:(eachLowPercent*count+(oneLowPercent-eachLowPercent)).toFixed(2),
                    topPercent:(eachTopPercent*count+(oneTopPercent-eachTopPercent)).toFixed(2),
                    hopePercent:(((eachLowPercent*count+(oneLowPercent-eachLowPercent))+(eachTopPercent*count+(oneTopPercent-eachTopPercent)))/2).toFixed(2)
                }
            }

            tempArr.push(newData)
        }
        console.log(tempArr)

        this.setState({
            dataSource: tempArr,
        });
    }

    // 保存我的配置
    handleSaveConfig = () =>{

        console.log('--保存配置--')
        const {cardEntity} = this.props;
        let {configEntity,dataSource} = this.state

        if(dataSource.length === 0){
            message.warning('请先生成预览，确认无误后再点保存配置');
            return ;
        }

        //  ----------先保存上面的配置信息 ------------

        this.setState({loadingButton:true})

        // 稍微赋值一下，把卡片id传一下
        configEntity.cardId= cardEntity.id
        configEntity.topStar = cardEntity.topStar
        // 保存配置
        configEntity = this.deleteUselessProperties(cardEntity.skill,configEntity);
        console.log(configEntity)

        addAjax(`/game/config`,configEntity)
            .then(response =>{
                if(response.data.flag){
                    // -------------再保存下面的预览信息-----------
                    addAjax(`/game/cost`,dataSource)
                        .then(result =>{
                            if(result.data.flag){
                                message.success('保存成功');
                            }else {
                                message.warning('保存失败')
                            }
                            this.setState({loadingButton:false})
                        })
                }else {
                    message.warning('保存失败')
                    this.setState({loadingButton:false})
                }
            });
    }

    // 一个公共方法,删除无用属性
    deleteUselessProperties =(skill,configEntity) =>{
        // 这里为了那个skill要判断一下，防止给数据库塞一些没用的数据
        if(skill === 1){
            delete configEntity.oneIncExperience
            delete configEntity.eachIncExperience
            delete configEntity.fullIncExperience

            delete configEntity.oneLowPercent
            delete configEntity.eachLowPercent
            delete configEntity.fullLowPercent

            delete configEntity.oneTopPercent
            delete configEntity.eachTopPercent
            delete configEntity.fullTopPercent

        }else if(skill === 2){
            delete configEntity.oneIncCoin
            delete configEntity.eachIncCoin
            delete configEntity.fullIncCoin

            delete configEntity.oneLowPercent
            delete configEntity.eachLowPercent
            delete configEntity.fullLowPercent

            delete configEntity.oneTopPercent
            delete configEntity.eachTopPercent
            delete configEntity.fullTopPercent
        }else if(skill === 3){
            delete configEntity.oneIncCoin
            delete configEntity.eachIncCoin
            delete configEntity.fullIncCoin

            delete configEntity.oneIncExperience
            delete configEntity.eachIncExperience
            delete configEntity.fullIncExperience
        }
        return configEntity;
    }

    //------------------------------------我自己的事件处理-----------------------------------

    componentDidMount() {
        // 为了开始的时候刷新数据
        //this.changeOneStar();

        // 修改为数据库版本
        // 1.从数据库获取数据，加载配置参数
        const {cardEntity} = this.props
        getAjax(`/game/config/${cardEntity.id}`)
            .then(response =>{
                const result = response.data;
                if(result.flag){
                    this.setState({configEntity:result.data})
                    console.log('config:',result.data)
                    if(result.data.topStar !== cardEntity.topStar){
                        // 为了开始的时候刷新数据
                        this.changeOneStar(result.data.oneStar);
                        message.warning('您修改了星级，请重新配置');
                    }
                }else {
                    message.warning('请设置卡片升级配置，并保存');
                    // 为了开始的时候刷新数据
                    this.changeOneStar(10);
                }
            })

    }


    render() {
        const {cardEntity} = this.props
        const { dataSource,loadingButton } = this.state;
        const { oneStar,eachStar,eachCost,oneCost,eachIncCoin,oneIncCoin,eachIncExperience,oneIncExperience,eachLowPercent,oneLowPercent,eachTopPercent,oneTopPercent,fullRank,fullCost,fullIncCoin,fullIncExperience,fullLowPercent,fullTopPercent,fullCostAll } = this.state.configEntity;
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

        // 处理skill的问题，让columns显示对应的内容
        if(cardEntity.skill === 1){
            // 从数组下标为5开始，（包括自身）
         columns.splice(4,4);
        }else if(cardEntity.skill === 2){
            columns.splice(3,1);
            columns.splice(4,3);
        }else if(cardEntity.skill === 3){
            columns.splice(3,2);
        }




        return (
            <div>

                <div>
                    <Row >
                        <Col xs={{ span:6}} md={{span:3}} >当前卡片:</Col>
                        <Col span={3}>{cardEntity.type  || '暂无类型'}</Col>
                        <Col span={3}>{cardEntity.name  || '暂无名称'}</Col>
                        <Col xs={{ span:6}} xs={{ span:4}}>{cardEntity.skill===1?'金币加成':(cardEntity.skill===2?'经验加成':(cardEntity.skill===3?'免费抽卡加成':'没有加成'))}</Col>
                        <Col span={4}>{'最高'+cardEntity.topStar+'星' || '暂无星级'}</Col>
                    </Row>
                    <hr />

                    <Row>
                        <Col xs={{ span:14}} md={{ span:16}}>
                            <div>
                            <Row gutter={10} style={{marginTop:'4px'}} >
                                <Col span={4} >参数设置:</Col>
                                <Col span={8}>1星: <Input type='number' value={oneStar} suffix="级" onChange={this.changeOneStar} /> </Col>
                                <Col span={8}>每星增加:<Input type='number' value={eachStar} suffix="级" onChange={this.changeEachStar} /></Col>
                            </Row>

                            <Row gutter={10} style={{marginTop:'4px'}}>
                                <Col offset={4} span={8}>花费(1级): <Input type='number' value={oneCost} suffix="G" onChange={this.changeOneCost} /> </Col>
                                <Col span={8}>每级增加:<Input type='number' value={eachCost} suffix="G" onChange={this.changeEachCost} /></Col>
                            </Row>
                                {
                                    cardEntity.skill===1 &&
                                    <Row gutter={10} style={{marginTop:'4px'}}>
                                        <Col  offset={4}  span={8}>金币(1级): <Input type='number' value={oneIncCoin} suffix="%" onChange={this.changeOneIncCoin} /> </Col>
                                        <Col span={8}>每级增加:<Input type='number' value={eachIncCoin} suffix="%" onChange={this.changeEachIncCoin} /></Col>
                                    </Row>
                                }

                                {
                                    cardEntity.skill===2 &&
                                    <Row gutter={10} style={{marginTop:'4px'}}>
                                        <Col  offset={4}  span={8}>经验(1级): <Input type='number' value={oneIncExperience} suffix="%" onChange={this.changeOneIncExperience} /> </Col>
                                        <Col span={8}>每级增加:<Input type='number' value={eachIncExperience} suffix="%" onChange={this.changeEachIncExperience} /></Col>
                                    </Row>
                                }

                                {
                                    cardEntity.skill===3 &&
                                    <div>
                                        <Row gutter={10} style={{marginTop:'4px'}}>
                                            <Col  offset={4}  span={8}>概率下限(1级): <Input type='number' value={oneLowPercent} onChange={this.changeOneLowPercent}  /> </Col>
                                            <Col span={8}>每级增加:<Input type='number' value={eachLowPercent} onChange={this.changeEachLowPercent}  /></Col>
                                        </Row>
                                        <Row gutter={10} style={{marginTop:'4px'}}>
                                            <Col  offset={4}  span={8}>概率上限(1级): <Input type='number' value={oneTopPercent} onChange={this.changeOneTopPercent}   /> </Col>
                                            <Col span={8}>每级增加:<Input type='number' value={eachTopPercent}  onChange={this.changeEachTopPercent} /></Col>
                                        </Row>
                                    </div>
                                }

                            </div>
                        </Col>

                        <Col xs={{ span:9}} md={{ span:6}}>
                            <div>
                                <Row gutter={10} style={{marginTop:'5px'}}>
                                    <Col>满级级数： <Title level={4}>{fullRank || 0}&nbsp;级</Title></Col>
                                </Row>
                                <Row >
                                    <Col span={12} >满级消耗： <Title level={4}>{fullCost || 0}&nbsp;G</Title></Col>
                                    <Col span={12}>总共消耗：<Title level={4}>{fullCostAll || 0}&nbsp;G</Title></Col>
                                </Row>
                                {cardEntity.skill === 1 &&
                                    <Row>
                                        <Col>满级预览:<Title level={4}>{fullIncCoin || 0}&nbsp;%</Title></Col>
                                    </Row>
                                }
                                {
                                    cardEntity.skill === 2 &&
                                    <Row>
                                        <Col>满级预览:<Title level={4}>{fullIncExperience || 0}&nbsp;%</Title></Col>
                                    </Row>
                                }

                                {
                                    cardEntity.skill === 3 &&
                                    <div>
                                        <Row >
                                            <Col>满级预览: <Title level={4}>{fullLowPercent || 0}</Title></Col>
                                        </Row>
                                        <Row >

                                            <Col>满级预览:<Title level={4}>{fullTopPercent || 0}</Title></Col>
                                        </Row>
                                    </div>
                                }

                            </div>
                        </Col>
                    </Row>
                    <hr />
                </div>

                <div>
                    <Row gutter={50}>
                        <Col xs={{offset:5, span:4}} md={{offset:5, span:4}} >
                            <Button onClick={this.handlePreview} type="primary">
                                生成预览
                            </Button>
                        </Col>
                        <Col xs={{offset:2, span:4}} md={{offset:2, span:4}}>
                            <Button loading={loadingButton} onClick={this.handleSaveConfig} type="primary">
                                保存配置
                            </Button>
                        </Col>


                    </Row>
                    <hr />

                </div>

            {/*    <Button disabled onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                  添加一行(暂时不用)
                </Button>*/}

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
