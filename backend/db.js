const mongoose = require("mongoose")
// const express = require("express")


const connectToMongo =()=>{
   mongoose.set('strictQuery', false)
   mongoose.connect("mongodb://127.0.0.1:27017/admin")
   .then(()=>{
    console.log("connected to mongodb")
   }).catch(()=>{
    console.log("error while connecting to mongo database")
   })
}

module.exports=connectToMongo