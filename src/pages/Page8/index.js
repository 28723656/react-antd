import React, {Component} from 'react'
import PageCard from "../../components/Card/PageCard";


const tabList = [
    {
        key: 'tab1',
        tab: '自定义界面一',
    },
    {
        key: 'tab2',
        tab: '自定义界面二',
    },
];

const contentList = {
    tab1: <h1>啦啦啦</h1>,
    tab2: <h1>lost丶wind</h1>
};

class Page8 extends Component {
    render() {
        return (
            <PageCard
                tabList={tabList}
                contentList={contentList}
                firstPage='tab2'
            />
        )
    }
}

export default Page8
