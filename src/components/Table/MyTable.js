import { Table } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const initConfig = {
    pagination: { hideOnSinglePage: true, pageSize: 150 },
    rowKey: 'id',
    size: 'middle ',
}

class MyTable extends Component {

    static propTypes = {
        columns: PropTypes.array.isRequired,
        dataSource: PropTypes.array.isRequired,
    }

    render () {
        const { dataSource,...respProps } = this.props;
        console.log('dataSource',dataSource)
        return dataSource &&(
            <Table {...initConfig} {...respProps} dataSource={dataSource}
            />
        )
    }
}

export default MyTable
