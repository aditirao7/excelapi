const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Pet = require("./Pet");
var multer = require("multer");
var excelToJson = require("convert-excel-to-json");
var fs = require("fs");
var pass = "fastjobsdb"; //ideally will set it as an env variable

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var uploads = multer({ storage: storage });

mongoose.connect(
  "mongodb+srv://aditi:fastjobsdb@pets.cyj7br3.mongodb.net/?retryWrites=true&w=majority"
);

function importExcelData2MongoDB(filePath) {
  const excelData = excelToJson({
    sourceFile: filePath,
    header: { rows: 1 },
    columnToKey: {
      A: "name",
      B: "type",
      C: "breed",
      D: "age",
    },
  });
  Pet.insertMany(excelData["Sheet1"]);
}

router.post("/", uploads.single("pets"), (req, res) => {
  Pet.collection.drop();
  var path = __dirname + "/public/uploads/" + req.file.filename;
  importExcelData2MongoDB(path);
  fs.unlinkSync(path);
  res.send("Excel parsed and stored in database");
});

router.get("/", (req, res) => {
  Pet.find({}, function (err, f) {
    if (err) {
      console.log(err);
    } else {
      res.send(f);
    }
  });
});

router
  .route("/:petId")
  .get((req, res) => {
    Pet.findById(req.params.petId, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.send(docs);
      }
    });
  })
  .patch((req, res) => {
    Pet.findByIdAndUpdate(req.params.petId, req.body, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.send("Updated");
      }
    });
  })
  .delete((req, res) => {
    Pet.deleteOne({ _id: req.params.petId }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.send("Deleted");
      }
    });
  });

module.exports = router;
