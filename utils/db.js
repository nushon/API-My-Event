const path = require("path");
const Database = require('sqlite-async');

const db_name = path.join(__dirname, "../event.db");

let DB;

const init = async (db) => {
    DB = await Database.open(db_name);
    console.log({ DB })
    return null
};


// init()


const getAsync = (sql, params) => {
    console.log({ sql, db_name }, JSON.stringify(db.get))
    return new Promise(function (resolve, reject) {
        db.get(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                console.log({ rows })
                resolve({ rows: rows })
            }
        })
    })
}

function allAsync(sql, params) {
    return new Promise((resolve, reject) => {
        DB.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve({ rows: rows })
            }
        })
    })
}

const getDBTableInfo = async (query = '') => {
    try {
        if (!DB) {
            DB = await Database.open(db_name);
            const data = await DB.get(query);
            return data;
        }

    } catch (error) {
        console.log("Error: ", error.message)
        return null;
    }
}

module.exports = {
    init,
    getDBTableInfo
}
