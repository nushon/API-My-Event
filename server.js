let sqlite3 = require("sqlite3").verbose();
let express = require("express");
let http = require("http");
let path = require("path");
let bodyParser = require("body-parser");
let app = express();
let server = http.createServer(app);
require('dotenv').config()
let port = process.env.PORT || 3100;

console.log({port})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db = new sqlite3.Database("event.db");
// Function for All tables creation
function createTable() {
  db.run(
    "CREATE TABLE IF NOT EXISTS host(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE, address TEXT NOT NULL, phone_number INT NOT NULL UNIQUE, organization_name TEXT, email TEXT NOT NULL UNIQUE, img url)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS speakers(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, bio TEXT,img url, status TEXT)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS event_questions(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, dob DATE, address TEXT, email TEXT, phone_number INT,sex TEXT,education_satus TEXT,status TEXT,about_you TEXT,why_apply TEXT,why_accept TEXT, event_form_id INT)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS event_form(id INTEGER PRIMARY KEY AUTOINCREMENT, event_name TEXT NOT NULL, event_location TEXT NOT NULL, start_date date,end_date date, event_description TEXT NOT NULL, questionnaires BLOB NOT NULL, speakers_id BLOB)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS participant(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE, address TEXT NOT NULL, phone_number INT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE,dob date NOT NULL,status TEXT NOT NULL,img url)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, FOREIGN KEY (id) REFERENCES host (id), FOREIGN KEY (id) REFERENCES participant (id))"
  );
 
  
 

  // db.close();
}

createTable();

// POST ROUTES

