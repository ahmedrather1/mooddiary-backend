'use strict';
function EntryValidationService(){

}

EntryValidationService.prototype.validateAddEntry = async function(entry){

    const error = {
        errors:[]
    };

    if(entry==null){
        error.errors.push({'entry':'NULL'});
    }else{
        if(entry.getMood() == null){
            error.errors.push({'mood': 'DOESNOTEXIST'});
        }
        if(isNaN(entry.getMood())){
            error.errors.push({'mood': 'INVALID'});
        }
        if(entry.getDate() == null){
            error.errors.push({'date': 'DOESNOTEXIST'});
        }
        if(isNaN(Date.parse(entry.getDate()))){
            error.errors.push({'date':'INVALID'});
        }
    }

    return error;


}



module.exports = EntryValidationService;