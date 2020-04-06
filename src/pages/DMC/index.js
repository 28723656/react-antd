import React, { Component } from 'react'
import MyPageCard from '../../components/Card/MyPageCard'
import DMCInfo from '../../pageContent/DMC/DMCInfo'
import DMCQA from '../../pageContent/DMC/DMCQA'
import DMCGenerator from '../../pageContent/DMC/DMCGenerator'

const tabList = [
    {
        key: 'tab1',
        tab: '怪物介绍',
    },{
        key: 'tab2',
        tab: '说明',
    },{
        key: 'tab3',
        tab: '生成',
    },
];

const contentList = {
    tab1: <h1><DMCInfo/></h1>,
    tab2: <h1><DMCQA/></h1>,
    tab3: <h1><DMCGenerator/></h1>,
};

class DMC extends Component{

    render() {
        return (
            <MyPageCard
                tabList={tabList}
                contentList={contentList}
            />
        )
    }
}


export default DMC
