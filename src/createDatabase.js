
const mongoose=require("mongoose")
const data=require("./data") //importing the data or list of subscribers ///
const SubscriberModal=require("./models/subscriber") //importing the our Subscriber modal ...
const dotenv=require("dotenv")
dotenv.config()
// Connecting the databse //
//using async function to create a connetion
const Connection=async()=>{
    try {
        const ConnectionUri= process.env.MONGO_ATLAS_URI || "mongodb://localhost:27017"
       const Connect=  await mongoose.connect(ConnectionUri,{   UseNewUrlParser: true,
        useUnifiedTopology: true})
        // note//
        // UseNewUrlParser:ture  //When this option is enabled, it tells the MongoDB driver to use the new URL parser when connecting to the MongoDB server.
        // useUnifiedTopology: true, when we use this we  are instructing the MongoDB driver to use the unified topology engine for managing connections to the MongoDB server. 
        console.log("DataBase Connected SucessFully")
        return mongoose;
    } catch (error) {
        console.log(error) //if there is any error will come then it will show in the console..
    }
}

//creating a function here to insert the my data into the databse....
const refreshAll = async () => {
    try {
        await connectDB();
       await SubscriberModal.deleteMany({}) //first it will deelte all the data 
       await SubscriberModal.insertMany(data) //then insert all the data 
    } catch (error) {
        console.log(error)
    }
    
}


module.exports={Connection,refreshAll} //exporting here two function and importing in the server.js so i can call them there
