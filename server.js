const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
let db;
mongoose.connect("mongodb+srv://mark:mark@cluster0.cwmf5km.mongodb.net/images?retryWrites=true&w=majority", async (err, database) => {
    if (err) return console.log(err)
    db = database
    require('./app/routes.js')(app, db)
    app.listen(5000, () => {
        console.log("Server is listening on Port 5000");
    });
}); 
