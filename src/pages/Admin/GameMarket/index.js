import React, {Component} from 'react'
import {Tabs} from "antd";

const {TabPane} = Tabs;




class GameMarket extends Component {

     onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="商城page1" key="1">
                    先放着，之后想一下再设计商城
                </TabPane>
                <TabPane tab="商城page2" key="2">
                </TabPane>



            </Tabs>
        )
    }
}

export default GameMarket
