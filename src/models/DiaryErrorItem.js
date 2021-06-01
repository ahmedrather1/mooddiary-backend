'use strict';
function DiaryErrorItem(type, affectedComponent, problem, info){
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

DiaryErrorItem.prototype.setType = function(val){
    this.type = val;
}

DiaryErrorItem.prototype.getType = function(){
    return this.type;
}

DiaryErrorItem.prototype.setAffectedComponent = function(val){
    this.affectedComponent = val;
}

DiaryErrorItem.prototype.getAffectedComponent = function(){
    return this.affectedComponent;
}

DiaryErrorItem.prototype.setProblem = function(val){
    this.problem = val;
}

DiaryErrorItem.prototype.getProblem = function(){
    return this.problem;
}

DiaryErrorItem.prototype.setInfo = function(val){
    this.info = val;
}

DiaryErrorItem.prototype.getInfo = function(){
    return this.info;
}



module.exports = DiaryErrorItem;
