import {openDatabase} from './database.mjs';

const path=process.env.SNOOKER_DB_PATH||process.argv[2];
if(!path)throw new Error('Pass a database path or set SNOOKER_DB_PATH');
const db=await openDatabase(path);
const tables=db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
console.log(`Database ready at ${path}: ${tables.map(row=>row.name).join(', ')}`);
db.close();
