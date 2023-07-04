
const express =require("express")
const app=express()
const bodyParser = require("body-parser");
const dotenv=require("dotenv").config()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json()) //this is also middleware
  //defining a middleware when ever user enter by mistake any other end point then a errror messagwe will show
const {Connection,refreshAll}=require("./src/createDatabase")
const SubscriberModal =require("./src/models/subscriber"); //requiring the collection that had created in modal


// calling both the function here
Connection(); //here running the Connection function to connect the databse ..
refreshAll() //here running the refreshALl function to insert all the data inside the database these are coming from createDatabase.js
app.use(express.static("public"))

//all routes
app.get("/",async(req,res)=>{ 
    try {
        res.sendFile(__dirname + "/src/index.html")
    } catch (error) {
        res.status(400).send(error.message)
    }
})
// creating subscribers routes for getting all the subscribers
app.get("/subscribers",async(req,res)=>{
    try {
        const subscribers=await SubscriberModal.find({}).select("-__v")//here i am finding all the subscribed but i want to show the info of all subscriber except the __v (version so i use -v to exclude this)
         res.status(200).json(subscribers) //here sending the response 
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// the second routes is getting all the data by the name..
app.get("/subscribers/names", async (req, res) => {
    try {
        
        const subscribers = await SubscriberModal
        .find({})
        .select("-_id -subscribedDate -__v");  //here also i exclude all the fileds i want to show only the so i use - one to exclude all the things in select statement it will show only the names 

      res.status(200).send(subscribers)
    } catch (error) { //if there is any errror occuurs then it will show the error i use try and catch method to handle this 
        res.status(400).send(error.message)
    }
  
  });
//the last and the third api is for getting all the subscriber by the their id

app.get("/subscribers/:id",async(req,res)=>{
    const Id= req.params.id // coming from clent cide using body parsor to to what is coming in the request in the headers
    try {
      
        const subscriberById=await SubscriberModal.find({_id:Id}).select("-__V");
        if(!subscriberById){ //here i am checking or adding condtion based on i if user enters wrong id then it will show the error message that not found
            res.status(400).send(`Sorry no any Subscribers exists with the given ${Id}`)

        }
        else{
            res.status(200).send(subscriberById) //if id is right then it will the details of the ubscribers based on the id entered by the client
        }
    } catch (error) {
    res.status(400).sendFile(__dirname + "/src/error.html")
    }
   

})
app.use((req, res, next) => {
    res.status(404).send({ message: "Route not found. Please check your route." });
  });



const port=process.env.PORT || 3000
// Starting the Server
app.listen(port,()=>console.log(`Server is running at the port ${port}`))
