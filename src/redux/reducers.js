import {combineReducers} from 'redux'

import {
    POWER_UP,
    RECEIVE_WEAPON_DATA,
    CHANGE_SONG,
    CHANGE_CARD2,
    BUY_ITEM,
    ADD_YEAR_PLAN,
    GET_YEAR_PLAN_LIST,
    GET_MONTH_PLAN_LIST,
    GET_WEEK_PLAN_LIST,
    GET_TODAY_PLAN_LIST,
    INIT_PLAN,
    SWITCH_MODAL, LOADING
} from './action-types'

// 练习一的初始数据
import {weaponData_mock} from "../mock/test01data";

// 练习二、卡片一的初始数据
import {lyricData_mock} from "../mock/test02Card01Data";

//页面8的初始化数据
import {itemData_mock} from '../mock/page8Data'

// 页面一 年计划的data
import {data2_3} from "../mock/mockDataPage1";
import {GenIntegerId, GenNonDuplicateID} from "../util/randomUtil";


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
            return {lyricKey: action.data.key, lyricName: action.data.value}
        default:
            return state
    }
}


// 幸运7购物
function personData(state = itemData_mock, action) {
    switch (action.type) {
        case BUY_ITEM:
            let newArr = [];
            let count = 0;
            [...state].map((record, index) => {
                if (action.data.id === record.id) {
                    record.number++;
                    count++;
                }
                newArr.push(record)
            });
            if (count === 0) {
                newArr.push({id: action.data.id, name: action.data.name, number: 1})
            }
            return newArr;

        default:
            return state
    }
}


/**
 * 页面一：计划系统
 */

// 先测试一波，仅仅测试年计划的数据变化
function planData(state = {}, action) {
    switch (action.type) {
        case INIT_PLAN:
            console.log('planData----', action.data);
            return action.data;
        default:
            return state
    }
}

// 模态框数据
function modalData(state = {today: false, week: false, month: false, year: false}, action) {
    switch (action.type) {
        case SWITCH_MODAL:
            if (action.data.type === 1) {
                return {today: action.data.value, week: false, month: false, year: false}
            } else if (action.data.type === 2) {
                return {today: false, week: action.data.value, month: false, year: false}
            } else if (action.data.type === 3) {
                return {today: false, week: false, month: action.data.value, year: false}
            } else if (action.data.type === 4) {
                return {today: false, week: false, month: false, year: action.data.value}
            }
        default:
            return state
    }
}

// loading
function loadingData(state = false, action) {
    switch (action.type) {
        case LOADING:
            return action.data;
        default:
            return state
    }
}


// 多个的情况
export default combineReducers({
    weaponData,
    lyricData,
    cardTest2Data,
    personData,
    planData,
    modalData,
    loadingData
})

// redux向外暴露的state结构  { counter:2, comment:[{},{}]  }
