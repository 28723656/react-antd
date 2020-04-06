import React, {Component} from 'react'
import MyPageCard from "../../components/Card/MyPageCard";
import CountDownPage from "../../pageContent/Page8/CountDownPage";
import MyItem from "../../pageContent/Page8/MyItem";

const tabList = [
    {
        key: 'tab1',
        tab: '计时器',
    },
    {
        key: 'tab2',
        tab: '我的物品',
    },
];

const contentList = {
    tab1: <CountDownPage/>,
    tab2: <MyItem/>
};

class Page8 extends Component {
    render() {
        return (
            <MyPageCard
                tabList={tabList}
                contentList={contentList}
            />
        )
    }
}

export default Page8
