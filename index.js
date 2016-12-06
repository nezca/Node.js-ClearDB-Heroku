var express = require('express');
var multer = require('multer');
var storage = multer.diskStorage({
		destination: function (req, file, cb) {
				cb(null, 'uploads/')
		},
		filename: function (req, file, cb) {
				cb(null, file.originalname)
		}
})
var bootstrap = require("express-bootstrap-service");
var upload = multer({storage:storage})
var app = express();
var bodyPaser = require('body-parser');
var fs = require('fs');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost', 
  user     : 'root',
  password : 'a1320929',
  database : 'testbase'
});

connection.connect();
app.locals.pretty = true;

// ------------------------------------------

app.set('view engine', 'jade');
app.set('views', './views_mysql');
app.set('port', (process.env.PORT || 5000));

app.use(bootstrap.serve);
app.use('/user', express.static('uploads'));
app.use(express.static('public'));
app.use(bodyPaser.urlencoded({extended:false}));

// -------------------------------------------

app.get('/topic/add', function(req,res){
  var sql = 'SELECT id,title FROM topic';
  connection.query(sql, function(err, topics, fields){
    if(err){
            console.log(err);
            res.status(500).send('what the fuck you!');
        }
    res.render('add',{topics:topics});
  });  
});


app.post('/topic/add',function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
    connection.query(sql, [title, description, author], function(err, result, fields){
      if(err){            res.status(500).send('Internal Server Error');
        }else{
          res.redirect('/topic/'+result.indertId);
        }
    });         
  });

app.get(['/topic/:id/edit'], function(req, res){
  var sql = 'SELECT id,title FROM topic';
  connection.query(sql, function(err, topics, fields){
     var id = req.params.id;
     if(id){
       var sql = 'SELECT * FROM topic WHERE id=?';
       connection.query(sql, [id], function(err, topic, fields){
         if(err){
           console.log(err);
           res.status(500).send('Internal Server Error');
         } else {
           res.render('edit', {topics:topics, topic:topic[0]});
         }
       });
     } else {
       console.log('There Is No ID');
       res.status(500).send('Internal Server Error');
     }
   });
});


app.post(['/topic/:id/edit'], function(req, res){  
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var id = req.params.id;
  var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
  connection.query(sql, [title, description, author, id], function(err, result, fields){
    if(err){
      console.log(err);
      res.status(500).send('오류발생');
    }else{
      res.redirect('/topic/'+id);
    }
  });  
});

app.get(['/topic/:id/delete'], function(req, res){
  var sql = 'SELECT id,title FROM topic';
  var id = req.params.id;
  connection.query(sql, function(err, topics, fields){
    var sql = 'SELECT * FROM topic WHERE id=?';
    connection.query(sql, [id], function(err, topic){
      if(err){
           console.log(err);
           res.status(500).send('Internal Server Error');
         } else {
           if(topic.length === 0){
             console.log('There is no id');
             res.status(500).send('Internal Server Error');
           } else {
             res.render('delete',{topics:topics, topic:topic[0]});
           }
         }
    });    
  });
});

app.post(['/topic/:id/delete'], function(req, res){
  var id = req.params.id;
  var sql = 'DELETE FROM topic WHERE id=?';
  connection.query(sql, [id], function(err, result){
    res.redirect('/topic/');
  });
});

app.get(['/topic', '/topic/:id'], function(req, res){
  var sql = 'SELECT id,title FROM topic';
  connection.query(sql, function(err, topics, fields){
     var id = req.params.id;
     if(id){
       var sql = 'SELECT * FROM topic WHERE id=?';
       connection.query(sql, [id], function(err, topic, fields){
         if(err){
           console.log(err);
           res.status(500).send('Internal Server Error');
         } else {
           res.render('view', {topics:topics, topic:topic[0]});
         }
       });
     } else {
       res.render('view', {topics:topics});
     }
   });

/* --- 파일 형식의 데이터를 불러오는 코드의 시작 ----
    fs.readdir('data',function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('what the fuck!');
        }
								var id = req.params.id;
								if(id){
														// ID 값이 존재할때 리턴해주는 값
    					fs.readFile('data/'+id,'utf8',function(err,data){
										if(err){
            console.log(err);
            res.status(500).send('what the fuck!');
        		}
            res.render('view',{topics:files, title:id, description:data});
        	});
								} else {
														// ID 값이 존재하지 않을때 리턴해주는 값
        				res.render('view',{topics:files, title:'welcome', description:'Hello, Javascript for Server.'});
								}


    })
*/ //--- 파일 형식의 데이터를 불러오는 코드의 끝 ----
});

app.get('/login', function(req,res){
    res.render('login');
});

app.get('/upload', function(req,res){
    res.render('upload');
});

app.post('/upload', upload.single('userfile'), function(req,res){
    res.send('uploaded : '+req.file.filename);
});

app.get('/', function(req,res){
		res.render('main');
});

//----- opentutorial's app.listen method -----
//app.listen(5000,function(req,res){
//    console.log('connected, 5000port');
//});

//----- node.js tutorial's app.listen method -----
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});