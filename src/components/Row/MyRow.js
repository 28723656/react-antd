import React, { Component } from 'react'
import { Button, Card, Row, Col } from 'antd'
import { color_default } from '../../util/enum/colorEnum'

/**
 * 仅仅是一个Row
 */

class MyRow extends Component {
    render = () => {
        const { children, ...restProps } = this.props
        return (<Row {...restProps} gutter={[16, 16]}>
            {children}
        </Row>)
    }
}

export default MyRow
