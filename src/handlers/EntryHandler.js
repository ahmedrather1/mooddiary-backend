'use strict';
const Entry = require('../models/Entry');
const EntryService = require('../services/EntryService');
const EntryValidationService = require('../services/EntryValidationService');

module.exports.addEntry = async function (context, req){

    
    const newEntry = new Entry();
    const es = new EntryService();
    newEntry.setMood(req.body.mood);
    newEntry.setDate(req.body.date);

    const validationService = new EntryValidationService();
    const error = await validationService.validateAddEntry(newEntry);

    if (error){
        context.res.status(error.erorrCode).send(JSON.stringify(error.errorList));
        return;
    }
    
    try{
        await es.createEntry(newEntry);
        context.res.send();
    }catch(e){
        context.res.status(e.erorrCode).send(JSON.stringify(e.errorList));
    }

}

module.exports.addQuestionnaire = async function (context, req){

    // should be a dictionary of {question: answer} 
    const questionnaire = req.body.questionnaireAnswers;
    const userID = req.body.userID;
    const entryID = req.body.id; 
    const es = new EntryService();

    try{
        await es.addQuestionnaireAnswers(questionnaire, userID, entryID);
        context.res.send();
    }catch(e){
        // console.log(JSON.stringify(e));
        context.res.status(400).send(JSON.stringify(e));
    }
}

module.exports.addPrompt = async function (context, req){

    // should be a dictionary of {question: answer} 
    const prompt = req.body.prompt;
    const userID = req.body.userID;
    const entryID = req.body.id; 
    const es = new EntryService();

    try{
        await es.addPrompt(prompt, userID, entryID);
        context.res.send();
    }catch(e){
        // console.log(JSON.stringify(e));
        context.res.status(400).send(JSON.stringify(e));
    }
}

module.exports.addFreeWrite = async function (context, req){

    // should be a dictionary of {question: answer} 
    const freeWrite = req.body.questionnaireAnswers;
    const userID = req.body.userID;
    const entryID = req.body.id; 
    const es = new EntryService();

    try{
        await es.addPrompt(freeWrite, userID, entryID);
        context.res.send();
    }catch(e){
        // console.log(JSON.stringify(e));
        context.res.status(400).send(JSON.stringify(e));
    }
}