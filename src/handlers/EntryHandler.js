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
        context.res.status(error.errorCode).send(JSON.stringify(error.errorList));
        return;
    }
    
    try{
        await es.createEntry(newEntry);
        context.res.send();
    }catch(e){
        context.res.status(e.errorCode).send(JSON.stringify(e.errorList));
    }

}

module.exports.getEntries = async function (context, req){
    const es = new EntryService;

    let fromDate = new Date();
    if (req.query.createdFrom && !isNaN(Date.parse(req.query.createdFrom))){
        fromDate = req.query.createdFrom;
    }else{
        fromDate.setDate(fromDate.getDate() - 7);
    }

    let toDate = new Date();
    if (req.query.createdTo && !isNaN(Date.parse(req.query.createdTo))){
        toDate = req.query.createdTo;
    }else{
        toDate.setDate(toDate.getDate() +1 );
    }

    const limitVal = req.query.limit && !isNaN(req.query.limit) && req.query.limit>0  ? req.query.limit: process.env.DEFAULT_GETENTRIES_LIMIT;

    try{
        let entries;
        entries = await es.getEntriesData(fromDate, toDate, limitVal);
        context.res.send(JSON.stringify({DiaryEntries: entries, fromDate: fromDate, toDate: toDate, limit: limitVal}));
    }catch(e){
        context.res.status(e.errorCode).send(JSON.stringify(e.errorList));
        return;
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