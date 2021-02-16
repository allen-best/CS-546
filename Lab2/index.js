const {mean, medianSquared, maxElement, fill, countRepeating, isEqual} = require("./arrayUtils");
const {camelCase, replaceChar, mashUp} = require("./stringUtils");
const {makeArrays, isDeepEqual, computeObject} = require("./objUtils");

// Array Util Test

// mean(array)
try {
    // Should Pass
    const meanOne = mean([2, 3, 4]);
    const meanTwo = mean([1, 2, 3]);
    console.log('mean passed successfully', meanOne, meanTwo);
} catch (e) {
    console.error('mean failed test case');
}
try {
    // Should Fail
    const failedMeanOne = mean(1234);
    const failedMeanTwo = mean([]);
    const failedMeanThree = mean("banana");
    const failedMeanFour = mean(["guitar", 1, 3, "apple"]);
    const failedMeanFive = mean();
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

// medianSquared(array)
try {
    // Should Pass
    const medSqOne = medianSquared([1, 2, 3, 4, 5]);
    const medSqTwo = medianSquared([1, 2, 3]);
    const medSqThree = medianSquared([1, 3, 7, 8]);
    console.log('median squared passed successfully', medSqOne, medSqTwo, medSqThree);
} catch (e) {
    console.error('median squared failed test case');
}
try {
    // Should Fail
    const failedMedOne = medianSquared([]) // throws an error
    const failedMedTwo = medianSquared("banana"); // throws an error
    const failedMedThree = medianSquared(1,2,3); // throws an error
    const failedMedFour = medianSquared(["guitar", 1, 3, "apple"]); // throws an error
    const failedMedFive = medianSquared(); // throws an error
    console.error('median squared did not error');
} catch (e) {
    console.log('median squared failed successfully');
}

// maxElement(array)
try {
    // Should Pass
    const maxElemOne = maxElement([5, 6, 7]); // Returns: {'7': 2}
    console.log('max element passed successfully', maxElemOne);
} catch (e) {
    console.error('max element failed test case');
}
try {
    // Should Fail
    const failedMaxElemOne = maxElement(5, 6, 7); // throws error
    const failedMaxElemTwo = maxElement([]); // throws error
    const failedMaxElemThree = maxElement(); // throws error
    const failedMaxElemFour = maxElement("test"); // throws error
    const failedMaxElemFive = maxElement([1,2,"nope"]); // throws error
    console.error('max element did not error');
} catch (e) {
    console.log('max element failed successfully');
}

// fill(end, value)
try {
    // Should Pass
    const fillOne = fill(6); // Returns: [0, 1, 2, 3, 4, 5]
    const fillTwo = fill(3, 'Welcome'); // Returns: ['Welcome', 'Welcome', 'Welcome']
    console.log('fill passed successfully', fillOne, fillTwo);
} catch (e) {
    console.error('fill failed test case');
}
try {
    // Should Fail
    const failedFillOne = fill(); // Throws error
    const failedFillTwo = fill("test"); // Throws error
    const failedFillThree = fill(0); // Throws Error
    const failedFillFour = fill(-4); // Throws Error
    console.error('fill did not error');
} catch (e) {
    console.log('fill failed successfully');
}

// countRepeating(array)
try {
    // Should Pass
    const countOne = countRepeating([7, '7', 13, "Hello","Hello", "hello"]); //Returns {'7': 2, Hello: 2} 
    console.log('count passed successfully', countOne);
} catch (e) {
    console.error('count failed test case', e);
}
try {
    // Should Fail
    const failedCountOne = countRepeating([7, '7', 13, true, null]); //Throws error
    const failedCountTwo = countRepeating([(message)=>message, true, undefined, null]); //Throws error
    const failedCountThree = countRepeating([]);  //Returns {}
    const failedCountFour = countRepeating([1,2,3]);  //Returns {}
    console.error('count did not error', failedCountThree, failedCountFour);
} catch (e) {
    console.log('count failed successfully');
}

// isEqual(arrayOne, arrayTwo)
try {
    // Should Pass
    const equalOne = isEqual([1, 2, 3], [3, 1, 2]); // Returns: true
    
    const equalTwo = isEqual([ 'Z', 'R', 'B', 'C', 'A' ], ['R', 'B', 'C', 'A', 'Z']); // Returns: true
    const equalThree = isEqual([1, 2, 3], [4, 5, 6]); // Returns: false
    const equalFour = isEqual([1, 3, 2], [1, 2, 3, 4]); // Returns: false
    const equalFive = isEqual([1, 2], [1, 2, 3]); // Returns: false
    const equalSix = isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]]); // Returns: true
    const equalSeven = isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 11 ], [ 9, 7, 8 ]]); // Returns: false
    const equalEight = isEqual([null, null, null], [null, null, null]); // Returns: true
    console.log('equal passed successfully', equalOne, equalTwo, equalThree, equalFour, equalFive, equalSix, equalSeven, equalEight);
} catch (e) {
    console.error('equal failed test case', e);
}


