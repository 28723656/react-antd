import React, {Component} from 'react'
import { Menu, Dropdown, Button, Icon, message } from 'antd';
import QingTian from "./Lyric/JayChou/QingTian";
import YeDeDiQiZhang from "./Lyric/JayChou/YeDeDiQiZhang";


class CardOne extends Component {


     handleMenuClick =(e) => {
        console.log('click', e);
        this.setState({lyricKey:e.key})

         if(e.key === '1'){
             this.setState({lyricName:'周杰伦-晴天'})
         }else if(e.key === '2'){
             this.setState({lyricName:'周杰伦-夜的第七章'})
         }

    }

    state ={
        // 默认选择的歌曲
        lyricKey:'1',
        lyricName:''
    }



    render() {

         const {lyricKey,lyricName} = this.state;

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
                    3rd item
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


            </div>


        )
    }
}

export default CardOne
