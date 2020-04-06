import React, {Component} from 'react'
import {Row, Col} from 'antd'
import RankingList from '../../pageContent/Page4/RankingList'
import MyPageCard from '../../components/Card/MyPageCard'


const tabList = [
    {
        key: 'tab1',
        tab: '巨人专场',
    },
    {
        key: 'tab2',
        tab: '没有啦',
    },
];

const contentList = {
    tab1: <RankingList />,
    tab2: <h1>说了没有，没做</h1>
};

class Page1 extends Component {
    render() {
        return (
            <MyPageCard
                tabList={tabList}
                contentList={contentList}
            />
        )
    }
}


export default Page1
