
// 获得3张随机卡片
import React from "react";

export function getRandom3Card(userList) {
    // 需要多少张不重复的卡片
    let allCards = userList.length*3;
    const cardSet = new Set()

    while(cardSet.size<allCards){
       const tempCardNum = Math.floor(Math.random()*52+1)    //[1,52]
        cardSet.add(tempCardNum);
    }

    const setIter = cardSet.values();
    userList.map(record =>{
       const  value1 = setIter.next().value;
        const value2 = setIter.next().value;
        const value3 = setIter.next().value;
        record.cardOneType = Math.floor((value1-1)/13)+1;
        record.cardTwoType =Math.floor((value2-1)/13) +1;
        record.cardThreeType = Math.floor((value3-1)/13)+1;
        record.cardOneNumber = (value1-1)%13+1
        record.cardTwoNumber = (value2-1)%13+1
        record.cardThreeNumber = (value3-1)%13+1
    })
    return userList
}



// 获得牌的花色
export function getCardType(type) {
    if (type === 1) {
        return '♠'
    }else  if (type === 2) {
        return '♥'
    }else  if (type === 3) {
        return '♣'
    }else  if (type === 4) {
        return '♦'
    }
}

// 获得卡片数字
export function getCardNumber(cardNumber) {
    if(cardNumber === 1){
        return 'A';
    }else if(cardNumber<=10){
       return cardNumber;
   }else if(cardNumber === 11){
       return 'J';
   }else if(cardNumber === 12){
       return 'Q';
   }else if(cardNumber === 13){
       return 'K';
   }
}

// 直接返回一个组件
export function getCardTypeNumber(type,cardNumber) {

    let tempType = ''
    let tempCardNumber = '-'
    let style={color:'red'}

    if (type === 1) {
        tempType = '♠'
        style={color:'black'}
    }else  if (type === 2) {
        tempType = '♥'
        style={color:'red'}
    }else  if (type === 3) {
        tempType = '♣'
        style={color:'black'}
    }else  if (type === 4) {
        tempType = '♦'
        style={color:'red'}
    }

    if(cardNumber === 1){
        tempCardNumber = 'A';
    }else if(cardNumber<=10){
        tempCardNumber = cardNumber;
    }else if(cardNumber === 11){
        tempCardNumber = 'J';
    }else if(cardNumber === 12){
        tempCardNumber = 'Q';
    }else if(cardNumber === 13){
        tempCardNumber = 'K';
    }

    return <span style={style}>{tempType}{tempCardNumber}</span>
}
