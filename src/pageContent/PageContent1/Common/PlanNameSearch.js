import React, {Component} from 'react'
import {AutoComplete} from "antd";


// 用于搜索的数据
const defaultSelections = [
    '读书：学习java编程思想',
    '读书：看小王子',
    '读书:看白夜行',
    '游戏：玩鬼泣5',
    '游戏：玩死亡搁浅',
    '生活：爬山',
    '生活：去杭州玩',
    '生活：去西藏旅行',
    'nmsl',
    '没有什么计划，看看书就行了',
    '这个很好玩唉',
    '死亡笔记',
    '不知道写什么了',
    '心里的雨倾盆而下，却始终淋不到她',
    '小学篱笆旁的蒲公英',
    '一起长大的约定',
    '故事的小黄花',
    '从出生那年就飘着',
    '童年的荡秋千',
    '随记忆一直晃到现在',
    '吹着前奏望着天空',
    '我想起花瓣试着掉落',
    '为你翘课的那一天',
    '花落的那一天',
    '教室的那一间',
    '我怎么看不见',
    '消失的下雨天',
    '我好想再淋一遍',
    '没想到失去的勇气我还留着',
    '好想再问一遍',
    '你会等待还是离开',
    '刮风这天我试过握着你手',
    '但偏偏雨渐渐大到我看你不见',
    '还要多久我才能在你身边',
    '等到放晴的那天也许我会比较好一点',
    '从前从前有个人爱你很久',
    '但偏偏风渐渐把距离吹得好远',
]

class PlanNameSearch extends Component {

    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return nextProps.value
        }
        return null;
    }

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            text: value || '',
            dataSource: [],
        };
    }

    // 任务栏选择后的效果
    onSelect = (value) => {
        this.props.onChange(value);
    }


    // 任务栏显示搜索的内容
    handleSearch = (value) => {
        let resultSelections = defaultSelections.filter((record, index) => record.includes(value))
        while (resultSelections.length > 5) {
            resultSelections.pop()
        }
        if (!value) {
            resultSelections = defaultSelections;
        }
        this.setState({
            dataSource: resultSelections,
        });

        this.props.onChange(value);
    };

    componentDidMount() {
        this.setState({dataSource: defaultSelections})
    }

    render() {

        const {dataSource} = this.state;

        return (
            <AutoComplete
                dataSource={dataSource}
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="计划名称"
            />
        )
    }
}

export default PlanNameSearch;
