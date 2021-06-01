'use strict';
const DiaryErrorItem = require('../models/DiaryErrorItem');
const DiaryErrorObject = require('../models/DiaryErrorObject');

function EntryValidationService(){

}

EntryValidationService.prototype.validateAddEntry = async function(entry){

    const errors = [];

    if(entry==null){
        errors.push(new DiaryErrorItem('entry', 'NULL'));
    }else{
        
        if(entry.getMood() == null){
            errors.push(new DiaryErrorItem('mood', 'DOESNOTEXIST'));
        }else if(isNaN(entry.getMood())){
            errors.push(new DiaryErrorItem('mood', 'INVALID'));     
        }

        if(entry.getDate() == null){
            errors.push(new DiaryErrorItem(400, 'date', 'DOESNOTEXIST'));     
        }else if(isNaN(Date.parse(entry.getDate()))){
            errors.push(new DiaryErrorItem(400, 'date', 'INVALID'));     
        }
        
    }

    if(errors.length===0){
        return null;
    }

    return new DiaryErrorObject(400, null, errors);


}

module.exports = EntryValidationService;