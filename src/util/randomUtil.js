/**
 * 获取一个随机整数
 * @param randomLength
 * @returns {string}
 * @constructor
 */
export   function GenNonDuplicateID(){
    return (Math.round(Math.random()*100000)).toString()+Date.now().toString();
}

export   function GenIntegerId(){
    return ((Math.round(Math.random()*10)).toString()+Date.now().toString())*1;
}
