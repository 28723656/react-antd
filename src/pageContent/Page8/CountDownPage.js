import React,{Component} from 'react'
import {COUNT_DOWN_DAY, COUNT_DOWN_HOUR, COUNT_DOWN_MINUTE, COUNT_DOWN_SECOND} from "../../util/dataUtil";
import StatisticCountDown from "../../components/Statistic/StatisticCountDown";

const dayValue = 2
const hourValue = 8
const minuteValue = 40
const secondValue = 60

class CountDownPage extends Component{
    render() {
        return (
            <div>
                <StatisticCountDown
                    type={COUNT_DOWN_DAY}
                    value={dayValue}
                />
                <StatisticCountDown
                    type={COUNT_DOWN_HOUR}
                    value={hourValue}
                />
                <StatisticCountDown
                    type={COUNT_DOWN_MINUTE}
                    value={minuteValue}
                />
                <StatisticCountDown
                    type={COUNT_DOWN_SECOND}
                    value={secondValue}
                />
            </div>
        )
    }
}

export  default CountDownPage
