var uuid = require('uuid');
//Constructor
//How do I build this object?
function Bear(size, color, type, gender, notes, id){
  this.id= id || uuid.v4();
  this.size = size;
  this.color = color;
  this.type = type;
  this.gender = gender;
  this.notes = notes;
  this.isAwake = false;
  this.isHungry = false;
  this.hasKids = false;
}

Bear.prototype.updateAwake = function(value, id){
  if(value.toLowerCase()==='true'){
    this.isAwake = true;
  } else{
    this.isAwake = false;
  }
};

Bear.prototype.updateHungry = function(value, id){
  if(value.toLowerCase()==='true'){
    this.isHungry = true;
  } else{
    this.isHungry = false;
  }
};

Bear.prototype.updateKids = function(value, id){
  if(value.toLowerCase()==='true'){
    this.hasKids = true;
  } else{
    this.hasKids = false;
  }
};

module.exports = Bear;
