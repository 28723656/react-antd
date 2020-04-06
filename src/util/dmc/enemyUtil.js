/**
 * 传入一个怪物id数组，和总数量，随机分配每个敌人的数目
 * @param arr
 * @param totalNumber
 */
import { dmcDataSource } from './default'

export function getEnemyArrayByIdsAndTotalNumber (arr, totalNumber) {
    if (!arr || arr.length === 0 || totalNumber <= 0) {
        return null
    }
    let { length } = arr
    const result = arr.reduce((pre, cur, index) => {
        // 如果是最后一个
        let { theArr, sum } = pre
        let num = Math.floor(totalNumber / length)
        if (index === length - 1) {
            num = totalNumber - sum
        }
        sum = sum + num
        theArr.push({ id: cur, num })
        return { ...pre, sum }
    }, { theArr: [], sum: 0 })
    return result.theArr
}

/**
 * 处理特殊楼层
 * @param n
 */
export function getSpecialLevel (n) {
    if (n % 20 === 0 || n === 101) {
        switch (n) {
            case 20:
                return [{ ...dmcDataSource.find(item => item.id === 21), num: 1 }]
            case 40:
                return [{ ...dmcDataSource.find(item => item.id === 22), num: 1 }]
            case 60:
                return [{ ...dmcDataSource.find(item => item.id === 23), num: 1 }]
            case 80:
                return [{ ...dmcDataSource.find(item => item.id === 24), num: 1 }]
            case 100:
                return [{ ...dmcDataSource.find(item => item.id === 25), num: 1 }]
            case 101:
                return [{ ...dmcDataSource.find(item => item.id === 26), num: 1 }]

        }
    } else {
        // 否则给一个友好的
        return [{ ...dmcDataSource.find(item => item.id === 4), num: 1 }]
    }
}

/**
 * 把数据处理成配置文件的样子, 就是default.js的 DEFAULT_CONFIG这个样子
 * @param arr
 */
export function translateArrayToConfiguration (arr) {
    // 这里我就不做为空判断了，很烦
    return arr.map((item, index) => {
        const begin = `+m_WaveData=(WaveNum=${index + 1}, Enemies=(`
        const end = '))'
        const center = item.reduce((innerResult, innerItem, innerIndex, innerArray) => {
            let enemyString
            if (innerArray.length - 1 === innerIndex) {
                enemyString = `(EnemyName=${innerItem.engName}, Num=${innerItem.num})`
            } else {
                enemyString = `(EnemyName=${innerItem.engName}, Num=${innerItem.num}), `
            }
            innerResult += enemyString
            return innerResult
        }, '')
        return begin + center + end
    })
}

/**
 * 把数据处理成人能看懂的样子
 * @param arr
 */
export function translateArrayToHumanCanRead (arr) {

}
