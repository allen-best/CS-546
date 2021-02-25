const axios = require('axios');
const people = require("./people");

const errorThrowNumber = ( phoneNum ) => { 
    const regexStr = new RegExp('^[0-9]{3}-[0-9]{3}-[0-9]{4}$');
    if(phoneNum === undefined || !typeof(phoneNum) === "string" || !regexStr.test(phoneNum)){
        throw 'Error: Invalid input'; 
    }
}

const errorThrowSSN = ( ssn ) => { 
    const regexStr = new RegExp('^[0-9]{3}-[0-9]{2}-[0-9]{4}$');
    if(ssn === undefined || !typeof(ssn) === "string" || !regexStr.test(ssn)){
        throw 'Error: Invalid input'; 
    }
}

const workStr = 'https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json'

async function getWork(){
    const { data } = await axios.get(workStr);
    return data // this will be the array of people objects
}

const listEmployees = async () => {
    const workData = await getWork();
    const peopleData = await people.getPeople();
    
    var result = workData.map(function(obj) {
        const new_obj = Object.assign({}, {"company_name":obj.company_name, "employees":[]});
        obj.employees.forEach(employee => {
            let emp = peopleData.find(element => element.id == employee)
            new_obj.employees.push({'first_name':emp.first_name, 'last_name':emp.last_name}); //value.filter(people => people.id === employee)
        });
        return new_obj;
    });

    return result;
};

const fourOneOne = async phoneNumber => {
    errorThrowNumber(phoneNumber);
    let final_object;
    const workData = await getWork();
    workData.forEach(obj => {
        if(obj.company_phone === phoneNumber) final_object = {'company_name':obj.company_name,'company_address':obj.company_address};
    })
    if(final_object === undefined) throw 'Error: No one exists for that phone number';
    return final_object;
};

const whereDoTheyWork = async ssn => {
    errorThrowSSN(ssn);
    const workData = await getWork();
    const peopleData = await people.getPeople();
    let persons_name = '';
    let persons_id;
    let company_name;
    peopleData.forEach( obj => {
        if(obj.ssn === ssn){
            persons_name = obj.first_name + ' ' + obj.last_name;
            persons_id = obj.id;
        }
    });
    if(persons_name === undefined || persons_id === undefined) throw 'Error: No one exists for that SSN';
    workData.forEach(obj => {
        if(obj.employees.includes(persons_id)) company_name = obj.company_name;
    })
    return persons_name + ' works at ' + company_name;
};

module.exports = {
    listEmployees,
    fourOneOne,
    whereDoTheyWork
};