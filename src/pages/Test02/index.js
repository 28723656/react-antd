import React,{Component} from 'react'
import { Card } from 'antd';

import CardOne from '../../pageContent/Test02/CardOne'

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
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {
        return (
            <div>

                <Card
                    style={{ width: '100%'}}
                    title="歌词"
                    tabList={tabList}
                    activeTabKey={this.state.key}
                    onTabChange={key => {
                        this.onTabChange(key, 'key');
                    }}
                >
                    {contentList[this.state.key]}
                </Card>

            </div>
        );

    }
}


export default Page1
