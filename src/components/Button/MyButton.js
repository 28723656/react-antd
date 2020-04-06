import React, { Component } from 'react'
import { Button, Card } from 'antd'
import { color_default } from '../../util/enum/colorEnum'

/**
 * 仅仅是一个card    传入 color:string, type:string
 */


class MyButton extends Component {
    render = () => {
        const { color, type, children, ...restProps } = this.props
        const style = type ? {} : { backgroundColor: (color ? color : color_default) ? color : 'white' }
        return type ? <Button {...restProps} type={type}>{children}</Button>
            : <Button {...restProps} type={type} style={style}>{children}</Button>
    }
}

export default MyButton
