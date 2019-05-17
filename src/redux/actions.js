import {
  POWER_UP,
  RECEIVE_WEAPON_DATA,
  CHANGE_SONG, CHANGE_CARD2
} from './action-types'

import {weaponData_mock} from "../mock/test01data";


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
export const getWeaponData = () =>{
  return dispatch =>{
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
export const changeSong = (key,value) => ({type: CHANGE_SONG, data: {key,value}})






