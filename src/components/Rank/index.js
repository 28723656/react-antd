import React, {Component} from 'react'
import {Card} from "antd";
import {SmallList} from '../List'





class Rank extends Component {


    render() {

        let style = {
            marginTop:13
        }

        const {first} = this.props;
        console.log('first',first)
        if(first){
            style ={marginTop:3}
        }

        return (
            <div>
                <Card title='当前排名' bordered={true} style={style} bodyStyle={{paddingTop: '2px'}}>
                    <SmallList/>
                </Card>
            </div>
        )
    }
}

export default Rank
