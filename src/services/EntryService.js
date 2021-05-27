let Entry = require('../models/Entry');
let azure = require('azure-storage');
const { v4: uuidv4 } = require('uuid');



function EntryService() {

}

let errorThrower = function(a) {
    console.log(a);
    throw a;
}

EntryService.prototype.createEntry = async function(entry){
    //create entry and add to user's entry list
    let tableService = azure.createTableService("devstoreaccount1", 'Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==', 'http://127.0.0.1:10002/devstoreaccount1');
    let partitionKeyName = process.env.PARTITION_KEY_NAME;
    let rowKeyName = uuidv4();

    let entGen = azure.TableUtilities.entityGenerator;
    let diary_entry = {
    PartitionKey: entGen.String(partitionKeyName),
    RowKey: entGen.String(rowKeyName),
    mood: entGen.String(entry.mood),
    Date: entGen.DateTime(new Date(entry.date)),
    };

    let possibleError = null;
    tableService.insertEntity('DiaryEntries', diary_entry, function(error, result, response){
        if(error){
            possibleError = error;
            console.log(error);
        }
    })

    if (possibleError != null){
        throw possibleError;
    }


}

EntryService.prototype.addQuestionnaireAnswers = async function(questionnaire, userID, entryID){
    // add questionnaire's answers to user's entry list using userID and entryID
}

EntryService.prototype.addPrompt = async function(prompt, userID, entryID){
    // add prompt to user's entry list using userID and entryID
}

EntryService.prototype.addFreeWrite = async function(freeWrite, userID, entryID){
    // add prompt to user's entry list using userID and entryID
}


module.exports = EntryService;