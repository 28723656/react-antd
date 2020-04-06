/**
 * 获取一个随机整数
 * @param randomLength
 * @returns {string}
 * @constructor
 */
export function GenNonDuplicateID () {
    return (Math.round(Math.random() * 100000)).toString() + Date.now().toString()
}

export function GenIntegerId () {
    return ((Math.round(Math.random() * 10)).toString() + Date.now().toString()) * 1
}

/**
 * 获取一个随机整数，从begin 到end  :[begin,end]
 * @param begin
 * @param end
 */
export function getRandomNumberFromTo (begin = 1, end = 10) {
    return Math.floor(Math.random() * end + begin)
}

/**
 * 返回一个有number长度的,并且数值范围在begin和end之前的数组
 * @param number
 * @param begin
 * @param end
 */
export function getRandomArrayFromTo (begin = 1, end = 10, number = 1,) {
    if (number <= 0 || begin > end) {
        return []
    }
    if (end - begin + 1 <= number) {
        return getArrayFromTo(begin, end)
    }
    let set = new Set()
    while (set.size < number) {
        const randomNumber = getRandomNumberFromTo(begin, end)
        set.add(randomNumber)
    }
    return [...set].sort()
}

/**
 * 得到一个数组，从begin到end,每隔step步。  例如，(2,4) => [2,3,4]
 * @param begin
 * @param end
 * @param step
 */
export function getArrayFromTo (begin = 1, end = 10, step = 1) {
    if (begin > end) {
        return []
    }
    if (begin === end) {
        return [begin]
    }
    let current = begin
    let arr = []
    while (current <= end) {
        arr.push(current)
        current += step
    }
    return arr
}

/**
 * 得到一个数组，从给定的数组中得到一个随机的内容不重复的长度为number的数组
 * @param arr
 * @param number
 */
export function getRandomArrayFromArray (arr, number) {
    if (!arr || arr.length === 0) {
        return []
    }
    if (!number) {
        return []
    }
    const result = new Set()
    if (arr && arr.length > 0) {
        let set = new Set(arr)
        if (set.size <= number) {
            return arr
        } else {
            let theArr = [...set]
            while (result.size < number) {
                const randomNumber = getRandomNumberFromTo(0, theArr.length - 1)
                result.add(theArr[randomNumber])
            }

        }
    }
    return [...result].sort();
}
