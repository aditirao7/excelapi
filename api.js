const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Pet = require("./Pet");
var multer = require("multer");
var excelToJson = require("convert-excel-to-json");
var fs = require("fs");
var pass = "fastjobsdb"; //ideally will set it as an env variable

// temporary storage for excel file
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var uploads = multer({ storage: storage });

// connecting database
mongoose.connect(
  "mongodb+srv://aditi:fastjobsdb@pets.cyj7br3.mongodb.net/?retryWrites=true&w=majority"
);

// function to insert excel data into mongodb
async function importExcelData2MongoDB(filePath) {
  try {
    const excelData = await excelToJson({
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
  } catch (err) {
    console.log(err);
  }
}

// route triggered after uploading excel file
router.post("/", uploads.single("pets"), (req, res) => {
  Pet.collection.drop();
  var path = __dirname + "/public/uploads/" + req.file.filename;
  importExcelData2MongoDB(path);
  fs.unlinkSync(path);
  res.send("Excel parsed and stored in database");
});

// route triggered to get all pets in database
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.send(pets);
  } catch (err) {
    console.log(err);
  }
});

// route for specific petId
router
  .route("/:petId")
  // route to obtain specific pet
  .get(async (req, res) => {
    try {
      const pet = await Pet.findById(req.params.petId);
      res.send(pet);
    } catch (err) {
      console.log(err);
    }
  })
  // route to update specific pet
  .patch(async (req, res) => {
    try {
      const update = await Pet.findByIdAndUpdate(req.params.petId, req.body);
      res.send("Updated");
    } catch (err) {
      console.log(err);
    }
  })
  // route to delete specific pet
  .delete(async (req, res) => {
    try {
      const del = await Pet.deleteOne({ _id: req.params.petId });
      res.send("Deleted");
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
