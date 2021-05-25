function Entry(){
    this.id = null;
    this.userID = null;
    this.date = null;
    this.mood = null
    this.questionnaireAnswers = null;
    this.promptEntries = null;
    this.freeWrite = null;
}

Entry.prototype.setId = function(val){
    this.id = val;
}

Entry.prototype.getId = function(){
    return this.id;
}

Entry.prototype.setUserID = function(val){
    this.userID = val;
}

Entry.prototype.getUserID = function(){
    return this.userID;
}

Entry.prototype.setDate = function(val){
    this.date = val;
}

Entry.prototype.getDate = function(){
    return this.date;
}

Entry.prototype.setMood = function(val){
    this.mood = val;
}

Entry.prototype.getMood = function(){
    return this.mood;
}

Entry.prototype.setQuestionnaireAnswers = function(val){
    this.questionnaireAnswers = val;
}

Entry.prototype.getQuestionnaireAnswers = function(){
    return this.questionnaireAnswers;
}

Entry.prototype.setPromptEntries = function(val){
    this.promptEntries = val;
}

Entry.prototype.getPromptEntries = function(){
    return this.promptEntries;
}

Entry.prototype.setFreeWrite = function(val){
    this.freeWrite = val;
}

Entry.prototype.getFreeWrite = function(){
    return this.freeWrite;
}

module.exports = Entry;