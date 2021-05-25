let Entry = require('../models/Entry');
const EntryService = require('../services/EntryService');

module.exports.addEntry = async function (context, req){

    let newEntry = new Entry();
    let es = new EntryService();
    newEntry.setMood(req.body.mood);
    // convert to datetime object eventually
    newEntry.setDate(req.body.date);

    try{
        await es.createEntry(newEntry);
        context.res.send();
    }catch(e){
        console.log(JSON.stringify(e));
        context.res.status(400).send(JSON.stringify(e));
    }
}

module.exports.addQuestionnaire = async function (context, req){

    //should be a dictionary of {question: answer} 
    let questionnaire = req.body.questionnaireAnswers;
    let userID = req.body.userID;
    let entryID = req.body.id; 
    var es = new EntryService();

    try{
        await es.addQuestionnaireAnswers(questionnaire, userID, entryID);
        context.res.send();
    }catch(e){
        console.log(JSON.stringify(e));
        context.res.status(400).send(JSON.stringify(e));
    }
}

module.exports.addPrompt = async function (context, req){

    //should be a dictionary of {question: answer} 
    let prompt = req.body.questionnaireAnswers;
    let userID = req.body.userID;
    let entryID = req.body.id; 
    var es = new EntryService();

    try{
        await es.addPrompt(prompt, userID, entryID);
        context.res.send();
    }catch(e){
        console.log(JSON.stringify(e));
        context.res.status(400).send(JSON.stringify(e));
    }
}

module.exports.addFreeWrite = async function (context, req){

    //should be a dictionary of {question: answer} 
    let freeWrite = req.body.questionnaireAnswers;
    let userID = req.body.userID;
    let entryID = req.body.id; 
    var es = new EntryService();

    try{
        await es.addPrompt(freeWrite, userID, entryID);
        context.res.send();
    }catch(e){
        console.log(JSON.stringify(e));
        context.res.status(400).send(JSON.stringify(e));
    }
}