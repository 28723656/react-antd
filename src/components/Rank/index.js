import React, {Component} from 'react'
import {Card} from "antd";
import {SmallList} from '../List'





class Rank extends Component {


    render() {
        return (
            <div>
                <Card title='当前排名' bordered={true} bodyStyle={{paddingTop: '2px'}}>
                    <SmallList/>
                </Card>
            </div>
        )
    }
}

export default Rank
