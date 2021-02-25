const axios = require('axios');

const errorThrowID = ( id ) => { 
    if(id === undefined || typeof(id) !== "number"){
        throw 'Error: Invalid input'; 
    }
}

const peopleStr = 'https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json'

async function getPeople(){
    const { data } = await axios.get(peopleStr);
    return data // this will be the array of people objects
}

const getPersonById = async id => {
    errorThrowID(id);

    const { data } = await axios.get(peopleStr);
    if(id > data.length || id < 1){
        throw 'Error: Input out of bounds'; 
    }
    // const parsedData = JSON.parse(data)
    return data[id-1];
}

const howManyPerState = async state => {
    if(state === undefined || typeof(state) !== "string"){
        throw 'Error: Invalid input'; 
    }

    const { data } = await axios.get(peopleStr);

    const people_with_state = data.filter(people => people.address.state === state);

    if(people_with_state.length <= 0){
        throw 'Error: No people in state'; 
    }

    return people_with_state.length;
}

const findAge = obj => {
    const new_obj = Object.assign({}, obj);
    const birthDate = new Date(obj.date_of_birth);

    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    const persons_age = Math.abs(ageDate.getUTCFullYear() - 1970);
    
    new_obj.age = persons_age;
    return new_obj;
}

const personByAge = async index => {
    errorThrowID(index);
    const { data } = await axios.get(peopleStr);
    if(index >= data.length || index < 0){
        throw 'Error: Input out of bounds'; 
    }

    const result = data.map(findAge);
    const sort_data = result.sort((a, b) => new Date(a.date_of_birth) - new Date(b.date_of_birth));

    return {'first_name':sort_data[index]['first_name'], 'last_name':sort_data[index]['last_name'], 'date_of_birth':sort_data[index]['date_of_birth'], 'age':sort_data[index]['age']};
}

const peopleMetrics = async () => {
    let letterType = {'totalLetters':0, 'totalConsonants': 0, 'totalVowels': 0, 'longestName':0, 'shortestName':0, 'mostRepeatingCity':0, 'averageAge':0}
    const consonantsChar = /[bcdfghjklmnpqrstvwxyz]/gi;
    const vowelChars = /[aeiou]/gi;

    const { data } = await axios.get(peopleStr);

    let citiesCompare = {};
    let totalAge = 0;
    data.forEach(element => {
        letterType['totalConsonants'] += element.first_name.match(consonantsChar) ? element.first_name.match(consonantsChar).length : 0;
        letterType['totalConsonants'] += element.last_name.match(consonantsChar) ? element.last_name.match(consonantsChar).length : 0;
        letterType['totalVowels'] += element.first_name.match(vowelChars) ? element.first_name.match(vowelChars).length : 0;
        letterType['totalVowels'] += element.last_name.match(vowelChars) ? element.last_name.match(vowelChars).length : 0;
        letterType['longestName'] = element.first_name.length + element.last_name.length > letterType['longestName'] ? element.first_name + element.last_name : letterType['longestName'];
        letterType['shortestName'] = element.first_name.length + element.last_name.length < letterType['shortestName'].length ? element.first_name + element.last_name : letterType['shortestName'];
        citiesCompare[element.address.city] += 1;
        const newObj = findAge(element)
        totalAge += newObj.age;
    });
    letterType['totalLetters'] = letterType['totalVowels'] + letterType['totalConsonants'];
    letterType['mostRepeatingCity'] = Object.keys(citiesCompare).reduce((a, b) => citiesCompare[a] > citiesCompare[b] ? a : b);
    letterType['averageAge'] = totalAge / data.length;
    return letterType;
}

module.exports = {
    getPeople,
    getPersonById,
    howManyPerState,
    personByAge,
    peopleMetrics
};