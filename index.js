var express = require('express');
var app = express();
var bodyPaser = require('body-parser');
var fs = require('fs');
app.locals.pretty = true;

app.set('view engine', 'jade');
app.set('views', './views');
app.set('port', (process.env.PORT || 5000));

app.use(express.static('public'));
app.use(bodyPaser.urlencoded({extended:false}));



app.get('/topic/new', function(req,res){
    res.render('new');
});

app.post('/topic',function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title,description, function(err){
        if(err){            res.status(500).send('Internal Server Error');
        }
        res.send('SAVED');
    })
    
});

app.get('/topic/:id',function(req,res){
        var id = req.params.id;
        fs.readdir('data',function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('what the fuck!');
        }        fs.readFile('data/'+id,'utf8',function(err,data){
        if(err){
            console.log(err);
            res.status(500).send('what the fuck!');
        }
            res.render('view',{topics:files, title:id, description:data});
        })   
        })      
        })

app.get('/topic',function(req,res){
    fs.readdir('data',function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('what the fuck!');
        }
        res.render('view',{topics:files});
    })
});

app.get('/',function(req,res){
    res.send('this is main page');
});

//----- opentutorial's app.listen method -----
//app.listen(5000,function(req,res){
//    console.log('connected, 5000port');
//});

//----- node.js tutorial's app.listen method -----
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});