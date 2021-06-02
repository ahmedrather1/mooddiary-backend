'use strict';
const { reject } = require('async');
const azure = require('azure-storage');
//const { resolve } = require('node:path');
const { v4: uuidv4 } = require('uuid');
const DiaryErrorItem = require('../models/DiaryErrorItem');
const DiaryErrorObject = require('../models/DiaryErrorObject');


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

    const insertEntityPromise = (...args) => {
        return new Promise((resolve, reject) => {
            tableService.insertEntity(...args, (error, result, response) => {
            if (error) return reject(error);
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
            throw new DiaryErrorObject(500, new DiaryErrorItem('table', 'server error', err) );
        })


}


EntryService.prototype.getEntriesData = async function(){
    const tableService = azure.createTableService(process.env.TABLE_STORAGE_ACCOUNT, process.env.TABLE_STORAGE_ACCESS_KEY, process.env.TABLE_STORAGE_HOST_ADDR);

    const getEntriesPromise = (...args) => {
        return new Promise((resolve, reject) => {
            tableService.queryEntities(...args, (error, result) => {
                if (error) return reject(error);
                resolve(result)
            })
        })
    }
    let entities;

    await getEntriesPromise('DiaryEntries', null, null)
        .then((result) => {
            entities = result.entries;
        })
        .catch(err => {
            throw new DiaryErrorObject(500, new DiaryErrorItem('table', 'server error', err) );
        })

    return entities;
    
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