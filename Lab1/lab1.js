const { element } = require("prop-types");

const questionOne = function questionOne(arr) {
    // Implement question 1 here
    if(!arr || arr.length < 1) return {};
    let finalArr = []
    arr.forEach(element => {
        let isPrime = true;
        let primeObj = {}
        if(element === 1) isPrime = false;
        for(let i = 2; i < element; i++){
            if(element % i === 0){
                isPrime = false;
                break;
            }
        }
        primeObj[element] = isPrime
        finalArr.push(primeObj)
    });
    return finalArr;
}

const questionTwo = function questionTwo(arr) { 
    // Implement question 2 here
    if(!arr || arr.length < 1) return 0;
    let sumOfSqrs = Math.sqrt(Math.pow(arr.map(value => Math.pow(value,2)).reduce((a, b) => a + b, 0), 5));
    return sumOfSqrs.toFixed(2);
}

const questionThree = function questionThree(text) {
    // Implement question 3 her
    let letterType = {'consonants': 0, 'vowels': 0, 'numbers': 0, 'spaces':0, 'punctuation': 0, 'specialCharacters': 0}
    const consonantsChar = /[bcdfghjklmnpqrstvwxyz]/gi;
    const vowelChars = /[aeiou]/gi;
    const numChars = /[1234567890]/g;
    const puncChar = /[,.;'!"?:]/g;
    const specialChars = /[@#$%^&*()_+\-=\[\]{}\\|<>\/]/g;

    letterType['spaces'] = (text.split(" ").length -1);

    letterType["consonants"] = text.match(consonantsChar) ? text.match(consonantsChar).length : 0;
    letterType["vowels"] = text.match(vowelChars) ? text.match(vowelChars).length : 0;
    letterType["numbers"] = text.match(numChars) ? text.match(numChars).length : 0;
    letterType["punctuation"] = text.match(puncChar) ? text.match(puncChar).length : 0;
    letterType["specialCharacters"] = text.match(specialChars) ? text.match(specialChars).length : 0;
    return(letterType);

}

const questionFour = function questionFour(num1, num2, num3) {
    // Implement question 4 here
    const loanAmount = num1;
    const interestRate = num2 * .01;
    const monthlyPaments = num3 * 12;
    let finalValule = (interestRate*loanAmount/12)/(1-Math.pow(interestRate/12+1, - monthlyPaments))
    return finalValule.toFixed(2);
}

module.exports = {
    firstName: "Allen", 
    lastName: "Best", 
    studentId: "10420443",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};