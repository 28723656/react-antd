import React, {Component} from 'react'
import {Card, DatePicker, List, Tabs, Typography,Collapse,Input,Tag ,Row, Col} from "antd";
import {getWangYiAjax} from "../../util/ajax";

const {TabPane} = Tabs;
const { Panel } = Collapse;
const { Search } = Input;

class Log extends Component {

    state ={
        songMenuId:2809469700, // 歌单id,默认为我的周杰伦的歌
        songData:[],  // 歌单信息
        comments:[],  // 对应歌词的热评
        newComments:[], // 歌曲的最新评论
        lyric:'',  // 歌词
        menuTags:[], //歌单标签
        menuList:[], // 歌单列表
        activeKey:'1',// 点击歌单的时候跳到第一个页面

        artists:[],// 排行榜歌手

        artistsHotSongs:[], // 歌手的热歌
        artistsAlbum:[] // 歌手的专辑
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
             const url = `/comment/music?id=${lastSongId}&limit=100`
             console.log('url:',url);
             getWangYiAjax(url)
                 .then(response =>{
                     this.setState({comments:response.data.hotComments})
                     this.setState({newComments:response.data.comments})


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
                    if(response.data.lrc !== undefined && response.data.lrc.lyric !== undefined
                    && response.data.lrc.lyric !== null){
                        this.setState({lyric:response.data.lrc.lyric})
                    }else {
                        this.setState({lyric:'暂无歌词！'})
                    }

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
        console.log('歌单id:',songMenuId)
        getWangYiAjax(`/playlist/detail?id=${songMenuId}`)
            .then(response =>{
                const  result = response.data;
                console.log(result.playlist.tracks)
                this.setState({songData:result.playlist.tracks})
            });
    }

    // 选择热门标签
    selectTag =() =>{
        getWangYiAjax(`/playlist/catlist`)
            .then(response =>{
                const  result = response.data.sub;
                this.setState({menuTags:result})
            });
    }

    //  初始化排行榜歌手
    selectArtists = () =>{
        getWangYiAjax(`/toplist/artist`)
            .then(response =>{
                const  result = response.data.list.artists;
                this.setState({artists:result})
            });
     }

    // 点击tagId
    handleSelectTag = (record) =>{
        // 点击一个标签，显示标签下的前15个歌单
        getWangYiAjax(`/top/playlist?limit=40&cat=${record.name}`)
            .then(response =>{
                const  result = response.data.playlists;
                this.setState({menuList:result})
            });
        console.log(record)
    }

    // 点击歌单
    handleSelectMenu = (record) =>{
       // debugger
        this.setState({songMenuId:record.id})
        this.searchSongByMenuId()
        //
        this.setState({activeKey:'1'});

    }

    // 点击专辑
    handleSelectAlbum  = (record) =>{
        console.log("专辑id：",record.id)
        getWangYiAjax(`/album?id=${record.id}`)
            .then(response =>{
                const  result = response.data.songs;
                this.setState({songData:result})
            });

        //
        this.setState({activeKey:'1'});

    }

    // 点击歌手
    handleSelectArtists = (record ) =>{
        // 选出当前歌手的热门歌曲歌单  -- 暂时不用
/*        getWangYiAjax(`/artists?id=${record.id}`)
            .then(response =>{
                const  result = response.data.hotSongs;
                this.setState({artistsHotSongs:result})
            });*/

        // 选出当前歌手的专辑歌单
        getWangYiAjax(`/artist/album?id=${record.id}&limit=30`)
            .then(response =>{
                const  result = response.data.hotAlbums;
                this.setState({artistsAlbum:result})
            });

    }


    // 改变tab页面
    changeTab = (activeKey) =>{
        console.log(activeKey)
        this.setState({activeKey})
    }


    // 初始化数据
    componentDidMount() {
        this.searchSongByMenuId() // 通过歌单id找歌曲
        this.selectTag()   // 初始化标签
        this.selectArtists() // 初始化排行榜歌手

    }

    render() {
        const {songData,comments,newComments,lyric,menuTags,menuList,activeKey,artists,artistsAlbum} = this.state
        return (
            songData &&
            <Tabs defaultActiveKey="1" activeKey={activeKey}  onChange={this.changeTab}>
                <TabPane tab="歌单热评" key="1">
                    <Search placeholder="输入歌单的id" onSearch={this.onSearch} enterButton />


                    <Collapse defaultActiveKey={[]} onChange={this.callback}>
                        {songData.map((record,index) =>{
                           return  <Panel header={record.name} key={record.id} >
                               <Tag color='#f50' style={{margin:'2px 2px 6px 2px'}} >热门评论</Tag>
                                  {comments && comments.map((recordComment,index2) =>{
                                       return <p key={index2}>{recordComment.content}</p>
                                   })}
                               <Tag color='#87d068' style={{margin:'2px 2px 6px 2px'}} >最新评论</Tag>
                                  {newComments && newComments.map((recordnewComments,index3) =>{
                                       return <p key={index3}>{recordnewComments.content}</p>
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


                <TabPane tab="标签选择" key="3">
                    <Row type="flex" >
                            {menuTags && menuTags.map((record, index) => {
                                return    <Col xs={4} md={2}>
                                    <Tag style={{margin:'3px'}} > <a onClick={() => this.handleSelectTag(record)}>{record.name}</a> </Tag>
                                </Col>
                            })}
                    </Row>
                    <Row type="flex">
                        {menuList && menuList.length > 0 && menuList.map( (menuRecod,index) =>{
                            return  <Col xs={24} md={6}>
                                    <Tag color='geekblue'  style={{margin:'5px auto'}}  > <a onClick={() => this.handleSelectMenu(menuRecod)}>{menuRecod.name}</a> </Tag>
                            </Col>
                        } )}
                    </Row>
                </TabPane>


                <TabPane tab="歌手选择" key="4">
                    <Row type="flex" >
                        {artists && artists.map((record, index) => {
                            return    <Col xs={6} md={2}>
                                <Tag style={{margin:'2px'}} > <a onClick={() => this.handleSelectArtists(record)}>{record.name}</a> </Tag>
                            </Col>
                        })}
                    </Row>
                    <Row type="flex">
                        {artistsAlbum && artistsAlbum.length > 0 && artistsAlbum.map( (albumRecod,index2) =>{
                            return  <Col xs={8} md={4}>
                                <Tag color='geekblue'  style={{margin:'5px auto'}}  > <a onClick={() => this.handleSelectAlbum(albumRecod)}>{albumRecod.name}</a> </Tag>
                            </Col>
                        } )}
                    </Row>
                </TabPane>


            </Tabs>
        )
    }
}

export default Log
