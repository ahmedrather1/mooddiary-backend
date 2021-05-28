'use strict';
function DiaryError(type, affectedComponent, problem, info){
    if (type !== undefined){
        this.type = type;
    }else{
        this.type = null;
    }

    if (affectedComponent !== undefined){
        this.affectedComponent = affectedComponent;
    }else{
        this.affectedComponent = null;
    }

    if (problem !== undefined){
        this.problem = problem;
    }else{
        this.problem = null;
    }

    if (info !== undefined){
        this.info = info;
    }else{
        this.info = null;
    }
}

DiaryError.prototype.setType = function(val){
    this.type = val;
}

DiaryError.prototype.getType = function(){
    return this.type;
}

DiaryError.prototype.setAffectedComponent = function(val){
    this.affectedComponent = val;
}

DiaryError.prototype.getAffectedComponent = function(){
    return this.affectedComponent;
}

DiaryError.prototype.setProblem = function(val){
    this.problem = val;
}

DiaryError.prototype.getProblem = function(){
    return this.problem;
}

DiaryError.prototype.setInfo = function(val){
    this.info = val;
}

DiaryError.prototype.getInfo = function(){
    return this.info;
}



module.exports = DiaryError;
