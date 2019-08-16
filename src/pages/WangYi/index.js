import React, {Component} from 'react'
import {Card, DatePicker, List, Tabs, Typography, Collapse, Input, Tag, Row, Col, message, Switch, Affix,Avatar,BackTop    } from "antd";
import {getWangYiAjax} from "../../util/ajax";

const {TabPane} = Tabs;
const {Panel} = Collapse;
const {Search} = Input;
const { Text } = Typography;

class Log extends Component {

    state = {
        songMenuId: 2809469700, // 歌单id,默认为我的周杰伦的歌
        songData: [],  // 歌单信息
        comments: [],  // 对应歌词的热评
        newComments: [], // 歌曲的最新评论
        lyric: [],  // 歌词
        menuTags: [], //歌单标签
        menuList: [], // 歌单列表
        activeKey: '1',// 点击歌单的时候跳到第一个页面

        artists: [],// 排行榜歌手

        artistsHotSongs: [], // 歌手的热歌
        artistsAlbum: [], // 歌手的专辑

        onlyHotComments: true,// 只看热评
        copyright:true,// 是否有歌曲播放版权


        //打开了的热评数组
        //   commentsArr:[],
    }

    // 搜索
    onSearch = (value) => {

        const result = this.checkNumber(value);
        // 如果是数字，就是歌单搜索，否则认为是歌名搜索
        if (result || value === '') {
            // 之前的搜索是搜索歌单，由于网易云歌单搜索不准，不热门的基本搜不到，现在改为
            // 直接搜索歌曲,如果为空，默认出现周杰伦的歌单
            if (value === '') {
                value = '2809469700'
            }
            //this.setState({songMenuId:value})
            this.searchSongByMenuId(value);
        } else {
            // 已经改为了：搜索歌曲
            getWangYiAjax(`/search?keywords=${value}`)
                .then(response => {
                    if (response.data.result !== undefined && response.data.result !== null) {
                        const result = response.data.result.songs.splice(0, 40);
                        this.setState({songData: result})
                    } else {
                        message.error("文明用语，ok?")
                    }

                });
            console.log(`搜索歌曲的url:/search?keywords=${value}`)
        }

        this.resetData();

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
     //   console.log(date, dateString);
    }

    // 点击一个歌曲，显示他的热评
    callback = (key) => {
     //   console.log(key)
        if (key.length > 0) {
            const lastSongId = key[key.length - 1];
            const url = `/comment/music?id=${lastSongId}&limit=100`
            console.log('点击歌曲，显示热评的url:', url);
            getWangYiAjax(url)
                .then(response => {
                    let {comments} = this.state;
                    let resultComments = response.data;
                    // 为每一个对象加一个歌曲id属性
                    resultComments.id = lastSongId;
                    comments.push(resultComments);
                    // 热评+评论
               //     console.log(comments)
                    this.setState({comments:this.reduceArr(comments)})
                });
        }

        /*     if(key.length>1){
                 key.shift()
             }*/

    }

    // 点击一个歌曲，显示他的歌词
    searchLyric = (key) => {
      //  console.log(key)
        if (key.length > 0) {
            const lastSongId = key[key.length - 1];
            const url = `/lyric?id=${lastSongId}`
            console.log('点击歌曲显示歌词的url:', url);
            getWangYiAjax(url)
                .then(response => {
                    if (response.data.lrc !== undefined && response.data.lrc.lyric !== undefined && response.data.lrc.lyric !== null && response.data.lrc.lyric !== "") {
                        let {lyric} = this.state;
                        let result = response.data.lrc;
                        result.id = lastSongId;
                        lyric.push(result)
                        this.setState({lyric:this.reduceArr(lyric)})
                    } else {
                        let {lyric} = this.state;
                        let result = response.data;
                        result.lrc = {};
                        result.lrc.id = lastSongId;
                        result.lrc.lyric = '暂无歌词！';
                        lyric.push(result.lrc)
                        this.setState({lyric:this.reduceArr(lyric)})
                    }

                });

            // 检测歌曲的版权
            getWangYiAjax(`/check/music?id=${lastSongId}`)
                .then(response => {
                    const result = response.data.success;
                    this.setState({copyright:result})
                })
                .catch(error =>{
                    console.log('错误信息：'+error)
                    this.setState({copyright:false})
                })
            ;

        }
        /*
                if(key.length>1){
                    key.shift()
                }*/
    }

    // 输入歌单id，查询歌单下的所有歌曲信息
    searchSongByMenuId = (songMenuId) => {
        songMenuId = songMenuId === '' ? '2809469700' : songMenuId
        console.log(`通过歌单搜索的url:/playlist/detail?id=${songMenuId}`)
        getWangYiAjax(`/playlist/detail?id=${songMenuId}`)
            .then(response => {
                const result = response.data;
                // console.log(result.playlist.tracks)
                this.setState({songData: result.playlist.tracks})
            });
    }

