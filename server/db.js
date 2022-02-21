const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/myNotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false" 

const connectToMongodb=()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongodb successfully");
    })
}

module.exports=connectToMongodb;