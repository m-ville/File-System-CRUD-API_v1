const express = require("express")
const fs = require("fs");
const fileUpload = require("express-fileupload");
const path = require("path");
const stream = require('stream')


const app = express()
app.use(fileUpload({
  limits: {
    fileSize: 10000000    //10mb
  },
  abortOnLimit: true
}))


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/Index.html")
})


app.post('/files/upload', function (req, res) {

  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  sampleFile = req.files.file;
  uploadPath = path.join(__dirname, '/uploadedFiles/', sampleFile.name);

  sampleFile.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });

});



app.get("/files", function (req, res) {

  const uploadPath = __dirname + '/uploadedFiles'

  fs.readdir(uploadPath, (err, files) => {
    res.write("Uploaded Files List :\n\n");
    if (err)
      res.send(err);
    else {
      files.forEach(file => res.write(file + "\n"))
      res.send()
    }
  })
})



app.get("/files/download/:fileName", function (req, res) {

  const downloadURL = __dirname + "/uploadedFiles/" + req.params.fileName;

  const r = fs.createReadStream(downloadURL)  // or any other way to get a readable stream
  const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
  stream.pipeline(
    r,
    ps, // <---- this makes a trick with stream error handling
    (err) => {
      if (err) {
        console.log(err) // No such file or any other kind of error
        return res.sendStatus(400);
      }
    })
  ps.pipe(res) // <---- this makes a trick with stream error handling

})


app.put("/files/update/:fileName", function (req, res) {
  const updateFileURL = __dirname + "/uploadedFiles/" + req.params.fileName;

  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  sampleFile = req.files.file;
  uploadPath = path.join(__dirname, '/uploadedFiles/', sampleFile.name);
  console.log(uploadPath);

  sampleFile.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);

    console.log('File uploaded!');
  });

  fs.unlink(updateFileURL, (err => {
    if (err) res.send(err);
    else {
      res.write("Selected file updated with new file.");
    }
    res.send()

  }));
})


app.delete("/files/:fileName", function (req, res) {
  const deleteFileURL = __dirname + "/uploadedFiles/" + req.params.fileName;

  fs.unlink(deleteFileURL, (err => {
    if (err) res.send(err);
    else {
      res.send("Selected file deleted.");
    }

  }));
})



app.listen(process.env.PORT || 3000, function () {
  console.log("server started at port 3000");
})