const app = require("./app");
const connectDatabase = require("./db/Database.js");
const cloudinary = require("cloudinary");

// Handling uncaught Exception
process.on("uncaughtException",(err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for Handling uncaught Exception`);
})

// config
if(process.env.NODE_ENV!=="PRODUCTION"){
require("dotenv").config({
    path:"backend/config/.env"
})}
// connect database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// create server
const port = process.env.PORT || 5000;
const server = app.listen(port,() =>{
    console.log(`Server is working on http://localhost:${port}`)
})


// Unhandled promise rejection
process.on("unhandledRejection", (err) =>{
    console.log(`Shutting down server for ${err.message}`);
    console.log(`Shutting down the server due to Unhandled promise rejection`);
    server.close(() =>{
        process.exit(1);
    });
});