    // 选择热门标签
    selectTag = () => {
        getWangYiAjax(`/playlist/catlist`)
            .then(response => {
                const result = response.data.sub;
                this.setState({menuTags: result})
            });
        console.log(`热门标签的url:/playlist/catlist`)
    }

    //  初始化排行榜歌手
    selectArtists = () => {
        getWangYiAjax(`/toplist/artist`)
            .then(response => {
                const result = response.data.list.artists;
                this.setState({artists: result})
            });
        console.log(`初始化歌手排行榜的url:/toplist/artist`)
    }

    // 点击tagId
    handleSelectTag = (record) => {
        // 点击一个标签，显示标签下的前15个歌单
        getWangYiAjax(`/top/playlist?limit=40&cat=${record.name}`)
            .then(response => {
                const result = response.data.playlists;
                this.setState({menuList: result})
            });
        console.log(`单击一个标签的url:/top/playlist?limit=40&cat=${record.name}`)
    }

    // 点击歌单
    handleSelectMenu = (record) => {
        //   this.setState({songMenuId:record.id})
        this.searchSongByMenuId(record.id)
        //
        this.setState({activeKey: '1'});
        this.resetData();

    }

    // 点击专辑
    handleSelectAlbum = (record) => {
        // 这个是我本人的歌单
        if (record.userId === 376845421 || parseInt(record.userId) === 376845421) {
            getWangYiAjax(`/playlist/detail?id=${record.id}`)
                .then(response => {
                    const result = response.data;
                    // console.log(result.playlist.tracks)
                    this.setState({songData: result.playlist.tracks})
                });
            console.log(`点击我本人的名字的url:/playlist/detail?id=${record.id}`)
        } else {
            // 这是真正的歌手的专辑
            getWangYiAjax(`/album?id=${record.id}`)
                .then(response => {
                    const result = response.data.songs;
                    this.setState({songData: result})
                });
            console.log(`点击歌手的专辑url:/album?id=${record.id}`)
        }
        this.setState({activeKey: '1'});
        this.resetData();
    }

    // 混进去一个奇怪的东西，那就我的歌单
    handleSelectMe = (record) => {
        console.log(`我自己的歌单url：/user/playlist?uid=${record}`)
        getWangYiAjax(`/user/playlist?uid=${record}`)
            .then(response => {
                const result = response.data.playlist;
                this.setState({artistsAlbum: result})
            });
        //
    }
    // 点击歌手
    handleSelectArtists = (record) => {
        // 选出当前歌手的热门歌曲歌单  -- 暂时不用
        /*        getWangYiAjax(`/artists?id=${record.id}`)
                    .then(response =>{
                        const  result = response.data.hotSongs;
                        this.setState({artistsHotSongs:result})
                    });*/

        // 选出当前歌手的专辑歌单
        getWangYiAjax(`/artist/album?id=${record.id}&limit=30`)
            .then(response => {
                const result = response.data.hotAlbums;
                this.setState({artistsAlbum: result})
            });
        console.log(`点击当前歌手的url:/artist/album?id=${record.id}&limit=30`)

    }


    // 改变tab页面
    changeTab = (activeKey) => {
        // console.log(activeKey)
        this.setState({activeKey})
    }
    // 是否只看热评，默认为是
    switchComments = (activeCode) => {
        const {onlyHotComments} = this.state;
        this.setState({onlyHotComments: activeCode})
    }

    // 重置一下缓存数据
    resetData =() =>{
        // 重置一下歌词和热评的缓存
        this.setState({comments:[]});
        this.setState({lyric:[]});
    }

    // 去除对象中id相同的对象
    reduceArr = (arr) =>{
        //  方法1：利用对象访问属性的方法，判断对象中是否存在key
        let result = [];
        let obj = {};
        for(let i =0; i<arr.length; i++){
            if(!obj[arr[i].id]){
                result.push(arr[i]);
                obj[arr[i].id] = true;
            }
        }
        // console.log('去重后的arr',result)
        return result
    }


    // 初始化数据
    componentDidMount() {
        this.searchSongByMenuId(2809469700) // 通过歌单id找歌曲
        this.selectTag()   // 初始化标签
        this.selectArtists() // 初始化排行榜歌手

    }

