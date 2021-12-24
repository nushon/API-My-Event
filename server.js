let sqlite3 = require('sqlite3').verbose();
let express = require('express');
let http = require('http');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();
let server = http.createServer(app);
let port = 3100;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let db = new sqlite3.Database('event.db');
// Function for All tables creation
function createTable(){
    
    db.run('CREATE TABLE IF NOT EXISTS host(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE, address TEXT NOT NULL, phone_number INT NOT NULL UNIQUE, organization_name TEXT, email TEXT NOT NULL UNIQUE, img url)');
    db.run('CREATE TABLE IF NOT EXISTS participant(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE, address TEXT NOT NULL, phone_number INT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE,dob date NOT NULL,status TEXT NOT NULL,img url)');
    db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, FOREIGN KEY (id) REFERENCES host (id), FOREIGN KEY (id) REFERENCES participant (id))');
    db.run('CREATE TABLE IF NOT EXISTS hostform(id INTEGER PRIMARY KEY AUTOINCREMENT, event_name TEXT NOT NULL, event_location TEXT NOT NULL,start_date date ,end_date date , event_description TEXT NOT NULL, questions_ob TEXT NOT NULL UNIQUE, FOREIGN KEY (id) REFERENCES host (id), FOREIGN KEY (id) REFERENCES speakers (id))');
    db.run('CREATE TABLE IF NOT EXISTS speakers(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE, bio TEXT NOT NULL,img url, status TEXT NOT NULL)');
    db.run('CREATE TABLE IF NOT EXISTS events_questions(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE, dob DATE, address TEXT NOT NULL, email TEXT NOT NULL UNIQUE, phone_number INT NOT NULL UNIQUE,sex TEXT NOT NULL,education_satus TEXT,status TEXT,about_you TEXT,why_apply TEXT,why_accept TEXT, FOREIGN KEY (id) REFERENCES hostform (id))');
    
    // db.close();
}

createTable();



// POST ROUTES

app.post('/host', function(req, res){
  let bodydata = req.body;
  console.log(bodydata);
  
  let query = `INSERT INTO host(name,address,phone_number,organization_name,email,img) VALUES(?,?,?,?,?,?)`
  db.run(query, [bodydata["name"], bodydata["address"], bodydata["phone_number"], bodydata["organization_name"], bodydata["email"], bodydata["img"]],
  (err)=>{
    if(err){
      console.log(err);
      res.send("Unsuccessful");
    }else{
      console.log("Your table was inserted successfully");
      res.send("Your table was inserted successfully");
    }  
  });
});

app.post('/participant', function(req, res){
  let bodydata = req.body;
  console.log(bodydata);

  let query = `INSERT INTO participant(name,address,phone_number,email,dob,status,img) VALUES(?,?,?,?,?,?,?)`
  db.run(query, [bodydata["name"], bodydata["address"], bodydata["phone_number"], bodydata["email"], bodydata["dob"], bodydata["status"], bodydata["img"]],
  (err)=>{
    if(err){
      console.log(err);
      res.send("Unsuccessful");
    }else{
      console.log("Your table was inserted successfully");
      res.send("Your table was inserted successfully");
    }  
  });

});

// app.post('/users', function(req, res){
  
//   let bodydata = req.body;
//   console.log(bodydata);

//   let query = `INSERT INTO table (name,address,phone_number, email,img, name,address,phone_number,email,dob,status,img)
//                 SELECT p.name, p.address, p.phone_number, p.email, p.img, c.name, c.address, c.phone_number, c.email, c.dob,c.status,c.img
//                 FROM host p
//                 INNER JOIN participant c ON c.Id = p.Id`
//   db.run(query, [["host(id)"], ["participant(id)"]],
//   (err)=>{
//     if(err){
//       console.log(err);
//       res.send("Unsuccessful");
//     }else{
//       console.log("Your table was inserted successfully");
//       res.send("Your table was inserted successfully");
//     }  
//   });
// });

app.post('/hostform', function(req, res){
  
  let bodydata = req.body;
  console.log(bodydata);

  let query = `INSERT INTO hostform(event_name, event_location,start_date,end_date,event_description, questions_ob) VALUES(?,?,?,?,?,?)`
  db.run(query, [bodydata["event_name"],bodydata["event_location"], bodydata["start_date"], bodydata["end_date"], bodydata["event_description"], bodydata["questions_ob"]],
  (err)=>{
    if(err){
      console.log(err);
      res.send("Unsuccessful");
    }else{
      console.log("Your table was inserted successfully");
      res.send("Your table was inserted successfully");
    }  
  });
});

app.post('/speakers', function(req, res){
  let bodydata = req.body;
  console.log(bodydata);

  let query = `INSERT INTO speakers(name,bio,img,status) VALUES(?,?,?,?)`
  db.run(query, [bodydata["name"], bodydata["bio"], bodydata["img"], bodydata["status"]],
  (err)=>{
    if(err){
      console.log(err);
      res.send("Unsuccessful");
    }else{
      console.log("Your table was inserted successfully");
      res.send("Your table was inserted successfully");
    }  
  });

});

app.post('/events_questions', function(req, res){
  let bodydata = req.body;
  console.log(bodydata);

  let query = `INSERT INTO events_questions(name,dob,address,email,phone_number,sex,education_satus,status,about_you,why_apply,why_accept) VALUES(?,?,?,?,?,?,?,?,?,?,?)`
  db.run(query, [bodydata["name"], bodydata["dob"], bodydata["address"], bodydata["email"], bodydata["phone_number"], bodydata["sex"], bodydata["education_satus"], bodydata["status"], bodydata["about_you"], bodydata["why_apply"], bodydata["why_accept"] ],
  (err)=>{
    if(err){
      console.log(err);
      res.send("Unsuccessful");
    }else{
      console.log("Your table was inserted successfully");
      res.send("Your table was inserted successfully");
    }  
  });
});


// Get routes
app.get('/', function(req, res){
    res.send("Landing Page");
})

app.get('/host', function(req, res){
  let query = `SELECT * FROM host`;
  db.all(query, [], (err, rows) => {
    if (err){
      throw err;
    }
    console.log({rows});
    res.send({rows});
  });
  

});

app.get('/participant', function(req, res){
  let query = `SELECT * FROM participant`;
  db.all(query, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log({rows});
    res.send({rows})
  });
});

app.get('/users', function(req, res){
  let query = `SELECT * FROM users`;
  db.all(query, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log({rows});
    res.send({rows})
  });
});

app.get('/hostform', function(req, res){
  let query = `SELECT * FROM hostform`;
  db.all(query, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log({rows});
    res.send({rows})
  });
});

app.get('/speakers', function(req, res){
  let query = `SELECT * FROM speakers`;
  db.all(query, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log({rows});
    res.send({rows})
  });
});

app.get('/events_questions', function(req, res){
  let query = `SELECT * FROM events_questions`;
  db.all(query, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log({rows});
    res.send({rows})
  });
});




// db.close();
server.listen(port, () => {
  console.log("Server is listening at port: ", port);
});

