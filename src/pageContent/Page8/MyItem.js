import React, {Component} from 'react'
import {connect} from "react-redux";

class MyItem extends Component {


    render() {
        const data = this.props.personData;

        return (
            <div>
                <h3>-我的物品-</h3>
                {data.map((record,index)=>
                <p key={record.id} >{index} .{record.name} * {record.number}</p>
                )}
            </div>
        )
    }
}

export default connect(
    state => ({personData: state.personData}),
    {}
)(MyItem)

