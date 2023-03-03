const mysql = require('mysql');

const connection = mysql.createPool({
    host : "localhost",
    user :"root",
    password : "Db123@123"
})

connection.getConnection(function(err){
    if(err)
    {
        console.log(err);
    }
    else{
        console.log('connected');
    }
});
