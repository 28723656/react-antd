import {combineReducers} from 'redux'

import {
    POWER_UP,
    RECEIVE_WEAPON_DATA,
    CHANGE_SONG,
    CHANGE_CARD2
} from './action-types'

// 练习一的初始数据
import {weaponData_mock} from "../mock/test01data";

// 练习二、卡片一的初始数据
import {lyricData_mock} from "../mock/test02Card01Data";


// 练习一
function weaponData(state = weaponData_mock, action) {
    switch (action.type) {
        case POWER_UP:
            return action.data
        case RECEIVE_WEAPON_DATA:
            return action.data
        default:
            return state
    }
}


// 练习二  切换卡片
function cardTest2Data(state = {key: 'tab1'}, action) {
    switch (action.type) {
        case CHANGE_CARD2:
            return action.data
        default:
            return state
    }
}

//  卡片一
function lyricData(state = lyricData_mock, action) {
    switch (action.type) {
        case CHANGE_SONG:
            return {lyricKey:action.data.key,lyricName:action.data.value}
        default:
            return state
    }
}


// 多个的情况
export default combineReducers({
    weaponData,
    lyricData,
    cardTest2Data
})

// redux向外暴露的state结构  { counter:2, comment:[{},{}]  }
