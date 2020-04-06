import React, { Component } from 'react'
import { Card } from 'antd'

/**
 * 仅仅是一个card   title:string
 */
class MyCard extends Component {
    render = () => {
        const { restProps, title, children } = this.props
        return (
            <Card {...restProps} title={title ? title : ''} bordered={false} size="small"
                  headStyle={{ backgroundColor: '#FAFAFA',height:'46px',paddingTop:'4px'}}>
                {children}
            </Card>)
    }
}

export default MyCard
