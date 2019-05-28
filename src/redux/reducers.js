import {combineReducers} from 'redux'

import {
    POWER_UP,
    RECEIVE_WEAPON_DATA,
    CHANGE_SONG,
    CHANGE_CARD2,
    BUY_ITEM
} from './action-types'

// 练习一的初始数据
import {weaponData_mock} from "../mock/test01data";

// 练习二、卡片一的初始数据
import {lyricData_mock} from "../mock/test02Card01Data";

//页面8的初始化数据
import {itemData_mock} from '../mock/page8Data'


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


// 幸运7购物
function personData(state = itemData_mock,action){
    switch (action.type) {
        case BUY_ITEM:
            let newArr = [];
            let count = 0;
             [...itemData_mock].map((record,index) =>{
                if(action.data.id ===record.id){
                    record.number ++;
                    count ++;
                }
                 newArr.push(record)
            });
             if(count ===0){
                 newArr.push({id:action.data.id,name:action.data.name,number:1})
             }
             return newArr;

        default:
            return state
    }
}


// 多个的情况
export default combineReducers({
    weaponData,
    lyricData,
    cardTest2Data,
    personData
})

// redux向外暴露的state结构  { counter:2, comment:[{},{}]  }
