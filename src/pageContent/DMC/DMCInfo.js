import React, { Component } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import MyCard from '../../components/Card/MyCard'
import MyButton from '../../components/Button/MyButton'
import {
    color_DeepSkyBlue, color_LawnGreen,
    color_MintCream,
    color_OrangeRed,
    color_SeaShell,
    color_Tomato
} from '../../util/enum/colorEnum'
import MyRow from '../../components/Row/MyRow'
import MyCol from '../../components/Col/MyCol'
import MyList from '../../components/List/MyList'
import { DEFAULT_CONFIG, dmcColumns, dmcDataSource } from '../../util/dmc/default'
import MyTable from '../../components/Table/MyTable'
import { DMC_DIFFICULTY } from '../../util/enum/dmcDifficultyEnum'
import { Col,message } from 'antd'

class DMCInfo extends Component {

    state = {
        data: [], // 数据
        type: DMC_DIFFICULTY.DEFAULT, // 类型
    }

    // 点击按钮
    handleClick = (value) => {
        switch (value) {
            case DMC_DIFFICULTY.DEFAULT:
                this.setState({ data: DEFAULT_CONFIG, type: DMC_DIFFICULTY.DEFAULT })
                break
        }
    }
    onCopy = (text, result) => {
       if(result){
           message.success('复制成功！')
       }else {
           message.error('复制失败！')
       }
    }

    render = () => {
        const { data, type } = this.state
        let copyText = ''
        if (data && data.length > 0) {
            copyText = data.reduce((pre, cur) => {
                pre += cur + '\n'
                return pre
            }, '')
        }
        const header = (
            <MyRow>
                <Col xs={12} md={12}>血宫配置（{type}）如下</Col>
                <Col xs={{ span: 8, offset: 4 }} md={{ span: 4, offset: 8 }}>
                    <CopyToClipboard text={copyText} onCopy={this.onCopy}>
                        <MyButton type='primary'>复制</MyButton>
                    </CopyToClipboard>
                </Col>
            </MyRow>)
        return (<>
            <MyRow>
                <MyCol>
                    <MyCard title="生成配置">
                        <MyRow>
                            <MyCol span={4}><MyButton
                                onClick={() => this.handleClick(DMC_DIFFICULTY.DEFAULT)}>{DMC_DIFFICULTY.DEFAULT}</MyButton></MyCol>
                            <MyCol span={4}><MyButton onClick={() => this.handleClick(DMC_DIFFICULTY.EASY)}
                                                      color={color_SeaShell}>{DMC_DIFFICULTY.EASY}</MyButton></MyCol>
                            <MyCol span={4}><MyButton onClick={() => this.handleClick(DMC_DIFFICULTY.MIDDLE)}
                                                      color={color_MintCream}>{DMC_DIFFICULTY.MIDDLE}</MyButton></MyCol>
                            <MyCol span={4}><MyButton onClick={() => this.handleClick(DMC_DIFFICULTY.HARD)}
                                                      color={color_DeepSkyBlue}>{DMC_DIFFICULTY.HARD}</MyButton></MyCol>
                            <MyCol span={4}><MyButton onClick={() => this.handleClick(DMC_DIFFICULTY.HELL)}
                                                      color={color_OrangeRed}>{DMC_DIFFICULTY.HELL}</MyButton></MyCol>
                            <MyCol span={4}><MyButton onClick={() => this.handleClick(DMC_DIFFICULTY.CUSTOMIZE)}
                                                      type="primary">{DMC_DIFFICULTY.CUSTOMIZE}</MyButton></MyCol>
                        </MyRow>
                        <MyRow>
                            <MyList header={header} dataSource={data}/>
                        </MyRow>
                    </MyCard>
                </MyCol>
            </MyRow>

        </>)

    }
}

export default DMCInfo
