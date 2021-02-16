const errorThrow = ( arr ) => { 
    if(arr === undefined 
        || !Array.isArray(arr)
        || arr.length < 2
        || !arr.every( e => typeof(e) === "object")
        || arr.every( e => Object.keys(e).length === 0)){
        throw 'Error: Invalid input'; 
    }
}

const makeArrays = arr => {
    errorThrow(arr);
    let objArr = []
    arr.forEach(element => objArr.push(...Object.entries(element)));
    return objArr;
}

const isDeepEqual = (obj1, obj2) => {
    if (typeof(obj1) == 'object' && typeof(obj2) == 'object') {
        for (const property in obj1) {
            if (!(property in obj2) || !isDeepEqual(obj1[property], obj2[property])) return false;
        }
        for (const property in obj2) {
            if (!(property in obj1) || !isDeepEqual(obj1[property], obj2[property])) return false;
        }
        return true        
    } else return obj1 === obj2
}

const computeObject = (obj1, func) => {
    if(obj1 === undefined 
        || !typeof(obj1) === "object"
        || !typeof(func) === "function"
        || Object.keys(obj1).length === 0
        || !Object.values(obj1).every( e => typeof(e) === "number")){
        throw 'Error: Invalid input'; 
    }
    newDict = {}
    for (const property in obj1) {
        newDict[property] = func(obj1[property])
    }
    return newDict;
}

module.exports = {
    makeArrays,
    isDeepEqual,
    computeObject
};