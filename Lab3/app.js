const people = require("./people");
const work = require("./work");

async function main(){
    // try{
    //     const peopledata = await people.getPersonById();
    //     console.log (peopledata);
    // }catch(e){
    //     console.log (e);
    // }
    // try{
    //     const peopledata = await people.howManyPerState(-1);
    //     console.log (peopledata);
    // }catch(e){
    //     console.log (e);
    // }
    // try{
    //     const peopledata = await people.personByAge();
    //     console.log (peopledata);
    // }catch(e){
    //     console.log (e);
    // }
    try{
        const peopledata = await people.peopleMetrics();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    // try{
    //     const peopledata = await work.listEmployees();
    //     console.log (peopledata);
    // }catch(e){
    //     console.log (e);
    // }
    // try{
    //     const peopledata = await work.fourOneOne();
    //     console.log (peopledata);
    // }catch(e){
    //     console.log (e);
    // }
    // try{
    //     const peopledata = await work.whereDoTheyWork();
    //     console.log (peopledata);
    // }catch(e){
    //     console.log (e);
    // }
}

//call main
main();