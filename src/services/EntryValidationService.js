'use strict';
const DiaryError = require('../models/DiaryError');

function EntryValidationService(){

}

EntryValidationService.prototype.validateAddEntry = async function(entry){

    const errors = [];

    if(entry==null){
        errors.push(new DiaryError(400, 'entry', 'NULL'));
    }else{
        
        if(entry.getMood() == null){
            errors.push(new DiaryError(400, 'mood', 'DOESNOTEXIST'));
        }else if(isNaN(entry.getMood())){
            errors.push(new DiaryError(400, 'mood', 'INVALID'));     
        }

        if(entry.getDate() == null){
            errors.push(new DiaryError(400, 'date', 'DOESNOTEXIST'));     
        }else if(isNaN(Date.parse(entry.getDate()))){
            errors.push(new DiaryError(400, 'date', 'INVALID'));     
        }
        
    }

    return errors;


}

module.exports = EntryValidationService;