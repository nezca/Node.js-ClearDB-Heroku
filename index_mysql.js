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
var upload = multer({storage:storage})
var app = express();
var bodyPaser = require('body-parser');
var fs = require('fs');
app.locals.pretty = true;


app.set('view engine', 'jade');
app.set('views', './views');
app.set('port', (process.env.PORT || 5000));

app.use('/user', express.static('uploads'));
app.use(express.static('public'));
app.use(bodyPaser.urlencoded({extended:false}));



app.get('/topic/add', function(req,res){
	fs.readdir('data',function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('what the fuck!');
        }
	res.render('add',{topics:files});
	});
});

app.post('/topic',function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title,description, function(err){
        if(err){            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);
    });
    
});

//app.get('/topic/:id',function(req,res){
//        
//        fs.readdir('data',function(err,files){
//        if(err){
//            console.log(err);
//            res.status(500).send('what the fuck!');
//        }           
//        });      
//        });

app.get(['/topic', '/topic/:id'],function(req,res){
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