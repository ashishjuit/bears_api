var express = require ('express');
var bodyParser = require ('body-parser');
var uuid = require ('uuid');
var lowdb = require ('lowdb');
var server = express();

var port = process.env.PORT || 8080;
var db = lowdb ('db.json');

db.defaults({bears: []})
  .value();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/bears', function(request, response){
 var bear = db.get('bears')
              .value();
              response.send(bear);
});

server.get('/bears', function(request, response){
 var bear = db.get('bears')
              .find({id: request.params.id})
              .value();
              response.send(bear);
});

server.put('/bears', function(request, response){
  var updatedBearInfo = {
    size: request.body.size,
    color: request.body.color,
    type: request.body.type,
    gender: request.body.gender,
    notes: request.body.notes,
    isAwake: false,
    isHungry: false,
    hasKids: false
  };
    var updatedBear = db.get('bears')
                        .find({id: request.params.id})
                        .assign(updatedBearInfo)
                        .value();

    response.send(updatedBear);
});

server.delete('/bears/:id', function(request, response){
  var bear = db.get('bears')
               .remove({id: request.params.id})
               .value();
               response.send(bear);
});

server.post('/bears', function(request, response){
  var bear = {
    id: uuid.v4(),
    size: request.body.size,
    color: request.body.color,
    type: request.body.type,
    gender: request.body.gender,
    notes: request.body.notes,
    isAwake: false,
    isHungry: false,
    hasKids: false
  };

  var result= db.get('bears')
                .push(bear)
                .last()
                .value();
  response.send(result);
});

server.listen(port, function (){
  console.log('Now listening port : ' +port);
});
