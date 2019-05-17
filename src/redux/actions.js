import {
  POWER_UP,
  RECEIVE_WEAPON_DATA
} from './action-types'

import {weaponData_mock} from "../mock/test01data";

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





