const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploadsFolder = "uploads/"; // don't forget to create this folder inside your projec folder
module.exports = function (app, db) {
    const multer = require('multer')
    const upload = multer({ dest: uploadsFolder })

    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    // notice the upload.single here: myImage must match the name of your <input type="file" name="myImage" /> in your form
    app.post("/upload", upload.single("myImage"), function (req, res) {
        console.log(req.body);
        const imageContents = fs.readFileSync(path.join(__dirname + "/../" + uploadsFolder + req.file.filename))
        db.collection("images").insertOne({ image: imageContents }, (err, result) => {
            console.log(result);
            res.redirect("/");
        })
    })

    app.get("/showimages", function (req, res) {
        db.collection("images").find().toArray((err, result) => {
            console.log(result.length);
            res.render("showimages.ejs", {
                images: result
            })
        });
    })
}