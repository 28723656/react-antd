import React, {Component} from 'react'
import {Button, Card, List, Tabs, Typography,Row,Col,message} from "antd";
import {getAjax, updateAjax} from "../../util/ajax";
import {getUser} from "../../util/userUtil";

const {TabPane} = Tabs;

let count = 0;
class Person extends Component {
    logout =() =>{
        localStorage.removeItem("user");
        localStorage.removeItem("basePlanList");
        this.props.history.push('/')
    }

    getReward =() =>{
        const user = getUser()
        count ++;
        if(count === 5){
            message.success("恭喜你，发现了彩蛋！")
            message.success("恭喜你，发现了彩蛋！")
            message.success("恭喜你，发现了彩蛋！")
        }else if(count ===10){
            message.success("你真的还要继续点？")
        }else if(count ===20){
            message.success("点吧，点吧")
        }else if(count ===66){
            message.success("666，那给点奖励你");
            message.success("获得金币1000 钻石200 钥匙50");
            console.log("获得金币1000 钻石200 钥匙50");
            // 送1000金币 300钻石  50钥匙
            updateAjax(`/game/myMoney/clickReward/${user.id}/1`)
        }else if(count ===100){
            message.success("牛逼，兄弟，真有毅力！")
            message.success("***获得金币1000 钻石200 钥匙50***");
            console.log("***获得金币1000 钻石200 钥匙50***");
            // 送1000金币 300钻石  50钥匙
            updateAjax(`/game/myMoney/clickReward/${user.id}/3`)
        }else if(count ===150){
            message.success("你真的还要继续点？都150次了")
            updateAjax(`/game/myMoney/clickReward/${user.id}/5`)
        }else if(count ===200){
            message.success("哥啊，200次了，我不给奖励的")
            updateAjax(`/game/myMoney/clickReward/${user.id}/7`)
        }else if(count ===245){
            message.success("-------慢点，彩蛋来了------")
        }else if(count ===250){
            message.success("算了你个250，不管你啦")
        }else if(count ===251){
            message.success("其实前面每次说话的时候，我都偷偷把奖励给你了")
        }else if(count ===252){
            message.success("只是我不想通知你")
        }else if(count ===253){
            message.success("那我一次性通知你")
        }else if(count ===254){
            message.success("***获得金币6400 钻石1280 钥匙320 ***");
            console.log("***获得金币6400 钻石1280 钥匙320 ***");
        }else if(count ===260){
            message.success("点到这里，我发现你真的是一个无聊的人，再见")
        }else if(count ===300){
            message.success("我该说点什么呢")
        }else if(count ===320){
            message.success("该不会想听我讲故事吧")
        }else if(count ===322){
            message.success("我也没经历过什么不会讲唉")
        }else if(count ===324){
            message.success("嗯，既然你都点到这个份上了")
        }else if(count ===326){
            message.success("那我就复制粘贴那个网易云的评论给你看看吧")
        }else if(count ===328){
            message.success("‘一个抑郁症的人只能用纯音乐来缓解心情，你们有谁会懂，会了解。’")
        }else if(count ===330){
            message.success("‘每次一听这首歌就有种恋爱的感觉。。一大早着急梳洗打扮，跑去见自己最喜欢的人～～’")
        }else if(count ===332){
            message.success("‘只要有想见的人，就不是孤身一人” - “夏目友人帐’")
        }else if(count ===334){
            message.success("‘躲了一辈子雨雨一定很难过吧’")
        }else if(count ===336){
            message.success("‘有雨声，有钢琴，有遐思，有依恋，有黯然，有亲吻，有泪别，有夏天，有羞涩，有甜蜜，有目送，有声嘶力竭。泠霖的故事里，我安静地伫在一边，听画里的人讲述故事’")
        }else if(count ===338){
            message.success("‘试过很多次没人等我’")
        }else if(count ===340){
            message.success("‘我怕花挡住了我的眼睛我只想看见你’")
        }else if(count ===342){
            message.success("‘你这一生有很多故事，可我却从未参与其中······’")
        }else if(count ===344){
            message.success("‘我也想问你借火点一支烟’")
        }else if(count ===346){
            message.success("‘如果我还跟你谈起理想，请别轻易笑我荒唐’")
        }else if(count ===348){
            message.success("‘昨晚哭了一阵，娘亲发视频过来了，不想让她看到我这个样子，吃了几口辣椒，装作是辣哭了，笑着聊了半个多小时’")
        }else if(count ===360){
            message.success("-------咔--停停停-----------")
        }else if(count ===362){
            message.success("我累了，真的，就这么多了吧，不要点了")
        }else if(count ===364){
            message.success("我发誓，后面没有奖励了，早点睡吧")
        }else if(count ===370){
            message.success("真的，后面没有任何奖励！")
        }else if(count ===372){
            message.success("也不会讲任何故事了，再见，亲爱的，谢谢你陪我这么久。")
        } else if(count ===666){
            message.success("送你一句 666，你已经无敌了，送你一个亿")
            message.success("*****1亿已到账******")
            console.log("*****1亿已到账,自己去抽卡页面查看******")
            updateAjax(`/game/myMoney/clickReward/${user.id}/50000`)
        }else if(count ===670){
            message.success("---没有彩蛋了---")
        }else if(count ===671){
            message.success("---没有彩蛋了---")
        }else if(count ===672){
            message.success("---没有彩蛋了---")
        }else if(count ===673){
            message.success("---没有彩蛋了---")
        }else if(count ===674){
            message.success("---说了再见，才发现其实再也看不见---")
        }else if(count ===999){
            message.success("---管理员账号给你---")
        }else if(count ===1000){
            message.success(" 账号:123456789 ")
            message.success(" 密码:123456789 ")
        }else if(count ===10001){
            message.success("我怕你忘记了，按F12也可以查看")
            console.log('账号：123456789')
            console.log('密码：123456789')
        }else if(count ===10002){
            message.success("最后祝你：身体健康。再见")
        }
    }

    getSomeThing =() =>{
        const user = getUser()
        getAjax(`/ip/ip/${user.id}`)
    }

    componentDidMount() {
        this.getSomeThing();
    }

    render() {
        const user = getUser()
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="个人中心" key="1">
                    <Row gutter={20}>
                        <Col xs={24} md={12} xl={8} style={{marginBottom:'10px'}}>
                            <Card title='签到处' bordered={true} bodyStyle={{paddingTop: '2px'}}>
                                <p>今日奖励：哪里有奖励</p>
                                <p>明日奖励：冒得！！！</p>
                                <p>暂时就想这么多了</p>
                                <Button onClick={this.getReward} type="primary" block>签到</Button>
                            </Card>
                        </Col>

                        <Col xs={24} md={12} xl={8} style={{marginBottom:'10px'}}>
                            <Card title='消息通知' bordered={true} bodyStyle={{paddingTop: '2px'}}>
                                <p>最近更新：</p>
                                <p>1.xxxxx</p>
                                <p>2.xxxxxxxx</p>
                                <Button onClick={this.getReward}  type="default" block>了解</Button>
                            </Card>
                        </Col>

                        <Col xs={24} md={12} xl={8} style={{marginBottom:'10px'}}>
                            <Card title='我的信息' bordered={true} bodyStyle={{paddingTop: '2px'}}>
                                <p>id：{user.id}</p>
                                <p>账号：{user.phone}</p>
                                <p>昵称：{user.nickName}</p>
                                <Button onClick={this.logout} type="danger" block>注销账号</Button>
                            </Card>
                        </Col>

                    </Row>


                </TabPane>
            </Tabs>
        )
    }
}

export default Person
