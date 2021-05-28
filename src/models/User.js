'use strict';
function User(){
    this.id = null;
    this.firstName = null;
    this.lastName = null;
    this.birthday = null;
    // some data structure to store mood data, maybe a dictionary?
    this.moodData = null;
    // this could be a dictionary with {entryID: entryObject}
    this.entries = null;
}

User.prototype.setId = function(val){
    this.id = val;
}

User.prototype.getId = function(){
    return this.id;
}

User.prototype.setFirstName = function(val){
    this.firstName = val;
}

User.prototype.getFirstName = function(){
    return this.firstName;
}

User.prototype.setLastName = function(val){
    this.firstName = val;
}

User.prototype.getLastName = function(){
    return this.firstName;
}

User.prototype.setBirthday = function(val){
    this.birthday = val;
}

User.prototype.getBirthday = function(){
    return this.birthday;
}

// functions for addinf mood data and entries needed depending on design 

module.exports = User;


