'use strict';
const azure = require('azure-storage');
const { v4: uuidv4 } = require('uuid');
const DiaryError = require('../models/DiaryError');


function EntryService() {

}


EntryService.prototype.createEntry = async function(entry){
    // create entry and add to user's entry list
    const tableService = azure.createTableService(process.env.TABLE_STORAGE_ACCOUNT, process.env.TABLE_STORAGE_ACCESS_KEY, process.env.TABLE_STORAGE_HOST_ADDR);
    const partitionKeyName = process.env.PARTITION_KEY_NAME;
    const rowKeyName = uuidv4();

    const entGen = azure.TableUtilities.entityGenerator;
    const diaryEntry = {
    PartitionKey: entGen.String(partitionKeyName),
    RowKey: entGen.String(rowKeyName),
    mood: entGen.String(entry.mood),
    date: entGen.DateTime(new Date(entry.date)),
    };

    /*
    console.log("----before insert entity... 0");
    tableService.insertEntity('DiaryEntrie', diaryEntry, function(error){
        console.log("inside callback....1");
    });

    console.log("after insert entity... 2"); */


    const insertEntityPromise = (...args) => {
        return new Promise((resolve, reject) => {
            tableService.insertEntity(...args, (error, result, response) => {
            if (error) return reject(error)
            // You can't send two arguments into resolve
            resolve([result, response])
          })
        })
    }
    await insertEntityPromise('DiaryEntries', diaryEntry)
        .then(([result,response]) => {
            // nothing, success
        })
        .catch(err => {
            throw new DiaryError(500, 'table', 'server error', err);
        })


}

/*
EntryService.prototype.addQuestionnaireAnswers = async function(questionnaire, userID, entryID){
    // add questionnaire's answers to user's entry list using userID and entryID
}

EntryService.prototype.addPrompt = async function(prompt, userID, entryID){
    // add prompt to user's entry list using userID and entryID
}

EntryService.prototype.addFreeWrite = async function(freeWrite, userID, entryID){
    // add prompt to user's entry list using userID and entryID
}
*/

module.exports = EntryService;