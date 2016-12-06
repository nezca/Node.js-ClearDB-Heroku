var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost', 
  user     : 'root',
  password : 'a1320929',
  database : 'testbase'
});

connection.connect();

// 아래 1. 생활코딩 또는 2. github의 두가지 Solution 중 선택하여 사용할 수 있으나,
// 나는 현재 (16년 12월 2일) 생활코딩 Solution을 튜토리얼하고 있으므로,
// 1. 생활코딩 Solution을 사용하고자 함.

//-------- 1. 생활코딩 solution Start --------

  // ---------1.1 SQL : SELECT(읽어오기) start ---------

//var sql = 'SELECT * FROM topic';
//connection.query(sql, function(err, rows, fields){
//  if(err){
//    console.log(err);
//  }else{
////    console.log('rows', rows);
////    console.log('fields',fields);
//    
//    for(var i=0; i<rows.length; i++){
//      console.log(rows[i].title);
//    }
//    
//    for(var i=0; i<rows.length; i++){
//      console.log(rows[i].description);
//    }
//    
//    for(var i=0; i<rows.length; i++){
//      console.log(rows[i].author);
//    }
//  }
//});

  // --------- SQL : SELECT(읽어오기) end ---------

// ---------1.2 SQL : INSERT(입력) start ---------
//
//var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
//var params = ['Heroku', 'Nezca web server', 'Nezcaroku'];
//connection.query(sql, params, function(err, rows, fields){
//  if(err){
//    console.log(err);
//  }else{
//    console.log(rows.insertId);
//  }
//});

// ---------1.2 SQL : INSERT(입력) end ---------

// ---------1.3 SQL : UPDATE(수정) start ---------

//var sql = 'UPDATE topic SET title=?, author=?, description=? WHERE id=?';
//var params = ['NPM', 'noderian', 'libraries for nodejs', 3];
//connection.query(sql, params, function(err, rows, fields){
//  if(err){
//    console.log(err);
//  }else{
//    console.log(rows.insertId);
//  }
//});

// ---------1.3 SQL : UPDATE(수정) end ---------

// ---------1.4 SQL : DELETE(삭제) start ---------

var sql = 'DELETE FROM topic WHERE id=?';
var params = [6,9];
connection.query(sql, params, function(err, rows, fields){
  if(err){
    console.log(err);
  }else{
    console.log(rows.insertId);
  }
});

// ---------1.4 SQL : DELETE(삭제) end ---------

//-------- 1. 생활코딩 solution End --------







//---------- 2.github solution Start -------
//connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//  if (err) throw err;
//
//  console.log('The solution is: ', rows[0].solution);
//});
//---------- github solution end --------


connection.end();

