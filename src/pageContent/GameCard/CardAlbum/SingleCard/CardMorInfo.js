import React,{Component} from 'react'
import {Row,Col} from 'antd'
import PropTypes from "prop-types";
import {getAjax} from "../../../../util/ajax";

class CardMorInfo extends Component{

    static propTypes = {
        // 卡片实体
        cardRecord:PropTypes.object.isRequired,
    }

    state ={
        costArr:[],
    }

    // 通过cardId查询升级数据
    initData = () =>{
        const {cardRecord} = this.props
        getAjax(`/game/cost/${cardRecord.id}`).then(response =>{
            if(response.data.flag){
                console.log("costArr数据：",response.data.data)
                this.setState({costArr:response.data.data})
            }
        })
    }

    componentDidMount() {
        this.initData()
    }

    render() {
        let beforeStar = 1;
        const {costArr} = this.state;
        const {cardRecord} = this.props

        return (
            <div>
                <div>
                    <Row>
                        <Col span={3}>等级</Col>
                        <Col span={3}>星级</Col>
                        <Col span={4}>消耗</Col>
                        <Col offset={2} span={10}>加成</Col>
                    </Row>
                <hr/>
                </div>

                {costArr && costArr.length> 0 && costArr.map(record =>{

                    let newStar = record.star;
                    let hrNode = <span></span>
                    if(beforeStar !== newStar){
                        hrNode = <hr/>
                        beforeStar = newStar;
                    }

                    const commonNode1 = <Col span={3}>{record.rank}</Col>
                    const commonNode2 = <Col span={3}>{record.star}</Col>
                    const commonNode3 = <Col span={4}>{record.cost}</Col>
                    let specialNode = ''
                    let specialNode2 = ''
                    if(cardRecord.skill === 1){
                        specialNode = <Col offset={2} span={8}>金币 +{record.incCoin}%</Col>
                    }else if(cardRecord.skill === 2){
                        specialNode = <Col offset={2} span={8}>经验 +{record.incExperience}%</Col>
                    }else if(cardRecord.skill === 3){
                        specialNode = <Col span={7}>钥匙： +{record.lowPercent}个</Col>
                        specialNode2 = <Col span={7}>钥匙： +{record.topPercent}个</Col>
                    }
                    return <div key={record.id}>
                        {hrNode}
                        <Row>
                            { commonNode1}  {commonNode2}  {commonNode3}
                            {specialNode}
                            { cardRecord.skill === 3 && specialNode2}
                        </Row>
                    </div>
                })}
            </div>
        )
    }
}

export default CardMorInfo
