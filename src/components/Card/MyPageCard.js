import React, { Component } from 'react'
import { Card } from 'antd'

const initTabList = [
    {
        key: 'tab1',
        tab: '界面一',
    },
    {
        key: 'tab2',
        tab: '界面二',
    },
]

const initContentList = {
    tab1: <h1>第二个界面</h1>,
    tab2: <h1>第二个tab页面</h1>
}

class MyPageCard extends Component {

    state = {
        key: 'tab1',
    }

    onTabChange = (key, type) => {
        this.setState({ key })
    }

    render () {
        // 初始化，即使不传递任何数，也能显示
        const { key } = this.state
        let { tabList, contentList } = this.props
        tabList = tabList ? tabList : initTabList
        contentList = contentList ? contentList : initContentList

        return (
            <Card
                title=""
                tabList={tabList}
                activeTabKey={key}
                onTabChange={key => {
                    this.onTabChange(key, 'key')
                }}
            >
                {contentList[key]}
            </Card>
        )
    }
}

export default MyPageCard
