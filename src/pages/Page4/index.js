import React,{Component} from 'react'
import {Card,Row,Col,Table,Icon} from "antd";
import RankingList from '../../pageContent/Page4/RankingList'



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


    state = {
        key: 'tab1',
    };

    onTabChange = (key, type) => {
        console.log("tab->", key)
        this.setState({key})
    };

    render() {
        const {key} = this.state;

        return (
            <div>
                <Card
                    title=""
                    tabList={tabList}
                    activeTabKey={key}
                    onTabChange={key => {
                        this.onTabChange(key, 'key');
                    }}
                >
                    {contentList[key]}
                </Card>
            </div>
        )
    }
}


export default Page4
