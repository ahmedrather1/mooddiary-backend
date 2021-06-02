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
            errors.push(new DiaryErrorItem('date', 'DOESNOTEXIST'));     
        }else if(isNaN(Date.parse(entry.getDate()))){
            errors.push(new DiaryErrorItem('date', 'INVALID'));     
        }
        
    }

    if(errors.length===0){
        return null;
    }

    return new DiaryErrorObject(400, null, errors);


}

EntryValidationService.prototype.validateGetEntries = async function(entries, offsetVal, limitVal){
    console.log("length of list: " + entries.length);

    const errors = [];

    if(isNaN(offsetVal)){
        errors.push(new DiaryErrorItem('offset', 'INVALID'));
    }else if (offsetVal < 0){
        errors.push(new DiaryErrorItem('offset', 'NEGATIVE'));
    }else if (offsetVal >= entries.length){
        errors.push(new DiaryErrorItem('offset', 'TOO LARGE'));
    }

    if(isNaN(limitVal || limitVal < 0)){
        errors.push(new DiaryErrorItem('limit', 'INVALID'));
    }else if (limitVal <0){
        errors.push(new DiaryErrorItem('limit', 'NEGATIVE'));
    }

    if(errors.length===0){
        return null;
    }

    return new DiaryErrorObject(400, null, errors);
    
}

module.exports = EntryValidationService;