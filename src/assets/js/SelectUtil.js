function selectUtil(val){
    let result = [];

    for(let i = 0; i < val.length; i++){
        let temp = new Object();

        temp.label = val[i].name;
        temp.value = val[i].id;

        result.push(temp);
    }

    return result;
}


export {
    selectUtil
}
