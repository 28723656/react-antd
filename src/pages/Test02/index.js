import React,{Component,Fragment} from 'react'
import { Card } from 'antd';

import CardOne from '../../pageContent/Test02/CardOne'
import {connect} from "react-redux";
import {change_card2} from "../../redux/actions";

const tabList = [
    {
        key: 'tab1',
        tab: '卡片一',
    },
    {
        key: 'tab2',
        tab: '卡片二',
    },
];

const contentList = {
    tab1: <CardOne/>,
    tab2: <p>content2</p>,
};


class Page1 extends Component{

    state = {
        key: 'tab1',
    };

    onTabChange = (key, type) => {
        const {change_card2} = this.props
        console.log("tab->",key)
        change_card2(key)
    };

    render() {

        const {key} = this.props.cardTest2Data;
        debugger
        return (
            <Fragment>
                <Card
                    style={{ width: '100%'}}
                    title="歌词"
                    tabList={tabList}
                    activeTabKey={key}
                    onTabChange={key => {
                        this.onTabChange(key, 'key');
                    }}
                >
                    {contentList[key]}
                </Card>
            </Fragment>
        );

    }
}

export  default connect(
    state =>({cardTest2Data:state.cardTest2Data}),
    {change_card2}
)(Page1)