    render() {
        const {songData, comments, onlyHotComments, lyric, menuTags, menuList, activeKey, artists, artistsAlbum,copyright} = this.state
        // console.log('lyric', lyric, typeof lyric)
        return (
            <div>
                <div>
                    <BackTop />
                    <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> </strong>
                </div>

                <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={this.changeTab}>
                    <TabPane tab="歌单热评" key="1">
                        <Search placeholder="歌名搜索" onSearch={this.onSearch} enterButton/>
                        <Affix offsetTop={70}>
                            <div align="right" style={{marginRight: '20px'}}>
                                只看热评：
                                <Switch defaultChecked onChange={this.switchComments}/>
                            </div>
                        </Affix>

                        <Collapse defaultActiveKey={[]} onChange={this.callback}>
                            {songData && songData.map((record, index) => {
                                return <Panel header={<div>{record.name }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {record.ar!== undefined &&record.ar.map((record2,index2)=><Text key={index2}  type="secondary">{record2.name}&nbsp;&nbsp;&nbsp;&nbsp;</Text>)}
                                    {record.artists!== undefined &&record.artists.map((record2,index2)=><Text key={index2}  type="secondary">{record2.name}&nbsp;&nbsp;&nbsp;&nbsp;</Text>)}
                                </div>} key={record.id}>
                                    <Tag color='#f50' style={{margin: '2px 2px 6px 2px'}}>热门评论</Tag>
                                    {comments && comments.map((recordComment, index2) => {
                                        if (parseInt(recordComment.id) === record.id) {
                                            return recordComment.hotComments.map((hotCommentsRecord, index3) => {
                                                return <p key={index3}>{hotCommentsRecord.content}&nbsp;&nbsp;《{record.name}》</p>
                                            })
                                        }
                                    })}

                                    {!onlyHotComments &&
                                    <Tag color='#87d068' style={{margin: '2px 2px 6px 2px'}}>最新评论</Tag>}
                                    {!onlyHotComments && comments && comments.map((recordComment, index2) => {
                                        if (parseInt(recordComment.id) === record.id) {
                                            return recordComment.comments.map((newComments, index3) => {
                                                return <p key={index3}>{newComments.content}&nbsp;&nbsp;《{record.name}》</p>
                                            })
                                        }
                                    })}
                                </Panel>
                            })}
                        </Collapse>
                    </TabPane>

                    <TabPane tab="歌单歌词" key="2">
                        <Search placeholder="歌名搜索" onSearch={this.onSearch} enterButton/>
                        <Collapse defaultActiveKey={[]} onChange={this.searchLyric}>
                            {songData && songData.map((record, index) => {
                                return <Panel header={<div>{record.name }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {record.ar!== undefined &&record.ar.map((record2,index2)=><Text key={index2}  type="secondary">{record2.name}&nbsp;&nbsp;</Text>)}
                                    {record.artists!== undefined &&record.artists.map((record2,index2)=><Text key={index2}  type="secondary">{record2.name}&nbsp;&nbsp;</Text>)}
                                </div>} key={record.id}>
                                        {copyright &&<audio src={`https://music.163.com/song/media/outer/url?id=${record.id}`} controls="controls" >播放音乐</audio>}
                                    {!copyright && <p style={{whiteSpace: 'pre-line',margin: '10px 20px', fontSize: '115%'}}>暂无版权！</p>}

                                    <hr/>
                                    <br/>
                                    <p style={{whiteSpace: 'pre-line',margin: '-10px 20px', fontSize: '115%'}}>
                                        {lyric.map((lyricRecord, index2) => {
                                            if (parseInt(lyricRecord.id) === record.id) {
                                                return  lyricRecord.lyric.replace(/\[[^\]]*\]/g,"")
                                            }
                                        })}
                                    </p>
                                </Panel>
                            })}
                        </Collapse>
                    </TabPane>


                    <TabPane tab="标签选择" key="3">
                        <Row type="flex">
                            {menuList && menuList.length > 0 && menuList.map((menuRecod, index) => {
                                return <Col xs={24} md={8} key={index}>
                                    <Tag color='geekblue' style={{margin: '5px 20px', fontSize: '115%'}}> <a
                                        onClick={() => this.handleSelectMenu(menuRecod)}>{menuRecod.name}</a> </Tag>
                                </Col>
                            })}
                        </Row>
                        <Row type="flex">
                            {menuTags && menuTags.map((record, index) => {
                                return <Col xs={6} md={3} key={index}>
                                    <Tag style={{margin: '5px 20px', fontSize: '115%'}}> <a
                                        onClick={() => this.handleSelectTag(record)}>{record.name}</a> </Tag>
                                </Col>
                            })}
                        </Row>

                    </TabPane>


                    <TabPane tab="歌手选择" key="4">
                        <Row type="flex">
                            {artistsAlbum && artistsAlbum.length > 0 && artistsAlbum.map((albumRecod, index2) => {
                                return <Col xs={12} md={4} key={index2}>
                                    <Tag color='geekblue' style={{margin: '5px 20px', fontSize: '120%'}}> <a
                                        onClick={() => this.handleSelectAlbum(albumRecod)}>{albumRecod.name}</a> </Tag>
                                </Col>
                            })}
                        </Row>
                        <Row type="flex">
                            {artists && artists.map((record, index) => {
                                return <Col xs={6} md={3} key={index}>
                                    <Tag style={{margin: '5px 20px', fontSize: '115%'}}> <a
                                        onClick={() => this.handleSelectArtists(record)}>{record.name}</a> </Tag>
                                </Col>
                            })}
                            <Col xs={12} md={4}>
                                <Tag style={{margin: '5px 20px', fontSize: '120%'}}> <a
                                    onClick={() => this.handleSelectMe(376845421)}>风往西边吹丶</a> </Tag>
                            </Col>
                        </Row>

                    </TabPane>


                </Tabs>
            </div>

        )
    }
}

export default Log
