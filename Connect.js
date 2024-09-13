const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    CSSConditionRule.log('Connect to the SQLite database');
});