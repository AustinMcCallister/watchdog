const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('internal', { title: 'Internal Monitor' });
});

router.post('/', (req, res, next) => {
  // stringifies the output from the req
  const _starTime_str = JSON.stringify(req._startTime);
  const body = JSON.stringify(req.body);

  if (fs.existsSync("../logfiles/log.txt")) {
    fs.appendFile("../logfiles/log.txt",`${_starTime_str}\n${body}\n---------------------------------------\n` , function(err){
      if (err) throw err;
      console.log("file already exists, appending...");
    });
  }
  else {
    fs.writeFile("../logfiles/log.txt", `${_starTime_str}\n${body}\n---------------------------------------\n` , function(err){
      if (err) throw err;
      console.log("file created successfully");
    });
  }
});

module.exports = router;