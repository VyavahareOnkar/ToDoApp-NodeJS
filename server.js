
import {app} from "./app.js";

import {connectDB} from "./db/conn.js";

connectDB();

const PORT=process.env.PORT;
console.log(PORT);
app.listen(PORT,()=>{
    console.log(`Server created at ${PORT} in ${process.env.NODE_ENV} mode.`);
})