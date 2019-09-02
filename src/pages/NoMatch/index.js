import React, {Component} from 'react'
import {Button, Card} from "antd";

class NoMatch extends Component {
    logout = () => {
        this.props.history.push('/')
    }


    render() {
        return (
            <Card title='不存在的页面' bordered={true} bodyStyle={{paddingTop: '2px'}}>
                <p>如果你乱输入路径，本来是可以直接跳转到登录的，但是这算一个彩蛋吧，我非要把这个显示出来，那你就乖乖的点击下面的返回吧。</p>
                <Button onClick={this.logout} type="primary" block>返回主页</Button>
            </Card>
        )
    }
}

export default NoMatch
