import app from './app.js';
import { connetDB } from "./db.js";

connetDB();


app.listen(4000);
console.log('server on port', 4000 );