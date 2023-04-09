import {mongoose} from 'mongoose';
const DB_URL=process.env.DB_URL

 export const connectDB=()=>{mongoose.connect(DB_URL)
    .then((c)=>console.log(`connection successful at ${c.connection.host}`))
    .catch((e)=>console.log("DB COnnection Failed"));
 }
    