'use strict';
function DiaryErrorObject(errCode, errItem = null, errList = []){
    this.errorCode = errCode;
    this.errorList = [];
    if(errList){
        this.errorList = errList;
    }
    if(errItem){
        this.errorList.push(errItem);
    }
}

DiaryErrorObject.prototype.addErrorItem = function(val){
    this.errorList.push(val)
}

DiaryErrorObject.prototype.getErrorList = function(){
    return this.errorList;
}

module.exports = DiaryErrorObject;