import {combineReducers} from 'redux'

import {
  POWER_UP,
    RECEIVE_WEAPON_DATA
} from './action-types'

import {weaponData_mock} from "../mock/test01data";

const initComments = {}


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

/*
function counter(state = 0 ,action) {

  console.log('counter()',state  ,action)
  switch (action.type) {
    case INCREMENT:
      return state + action.data
    case DECREMENT:
      return state - action.data
    default:
      return state
  }

}*/


// 多个的情况
export default combineReducers({
  weaponData,
 /* counter*/
})

// redux向外暴露的state结构  { counter:2, comment:[{},{}]  }
