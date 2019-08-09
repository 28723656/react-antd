import React, {Component} from 'react'
import {Card, DatePicker, Tabs} from "antd";

const {TabPane} = Tabs;



class Score extends Component {

     onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="我的积分" key="1">
                    <Card title='『2019 年』' bordered={true} bodyStyle={{paddingTop: '2px'}}>
                    </Card>
                </TabPane>
                <TabPane tab="历史记录" key="2">
                    <Card title='『2019 』' bordered={true} bodyStyle={{paddingTop: '2px'}}>


                    </Card>
                </TabPane>



            </Tabs>
        )
    }
}

export default Score
