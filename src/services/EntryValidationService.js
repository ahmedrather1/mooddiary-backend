'use strict';
const DiaryErrorItem = require('../models/DiaryErrorItem');
const DiaryErrorObject = require('../models/DiaryErrorObject');

function EntryValidationService(){

}

EntryValidationService.prototype.validateAddEntry = async function(entry){

    const errors = new DiaryErrorObject()

    if(entry==null){
        errors.addErrorItem(new DiaryErrorItem(400, 'entry', 'NULL'));
    }else{
        
        if(entry.getMood() == null){
            errors.addErrorItem(new DiaryErrorItem(400, 'mood', 'DOESNOTEXIST'));
        }else if(isNaN(entry.getMood())){
            errors.addErrorItem(new DiaryErrorItem(400, 'mood', 'INVALID'));     
        }

        if(entry.getDate() == null){
            errors.addErrorItem(new DiaryErrorItem(400, 'date', 'DOESNOTEXIST'));     
        }else if(isNaN(Date.parse(entry.getDate()))){
            errors.addErrorItem(new DiaryErrorItem(400, 'date', 'INVALID'));     
        }
        
    }

    return errors;


}

module.exports = EntryValidationService;