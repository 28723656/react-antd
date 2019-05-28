import React,{Component} from 'react'
import {COUNT_DOWN_DAY, COUNT_DOWN_HOUR, COUNT_DOWN_MINUTE, COUNT_DOWN_SECOND} from "../../util/dataUtil";
import StatisticCountDown from "../../components/Statistic/StatisticCountDown";

class CountDownPage extends Component{
    render() {
        return (
            <div>
                <StatisticCountDown
                    type={COUNT_DOWN_DAY}
                    value={2}
                />
                <StatisticCountDown
                    type={COUNT_DOWN_HOUR}
                    value={8}
                />
                <StatisticCountDown
                    type={COUNT_DOWN_MINUTE}
                    value={40}
                />
                <StatisticCountDown
                    type={COUNT_DOWN_SECOND}
                    value={60}
                />
            </div>
        )
    }
}

export  default CountDownPage
