import React, { Component } from 'react'
import { Col } from 'antd'

/**
 * 仅仅是一个Col   span:number 1-12     (xs默认乘以2)
 *                isPhoneFull:boolean  (是否手机全屏)
 */

class MyCol extends Component {
    render = () => {
        const {offset, span, isPhoneFull, children, ...restProps } = this.props
        //  1.手机全屏   mdSpan = span*2   xsSpan = 24
        //  2.手机不全屏  mdSpan = span   xsSpan = span*2
        let [mdSpan, xsSpan] = [12, 24]
        if (isPhoneFull) {
            mdSpan = span * 2
            xsSpan = 24
        } else {
            mdSpan = span
            xsSpan = span * 2
        }
        return (<Col {...restProps} xs={xsSpan} md={mdSpan}>
            {children}
        </Col>)
    }
}

export default MyCol
