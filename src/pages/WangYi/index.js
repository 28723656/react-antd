import React, {Component} from 'react'
import {Card, DatePicker, List, Tabs, Typography,Collapse,Input } from "antd";
import {getWangYiAjax} from "../../util/ajax";

const {TabPane} = Tabs;
const { Panel } = Collapse;
const { Search } = Input;

class Log extends Component {

    state ={
        songMenuId:2809469700, // 歌单id,默认为我的周杰伦的歌
        songData:[],  // 歌单信息
        comments:[],  // 对应歌词的热评
        lyric:'',
    }

    // 搜索
    onSearch =(value) =>{
        console.log(value)
        this.setState({songMenuId:value})
        this.searchSongByMenuId();
    }

     onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    // 点击一个歌曲，显示他的热评
     callback = (key) => {
        console.log(key)
        if(key.length > 0){
             const lastSongId = key[key.length -1];
             const url = `/comment/music?id=${lastSongId}&limit=20`
             console.log('url:',url);
             getWangYiAjax(url)
                 .then(response =>{
                     this.setState({comments:response.data.hotComments})
                 });
         }

         if(key.length>1){
             key.shift()
         }

    }

    // 点击一个歌曲，显示他的歌词
    searchLyric = (key) =>{
        console.log(key)
        if(key.length > 0){
            const lastSongId = key[key.length -1];
            const url = `/lyric?id=${lastSongId}`
            console.log('url:',url);
            getWangYiAjax(url)
                .then(response =>{
                    this.setState({lyric:response.data.lrc.lyric})
                });
        }

        if(key.length>1){
            key.shift()
        }
    }

    // 输入歌单id，查询歌单下的所有歌曲信息
    searchSongByMenuId =() =>{
        let {songMenuId} = this.state;
        songMenuId = songMenuId === ''?'2809469700':songMenuId
        getWangYiAjax(`/playlist/detail?id=${songMenuId}`)
            .then(response =>{
                const  result = response.data;
                console.log(result.playlist.tracks)
                this.setState({songData:result.playlist.tracks})
            });
    }


    // 初始化数据
    componentDidMount() {
        this.searchSongByMenuId()
    }

    render() {
        const {songData,comments,lyric} = this.state
        return (
            songData &&
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="歌单评论" key="1">
                    <Search placeholder="输入歌单的id" onSearch={this.onSearch} enterButton />
                    <br/>
          {/*          <Card title='『2019 年』' bordered={true} bodyStyle={{paddingTop: '2px'}}>
                        <h3 style={{margin: 8}}>一个歌单</h3>
                        <List
                            bordered
                            dataSource={songData}
                            renderItem={item => (
                                <List.Item>
                                    <Typography.Text >{item.name}</Typography.Text> {item.id}
                                </List.Item>
                            )}
                        />
                    </Card>*/}


                    <Collapse defaultActiveKey={[]} onChange={this.callback}>
                        {songData.map((record,index) =>{
                           return  <Panel header={record.name} key={record.id} >
                                  {comments && comments.map((recordComment,index2) =>{
                                       return <p key={index2}>{recordComment.content}</p>
                                   })}
                            </Panel>
                        })}
                    </Collapse>
                </TabPane>

                <TabPane tab="歌单歌词" key="2">
                    <Search placeholder="输入歌单的id" onSearch={this.onSearch} enterButton />

                    <Collapse defaultActiveKey={[]} onChange={this.searchLyric}>
                        {songData.map((record,index) =>{
                            return  <Panel header={record.name} key={record.id} >
                                    <p style={{whiteSpace: 'pre-line'}} >{lyric}</p>
                            </Panel>
                        })}
                    </Collapse>
                </TabPane>


            </Tabs>
        )
    }
}

export default Log
