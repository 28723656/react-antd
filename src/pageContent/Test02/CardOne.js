import React, {Component} from 'react'
import { Menu, Dropdown, Button, Icon, message } from 'antd';
import QingTian from "./Lyric/JayChou/QingTian";
import YeDeDiQiZhang from "./Lyric/JayChou/YeDeDiQiZhang";
import ZaoMengZhe from "./Lyric/YiDong/ZaoMengZhe";
import {connect} from "react-redux";
import {changeSong} from "../../redux/actions";

import PropTypes from 'prop-types'

class CardOne extends Component {

    static propTypes ={
        lyricData: PropTypes.object.isRequired,
        changeSong: PropTypes.func.isRequired
    }

     handleMenuClick =(e) => {
        const {changeSong} = this.props
         let value = '';
         if(e.key === '1'){
             value = '周杰伦-晴天'
         }else if(e.key === '2'){
             value =' 周杰伦-夜的第七章'
         }else if(e.key === '3'){
             value = '以冬-造梦者'
         }
         const newData ={lyricKey: e.key, lyricName: value}
         // 调用redux改变状态
      //   changeSong(newData)
         changeSong(e.key,value)

    }

    render() {

         const {lyricKey,lyricName} = this.props.lyricData;
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1" >
                    <Icon type="customer-service" />
                    <span>周杰伦-晴天</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="customer-service" />
                    <span>周杰伦-夜的第七章</span>
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="customer-service" />
                    以冬-造梦者
                </Menu.Item>
            </Menu>
        );


        return (
            <div >
                <Dropdown overlay={menu}>
                    <Button  >
                        &nbsp;&nbsp;{lyricName!==''?lyricName:'选择歌曲' }<Icon type="down" />
                    </Button>
                </Dropdown>
                <br/>
                <br/>

                {lyricKey === '1'   &&  <QingTian/> }
                {lyricKey === '2'   &&  <YeDeDiQiZhang/> }
                {lyricKey === '3'   &&  <ZaoMengZhe/> }


            </div>


        )
    }
}

export  default connect(
    state =>({lyricData:state.lyricData}),
    {changeSong}
)(CardOne)
