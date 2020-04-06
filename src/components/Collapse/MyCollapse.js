import React, { Component } from 'react'
import { Collapse } from 'antd'
import PropTypes from 'prop-types'

const { Panel } = Collapse

const text = (
    <p style={{ paddingLeft: 24 }}>
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
        as a welcome guest in many households across the world.
    </p>
)

const initQAList = [
    {
        question: '回不回答这个问题，这是一个问题？',
        answer: '\t鲁迅曾经说道：\'我可没说！\'',
    }
]

class MyCollapse extends Component {

    static propTypes = {
        QAList: PropTypes.array.isRequired, // question:string, answer:string
    }

    render = () => {
        const { QAList } = this.props
        const result = (QAList && QAList.length > 0) ? QAList : initQAList
        const panelList = result.map((item, index) => {
            return <Panel key={index} header={`Q${index+1}：`+item.question}>{'A：'+item.answer}</Panel>
        })
        return (<Collapse bordered={false} defaultActiveKey={['0']}>
            {panelList}
        </Collapse>)
    }
}

export default MyCollapse
