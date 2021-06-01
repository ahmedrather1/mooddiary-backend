'use strict';
function DiaryErrorObject(){
    this.errorList = [];
}

DiaryErrorObject.prototype.addErrorItem = function(val){
    this.errorList.push(val)
}

DiaryErrorObject.prototype.getErrorList = function(){
    return this.errorList;
}

module.exports = DiaryErrorObject;