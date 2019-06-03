import React,{Component} from 'react'
import {Card} from "antd";
import PropTypes from 'prop-types';


class SmallPaddingCard extends Component{
    /**
     * 要求一下
     * @type {{bodyStyle: *, bordered: (shim|Requireable<boolean>), title: (shim|*|Validator<NonNullable<T>>|(() => any))}}
     */
    static propTypes ={
        title:PropTypes.string.isRequired,
        bordered:PropTypes.bool,
        bodyStyle:PropTypes.object,
    }

    render() {
        return (
            <Card title='今日计划' bordered={false} bodyStyle={{padding:'8px'}} >
            </Card>
        )
    }
}

export  default SmallPaddingCard
