let Entry = require('../models/Entry');
let azure = require('azure-storage');
const { v4: uuidv4 } = require('uuid');


let table;
function EntryService() {
    // tjese specific values should be in process.env
    
    table = azure.createTableService('devstoreaccount1', 'Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==', 'http://127.0.0.1:10002/devstoreaccount1');
    table.createTableIfNotExists('DiaryEntries', function(error, result, response){
        if(!error){
            // Table exists or created
          }
    })
}

EntryService.prototype.createEntry = async function(entry){
    //create entry and add to user's entry list
    let partitionKeyName = 'entries';
    let rowKeyName = uuidv4();

    let entGen = azure.TableUtilities.entityGenerator;
    let diary_entry = {
    PartitionKey: entGen.String(partitionKeyName),
    RowKey: entGen.String(rowKeyName),
    mood: entGen.String(entry.mood),
    Date: entGen.DateTime(new Date(entry.date)),
    };

    table.insertEntity('DiaryEntries', diary_entry, function(error, result, response){
        if(!error){
            // entry added
        }
    })


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