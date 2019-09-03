import moment from 'moment';

/**
 * moment传入数组的时候，月份要减去一个月
 * @param time
 * @returns {string}
 */
export function getMomentTime(time) {
    if(time && time.length && time.length > 0){
        return  moment(time.map((record,index)=> index === 1 ?record-1:record)  ).format("YYYY-MM-DD HH:mm:ss")
    }else {
        return null;
    }
}
