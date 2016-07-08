var express = require ('express');
var bodyParser = require ('body-parser');
var uuid = require ('uuid');
var lowdb = require ('lowdb');
var server = express();

var Bear = require('./models/bear.js');

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

server.get('/bears/:id', function(request, response){
 var bear = db.get('bears')
              .find({id: request.params.id})
              .value();
              response.send(bear);
});

server.put('/bears/:id', function(request, response){
  var bear = new Bear(request.body.size, request.body.color, request.body.type, request.body.gender, request.body.notes, request.params.id);
  bear.updateAwake(request.body.isAwake);
  bear.updateHungry(request.body.isHungry);
  bear.updateKids(request.body.hasKids);

    var updatedBear = db.get('bears')
                        .find({id: request.params.id})
                        .assign(bear)
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
  var bear = new Bear(request.body.size, request.body.color, request.body.type, request.body.gender, request.body.notes);
  var result= db.get('bears')
                .push(bear)
                .last()
                .value();
  response.send(result);
});

server.listen(port, function (){
  console.log('Now listening port : ' +port);
});
