import {
    POWER_UP,
    RECEIVE_WEAPON_DATA,
    CHANGE_SONG, CHANGE_CARD2, BUY_ITEM, ADD_YEAR_PLAN, GET_YEAR_PLAN_LIST
} from './action-types'

import {weaponData_mock} from "../mock/test01data";
import {addAjax, getAjax} from "../util/ajax";


/**
 * 练习一
 * @param weaponData
 * @returns {{data: *, type: string}}
 */

// 强化
export const powerUp = (weaponData) => ({type: POWER_UP, data: weaponData})
// 获取数据
const receiveWeaponData = (weaponData) => ({type: RECEIVE_WEAPON_DATA, data: weaponData})
// 初始化数据   ---异步
export const getWeaponData = () => {
    return dispatch => {
        setTimeout(() => {
            // dispatch(receiveWeaponData(weaponData_mock))
        }, 1000)
    }
}


/**
 * 练习二
 */

// 改变卡片
export const change_card2 = (key) => ({type: CHANGE_CARD2, data: {key}})


//   卡片一 key 和歌名
export const changeSong = (key, value) => ({type: CHANGE_SONG, data: {key, value}})


/**
 * 页面8
 */
// 买东西
export const buyItem = ({id, name}) => ({type: BUY_ITEM, data: {id, name}})


/**
 * 页面一：年度计划
 */
const yearPlan = (data) => ({type: GET_YEAR_PLAN_LIST, data});




/**
 * 页面一：计划
 */
export const addYearPlan = (values) => {
    return async dispatch => {
        const response = await addAjax('/plan/plan', values);
        const result = response.data;
        if (result.flag) {
            getYearPlanList(dispatch,4);
        }
    }
}


// 初始化年计划
export const  initYearPlanData = (type) =>{
    return async dispatch =>{
        const response = await getAjax(`/plan/plan/${type}`);
        const result = response.data;
        debugger
        if(result.flag){
            dispatch(yearPlan(result.data));
        }
    }
}








/**
 * 页面一:获取年度计划列表
 */
async function getYearPlanList (dispatch,type){
    const response = await getAjax(`/plan/plan/${type}`);
    const result = response.data;
    if(result.flag){
        dispatch(yearPlan(result.data));
    }
}





