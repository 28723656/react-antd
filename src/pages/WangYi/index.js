import React, {Component} from 'react'
import {Card, DatePicker, List, Tabs, Typography,Collapse,Input,Tag ,Row, Col,message} from "antd";
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
        artistsAlbum:[], // 歌手的专辑


        //打开了的热评数组
     //   commentsArr:[],
    }

    // 搜索
    onSearch =(value) =>{
        console.log(value)

        const result =this.checkNumber(value);
        console.log(result,value === '')
        // 如果是数字，就是歌单搜索，否则认为是歌名搜索
        if(result || value === ''){
            // 之前的搜索是搜索歌单，由于网易云歌单搜索不准，不热门的基本搜不到，现在改为
            // 直接搜索歌曲,如果为空，默认出现周杰伦的歌单
            if(value === ''){
                value = '2809469700'
            }
             //this.setState({songMenuId:value})
             this.searchSongByMenuId(value);
        }
        else {
            // 已经改为了：搜索歌曲
            getWangYiAjax(`/search?keywords=${value}`)
                .then(response =>{
                    if(response.data.result !== undefined && response.data.result !== null){
                        const  result = response.data.result.songs.splice(0,40);
                        this.setState({songData:result})
                    }else {
                       message.error("文明用语，ok?")
                    }

                });
        }

    }


    // 检查是否为数字
     checkNumber = (number) => {
         //判断正整数/[1−9]+[0−9]∗]∗/
         const re = /^[0-9]+.?[0-9]*/;//
         if (!re.test(number)) {
             return false;
         }
         return true;
     }

     onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    // 点击一个歌曲，显示他的热评
     callback = (key) => {
        console.log(key)
        if(key.length > 0){
             const lastSongId = key[key.length -1];
            // debugger
             const url = `/comment/music?id=${lastSongId}&limit=100`
             console.log('url:',url);
             getWangYiAjax(url)
                 .then(response =>{
                     let {comments} = this.state;
                     let  resultComments = response.data;
                     // 为每一个对象加一个歌曲id属性
                     resultComments.id = lastSongId;
                     comments.push(resultComments);
                 //    debugger
                     // 热评+评论
                     console.log(comments)
                     this.setState({comments})
                 });
         }

    /*     if(key.length>1){
             key.shift()
         }*/

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
    searchSongByMenuId =(songMenuId) =>{
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
     //   this.setState({songMenuId:record.id})
        this.searchSongByMenuId(record.id)
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
        this.searchSongByMenuId(2809469700) // 通过歌单id找歌曲
        this.selectTag()   // 初始化标签
        this.selectArtists() // 初始化排行榜歌手

    }

    render() {
        const {songData,comments,newComments,lyric,menuTags,menuList,activeKey,artists,artistsAlbum} = this.state
        console.log('songData',songData)
        return (
            <Tabs defaultActiveKey="1" activeKey={activeKey}  onChange={this.changeTab}>
                <TabPane tab="歌单热评" key="1">
                    <Search placeholder="歌名搜索" onSearch={this.onSearch} enterButton />

                    <Collapse defaultActiveKey={[]} onChange={this.callback}>
                        {songData && songData.map((record,index) =>{
                           return  <Panel header={record.name} key={record.id} >
                               <Tag color='#f50' style={{margin:'2px 2px 6px 2px'}} >热门评论</Tag>
                                  {comments && comments.map((recordComment,index2) =>{
                                      if(parseInt(recordComment.id) === record.id){
                                       return  recordComment.hotComments.map((hotCommentsRecord,index3) =>{
                                              return <p key={index3}>{hotCommentsRecord.content}&nbsp;&nbsp;《{record.name}》</p>
                                          })
                                      }
                                   })}
                               <Tag color='#87d068' style={{margin:'2px 2px 6px 2px'}} >最新评论</Tag>
                               {comments && comments.map((recordComment,index2) =>{
                                   if(parseInt(recordComment.id) === record.id){
                                       return  recordComment.comments.map((newComments,index3) =>{
                                           return <p key={index3}>{newComments.content}&nbsp;&nbsp;《{record.name}》</p>
                                       })
                                   }
                               })}
                            </Panel>
                        })}
                    </Collapse>
                </TabPane>

                <TabPane tab="歌单歌词" key="2">
                    <Search placeholder="歌名搜索" onSearch={this.onSearch} enterButton />

                    <Collapse defaultActiveKey={[]} onChange={this.searchLyric}>
                        {songData && songData.map((record,index) =>{
                            return  <Panel header={record.name} key={record.id} >
                                    <p style={{whiteSpace: 'pre-line'}} >{lyric}</p>
                            </Panel>
                        })}
                    </Collapse>
                </TabPane>


                <TabPane tab="标签选择" key="3">
                    <Row type="flex">
                        {menuList && menuList.length > 0 && menuList.map( (menuRecod,index) =>{
                            return  <Col xs={24} md={8}  key={index}>
                                <Tag color='geekblue'  style={{margin:'5px 20px',fontSize:'115%'}}  > <a onClick={() => this.handleSelectMenu(menuRecod)}>{menuRecod.name}</a> </Tag>
                            </Col>
                        } )}
                    </Row>
                    <Row type="flex" >
                            {menuTags && menuTags.map((record, index) => {
                                return    <Col xs={6} md={3} key={index}>
                                    <Tag style={{margin:'5px 20px',fontSize:'115%'}}  > <a onClick={() => this.handleSelectTag(record)}>{record.name}</a> </Tag>
                                </Col>
                            })}
                    </Row>

                </TabPane>


                <TabPane tab="歌手选择" key="4">
                    <Row type="flex">
                        {artistsAlbum && artistsAlbum.length > 0 && artistsAlbum.map( (albumRecod,index2) =>{
                            return  <Col xs={12} md={4}  key={index2}>
                                <Tag color='geekblue'  style={{margin:'5px 20px',fontSize:'120%'}}  > <a onClick={() => this.handleSelectAlbum(albumRecod)}>{albumRecod.name}</a> </Tag>
                            </Col>
                        } )}
                    </Row>
                    <Row type="flex" >
                        {artists && artists.map((record, index) => {
                            return    <Col xs={6} md={3}  key={index}>
                                <Tag style={{margin:'5px 20px',fontSize:'115%'}}> <a onClick={() => this.handleSelectArtists(record)}>{record.name}</a> </Tag>
                            </Col>
                        })}
                    </Row>

                </TabPane>


            </Tabs>
        )
    }
}

export default Log
