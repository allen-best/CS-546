const errorThrow = ( arr ) => { 
    if(arr === undefined 
        || !Array.isArray(arr)
        || arr.length === 0
        || !arr.every( e => typeof(e) === "number")){
        throw 'Error: Invalid input'; 
    }
}

const mean = arr => {
    errorThrow(arr);
    return arr.reduce((a,b) => a + b, 0) / arr.length;
} 

const medianSquared = arr => {
    errorThrow(arr);
    const len = arr.length;
    const arrSort = arr.sort();
    const mid = Math.ceil(len / 2);
    const median = len % 2 == 0 ? (arrSort[mid] + arrSort[mid - 1]) / 2 : arrSort[mid - 1];
    return Math.pow(median, 2); // Math.pow(arr.reduce((a,b) => a + b, 0) / arr.length);
}

const maxElement = arr => {
    errorThrow(arr);
    objRet = {}
    maxElm = Math.max(...arr);
    objRet[Math.max(...arr)] = arr.indexOf(maxElm);
    return objRet;
}

const fill = (end, value="") => {
    if(end === undefined 
        || typeof(end) !== "number"
        || !Number.isInteger(end)
        || end <= 0){
            throw 'Error: Invalid input';
        }
    let arrFill = [];
    for(let i = 0; i < end; i++) arrFill.push(i);
    arrFill = value !== "" ? arrFill.fill(value) : arrFill;
    return arrFill;
}

const countRepeating = arr => {
    if(arr === undefined 
        || !Array.isArray(arr)
        || (!arr.every( e => (typeof(e) === "number") || (typeof(e) === "string")))){
        throw 'Error: Invalid input'; 
    }
    const returnDict = {};
    arr.forEach(element => {
        const filtElement = String(element);
        returnDict[filtElement] = returnDict[filtElement] >= 1 ? returnDict[filtElement]+=1 : 1;
    });
    return Object.fromEntries(Object.entries(returnDict).filter(([k,v]) => v>1));
}

const isEqual = (arr1, arr2) => {
    if(arr1 === undefined 
        || arr2 === undefined 
        || !Array.isArray(arr1)
        || !Array.isArray(arr2)){
        throw 'Error: Invalid input'; 
    }
    if (arr1.length !== arr2.length) return false;

    for (var i = 0; i < arr1.length; ++i) { 
        if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
            arr1[i].sort() 
            arr2[i].sort()
            for (var j = 0; j < arr1[i].length; j++) {
                if (arr1[i][j] !== arr2[i][j]) return false;
            } 
        } else {
            arr1.sort()
            arr2.sort()
            if (arr1[i] !== arr2[i]) return false;
        }
    }

    return true;
}

module.exports = {
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
};