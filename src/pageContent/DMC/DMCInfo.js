import React, { Component } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import MyCard from '../../components/Card/MyCard'
import MyButton from '../../components/Button/MyButton'
import { color_DeepSkyBlue, color_MintCream, color_OrangeRed, color_SeaShell } from '../../util/enum/colorEnum'
import MyRow from '../../components/Row/MyRow'
import MyCol from '../../components/Col/MyCol'
import MyList from '../../components/List/MyList'
import { DEFAULT_CONFIG, DIFFICULTY_CONFIG, dmcDataSource } from '../../util/dmc/default'
import { DMC_DIFFICULTY } from '../../util/enum/dmcDifficultyEnum'
import { Col, message } from 'antd'
import { getRandomArrayFromArray, getRandomArrayFromTo, getRandomNumberFromTo } from '../../util/randomUtil'
import {
    getEnemyArrayByIdsAndTotalNumber,
    getSpecialLevel,
    translateArrayToConfiguration
} from '../../util/dmc/enemyUtil'

class DMCInfo extends Component {

    state = {
        data: [], // 数据
        type: DMC_DIFFICULTY.DEFAULT, // 类型
    }
    // 点击按钮
    handleClick = (type) => {
        let difficultConfig = {}
        switch (type) {
            case DMC_DIFFICULTY.DEFAULT:
                this.setState({ data: DEFAULT_CONFIG, type: DMC_DIFFICULTY.DEFAULT })
                return
            case DMC_DIFFICULTY.EASY:
                difficultConfig = DIFFICULTY_CONFIG.easyType
                type = DMC_DIFFICULTY.EASY
                break
            case DMC_DIFFICULTY.MIDDLE:
                difficultConfig = DIFFICULTY_CONFIG.middleType
                type = DMC_DIFFICULTY.MIDDLE
                break
            case DMC_DIFFICULTY.HARD:
                difficultConfig = DIFFICULTY_CONFIG.hardType
                type = DMC_DIFFICULTY.HARD
                break
            case DMC_DIFFICULTY.HELL:
                difficultConfig = DIFFICULTY_CONFIG.hellType
                type = DMC_DIFFICULTY.HELL
                break
            case DMC_DIFFICULTY.CUSTOMIZE:
                message.info('自定义功能后续再开发')
                return
        }
        let finalEnemyList = [] // 最终的结果
        let enemyRange = [] // 难度范围
        let enemyType = 0 // 怪物有几种
        let enemyNumber = 0 // 怪物数量
        let enemyTypeRange = [] // 怪物是哪几种难度的
        let enemyObject = [] // 单次怪物分配结果
        const { enemyRangeConfig, enemyTypeConfig, enemyNumberConfig } = difficultConfig
        for (let n = 1; n <= 101; n++) {
            // 在这里处理特殊的楼层
            if (n % 20 === 0 || n === 101) {
                finalEnemyList.push(getSpecialLevel(n))
                continue
            }
            enemyRange = [enemyRangeConfig.begin(n), enemyRangeConfig.end(n)]
            enemyType = getRandomNumberFromTo(enemyTypeConfig.begin(n), enemyTypeConfig.end(n))
            enemyNumber = getRandomNumberFromTo(enemyNumberConfig.begin(n), enemyNumberConfig.end(n))
            // 怪物分配，首先根据怪物有几类得到对应的数组
            enemyTypeRange = getRandomArrayFromTo(enemyRange[0], enemyRange[enemyRange.length - 1], enemyType)
            const tempEnemyIdList = enemyTypeRange.flatMap(value => [value * 2 - 1, value * 2])  // 由于id为[难度*2-1，难度*2]
            // 得到了idList,从这里面选出确切的id集合
            const enemyIdList = getRandomArrayFromArray(tempEnemyIdList, enemyType)
            // 得到一个拥有像{id:12,num:4}的对象的数组
            const enemyIdAndNumberList = getEnemyArrayByIdsAndTotalNumber(enemyIdList, enemyNumber)
            // 通过id找到那个怪物，并加上数量
            enemyObject = enemyIdAndNumberList.map(item => {
                const enemy = dmcDataSource.find(dmcItem => dmcItem.id === item.id)
                return { ...enemy, num: item.num }
            })
            finalEnemyList.push(enemyObject)
        }
        console.log('finalEnemyList', finalEnemyList)
        // 把数据处理成配置文件的样子
        const data = translateArrayToConfiguration(finalEnemyList)
        this.setState({ data, type })
        // 把数据处理成人能看懂的样子

    }

    onCopy = (text, result) => {
        if (result) {
            message.success('复制成功！')
        } else {
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
