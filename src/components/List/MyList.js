import React, { Component } from 'react'
import { List, Typography } from 'antd'
import PropTypes from 'prop-types'

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
]

const initConfig = {
    header: '我是头部',
    size: 'small',
    dataSource: data,
    bordered: true,
    renderItem: item => (<List.Item> {item}</List.Item>)
}

class MyList extends Component {
    static propTypes = {
        dataSource: PropTypes.array.isRequired,
    }

    render () {
        const { dataSource, ...respProps } = this.props

        return dataSource && dataSource.length > 0 && (
            <List
                {...initConfig}
                {...respProps}
                dataSource={dataSource}
            />
        )
    }
}

export default MyList
