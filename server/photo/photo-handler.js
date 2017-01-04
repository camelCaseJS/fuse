const fs = require('fs');
const path = require('path');

const storageDir = path.resolve(__dirname, '../db/photos');

/*
* saves photo a in a folder, creates the folder if it does not exist
*
* inputs: multi-form data request with a user identifier and file attached
* output: success or failure code response
*
* NOTE: checking for folder existence first will cause race conditions,
* refactors should not implement such functionality
*/
module.exports.addPhoto = (req, res) => {
  if (!req.body.user || !req.files.image) {
    res.sendStatus(403);
  } else {
    const userDir = path.resolve(storageDir, req.body.user);
    const savePhoto = () => {
      const fileLoc = path.resolve(path.userDir, '/', req.files.image.name);
      fs.writeFile(fileLoc, req.files.image.data, (err) => {
        if (err) {
          console.log(err);
          res.sendStatus(403);
        } else {
          res.sendStatus(201);
        }
      });
    };
    fs.mkdir(userDir, null, (err) => {
      if (err) {
        if (err.code === 'EEXIST') {
          savePhoto(); // ignore the error if the folder already exists
        } else {
          res.sendStatus(403);
        } // something else went wrong
      } else {
        savePhoto();
      } // successfully created folder
    });
  }
};

module.exports.getPhotos = (req, res) => {
  res.send('boop');
};


module.exports.deletePhoto = (req, res) => {
  res.send('goodbye cruel world');
};
