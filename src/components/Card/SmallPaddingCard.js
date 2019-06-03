import React,{Component} from 'react'
import {Card} from "antd";
import PropTypes from 'prop-types';


const initTitle = '今日计划'
const initBordered=false
const initBodyStyle = {padding:'8px'}

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

        let {title,bordered,bodyStyle} = this.props;
        title = title === undefined?initTitle:title
        bordered = title === undefined?initBordered:bordered
        bodyStyle = bodyStyle === undefined?initBodyStyle:bodyStyle

        return (
            <Card title={title} bordered={bordered} bodyStyle={bodyStyle} >
            </Card>
        )
    }
}

export  default SmallPaddingCard
