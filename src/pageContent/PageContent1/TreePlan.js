import React,{Component} from 'react'

import {Tree, Input, Tag,Typography} from 'antd';
import {getAjax} from "../../util/ajax";

const { TreeNode } = Tree;
const { Text } = Typography;
const Search = Input.Search;

// const x = 3;
// const y = 2;
// const z = 1;
// const gData = [];


// const generateData = (_level, _preKey, _tns) => {
//     const preKey = _preKey || '0';
//     const tns = _tns || gData;
//
//     const children = [];
//     for (let i = 0; i < x; i++) {
//         const key = `${preKey}-${i}`;
//         tns.push({ title: key, key });
//         if (i < y) {
//             children.push(key);
//         }
//     }
//     if (_level < 0) {
//         return tns;
//     }
//     const level = _level - 1;
//     children.forEach((key, index) => {
//         tns[index].children = [];
//         return generateData(level, key, tns[index].children);
//     });
// };
// generateData(z);
//
// const dataList = [];
// const generateList = data => {
//     for (let i = 0; i < data.length; i++) {
//         const node = data[i];
//         const key = node.key;
//         dataList.push({ key, title: key });
//         if (node.children) {
//             generateList(node.children);
//         }
//     }
// };
// generateList(gData);

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};



class TreePlan extends Component{

    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
        initData:[],
        treeList:[]
    };

    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    onChange = e => {
        const value = e.target.value;
        const {initData,treeList} = this.state;
        const expandedKeys = treeList
            .map(item => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, initData);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    };

    componentDidMount() {
        getAjax('/plan/plan/tree/-1').then((response) =>{
            if(response.data.flag){
                this.setState({initData:response.data.data});
            }
        });

        let initExpandedKeys = []

        getAjax('/plan/plan/tree').then((response) =>{
            if(response.data.flag){
                const treeList = response.data.data;
                treeList.map((record,index) =>{
                    initExpandedKeys.push(record.key)
                })
                this.setState({treeList,expandedKeys:initExpandedKeys});
            }
        });

        // 为了开始的时候默认展开全部

    }

    render() {
        const { searchValue, expandedKeys, autoExpandParent } = this.state;
        const loop = data =>
            data.map(item => {
                const index = item.title.indexOf(searchValue);
                const beforeStr = item.title.substr(0, index);
                const afterStr = item.title.substr(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <span>
              {beforeStr}
                            <span style={{ color: '#f50' }}>{searchValue}</span>
                            {afterStr}
            </span>
                    ) : (
                        <span>{item.title}</span>
                    );
                if (item.children) {
                    return (

                        <TreeNode key={item.key} title={ <Tag color={item.color}>{item.percent>=100? <Text delete>{item.rank}-> {item.title}</Text>:item.rank+'->'+item.title+' ('+item.percent+'%)'}</Tag>}>
                            {loop(item.children)}
                        </TreeNode>
                    );
                }
                return <TreeNode key={item.key} title={<Tag color={item.color}>{item.percent>=100? <Text delete>{item.rank}-> {item.title}</Text>:item.rank+'->'+item.title+' ('+item.percent+'%)'}</Tag>} />;
            });


        const {initData} = this.state;

        // 记住   default这种东西，只在第一次渲染的时候有效，所以，开始的时候initData为空，渲染了一次，浪费了这个机会

        return (
            <div>
                <Search style={{ marginBottom: 8 }} placeholder="搜索" onChange={this.onChange} />
                {initData.length > 0 &&
                <Tree
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    defaultExpandAll={true}
                >
                    {loop(initData)}
                </Tree>
                }
            </div>
        );
    }
}

export  default TreePlan
