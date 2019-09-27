import moment from 'moment';

/**
 * moment传入数组的时候，月份要减去一个月
 * @param time
 * @returns {string}
 */

export function getMomentTime(time,formatStyle) {
    if(time && time.length && time.length > 0){
        return  moment(time.map((record,index)=> index === 1 ?record-1:record)  ).format(formatStyle || "YYYY-MM-DD HH:mm:ss")
    }else {
        return null;
    }
}

/**
 * 得到一个不用格式化的当前时间
 * @param time
 * @returns {*}
 */
export function getMomentTimeNoFormat(time) {
    if(time && time.length && time.length > 0){
        return  moment(time.map((record,index)=> index === 1 ?record-1:record)  )
    }else {
        return null;
    }
}






/**
 * 获得格式化的当前时间
 * @returns {number}
 */
export function getNowFormat() {
    return moment().format("YYYY-MM-DD HH:mm:ss");
}


/**
 * 获得与现在相差的天数
 * @param time
 * @returns {number}
 */
export function getDays(time) {
    if(time && time.length && time.length > 0){
        return  moment(time.map((record,index)=> index === 1 ?record-1:record)  ).diff(moment(),'days');
    }else {
        return 0;
    }
}


/**
 * 获得与现在相差的小时数
 * @param time
 * @returns {*}
 */
export function getHours(time) {
    if(time && time.length && time.length > 0){
        return  moment(time.map((record,index)=> index === 1 ?record-1:record)  ).diff(moment(),'hours');
    }else {
        return 0;
    }
}