// String Util Tests
try {
    // Should Pass
    const camelOne = camelCase('my function rocks'); // Returns: "myFunctionRocks"
    const camelTwo = camelCase('FOO BAR'); // Returns: "fooBar"
    const camelThree = camelCase("How now brown cow"); // Returns: "howNowBrownCow"
    console.log('camel passed successfully', camelOne, camelTwo, camelThree);
} catch (e) {
    console.error('camel failed test case');
}
try {
    // Should Fail
    const failedCamelOne = camelCase(); // Throws Error
    const failedCamelTwo = camelCase(''); // Throws Error
    const failedCamelThree = camelCase(123); // Throws Error
    const failedCamelFour = camelCase(["Hello", "World"]); // Throws Error
    console.error('camel did not error');
} catch (e) {
    console.log('camel failed successfully');
}

try {
    // Should Pass
    const replaceOne = replaceChar("Daddy"); // Returns: "Da*$y"
    const replaceTwo = replaceChar("Mommy"); // Returns: "Mo*$y"
    const replaceThree = replaceChar("Hello, How are you? I hope you are well"); // Returns: "Hello, *ow are you? I $ope you are well"
    const replaceFour = replaceChar("babbbbble"); // Returns: "ba*$*$*le"
    console.log('replace passed successfully', replaceOne, replaceTwo, replaceThree, replaceFour);
} catch (e) {
    console.error('replace failed test case', e);
}
try {
    // Should Fail
    const failedReplaceOne = replaceChar(""); // Throws Error
    const failedReplaceTwo = replaceChar(123); // Throws Error
    console.error('replace did not error');
} catch (e) {
    console.log('replace failed successfully');
}

try {
    // Should Pass
    const mashOne = mashUp("Patrick", "Hill"); //Returns "Hitrick Pall"
    const mashTwo = mashUp("hello", "world"); //Returns "wollo herld"
    console.log('mash passed successfully', mashOne, mashTwo);
} catch (e) {
    console.error('mash failed test case', e);
}
try {
    // Should Fail
    const failedMashOne = mashUp("Patrick", ""); //Throws error
    const failedMashTwo = mashUp(); // Throws Error
    const failedMashThree = mashUp("John") // Throws error
    const failedMashFour = mashUp ("h", "Hello") // Throws Error
    const failedMashFive = mashUp ("h","e") // Throws Error
    console.error('mash did not error');
} catch (e) {
    console.log('mash failed successfully');
}

// Object Util Tests
try {
    // Should Pass
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };
    const firstSecondThird = makeArrays([first, second, third]);
    // [ ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5], ['x',0], ['y',9], ['q',10] ]

    const secondThird = makeArrays([second, third]);
    // [ ['a',70], ['x', 4], ['z', 5], ['x',0], ['y',9], ['q',10] ]

    const thirdFirstSecond = makeArrays([third, first, second]);
    // [  ['x',0], ['y',9], ['q',10], ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5] ]
    console.log('make arrays passed successfully', firstSecondThird, secondThird, thirdFirstSecond);
} catch (e) {
    console.error('make arrays failed test case', e);
}

try {
    // Should Pass
    const first = {a: 2, b: 3};
    const second = {a: 2, b: 4};
    const third = {a: 2, b: 3};
    const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
    const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
    const deepOne = isDeepEqual(first, second); // false
    const deepTwo = isDeepEqual(forth, fifth); // true
    const deepThree = isDeepEqual(forth, third); // false
    const deepFour = isDeepEqual({}, {}); // true

    console.log('deep objet passed successfully', deepOne, deepTwo, deepThree, deepFour);
} catch (e) {
    console.error('deep objet failed test case', e);
}

try {
    // Should Pass
    const computeOne = computeObject({ a: 3, b: 7, c: 5 }, n => n * 2);
    /* Returns:
    {
      a: 6,
      b: 14,
      c: 10
    }
    */
    console.log('compute passed successfully', computeOne);
} catch (e) {
    console.error('compute failed test case', e);
}