app.post("/host", function (req, res) {
  let bodydata = req.body;
  console.log(bodydata);

  let query = `INSERT INTO host(name,address,phone_number,organization_name,email,img) VALUES(?,?,?,?,?,?)`;
  db.run(
    query,
    [
      bodydata["name"],
      bodydata["address"],
      bodydata["phone_number"],
      bodydata["organization_name"],
      bodydata["email"],
      bodydata["img"],
    ],
    (err) => {
      if (err) {
        console.log(err);
        res.send("Unsuccessful");
      } else {
        console.log("Your table was inserted successfully");
        res.send("Your table was inserted successfully");
      }
    }
  );
});
app.post("/speakers", function (req, res) {
  let bodydata = req.body;
  console.log(bodydata);

  let query = `INSERT INTO speakers(name,bio,img,status) VALUES(?,?,?,?)`;
  db.run(
    query,
    [bodydata["name"], bodydata["bio"], bodydata["img"], bodydata["status"]],
    (err) => {
      if (err) {
        console.log(err);
        res.send("Unsuccessful");
      } else {
        console.log("Your table was inserted successfully");
        res.send("Your table was inserted successfully");
      }
    }
  );
});
app.post("/events_questions", function (req, res) {
  let bodydata = req.body;
  console.log(bodydata);

  let query = `INSERT INTO event_questions(name,dob,address,email,phone_number,sex,education_satus,status,about_you,why_apply,why_accept, event_form_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;
  db.run(
    query,
    [
      bodydata["name"],
      bodydata["dob"],
      bodydata["address"],
      bodydata["email"],
      bodydata["phone_number"],
      bodydata["sex"],
      bodydata["education_satus"],
      bodydata["status"],
      bodydata["about_you"],
      bodydata["why_apply"],
      bodydata["why_accept"],
      bodydata["event_form_id"]
    ],
    (err) => {
      if (err) {
        console.log(err);
        res.send("Unsuccessful", err);
      } else {
        console.log("Your table was inserted successfully");
        res.send("Your table was inserted successfully");
      }
    }
  );
});
app.post("/event_form", function (req, res) {
  let bodydata = req.body;
  console.log(bodydata);

  let query = `INSERT INTO event_form(event_name, event_location,start_date,end_date,event_description, questionnaires, speakers_id) VALUES(?,?,?,?,?,?,?)`;
  db.run(
    query,
    [
      bodydata["event_name"],
      bodydata["event_location"],
      bodydata["start_date"],
      bodydata["end_date"],
      bodydata["event_description"],
      bodydata["questionnaires"],
      bodydata["speakers_id"]
    ],
    (err) => {
      if (err) {
        console.log(err);
        res.status("Unsuccessful:", err);
      } else {
        console.log("Your table was inserted successfully");
        res.send("Your table was inserted successfully");
      }
    }
  );
});
app.post("/participant", function (req, res) {
  let bodydata = req.body;
  console.log(bodydata);

  let query = `INSERT INTO participant(name,address,phone_number,email,dob,status,img) VALUES(?,?,?,?,?,?,?)`;
  db.run(
    query,
    [
      bodydata["name"],
      bodydata["address"],
      bodydata["phone_number"],
      bodydata["email"],
      bodydata["dob"],
      bodydata["status"],
      bodydata["img"],
    ],
    (err) => {
      if (err) {
        console.log(err);
        res.send("Unsuccessful", err);
      } else {
        console.log("Your table was inserted successfully");
        res.send("Your table was inserted successfully");
      }
    }
  );
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







// Get routes
app.get("/", function (req, res) {
  res.send(
    "Welcome to My Event API. Use /host to get all hosts. Use /participant to get all participants. Use /hostform to get all hostforms. Use /speakers to get all spaeakers. Use /events_questions to get all // Adding interaction on the steps buttons"
  );
});

app.get("/host", function (req, res) {
  let query = `SELECT * FROM host`;
  db.all(query, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log({ rows });
    res.send({ rows });
  });
});

app.get("/participant", function (req, res) {
  let query = `SELECT * FROM participant`;
  db.all(query, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log({ rows });
    res.send({ rows });
  });
});

app.get("/users", function (req, res) {
  let query = `SELECT * FROM users`;
  db.all(query, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log({ rows });
    res.send({ rows });
  });
});

app.get("/event_form", function (req, res) {
  
  let query = `SELECT * FROM event_form`;
  db.all(query, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log({ rows });
    res.send({ rows });
  });
});

// app.get("/speakers", function (req, res) {
//   let query = `SELECT * FROM speakers`;
//   db.all(query, [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     console.log({ rows });
//     res.send({ rows });
//   });
// });

// const getDBTableInfo = async (query) => {
//   const promise = db.get(query, [], (err, data) => {
//     if (err) {
//       throw err;
//     }

//     console.log({data})
//     return data
//   }) 
//   return await Promise.all([promise])
// }

// app.get("/eventSpeakers/:id",  async (req, res) => {
//   const event_id = req.params.id;
//   let query = `SELECT * FROM event_form WHERE id = ${event_id}`;
//   db.get(query, [], async (err, row) => {
//     if (err) {
//       throw err;
//     }
//     const event = row;
//     event.speakers = [];
//     const speakerIds = event.speakers_id.split(',');

//     for (let index = 0; index < speakerIds.length; index++) {
//       const element = speakerIds[index];

//      const result = await getDBTableInfo(`SELECT * FROM speakers WHERE id = ${element}`);

//      console.log({result});

//       // event.speakers.push()

//       // db.get(`SELECT * FROM speakers WHERE id = ${element}`, [], (err, speaker) => {
//       //   if (err) {
//       //     throw err;
//       //   }

//       //   event.speakers.push(speaker)

//       //   console.log({speaker},  event.speakers)
        
//       // })
      
//     }

    
//       res.send({ event });
    

//     console.log({ event, speakerIds });
//   });
// });
// app.get("/event_questions", function (req, res) {
//   let query = `SELECT * FROM event_questions`;
//   db.all(query, [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     console.log({ rows });
//     res.send({ rows });
//   });
// });

// app.get("/event_questionnaires", function (req, res) {
//   let query = `SELECT questionnaires FROM event_form WHERE id = ?`;
//   db.all(query, [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     console.log({ rows });
//     res.send({ rows });
//   });
// });

app.get("/event/:id", function (req, res) {
  let eventId = req.params.id;
  console.log("eventId",eventId);
  let query = `SELECT * FROM event_form WHERE id=${eventId}`;
  // let query = `SELECT * FROM event_form ef INNER JOIN speakers s on ef.speakers_id = s.id WHERE id=$ = s.id `;
  console.log({query})
  db.get(query, (err, row) => {
    if (err) {
      console.log(err);
      // throw err;
    }
    console.log({ row });
    res.send({ event: row });
  });
});
// db.close();
server.listen(port);
console.log("Server is listening at port: ", port);
