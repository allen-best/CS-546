const errorThrow = ( str ) => { 
    if(str === undefined 
        || str.length <= 0
        || !typeof(str) === "string"
        || str.match(/^ *$/) !== null){
        throw 'Error: Invalid input'; 
    }
}

const errorThrow2 = ( str ) => { 
    if(str === undefined 
        || str.length < 2
        || !typeof(str) === "string"
        || str.match(/^ *$/) !== null){
        throw 'Error: Invalid input'; 
    }
}

const camelCase = str => {
    errorThrow(str);
    searchWord = str.toLowerCase();
    return searchWord.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

const replaceChar = str => {
    errorThrow(str);
    const firstChar = str[0];
    let astBool = true;
    let newStr = str;
    for(let i = 1; i <= str.length -1; i++){
        if(str[i].toLowerCase() === firstChar.toLowerCase()){
            const firstPart = newStr.substr(0, i);
            const lastPart = newStr.substr(i + 1);
            const replacePart = astBool ? '*' : '$';
            newStr = firstPart + replacePart + lastPart;
            astBool = !astBool;
        }
    }
    return newStr;
}

const mashUp = (str1, str2) => {
    errorThrow2(str1);
    errorThrow2(str2);
    return str2.split(str2[2])[0] + str1.split(str1[1]).pop() + " " + str1.split(str1[2])[0] + str2.split(str2[1]).pop();
}

module.exports = {
    camelCase,
    replaceChar,
    mashUp
};