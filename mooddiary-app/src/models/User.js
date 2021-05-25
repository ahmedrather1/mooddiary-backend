function User(){
    this.id = null;
    this.firstName = null;
    this.lastName = null;
    this.birthday = null;
    //some data structure to store mood data, maybe a dictionary?
    this.moodData = null;
    // this could be a dictionary with {entryID: entryObject}
    this.entries = null;
}

Entry.prototype.setId = function(val){
    this.id = val;
}

Entry.prototype.getId = function(){
    return this.id;
}

Entry.prototype.setFirstName = function(val){
    this.firstName = val;
}

Entry.prototype.getFirstName = function(){
    return this.firstName;
}

Entry.prototype.setLastName = function(val){
    this.firstName = val;
}

Entry.prototype.getLastName = function(){
    return this.firstName;
}

Entry.prototype.setBirthday = function(val){
    this.birthday = val;
}

Entry.prototype.getBirthday = function(){
    return this.birthday;
}

// functions for addinf mood data and entries needed depending on design 

module.exports = User;


