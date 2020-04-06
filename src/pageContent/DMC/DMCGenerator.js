import React, { Component } from 'react'
import MyCollapse from '../../components/Collapse/MyCollapse'

const QAList = [
    {
        question: '为什么我的游戏会突然闪退？',
        answer: '关闭所有的输入法，禁用shift可以切换输入法的功能，只用用英文输入法'
    }, {
        question: '能否在第一关就打boss?',
        answer: '不行。第一关进去后直接pass了，然后进入第二关'
    },{
        question: '能否在第二关就打boss?',
        answer: '可以。可以正常的通关boss，但是时间可能不够，所以如果安排第二关打boss的话，第一关就调很多小兵凑时间就行了，第二关以后的任意关都能选择boss'
    },{
        question: '能够调2个同样的boss?',
        answer: '不行，只会出现一个',
    },{
        question: '能够调2个不一样的boss?',
        answer: '不行，2测试调2个boss的时候，只出现了后面一个，而且会导致后面关卡的敌人发呆，敌人失去了AI',
    },{
        question: '同场景最多可以出多少个同样敌人？',
        answer: '8个。我的测试如下，调20个同样的怪，但是第一波只出现6只，当杀了5只怪，剩下最后一只的时候，会重生7只怪（如果剩下的还有7只的话）。'
    },{
        question:'同场景最多可以容纳多少个不同的敌人？',
        answer:'8个。但是有时候只会出现6个，具体的机制我就不知道了',
    },{
       question:'文件中的TimeToSpawnSecondary是什么意思？',
        answer:'经过测试，是第一波剩下的敌人过几秒出，如果第一波敌人已经大于6个还是8个，则后面的敌人不会出现了，所以我不用这个属性了。'
    }
]

class DMCGenerator extends Component {

    render = () => {
        return <MyCollapse QAList={QAList}/>
    }
}

export default DMCGenerator
