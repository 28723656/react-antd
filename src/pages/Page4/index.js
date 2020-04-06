import React,{Component} from 'react'
import {Card,Row,Col,Table,Icon} from "antd";
import RankingList from '../../pageContent/Page4/RankingList'
import MyPageCard from "../../components/Card/MyPageCard";



const tabList = [
    {
        key: 'tab1',
        tab: '排行榜',
    },
    {
        key: 'tab2',
        tab: '我喜欢的',
    },
];

const contentList = {
    tab1: <RankingList />,
    tab2: <h1>第二个tab页面</h1>
};

class Page4 extends Component{

    render() {
        return (
            <MyPageCard
                tabList={tabList}
                contentList={contentList}
            />
        )
    }
}


export default Page4
