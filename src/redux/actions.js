import {
    POWER_UP,
    RECEIVE_WEAPON_DATA,
    CHANGE_SONG,
    CHANGE_CARD2,
    BUY_ITEM,
    ADD_YEAR_PLAN,
    GET_YEAR_PLAN_LIST,
    GET_TODAY_PLAN_LIST,
    GET_WEEK_PLAN_LIST,
    GET_MONTH_PLAN_LIST, INIT_PLAN, SWITCH_MODAL, LOADING,SET_STOP_OPEN,
    SET_RECORD
} from './action-types'

import {weaponData_mock} from "../mock/test01data";
import {addAjax, getAjax, updateAjax, deleteAjax} from "../util/ajax";
import {message} from 'antd'
import {getUser} from "../util/userUtil";


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
 * 页面一：计划列表
 */
const planList = (data) => ({type: INIT_PLAN, data});


/**
 * 页面一：添加计划
 */
export const addPlan = (values) => {
    const user = getUser()
    return async dispatch => {
        const response = await addAjax(`/plan/plan/${user.id}`, values);
        const result = response.data;
        // 添加成功
        if (result.flag) {
            // 初始化数据  第一种：直接查数据库初始化数据
            const response = await getAjax(`/plan/plan/${user.id}`);
            const result = response.data;
            dispatch(planList(result.data))
        }
    }
}

// 完成计划
export const finishPlan = (values,finished) => {
    const user = getUser()
    return async dispatch => {
        const response = await updateAjax(`/plan/plan/${user.id}/${finished}`, values);
        const result = response.data;
        // 添加成功
        if (result.flag) {
            // 初始化数据  第一种：直接查数据库初始化数据
            const response = await getAjax(`/plan/plan/${user.id}`);
            const result = response.data;
            dispatch(planList(result.data))
        }
    }
}


// 修改计划
export const updatePlan = (values) => {
    const user = getUser()
    return async dispatch => {
        const response = await updateAjax(`/plan/plan/update/${user.id}`, values);
        const result = response.data;
        // 添加成功
        if (result.flag) {
            // 初始化数据  第一种：直接查数据库初始化数据
            const response = await getAjax(`/plan/plan/${user.id}`);
            const result = response.data;
            if (result.flag) {
                dispatch(planList(result.data))
            }
        }
    }
}


// 删除计划
export const deletePlan = (id) => {
    const user = getUser()
    return async dispatch => {
        const response = await deleteAjax(`/plan/plan/${id}/${user.id}`);
        const result = response.data;
        // 添加成功
        if (result.flag) {
            // 初始化数据  第一种：直接查数据库初始化数据
            const response = await getAjax(`/plan/plan/${user.id}`);
            const result = response.data;
                dispatch(planList(result.data))
        }else {
            message.error("不能删除带有子计划的！")
        }
    }
}


// 显示和关闭模态框
export const switchModal = (type, value) => ({type: SWITCH_MODAL, data: {type, value}})

// 加载页面
export const loading = (value) => ({type: LOADING, data: value})


// 初始化计划
export const initPlanData = () => {
    const user = getUser()
    return async dispatch => {
        const response = await getAjax(`/plan/plan/${user.id}`);
        const result = response.data;
        if (result.flag) {
            dispatch(planList(result.data))
        }
    }
}

// STOP OPEN
export const setStopOpen =(data) =>({type:SET_STOP_OPEN,data})


// 修改计划的时候的record
export const setRecord =(record) =>({type:SET_RECORD,data:record})




