import React, {Component} from 'react'
import {Button, Tabs,message} from "antd";
import SmallTable from "../../../components/Table/SmallTable";
import {deleteAjax, getAjax} from "../../../util/ajax";
import UpdateParentModal from "../../../pageContent/Dictionaries/UpdateParentModal";
import UpdateSonModal from "../../../pageContent/Dictionaries/UpdateSonModal";

const {TabPane} = Tabs;


/**
 * 数据字典
 */

class Dictionaries extends Component {

    state ={
        parentData:[],  // 父数据
        selectedParentData:null, // 要修改的父数据实体
        visible:false, // 模态框可见性
        activeKey:'1', // 默认显示 1

        visibleSon:false,// 子类表格可见性
        sonData:[],   //要查看修改的子类数据
        singleParentData:{},// 单个父类数据
        selectedSonData:{}, // 选中的子类数据
        visibleSonForm:false, // 子类表单
    }

    callback =(key) =>{
        this.setState({activeKey:key})
    }


    // 修改
    updateDict =(record)=>{
        console.log("修改",record)
        this.setState({selectedParentData:record,visible:true});
    }

    // 删除
    deleteDict =(record) =>{
       deleteAjax(`/plan/dictParent`,record).then(response =>{
           if(response.data.flag){
               message.success('删除成功')
               this.initData();
           }else {
               message.warning('有子类，不能删除')
           }
       })
    }

    // 让模态框消失的方法
    handleModalDisappear =() =>{
        this.setState({visible:false});
    }


    //----------------- 处理儿子方法-----------------
    // 显示子类数据
    showDictSon = (record) =>{
        getAjax(`/plan/dict/list/${record.id}`).then(response =>{
            if(response.data.flag){
                this.setState({visibleSon:true,sonData:response.data.data,activeKey:'2',singleParentData:record})
            }else {
                message.warning('暂无子类数据')
                this.setState({visibleSon:true,sonData:[],activeKey:'2',singleParentData:record})
            }

        })
    }

    // 处理儿子更新
    updateDictSon =(record) =>{
        this.setState({selectedSonData:record,visibleSonForm:true})
    }

    handleSonFormDisappear =() =>{
        this.setState({visibleSonForm:false})
    }

    // 删除
    deleteDictSon =(record) =>{
        deleteAjax(`/plan/dict`,record).then(response =>{
            if(response.data.flag){
                message.success('删除成功')
                this.initSonData();
            }else {
                message.warning('删除失败')
            }
        })
    }


    //----------------- end:处理儿子方法-----------------
    initData =()=>{
        getAjax(`/plan/dictParent`).then(response =>{
            this.setState({parentData:response.data.data})
        })
    }

    initSonData =() =>{
       const {singleParentData} = this.state;
        getAjax(`/plan/dict/list/${singleParentData.id}`).then(response =>{
            this.setState({sonData:response.data.data})
        })
    }

    componentDidMount() {
        this.initData();
    }


    render() {

        const {parentData,selectedParentData,visible,sonData,activeKey,singleParentData} = this.state;
        const {selectedSonData,visibleSon,visibleSonForm} = this.state;

        const columns = [
            {
               title:'code',
               dataIndex:'code',
            },
            {
                title:'名称',
                dataIndex:'name',
            },
            {
                title:'描述',
                dataIndex:'description',
                render:(text,record) =>{
                    if(text && text.length >20){
                        return text.substr(0,20)+"...";
                    }else {
                        return text;
                    }
                },
            },
            {
              title:'操作',
              render: (text,record) =>{
                  return <div>
                      <a onClick={() =>this.updateDict(record)}>修改</a>
                      <span>&nbsp;&nbsp;&nbsp;</span>
                      <a onClick={() =>this.deleteDict(record)}>删除</a>
                  </div>
              },
            },
            {
                title:'子类',
                render: (text,record) =>{
                    return  <a onClick={() =>this.showDictSon(record)}>编辑</a>
                },
            },
        ]

        const columnsSon = [
            {
                title:'code',
                dataIndex:'code',
            },
            {
                title:'名称',
                dataIndex:'name',
            },
            {
                title:'描述',
                dataIndex:'description',
                render:(text,record) =>{
                    if(text && text.length >20){
                        return text.substr(0,20)+"...";
                    }else {
                        return text;
                    }
                },
            },
            {
                title:'操作',
                render: (text,record) =>{
                    return <div>
                        <a onClick={() =>this.updateDictSon(record)}>修改</a>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <a onClick={() =>this.deleteDictSon(record)}>删除</a>
                    </div>
                },
            },
        ]

        return (


            <Tabs activeKey={activeKey} onChange={this.callback}>
                <TabPane tab="父类" key='1' >
                    <Button type='primary' onClick={this.updateDict}>+添加数据字典</Button>
                    <SmallTable columns={columns} dataSource={parentData}/>
                    {selectedParentData !== null && <UpdateParentModal data={selectedParentData} visible={visible} handleModalDisappear={this.handleModalDisappear} initData={this.initData}/>}
                </TabPane>
                {visibleSon &&   <TabPane tab={'编辑子类：（'+singleParentData.name+')'} key='2' >
                    <div>
                        <Button type='primary' onClick={this.updateDictSon}>+添加数据字典</Button>
                        <SmallTable columns={columnsSon} dataSource={sonData}/>
                        {selectedSonData !== null && <UpdateSonModal data={selectedSonData} visible={visibleSonForm} handleModalDisappear ={this.handleSonFormDisappear} initData={this.initSonData} parentData={singleParentData} ></UpdateSonModal>}
                    </div>
                </TabPane>}

            </Tabs>


        )
    }
}

export default Dictionaries
